// var L = require('leaflet')
// L.RasterCoords = require('leaflet-rastercoords')

var img = [
    9645, // Original width of image
    9645,  // Original height of image
]

var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 0,
    maxZoom: 6,
    wheelPxPerZoomLevel: 500,
});

var rc = new L.RasterCoords(map, img);

map.setMaxZoom(rc.zoomLevel());

map.setView(rc.unproject([4500, 4500]), 4);

// map.on('click', function (event) {
//     var coords = rc.project(event.latlng);
//     var marker = L.marker(rc.unproject(coords)).addTo(map);
//     marker.bindPopup('[' + Math.floor(coords.x) + ',' + Math.floor(coords.y) + ']').openPopup();
// });

L.tileLayer('/map/tiles/{z}/{x}/{y}.png', {
    tms: true,
    noWrap: true,
    bounds: rc.getMaxBounds(),
    maxNativeZoom: rc.zoomLevel()
}).addTo(map);