const apiKey = 'WPLmkj3P39OPectosnM1jRgDixwlti71l8KYxyfP2P0~';

const styles = {
    line: new ol.style.Style({
        stroke: new ol.style.Stroke({
            width: 6,
            color: [34, 109, 214, 0.9]
        })
    }),
    line_halo: new ol.style.Style({
        stroke: new ol.style.Stroke({
            width: 10,
            lineCap: 'round',
            color: [34, 109, 214, 1]
        })
    }),
    walkLine: new ol.style.Style({
        stroke: new ol.style.Stroke({
            width: 2,
            lineDash: [5, 3],
            color: [34, 109, 214, 1]
        })
    }),
    resultRadius: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 15,
            fill: new ol.style.Fill({
                color: [255, 102, 0, 0.4]
            }),
            stroke: new ol.style.Stroke({
                color: [255, 102, 0, 0.8],
                width: 1
            })
        })
    }),
    arrowLine: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: [10, 80, 18, 1],
            width: 6
        })
    })
};

(function() {
    const urls = {
        start: 'https://samples.thinkgeo.com/cloud/example/image/starting.png'
    };
    for (let i = 0; i < 26; i++) {
        urls[i] = `https://samples.thinkgeo.com/cloud/example/image/end-point-letter/end-point-${String.fromCharCode(97 + i)}.png`;
    }

    Object.getOwnPropertyNames(urls).forEach(key => {
        styles[key] = new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 0.9],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                opacity: 1,
                crossOrigin: 'Anonymous',
                src: urls[key]
            })
        });
    });
})();

const lightLayer = new ol.mapsuite.VectorTileLayer('https://cdn.thinkgeo.com/worldstreets-styles/3.0.0/light.json', {
    apiKey: apiKey,
    layerName: 'light'
});

const view = new ol.View({
    center: ol.proj.fromLonLat([-96.7962, 42.79423]),
    maxResolution: 40075016.68557849 / 512,
    progressiveZoom: false,
    zoom: 3,
    minZoom: 2,
    maxZoom: 19
});

let map;
let vectorSource;
let curCoord;
let app = {};
const initializeMap = () => {
    map = new ol.Map({
        renderer: 'webgl',
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: true,
        layers: [lightLayer],
        target: 'map',
        view: view,
        interactions: ol.interaction.defaults().extend([new app.Drag()])
    });

    addRoutingLayer();
    mobileCompatibility();

    map.on('pointermove', function (e) {
        if (e.dragging) {
            return;
        }
        const pixel = map.getEventPixel(e.originalEvent);
        const options = {
            layerFilter: function (layer) {
                if (layer instanceof ol.layer.VectorTile) {
                    return false;
                }
                return true;
            }
        };
        const hit = map.hasFeatureAtPixel(pixel, options);
        let cursor = false;
        if (hit) {
            const features = map.getFeaturesAtPixel(pixel, options);
            features.some((feature) => {
                const draggable = feature.get('draggable');
                if (draggable === 'true') {
                    cursor = true;
                    return true;
                }
            });
        } else {
            cursor = false;
        }
        map.getTargetElement().style.cursor = cursor ? 'pointer' : '';
    });
};

const mobileCompatibility = () => {
    let u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    let left, top;
    let clientWidth = document.documentElement.clientWidth;
    let clientHeight = document.documentElement.clientHeight;
    const contextmenu = document.querySelector('#ol-contextmenu');
    const insTip = document.querySelector('#instruction-tip');
    let timeOutEvent;
    const contextWidth = 165;
    const contextHeight = 127;

    if (isiOS) {
        map.getViewport().addEventListener('gesturestart', function (e) {
            clearTimeout(timeOutEvent);
            timeOutEvent = 0;
            return false;
        });

        map.getViewport().addEventListener('touchstart', function (e) {
            e.preventDefault();
            if (e.touches.length != 1) {
                clearTimeout(timeOutEvent);
                timeOutEvent = 0;
                return false;
            }
            timeOutEvent = setTimeout(function () {
                if (e.touches.length == 1) {
                    timeOutEvent = 0;
                    left =
                        e.changedTouches[0].clientX + contextWidth > clientWidth ?
                        clientWidth - contextWidth - 3 :
                        e.changedTouches[0].clientX;
                    top =
                        e.changedTouches[0].clientY + contextHeight > clientHeight ?
                        clientHeight - contextHeight - 13 :
                        e.changedTouches[0].clientY;
                    contextmenu.style.left = left + 'px';
                    contextmenu.style.top = top + 'px';
                    let point = map.getEventCoordinate(e);
                    curCoord = point;
                    hideOrShowContextMenu('show');
                    insTip.classList.add('gone');
                }
            }, 500);
        });

        map.getViewport().addEventListener('touchend', function (event) {
            clearTimeout(timeOutEvent);
            if (timeOutEvent != 0) {
                hideOrShowContextMenu('hide');
            }
            return false;
        });

        map.getViewport().addEventListener('touchmove', function (event) {
            clearTimeout(timeOutEvent);
            timeOutEvent = 0;
            return false;
        });
    } else {
        map.getViewport().addEventListener('contextmenu', (e) => {
            hideOrShowContextMenu('show');
            insTip.classList.add('gone');
            left = e.clientX + contextWidth > clientWidth ? clientWidth - contextWidth - 3 : e.clientX;
            top =
                e.clientY + contextmenu.offsetHeight > clientHeight ?
                clientHeight - contextmenu.offsetHeight - 1 :
                e.clientY;

            contextmenu.style.left = left + 'px';
            contextmenu.style.top = top + 'px';
            let point = map.getEventCoordinate(e);
            curCoord = point;
        });
    }

    if (isiOS || isAndroid) {
        document.querySelector('.mobile-tip').classList.remove('hide');
    } else {
        document.querySelector('.pc-tip').classList.remove('hide');
    }
};

const addRoutingLayer = () => {
    vectorSource = new ol.source.Vector();
    let routingLayer = new ol.layer.Vector({
        source: vectorSource,
        layerName: 'routing'
    });
    map.addLayer(routingLayer);
};

const getRoundTrip = () => document.querySelector('#roundTripInput').checked;


