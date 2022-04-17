if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/js/sw.js').then(() => { console.log('Service Worker Registered'); });
}

(function($) {
    'use strict';

    $('.markdown table').addClass('table table-striped');
    $('.markdown th').attr('scope', 'col');
    $('.markdown blockquote').addClass('blockquote');


})(jQuery);