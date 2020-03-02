/*===========================================================================*/
// Places Along Route
// Sample map by ThinkGeo
// 
//   1. ThinkGeo Cloud API Key
//   2. Map Control Setup
//   3. ThinkGeo Map Icon Fonts
//   4. Event Listeners
/*===========================================================================*/

/*---------------------------------------------*/
// 1. ThinkGeo Cloud API Key
/*---------------------------------------------*/

// First, let's define our ThinkGeo Cloud API key, which we'll use to
// authenticate our requests to the ThinkGeo Cloud API.  Each API key can be
// restricted for use only from a given web domain or IP address.  To create your
// own API key, you'll need to sign up for a ThinkGeo Cloud account at
// https://cloud.thinkgeo.com.
const apiKey = 'WPLmkj3P39OPectosnM1jRgDixwlti71l8KYxyfP2P0~';

/*---------------------------------------------*/
// 2. Map Control Setup
/*---------------------------------------------*/

// Here's where we set up our map.  We're going to create layers, styles,
// and define our initial view when the page first loads.

// Now we'll create the base layer for our map.  The base layer uses the ThinkGeo
// Cloud Maps Vector Tile service to display a detailed street map. For more
// info, see our wiki:
// https://wiki.thinkgeo.com/wiki/thinkgeo_cloud_maps_vector_tiles
let map = null;
const locationNumberMap = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const isMobile = () => {
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
    ) {
        return true;
    }
    else {
        return false;
    }
};

const formatNumber = (number, decimal) => {
    // split by dot
    const innerDecimal = decimal > 0 && decimal <= 20 ? decimal : 1;
    const innerNumber = parseFloat((number + '').replace(/[^\d\.-]/g, '')).toFixed(innerDecimal) + '';
    const left = innerNumber.split('.')[0].split('').reverse();
    const right = innerNumber.split('.')[1];

    // insert comma between each 3 left numbers
    let text = '';
    for (i = 0; i < left.length; i++) {
        text += left[i] + ((i + 1) % 3 == 0 && (i + 1) != left.length ? ',' : '');
    }

    text = text.split('').reverse().join('');

    // append dot and right numbers if needed
    if (decimal > 0) {
        text = text + '.' + right;
    }

    return text;
};

const commitLocationSource = () => {
    // clear the features from source
    const locationSource = map.get('locationSource');
    const features = locationSource.get('features');
    locationSource.clear();

    // sort the committed features by number
    features.sort((feature1, feature2) => {
        return feature1.get('number') - feature2.get('number');
    });

    // update features and then add them back to source
    features.forEach((feature, index) => {
        feature.set('number', index);
        feature.setStyle(getPointStyle(locationNumberMap[index]));
        locationSource.addFeature(feature);
    });
};

const getPointStyle = (numberText) => {
    const url = `https://samples.thinkgeo.com/cloud/example/image/end-point-letter/end-point-${numberText}.png`
    const style = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.9],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 1,
            crossOrigin: 'Anonymous',
            src: url
        })
    });
    return style;
};

const addPoint = (point) => {
    // check if point count will be more than max location number
    const locationSource = map.get('locationSource');
    const features = locationSource.get('features');
    if (features.length === locationNumberMap.length) {
        const message = document.querySelector('#location-max-message');
        message.classList.add('show');
        setTimeout(() => {
            message.classList.remove('show');
        }, 3000);
        return false;
    }

    // add the new point feature into features
    const feature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat(point)),
        type: 'location',
        raw: point,
        number: features.length
    });
    features.push(feature);
    return true;
};

const removePoint = (feature) => {
    // remove the specified feature from features
    const locationSource = map.get('locationSource');
    const features = locationSource.get('features');
    const newFeatures = [];
    features.forEach((oldFeature) => {
        if (oldFeature !== feature) {
            newFeatures.push(oldFeature);
        }
    });

    // update the features
    locationSource.set('features', newFeatures);
};

const addDefaultPoints = () => {
    addPoint([-97.3261, 32.7920]);
    addPoint([-96.9612, 32.9926]);
    addPoint([-96.6047, 32.7920]);
    addPoint([-96.9612, 32.5883]);
    requestMatrix();
};