WebFont.load({
    custom: {
        families: ['vectormap-icons'],
        urls: ['https://cdn.thinkgeo.com/vectormap-icons/2.0.0/vectormap-icons.css'],
        testStrings: {
            'vectormap-icons': '\ue001'
        }
    },
    active: initializeMap
});


const initProgressingBackdrop = function () {
    let module = {};

    const showProgressingBackdrop = function (container, style) {
        if (container === undefined) {
            container = document.body;
        }
        var backdropDom = document.createElement('div');
        backdropDom.classList.add('progressing-backdrop');
        if (style && typeof (style) === 'string') {
            backdropDom.classList.add(style);
        }
        backdropDom.innerHTML = '<div></div><div></div><div></div>';
        container.appendChild(backdropDom);
        return backdropDom;
    };

    const removeProgressingBackdrop = function (progressingBackdropDom) {
        progressingBackdropDom.parentElement.removeChild(progressingBackdropDom);
    };

    module.showProgressingBackdrop = showProgressingBackdrop;
    module.removeProgressingBackdrop = removeProgressingBackdrop;

    return module;
};

/**
 * 
 * @typedef {string | {text:string, value:Object}} DropdownItem
 * @param {HTMLInputElement} inputDom 
 * @param {{
 *     dropdownItems: (DropdownItem[] | undefined),
 *     selectedItem: (DropdownItem | undefined),
 *     focused: ((value: DropdownItem, index: number) => undefined | undefined),
 *     blurred: ((value: DropdownItem, index: number) => undefined | undefined),
 *     selected: ((value: DropdownItem, index: number) => undefined | undefined),
 *     unselected: ((value: DropdownItem, index: number) => undefined | undefined),
 *     progressingBackdropModule: (Object | undefined),
 * }} options 
 */
const initDropdownInput = (inputDom, options) => {
    const module = {};
    options = options || {};
    module.focused = options.focused;
    module.blurred = options.blurred;
    module.selected = options.selected;
    module.unselected = options.unselected;
    module.progressingBackdropModule = options.progressingBackdropModule;

    /**
     * @type {HTMLElement}
     */
    let _dropdownLoadingDom;
    /**
     * @type {DropdownItem[]}
     */
    let _dropdownItems = options.dropdownItems ? options.dropdownItems : [];

    /**
     * 
     * @param {string} eventName 
     * @param {object[] | undefined} parameters 
     */
    const triggerEvent = (eventName, parameters) => {
        const handler = module[eventName];
        if (typeof(handler) === 'function') {
            try {
                handler.apply(module, parameters);
            } catch (error) {
                console.warn(`An error happened when run the "${eventName}" event.`, 'error:', error);
            }
        }
    };

    /**
     * @returns {boolean}
     */
    const getEnabled = () => {
        return !inputDom.hasAttribute('readonly');
    };

    const openDropdown = () => {
        focusDropdownItem(indexOfSelectedDropdownItem());
        dropdownDom.classList.add('shown');
        dropdownDom.classList.remove('hidden');
    };

    const closeDropdown = () => {
        dropdownDom.classList.remove('shown');
        dropdownDom.classList.add('hidden');
        clearFocusedDropdownItem();
    };

    /**
     * 
     * @param {number} index 
     */
    const focusDropdownItem = index => {
        if (index < 0 || index >= dropdownDom.childElementCount) {
            return;
        }
        clearFocusedDropdownItem();
        dropdownDom.children[index].classList.add('focused');
        triggerEvent('focused', [_dropdownItems[index], index]);
    };

    /**
     * 
     * @returns {number}
     */
    const indexOfFocusedDropdownItem = () => {
        for (let i = 0; i < dropdownDom.childElementCount; i++) {
            if (dropdownDom.children[i].classList.contains('focused')) {
                return i;
            }
        }
        return -1;
    };

    const clearFocusedDropdownItem = () => {
        Array.prototype.forEach.call(dropdownDom.children, (element, index) => {
            if (element.classList.contains('focused')) {
                element.classList.remove('focused');
                triggerEvent('blurred', [_dropdownItems[index], index]);
            }
        });
    };

    const clearSelectedDropdownItem = () => {
        Array.prototype.forEach.call(dropdownDom.children, (element, index) => {
            if (element.classList.contains('selected')) {
                element.classList.remove('selected');
                triggerEvent('unselected', [_dropdownItems[index], index]);
            }
        });
    };

    /**
     * 
     * @param {number} index 
     */
    const selectDropdownItem = index => {
        if (index < 0 || index >= dropdownDom.childElementCount) {
            return;
        }
        clearSelectedDropdownItem();
        const dropdownItem = dropdownDom.children[index];
        dropdownItem.classList.add('selected');
        inputDom.value = dropdownItem.children[0].textContent;
        inputDom.blur();
        triggerEvent('selected', [_dropdownItems[index], index]);
    };

    /**
     * 
     * @returns {number}
     */
    const indexOfSelectedDropdownItem = () => {
        for (let i = 0; i < dropdownDom.childElementCount; i++) {
            if (dropdownDom.children[i].classList.contains('selected')) {
                return i;
            }
        }
        return -1;
    };

    const clearDropdownItems = () => {
        dropdownDom.innerHTML = '';
    };

    const dropdownItem_MouseEntered = e => {
        const index = Array.prototype.indexOf.call(dropdownDom.children, e.target);
        focusDropdownItem(index);
    };

    const dropdownItem_MouseDowned = e => {
        //......
        let item = e.target;
        while (item.parentElement !== dropdownDom && item.parentElement !== document.body) {
            item = item.parentElement;
        }
        const index = Array.prototype.indexOf.call(dropdownDom.children, item);

        selectDropdownItem(index);
    };

    /**
     * @public
     */
    const showDropdownLoading = () => {
        if (!getEnabled()) return;
        if (module.progressingBackdropModule &&
            typeof (module.progressingBackdropModule.showProgressingBackdrop) === 'function') {
            removeDropdownLoading();
            _dropdownLoadingDom = module.progressingBackdropModule.showProgressingBackdrop(dropdownDom);
        }
    };

    /**
     * @public
     */
    const removeDropdownLoading = () => {
        if (!getEnabled()) return;
        if (_dropdownLoadingDom !== undefined &&
            module.progressingBackdropModule &&
            typeof (module.progressingBackdropModule.removeProgressingBackdrop) === 'function') {
            _dropdownLoadingDom = module.progressingBackdropModule.removeProgressingBackdrop(_dropdownLoadingDom);
        }
    };

    /**
     * @public
     * @param {DropdownItem[]} items 
     */
    const updateDropdownItems = items => {
        if (!getEnabled()) return;
        clearDropdownItems();
        if (!items || items.length <= 0) return;
        _dropdownItems = items;
        items.forEach(item => {
            const liDom = document.createElement('li');
            const aDom = document.createElement('a');
            aDom.href = '';
            if (typeof (item) === 'string') {
                aDom.textContent = item;
            } else {
                aDom.textContent = item.text;
            }
            liDom.appendChild(aDom);
            liDom.addEventListener('mouseenter', dropdownItem_MouseEntered);
            liDom.addEventListener('mousedown', dropdownItem_MouseDowned);
            dropdownDom.appendChild(liDom);
        });
    };

    /**
     * @public
     */
    const containerDom = document.createElement('div');
    containerDom.classList.add('dropdown-input-container');

    containerDom.addEventListener('focus', e => {
        if (!getEnabled()) return;
        openDropdown();
    }, true);

    containerDom.addEventListener('blur', e => {
        if (!getEnabled()) return;
        closeDropdown();
    }, true);

    containerDom.addEventListener('keydown', e => {
        if (!getEnabled()) return;
        switch (e.keyCode) {
            case 38: //Up
                focusDropdownItem(indexOfFocusedDropdownItem() - 1);
                break;
            case 40: //Down
                focusDropdownItem(indexOfFocusedDropdownItem() + 1);
                break;
            case 13: { //Enter
                const focusedIndex = indexOfFocusedDropdownItem();
                if (focusedIndex >= 0) {
                    selectDropdownItem(focusedIndex);
                }
                break;
            }
        }
    });

    const dropdownDom = document.createElement('ul');
    dropdownDom.classList.add('dropdown');

    const inputParentDom = inputDom.parentElement;
    if (inputParentDom) {
        inputParentDom.insertBefore(containerDom, inputDom);
    }

    containerDom.appendChild(inputDom);
    containerDom.appendChild(dropdownDom);

    if (options.selectedItem) {
        selectDropdownItem(_dropdownItems.indexOf(options.selectedItem));
    }

    /**
     * @public
     * @type {DropdownItem | null}
     */
    Object.defineProperty(module, 'selectedItem', {
        get: () => {
            const selectedIndex = indexOfSelectedDropdownItem();
            if (selectedIndex < 0) {
                return null;
            } else {
                return _dropdownItems[selectedIndex];
            }
        },
        set: value => {
            if (value) {
                const valueIndex = _dropdownItems.indexOf(value);
                if (valueIndex > 0) {
                    selectDropdownItem(valueIndex);
                }
            } else {
                clearDropdownItems();
            }
        }
    });
    module.updateDropdownItems = updateDropdownItems;
    module.showDropdownLoading = showDropdownLoading;
    module.removeDropdownLoading = removeDropdownLoading;
    module.containerDom = containerDom;

    return module;
};

