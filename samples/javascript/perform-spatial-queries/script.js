const apiKey = 'yqLXRwQc83GX5fm20Rql6CPdjnYmmC66GXsJUBYoFD4~';
let mapsQueryClient = new tg.MapsQueryClient(apiKey);

let initMap = function () {
    let module = {
        _drawInteraction: undefined,
        removeDraw: undefined,
        startDraw: undefined,
        clearResults: undefined,
        showResults: undefined,
        drawnGeometry: undefined,
        drawn: undefined,
        clearDrawn: undefined,
    };

    let baseMap = new ol.mapsuite.VectorTileLayer('https://cdn.thinkgeo.com/worldstreets-styles/3.0.0/dark.json', {
        apiKey: apiKey,
    });

    let view = new ol.View({
        center: [-10774373.86392731, 3864473.8864140143],
        zoom: 16.73,
        minZoom: 1,
    });

    let resultsStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: '#bb6230'
        }),
        stroke: new ol.style.Stroke({
            color: '#bb6230',
            width: 2,
        }),
        image: new ol.style.Circle({
            fill: new ol.style.Fill({
                //color: 'rgba(187, 98, 48, 0.5)',
                color: '#bb6230'
            }),
            stroke: new ol.style.Stroke({
                color: '#5f3116',
                width: 1,
            }),
            radius: 6,
        }),
    });
    let resultsSource = new ol.source.Vector({
        wrapX: false,
    });
    let resultsLayer = new ol.layer.Vector({
        source: resultsSource,
        style: resultsStyle
    });

    let drawStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: '#2884b055'
        }),
        stroke: new ol.style.Stroke({
            color: '#2884b0',
            width: 1,
        }),
        image: new ol.style.Circle({
            fill: new ol.style.Fill({
                color: '#2884b0',
            }),
            radius: 2,
        }),
    });
    let drawSource = new ol.source.Vector({
        wrapX: false,
    });
    let drawLayer = new ol.layer.Vector({
        source: drawSource,
        style: drawStyle,
    });

    let map = new ol.Map({
        renderer: 'webgl',
        layers: [baseMap, drawLayer, resultsLayer],
        target: 'map',
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: true,
        view: view
    });

    let popup = document.querySelector('#mapPopup');
    let popupClose = popup.querySelector('.close-button');
    let popupContent = popup.querySelector('.content');

    let overlay = new ol.Overlay({
        element: popup,
        autoPan: false,
    });
    popupClose.addEventListener('click', function () {
        overlay.setPosition();
    });
    overlay.setMap(map);

    map.on('pointermove', function (e) {
        if (module._drawInteraction !== undefined) {
            return;
        }

        map.getTargetElement().style.cursor =
            map.hasFeatureAtPixel(e.pixel, {
                layerFilter: layer => layer === resultsLayer,
                hitTolerance: 5,
            }) ? 'pointer' : '';
    });

    map.on('click', function (e) {
        overlay.setPosition();
        if (module._drawInteraction !== undefined) {
            return;
        }

        let clickedFeatures = map.getFeaturesAtPixel(e.pixel, {
            layerFilter: layer => layer === resultsLayer,
            hitTolerance: 5
        });
        if (clickedFeatures && clickedFeatures.length > 0) {
            let nearestFeature = clickedFeatures[0];
            let properties = nearestFeature.getProperties();
            renderPopupContent(properties);
            overlay.setPosition(e.coordinate);
        }
    });

    let renderPopupContent = function (properties) {
        popupContent.innerHTML = '';
        let contentTable = document.createElement('table');
        Object.getOwnPropertyNames(properties).forEach(name => {
            if (typeof (properties[name]) !== 'string' || properties[name] === '') {
                return;
            }
            let tr = document.createElement('tr');
            let th = document.createElement('th');
            let td = document.createElement('td');
            th.innerText = name;
            td.innerText = properties[name];
            tr.appendChild(th);
            tr.appendChild(td);
            contentTable.appendChild(tr);
        });
        popupContent.appendChild(contentTable);
    };

    let clearDrawn = function () {
        drawSource.clear();
        module.drawnGeometry = undefined;
    };

    let removeDraw = function () {
        if (module._drawInteraction !== undefined) {
            map.removeInteraction(module._drawInteraction);
            module._drawInteraction = undefined;
        }
    };

    let startDraw = function (geometryType) {
        let drawInteraction = new ol.interaction.Draw({
            source: drawSource,
            type: geometryType,
        });
        drawInteraction.on('drawstart', function (e) {
            clearDrawn();
        });
        drawInteraction.on('drawend', function (e) {
            let feature = e.feature;
            module.drawnGeometry = feature.getGeometry();
            if (typeof (module.drawn) === 'function') {
                module.drawn(feature);
            }
        });

        removeDraw();
        module._drawInteraction = drawInteraction;
        map.addInteraction(module._drawInteraction);
    };

    let clearResults = function () {
        resultsSource.clear();
        overlay.setPosition();
    };

    let showResults = function (features) {
        clearResults();
        resultsSource.addFeatures(features);
    };

    module.removeDraw = removeDraw;
    module.startDraw = startDraw;
    module.clearResults = clearResults;
    module.showResults = showResults;
    module.clearDrawn = clearDrawn;

    return module;
};

