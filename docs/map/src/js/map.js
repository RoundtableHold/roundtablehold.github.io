(function ($) {
    'use strict';

    const loadImage = src =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });


    Promise.allSettled(icon_urls.map(loadImage)).then(imgs => {
        var images = {};

        imgs.forEach((img, i) => {
            images[icon_urls[i]] = img.value;
        });

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
            function (coordinate) {
                return [coordinate[0], -coordinate[1]];
            },
            function (coordinate) {
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

        var styleCache = {};
        const styleSelector = function (feature, resolution) {
            if (!(feature.get('icon') in styleCache)) {
                var image = images[feature.get('icon')];
                styleCache[feature.get('icon')] = [
                    new ol.style.Style({
                        image: new ol.style.Icon({
                            img: image,
                            imgSize: [image.naturalWidth, image.naturalHeight],
                            scale: 60 / image.naturalHeight,
                        })
                    }),
                    new ol.style.Style({
                        image: new ol.style.Icon({
                            img: image,
                            imgSize: [image.naturalWidth, image.naturalHeight],
                            scale: 60 / image.naturalHeight,
                            opacity: 0.5,
                        })
                    })
                ]
            }

            profiles = $.jStorage.get(profilesKey, {});
            var id = feature.get('id');
            var checked = profiles[profilesKey][profiles.current].checklistData[id] === true;
            var style;
            if (checked) {
                style = styleCache[feature.get('icon')][1];
            } else {
                style = styleCache[feature.get('icon')][0];
            }

            var image = images[feature.get('icon')];
            // style.getImage().setScale((map.getView().getResolutionForZoom(6) / resolution) * (60 / image.naturalHeight));
            return style;
        }

        var layers = [
            new ol.layer.Tile({
                preload: Infinity,
                source: new ol.source.XYZ({
                    url: '/map/tiles/{z}/{x}/{y}.png',
                    tileGrid: ertilegrid,
                    tileSize: [256, 256],
                    projection: projection,
                    updateWhileAnimating: true,
                    updateWhileInteracting: true,
                })
            }),
        ]

        const format = new ol.format.GeoJSON();
        for (let c of feature_data) {
            layers.push(new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: format.readFeatures(c, { featureProjection: projection }),
                    overlaps: false,
                    updateWhileAnimating: true,
                    updateWhileInteracting: true,
                }),
                style: styleSelector,
            }));
        }


        var map = new ol.Map({
            target: 'map',
            layers: layers,
            view: new ol.View({
                center: ol.extent.getCenter(erextent),
                zoom: 2,
                maxZoom: 8,
                projection: projection,
                extent: erextent,
                resolutions: ertilegrid.getResolutions(),
                showFullExtent: true,
                enableRotation: false,
            }),
            overlays: [overlay],
        });

        function gototarget() {
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });

            let id = params.id;

            if (id) {
                for (var i = 1; i < layers.length; i++) {
                    let feature = layers[i].getSource().getFeatureById(id);
                    if (feature) {
                        map.getView().animate({
                            center: feature.getGeometry().flatCoordinates,
                            zoom: 6,
                        })
                        popup_feature(feature);
                    }
                }
            }
        }

        map.once('rendercomplete', gototarget);





        popup_closer.onclick = function () {
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

        function popup_feature(feature) {
            profiles = $.jStorage.get(profilesKey, {});
            var id = feature.get('id');
            var checked = profiles[profilesKey][profiles.current].checklistData[feature.get('id')] === true;
            $(popup_checkbox).prop('checked', checked);
            $(popup_checkbox).attr('data-id', id);
            if (checked) {
                $(popup_checkbox).closest('div').addClass('completed')
            } else {
                $(popup_checkbox).closest('div').removeClass('completed')
            }
            popup_link.href = feature.get('link')
            popup_title.innerHTML = feature.get('title');
            overlay.setPosition(feature.getGeometry().flatCoordinates);
        }

        map.on('singleclick', function (evt) {
            const coordinate = evt.coordinate;
            let feature = map.getFeaturesAtPixel(evt.pixel)[0];
            if (feature) {
                popup_feature(feature);
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
            if (isChecked) {
                $(popup_checkbox).closest('div').addClass('completed')
            } else {
                $(popup_checkbox).closest('div').removeClass('completed')
            }
        });
    })
})(jQuery);