const geocoder = (function () {
    const geocodingClient = new tg.GeocodingClient(apiKey);
    const options = {
        autocomplete: true,
        verboseResults: false,
        maxResults: 5,
        srid: 3857,
        countries: 'us,ca,mx'
    };
    let timeoutId;

    /**
     * 
     * @param {string} input 
     * @param {(features: Feature[]) => undefined} callback 
     */
    return (input, callback) => {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
            timeoutId = undefined;
        }
        if (input) {
            timeoutId = setTimeout(() => {
                timeoutId = undefined;

                if (geocodingClient.xhr) {
                    geocodingClient.xhr.abort();
                    delete geocodingClient.xhr;
                }
                geocodingClient.on("sendingrequest", function (e) {
                    this.xhr = e.xhr;
                })

                geocodingClient.searchByPoint(input, (status, response) => {
                    if (typeof (callback) === 'function') {
                        if (status === 200 && response.error === undefined) {
                            const features = response.data.locations.map(item => new ol.Feature({
                                geometry: new ol.geom.Point([item.locationPoint.pointX, item.locationPoint.pointY]),
                                address: item.address,
                                name: item.name,
                            }));
                            callback(features);
                        } else {
                            callback([]);
                        }
                    }
                }, options);
                geocodingClient.un("sendingrequest");
            }, 80);
        } else {
            if (geocodingClient.xhr) {
                geocodingClient.xhr.abort();
                delete geocodingClient.xhr;
            }
            geocodingClient.on("sendingrequest", function (e) {
                this.xhr = e.xhr;
            })

            geocodingClient.un("sendingrequest");
            if (typeof (callback) === 'function') {
                callback([]);
            }
        }
    };
})();


//TODO: Change apiKey.
const routingClient = new tg.RoutingClient(apiKey);

const findRoute = (showError, notClearAll) => {
    if (!notClearAll) {
        vectorSource.clear();
    } else {
        removeFeaturesByName('line');
    }
    hideOrShowResultBox('hide');
    const points = getAllPoints();
    const pointsLength = points.length;
    if (pointsLength >= 2 && getAllAvailablePoints().length === pointsLength) {
        points.forEach((point, index) => {
            let name;
            if (0 === index) {
                name = 'start';
            } else {
                name = (index - 1).toString();
            }
            setPointFeature(name, point);
        });
        performRouting();
    } else if (showError) {
        showErrorTip('One of more of your locations is invalid.');
    }
};

