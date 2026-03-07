var profilesKey = 'darksouls3_profiles';

// Language metadata — mirrors LANGUAGE_META in generate.py.
// Add new entries here (and in generate.py) to support more languages.
var UK_FLAG = "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E%3CclipPath id='t'%3E%3Cpath d='M30,15 h30 v15 z v-15 h-30 z h-30 v-15 z v15 h30 z'/%3E%3C/clipPath%3E%3Cpath d='M0,0 v30 h60 v-30 z' fill='%23012169'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' stroke='%23fff' stroke-width='6'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' clip-path='url(%23t)' stroke='%23C8102E' stroke-width='4'/%3E%3Cpath d='M30,0 v30 M0,15 h60' stroke='%23fff' stroke-width='10'/%3E%3Cpath d='M30,0 v30 M0,15 h60' stroke='%23C8102E' stroke-width='6'/%3E%3C/svg%3E\" style=\"height: 1.1em; border-radius: 2px; margin-bottom: 2px; border: 1px solid rgba(128, 128, 128, 0.3);\">";
var IT_FLAG = "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect width='1' height='2' fill='%23009246'/%3E%3Crect width='1' height='2' x='1' fill='%23fff'/%3E%3Crect width='1' height='2' x='2' fill='%23ce2b37'/%3E%3C/svg%3E\" style=\"height: 1.1em; border-radius: 2px; margin-bottom: 2px; border: 1px solid rgba(128, 128, 128, 0.3);\">";
var ES_FLAG = "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect width='3' height='2' fill='%23c60b1e'/%3E%3Crect width='3' height='1' y='0.5' fill='%23ffc400'/%3E%3C/svg%3E\" style=\"height: 1.1em; border-radius: 2px; margin-bottom: 2px; border: 1px solid rgba(128, 128, 128, 0.3);\">";
var FR_FLAG = "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect width='1' height='2' fill='%23002395'/%3E%3Crect width='1' height='2' x='1' fill='%23fff'/%3E%3Crect width='1' height='2' x='2' fill='%23ed2939'/%3E%3C/svg%3E\" style=\"height: 1.1em; border-radius: 2px; margin-bottom: 2px; border: 1px solid rgba(128, 128, 128, 0.3);\">";
var DE_FLAG = "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect width='3' height='2' fill='%23000'/%3E%3Crect width='3' height='1.333' y='0.666' fill='%23d00'/%3E%3Crect width='3' height='0.666' y='1.333' fill='%23ffce00'/%3E%3C/svg%3E\" style=\"height: 1.1em; border-radius: 2px; margin-bottom: 2px; border: 1px solid rgba(128, 128, 128, 0.3);\">";
var PT_FLAG = "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 3'%3E%3Cpath fill='%23060' d='M0 0h2v3H0z'/%3E%3Cpath fill='%23f00' d='M2 0h3v3H2z'/%3E%3Ccircle fill='%23ff0' cx='2' cy='1.5' r='0.6'/%3E%3C/svg%3E\" style=\"height: 1.1em; border-radius: 2px; margin-bottom: 2px; border: 1px solid rgba(128, 128, 128, 0.3);\">";
var JA_FLAG = "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect width='3' height='2' fill='%23fff'/%3E%3Ccircle cx='1.5' cy='1' r='0.6' fill='%23bc002d'/%3E%3C/svg%3E\" style=\"height: 1.1em; border-radius: 2px; margin-bottom: 2px; border: 1px solid rgba(128, 128, 128, 0.3);\">";

window.LANGUAGE_META = {
    'en': { flag: UK_FLAG, name: 'EN' },
    'it': { flag: IT_FLAG, name: 'IT' },
    'es': { flag: ES_FLAG, name: 'ES' },
    'fr': { flag: FR_FLAG, name: 'FR' },
    'de': { flag: DE_FLAG, name: 'DE' },
    'pt': { flag: PT_FLAG, name: 'PT' },
    'ja': { flag: JA_FLAG, name: 'JA' },
};

window.currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

