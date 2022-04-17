if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/js/sw.js').then(() => { console.log('Service Worker Registered'); });
}

(function($) {
    'use strict';

    $('.markdown table').addClass('table table-striped');
    $('.markdown th').attr('scope', 'col');
    $('.markdown blockquote').addClass('blockquote');

    var tab_container = $('.markdown .tab-content');
    tab_container.children().removeClass('active show');
    tab_container.children().first().addClass('active show');


})(jQuery);