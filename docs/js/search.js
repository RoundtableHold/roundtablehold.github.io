
(function($) {
    'use strict';


    var all_as = $('a.searchable');
    var spinner = $('#spinner');

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    let query = params.search;

    function do_search(query) {
        spinner.removeClass('d-none');
        $.getJSON('/search_index.json', function(json_index) {
            var idx = lunr(function () {
                this.b(1);
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

            var s = query.split(' ');
            for (var i = 0; i < s.length; i++) {
                s[i] = '+' + s[i];
            }
            query = s.join(' ');
            var results = idx.search(query);
            var m = new Set(results.map(x => x.ref))
            all_as.filter((idx, el) => {
                return m.has(el.id)
            }).removeClass('d-none');
            spinner.addClass('d-none');
        });
    }
    
    if (query) {
        $('#page_search').attr('value', query);
        do_search(query);
    }

    // $('#search_submit').click(function() {
    //     var query = $('#page_search').attr('value');
    //     do_search(query);
    // })


})( jQuery );