const updateLine = (weights) => {
    // get all points from location source
    const points = [];
    const features = map.get('locationSource').get('features');
    features.forEach((feature) => {
        const point = feature.get('raw');
        points.push(ol.proj.fromLonLat(point));
    });

    // remove old lines
    const lineSource = map.get('lineSource');
    lineSource.clear();
    lineSource.set('weights', weights);

    // add new lines, since the line with from A to B is same with from B to A,
    // and the line with from A to A should be ignored, only a part of lines will be added
    weights.forEach((rows, i) => {
        rows.forEach((_weight, j) => {
            if (i <= j) {
                return;
            }

            const coordinates = [points[i], points[j]];
            const feature = new ol.Feature({
                geometry: new ol.geom.LineString(coordinates),
                type: 'line',
            });
            feature.setStyle(new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: 6,
                    color: [34, 109, 214, 0.9]
                }),
            }));
            lineSource.addFeature(feature);
        });
    });
};

const convertWeight = (weight) => {
    let text = null;
    if (document.querySelector('#matrix-type').selectedIndex === 0) {
        if (document.querySelector('#distance-unit').selectedIndex === 0) {
            // distance with metric
            if (weight >= 1000) {
                text = formatNumber(weight / 1000, 1) + ' km';
            } else {
                text = formatNumber(weight, 1) + ' m';
            }
        } else {
            // distance with imperial
            const feet = weight * 3.28084;
            if (feet >= 5280) {
                text = formatNumber(feet / 5280, 1) + ' mi';
            } else {
                text = formatNumber(feet, 1) + ' fe';
            }
        }
    } else {
        // duration with hours and minutes
        if (weight >= 3600) {
            const hourText = formatNumber(weight / 3600, 0) + ' hr';
            const minuteText = formatNumber((weight % 3600) / 60, 0) + ' min'
            text = `${hourText} ${minuteText}`;
        } else {
            text = formatNumber(weight / 60, 0) + ' min';
        }
    }

    return text;
};

const getTableRowColumnNames = (weights) => {
    const names = {
        row: [],
        column: []
    };

    weights.forEach((_weight, index) => {
        const numberText = locationNumberMap[index].toLocaleUpperCase();
        names.row.push(`From ${numberText}`);
        names.column.push(`To ${numberText}`);
    });

    return names;
};

const updateTableFirstRow = (rowNames) => {
    // remove old table head
    const table = document.querySelector('#matrix-panel').querySelector('table');
    let head = table.querySelector('thead');
    head.parentNode.removeChild(head);

    // add new table head
    head = document.createElement('thead');
    table.appendChild(head);

    // add row
    const row = document.createElement('tr');
    head.appendChild(row);

    // add first blank data
    const firstData = document.createElement('th');
    row.appendChild(firstData);

    // add each data
    rowNames.forEach((name) => {
        const data = document.createElement('th');
        data.innerText = name;
        row.appendChild(data);
    });
};

const updateTableRow = (weights, rowNames) => {
    // remove old table body
    const table = document.querySelector('#matrix-panel').querySelector('table');
    let body = table.querySelector('tbody');
    body.parentNode.removeChild(body);

    // add new table body
    body = document.createElement('tbody');
    table.appendChild(body);

    // add each row
    rowNames.forEach((name, i) => {
        const row = document.createElement('tr');
        body.appendChild(row);

        // add first data
        const firstData = document.createElement('th');
        firstData.innerText = name;
        row.appendChild(firstData);

        // add each data
        weights[i].forEach((weight, j) => {
            const data = document.createElement('td');
            if (i === j) {
                data.innerText = '---';
            } else {
                data.innerText = convertWeight(weight);
            }

            row.appendChild(data);
        });
    });
};

const updateTable = (weights) => {
    // show table and remove old table size style if needed 
    const panel = document.querySelector('#matrix-panel');
    panel.classList.value.split(' ').forEach((className) => {
        if (className.indexOf('hide') !== -1) {
            panel.classList.remove('hide');
        }

        if (className.indexOf('data-') !== -1) {
            panel.classList.remove(className);
        }
    });

    // add new table size style based on weights, then update update table rows
    panel.classList.add(`data-${weights.length}`);
    const names = getTableRowColumnNames(weights);
    updateTableFirstRow(names.column);
    updateTableRow(weights, names.row);
};

