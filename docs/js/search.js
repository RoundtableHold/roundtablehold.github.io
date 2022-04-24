
(function($) {
    'use strict';

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    let query = params.search;

    function do_search(query) {
        $.getJSON('/search_index.json', function(json_index) {
            console.log('have json')
            var idx = lunr(function () {
                this.ref('id');
                this.field('text');
                this.metadataWhitelist = ['text']

                json_index.forEach(function (entry) {
                    this.add(entry)
                }, this);
            });

            var db = json_index.reduce(function(acc, document) {
                acc[document.id] = document.text
                return acc
            }, {});

            console.log('built index')

            var results_div = $('#search_results');
            var results = idx.search(query);
            console.log(results)
            results_div.append('<div class="list-group list-group-flush">')
            results.forEach(function(match) {
                results_div.append('<a href="' + match.ref + '" class="list-group-item list-group-item-action">' + db[match.ref].replace(/(<([^>]+)>)/ig, '') + '</a>');
            });
            results_div.append('</div>')
        });
    }
    
    if (query) {
        $('#page_search').attr('value', query);
        console.log('query = ' + query)
        do_search(query);
    }

    $('#search_submit').click(function() {
        var query = $('#page_search').attr('value');
        console.log('query = ' + query)
        do_search(query);
    })


})( jQuery );