let initQueryPanel = function (options) {
    let opts = options || {};
    let module = {
        _drawType: undefined,
        queryType: undefined,
        drawTypeChanged: opts.drawTypeChanged,
        queryClicked: opts.queryClicked,
        clearClicked: opts.clearClicked,
    };

    Object.defineProperties(module, {
        drawType: {
            get: function () {
                return module._drawType;
            },
            set: function (value) {
                if (module._drawType !== value) {
                    let oldValue = module._drawType;
                    module._drawType = value;
                    if (typeof (module.drawTypeChanged) === 'function') {
                        module.drawTypeChanged(value, oldValue);
                    }

                    buttonGroup.querySelectorAll('button').forEach(function (button) {
                        let attribute = button.attributes['data-draw-type'];
                        let attributeValue = attribute === undefined ? undefined : attribute.value;
                        if (value === attributeValue) {
                            button.classList.add('active');
                        } else {
                            button.classList.remove('active');
                        }
                    });
                }
            }
        },
        layerName: {
            get: function () {
                return document.querySelector('#layerNameSelect').value;
            }
        },
        maxResults: {
            get: function () {
                return document.querySelector('#queryMaxResults').value;
            }
        },
        searchRadius: {
            get: function () {
                return document.querySelector('#searchRadiusInput').value;
            }
        },
        searchRadiusUnit: {
            get: function () {
                return document.querySelector('#searchRadiusUnitSelect').value;
            }
        },
        distance: {
            get: function () {
                return document.querySelector('#distanceInput').value;
            }
        },
        distanceUnit: {
            get: function () {
                return document.querySelector('#distanceUnitSelect').value;
            }
        }
    });

    let queryTypeSelect = document.querySelector('#queryTypeSelect');
    let queryTypeSelected = function () {
        let queryType = queryTypeSelect.value;

        if (queryType === 'nearest') {
            document.querySelector('#nearestQueryPanel').classList.remove('hidden');
        } else {
            document.querySelector('#nearestQueryPanel').classList.add('hidden');
        }

        if (queryType === 'within-distance') {
            document.querySelector('#distanceQueryPanel').classList.remove('hidden');
        } else {
            document.querySelector('#distanceQueryPanel').classList.add('hidden');
        }

        module.queryType = queryType;
    };
    queryTypeSelect.addEventListener('input', queryTypeSelected);
    queryTypeSelected();

    let buttonGroup = document.querySelector('#drawTypePanel .button-group');
    buttonGroup.addEventListener('click', function (e) {
        let target = e.target;
        if (target.tagName !== 'BUTTON') {
            return;
        }

        let attribute = target.attributes['data-draw-type'];
        module.drawType = attribute === undefined ? undefined : attribute.value;
    });

    document.querySelectorAll('#drawTypePanel .button-group button').forEach(function (button) {
        if (button.classList.contains('active')) {
            let attribute = button.attributes['data-draw-type'];
            module.drawType = attribute === undefined ? undefined : attribute.value;
        }
    });

    document.querySelector('#queryButton').addEventListener('click', function () {
        if (typeof (module.queryClicked) === 'function') {
            module.queryClicked.apply(this, arguments);
        }
    });

    document.querySelector('#clearButton').addEventListener('click', function () {
        if (typeof (module.clearClicked) === 'function') {
            module.clearClicked.apply(this, arguments);
        }
    });

    document.querySelector('#queryCollapseButton').addEventListener('click', function () {
        document.querySelector('.query-panel').classList.toggle('collapsed');
    });

    return module;
};