const cleanMatrix = () => {
    // clean all lines
    const lineSource = map.get('lineSource');
    lineSource.clear();

    // hide the table
    const panel = document.querySelector('#matrix-panel');
    panel.classList.add('hide');
};

const getMatrixOptions = () => {
    // check if point count is less than 3
    const features = map.get('locationSource').get('features');
    if (features.length < 3) {
        cleanMatrix();
        const message = document.querySelector('#location-min-message');
        message.classList.remove('hide');
        setTimeout(() => {
            message.classList.add('hide');
        }, 3000);

        return null;
    }

    // create location text that will be sent
    let locationText = '';
    features.forEach((feature, index) => {
        const point = feature.get('raw');
        locationText += `${point[1]},${point[0]}`;
        if (index !== features.length - 1) {
            locationText += ';';
        }
    });

    // create matrix type that will be sent
    let matrixType = null;
    if (document.querySelector('#matrix-type').selectedIndex === 0) {
        matrixType = 'distance';
    } else {
        matrixType = 'time'
    }

    const options = {
        origins: locationText,
        destinations: locationText,
        costmatrixtype: matrixType,
        durationunit: 'second',
        distanceunit: 'meter'
    };

    return options;
};

const requestMatrix = () => {
    commitLocationSource();
    const options = getMatrixOptions();
    if (options === null) {
        return;
    }

    // show loading elements
    document.querySelector('#loading-animation').classList.remove('hide');
    // At this point we'll built up the methods and functionality that will  
    // actually perform the routing using the ThinkGeo Cloud and then 
    // display the results on the map.

    // We use thinkgeocloudclient.js, which is an open-source Javascript SDK for making 
    // request to ThinkGeo Cloud Service. It simplifies the process of the code of request.

    // This method performs the actual routing using the ThinkGeo Cloud. 
    // By passing the coordinates of the map location and some other options, we can 
    // get back the route line as we send the request.  For more details, see our wiki:
    // https://wiki.thinkgeo.com/wiki/thinkgeo_cloud_routing

    // We need to create the instance of Routing client and authenticate the API key.
    const routingClient = new tg.RoutingClient(apiKey);
    routingClient.baseUrls_ = ['https://cloud.thinkgeo.com'];
    routingClient.getCostMatrix(options, (status, response) => {
        let succeed = false;
        if (status === 200) {
            // get weights
            let weights = null;
            if (response.data.distances !== null && response.data.distances !== undefined) {
                weights = response.data.distances;
            } else {
                weights = response.data.durations;
            }

            if (weights !== null && weights !== undefined) {
                // update line and table
                updateLine(weights);
                updateTable(weights);
                succeed = true;
            }
        }

        if (succeed === false) {
            // show error message
            const message = document.querySelector('#request-message');
            message.classList.add('show');
            setTimeout(() => {
                message.classList.remove('show');
            }, 5000);
        }

        // hide loading elements
        document.querySelector('#loading-animation').classList.add('hide');
    });
};

const getSelectedLocationFeature = (pixel) => {
    // check if one of a location feature contains the pixel
    const feature = map.forEachFeatureAtPixel(pixel,
        (feature) => {
            if (feature.get('type') === 'location') {
                return feature;
            }
        }, {
            layerFilter: (layer) => {
                return layer.getSource().get('name') === 'location'
            }
        });

    if (feature !== null && feature !== undefined) {
        return feature;
    } else {
        return null;
    }
};

const onMouseLeftButtonDown = (e, args) => {
    //  hide all context menus
    document.querySelector('#contextmenu-map').classList.add('hide');
    document.querySelector('#contextmenu-location').classList.add('hide');

    // check if select one of a feature
    const feature = getSelectedLocationFeature(e.pixel);
    if (feature !== null) {
        // remove instruction and reset the position of table
        document.querySelector('#instruction-message').classList.add('hide');
        document.querySelector('#matrix-panel').classList.add('lower');

        args.dragCoordinate = ol.proj.fromLonLat(feature.get('raw'));
        args.dragFeature = feature;
        return true;
    } else {
        return false;
    }
};

