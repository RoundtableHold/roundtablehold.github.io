(function($) {
    'use strict';
    $('head').append('<style id="scroll-margin-sheet" type="text/css"></style>');

    var offset = $('#top_nav').outerHeight(true) + 15;

    $("#scroll-margin-sheet").get(0).sheet.insertRule(':target {scroll-margin-top: ' + offset + 'px; }', 0);

    if ('loading' in HTMLImageElement.prototype) {
        $('img[loading="lazy"]').each(function() {
            $(this).attr('src', this.dataset.src);
        });
    } else {
        const lazyScript = document.createElement('script');
        lazyScript.src = '/js/lazysizes.min.js';
        document.body.appendChild(lazyScript);
    }

})( jQuery );
    