var themes = {
    "Standard": "/css/bootstrap.min.css",
    "LightMode": "/css/themes/lightmode/bootstrap.min.css",
    "Ceruleon": "/css/themes/cerulean/bootstrap.min.css",
    "Cosmo": "/css/themes/cosmo/bootstrap.min.css",
    "Cyborg": "/css/themes/cyborg/bootstrap.min.css",
    "Darkly": "/css/themes/darkly/bootstrap.min.css",
    "Flatly": "/css/themes/flatly/bootstrap.min.css",
    "Journal": "/css/themes/journal/bootstrap.min.css",
    "Litera": "/css/themes/litera/bootstrap.min.css",
    "Lumen": "/css/themes/lumen/bootstrap.min.css",
    "Lux": "/css/themes/lux/bootstrap.min.css",
    "Materia": "/css/themes/materia/bootstrap.min.css",
    "Minty": "/css/themes/minty/bootstrap.min.css",
    "Morph": "/css/themes/Morph/bootstrap.min.css",
    "Pulse": "/css/themes/pulse/bootstrap.min.css",
    "Quartz": "/css/themes/quartz/bootstrap.min.css",
    "Regent": "/css/themes/regent/bootstrap.min.css",
    "Sandstone": "/css/themes/sandstone/bootstrap.min.css",
    "Simplex": "/css/themes/simplex/bootstrap.min.css",
    "Sketchy": "/css/themes/sketchy/bootstrap.min.css",
    "Slate": "/css/themes/slate/bootstrap.min.css",
    "Solar": "/css/themes/solar/bootstrap.min.css",
    "Spacelab": "/css/themes/spacelab/bootstrap.min.css",
    "Superhero": "/css/themes/superhero/bootstrap.min.css",
    "United": "/css/themes/united/bootstrap.min.css",
    "Vapor": "/css/themes/vapor/bootstrap.min.css",
    "Yeti": "/css/themes/yeti/bootstrap.min.css",
    "Zephyr": "/css/themes/zephyr/bootstrap.min.css",
};