const performRouting = () => {
    const points = getAllPoints();
    if (points.length >= 2 && getAllAvailablePoints().length === points.length) {
        hideErrorTip();
        document.querySelector('.loading').classList.remove('hide');
        const options = {
            turnByTurn: true,
            srid: 3857,
            source: 'First',
            destination: 'Any',
            roundtrip: getRoundTrip(),
        };
        const callback = (status, response) => {
            const result = document.querySelector('#result');
            if (status === 200) {
                result.classList.remove('error-on-mobile');
                document.querySelector('.loading').classList.add('hide');
                hideOrShowResultBox('show');
                handleResponse(response);
            } else {
                hideOrShowResultBox('show');
                document.querySelector('.loading').classList.add('hide');
                document.querySelector('#total').innerHTML = '';

                if (document.body.clientWidth <= 767) {
                    result.classList.add('error-on-mobile');
                }
                if (status === 400) {
                    const data = response.data;
                    let message = '';
                    Object.keys(data).forEach((key) => {
                        message = message + data[key] + '<br />';
                    });
                    result.querySelector('#routes').innerHTML = `<div class="error-message">${message}</div>`;
                } else if (status === 401 || status === 410 || status === 404) {
                    result.querySelector('#routes').innerHTML = `<div class="error-message">${response.error
                        .message}</div>`;
                } else if (status === 'error') {
                    errorLoadingTile();
                } else {
                    result.querySelector('#routes').innerHTML = `<div class="error-message">Request failed.</div>`;
                }
            }
        };

        routingClient.optimization(points.map((point) => {
            return {
                x: point[0],
                y: point[1]
            };
        }), callback, options);
    }
};

const handleResponse = (res) => {
    const routes = res.data.routes;
    const waypoints = res.data.waypoints;
    const visitSequences = res.data.visitSequences;
    generateBox(routes, visitSequences);
    const waypointsCoord = waypoints.map((item) => {
        //TODO: Remove
        if (item.coordinate.x < item.coordinate.y) {
            return [item.coordinate.x, item.coordinate.y];
        } else {
            return [item.coordinate.y, item.coordinate.x];
        }
    });
    addWalkLinesFeatures(waypointsCoord);
};

const getAllPoints = () => {
    let points = [];
    const allInputs = document.querySelectorAll('#dragable-list input');
    allInputs.forEach((input) => {
        const coord = getCoordinateFromInput(input);
        points.push(coord ? coord : null);
    });
    return points;
};

const getAllAvailablePoints = () => {
    return getAllPoints().filter(point => point && point.length === 2);
};

const setPointFeature = (name, coord) => {
    let feature = getFeatureByName(name);
    if (feature && coord) {
        feature.getGeometry().setCoordinates(coord);
    } else if (coord) {
        addPointFeature(name, coord);
    } else if (feature) {
        removeFeatureByName(name);
    }
};

const addPointFeature = (name, coord) => {
    let feature = new ol.Feature({
        geometry: new ol.geom.Point(coord),
        name: name,
        draggable: 'true'
    });
    feature.setStyle(styles[name]);
    vectorSource.addFeatures([feature]);
};

const addRouteFeature = (wkt) => {
    const format = new ol.format.WKT();
    const routeFeature = format.readFeature(wkt);
    routeFeature.set('name', 'line');
    routeFeature.setStyle([styles.line, styles.line_halo]);
    vectorSource.addFeature(routeFeature);
};

const addWalkLinesFeatures = (waypointsCoord) => {
    let features = [];
    const points = getAllAvailablePoints();
    points.forEach((point, index) => {
        const feature = new ol.Feature({
            geometry: new ol.geom.LineString([point, waypointsCoord[index]]),
            name: 'line'
        });
        features.push(feature);
    });
    vectorSource.addFeatures(features);
};

const addResultRadius = (coord) => {
    removeFeaturesByName('resultRadius');
    let center = coord;
    let resultRadiusFeature = new ol.Feature({
        geometry: new ol.geom.Point(center),
        name: 'resultRadius'
    });
    resultRadiusFeature.setStyle(styles.resultRadius);
    vectorSource.addFeature(resultRadiusFeature);
};

const addArrow = (penultCoord, lastCoord) => {
    removeFeaturesByName('arrow');

    let feature = new ol.Feature({
        geometry: new ol.geom.Point(lastCoord),
        name: 'arrow'
    });

    const dx = lastCoord[0] - penultCoord[0];
    const dy = lastCoord[1] - penultCoord[1];

    const rotation = Math.atan2(dy, dx);

    const arrowStyle = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            crossOrigin: 'Anonymous',
            src: 'https://samples.thinkgeo.com/cloud/example/image/arrow.png',
            rotateWithView: true,
            rotation: -rotation
        })
    });

    feature.setStyle(arrowStyle);
    vectorSource.addFeature(feature);
};

const addTurnLine = (penultCoord, lastCoord, lineSecondCoord) => {
    let feature = new ol.Feature({
        geometry: new ol.geom.LineString([penultCoord, lastCoord, lineSecondCoord]),
        name: 'line'
    });

    feature.setStyle(styles.arrowLine);
    vectorSource.addFeature(feature);
};

const removeFeatureByCoord = (coord) => {
    const coordString = coord.toString();
    const features = vectorSource.getFeatures();
    features.some((feature) => {
        if (feature.getGeometry().getCoordinates().toString() === coordString) {
            vectorSource.removeFeature(feature);
            return true;
        }
    });
};

const removeFeatureByName = featureName => {
    const feature = getFeatureByName(featureName);
    if (feature) {
        vectorSource.removeFeature(feature);
    }
    return feature;
};

const removeFeaturesByName = (featureName) => {
    if (vectorSource) {
        const features = vectorSource.getFeatures();
        for (let i = 0, l = features.length; i < l; i++) {
            let feature = features[i];
            if (feature.get('name') === featureName) {
                vectorSource.removeFeature(feature);
            }
        }
    }
};

const getFeatureByName = (name) => {
    let feature_;
    vectorSource.getFeatures().some((feature) => {
        if (feature.get('name') === name) {
            feature_ = feature;
            return true;
        }
    });
    return feature_;
};



const lerp = (firstCoord, secondCoord) => {
    var resolution = view.getResolution();
    var x1 = firstCoord[0];
    var y1 = firstCoord[1];
    var x2 = secondCoord[0];
    var y2 = secondCoord[1];
    var length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) / resolution;
    var x, y;

    if (length > 50) {
        var interpolate = 50 / length;
        var x = ol.math.lerp(x1, x2, interpolate);
        var y = ol.math.lerp(y1, y2, interpolate);

        return [x, y];
    }

    return secondCoord;
};

