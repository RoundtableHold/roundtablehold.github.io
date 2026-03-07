(function ($) {
    'use strict';

    jQuery(document).ready(function ($) {
        // Get the right style going...

        $("a[href^='http']").attr('target', '_blank');

        $('.checkbox input[type="checkbox"]').click(function () {
            var id = $(this).attr('id');
            var isChecked = $(this).prop('checked');
            setItem(id, isChecked);
            calculateTotals();
        });

        $('.collapse-button').click(function (event) {
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

        $('.toc-button').click(function (event) {
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

        $('input[id="toggleHideCompleted"]').change(function () {
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

    /// restore all saved state, except for the current tab
    /// used on page load or when switching profiles
    function restoreState(profile_name) {
        $('button[href$="Col"]').each(function () {
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
        if (stylesheet === null || stylesheet === undefined) { // if we didn't get a param, then
            stylesheet = profiles[profilesKey][profiles.current].style; // fall back on "light" if cookie not set
        }
        $("#bootstrap").attr("href", themes[stylesheet]);
    }

    const overall_total_el = $('[id$="_overall_total"]');
    const section_totals = $('[id^="' + window.current_page_id + '_totals_"]');
    const nav_totals = $('[id^="' + window.current_page_id + '_nav_totals_"]');

    function updateTotalSection(el, checked, total) {
        if (checked === total) {
            el.html(window.DONE_HTML || 'DONE');
            el.removeClass('in_progress').addClass('done');
            el.removeClass('bg-info').addClass('bg-success');
            el.closest('.card').addClass('completed');// Show heading for not yet completed category
        } else {
            el.html(checked + '/' + total);
            el.removeClass('done').addClass('in_progress');
            el.removeClass('bg-success').addClass('bg-info');
            el.closest('.card').removeClass('completed');// Show heading for not yet completed category
        }
    }

    function updateTotalNav(el, checked, total) {
        if (checked === total) {
            el.html(window.DONE_HTML || 'DONE');
            el.removeClass('in_progress').addClass('done');
            el.removeClass('bg-info').addClass('bg-success');
        } else {
            el.html(checked + '/' + total);
            el.removeClass('done').addClass('in_progress');
            el.removeClass('bg-success').addClass('bg-info');
        }
    }

    function calculateTotals() {
        updateTotalNav(overall_total_el, window.progress[window.current_page_id]['total'][0], window.progress[window.current_page_id]['total'][1])
        for (var i = 0; i < window.progress[window.current_page_id]['sections'].length; i++) {
            let p = window.progress[window.current_page_id]['sections'][i];
            updateTotalNav($(nav_totals.get(i)), p[0], p[1]);
            updateTotalSection($(section_totals.get(i)), p[0], p[1]);
        }
        if (window.applyLanguageCss) { window.applyLanguageCss(window.currentLanguage); }
    }

    $(function () {
        var offset = 220;
        var duration = 500;
        $(window).scroll(function () {
            if ($(this).scrollTop() > offset) {
                $('.fadingbutton').fadeIn(duration);
            } else {
                $('.fadingbutton').fadeOut(duration);
            }
        });

        $('.back-to-top').click(function (event) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, duration);
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

        function applyDlcFilter(mode) {
            var rows = $('li.searchable[data-dlc]');
            if (!rows.length) {
                return;
            }

            rows.each(function () {
                var isDlc = $(this).attr('data-dlc') === 'true';
                var shouldShow = (mode === 'both') || (mode === 'dlc' && isDlc) || (mode === 'base' && !isDlc);
                $(this).toggleClass('d-none', !shouldShow);
            });

            $('[id^="' + window.current_page_id + '_section_"]').each(function () {
                var hasVisibleRows = $(this).find('li.searchable[data-dlc]:not(.d-none)').length > 0;
                $(this).toggleClass('d-none', !hasVisibleRows);

                var sectionId = $(this).attr('id');
                var $tocLi = $('a.toc_link[href="#' + sectionId + '"]').closest('li');
                if ($tocLi.length) {
                    $tocLi.toggleClass('d-none', !hasVisibleRows);
                }
            });

            // Hide subsection headings (h5 + following ul) when all their items are filtered out
            $('[id^="' + window.current_page_id + '_section_"] h5').each(function () {
                var $h5 = $(this);
                var $ul = $h5.next('ul');
                var hasVisible = $ul.find('li.searchable[data-dlc]:not(.d-none)').length > 0;
                $h5.toggleClass('d-none', !hasVisible);
                $ul.toggleClass('d-none', !hasVisible);
            });
        }

        var dlcFilter = $('#dlc_filter');
        if (dlcFilter.length) {
            var savedDlc = profiles[profilesKey][profiles.current].dlc_filter || 'both';
            dlcFilter.val(savedDlc);
            dlcFilter.on('change', function () {
                var mode = $(this).val();
                profiles = $.jStorage.get(profilesKey, {});
                profiles[profilesKey][profiles.current].dlc_filter = mode;
                $.jStorage.set(profilesKey, profiles);
                applyDlcFilter(mode);

                var searchInput = $('#' + window.current_page_id + '_search');
                if (searchInput.length && searchInput.val()) {
                    searchInput.trigger('input');
                    setTimeout(function () {
                        searchInput.trigger('keyup');
                    }, 10);
                }
            });
            applyDlcFilter(savedDlc);
        }

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

})(jQuery);