(function ($) {
    'use strict';

    window.profiles = $.jStorage.get(profilesKey, {});

    window.initializeProfile = function (profile_name) {
        if (!(profile_name in profiles[profilesKey])) profiles[profilesKey][profile_name] = {};
        if (!('checklistData' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].checklistData = {};
        if (!('collapsed' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].collapsed = {};
        if (!('hide_completed' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].hide_completed = false;
        if (!('journey' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].journey = 1;
        if (!('style' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].style = 'Standard';
        if (!('map_settings' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].map_settings = {};
        if (!('checklistTimestamps' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].checklistTimestamps = {};
        if (!('dlc_filter' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].dlc_filter = 'both';
        $.jStorage.set(profilesKey, profiles);
    }

    window.themeSetup = function (stylesheet) {
        if (stylesheet === null || stylesheet === undefined) { // if we didn't get a param, then
            stylesheet = profiles[profilesKey][profiles.current].style; // fall back on "light" if cookie not set
        }
        $("#bootstrap").attr("href", themes[stylesheet]);
    }

    /// assure default values are set
    /// necessary 'cause we're abusing local storage to store JSON data
    /// done in a more verbose way to be easier to understand
    if (!('current' in profiles)) profiles.current = 'Default Profile';
    if (!(profilesKey in profiles)) profiles[profilesKey] = {};
    initializeProfile(profiles.current);
    window.themeSetup(profiles[profilesKey][profiles.current].style);


    if ('loading' in HTMLImageElement.prototype) {
        $('img[loading="lazy"]').each(function () {
            $(this).attr('src', this.dataset.src);
        });
    } else {
        const lazyScript = document.createElement('script');
        lazyScript.src = '/js/lazysizes.min.js';
        document.body.appendChild(lazyScript);
    }

    var anchor = window.location.hash.substr(1);
    if (anchor) {
        var t = $('li#' + anchor)
        console.log(t)
        t.addClass('border border-primary border-3');
    }

    function setCheckbox(id, checked) {
        if ($('#' + id).length === 1) {
            var el = $('#' + id).get(0);
            $(el).prop('checked', checked)
            if (checked) {
                $(el).closest('li').addClass('completed')
                if (window.current_page_id) {
                    window.progress[window.current_page_id]['total'][0] += 1;
                    const section_idx = parseInt($(el).attr('data-section-idx'));
                    window.progress[window.current_page_id]['sections'][section_idx][0] += 1;
                }
            } else {
                $(el).closest('li').removeClass('completed')
                if (window.current_page_id) {
                    window.progress[window.current_page_id]['total'][0] -= 1;
                    const section_idx = parseInt($(el).attr('data-section-idx'));
                    window.progress[window.current_page_id]['sections'][section_idx][0] -= 1;
                }
            }
        }
    }
    window.setItem = function (id, checked, startup = false) {
        if (startup && !checked) {
            return;
        }
        profiles = $.jStorage.get(profilesKey, {});
        profiles[profilesKey][profiles.current].checklistData[id] = !!checked;
        setCheckbox(id, checked);
        $.jStorage.set(profilesKey, profiles);

        if (id in item_links) {
            var links = item_links[id];
            if ('targets' in links) {
                for (const t of links['targets']) {
                    if (profiles[profilesKey][profiles.current].checklistData[t] != checked) {
                        setItem(t, checked, startup);
                    }
                }
            }
            if ('orsources' in links) {
                var b = checked;
                for (const s of links['orsources']) {
                    b |= profiles[profilesKey][profiles.current].checklistData[s];
                }
                for (const t of links['ortargets']) {
                    if (profiles[profilesKey][profiles.current].checklistData[t] != b) {
                        setItem(t, b, startup);
                    }
                }
            }
            if ('andsources' in links) {
                var b = checked;
                for (const s of links['andsources']) {
                    b &= profiles[profilesKey][profiles.current].checklistData[s];
                }
                for (const t of links['andtargets']) {
                    if (!profiles[profilesKey][profiles.current].checklistData[t] && b) {
                        setItem(t, b, startup);
                    }
                }
            }
        }
    }

    // ── Language support ───────────────────────────────────────────────────────

    function applyLanguageCss(lang) {
        if (lang === 'en') {
            $('.lang-text').addClass('d-none');
            $('.lang-text.lang-en').removeClass('d-none');
        } else {
            $('.lang-text').addClass('d-none');
            // Show the target-language spans
            $('.lang-text.lang-' + lang).removeClass('d-none');
            // Fallback: for lang-pair elements that have no target-language child,
            // fall back to showing the English span.
            $('.lang-pair').each(function () {
                if (!$(this).children('.lang-text.lang-' + lang).length) {
                    $(this).children('.lang-text.lang-en').removeClass('d-none');
                }
            });
        }

        // Update any options with data-lang attributes
        $('option').each(function () {
            var langText = $(this).attr('data-lang-' + lang) || $(this).attr('data-lang-en');
            if (langText) {
                $(this).text(langText);
            }
        });

        var fix = document.getElementById('language-fouc-fix');
        if (fix) fix.remove();
    }

    function updateLangDisplay(lang) {
        var meta = window.LANGUAGE_META[lang] || { flag: '🌐', name: lang.toUpperCase() };
        $('#lang-display').html(meta.flag + ' ' + meta.name);
        $('.lang-option').removeClass('active');
        $('.lang-option[data-lang="' + lang + '"]').addClass('active');
    }

    window.setLanguage = function (lang) {
        window.currentLanguage = lang;
        localStorage.setItem('selectedLanguage', lang);
        applyLanguageCss(lang);
        updateLangDisplay(lang);
    };

    window.applyLanguageCss = applyLanguageCss;

    // Initialise language on page load
    updateLangDisplay(window.currentLanguage);
    applyLanguageCss(window.currentLanguage);

    // Language selector click handler
    $(document).on('click', '.lang-option', function (e) {
        e.preventDefault();
        window.setLanguage($(this).data('lang'));
    });

})(jQuery);