const formatDistanceAndDuration = (distance, duration) => {
    let distance_;
    let duration_;
    const formater = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
    if (distance >= 1000) {
        distance_ = distance / 1000;
        distance_ = formater.format(distance_);
        distance_ = distance_ + 'km';
    } else {
        distance_ = formater.format(distance);
        distance_ = distance_ + 'm';
    }

    if (duration > 60) {
        let hours = parseInt(duration / 60);
        let min = Math.round(duration % 60);
        hours = formater.format(hours);
        duration_ = `${hours}h ${min}min`;
    } else {
        duration_ = formater.format(duration);
        duration_ = `${duration_}min`;
    }

    return {
        distance: distance_,
        duration: duration_
    };
};

const formatFromOrTo = visitSequencesIndex => {
    if (visitSequencesIndex === 0) {
        return 'Origin';
    } else {
        return 'Destination' + visitSequencesIndex;
    }
};

const generateBox = (routes, visitSequences) => {
    const resultDom = document.querySelector("#result");
    const routesDom = resultDom.querySelector("#routes");

    clearResult();
    routes.forEach((route, index) => {
        const lineWkt = route.geometry;
        let segments = route.segments;
        let distance = route.distance;
        let duration = route.duration;
        let from = visitSequences[index];
        let to = visitSequences[index + 1];

        let format = formatDistanceAndDuration(distance, duration);
        let warnings;
        if (route.warnings) {
            let str = ``;
            Object.keys(route.warnings).map((key) => {
                str += `${route.warnings[key]}  `;
            });
            warnings = `<p class="warnings">${str} </p> `;
        } else {
            warnings = '';
        }

        const routeDom = document.createElement('li');
        const totalDom = document.createElement('h6');
        totalDom.classList.add('total');
        const boxesId = `route${index}_boxes`;
        const boxesDom = document.createElement('div');
        boxesDom.id = boxesId;
        boxesDom.classList.add('boxes');
        boxesDom.classList.add('collapse');
        let total = `<button class="collapsed" data-toggle="collapse" href="#${boxesId}">
                    <span class="from" data-location="${formatFromOrTo(from)}"></span>
                    <span class="to" data-location="${formatFromOrTo(to)}"></span>
                    <br>
                    <span class="format-distance">${format.distance}</span>
                    <span class="format-duration">${format.duration}</span>
                    ${warnings}
                    </button>
                    `;
        totalDom.innerHTML = total;
        addRouteFeature(lineWkt);
        let lastLinePenultCoord = [];
        let lastLineLastCoord = [];
        let isTurn = true;
        let polylineCoords = [];

        if (segments) {
            let segments_ = segments
                .map((item) => {
                    let polyline = item.geometry;
                    let polylineCoord = polyline.split('(')[1].split(')')[0].split(',');
                    let secondPointFromStart = findSecondPointFromStart(polylineCoord);
                    return secondPointFromStart ? item : false;
                })
                .filter((item) => item);

            segments_.forEach((item, index) => {
                let polyline = item.geometry;
                let polylineCoord = polyline.split('(')[1].split(')')[0].split(',');
                let secondPointFromStart = findSecondPointFromStart(polylineCoord);
                let secondPointFromEnd = findSecondPointFromEnd(polylineCoord);

                let startCoord = polylineCoord[0];
                polylineCoords.push(polylineCoord);
                let instruction = item.instruction;
                const maneuverType = item.maneuverType;
                let format = formatDistanceAndDuration(item.distance, item.duration);
                distance = format.distance;
                duration = format.duration;
                let className;
                let warnStr;
                if (item.isToll) {
                    warnStr = '<span class="warnings-small ">Toll road</span>';
                } else {
                    warnStr = '';
                }
                isTurn = true;

                switch (maneuverType) {
                    case 'turn-left':
                        className = `left`;
                        break;
                    case 'sharp-left':
                        className = `sharp_left`;
                        break;
                    case 'slightly-left':
                        className = `slight_left`;
                        break;
                    case 'turn-right':
                        className = `right`;
                        break;
                    case 'sharp-right':
                        className = `sharp_right`;
                        break;
                    case 'slightly-right':
                        className = `slight_right`;
                        break;
                    case 'straight-on':
                        className = `straight_on`;
                        isTurn = false;
                        break;
                    case 'u-turn':
                        className = `turn-back`;
                        break;
                    case 'start':
                        className = `start`;
                        isTurn = false;
                        break;
                    case 'stop':
                        className = `end`;
                        isTurn = false;
                        break;
                    case 'roundabout':
                        className = `around_circle_straight`;
                        break;
                }

                let boxInnerDom =
                    index !== segments_.length - 1 ?
                    `<span class="direction-wrap" ><i class="direction ${className}"></i></span><span title='${instruction}' class="instruction">${instruction}</span>
                    <span class="distance">${distance}</span><span  class="duration">${duration}</span>${warnStr}` :
                    `<span class="direction-wrap" ><i class="direction ${className}"></i></span><span class="instruction endPoint">${instruction}</span>`;
                let boxDom = document.createElement('DIV');
                boxDom.className = 'box';
                boxDom.id = index + 1;
                if (index === 0) {
                    lastLinePenultCoord = secondPointFromEnd;
                    lastLineLastCoord = polylineCoord[polylineCoord.length - 1];
                }

                if (index === segments_.length - 1) {
                    let endCoord = polylineCoord[polylineCoord.length - 1];
                    boxDom.setAttribute('coord', endCoord);
                } else {
                    boxDom.setAttribute('coord', startCoord);
                }

                if (index >= 1) {
                    boxDom.setAttribute('lastLinePenultCoord', lastLinePenultCoord);
                    boxDom.setAttribute('lastLineLastCoord', lastLineLastCoord);
                    isTurn && boxDom.setAttribute('lineSecondCoord', secondPointFromStart);

                    lastLinePenultCoord = secondPointFromEnd;
                    lastLineLastCoord = polylineCoord[polylineCoord.length - 1];
                }

                boxDom.setAttribute('instruction', instruction);
                boxDom.innerHTML = boxInnerDom;
                boxesDom.appendChild(boxDom);
            });
        } else {
            let boxInnerDomStart = `<span class="direction-wrap" ><i class="direction start"></i></span><span title="Start" class="instruction">Start</span>
            <span class="distance">0 km</span><span  class="duration">0 min</span>`;
            let boxInnerDomEnd = `<span class="direction-wrap" ><i class="direction end"></i></span><span title="End" class="instruction">End</span>
            <span class="distance">0 km</span><span  class="duration">0 min</span>`;
            let boxDomStart = document.createElement('DIV');
            let boxDomEnd = document.createElement('DIV');
            boxDomStart.classList.add('box');
            boxDomEnd.classList.add('box');
            boxDomStart.innerHTML = boxInnerDomStart;
            boxDomEnd.innerHTML = boxInnerDomEnd;
            boxDomStart.setAttribute('coord', getAllPoints()[0].join(' '));
            boxDomEnd.setAttribute('coord', getAllPoints()[getAllPoints().length - 1].join(' '));
            boxesDom.appendChild(boxDomStart);
            boxesDom.appendChild(boxDomEnd);
        }

        routeDom.appendChild(totalDom);
        routeDom.appendChild(boxesDom);
        routesDom.appendChild(routeDom);
    });
};

