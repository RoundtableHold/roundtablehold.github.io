(function($) {
    'use strict';

    if ('loading' in HTMLImageElement.prototype) {
        $('img[loading="lazy"]').each(function() {
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

})( jQuery );
    