var profilesKey = 'darksouls3_profiles';

(function($) {
    'use strict';

    var themes = {
        "Standard" : "css/bootstrap.min.css",
        "Ceruleon" : "css/themes/cerulean/bootstrap.min.css",
        "Cosmo" : "css/themes/cosmo/bootstrap.min.css",
        "Cyborg" : "css/themes/cyborg/bootstrap.min.css",
        "Darkly" : "css/themes/darkly/bootstrap.min.css",
        "Flatly" : "css/themes/flatly/bootstrap.min.css",
        "Journal" : "css/themes/journal/bootstrap.min.css",
        "Litera" : "css/themes/litera/bootstrap.min.css",
        "Lumen" : "css/themes/lumen/bootstrap.min.css",
        "Lux" : "css/themes/lux/bootstrap.min.css",
        "Materia" : "css/themes/materia/bootstrap.min.css",
        "Minty" : "css/themes/minty/bootstrap.min.css",
        "Morph" : "css/themes/Morph/bootstrap.min.css",
        "Pulse" : "css/themes/pulse/bootstrap.min.css",
        "Quartz" : "css/themes/quartz/bootstrap.min.css",
        "Regent" : "css/themes/regent/bootstrap.min.css",
        "Sandstone" : "css/themes/sandstone/bootstrap.min.css",
        "Simplex" : "css/themes/simplex/bootstrap.min.css",
        "Sketchy" : "css/themes/sketchy/bootstrap.min.css",
        "Slate" : "css/themes/slate/bootstrap.min.css",
        "Solar" : "css/themes/solar/bootstrap.min.css",
        "Spacelab" : "css/themes/spacelab/bootstrap.min.css",
        "Superhero" : "css/themes/superhero/bootstrap.min.css",
        "United" : "css/themes/united/bootstrap.min.css",
        "Vapor" : "css/themes/vapor/bootstrap.min.css",
        "Yeti" : "css/themes/yeti/bootstrap.min.css",
        "Zephyr" : "css/themes/zephyr/bootstrap.min.css",
    };

    var profiles = $.jStorage.get(profilesKey, {});

    /// assure default values are set
    /// necessary 'cause we're abusing local storage to store JSON data
    /// done in a more verbose way to be easier to understand
    if (!('current' in profiles)) profiles.current = 'Default Profile';
    if (!(profilesKey in profiles)) profiles[profilesKey] = {};
    initializeProfile(profiles.current);

    jQuery(document).ready(function($) {
        // Get the right style going...
        themeSetup(buildThemeSelection());

        $('ul li[data-id]').each(function() {
            if (profiles[profilesKey][profiles.current].checklistData[$(this).attr('data-id')] === true) {
                $('#' + $(this).attr('data-id')).prop('checked', true);
                $(this).addClass('completed');
            }
        });

        // Open external links in new tab
        $("a[href^='http']").attr('target','_blank');

        populateProfiles();

        $('.checkbox input[type="checkbox"]').click(function() {
            var id = $(this).attr('id');
            var isChecked = profiles[profilesKey][profiles.current].checklistData[id] = $(this).prop('checked');
            if (isChecked === true) {
              $('[data-id="'+id+'"]').addClass('completed');
            } else {
              $('[data-id="'+id+'"]').removeClass('completed');
            }
            $.jStorage.set(profilesKey, profiles);
            calculateTotals();
        });

        $('tr[data-id]').each(function() {
            var $el = $(this);
            if (profiles[profilesKey][profiles.current].checklistData[$el.attr('data-id')] === true) {
                $('#' + $el.attr('data-id')).prop('checked', true);
                $('tr[data-id="' + $el.attr('data-id')+'"]').addClass('completed');
            }
        });

        $('.table-checkbox input[type="checkbox"]').click(function() {
            var id = $(this).attr('id');
            var isChecked = profiles[profilesKey][profiles.current].checklistData[id] = $(this).prop('checked');
            if (isChecked === true) {
              $('tr[data-id="'+id+'"]').addClass('completed');
            } else {
              $('tr[data-id="'+id+'"]').removeClass('completed');
            }
            $.jStorage.set(profilesKey, profiles);
            calculateTotals();
        });

        $('.collapse-button').click(function(event) {
            var btn = $(event.currentTarget)
            var i = btn.children('i')
            if (btn.hasClass('collapsed')) {
                i.removeClass('bi-chevron-up');
                i.addClass('bi-chevron-down');
            } else {
                i.removeClass('bi-chevron-down');
                i.addClass('bi-chevron-up');
            }
            
        })

        // Theme callback
        $('#themes').change(function(event) {
            var stylesheet = $('#themes').val();
            themeSetup(stylesheet);
            profiles[profilesKey][profiles.current].style = stylesheet;
            $.jStorage.set(profilesKey, profiles);
        });

        $('#profiles').change(function(event) {
            profiles.current = $(this).val();
            $.jStorage.set(profilesKey, profiles);

            $('li .checkbox .completed').show();

            populateChecklists();

            restoreState(profiles.current);

            calculateTotals();
        });

        $('#profileAdd').click(function() {
            $('#profileModalTitle').html('Add Profile');
            $('#profileModalName').val('');
            $('#profileModalAdd').show();
            $('#profileModalUpdate').hide();
            $('#profileModalDelete').hide();
            $('#profileModal').modal('show');
        });

        $('#profileEdit').click(function() {
            $('#profileModalTitle').html('Edit Profile');
            $('#profileModalName').val(profiles.current);
            $('#profileModalAdd').hide();
            $('#profileModalUpdate').show();
            if (canDelete()) {
                $('#profileModalDelete').show();
            } else {
                $('#profileModalDelete').hide();
            }
            $('#profileModal').modal('show');
        });

        $('#profileModalAdd').click(function(event) {
            event.preventDefault();
            var profile = $.trim($('#profileModalName').val());
            if (profile.length > 0) {
                initializeProfile(profile);

                profiles.current = profile;
                $.jStorage.set(profilesKey, profiles);
                populateProfiles();
                populateChecklists();
                restoreState(profiles.current);
            }
        });

        $('#profileModalUpdate').click(function(event) {
            event.preventDefault();
            var newName = $.trim($('#profileModalName').val());
            if (newName.length > 0 && newName != profiles.current) {
                profiles[profilesKey][newName] = profiles[profilesKey][profiles.current];
                delete profiles[profilesKey][profiles.current];
                profiles.current = newName;
                $.jStorage.set(profilesKey, profiles);
                populateProfiles();
            }
            $('#profileModal').modal('hide');
        });

        $('#profileModalDelete').click(function(event) {
            event.preventDefault();
            if (!canDelete()) {
                return;
            }
            if (!confirm('Are you sure?')) {
                return;
            }
            delete profiles[profilesKey][profiles.current];
            profiles.current = getFirstProfile();
            $.jStorage.set(profilesKey, profiles);
            populateProfiles();
            populateChecklists();
            restoreState(profiles.current);
            $('#profileModal').modal('hide');
        });

        $('#profileNG\\+').click(function() {
            $('#NG\\+Modal').modal('show');
        });

        $('#NG\\+ModalYes').click(function(event) {
            event.preventDefault();
            if (!confirm('Are you sure you wish to begin the next journey?')) {
                return;
            }
            $('[id^="playthrough_"], [id^="crow_"]').filter(':checked').each(function(){
                profiles[profilesKey][profiles.current].checklistData[this.id] = false;
            });
            $.each(profiles[profilesKey][profiles.current].hidden_categories, function(f){
                profiles[profilesKey][profiles.current].hidden_categories[f] = false;
            });
            if (profiles[profilesKey][profiles.current].journey < 3) {
                profiles[profilesKey][profiles.current].journey++;
            }
            $.jStorage.set(profilesKey, profiles);
            populateChecklists();
            restoreState(profiles.current);
            $('#NG\\+Modal').modal('hide');
        });

        $('#profileExport').click(function(){
            var filename = 'profiles.json';
            var text = JSON.stringify(profiles);
            if (window.Blob && window.navigator.msSaveBlob) {
                // Microsoft browsers (https://docs.microsoft.com/en-us/microsoft-edge/dev-guide/html5/file-api/blob)
                var blob = new window.Blob([text]);
                window.navigator.msSaveBlob(blob, filename);
            } else {
                // All other modern browsers
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }
        });

        $('#profileImport').click(function(){
          $('#fileInput').trigger('click');
        });
        /* Will reject if an incorrect file or no file is selected */
        $('input#fileInput').change(function(){
          var fileInput = document.getElementById('fileInput');
          if(!fileInput.files || !fileInput.files[0] || !/\.json$/.test(fileInput.files[0].name)){
            alert("Bad input file. File should end in .json")
            return;
          }
          var fr = new FileReader();
          fr.readAsText(fileInput.files[0]);
          fr.onload = dataLoadCallback;
        });

        /*
        *  Import & Export using textarea instead of files
        */
        $('#profileExportText').click(function(){
            document.getElementById("profileText").value = JSON.stringify(profiles);
            document.getElementById("profileText").select();
            document.execCommand("copy");
        });

        $('#profileImportText').click(function(){
            if (!confirm('Are you sure you want to import profile data?')) {
                return;
            }
            try {
                var jsonProfileData = JSON.parse(document.getElementById("profileText").value);
                profiles = jsonProfileData;
                $.jStorage.set(profilesKey, profiles);
                populateProfiles();
                populateChecklists();
                $('#profiles').trigger("change");
                location.reload();
            } catch(e) {
                alert(e); // error in the above string (in this case, yes)!
            }
        });

        $('input[id="toggleHideCompleted"]').change(function() {
            var hidden = !$(this).is(':checked');

            $(this).parent('div').parent('div').parent('.tab-content').toggleClass('hide_completed', !hidden);

            profiles[profilesKey][profiles.current].hide_completed = !hidden;
            $.jStorage.set(profilesKey, profiles);
        });

        $('.hide-buttons').click(function(event) {
            $('#btnHideCompleted').removeClass('show');
        });
        $('.show-buttons').click(function(event) {
            $('#btnHideCompleted').addClass('show');
        });

        $('[data-ng-toggle]').change(function() {
            var journey = $(this).data('ng-toggle');

            profiles[profilesKey][profiles.current].journey = +journey
            $.jStorage.set(profilesKey, profiles);

            toggleFilteredClasses('h_ng\\+');
            toggleFilteredClasses('s_ng\\+');
            toggleFilteredClasses('s_ng\\+\\+');

            calculateTotals();
        });

        $('[data-item-toggle]').change(function() {
            var type = $(this).data('item-toggle');
            var to_hide = $(this).is(':checked');
            var item_toggles = $(this).closest('.btn-group.btn-group-vertical').find('[data-item-toggle]');

            profiles[profilesKey][profiles.current].hidden_categories[type] = to_hide;
            $.jStorage.set(profilesKey, profiles);

            toggleFilteredClasses(type);
            toggleFilteredClasses('f_none');

            // Mark parent category as hidden if and only if all items in it are hidden
            if (to_hide === (item_toggles.length === item_toggles.filter(':checked').length)) {
                $(this).closest('.btn-group.btn-group-vertical').find('[data-category-toggle]').not(function(){return this.checked === to_hide}).click();
            }
            // Apply partial highlight to the parent category if at least one item in it is hidden
            $(this).closest('.btn-group.btn-group-vertical').find('.btn-group-vertical').toggleClass('open', item_toggles.filter(':checked').length > 0);

            calculateTotals();
        });

        $('[data-category-toggle]').change(function() {
            var to_hide = $(this).is(':checked');
            var item_toggles = $(this).closest('.btn-group.btn-group-vertical').find('[data-item-toggle]');

            // Change all child items to the same state as the category
            if (to_hide || (item_toggles.length === item_toggles.filter(':checked').length)) {
                item_toggles.not(function(){return this.checked === to_hide}).click();
            }
        });

        calculateTotals();

    });

    function initializeProfile(profile_name) {
        if (!(profile_name in profiles[profilesKey])) profiles[profilesKey][profile_name] = {};
        if (!('checklistData' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].checklistData = {};
        if (!('collapsed' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].collapsed = {};
        if (!('current_tab' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].current_tab = '#tabMain';
        if (!('hide_completed' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].hide_completed = false;
        if (!('journey' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].journey = 1;
        if (!('style' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].style = 'Standard';
        if (!('hidden_categories' in profiles[profilesKey][profile_name]))
            profiles[profilesKey][profile_name].hidden_categories = {
                f_boss: false,
                f_miss: false,
                f_npc: false,
                f_estus: false,
                f_bone: false,
                f_tome: false,
                f_coal: false,
                f_ash: false,
                f_gest: false,
                f_sorc: false,
                f_pyro: false,
                f_mirac: false,
                f_ring: false,
                f_weap: false,
                f_arm: false,
                f_tit: false,
                f_gem: false,
                f_cov: false,
                f_misc: false
            };
    }

    /// restore all saved state, except for the current tab
    /// used on page load or when switching profiles
    function restoreState(profile_name) {
        $('a[href$="_col"]').each(function() {
            var value = profiles[profilesKey][profile_name].collapsed[$(this).attr('href')];
            var active = $(this).hasClass('collapsed');

            // interesting note: this condition is the same as (value ^ active),
            // but there's no logical xor in JS as far as I know; also, this is more readable
            if ((value && !active) || (!value && active)) {
                $($(this).attr('href')).collapse('toggle');
            }
        });

        var $button = $("#toggleHideCompleted");
        var hide_completed_state = profiles[profilesKey][profile_name].hide_completed;
        var button_active = $button.is(':checked');
        if ((hide_completed_state && !button_active) || (!hide_completed_state && button_active)) {
            $button.click();
        }

        $('[data-ng-toggle="' + profiles[profilesKey][profile_name].journey + '"]').click().change();
        $.each(profiles[profilesKey][profile_name].hidden_categories, function(key, value) {
            var $el = $('[data-item-toggle="' + key + '"]');
            var active = $el.is(':checked');

            if ((value && !active) || (!value && active)) {
                $el.click();
            }
        });
        themeSetup(profiles[profilesKey][profiles.current].style);
    }

    // Setup ("bootstrap", haha) styling
    function themeSetup(stylesheet) {
        if(stylesheet === null || stylesheet === undefined) { // if we didn't get a param, then
            stylesheet = profiles[profilesKey][profiles.current].style; // fall back on "light" if cookie not set
        }
        $("#bootstrap").attr("href", themes[stylesheet]);
    }

    function buildThemeSelection() {
        var style = profiles[profilesKey][profiles.current].style;
        var themeSelect = $("#themes");
        $.each(themes, function(key, value){
            themeSelect.append(
                $('<option></option>').val(key).html(key + " Theme")
            );
        });
        themeSelect.val(style);
        return style;
    }

    function dataLoadCallback(arg){
      var jsonProfileData = JSON.parse(arg.currentTarget.result);
      profiles = jsonProfileData;
      $.jStorage.set(profilesKey, profiles);
      populateProfiles();
      populateChecklists();
      $('#profiles').trigger("change");
      location.reload();
    }

    function populateProfiles() {
        $('#profiles').empty();
        $.each(profiles[profilesKey], function(index, value) {
            $('#profiles').append($("<option></option>").attr('value', index).text(index));
        });
        $('#profiles').val(profiles.current);
    }

    function populateChecklists() {
        $('.checkbox input[type="checkbox"]')
            .prop('checked', false)
            .parent('div')
            .parent('li')
            .removeClass('completed')
            .show();

        $.each(profiles[profilesKey][profiles.current].checklistData, function(index, value) {
            $('#' + index)
                .prop('checked', value)
                .parent('div')
                .parent('li')
                .toggleClass('completed', value);
        });

        calculateTotals();
    }

    function calculateTotals() {
        $('[id$="_overall_total"]').each(function(index) {
            var type = this.id.match(/(.*)_overall_total/)[1];
            var overallCount = 0, overallChecked = 0;
            $('[id^="' + type + '_totals_"]').each(function(index, el) {
                var regex = new RegExp(type + '_totals_(.*)');
                var regexFilter = new RegExp('^playthrough_(.*)');
                var i = parseInt(this.id.match(regex)[1]);
                var count = 0, checked = 0;
                $('[id^="' + type + '_' + i +  '_').each(function(index, el) {
                    var checkbox = $(el);
                    count++;
                    overallCount++;
                    if (checkbox.prop('checked')) {
                        checked++;
                        overallChecked++;
                    }
                });
                if (checked === count) {
                    this.innerHTML = $('#' + type + '_nav_totals_' + i)[0].innerHTML = 'DONE';
                    $(this).removeClass('in_progress').addClass('done');
                    $(this).parent('h3').addClass('completed');// Hide heading for completed category
                    $($('#' + type + '_nav_totals_' + i)[0]).removeClass('in_progress').addClass('done');
                } else {
                    this.innerHTML = $('#' + type + '_nav_totals_' + i)[0].innerHTML =  checked + '/' + count;
                    $(this).removeClass('done').addClass('in_progress');
                    $(this).parent('h3').removeClass('completed');// Show heading for not yet completed category
                    $($('#' + type + '_nav_totals_' + i)[0]).removeClass('done').addClass('in_progress');
                }
                $(this).parent('h3').next('div').children('h4').addClass('completed');// Hide all subheadings...
                $(this).parent('h3').next('div').children('ul').children('li').children('div').children('label:not(.completed)').parent('div').parent('li').parent('ul').prev('h4').removeClass('completed');// ... except those where not all entries below the subheading are labeled as completed
            });
            if (overallChecked === overallCount) {
                this.innerHTML = 'DONE';
                $(this).removeClass('in_progress').addClass('done');
            } else {
                this.innerHTML = overallChecked + '/' + overallCount;
                $(this).removeClass('done').addClass('in_progress');
            }
        // Update textarea for profile export
        document.getElementById("profileText").value = JSON.stringify(profiles);
        });
    }

    function canDelete() {
        var count = 0;
        $.each(profiles[profilesKey], function(index, value) {
            count++;
        });
        return (count > 1);
    }

    function getFirstProfile() {
        for (var profile in profiles[profilesKey]) {
            return profile;
        }
    }

    function canFilter(entry) {
        var classAttr = entry.attr('class');
        if (!classAttr) {
            return false;
        }
        if (classAttr === 'f_none') {
            // If some filters are enabled, all entries marked f_none are automatically filtered as well 
            return Object.values(profiles[profilesKey][profiles.current].hidden_categories).some(function(f){return f});
        }
        var classList = classAttr.split(/\s+/);
        for (var i = 0; i < classList.length; i++) {
            // Hide(h) or show(s) entries based on journey number
            if ((classList[i].match(/^h_ng\+*$/) && classList[i].match(/^h_ng(\+*)$/)[1].length < profiles[profilesKey][profiles.current].journey) ||
               (classList[i].match(/^s_ng\+*$/) && classList[i].match(/^s_ng(\+*)$/)[1].length >= profiles[profilesKey][profiles.current].journey)) {
                return true;
            }
        }
        var foundMatch = 0;
        for (var i = 0; i < classList.length; i++) {
            if (!classList[i].match(/^f_.*/)) {
                continue;
            }
            if(classList[i] in profiles[profilesKey][profiles.current].hidden_categories) {
                if(!profiles[profilesKey][profiles.current].hidden_categories[classList[i]]) {
                    return false;
                }
                foundMatch = 1;
            }
        }
        if (foundMatch === 0) {
            return false;
        }
        return true;
    }

    function toggleFilteredClasses(str) {
        $("li." + str).each(function() {
            if(canFilter($(this))) {
                $(this).css('display', 'none');
            } else {
                $(this).css('display', '');
            }
        });
    }

    /*
     * ----------------------------------
     * Search and highlight functionality
     * ----------------------------------
     */
    $(function() {
        var jets = [new Jets({
            searchTag: '#playthrough_search',
            contentTag: '#playthrough_list ul'
        }), new Jets({
            searchTag: '#npc_quests_search',
            contentTag: '#npc_quests_list ul'// This does not mean that we are searching inside the content of both <h4> and <ul> tags
        }), new Jets({
            searchTag: '#bosses_search',
            contentTag: '#bosses_list tbody'// The outcome is that all <h4> tags are hidden while searching inside <ul> tags
        }), new Jets({
            searchTag: '#legendaries_search',
            contentTag: '#legendaries_list ul'
        }), new Jets({
            searchTag: '#weapons_search',
            contentTag: '#weapons_list ul'
        }), new Jets({
            searchTag: '#sorceries_search',
            contentTag: '#sorceries_list ul'
        }), new Jets({
            searchTag: '#bell_bearings_search',
            contentTag: '#bell_bearings_list ul'
        }), new Jets({
            searchTag: '#cookbooks_search',
            contentTag: '#cookbooks_list ul'
        })];

        $('#playthrough_search').keyup(function() {
            $('#playthrough_list').unhighlight();
            $('#playthrough_list').highlight($(this).val());
        });
        $('#npc_quests_search').keyup(function() {
            $('#npc_quests_list').unhighlight();
            $('#npc_quests_list').highlight($(this).val());
        });
        $('#bosses_search').keyup(function() {
            $('#bosses_list').unhighlight();
            $('#bosses_list').highlight($(this).val());
        });
        $('#legendaries_search').keyup(function() {
            $('#legendaries_list').unhighlight();
            $('#legendaries_list').highlight($(this).val());
        });
        $('#weapons_search').keyup(function() {
            $('#weapons_list').unhighlight();
            $('#weapons_list').highlight($(this).val());
        });
        $('#sorceries_search').keyup(function() {
            $('#sorceries_list').unhighlight();
            $('#sorceries_list').highlight($(this).val());
        });
        $('#bell_bearings_search').keyup(function() {
            $('#bell_bearings_list').unhighlight();
            $('#bell_bearings_list').highlight($(this).val());
        });
        $('#cookbooks_search').keyup(function() {
            $('#cookbooks_list').unhighlight();
            $('#cookbooks_list').highlight($(this).val());
        });
    });

    /*
     * -------------------------
     * Back to top functionality
     * -------------------------
     */
    $(function() {
        var offset = 220;
        var duration = 500;
        $(window).scroll(function() {
            if ($(this).scrollTop() > offset) {
                $('.fadingbutton').fadeIn(duration);
            } else {
                $('.fadingbutton').fadeOut(duration);
            }
        });

        $('.back-to-top').click(function(event) {
            event.preventDefault();
            $('html, body').animate({scrollTop: 0}, duration);
            return false;
        });
    });

    /*
     * ------------------------------------------
     * Restore tabs/hidden sections functionality
     * ------------------------------------------
     */
     $(function() {
        // reset `Hide completed` button state (otherwise Chrome bugs out)
        $('#toggleHideCompleted').prop('checked', false);

        // restore collapsed state on page load
        restoreState(profiles.current);

        if (profiles[profilesKey][profiles.current].current_tab) {
            var tabId = profiles[profilesKey][profiles.current].current_tab; 
            var tab = $(tabId)
            tab.addClass('show')
            tab.addClass('active')
            var tabbtn = $('a[href^="' + profiles[profilesKey][profiles.current].current_tab + '"]')
            tabbtn.addClass('active')
            if (tabbtn.hasClass('dropdown-item')) {
                tabbtn.parent('li').parent('ul').prev('a').addClass('active')
            }
            if (tabId === "#tabMain" || tabId === "#tabOptions") {
                $('#btnHideCompleted').removeClass('show');
            } else {
                $('#btnHideCompleted').addClass('show');
            }
        }

        // register on click handlers to store state
        $('a[href$="_col"]').on('click', function(el) {
            var collapsed_key = $(this).attr('href');
            var saved_tab_state = !!profiles[profilesKey][profiles.current].collapsed[collapsed_key];

            profiles[profilesKey][profiles.current].collapsed[$(this).attr('href')] = !saved_tab_state;

            $.jStorage.set(profilesKey, profiles);
        });

        $('.nav.navbar-nav li a').on('click', function(event) {
            if ($(event.currentTarget).hasClass('dropdown-toggle')) {
                return;
            }
            profiles[profilesKey][profiles.current].current_tab = $(this).attr('href');

            $.jStorage.set(profilesKey, profiles);
        });
     });
})( jQuery );

// to color the plus symbol in combined item pickups
$(".p").html('<a style="pointer-events:none">&nbsp;+ </a>');
