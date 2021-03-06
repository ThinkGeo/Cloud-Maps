/*===========================================================================*/
// Work with WFS
// Sample map by ThinkGeo
//
//   1. ThinkGeo Cloud API Key
//   2. WFS Setup
//   3. Map Control Setup
//   4. Tile Loading Event Handlers
/*===========================================================================*/


/*---------------------------------------------*/
// 1. ThinkGeo Cloud API Key
/*---------------------------------------------*/

// First, let's define our ThinkGeo Cloud API key, which we'll use to
// authenticate our requests to the ThinkGeo Cloud API.  Each API key can be
// restricted for use only from a given web domain or IP address.  To create your
// own API key, you'll need to sign up for a ThinkGeo Cloud account at
// https://cloud.thinkgeo.com.
const apiKey = 'yqLXRwQc83GX5fm20Rql6CPdjnYmmC66GXsJUBYoFD4~';


/*---------------------------------------------*/
// 2. WFS Setup
/*---------------------------------------------*/

// Create another layer from the Great Lakes Water GeoJSON, this time to hold the boundary
// color for each water. Then use this styleJSON object to render WFS layer.

// For more info about StyleJSON, see our wiki:
// https://thinkgeo.gitbooks.io/map-suite-stylejson-specification/content/

// For more info about Map Suite Portable Data Format, see our wiki:
// https://wiki.thinkgeo.com/wiki/map_suite_portable_data_format_guide
const wfsStyleJson =
{
    "id": "thinkgeo-world-streets",
    "version": 1.3,
    "owner": "ThinkGeo LLC",
    "time": "2018/06/09",
    "background": "#aac6ee",
    "variables": {
    },
    "styles": [{
        "id": "water",
        "style": [
            {
                "line-color": "#ff00ff",
                "line-width": 2,
            },
        ]
    },
    ],
    "sources": [{
        "id": "data_source",
        "url": "http://samples.thinkgeo.com/cloud/example/data/water_areas.geojson",
        "type": "WFS",
        "dataProjection": "EPSG:3857"
    }],
    "layers": [{
        "id": "worldstreets_layers",
        "source": "data_source",
        "styles": [
            "water"
        ]
    }]
}

// Create WFS layer by using the pre-defined StyleJSON.
let wfsLayer = new ol.mapsuite.VectorLayer(wfsStyleJson, {
    multithread: false
})


/*---------------------------------------------*/
// 3. Map Control Setup
/*---------------------------------------------*/

// Now we'll create the base layer for our map. The base layer uses the ThinkGeo Cloud
// Maps Raster Tile service to display a detailed map.  For more info, see our wiki:
// https://wiki.thinkgeo.com/wiki/thinkgeo_cloud_maps_raster_tiles
let baseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: `https://cloud.thinkgeo.com/api/v1/maps/raster/aerial/x1/3857/512/{z}/{x}/{y}.jpeg?apiKey=${apiKey}`,
    }),
});

// Create and initialize our map control.
let map = new ol.Map({
	renderer: 'webgl',
    loadTilesWhileAnimating: true,
    loadTilesWhileInteracting: true,
    // States that the HTML tag with id="map" should serve as the container for our map.
    target: 'map',
    // Add our previously-defined ThinkGeo Cloud Raster Tile layers and WFS data layers to the map.
    layers: [
        baseLayer, wfsLayer
    ],
    // Create a default view for the map when it starts up.
    view: new ol.View({
        // Center the map on the Great Lakes region and start at zoom level 12.
        center: [-8908887.277395891, 5381918.072437216],
        zoom: 12,
        minZoom: 1,
        maxZoom: 19,
        progressiveZoom: false,
    })
});

// Add a button to the map that lets us toggle full-screen display mode.
map.addControl(new ol.control.FullScreen());


/*---------------------------------------------*/
// 4. Tile Loading Event Handlers
/*---------------------------------------------*/

// These events allow you to perform custom actions when
// a map tile encounters an error while loading.
const errorLoadingTile = () => {
    const errorModal = document.querySelector('#error-modal');
    if (errorModal.classList.contains('hide')) {
        // Show the error tips when Tile loaded error.
        errorModal.classList.remove('hide');
    }
}

const setLayerSourceEventHandlers = (layer) => {
    let layerSource = layer.getSource();
    layerSource.on('tileloaderror', function () {
        errorLoadingTile();
    });
}

setLayerSourceEventHandlers(baseLayer);

document.querySelector('#error-modal button').addEventListener('click', () => {
    document.querySelector('#error-modal').classList.add('hide');
})