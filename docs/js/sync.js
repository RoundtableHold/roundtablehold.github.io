/**
 * sync.js - Cloud Sync & Backup for Roundtable Guides
 *
 * Supported providers:
 *   - Google Drive  (implemented)
 *   - GitHub Gist   (implemented — Personal Access Token, no OAuth required)
 *
 * ── Google Drive Setup ────────────────────────────────────────────────────────
 * 1. Go to https://console.cloud.google.com/ and create a project.
 * 2. Enable the "Google Drive API" for that project.
 * 3. Configure the OAuth consent screen (External; add scopes:
 *      .../auth/drive.appdata  and  .../auth/userinfo.email).
 * 4. Create credentials → OAuth 2.0 Client ID → Web application.
 * 5. Add your site origin (e.g. https://roundtablehold.github.io) to
 *    "Authorised JavaScript origins".
 * 6. Paste your Client ID into GOOGLE_CLIENT_ID below.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function ($) {
    'use strict';

    // =========================================================================
    // CONFIGURATION
    // =========================================================================
    var GOOGLE_CLIENT_ID  = 'Put your Google Client ID Here';
    var SYNC_FILE_NAME    = 'roundtable-sync.json';
    var SYNC_CONFIG_KEY   = 'roundtable_sync_config';
    var VERSION_HIST_KEY  = 'roundtable_sync_history';
    var MAX_HISTORY       = 10;
    var DEBOUNCE_MS       = 5000;   // save 5 s after last change
    var PERIODIC_MS       = 120000; // periodic fallback every 2 min

    // =========================================================================
    // STATE
    // =========================================================================
    var syncConfig     = null;  // persisted to localStorage
    var activeProvider = null;  // current CloudProvider instance
    var pendingChanges = false;
    var debounceTimer  = null;
    var periodicTimer  = null;
    var _hooksReady    = false; // prevent double-wrapping
    var _internalWrite = false; // prevent recursive sync triggers
    // 'inactive' | 'pending' | 'syncing' | 'synced' | 'error'
    var currentState   = 'inactive';
    var lastSyncTime   = null;
    var lastErrorMsg   = '';

    // =========================================================================
    // CLOUD PROVIDER — Google Drive
    // Uses Google Identity Services (token model) + Drive REST API.
    // Data is stored in the hidden appDataFolder so it never clutters
    // the user's My Drive.
    // =========================================================================
    function GoogleDriveProvider(cfg) {
        this.cfg         = cfg;
        this.accessToken = cfg.accessToken  || null;
        this.tokenExpiry = cfg.tokenExpiry  || 0;
        this.fileId      = cfg.fileId       || null;
    }

    GoogleDriveProvider.prototype = {

        _tokenValid: function () {
            return this.accessToken && Date.now() < this.tokenExpiry - 60000;
        },

        _loadGIS: function () {
            return new Promise(function (resolve, reject) {
                if (window.google && window.google.accounts) { resolve(); return; }
                var s = document.createElement('script');
                s.src = 'https://accounts.google.com/gsi/client';
                s.onload = resolve;
                s.onerror = function () { reject(new Error('Failed to load Google Identity Services')); };
                document.head.appendChild(s);
            });
        },

        _getToken: function (forcePrompt) {
            var self = this;
            return new Promise(function (resolve, reject) {
                if (!forcePrompt && self._tokenValid()) { resolve(self.accessToken); return; }
                self._loadGIS().then(function () {
                    var client = google.accounts.oauth2.initTokenClient({
                        client_id: GOOGLE_CLIENT_ID,
                        scope: 'https://www.googleapis.com/auth/drive.appdata',
                        callback: function (resp) {
                            if (resp.error) { reject(new Error(resp.error)); return; }
                            self.accessToken    = resp.access_token;
                            self.tokenExpiry    = Date.now() + resp.expires_in * 1000;
                            syncConfig.accessToken  = self.accessToken;
                            syncConfig.tokenExpiry  = self.tokenExpiry;
                            saveSyncConfig();
                            resolve(self.accessToken);
                        }
                    });
                    client.requestAccessToken({ prompt: forcePrompt ? 'select_account' : '' });
                }).catch(reject);
            });
        },

        _fetch: function (url, opts) {
            var self = this;
            return self._getToken().then(function (token) {
                opts = opts || {};
                opts.headers = opts.headers || {};
                opts.headers['Authorization'] = 'Bearer ' + token;
                return fetch(url, opts);
            });
        },

        _findFile: function () {
            var self = this;
            if (self.fileId) return Promise.resolve(self.fileId);
            return self._fetch(
                'https://www.googleapis.com/drive/v3/files' +
                '?spaces=appDataFolder&q=name%3D%27' + encodeURIComponent(SYNC_FILE_NAME) + '%27&fields=files(id)'
            ).then(function (r) { return r.json(); }).then(function (data) {
                if (data.files && data.files.length > 0) {
                    self.fileId = data.files[0].id;
                    syncConfig.fileId = self.fileId;
                    saveSyncConfig();
                }
                return self.fileId;
            });
        },

        /* Sign in interactively and return account info */
        signIn: function () {
            var self = this;
            return new Promise(function (resolve, reject) {
                self._loadGIS().then(function () {
                    var client = google.accounts.oauth2.initTokenClient({
                        client_id: GOOGLE_CLIENT_ID,
                        scope: 'https://www.googleapis.com/auth/drive.appdata ' +
                               'https://www.googleapis.com/auth/userinfo.email',
                        callback: function (resp) {
                            if (resp.error) { reject(new Error(resp.error)); return; }
                            self.accessToken = resp.access_token;
                            self.tokenExpiry = Date.now() + resp.expires_in * 1000;
                            fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                                headers: { 'Authorization': 'Bearer ' + self.accessToken }
                            }).then(function (r) { return r.json(); }).then(function (info) {
                                resolve({
                                    email:       info.email,
                                    name:        info.name,
                                    accessToken: self.accessToken,
                                    tokenExpiry: self.tokenExpiry
                                });
                            }).catch(reject);
                        }
                    });
                    client.requestAccessToken({ prompt: 'select_account' });
                }).catch(reject);
            });
        },

        /* Upload local data to Drive */
        push: function (data) {
            var self    = this;
            var jsonStr = JSON.stringify(data);
            var meta    = { name: SYNC_FILE_NAME, parents: ['appDataFolder'] };
            return self._findFile().then(function (fileId) {
                var boundary = 'rthold_sync_boundary';
                var body =
                    '--' + boundary + '\r\n' +
                    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
                    JSON.stringify(meta) + '\r\n' +
                    '--' + boundary + '\r\n' +
                    'Content-Type: application/json\r\n\r\n' +
                    jsonStr + '\r\n' +
                    '--' + boundary + '--';
                var url    = fileId
                    ? 'https://www.googleapis.com/upload/drive/v3/files/' + fileId + '?uploadType=multipart'
                    : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
                var method = fileId ? 'PATCH' : 'POST';
                return self._fetch(url, {
                    method:  method,
                    headers: { 'Content-Type': 'multipart/related; boundary=' + boundary },
                    body:    body
                }).then(function (r) { return r.json(); }).then(function (result) {
                    if (result.id) {
                        self.fileId       = result.id;
                        syncConfig.fileId = result.id;
                        saveSyncConfig();
                    }
                    return result;
                });
            });
        },

        /* Download remote data from Drive (returns null if nothing uploaded yet) */
        pull: function () {
            var self = this;
            return self._findFile().then(function (fileId) {
                if (!fileId) return null;
                return self._fetch(
                    'https://www.googleapis.com/drive/v3/files/' + fileId + '?alt=media'
                ).then(function (r) {
                    if (!r.ok) return null;
                    return r.json();
                });
            });
        }
    };

    // =========================================================================
    // CLOUD PROVIDER — GitHub Gist
    // Uses a Personal Access Token (gist scope) + GitHub Gist REST API.
    // Data is stored in a private Gist owned by the user — no OAuth consent
    // screen required, no domain restrictions, no app verification.
    // =========================================================================
    function GitHubGistProvider(cfg) {
        this.cfg    = cfg;
        this.pat    = cfg.pat    || null;
        this.gistId = cfg.gistId || null;
    }

    GitHubGistProvider.prototype = {

        _fetch: function (url, opts) {
            opts         = opts || {};
            opts.headers = opts.headers || {};
            opts.headers['Authorization']       = 'Bearer ' + this.pat;
            opts.headers['Accept']              = 'application/vnd.github+json';
            opts.headers['X-GitHub-Api-Version'] = '2022-11-28';
            return fetch(url, opts);
        },

        _findGist: function () {
            var self = this;
            if (self.gistId) return Promise.resolve(self.gistId);
            return self._fetch('https://api.github.com/gists?per_page=100')
                .then(function (r) { return r.json(); })
                .then(function (gists) {
                    for (var i = 0; i < gists.length; i++) {
                        if (gists[i].files && gists[i].files[SYNC_FILE_NAME]) {
                            self.gistId       = gists[i].id;
                            syncConfig.gistId = self.gistId;
                            saveSyncConfig();
                            return self.gistId;
                        }
                    }
                    return null;
                });
        },

        /* Validate PAT and return account info */
        signIn: function (pat) {
            var self = this;
            self.pat = pat;
            return self._fetch('https://api.github.com/user')
                .then(function (r) {
                    if (!r.ok) throw new Error('Invalid token — make sure it has the gist scope.');
                    return r.json();
                })
                .then(function (info) {
                    return {
                        login: info.login,
                        email: info.email || info.login,
                        name:  info.name  || info.login,
                        pat:   pat
                    };
                });
        },

        /* Upload local data to Gist (create on first push, patch thereafter) */
        push: function (data) {
            var self    = this;
            var files   = {};
            files[SYNC_FILE_NAME] = { content: JSON.stringify(data) };
            return self._findGist().then(function (gistId) {
                if (gistId) {
                    return self._fetch('https://api.github.com/gists/' + gistId, {
                        method:  'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body:    JSON.stringify({ files: files })
                    }).then(function (r) { return r.json(); });
                } else {
                    return self._fetch('https://api.github.com/gists', {
                        method:  'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body:    JSON.stringify({
                            description: 'Elden Lord sync data',
                            public:      false,
                            files:       files
                        })
                    }).then(function (r) { return r.json(); })
                      .then(function (result) {
                        self.gistId       = result.id;
                        syncConfig.gistId = self.gistId;
                        saveSyncConfig();
                        return result;
                      });
                }
            });
        },

        /* Download remote data from Gist (returns null if nothing uploaded yet) */
        pull: function () {
            var self = this;
            return self._findGist().then(function (gistId) {
                if (!gistId) return null;
                return self._fetch('https://api.github.com/gists/' + gistId)
                    .then(function (r) { return r.json(); })
                    .then(function (gist) {
                        if (!gist.files || !gist.files[SYNC_FILE_NAME]) return null;
                        var file = gist.files[SYNC_FILE_NAME];
                        // Large files may be truncated — fetch raw URL in that case
                        if (file.truncated) {
                            return fetch(file.raw_url).then(function (r) { return r.json(); });
                        }
                        return JSON.parse(file.content);
                    });
            });
        }
    };

    // =========================================================================
    // VERSION HISTORY  (local snapshots in localStorage)
    // The last MAX_HISTORY successful cloud pushes are stored locally.
    // Drive also keeps its own revision history which is available via the
    // Drive UI, giving an additional safety net.
    // =========================================================================
    function saveVersionSnapshot(data) {
        var history = _loadHistory();
        history.unshift({ timestamp: Date.now(), data: JSON.stringify(data) });
        if (history.length > MAX_HISTORY) history = history.slice(0, MAX_HISTORY);
        localStorage.setItem(VERSION_HIST_KEY, JSON.stringify(history));
    }

    function _loadHistory() {
        try { return JSON.parse(localStorage.getItem(VERSION_HIST_KEY) || '[]'); }
        catch (e) { return []; }
    }

    // =========================================================================
    // SYNC CONFIG  (persisted independently of jStorage)
    // =========================================================================
    function loadSyncConfig() {
        try { syncConfig = JSON.parse(localStorage.getItem(SYNC_CONFIG_KEY) || 'null'); }
        catch (e) { syncConfig = null; }
    }

    function saveSyncConfig() {
        localStorage.setItem(SYNC_CONFIG_KEY, JSON.stringify(syncConfig));
    }

    function clearSyncConfig() {
        syncConfig = null;
        localStorage.removeItem(SYNC_CONFIG_KEY);
    }

    // =========================================================================
    // FIELD-LEVEL MERGE
    // For each checklist item the version with the more recent timestamp wins.
    // Non-mergeable profile fields (theme, journey, etc.) follow the profile
    // that was synced more recently overall.
    // =========================================================================
    function mergeProfiles(local, remote) {
        if (!remote) return local;
        var merged       = JSON.parse(JSON.stringify(local));
        var remoteProfs  = (remote  && remote[profilesKey])  || {};
        var mergedProfs  = (merged  && merged[profilesKey])  || {};

        // Fallback for items that pre-date per-item timestamp tracking:
        // if neither side has a stamp, whichever side has the newer overall
        // sync wins (covers the case of a fresh device connecting to existing data).
        var localSyncAt   = (local._syncMeta  && local._syncMeta.lastSyncAt)  || 0;
        var remoteSyncAt  = (remote._syncMeta && remote._syncMeta.lastSyncAt) || 0;
        var remoteIsNewer = remoteSyncAt > localSyncAt;

        $.each(remoteProfs, function (profileName, rp) {
            if (!(profileName in mergedProfs)) {
                mergedProfs[profileName] = rp;
                return;
            }
            var lp       = mergedProfs[profileName];
            var localTs  = lp.checklistTimestamps  || {};
            var remoteTs = rp.checklistTimestamps  || {};

            // Item-level merge: remote wins when it has a newer stamp.
            // When neither side has a stamp (data pre-dating sync), fall back
            // to whichever side was synced more recently overall.
            var mergedData = $.extend({}, lp.checklistData || {});
            var mergedTs   = $.extend({}, localTs);
            $.each(rp.checklistData || {}, function (itemId, rVal) {
                var rt = remoteTs[itemId] || 0;
                var lt = localTs[itemId]  || 0;
                if (rt > lt || (rt === 0 && lt === 0 && remoteIsNewer)) {
                    mergedData[itemId] = rVal;
                    if (rt > 0) mergedTs[itemId] = rt;
                }
            });
            lp.checklistData        = mergedData;
            lp.checklistTimestamps  = mergedTs;

            // Non-mergeable fields: the more-recently-synced side wins overall.
            // Use the top-level remoteIsNewer flag (per-profile syncMeta doesn't exist).
            if (remoteIsNewer) {
                ['style', 'journey', 'hide_completed', 'collapsed', 'map_settings', 'dlc_filter'].forEach(function (k) {
                    if (rp[k] !== undefined) lp[k] = rp[k];
                });
            }
        });

        merged[profilesKey] = mergedProfs;
        return merged;
    }

    // =========================================================================
    // SYNC OPERATIONS
    // =========================================================================
    function doSync() {
        if (!activeProvider || currentState === 'syncing') return;
        setState('syncing');

        var localData = $.jStorage.get(profilesKey, {});
        localData._syncMeta = {
            lastSyncAt: Date.now(),
            version: ((localData._syncMeta && localData._syncMeta.version) || 0) + 1
        };

        activeProvider.push(localData).then(function () {
            // Persist updated _syncMeta back to localStorage
            _internalWrite = true;
            $.jStorage.set(profilesKey, localData);
            window.profiles = localData;
            _internalWrite = false;

            saveVersionSnapshot(localData);
            lastSyncTime   = Date.now();
            pendingChanges = false;
            setState('synced');
        }).catch(function (err) {
            lastErrorMsg = err.message || 'Unknown error';
            setState('error');
            console.error('[Sync] Push failed:', err);
        });
    }

    function doPullAndMerge(onComplete) {
        if (!activeProvider) { if (onComplete) onComplete(false); return; }
        setState('syncing');

        activeProvider.pull().then(function (remoteData) {
            if (!remoteData) {
                // Nothing in the cloud yet — push local data as the first version.
                // Reset state first so doSync()'s 'syncing' guard doesn't bail early.
                currentState = 'pending';
                doSync();
                if (onComplete) onComplete(false);
                return;
            }
            var localData   = $.jStorage.get(profilesKey, {});
            var localSyncAt = (localData._syncMeta  && localData._syncMeta.lastSyncAt)  || 0;
            var remoteSyncAt= (remoteData._syncMeta && remoteData._syncMeta.lastSyncAt) || 0;

            var merged;
            if (remoteSyncAt > localSyncAt) {
                merged = mergeProfiles(localData, remoteData);
            } else {
                merged = localData; // local is current — just push
            }

            // Compare profile data only — ignore _syncMeta to avoid false positives.
            var dataChanged = JSON.stringify(merged[profilesKey]) !== JSON.stringify(localData[profilesKey]);

            if (!dataChanged && !pendingChanges) {
                // Already up to date with the cloud — no push needed.
                lastSyncTime   = Date.now();
                setState('synced');
                if (onComplete) onComplete(false);
                return;
            }

            merged._syncMeta = {
                lastSyncAt: Date.now(),
                version: Math.max(
                    (localData._syncMeta  && localData._syncMeta.version)  || 0,
                    (remoteData._syncMeta && remoteData._syncMeta.version) || 0
                ) + 1
            };

            _internalWrite = true;
            $.jStorage.set(profilesKey, merged);
            window.profiles = merged;
            _internalWrite = false;

            activeProvider.push(merged).then(function () {
                saveVersionSnapshot(merged);
                lastSyncTime   = Date.now();
                pendingChanges = false;
                setState('synced');
                if (onComplete) onComplete(dataChanged);
            }).catch(function (err) {
                lastErrorMsg = err.message || 'Unknown error';
                setState('error');
                if (onComplete) onComplete(false);
            });
        }).catch(function (err) {
            lastErrorMsg = err.message || 'Could not reach cloud';
            setState('error');
            if (onComplete) onComplete(false);
        });
    }

    // =========================================================================
    // CHANGE HOOKS
    // Wraps window.setItem (checklist changes) and $.jStorage.set (all other
    // profile changes: theme, profile switch, map settings, etc.)
    // =========================================================================
    function setupHooks() {
        if (_hooksReady) return;
        _hooksReady = true;

        // 1. Per-item timestamp + debounced sync on checklist changes
        var _origSetItem = window.setItem;
        window.setItem = function (id, checked, startup) {
            startup = (startup === undefined) ? false : startup;
            _origSetItem(id, checked, startup);
            if (!startup) {
                // Stamp the change time for field-level merge
                var p = $.jStorage.get(profilesKey, {});
                if (p[profilesKey] && p[profilesKey][p.current]) {
                    if (!p[profilesKey][p.current].checklistTimestamps)
                        p[profilesKey][p.current].checklistTimestamps = {};
                    p[profilesKey][p.current].checklistTimestamps[id] = Date.now();
                    _internalWrite = true;
                    $.jStorage.set(profilesKey, p);
                    window.profiles = p;
                    _internalWrite = false;
                }
                notifyChange();
            }
        };

        // 2. Watch all other profile writes (theme, journey, map settings, …)
        var _origJStorageSet = $.jStorage.set;
        $.jStorage.set = function (key, value, options) {
            var result = _origJStorageSet.apply(this, arguments);
            if (key === profilesKey && !_internalWrite) {
                notifyChange();
            }
            return result;
        };
    }

    function notifyChange() {
        if (!activeProvider) return;
        pendingChanges = true;
        setState('pending');
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(doSync, DEBOUNCE_MS);
    }

    function startPeriodicSync() {
        clearInterval(periodicTimer);
        periodicTimer = setInterval(function () {
            // Always pull so we pick up changes from other devices.
            // doPullAndMerge only pushes if something actually changed.
            doPullAndMerge(function (dataChanged) {
                if (dataChanged && window.location.pathname.indexOf('options') === -1) {
                    location.reload();
                }
            });
        }, PERIODIC_MS);
    }

    function setupPageUnloadSync() {
        window.addEventListener('beforeunload', function () {
            if (pendingChanges && activeProvider) doSync();
        });
    }

    // =========================================================================
    // UI — NAVBAR INDICATOR
    // A small cloud icon injected into the navbar on every page.
    // Clicking it jumps to the Cloud Sync section in Options.
    // =========================================================================
    function injectNavIndicator() {
        if ($('#syncNavIndicator').length) return;
        var el = $(
            '<a id="syncNavIndicator" href="/options.html#cloudSync" ' +
            'class="nav-link order-2 order-xl-4 px-2 d-none d-sm-flex align-items-center sync-nav-indicator"></a>'
        );
        // Insert after the desktop search form
        $('nav#top_nav form.d-none.d-sm-flex').after(el);
    }

    function updateNavIndicator() {
        var el = $('#syncNavIndicator');
        if (!el.length) return;

        switch (currentState) {
            case 'inactive':
                el.html('').attr('title', '').addClass('d-none');
                return;
            case 'synced':
                el.html('<i class="bi bi-cloud-check-fill text-success"></i>')
                  .attr('title', 'Synced').removeClass('d-none');
                break;
            case 'pending':
                el.html('<i class="bi bi-cloud-upload text-warning"></i>')
                  .attr('title', 'Changes waiting to sync…').removeClass('d-none');
                break;
            case 'syncing':
                el.html('<i class="bi bi-arrow-repeat text-info sync-spin"></i>')
                  .attr('title', 'Syncing…').removeClass('d-none');
                break;
            case 'error':
                el.html('<i class="bi bi-cloud-slash-fill text-danger"></i>')
                  .attr('title', 'Sync error: ' + lastErrorMsg).removeClass('d-none');
                break;
        }
    }

    // =========================================================================
    // UI — OPTIONS PAGE
    // =========================================================================
    function updateOptionsUI() {
        if (!$('#syncInactive').length) return;

        if (!syncConfig || !syncConfig.provider) {
            $('#syncInactive').removeClass('d-none');
            $('#syncActive').addClass('d-none');
        } else {
            $('#syncInactive').addClass('d-none');
            $('#syncActive').removeClass('d-none');

            var providerLabel = syncConfig.provider === 'google_drive' ? 'Google Drive' :
                                syncConfig.provider === 'github_gist'  ? 'GitHub Gist'  :
                                syncConfig.provider;
            $('#syncProviderInfo').text(
                providerLabel + (syncConfig.accountEmail ? ' · ' + syncConfig.accountEmail : '')
            );
            $('#syncLastSyncTime').text(
                lastSyncTime ? 'Last sync: ' + _timeAgo(lastSyncTime) : 'Not yet synced this session'
            );

            var badge = $('#syncStatusBadge');
            badge.removeClass('bg-success bg-warning text-dark bg-secondary bg-danger');
            switch (currentState) {
                case 'synced':
                    badge.addClass('bg-success')
                         .html('<i class="bi bi-check-circle-fill"></i> Synced'); break;
                case 'pending':
                    badge.addClass('bg-warning text-dark')
                         .html('<i class="bi bi-clock-fill"></i> Pending'); break;
                case 'syncing':
                    badge.addClass('bg-secondary')
                         .html('<i class="bi bi-arrow-repeat sync-spin"></i> Syncing…'); break;
                case 'error':
                    badge.addClass('bg-danger')
                         .html('<i class="bi bi-exclamation-triangle-fill"></i> Error · ' + lastErrorMsg); break;
            }
        }
    }

    function renderVersionHistory() {
        var list    = $('#syncVersionList');
        var history = _loadHistory();
        list.empty();

        var providerNote = syncConfig && syncConfig.provider === 'github_gist'
            ? 'The last 10 synced snapshots. Your Gist also keeps its own revision history \u2014 ' +
              'check the Revisions tab on gist.github.com.'
            : 'The last 10 synced snapshots. Drive also keeps its own revision ' +
              'history for older versions.';
        $('#syncVersionDesc').text(providerNote);

        if (!history.length) {
            list.append(
                '<div class="list-group-item text-muted small">' +
                'No history yet. Snapshots are saved here after each successful sync.' +
                '</div>'
            );
            return;
        }

        history.forEach(function (entry, idx) {
            var d   = new Date(entry.timestamp);
            var lbl = idx === 0 ? ' <span class="badge bg-primary ms-1">Current</span>' : '';
            var row = $('<div class="list-group-item d-flex justify-content-between align-items-center py-2"></div>');
            row.append($('<span class="small"></span>').html(_formatDate(d) + lbl));
            if (idx > 0) {
                (function (snapshot) {
                    var btn = $('<button class="btn btn-sm btn-outline-warning">Restore</button>');
                    btn.on('click', function () {
                        if (!confirm('Restore this version? Your current progress will be replaced.')) return;
                        var data = JSON.parse(snapshot);
                        _internalWrite = true;
                        $.jStorage.set(profilesKey, data);
                        window.profiles = data;
                        _internalWrite = false;
                        location.reload();
                    });
                    row.append(btn);
                }(entry.data));
            }
            list.append(row);
        });
    }

    // =========================================================================
    // OPTIONS PAGE — EVENT HANDLERS
    // Bound once when we detect we are on the options page.
    // =========================================================================
    function initOptionsPageHandlers() {
        if (!$('#syncInactive').length) return;

        $('#btnActivateSync').on('click', function () {
            $('#syncProviderModal').modal('show');
        });

        $('#btnConnectGoogle').on('click', function () {
            $('#syncProviderModal').modal('hide');
            _connectGoogle();
        });

        $('#btnConnectGitHub').on('click', function () {
            $('#syncProviderModal').modal('hide');
            $('#githubPATInput').val('');
            $('#syncGithubPATModal').modal('show');
        });

        $('#btnConnectGitHubConfirm').on('click', function () {
            var pat = $('#githubPATInput').val().trim();
            if (!pat) { return; }
            $('#syncGithubPATModal').modal('hide');
            _connectGitHub(pat);
        });

        $('#btnSyncNow').on('click', function () {
            doPullAndMerge(function (dataChanged) {
                if (dataChanged) location.reload();
            });
        });

        $('#btnViewHistory').on('click', function () {
            var panel = $('#syncVersionPanel');
            var isHidden = panel.hasClass('d-none');
            panel.toggleClass('d-none', !isHidden);
            $(this).text(isHidden ? 'Hide History' : 'View History');
            if (isHidden) renderVersionHistory();
        });

        $('#btnDeactivateSync').on('click', function () {
            $('#syncDeactivateModal').modal('show');
        });

        $('#btnDeactivateConfirm').on('click', function () {
            $('#syncDeactivateModal').modal('hide');
            _deactivate();
        });

        updateOptionsUI();
    }

    function _connectGoogle() {
        var temp = new GoogleDriveProvider({});
        setState('syncing');
        temp.signIn().then(function (info) {
            syncConfig = {
                provider:     'google_drive',
                accountEmail: info.email,
                accountName:  info.name,
                accessToken:  info.accessToken,
                tokenExpiry:  info.tokenExpiry,
                fileId:       null
            };
            saveSyncConfig();
            activeProvider = new GoogleDriveProvider(syncConfig);
            setupHooks();
            startPeriodicSync();
            setupPageUnloadSync();

            doPullAndMerge(function (dataChanged) {
                updateOptionsUI();
                if (dataChanged) {
                    _syncAlert('Connected to Google Drive. Your data has been merged with the cloud.', 'success');
                } else {
                    _syncAlert('Connected to Google Drive. Your progress is now being backed up.', 'success');
                }
            });
        }).catch(function (err) {
            lastErrorMsg = err.message || 'Could not connect';
            setState('error');
            updateOptionsUI();
            _syncAlert('Connection failed: ' + lastErrorMsg, 'danger');
        });
    }

    function _connectGitHub(pat) {
        var temp = new GitHubGistProvider({ pat: pat });
        setState('syncing');
        temp.signIn(pat).then(function (info) {
            syncConfig = {
                provider:     'github_gist',
                accountEmail: info.email,
                accountName:  info.name,
                pat:          pat,
                gistId:       null
            };
            saveSyncConfig();
            activeProvider = new GitHubGistProvider(syncConfig);
            setupHooks();
            startPeriodicSync();
            setupPageUnloadSync();

            doPullAndMerge(function (dataChanged) {
                updateOptionsUI();
                if (dataChanged) {
                    _syncAlert('Connected to GitHub Gist. Your data has been merged with the cloud.', 'success');
                } else {
                    _syncAlert('Connected to GitHub Gist. Your progress is now being backed up.', 'success');
                }
            });
        }).catch(function (err) {
            lastErrorMsg = err.message || 'Could not connect';
            setState('error');
            updateOptionsUI();
            _syncAlert('Connection failed: ' + lastErrorMsg, 'danger');
        });
    }

    function _deactivate() {
        clearTimeout(debounceTimer);
        clearInterval(periodicTimer);
        clearSyncConfig();
        activeProvider = null;
        pendingChanges = false;
        setState('inactive');
        _syncAlert('Cloud sync deactivated. Your local data is unchanged.', 'info');
    }

    function _syncAlert(msg, type) {
        var el = $(
            '<div class="alert alert-' + type + ' alert-dismissible mt-2" role="alert">' +
            msg +
            '<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>'
        );
        $('#syncAlertDiv').append(el);
    }

    // =========================================================================
    // HELPERS
    // =========================================================================
    function setState(state) {
        currentState = state;
        updateNavIndicator();
        updateOptionsUI();
    }

    function _timeAgo(ts) {
        var d = Date.now() - ts;
        if (d < 60000)    return 'just now';
        if (d < 3600000)  return Math.floor(d / 60000)   + ' min ago';
        if (d < 86400000) return Math.floor(d / 3600000)  + ' hr ago';
        return Math.floor(d / 86400000) + ' days ago';
    }

    function _formatDate(date) {
        var now  = new Date();
        var t    = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var yest = new Date(now); yest.setDate(now.getDate() - 1);
        if (date.toDateString() === now.toDateString())  return 'Today '     + t;
        if (date.toDateString() === yest.toDateString()) return 'Yesterday ' + t;
        return date.toLocaleDateString() + ' ' + t;
    }

    // =========================================================================
    // INIT
    // =========================================================================
    function init() {
        loadSyncConfig();

        if (syncConfig && syncConfig.provider) {
            activeProvider = syncConfig.provider === 'github_gist'
                ? new GitHubGistProvider(syncConfig)
                : new GoogleDriveProvider(syncConfig);
            setupHooks();

            $(document).ready(function () {
                injectNavIndicator();
                startPeriodicSync();
                setupPageUnloadSync();
                initOptionsPageHandlers();

                // Pull on page load — catches changes made on other devices.
                // Small delay so common.js can finish startup writes first.
                setTimeout(function () {
                    doPullAndMerge(function (dataChanged) {
                        // If remote had newer data and we're not on the options
                        // page (where the user might be editing sync settings),
                        // silently reload so the UI reflects the merged state.
                        if (dataChanged && window.location.pathname.indexOf('options') === -1) {
                            location.reload();
                        }
                    });
                }, 1200);
            });
        } else {
            $(document).ready(function () {
                injectNavIndicator(); // renders nothing when inactive
                initOptionsPageHandlers();
            });
        }
    }

    // Public API (used by options page and future extensions)
    window.SyncManager = {
        notifyChange:   notifyChange,
        syncNow:        doSync,
        getState:       function () { return currentState; },
        getHistory:     _loadHistory
    };

    init();

}(jQuery));
