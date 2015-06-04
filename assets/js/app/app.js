var map = L.map('map').setView([52.1683, 5.378048973], 13);
var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
var markers = L.markerClusterGroup();
var jsondata = {};

L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: 'Map data &copy; ' + mapLink,
        maxZoom: 18
    }
).addTo(map);

$.getJSON(
    'assets/data/fruitig-amersfoort.geojson',
    function (data) {
        "use strict";

    }
);

//function to pass ajax data into variable
//see http://stackoverflow.com/questions/905298/jquery-storing-ajax-response-into-global-variable
//this is necessary as we unload and reload the layer data according to filtered values
jQuery.extend({
    getValues: function (url) {
        "use strict";
        var result = null;
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            async: false,
            success: function (data) {
                result = data;
            }
        });
        return result;
    }
});

jsondata = $.getValues('assets/data/fruitig-amersfoort.geojson');

var geoJsonLayer = L.geoJson(jsondata, {
    onEachFeature: function (feature, layer) {
        "use strict";
        layer.bindPopup(feature.properties.NEDERLANDS);
    }
});

markers.addLayer(geoJsonLayer);
map.addLayer(markers);

function menuChange(select) {
    "use strict";
    console.log(select.value);
    markers.removeLayer(geoJsonLayer);

    geoJsonLayer = L.geoJson(jsondata, {
        filter: function (feature, layer) {
            return feature.properties.NEDERLANDS.toLowerCase().indexOf(select.value.toLowerCase()) !== -1;
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.NEDERLANDS);
        }
    });

    markers.addLayer(geoJsonLayer);
}
