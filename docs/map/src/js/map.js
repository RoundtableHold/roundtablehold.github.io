// var L = require('leaflet')
// L.RasterCoords = require('leaflet-rastercoords')
(function($) {
    'use strict';

    // const erextent = [0, 0, 9645, 15968];
    const erextent = [0, -15968, 9645, 0];
    // const erextent = [0, 0, 9645, -15968];
    const projection = new ol.proj.Projection({
        code: 'ZOOMIFY',
        units: 'pixels',
        extent: erextent,
        axisOrientation: 'esu',
    });
    ol.proj.addCoordinateTransforms('EPSG:4326', projection,
        function(coordinate) {
            return [coordinate[0], -coordinate[1]];
        },
        function(coordinate) {
            return [coordinate[0], -coordinate[1]];
        },
    );

    var ertilegrid = new ol.tilegrid.TileGrid({
        extent: erextent,
        resolutions: [64, 32, 16, 8, 4, 2, 1]
    });
    
    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');
    
    const overlay = new ol.Overlay({
        element: container,
        autoPan: {
            animation: {
                duration: 250,
            },
        },
    });

    const grace = new ol.style.Style({
        image: new ol.style.Icon({
            src: '/map/icons/MENU_MAP_01_Bonfire.png',
            scale: 0.3,
        })
    });
    const boss = new ol.style.Style({
        image: new ol.style.Icon({
            src: '/map/icons/MENU_MAP_memo_20.png',
            scale: 0.4,
        })
    });

    var graceLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            projection: projection,
            url: '/map/data/graces.json',
            format: new ol.format.GeoJSON(),
        }),
        style: () => grace,
    });
    var bossesLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            projection: projection,
            url: '/map/data/bosses.json',
            format: new ol.format.GeoJSON(),
        }),
        style: () => boss,
    });
    
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                preload: Infinity,
                source: new ol.source.XYZ({
                    url: '/map/tiles/{z}/{x}/{y}.png',
                    tileGrid: ertilegrid,
                    tileSize: [256, 256],
                    projection: projection,
                })
            }),
            graceLayer,
            bossesLayer,
        ],
        view: new ol.View({
            center: ol.extent.getCenter(erextent),
            zoom: 2,
            projection: projection,
            extent: erextent,
            resolutions: ertilegrid.getResolutions(),
            showFullExtent: true,
            enableRotation: false,
        }),
        overlays: [overlay],
    });



    closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    }

    const info = $('#info');
    const tooltip = new bootstrap.Tooltip(info.get(0), {
        animation: false,
        trigger: 'manual',
    })

    map.on('pointermove', function(evt) {
        if (evt.dragging) {
            tooltip.hide();
            return;
        }
        let feature = map.getFeaturesAtPixel(evt.pixel)[0];
        if (feature) {
            const p = map.getPixelFromCoordinate(feature.getGeometry().flatCoordinates);
            info.css({
                left: (p[0] + 10) + 'px',
                top: (p[1] + 57) + 'px',
            });
            info.attr('data-bs-original-title', feature.get('title'));
            tooltip.show();
        } else {
            tooltip.hide();
        }
    })

    map.on('singleclick', function(evt) {
        const coordinate = evt.coordinate;
        let feature = map.getFeaturesAtPixel(evt.pixel)[0];
        if (feature) {
            content.innerHTML = `<h4>${feature.get("title")}</h4><p>${feature.get('description')}</p>`;
            overlay.setPosition(feature.getGeometry().flatCoordinates);
            return;
        }

        var c = ol.coordinate.toStringXY(ol.proj.fromLonLat(coordinate, projection));
        
        content.innerHTML = `<code>\n  - cords: [${c}]\n    title: ""\n    description: ""\n    id: ""</code>`;
        overlay.setPosition(coordinate);
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(content);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
    });

    // var img = [
    //     9645, // Original width of image
    //     15968,  // Original height of image
    // ]

    // var map = L.map('map', {
    //     crs: L.CRS.Simple,
    //     minZoom: 0,
    //     maxZoom: 6,
    //     scrollWheelZoom: false,
    //     smoothWheelZoom: true,
    //     smoothSensitivity: 1,
    // });

    // var rc = new L.RasterCoords(map, img);

    // map.setMaxZoom(8);

    // map.setView(rc.unproject([4500, 4500]), 4);

    // map.on('click', function (event) {
    //     var coords = rc.project(event.latlng);
    //     var marker = L.marker(rc.unproject(coords)).addTo(map);
    //     marker.bindPopup(Math.floor(coords.x) + ',' + Math.floor(coords.y)).openPopup();
    // });

    // L.tileLayer('/map/tiles/{z}/{x}/{y}.png', {
    //     noWrap: true,
    //     bounds: rc.getMaxBounds(),
    //     maxNativeZoom: rc.zoomLevel(),
    // }).addTo(map);

    // var grace = L.icon({
    //     iconUrl: '/map/icons/MENU_MAP_01_Bonfire.png',
    //     iconSize: [60,60],
    // });
    // var boss = L.icon({
    //     iconUrl: '/map/icons/MENU_MAP_memo_20.png',
    //     iconSize: [60,60],
    // });

    // var markers = [
    //     ['graces.json', grace],
    //     ['bosses.json', boss],
    // ]

    // for (let f of markers) {
    //     $.getJSON(`/map/data/${f[0]}`, function(geojson) {
    //         L.geoJSON(geojson, {
    //             pointToLayer: function(feature, latlng) {
    //                 return L.marker(rc.unproject([latlng.lng, latlng.lat]), {
    //                     icon: f[1],
    //                 });
    //             },
    //             onEachFeature: function(feature, layer) {
    //                 layer.bindPopup(`<div class="card-body"><h4 class="card-title">${layer.feature.properties.title}</h4><p class="card-text">${layer.feature.properties.description}</p></div>`, {
    //                     className: 'card'
    //                 });
    //             }
    //         }).addTo(map);
    //     });
    // }


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

})(jQuery);