const clearResult = () => {
    const resultDom = document.querySelector("#result");
    const routesDom = resultDom.querySelector("#routes");
    routesDom.innerHTML = '';
};

const findSecondPointFromStart = (coordinates) => {
    for (let i = 0; i < coordinates.length - 1; i++) {
        if (coordinates[i + 1] != coordinates[i]) {
            return coordinates[i + 1];
        }
    }

    return false;
};

const findSecondPointFromEnd = (coordinates) => {
    for (let i = coordinates.length - 1; i > 0; i--) {
        if (coordinates[i - 1] != coordinates[i]) {
            return coordinates[i - 1];
        }
    }

    return false;
};


const errorLoadingTile = () => {
    const errorModal = document.querySelector('#error-modal');
    if (errorModal.classList.contains('hide')) {
        errorModal.classList.remove('hide');
    }
};

const setLayerSourceEventHandlers = (layer) => {
    let layerSource = layer.getSource();
    layerSource.on('tileloaderror', function () {
        errorLoadingTile();
    });
};

setLayerSourceEventHandlers(lightLayer);

let timer;
const showErrorTip = (content) => {
    if (timer) {
        clearTimeout(timer);
    }
    const tip = document.querySelector('#input-error');
    tip.querySelector('p').innerHTML = content;
    tip.classList.add('show');
    timer = setTimeout(function () {
        tip.classList.remove('show');
    }, 3000);
};

const hideErrorTip = () => {
    document.querySelector('#input-error').classList.remove('show');
};


const clearInputBoxes = () => {
    const parent = document.querySelector('#dragable-list');
    while (parent.childElementCount > 2) {
        parent.removeChild(parent.lastElementChild);
    }
    const inputs = parent.querySelectorAll('input');
    inputs.forEach((input) => {
        setCoordinateToInput(input, null);
    });
    toggleCloserAndSwitch();
};

const hideOrShowResultBox = (visible) => {
    const sidebar = document.querySelector('.sidebar');
    if (visible === 'show') {
        sidebar.classList.remove('empty');
    } else {
        sidebar.classList.add('empty');
    }
};

const progressingBackdropModule = initProgressingBackdrop();

const initGeocoderInput = input => {
    const getFeatureNameByInput = input => {
        const inputIndex = Array.prototype.indexOf.call(document.querySelectorAll('#dragable-list input'), input);
        if (inputIndex === 0) {
            return 'start';
        } else if (inputIndex > 0) {
            return (inputIndex - 1).toString();
        } else {
            return null;
        }
    };
    //......
    input.value = '';
    const dropdownInputModule = initDropdownInput(input, {progressingBackdropModule});
    input.addEventListener('input', e => {
        setCoordinateToInputAttribute(input, null);
        if (input) {
            dropdownInputModule.showDropdownLoading();
            geocoder(input.value, features => {
                dropdownInputModule.removeDropdownLoading();
                dropdownInputModule.updateDropdownItems(features.map(item => {
                    return {
                        text: item.get('address'),
                        value: item,
                    };
                }));
            });
        }
    });
    dropdownInputModule.focused = (value, index) => {
        const featureName = getFeatureNameByInput(input);
        if (featureName) {
            const coordinate = value.value.getGeometry().getFirstCoordinate();
            setPointFeature(featureName, coordinate);
        }
    };
    dropdownInputModule.blurred = (value, index) => {
        const featureName = getFeatureNameByInput(input);
        const selectedItem = dropdownInputModule.selectedItem;
        if (featureName && selectedItem) {
            const coordinate = selectedItem.value.getGeometry().getFirstCoordinate();
            setPointFeature(featureName, coordinate);
        }
    };
    dropdownInputModule.selected = (value, index) => {
        const coordinate = value.value.getGeometry().getFirstCoordinate();
        setCoordinateToInputAttribute(input, coordinate);
        const featureName = getFeatureNameByInput(input);
        if (featureName) {
            setPointFeature(featureName, coordinate);
            findRoute(false, true);
        } else {
            findRoute(false);
        }
    };
};

const addInputBox = (coord, readonly) => {
    removeFeaturesByName('line');
    removeFeaturesByName('arrow');
    hideOrShowResultBox('hide');
    const parent = document.querySelector('#dragable-list');

    const newNode = document.createElement('li');
    newNode.classList.add('via');
    newNode.innerHTML = `
    <i class="drag"></i><label></label>
    <input placeholder="Destination"/>
    <span></span>
    <a class="closer"></a>`;
    const newNodeInput = newNode.querySelector('input');
    initGeocoderInput(newNodeInput);

    if (coord) {
        setCoordinateToInput(newNodeInput, coord);
    }
    if (readonly) {
        newNodeInput.setAttribute('readonly', true);
    }

    parent.appendChild(newNode);
};

const hideOrShowContextMenu = (style) => {
    let contextmenu = document.querySelector('#ol-contextmenu');
    switch (style) {
        case 'hide':
            contextmenu.classList.add('hide');
            break;
        case 'show':
            contextmenu.classList.remove('hide');
    }
};

const refreshInputEditable = () => {
    const allInputs = document.querySelectorAll('input');
    if (window.matchMedia("(max-width: 767px)").matches) {
        allInputs.forEach(input => {
            input.setAttribute('readonly', true)
        })
    } else {
        allInputs.forEach(input => {
            input.removeAttribute('readonly');
        })
    }
};

