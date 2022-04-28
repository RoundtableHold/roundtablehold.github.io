// var L = require('leaflet')
// L.RasterCoords = require('leaflet-rastercoords')
(function($) {
    var img = [
        9645, // Original width of image
        15968,  // Original height of image
    ]

    var map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: 0,
        maxZoom: 6,
        scrollWheelZoom: false,
        smoothWheelZoom: true,
        smoothSensitivity: 1,
    });

    var rc = new L.RasterCoords(map, img);

    map.setMaxZoom(8);

    map.setView(rc.unproject([4500, 4500]), 4);

    map.on('click', function (event) {
        var coords = rc.project(event.latlng);
        var marker = L.marker(rc.unproject(coords)).addTo(map);
        marker.bindPopup(Math.floor(coords.x) + ',' + Math.floor(coords.y)).openPopup();
    });

    L.tileLayer('/map/tiles/{z}/{x}/{y}.png', {
        noWrap: true,
        bounds: rc.getMaxBounds(),
        maxNativeZoom: rc.zoomLevel(),
    }).addTo(map);

    var grace = L.icon({
        iconUrl: '/map/icons/MENU_MAP_01_Bonfire.png',
        iconSize: [60,60],
    });

    $.getJSON('/map/data/graces.json', function(geojson) {
        L.geoJSON(geojson, {
            pointToLayer: function(feature, latlng) {
                return L.marker(rc.unproject([latlng.lng, latlng.lat]), {
                    icon: grace,
                });
            },
        }).bindPopup(function(layer) {
            return layer.feature.properties.title;
        }).addTo(map);
    }).done(function() { console.log('done')})
    .fail(function() { console.log('error')})


    // var customLayer = L.geoJson(null, {
    //     pointToLayer: function(feature, latlng) {
    //         return L.marker(rc.unproject([latlng.lat, latlng.lng]), {
    //             icon: grace,
    //         });
    //     }
    // });
    // var layer = omnivore.csv('/map/data/graces.csv', null, customLayer)
    //     .on('error', function(e) {
    //         console.log(e);
    //     });

    // layer.addTo(map);

}) (jQuery);
