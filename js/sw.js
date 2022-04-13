self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('roundtable-store').then((cache) => cache.addAll([
            '/index.html',
            '/js/',
            '/js/bootstrap.bundle.min.js',
            '/js/item_links.js',
            '/js/jets.min.js',
            '/js/jquery.highlight.js',
            '/js/jquery.min.js',
            '/js/jstorage.min.js',
            '/js/main.js',
            '/js/search.js',
            '/css/',
            '/css/bootstrap.min.css',
            "/css/themes/cerulean/bootstrap.min.css",
            "/css/themes/cosmo/bootstrap.min.css",
            "/css/themes/cyborg/bootstrap.min.css",
            "/css/themes/darkly/bootstrap.min.css",
            "/css/themes/flatly/bootstrap.min.css",
            "/css/themes/journal/bootstrap.min.css",
            "/css/themes/litera/bootstrap.min.css",
            "/css/themes/lumen/bootstrap.min.css",
            "/css/themes/lux/bootstrap.min.css",
            "/css/themes/materia/bootstrap.min.css",
            "/css/themes/minty/bootstrap.min.css",
            "/css/themes/Morph/bootstrap.min.css",
            "/css/themes/pulse/bootstrap.min.css",
            "/css/themes/quartz/bootstrap.min.css",
            "/css/themes/regent/bootstrap.min.css",
            "/css/themes/sandstone/bootstrap.min.css",
            "/css/themes/simplex/bootstrap.min.css",
            "/css/themes/sketchy/bootstrap.min.css",
            "/css/themes/slate/bootstrap.min.css",
            "/css/themes/solar/bootstrap.min.css",
            "/css/themes/spacelab/bootstrap.min.css",
            "/css/themes/superhero/bootstrap.min.css",
            "/css/themes/united/bootstrap.min.css",
            "/css/themes/vapor/bootstrap.min.css",
            "/css/themes/yeti/bootstrap.min.css",
            "/css/themes/zephyr/bootstrap.min.css",
        ])),
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});