const toggleCloserAndSwitch = () => {
    if (document.querySelectorAll('#dragable-list input').length === 2) {
        document.querySelectorAll('.closer').forEach((closer) => {
            closer.classList.add('hide');
        });
    } else {
        document.querySelectorAll('.closer').forEach((closer) => {
            closer.classList.remove('hide');
        });
    }
};

const getCoordinateFromInput = input => {
    var dataOrigin = input.getAttribute('data-origin');
    if (dataOrigin) {
        return parseCoordinateFromString(dataOrigin);
    } else {
        return null;
    }
};

const setCoordinateToInput = (input, coordinate) => {
    if (coordinate) {
        let coordinate_4326 = ol.proj.toLonLat(coordinate);
        input.value = coordinate_4326[1].toFixed(8) + ', ' + coordinate_4326[0].toFixed(8);
    } else {
        input.value = '';
    }
    setCoordinateToInputAttribute(input, coordinate);
};

const setCoordinateToInputAttribute = (input, coordinate) => {
    if (coordinate) {
        input.setAttribute('data-origin', coordinate);
    } else {
        input.setAttribute('data-origin', '');
    }
};

const parseCoordinateFromString = str => {
    let coordinate = str.split(',').map(i => Number(i));
    if (coordinate.length === 2 && coordinate.every(i => !isNaN(i))) {
        return coordinate;
    } else {
        return null;
    }
};

let coordBeforeMove;
app.Drag = function () {
    ol.interaction.Pointer.call(this, {
        handleDownEvent: app.Drag.prototype.handleDownEvent,
        handleDragEvent: app.Drag.prototype.handleDragEvent,
        handleUpEvent: app.Drag.prototype.handleUpEvent
    });
    this.coordinate_ = null;
    this.feature_ = null;
    this.timeEvent;
    this.flag_ = true;
};
ol.inherits(app.Drag, ol.interaction.Pointer);

app.Drag.prototype.handleDownEvent = function (evt) {
    if (evt.dragging) {
        return;
    }
    hideOrShowContextMenu('hide');

    const options = {
        layerFilter: function (layer) {
            if (layer instanceof ol.layer.VectorTile) {
                return false;
            }
            return true;
        }
    };

    var map = evt.map;
    var feature = map.forEachFeatureAtPixel(
        evt.pixel,
        function (feature, layer) {
            clearTimeout(this.timeEvent);
            this.flag_ = true;
            let draggable = feature.get('draggable');
            if (draggable === 'true') {
                coordBeforeMove = feature.getGeometry().getCoordinates();
                return feature;
            }
        },
        options
    );

    if (feature) {
        this.coordinate_ = evt.coordinate;
        this.feature_ = feature;
    }

    return !!feature;
};

app.Drag.prototype.handleDragEvent = function (evt) {
    clearTimeout(this.timeEvent);
    this.timeEvent = 0;

    this.flag_ = true;

    var deltaX = evt.coordinate[0] - this.coordinate_[0];
    var deltaY = evt.coordinate[1] - this.coordinate_[1];

    var geometry = this.feature_.getGeometry();
    geometry.translate(deltaX, deltaY);
    const coord = geometry.getCoordinates();
    const draggable = this.feature_.get('draggable');
    this.coordinate_[0] = evt.coordinate[0];
    this.coordinate_[1] = evt.coordinate[1];
    const coordBeforeMove_ = coordBeforeMove.slice();

    this.timeEvent = setTimeout(function () {
        removeFeaturesByName('line');
        hideOrShowResultBox('hide');
        removeFeaturesByName('arrow');
        this.flag_ = false;
        if (draggable === 'true') {
            const inputs = document.querySelectorAll('#dragable-list input');
            let inputNode;
            Array.from(inputs).some((input) => {
                const inputOrigin = input.getAttribute('data-origin');
                if (inputOrigin === coordBeforeMove_.toString()) {
                    inputNode = input;
                    return true;
                }
            });
            if (inputNode) {
                coordBeforeMove = coord;
                setCoordinateToInput(inputNode, coord);
            }
        }
        performRouting();
        this.coordinate_ = null;
        this.feature_ = null;
        return false;
    }, 1000);
};

app.Drag.prototype.handleUpEvent = function (e) {
    clearTimeout(this.timeEvent);
    this.timeEvent = 0;
    if (this.flag_) {
        const draggable = this.feature_.get('draggable');
        const coord = this.feature_.getGeometry().getCoordinates();

        if (coord.toString() === coordBeforeMove.toString()) {
            return;
        }

        if (draggable === 'true') {
            const inputs = document.querySelectorAll('#dragable-list input');
            let inputNode;
            Array.from(inputs).some((input) => {
                const inputOrigin = input.getAttribute('data-origin');
                if (inputOrigin === coordBeforeMove.toString()) {
                    inputNode = input;
                    return true;
                }
            });
            if (inputNode) {
                setCoordinateToInput(inputNode, coord);
            }
        }
        removeFeaturesByName('line');
        removeFeaturesByName('arrow');
        hideOrShowResultBox('hide');
        performRouting();
        this.coordinate_ = null;
        this.feature_ = null;
        return false;
    }
};



