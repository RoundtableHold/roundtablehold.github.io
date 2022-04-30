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
    
    const popup_container = document.getElementById('popup');
    const popup_checkbox = document.getElementById('popup-checkbox');
    const popup_title = document.getElementById('popup-title');
    const popup_link = document.getElementById('popup-link');
    const popup_closer = document.getElementById('popup-closer');
    
    const overlay = new ol.Overlay({
        element: popup_container,
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

    var styleCache = {};
    const styleSelector = function (feature, resolution) {
        if (!(feature.get('icon') in styleCache)) {
            var image = new ol.Image()
            styleCache[feature.get('icon')] = new ol.style.Style({
                image: new ol.style.Icon({
                    src: feature.get('icon'),
                    scale: 0.3,
                    // scale: [60,60],
                })
            })
        }

        return styleCache[feature.get('icon')];
    }

    
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

    $.getJSON('/map/layers.json', function(json) {
        for (let l of json) {
            var featureLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    projection: projection,
                    url: l,
                    format: new ol.format.GeoJSON(),
                }),
                style: styleSelector,
            });

            map.addLayer(featureLayer);
        }
    });


    popup_closer.onclick = function() {
        overlay.setPosition(undefined);
        popup_closer.blur();
        return false;
    }

    // const info = $('#info');
    // const tooltip = new bootstrap.Tooltip(info.get(0), {
    //     animation: false,
    //     trigger: 'manual',
    // })

    // map.on('pointermove', function(evt) {
    //     if (evt.dragging) {
    //         tooltip.hide();
    //         return;
    //     }
    //     let feature = map.getFeaturesAtPixel(evt.pixel)[0];
    //     if (feature) {
    //         const p = map.getPixelFromCoordinate(feature.getGeometry().flatCoordinates);
    //         info.css({
    //             left: (p[0] + 10) + 'px',
    //             top: (p[1] + 57) + 'px',
    //         });
    //         info.attr('data-bs-original-title', feature.get('title'));
    //         tooltip.show();
    //     } else {
    //         tooltip.hide();
    //     }
    // })

    function createPopup(feature) {
        return `<div class="form-check checkbox d-flex align-items-center">
            <input class="form-check-input" id="${feature.get('id')}" type="checkbox" value>
            <label class="form-check-label item_content" for="${feature.get('id')}">${feature.get('title')}</label>
        </div>`;
    }

    map.on('singleclick', function(evt) {
        const coordinate = evt.coordinate;
        let feature = map.getFeaturesAtPixel(evt.pixel)[0];
        if (feature) {
            profiles = $.jStorage.get(profilesKey, {});
            var id = feature.get('id');
            var checked = profiles[profilesKey][profiles.current].checklistData[feature.get('id')] === true;
            $(popup_checkbox).attr('checked', checked);
            $(popup_checkbox).attr('data-id', id);
            popup_link.href = feature.get('link')
            popup_title.innerHTML = feature.get('title');
            overlay.setPosition(feature.getGeometry().flatCoordinates);
            return;
        }

        var c = ol.coordinate.toStringXY(ol.proj.fromLonLat(coordinate, projection));
        
        popup_title.innerHTML = `<code>\n        cords: [${c}]\n        map_title: ""</code>`;
        overlay.setPosition(coordinate);
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(popup_title);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
    });
        
    $('.checkbox input[type="checkbox"]').click(function () {
        var id = $(this).attr('data-id');
        var isChecked = $(this).prop('checked');
        setItem(id, isChecked);
    });
})(jQuery);
