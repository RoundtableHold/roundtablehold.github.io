var profilesKey = 'darksouls3_profiles';

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker.register('/sw.js').then(() => { console.log('Service Worker Registered'); });
//     });
// }
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for (let registration of registrations) {
            registration.unregister();
        }
    })
}

(function($) {
    'use strict';

    var themes = {
        "Standard" : "/css/bootstrap.min.css",
        "LightMode" : "/css/themes/lightmode/bootstrap.min.css",
        "Ceruleon" : "/css/themes/cerulean/bootstrap.min.css",
        "Cosmo" : "/css/themes/cosmo/bootstrap.min.css",
        "Cyborg" : "/css/themes/cyborg/bootstrap.min.css",
        "Darkly" : "/css/themes/darkly/bootstrap.min.css",
        "Flatly" : "/css/themes/flatly/bootstrap.min.css",
        "Journal" : "/css/themes/journal/bootstrap.min.css",
        "Litera" : "/css/themes/litera/bootstrap.min.css",
        "Lumen" : "/css/themes/lumen/bootstrap.min.css",
        "Lux" : "/css/themes/lux/bootstrap.min.css",
        "Materia" : "/css/themes/materia/bootstrap.min.css",
        "Minty" : "/css/themes/minty/bootstrap.min.css",
        "Morph" : "/css/themes/Morph/bootstrap.min.css",
        "Pulse" : "/css/themes/pulse/bootstrap.min.css",
        "Quartz" : "/css/themes/quartz/bootstrap.min.css",
        "Regent" : "/css/themes/regent/bootstrap.min.css",
        "Sandstone" : "/css/themes/sandstone/bootstrap.min.css",
        "Simplex" : "/css/themes/simplex/bootstrap.min.css",
        "Sketchy" : "/css/themes/sketchy/bootstrap.min.css",
        "Slate" : "/css/themes/slate/bootstrap.min.css",
        "Solar" : "/css/themes/solar/bootstrap.min.css",
        "Spacelab" : "/css/themes/spacelab/bootstrap.min.css",
        "Superhero" : "/css/themes/superhero/bootstrap.min.css",
        "United" : "/css/themes/united/bootstrap.min.css",
        "Vapor" : "/css/themes/vapor/bootstrap.min.css",
        "Yeti" : "/css/themes/yeti/bootstrap.min.css",
        "Zephyr" : "/css/themes/zephyr/bootstrap.min.css",
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
        function setCheckbox(id, checked) {
            if ($('#' + id).length === 1) {
                var el = $('#' + id).get(0);
                $(el).prop('checked', checked)
                if (checked) {
                    $(el).closest('li').addClass('completed')
                } else {
                    $(el).closest('li').removeClass('completed')
                }
            }
        }
        function setItem(id, checked, startup=false) {
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
                        if (profiles[profilesKey][profiles.current].checklistData[t] != b) {
                            setItem(t, b, startup);
                        }
                    }
                }
            }
        }
    
        themeSetup(profiles[profilesKey][profiles.current].style);
        
        $("a[href^='http']").attr('target','_blank');
        
        $('.checkbox input[type="checkbox"]').click(function() {
            var id = $(this).attr('id');
            var isChecked = $(this).prop('checked');
            setItem(id, isChecked);
            calculateTotals();
        });

        $('.collapse-button').click(function(event) {
            var btn = $(event.currentTarget);
            var i = btn.children('i');
            if (btn.hasClass('collapsed')) {
                i.removeClass('bi-chevron-up');
                i.addClass('bi-chevron-down');
            } else {
                i.removeClass('bi-chevron-down');
                i.addClass('bi-chevron-up');
            }
            
        });
        
        $('.toc-button').click(function(event) {
            var btn = $(event.currentTarget);
            var i = btn.children(i);
            if (btn.hasClass('collapsed')) {
                i.removeClass('bi-dash');
                i.addClass('bi-plus-lg');
            } else {
                i.removeClass('bi-plus-lg');
                i.addClass('bi-dash');
            }
        });

        $('input[id="toggleHideCompleted"]').change(function() {
            profiles = $.jStorage.get(profilesKey, {});
            var hidden = !$(this).is(':checked');

            $(this).parent('div').parent('div').parent('div').toggleClass('hide_completed', !hidden);

            profiles[profilesKey][profiles.current].hide_completed = !hidden;
            $.jStorage.set(profilesKey, profiles);
        });
    
        function populateChecklists() {
            var checkboxes = $('.checkbox input[type="checkbox"]');
            checkboxes.each(function (index, el) {
                var id = $(el).attr('id');
                var checked = profiles[profilesKey][profiles.current].checklistData[id] === true;
                if (checked) {
                    setItem(id, checked, true);
                } else {
                    $(el).prop('checked', false);
                    $(el).closest('li').removeClass('completed');
                }
                // $(el).prop('checked', checked);
                // if (checked) {
                //     $(el).closest('li').addClass('completed')
                // } else {
                //     $(el).closest('li').removeClass('completed')
                // }
            });
            calculateTotals();
        }

        populateChecklists();
    });
    
    function initializeProfile(profile_name) {
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
        $.jStorage.set(profilesKey, profiles);
    }

    /// restore all saved state, except for the current tab
    /// used on page load or when switching profiles
    function restoreState(profile_name) {
        $('button[href$="Col"]').each(function() {
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
        themeSetup(profiles[profilesKey][profiles.current].style);
    }

    // Setup ("bootstrap", haha) styling
    function themeSetup(stylesheet) {
        if(stylesheet === null || stylesheet === undefined) { // if we didn't get a param, then
            stylesheet = profiles[profilesKey][profiles.current].style; // fall back on "light" if cookie not set
        }
        $("#bootstrap").attr("href", themes[stylesheet]);
    }

    
    function calculateTotals() {
        $('[id$="_overall_total"]').each(function(index) {
            var type = this.id.match(/(.*)_overall_total/)[1];
            var overallCount = 0, overallChecked = 0;
            $('[id^="' + type + '_totals_"]').each(function(index, el) {
                var regex = new RegExp(type + '_totals_(.*)');
                var i = parseInt(this.id.match(regex)[1]);
                var count = 0, checked = 0;
                $('div[id="' + type + '_' + i + 'Col"] input[id^="' + type + '"]').each(function(index, el) {
                    var checkbox = $(el);
                    count++;
                    overallCount++;
                    if (checkbox.prop('checked')) {
                        checked++;
                        overallChecked++;
                    }
                });
                if (checked === count) {
                    this.innerHTML = $(this).closest('div').parent().parent().prevAll('nav').find('#' + type + '_nav_totals_' + i).get(0).innerHTML = 'DONE';
                    $(this).removeClass('in_progress').addClass('done');
                    $(this).removeClass('bg-info').addClass('bg-success');
                    $(this).closest('.card').addClass('completed');// Show heading for not yet completed category
                    $($('#' + type + '_nav_totals_' + i)[0]).removeClass('in_progress').addClass('done');
                } else {
                    this.innerHTML = $(this).closest('div').parent().parent().prevAll('nav').find('#' + type + '_nav_totals_' + i).get(0).innerHTML = checked + '/' + count;
                    $(this).removeClass('done').addClass('in_progress');
                    $(this).removeClass('bg-success').addClass('bg-info');
                    $(this).closest('.card').removeClass('completed');// Show heading for not yet completed category
                    $($('#' + type + '_nav_totals_' + i)[0]).removeClass('done').addClass('in_progress');
                }
            });
            if (overallChecked === overallCount) {
                this.innerHTML = 'DONE';
                $(this).removeClass('in_progress').addClass('done');
            } else {
                this.innerHTML = overallChecked + '/' + overallCount;
                $(this).removeClass('done').addClass('in_progress');
            }
        });
    }
    
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

    // $('.toc_link').click(function() {
    //     var target = $(this).attr('href');
    //     $('html, body').animate({
    //         scrollTop: $(target).offset().top - $('#top_nav').outerHeight(true)
    //     }, 100);
    // });
    
    $(function () {
        // reset `Hide completed` button state (otherwise Chrome bugs out)
        $('#toggleHideCompleted').prop('checked', false);

        // restore collapsed state on page load
        restoreState(profiles.current);

        // register on click handlers to store state
        $('button[href$="Col"]').on('click', function (el) {
            profiles = $.jStorage.get(profilesKey, {});
            var collapsed_key = $(this).attr('href');
            var saved_tab_state = !!profiles[profilesKey][profiles.current].collapsed[collapsed_key];

            profiles[profilesKey][profiles.current].collapsed[$(this).attr('href')] = !saved_tab_state;

            $.jStorage.set(profilesKey, profiles);
        });

        // $('.nav.navbar-nav li a,#progress_list li a').on('click', function(event) {
        //     if ($(event.currentTarget).hasClass('dropdown-toggle')) {
        //         return;
        //     }
            
        //     var href = $(this).attr('href');

        //     profiles[profilesKey][profiles.current].current_tab = href;
        //     window.scrollTo(0,0);
        //     $.jStorage.set(profilesKey, profiles);

        //     $('#nav-collapse').collapse('hide');

        //     $('.tab-li a').removeClass('active');
        //     $('.tab-li a[href="' + href + '"]').addClass('active');
        //     $('a[href="' + href + '"].dropdown-item').closest('.dropdown').children('a').addClass('active');
        // });
    });

})( jQuery );