document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#map').oncontextmenu = () => {
        return false;
    };

    document.querySelector('#map').onclick = () => {
        hideOrShowContextMenu('hide');
    };

    document.querySelector('#ol-contextmenu').addEventListener('click', (e) => {
        const target = e.target.id;
        switch (target) {
            case 'set-startpoint': {
                setPointFeature('start', curCoord);
                hideOrShowContextMenu('hide');
                removeFeaturesByName('line');
                removeFeaturesByName('arrow');

                let startInput = document.querySelector('#dragable-list input');
                setCoordinateToInput(startInput, curCoord);
                hideOrShowResultBox('hide');
                performRouting();
                break;
            }
            case 'context-add-point': {
                const points = getAllPoints();
                const pointCount = points.length;
                const midCount = (pointCount === 2 && !points[1]) ? 0 : pointCount - 1;
                if (pointCount >= 25) {
                    showErrorTip('You have added the maximum number of locations.');
                    return;
                }
                setPointFeature(midCount.toString(), curCoord);
                let readonly = false;
                if(window.matchMedia('(max-width: 767px)').matches){
                    readonly = true;
                }
                if (midCount === 0) {
                    let secondInput = document.querySelector('#dragable-list>li:nth-child(2) input');
                    setCoordinateToInput(secondInput, curCoord);
                } else {
                    addInputBox(curCoord, readonly);
                    toggleCloserAndSwitch();
                }
                hideOrShowContextMenu('hide');
                performRouting();
                break;
            }
            case 'clear': {
                vectorSource.clear();
                clearInputBoxes();
                hideOrShowContextMenu('hide');
                hideOrShowResultBox('hide');
                performRouting();
            }
        }
    });

    document.querySelector('#map').addEventListener('mouseover', (e) => {
        let target = e.target;
        let boxDom;
        if (target.nodeName === 'SPAN' && target.parentNode.classList.contains('box')) {
            boxDom = target.parentNode;
        } else if (target.classList.contains('box')) {
            boxDom = target;
        }
        if (boxDom !== undefined) {
            let attrCoord = boxDom.getAttribute('coord');
            attrCoord = attrCoord.split(' ');
            let coord = [Number(attrCoord[0]), Number(attrCoord[1])];
            addResultRadius(coord);
        } else {
            removeFeaturesByName('resultRadius');
        }
    });

    document.querySelector('#result').addEventListener('click', (e) => {
        let target = e.target;
        let boxDom;
        const nodeList = document.querySelectorAll('.box');
        nodeList.forEach((node) => {
            if (node.classList.contains('selectBox')) {
                node.classList.remove('selectBox');
            }
        });

        if (target.nodeName === 'SPAN' && target.parentNode.classList.contains('box')) {
            target.parentNode.classList.add('selectBox');
            boxDom = target.parentNode;
        } else if (target.classList.contains('box')) {
            target.classList.add('selectBox');
            boxDom = target;
        }

        if (boxDom !== undefined) {
            removeFeaturesByName('resultRadius');
            let penult = boxDom.getAttribute('lastlinepenultcoord');
            if (penult) {
                penult = penult.split(' ');
                let penultCoord = [Number(penult[0]), Number(penult[1])];

                let last = boxDom.getAttribute('lastLineLastCoord');
                last = last.split(' ');
                let lastCoord = [Number(last[0]), Number(last[1])];

                addArrow(penultCoord, lastCoord);
            }
            let attrCoord = boxDom.getAttribute('coord');
            attrCoord = attrCoord.split(' ');
            let coord = [Number(attrCoord[0]), Number(attrCoord[1])];
            view.fit(new ol.geom.Point(coord), {
                padding: [20, 20, 20, 20],
                duration: 500,
                maxZoom: 17,
                callback: function () {
                    let penult = boxDom.getAttribute('lastlinepenultcoord');
                    if (penult) {
                        penult = penult.split(' ');
                        let penultCoord = [Number(penult[0]), Number(penult[1])];

                        let last = boxDom.getAttribute('lastLineLastCoord');
                        last = last.split(' ');
                        let lastCoord = [Number(last[0]), Number(last[1])];

                        var lineSecondCoord = boxDom.getAttribute('lineSecondCoord');
                        if (lineSecondCoord) {
                            var stringCoords = lineSecondCoord.split(' ');
                            lineSecondCoord = [+stringCoords[0], +stringCoords[1]].slice();
                            var prevCoord = lerp(lastCoord, penultCoord);
                            var secondCoord = lerp(lastCoord, lineSecondCoord);
                            addArrow(lastCoord, secondCoord);
                            addTurnLine(prevCoord, lastCoord, secondCoord);
                        } else {
                            addArrow(penultCoord, lastCoord);
                        }
                    }
                }
            });
        }
    });

    document.querySelector('#error-modal button').addEventListener('click', () => {
        document.querySelector('#error-modal').classList.add('hide');
    });

    document.querySelector('#add-point').addEventListener('click', function () {
        const pointCount = getAllPoints().length;
        if (pointCount >= 25) {
            showErrorTip('You have added the maximum number of locations.');
            return;
        }
        addInputBox();
    });

    document.querySelector('.point').addEventListener('click', function (e) {
        e = window.event || e;
        const target = e.target;
        const classlist = target.classList;
        if (target === document.querySelector('.closer')) {
            const first = target.parentNode;
            first.remove();
            removeFeatureByName('start');
        } else if (classlist.contains('closer')) {
            const parentNode = target.parentNode;
            let coord = getCoordinateFromInput(parentNode.querySelector('input'));
            if (coord) {
                removeFeatureByCoord(coord);
            }
            parentNode.remove();
        }

        if (classlist.contains('closer')) {
            toggleCloserAndSwitch();
            findRoute(false);
        } else if (target.id === 'add-point') {
            toggleCloserAndSwitch();
            findRoute(false, true);
        }
    });

    document.querySelector('#dragable-list').addEventListener('keyup', function (e) {
        e = window.e || e;
        if (e.keyCode === 13) {
            findRoute(true);
        }
    });

    document.querySelector('#go').addEventListener('click', function () {
        findRoute(true);
    });

    document.querySelector('#closeResult').addEventListener('click', function () {
        const resultDom = document.querySelector('#result');
        resultDom.classList.toggle('collapsed');
    })

    document.querySelector('#roundTripInput').addEventListener('input', function () {
        if (getAllAvailablePoints().length > 0) {
            findRoute(true);  
        }
    });

    document.querySelectorAll('#dragable-list input').forEach(input => {
        initGeocoderInput(input);
    });

    const handleDragEnd = () => {
        const inputs = document.querySelectorAll('#dragable-list input');
        inputs.forEach((input, index) => {
            if (index === 0) {
                input.setAttribute('placeholder', 'Start');
            } else {
                input.setAttribute('placeholder', 'Destination');
            }
        });

        findRoute(false);
    };

    Sortable.create(document.getElementById('dragable-list'), {
        handle: '.drag',
        onEnd: handleDragEnd,
        animation: 150,
        ghostClass: 'dragging'
    });

    refreshInputEditable();
    let resizeTimer;
    window.addEventListener('resize', function () {
        if(resizeTimer){
            this.clearTimeout(resizeTimer);
        }
        resizeTimer = setTimeout(() => {
            refreshInputEditable();
        }, 500);
    })
});