let initMessage = function () {
    let module = {};

    let removeMessage = function (messageDom) {
        let timeoutId = window.setTimeout(function () {
            timeoutId = undefined;
            document.body.removeChild(messageDom);
        }, 300);
        messageDom.addEventListener('transitionrun', function () {
            if (timeoutId !== undefined) {
                window.clearTimeout(timeoutId);
                timeoutId = undefined;
            }
        })
        messageDom.addEventListener('transitionend', function () {
            document.body.removeChild(messageDom);
        });
        messageDom.classList.add('hidden');
    };

    let showMessage = function (message, style, delay) {
        delay = typeof (delay) === 'number' ? delay : 4000;
        let messageDom = document.createElement('div');
        messageDom.classList.add('alert-message');
        messageDom.classList.add('hidden');
        if (style) {
            messageDom.classList.add(style);
        }
        messageDom.innerHTML = message;

        document.body.appendChild(messageDom);

        window.setTimeout(() => messageDom.classList.remove('hidden'), 40);

        if (delay !== Infinity) {
            let timeoutId = undefined;
            let delayRemoveMessage = () => {
                cancelRemoveMessage();
                timeoutId = setTimeout(() => {
                    timeoutId = undefined;
                    removeMessage(messageDom);
                }, delay);
            };
            let cancelRemoveMessage = () => {
                if (timeoutId !== undefined) {
                    let timeoutIdToCancel = timeoutId;
                    timeoutId = undefined;
                    clearTimeout(timeoutIdToCancel);
                }
            };
            messageDom.addEventListener('mouseenter', function () {
                if (this === messageDom) {
                    cancelRemoveMessage();
                }
            });
            messageDom.addEventListener('mouseleave', function () {
                if (this === messageDom) {
                    delayRemoveMessage();
                }
            });

            delayRemoveMessage();
        }

        return messageDom;
    };

    module.warning = function (message) {
        showMessage(message, 'warning');
    };
    module.error = function (message) {
        showMessage(message, 'error');
    };
    module.showMessage = showMessage;
    module.removeMessage = removeMessage;

    return module;
};

let initInstruction = function (options) {
    let opts = options || {};
    let module = {
        messageModule: opts.messageModule,
    };

    let messageDom;

    let showInstruction = function (message) {
        removeInstruction();
        messageDom = module.messageModule.showMessage(message, 'instruction', Infinity);
    };

    let removeInstruction = function () {
        if (messageDom !== undefined) {
            module.messageModule.removeMessage(messageDom);
            messageDom = undefined;
        }
    }

    module.showInstruction = showInstruction;
    module.removeInstruction = removeInstruction;

    return module;
};

let initProgressingBackdrop = function () {
    let module = {};

    let showProgressingBackdrop = function (container, style) {
        if (container === undefined) {
            container = document.body;
        }
        var backdropDom = document.createElement('div');
        backdropDom.classList.add('progressing-backdrop');
        if (style && typeof(style) === 'string') {
            backdropDom.classList.add(style);
        }
        backdropDom.innerHTML = '<div></div><div></div><div></div>';
        container.appendChild(backdropDom);
        return backdropDom;
    };

    let removeProgressingBackdrop = function (progressingBackdropDom) {
        progressingBackdropDom.parentElement.removeChild(progressingBackdropDom);
    };

    module.showProgressingBackdrop = showProgressingBackdrop;
    module.removeProgressingBackdrop = removeProgressingBackdrop;

    return module;
};