const onMouseRightButtonDown = (e) => {
    // remove instruction, reset the position of table and hide all context menus
    document.querySelector('#instruction-message').classList.add('hide');
    document.querySelector('#matrix-panel').classList.add('lower');
    document.querySelector('#contextmenu-map').classList.add('hide');
    document.querySelector('#contextmenu-location').classList.add('hide');

    // check the context menu based on selected location feature, then show the context menu
    const feature = getSelectedLocationFeature(e.pixel);
    let contextmenu = feature === null ?
        document.querySelector('#contextmenu-map') : document.querySelector('#contextmenu-location');

    // calculate the context menu location based on context width
    if (isMobile() === false) {
        const contextWidth = 165;
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        const left = e.originalEvent.clientX + contextWidth > clientWidth ?
            clientWidth - contextWidth : e.originalEvent.clientX;
        const top = e.originalEvent.clientY + contextmenu.offsetHeight > clientHeight ?
            clientHeight - contextmenu.offsetHeight : e.originalEvent.clientY;
        contextmenu.style.left = left + 'px';
        contextmenu.style.top = top + 'px';
    }

    contextmenu.classList.remove('hide');

    // store the down coordiante and down feature to map
    const coordinate = map.getEventCoordinate(e.originalEvent);
    map.set('downCoordinate', new ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
    map.set('downFeature', feature);

    return false;
};

const onMouseDragDownMove = (e, args) => {
    // update the drag feature coordinate
    const deltaX = e.coordinate[0] - args.dragCoordinate[0];
    const deltaY = e.coordinate[1] - args.dragCoordinate[1];
    args.dragFeature.getGeometry().translate(deltaX, deltaY);
    args.dragCoordinate[0] = e.coordinate[0];
    args.dragCoordinate[1] = e.coordinate[1];
};

const onMouseMove = (e) => {
    // change the mouse pointer when hovering one of a location feature
    const feature = getSelectedLocationFeature(e.pixel);
    if (feature !== null) {
        map.getTarget().style.cursor = 'pointer';
    } else {
        map.getTarget().style.cursor = '';
    }
};

const onMouseUp = (args) => {
    // request new matrix
    args.dragFeature.set('raw', ol.proj.transform(args.dragCoordinate, 'EPSG:3857', 'EPSG:4326'));
    requestMatrix();
    args.dragCoordinate = null;
    args.dragFeature = null;

    // false to stop the drag sequence.
    return false;
};

const hideContextmenu = (id) => {
    let hidden = false;
    const contextmenu = document.querySelector(`#${id}`);
    if (contextmenu.classList.value.indexOf('hide') !== -1) {
        hidden = true;
    }

    if (hidden === false) {
        contextmenu.classList.add('hide');
    }

    return hidden;
};

const onTouchStart = (e, args) => {
    if (args.touch.holdOnTimer !== null) {
        // clear the old timer when touch start
        clearTimeout(args.touch.holdOnTimer);
        args.touch.holdOnTimer = null;
    }

    // break if there is any context menus
    if (hideContextmenu('contextmenu-map') === false || hideContextmenu('contextmenu-location') === false) {
        return false;
    }

    // setup a new timer to show the context menus
    args.touch.holdOnTimer = setTimeout(() => {
        clearTimeout(args.touch.holdOnTimer);
        args.touch.holdOnTimer = null;
        onMouseRightButtonDown(e);
    }, args.touch.holdOnTolerance);

    args.touch.preventDrag = true;

    // now mock up to down mouse left button
    const isDraging = onMouseLeftButtonDown(e, args);
    if (isDraging === false) {
        // we always need drag coordinate
        args.dragCoordinate = [
            e.coordinate[0],
            e.coordinate[1]
        ];
    }

    return isDraging;
};

const onTouchDragMove = (e, args) => {
    const deltaX = e.coordinate[0] - args.dragCoordinate[0];
    const deltaY = e.coordinate[1] - args.dragCoordinate[1];

    // check if the dragged feature is really moved
    if (args.touch.holdOnTimer !== null &&
        (Math.abs(deltaX) >= args.touch.holdOnDeltaTolerance || Math.abs(deltaY) >= args.touch.holdOnDeltaTolerance)) {
        // dispose the context menu timer to avoid to show context menu
        clearTimeout(args.touch.holdOnTimer);
        args.touch.holdOnTimer = null;
        args.touch.preventDrag = false;
    }

    if (args.touch.preventDrag === false) {
        // do the drag
        args.dragFeature.getGeometry().translate(deltaX, deltaY);
        args.dragCoordinate[0] = e.coordinate[0];
        args.dragCoordinate[1] = e.coordinate[1];
    }
};

const onTouchMove = (e, args) => {
    if (args.touch.holdOnTimer !== null) {
        const deltaX = e.coordinate[0] - args.dragCoordinate[0];
        const deltaY = e.coordinate[1] - args.dragCoordinate[1];

        // check if the touch pointer is really moved
        if (Math.abs(deltaX) >= args.touch.holdOnDeltaTolerance ||
            Math.abs(deltaY) >= args.touch.holdOnDeltaTolerance) {
            // dispose the context menu timer to avoid to show context menu
            clearTimeout(args.touch.holdOnTimer);
            args.touch.holdOnTimer = null;
        }
    }
};

const onTouchEnd = (args) => {
    // dispose the context menu timer to avoid to show context menu if needed
    if (args.touch.holdOnTimer !== null) {
        clearTimeout(args.touch.holdOnTimer);
        args.touch.holdOnTimer = null;
    }

    if (args.touch.preventDrag === false) {
        // mock up to mouse up
        return onMouseUp(args);
    } else {
        return false;
    }
};

const onPointerDown = (e, args) => {
    if (isMobile() === true) {
        return onTouchStart(e, args);
    } else if (e.originalEvent.button === 0) {
        return onMouseLeftButtonDown(e, args);
    } else if (e.originalEvent.button === 2) {
        return onMouseRightButtonDown(e);
    }
};

const onPointerDragDownMove = (e, args) => {
    if (isMobile() === true) {
        onTouchDragMove(e, args);
    } else {
        onMouseDragDownMove(e, args);
    }
};

const onPointerDownMove = (e, args) => {
    if (isMobile() === true) {
        onTouchMove(e, args);
    } else {
        onMouseMove(e);
    }
};

const onPointerUp = (e, args) => {
    if (isMobile() === true) {
        return onTouchEnd(args);
    } else {
        return onMouseUp(args);
    }
};

const getMapInteractions = () => {
    const pointerArgs = {
        dragCoordinate: null,
        dragFeature: null,
        touch: {
            holdOnTolerance: 1000, // use this tolerance to check touch hold on
            holdOnDeltaTolerance: 100, // use this tolerance to check touch hold on
            holdOnTimer: null,
            preventDrag: true,
        }
    };

    const pointer = new ol.interaction.Pointer({
        handleDownEvent: (e) => {
            // occured when mouse down or touch start
            return onPointerDown(e, pointerArgs);
        },
        handleDragEvent: (e) => {
            // occured only when drag one of a location feature
            onPointerDragDownMove(e, pointerArgs);
        },
        handleMoveEvent: (e) => {
            // occured when any moving or touch moved except dragging
            onPointerDownMove(e, pointerArgs);
        },
        handleUpEvent: (e) => {
            // occured only dragged and mouse up or touch end
            return onPointerUp(e, pointerArgs);
        },
    });

    const interactions = ol.interaction.defaults().extend([pointer]);
    return interactions;
};

// This function will create and initialize our interactive map.
// We'll call it later when our POI icon font has been fully downloaded,
// which ensures that the POI icons display as intended.
const initializeMap = () => {
    const darkLayer = new ol.mapsuite.VectorTileLayer('https://cdn.thinkgeo.com/worldstreets-styles/3.0.0/dark.json', {
        apiKey: apiKey,
        layerName: 'dark'
    });

    // Center the map on Boston and start at zoom level 8.
    const view = new ol.View({
        center: ol.proj.fromLonLat([-96.9810, 32.7798]),
        maxResolution: 40075016.68557849 / 512,
        progressiveZoom: true,
        zoom: window.screen.width >= 1024 ? 9 : 8,
        minZoom: 2,
        maxZoom: 19
    });

    // Add our previously-defined ThinkGeo Cloud Vector Tile layer to the map.
    // States that the HTML tag with id="map" should serve as the container for our map.
    map = new ol.Map({
        renderer: 'webgl',
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: true,
        layers: [darkLayer],
        target: document.getElementById('map'),
        view: view,
        interactions: getMapInteractions()
    });

    // add the layer for showing line.
    const lineSource = new ol.source.Vector();
    lineSource.set('name', 'line');
    map.addLayer(new ol.layer.Vector({
        source: lineSource
    }));
    map.set('lineSource', lineSource);

    // Add the layer for showing the location icon.
    const locationSource = new ol.source.Vector();
    locationSource.set('name', 'location');
    locationSource.set('features', []);
    map.addLayer(new ol.layer.Vector({
        source: locationSource
    }));
    map.set('locationSource', locationSource);

    addDefaultPoints();
};

/*---------------------------------------------*/
// 3. ThinkGeo Map Icon Fonts
/*---------------------------------------------*/

// Finally, we'll load the Map Icon Fonts using ThinkGeo's WebFont loader. 
// The loaded Icon Fonts will be used to render POI icons on top of the map's 
// background layer.  We'll initalize the map only once the font has been 
// downloaded.  For more info, see our wiki: 
// https://wiki.thinkgeo.com/wiki/thinkgeo_iconfonts 
WebFont.load({
    custom: {
        families: ["vectormap-icons"],
        urls: ["https://cdn.thinkgeo.com/vectormap-icons/2.0.0/vectormap-icons.css"],
        testStrings: {
            'vectormap-icons': '\ue001'
        }
    },
    // The "active" property defines a function to call when the font has
    // finished downloading.  Here, we'll call our initializeMap method.
    active: initializeMap
});

/*---------------------------------------------*/
// 4. Event Listeners
/*---------------------------------------------*/

const onSettingPanelTitleClicked = () => {
    const titleButton = document.querySelector('#setting-panel-title-button');
    const content = document.querySelector('#setting-panel-content');
    if (titleButton.classList.value.indexOf('expand') !== -1) {
        titleButton.classList.remove('expand');
        titleButton.classList.add('fold');
        content.classList.add('hide');
    } else {
        titleButton.classList.add('expand');
        titleButton.classList.remove('fold');
        content.classList.remove('hide');
    }
};

const onMatrixTypeSelectChanged = (e) => {
    if (e.target.selectedIndex === 0) {
        document.querySelector('#distance-unit-section').classList.remove('hide');
    } else {
        document.querySelector('#distance-unit-section').classList.add('hide');
    }

    requestMatrix();
};

const onDistanceUnitSelectChanged = () => {
    const lineSource = map.get('lineSource');
    if (lineSource.getFeatures().length >= 3) {
        updateTable(lineSource.get('weights'));
    }
};

const onLocationContextmenuItemClicked = () => {
    //  hide all context menu
    document.querySelector('#contextmenu-location').classList.add('hide');

    const feature = map.get('downFeature');
    removePoint(feature);
    requestMatrix();
    map.getTarget().style.cursor = '';
};

const onMapContextmenuItemClicked = (e) => {
    //  hide all context menu
    document.querySelector('#contextmenu-map').classList.add('hide');

    const targetId = (window.event || e).target.id;
    if (targetId === 'contextmenu-item-add') {
        if (addPoint(map.get('downCoordinate')) === true) {
            requestMatrix();
        }
    } else if (targetId === 'contextmenu-item-clear') {
        const locationSource = map.get('locationSource');
        locationSource.set('features', []);
        locationSource.clear();
        cleanMatrix();
    }
};

// These event listeners tell the UI when it's time to execute all of the 
// code we've written.
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#setting-panel-title').addEventListener('click', onSettingPanelTitleClicked);
    document.querySelector('#matrix-type').addEventListener('change', onMatrixTypeSelectChanged);
    document.querySelector('#distance-unit').addEventListener('change', onDistanceUnitSelectChanged);
    document.querySelector('#contextmenu-location').addEventListener('click', onLocationContextmenuItemClicked);
    document.querySelector('#contextmenu-map').addEventListener('click', onMapContextmenuItemClicked);

    // hide the default context menu of the browsers when right click on the map.
    document.querySelector('#map').oncontextmenu = () => {
        return false;
    };
});