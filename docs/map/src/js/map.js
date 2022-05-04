(function ($) {
    'use strict';
        
    if (window.innerWidth < 768) {
        $('#layer-menu').removeClass('show');
        $('#layer-menu').removeClass('d-none');
    }

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

        var hideChecked = false;
        var hiddenGroups = new Set();

        var styleCache = {};
        const styleSelector = function (feature, resolution) {
            if (!(feature.get('icon') in styleCache)) {
                var image = images[feature.get('icon')];
                var scale;
                var icon_size = feature.get('icon_size');
                if (typeof icon_size == 'number') {
                    scale = icon_size / image.naturalHeight;
                } else {
                    scale = [icon_size[0] / image.naturalWidth, icon_size[1] / image.naturalHeight]
                }
                styleCache[feature.get('icon')] = [
                    new ol.style.Style({
                        image: new ol.style.Icon({
                            img: image,
                            imgSize: [image.naturalWidth, image.naturalHeight],
                            scale: feature.get('icon_size') / image.naturalHeight,
                        })
                    }),
                    new ol.style.Style({
                        image: new ol.style.Icon({
                            img: image,
                            imgSize: [image.naturalWidth, image.naturalHeight],
                            scale: feature.get('icon_size') / image.naturalHeight,
                            opacity: 0.5,
                        })
                    })
                ]
            }

            if (hiddenGroups.has(feature.get('group'))) {
                return null;
            }


            profiles = $.jStorage.get(profilesKey, {});
            var id = feature.get('id');

            var checked = profiles[profilesKey][profiles.current].checklistData[id] === true;
            var style;
            if (checked) {
                if (!hideChecked || feature.get('group') === 'graces')
                    style = styleCache[feature.get('icon')][1];
            } else {
                style = styleCache[feature.get('icon')][0];
            }

            // var image = images[feature.get('icon')];
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
                    interpolate: false,
                    // updateWhileAnimating: true,
                    // updateWhileInteracting: true,
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
                renderBuffer: 15968,
            }));
        }

        var zoom = 5;
        var center = [4129, -7328];
        if ('previousPosition' in profiles[profilesKey][profiles.current].map_settings) {
            const pos = profiles[profilesKey][profiles.current].map_settings['previousPosition'];
            zoom = parseFloat(pos[0]);
            center = [parseFloat(pos[1]), parseFloat(pos[2])];
        }

        var map = new ol.Map({
            target: 'map',
            layers: layers,
            view: new ol.View({
                center: center,
                zoom: zoom,
                maxZoom: 8,
                projection: projection,
                extent: erextent,
                // resolutions: ertilegrid.getResolutions(),
                showFullExtent: true,
                enableRotation: false,
            }),
            overlays: [overlay],
        });

        var devMode = false;

        function initializeSettings() {
            profiles = $.jStorage.get(profilesKey, {});
            if ('hideCompleted' in profiles[profilesKey][profiles.current].map_settings && profiles[profilesKey][profiles.current].map_settings['hideCompleted']) {
                $('#hideCompleted').prop('checked', true);
                hideChecked = true;
            } else {
                $('#hideCompleted').prop('checked', false);
                hideChecked = false;
            }
            if ('hiddenGroups' in profiles[profilesKey][profiles.current].map_settings) {
                hiddenGroups = new Set(profiles[profilesKey][profiles.current].map_settings['hiddenGroups']);
                console.log(hiddenGroups)
                for (let group of hiddenGroups) {
                    console.log(group)
                    $('#' + group).prop('checked', true);
                    $('#' + group).closest('div').addClass('completed text-muted')
                }
            }
            if ('devMode' in profiles[profilesKey][profiles.current].map_settings) {
                devMode = profiles[profilesKey][profiles.current].map_settings.devMode;
            }

            map.getAllLayers().forEach((l) => l.changed());
            $.jStorage.set(profilesKey, profiles);
        }

        initializeSettings();
        
        const updateSavedPosition = function () {
            profiles = $.jStorage.get(profilesKey, {});
            const center = map.getView().getCenter();
            profiles[profilesKey][profiles.current].map_settings['previousPosition'] = [map.getView().getZoom().toFixed(2), center[0].toFixed(2), center[1].toFixed(2)];
            $.jStorage.set(profilesKey, profiles);
        }


        function gototarget() {
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });

            let id = params.id;

            if (id) {
                for (var i = 1; i < layers.length; i++) {
                    let feature = layers[i].getSource().getFeatureById(id);
                    if (feature) {
                        const pos = map.getView().getCenter();
                        const t = feature.getGeometry().flatCoordinates
                        const dist = (Math.sqrt(((t[0] - pos[0]) * (t[0] - pos[0])) + ((t[1] - pos[1]) * (t[1] - pos[1]))));

                        map.getView().animate({
                            center: t,
                            zoom: 6,
                            duration: Math.max((dist / 18654.8) * 4000, 1000),
                        }, (b) => {
                            if (b) {
                                popup_feature(feature);
                            }
                        })
                    }
                }
            }
        }

        map.once('rendercomplete', gototarget);
        
        map.on('moveend', updateSavedPosition);





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

            if (devMode) {
                var c = ol.coordinate.toStringXY(ol.proj.fromLonLat(coordinate, projection));

                popup_title.innerHTML = `<code>\n        cords: [${c}]\n        map_title: ""</code>`;
                overlay.setPosition(coordinate);
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(popup_title);
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand('copy');
            } else {
                overlay.setPosition(undefined);
                popup_closer.blur();
            }
        });

        $('#popup-checkbox').click(function () {
            var id = $(this).attr('data-id');
            var isChecked = $(this).prop('checked');
            setItem(id, isChecked);
            if (isChecked) {
                $(popup_checkbox).closest('div').addClass('completed')
            } else {
                $(popup_checkbox).closest('div').removeClass('completed')
            }
            map.getAllLayers().forEach((l) => l.changed())
            calculateProgress();
        });

        $('#hideCompleted').click(function() {
            profiles = $.jStorage.get(profilesKey, {});
            var isChecked = !!$(this).prop('checked');
            hideChecked = isChecked;
            map.getAllLayers().forEach((l) => l.changed())
            profiles[profilesKey][profiles.current].map_settings['hideCompleted'] = isChecked;
            $.jStorage.set(profilesKey, profiles);
        });

        $('.category-filter').click(function () {
            profiles = $.jStorage.get(profilesKey, {});
            var isChecked = !!$(this).prop('checked');
            var id = $(this).attr('id');
            if (isChecked) {
                hiddenGroups.add(id);
                $(this).closest('div').addClass('completed text-muted')
            } else {
                hiddenGroups.delete(id);
                $(this).closest('div').removeClass('completed text-muted')
            }
            profiles[profilesKey][profiles.current].map_settings['hiddenGroups'] = Array.from(hiddenGroups);
            $.jStorage.set(profilesKey, profiles);
            map.getAllLayers().forEach((l) => l.changed())
        });

        function calculateProgress() {
            profiles = $.jStorage.get(profilesKey, {});
            for (let group of feature_data) {
                var grp_id = group['id'];
                var tracker = $('#' + grp_id + '_progress_total');
                var total = group['features'].length;
                var num_checked = 0;
                for (let feature of group['features']) {
                    if (!!profiles[profilesKey][profiles.current].checklistData[feature['id']]) {
                        num_checked += 1;
                    }
                }
                if (num_checked === total) {
                    tracker.html('DONE')
                } else {
                    tracker.html(num_checked + '/' + total);
                }
            }
        }

        function displayProgress() {
            
        }

        calculateProgress();
    })
})(jQuery);