const initializeMap = () => {
    let hasDrawn = false;
    let hasQueried = false;

    let messageModule = initMessage();
    let instructionModule = initInstruction({
        messageModule: messageModule
    });
    let progressingBackdropModule = initProgressingBackdrop();
    let mapModule = initMap();
    let queryPanelModule = initQueryPanel({
        drawTypeChanged: function (newValue, oldValue) {
            if (newValue === undefined) {
                mapModule.removeDraw();
            } else {
                mapModule.startDraw(newValue);
            }
        },
    });

    instructionModule.showInstruction('Choose a shape type (point, line or polygon) and click to begin drawing. Double-click to finish.');

    mapModule.drawn = function (feature) {
        if (!hasDrawn) {
            hasDrawn = true;
            instructionModule.showInstruction('Now choose a query layer and query type and click “Query” to get the results.');
        }
    };

    queryPanelModule.clearClicked = function () {
        mapModule.clearResults();
        mapModule.clearDrawn();
    };

    queryPanelModule.queryClicked = function () {
        if (!hasQueried) {
            hasQueried = true;
            instructionModule.removeInstruction();
        }

        let progressingBackdropDom = progressingBackdropModule.showProgressingBackdrop();

        const beautifyResponseMessage = function (message) {
            const areaRegex = /(\d+(?:\.\d+)?) square meters/g;
            const areaReplacer = function (match, p1) {
                let area = parseFloat(p1);
                if (isNaN(area)) {
                    return match;
                } else if (area >= 1000000) {
                    return (area / 1000000).toLocaleString('us', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                    }) + ' km<sup>2</sup>';
                } else {
                    return area.toLocaleString('us', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                    }) + ' m<sup>2</sup>';
                }
            };
            const lengthRegex = /(\d+(?:\.\d+)?) meters/g;
            const lengthReplacer = function (match, p1) {
                let length = parseFloat(p1);
                if (isNaN(length)) {
                    return match;
                } else if (length >= 1000) {
                    return (length / 1000).toLocaleString('us', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                    }) + ' km';
                } else {
                    return length.toLocaleString('us', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                    }) + ' m';
                }
            }
            return message.replace(areaRegex, areaReplacer)
                          .replace(lengthRegex, lengthReplacer);
        };

        const queried = function (status, response) {
            progressingBackdropModule.removeProgressingBackdrop(progressingBackdropDom);

            if (status === 200 && response.error === undefined) {
                let responseFeatures = response.data.features;
                if (responseFeatures.length === 0) {
                    messageModule.warning('Your query returned no results. Try a different query type or query a different layer.');
                    mapModule.showResults([]);
                    return;
                }
                let wktReader = new ol.format.WKT();
                mapModule.showResults(responseFeatures.map(item => {
                    let feature = wktReader.readFeature(item.geometry);
                    feature.setProperties(item.attributes);
                    return feature;
                }));
            } else if (status >= 400 && status < 500) {
                if (response.data) {
                    let message;
                    Object.getOwnPropertyNames(response.data).forEach(function (value) {
                        response.data[value].forEach(function (value) {
                            if (message) {
                                message += ('<br>' + value);
                            } else {
                                message = value;
                            }
                        });
                    });
                    messageModule.warning(status + ': ' + beautifyResponseMessage(message));
                }
            } else if (status >= 500) {
                messageModule.error(status + ': An unexpected problem was encountered.');
            }
        };

        if (mapModule.drawnGeometry === undefined) {
            messageModule.warning('Please draw a shape.');
            progressingBackdropModule.removeProgressingBackdrop(progressingBackdropDom);
            return;
        }
        let wktWriter = new ol.format.WKT();
        let targetShapeWkt = wktWriter.writeGeometry(mapModule.drawnGeometry);

        if (targetShapeWkt.length < 1500) {
            switch (queryPanelModule.queryType) {
                case 'within':
                    mapsQueryClient.getFeaturesWithin(queryPanelModule.layerName, targetShapeWkt, queried, {
                        srid: 3857,
                        maxResults: queryPanelModule.maxResults,
                        returnFeatureAttributes: true,
                        featureAttributesToReturn: undefined,
                    });
                    break;
                case 'containing':
                    mapsQueryClient.getFeaturesContaining(queryPanelModule.layerName, targetShapeWkt, queried, {
                        srid: 3857,
                        maxResults: queryPanelModule.maxResults,
                        returnFeatureAttributes: true,
                        featureAttributesToReturn: undefined,
                    });
                    break;
                case 'intersecting':
                    mapsQueryClient.getFeaturesIntersecting(queryPanelModule.layerName, targetShapeWkt, queried, {
                        srid: 3857,
                        maxResults: queryPanelModule.maxResults,
                        returnFeatureAttributes: true,
                        featureAttributesToReturn: undefined,
                    });
                    break;
                case 'overlapping':
                    mapsQueryClient.getFeaturesOverlapping(queryPanelModule.layerName, targetShapeWkt, queried, {
                        srid: 3857,
                        maxResults: queryPanelModule.maxResults,
                        returnFeatureAttributes: true,
                        featureAttributesToReturn: undefined,
                    });
                    break;
                case 'touching':
                    mapsQueryClient.getFeaturesTouching(queryPanelModule.layerName, targetShapeWkt, queried, {
                        srid: 3857,
                        maxResults: queryPanelModule.maxResults,
                        returnFeatureAttributes: true,
                        featureAttributesToReturn: undefined,
                    });
                    break;
                case 'nearest':
                    mapsQueryClient.getFeaturesNearest(queryPanelModule.layerName, targetShapeWkt, queried, {
                        searchRadius: queryPanelModule.searchRadius,
                        searchRadiusUnit: queryPanelModule.searchRadiusUnit,
                        srid: 3857,
                        maxResults: queryPanelModule.maxResults,
                        returnFeatureAttributes: true,
                        featureAttributesToReturn: undefined,
                    });
                    break;
                case 'within-distance':
                    mapsQueryClient.getFeaturesWithinDistance(queryPanelModule.layerName, targetShapeWkt, queried, {
                        distance: queryPanelModule.distance,
                        distanceUnit: queryPanelModule.distanceUnit,
                        srid: 3857,
                        maxResults: queryPanelModule.maxResults,
                        returnFeatureAttributes: true,
                        featureAttributesToReturn: undefined,
                    });
                    break;
            }
        } else {
            mapsQueryClient.getFeaturesCustom(queryPanelModule.layerName, targetShapeWkt, queryPanelModule.queryType, queried, {
                searchRadius: queryPanelModule.searchRadius,
                searchRadiusUnit: queryPanelModule.searchRadiusUnit,
                distance: queryPanelModule.distance,
                distanceUnit: queryPanelModule.distanceUnit,
                srid: 3857,
                maxResults: queryPanelModule.maxResults,
                returnFeatureAttributes: true,
                featureAttributesToReturn: undefined,
            });
        }
    };
}

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