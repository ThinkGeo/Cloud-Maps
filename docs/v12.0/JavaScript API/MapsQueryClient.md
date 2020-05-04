# tg.MapsQueryClient

A class provides the methods to access the Maps Query APIs. Perform spatial query against each types of data.

Syntax

```javascript
var mapsQueryClient = new tg.MapsQueryClient ('Your-Cloud-Service-Api-Key');
```

Parameters

|Name|Type|Description|
|---|---|---|
|apiKey   |string  | An API key for access to ThinkGeo Cloud services, it can be created following the  [guide](../client-keys.md)  |

**Return Value** - a Maps Query object to access the Maps Query APIs in ThinkGeo Cloud service.

---

## `getFeaturesWithin(queryLayer, wkt, callback, options)`

Get the features that are within the target shape.

Syntax

```javascript
  var queryLayer = 'countries';
  var wkt = 'POLYGON((15.609372854233 56.62500500679, 1.8984353542334 42.56250500679, 30.023435354233 41.15625500679, 15.609372854233 56.62500500679))';
  var options = {
       srid: 4326,
       maxResults: 100,
       returnFeatureAttributes: true,
       featureAttributesToReturn: ['id', 'name']
  };
  var callback = function (status, response) {
      console.log(response);
  };
  mapsQueryClient.getFeaturesWithin(queryLayer, wkt, callback, options);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|queryLayer   |string  |  |  |The query layer.  |
|wkt   |string  |  |  |The well-known text of target shape.  |
|callback   |function  |  |  |the callback for response.  |
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |srid   |integer  |  |The SRID (coordinate system ID) in which to input and output the result. Mutually exclusive from the Proj4String parameter.  |
|         |proj4String   |string  |"+proj=longlat +datum=WGS84 +no_defs"  |The Proj4 projection string (coordinate system) in which to input and output the result. Mutually exclusive from the Srid parameter. Defaults to “+proj=longlat +datum=WGS84 +no_defs”.  |
|         |maxResults   |integer |100  |The maximum number of features to return.  |
|         |returnFeatureAttributes   |boolean  |true  |If true, specifies that the feature attribute column names and values will be returned in the response.  |
|         |featureAttributesToReturn   |array  |  |If returnFeatureAttributes is true, this allows the user to specify which a specific subset of attributes to be returned.  |

---

## `getFeaturesContaining(queryLayer, wkt, callback, options)`

Get the features that contain the target shape.

Syntax

```javascript
  var queryLayer = 'countries';
  var wkt = 'POINT(-95.484377145767 36.93750500679)';
  var options = {
       srid: 4326,
       maxResults: 100,
       returnFeatureAttributes: true,
       featureAttributesToReturn: ['id', 'name']
  };
  var callback = function (status, response) {
      console.log(response);
  };
  mapsQueryClient.getFeaturesContaining(queryLayer, wkt, callback, options);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|queryLayer   |string  |  |  |The query layer.  |
|wkt   |string  |  |  |The well-known text of target shape.  |
|callback   |function  |  |  |the callback for response.  |
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |srid   |integer  |  |The SRID (coordinate system ID) in which to input and output the result. Mutually exclusive from the Proj4String parameter.  |
|         |proj4String   |string  |"+proj=longlat +datum=WGS84 +no_defs"  |The Proj4 projection string (coordinate system) in which to input and output the result. Mutually exclusive from the Srid parameter. Defaults to “+proj=longlat +datum=WGS84 +no_defs”.  |
|         |maxResults   |integer |100  |The maximum number of features to return.  |
|         |returnFeatureAttributes   |boolean  |true  |If true, specifies that the feature attribute column names and values will be returned in the response.  |
|         |featureAttributesToReturn   |array  |  |If returnFeatureAttributes is true, this allows the user to specify which a specific subset of attributes to be returned.  |

---

## `getFeaturesIntersecting(queryLayer, wkt, callback, options)`

Get the features that intersect the target shape.

Syntax

```javascript
  var queryLayer = 'countries';
  var wkt = 'POLYGON((15.609372854233 56.62500500679, 1.8984353542334 42.56250500679, 30.023435354233 41.15625500679, 15.609372854233 56.62500500679))';
  var options = {
       srid: 4326,
       maxResults: 100,
       returnFeatureAttributes: true,
       featureAttributesToReturn: ['id', 'name']
  };
  var callback = function (status, response) {
      console.log(response);
  };
  mapsQueryClient.getFeaturesIntersecting(queryLayer, wkt, callback, options);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|queryLayer   |string  |  |  |The query layer.  |
|wkt   |string  |  |  |The well-known text of target shape.  |
|callback   |function  |  |  |the callback for response.  |
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |srid   |integer  |  |The SRID (coordinate system ID) in which to input and output the result. Mutually exclusive from the Proj4String parameter.  |
|         |proj4String   |string  |"+proj=longlat +datum=WGS84 +no_defs"  |The Proj4 projection string (coordinate system) in which to input and output the result. Mutually exclusive from the Srid parameter. Defaults to “+proj=longlat +datum=WGS84 +no_defs”.  |
|         |maxResults   |integer |100  |The maximum number of features to return.  |
|         |returnFeatureAttributes   |boolean  |true  |If true, specifies that the feature attribute column names and values will be returned in the response.  |
|         |featureAttributesToReturn   |array  |  |If returnFeatureAttributes is true, this allows the user to specify which a specific subset of attributes to be returned.  |

---

## `getFeaturesOverlapping(queryLayer, wkt, callback, options)`

Get the features that overlap the target shape.

Syntax

```javascript
  var queryLayer = 'countries';
  var wkt = 'POLYGON((15.609372854233 56.62500500679, 1.8984353542334 42.56250500679, 30.023435354233 41.15625500679, 15.609372854233 56.62500500679))';
  var options = {
       srid: 4326,
       maxResults: 100,
       returnFeatureAttributes: true,
       featureAttributesToReturn: ['id', 'name']
  };
  var callback = function (status, response) {
      console.log(response);
  };
  mapsQueryClient.getFeaturesOverlapping(queryLayer, wkt, callback, options);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|queryLayer   |string  |  |  |The query layer.  |
|wkt   |string  |  |  |The well-known text of target shape.  |
|callback   |function  |  |  |the callback for response.  |
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |srid   |integer  |  |The SRID (coordinate system ID) in which to input and output the result. Mutually exclusive from the Proj4String parameter.  |
|         |proj4String   |string  |"+proj=longlat +datum=WGS84 +no_defs"  |The Proj4 projection string (coordinate system) in which to input and output the result. Mutually exclusive from the Srid parameter. Defaults to “+proj=longlat +datum=WGS84 +no_defs”.  |
|         |maxResults   |integer |100  |The maximum number of features to return.  |
|         |returnFeatureAttributes   |boolean  |true  |If true, specifies that the feature attribute column names and values will be returned in the response.  |
|         |featureAttributesToReturn   |array  |  |If returnFeatureAttributes is true, this allows the user to specify which a specific subset of attributes to be returned.  |

---

## `getFeaturesTouching(queryLayer, wkt, callback, options)`

Get the features that touch the target shape.

Syntax

```javascript
  var queryLayer = 'countries';
  var wkt = 'POLYGON((7595881.1058614058 -585345.10944436956,7595881.1058614058 2704373.8120167661,-3939883.7747361474 2704373.8120167661,-3939883.7747361474 -585345.10944436956,7595881.1058614058 -585345.10944436956))';
  var options = {
       srid: 3857,
       maxResults: 100,
       returnFeatureAttributes: true,
       featureAttributesToReturn: ['id', 'name']
  };
  var callback = function (status, response) {
      console.log(response);
  };
  mapsQueryClient.getFeaturesTouching(queryLayer, wkt, callback, options);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|queryLayer   |string  |  |  |The query layer.  |
|wkt   |string  |  |  |The well-known text of target shape.  |
|callback   |function  |  |  |the callback for response.  |
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |srid   |integer  |  |The SRID (coordinate system ID) in which to input and output the result. Mutually exclusive from the Proj4String parameter.  |
|         |proj4String   |string  |"+proj=longlat +datum=WGS84 +no_defs"  |The Proj4 projection string (coordinate system) in which to input and output the result. Mutually exclusive from the Srid parameter. Defaults to “+proj=longlat +datum=WGS84 +no_defs”.  |
|         |maxResults   |integer |100  |The maximum number of features to return.  |
|         |returnFeatureAttributes   |boolean  |true  |If true, specifies that the feature attribute column names and values will be returned in the response.  |
|         |featureAttributesToReturn   |array  |  |If returnFeatureAttributes is true, this allows the user to specify which a specific subset of attributes to be returned.  |

---

## `getFeaturesNearest(queryLayer, wkt, callback, options)`

Get the features that are nearest to the target shape.

Syntax

```javascript
  var queryLayer = 'countries';
  var wkt = 'POINT(17.367185354233 47.83594250679)';
  var options = {
       srid: 4326,
       maxResults: 100,
       searchRadius: 200,
       searchRadiusUnit: 'Kilometer',
       returnFeatureAttributes: true,
       featureAttributesToReturn: ['id', 'name']
  };
  var callback = function (status, response) {
      console.log(response);
  };
  mapsQueryClient.getFeaturesNearest(queryLayer, wkt, callback, options);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|queryLayer   |string  |  |  |The query layer.  |
|wkt   |string  |  |  |The well-known text of target shape.  |
|callback   |function  |  |  |the callback for response.  |
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |srid   |integer  |  |The SRID (coordinate system ID) in which to input and output the result. Mutually exclusive from the Proj4String parameter.  |
|         |proj4String   |string  |"+proj=longlat +datum=WGS84 +no_defs"  |The Proj4 projection string (coordinate system) in which to input and output the result. Mutually exclusive from the Srid parameter. Defaults to “+proj=longlat +datum=WGS84 +no_defs”.  |
|         |searchRadius   |double |  |The radius of the search area around the target geometry. If not specified, it's assumed that there is no limit.  |
|         |searchRadiusUnit   |string |  |The unit of measure in which the searchRadius is expressed.  |
|         |maxResults   |integer |100  |The maximum number of features to return.  |
|         |returnFeatureAttributes   |boolean  |true  |If true, specifies that the feature attribute column names and values will be returned in the response.  |
|         |featureAttributesToReturn   |array  |  |If returnFeatureAttributes is true, this allows the user to specify which a specific subset of attributes to be returned.  |

---

## `getFeaturesWithinDistance(queryLayer, wkt, callback, options)`

Get the features that are within a certain distance of the target shape.

Syntax

```javascript
  var queryLayer = 'countries';
  var wkt = 'POINT(17.367185354233 47.83594250679)';
  var options = {
       srid: 4326,
       maxResults: 100,
       distance: 200,
       distanceUnit: 'Kilometer',
       returnFeatureAttributes: true,
       featureAttributesToReturn: ['id', 'name']
  };
  var callback = function (status, response) {
      console.log(response);
  };
  mapsQueryClient.getFeaturesWithinDistance(queryLayer, wkt, callback, options);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|queryLayer   |string  |  |  |The query layer.  |
|wkt   |string  |  |  |The well-known text of target shape.  |
|callback   |function  |  |  |the callback for response.  |
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |srid   |integer  |  |The SRID (coordinate system ID) in which to input and output the result. Mutually exclusive from the Proj4String parameter.  |
|         |proj4String   |string  |"+proj=longlat +datum=WGS84 +no_defs"  |The Proj4 projection string (coordinate system) in which to input and output the result. Mutually exclusive from the Srid parameter. Defaults to “+proj=longlat +datum=WGS84 +no_defs”.  |
|         |distance   |double |200  |The distance within which to find features.  |
|         |distanceUnit   |string |"Meter"  |The unit of measure in which the distance is expressed.  |
|         |maxResults   |integer |100  |The maximum number of features to return.  |
|         |returnFeatureAttributes   |boolean  |true  |If true, specifies that the feature attribute column names and values will be returned in the response.  |
|         |featureAttributesToReturn   |array  |  |If returnFeatureAttributes is true, this allows the user to specify which a specific subset of attributes to be returned.  |

---

## `getFeaturesCustom(queryLayer, wkt, callback, options)`

Perform a custom spatial query, using the specified query layer, spatial relationship type, and query feature.

Syntax

```javascript
  var queryLayer = 'countries';
  var wkt = 'POLYGON((15.609372854233 56.62500500679, 1.8984353542334 42.56250500679, 30.023435354233 41.15625500679, 15.609372854233 56.62500500679))';
  var options = {
       srid: 4326,
       maxResults: 100,
       returnFeatureAttributes: true,
       featureAttributesToReturn: ['id', 'name']
  };
  var callback = function (status, response) {
      console.log(response);
  };
  mapsQueryClient.getFeaturesCustom(queryLayer, wkt, 'within', callback, options);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|queryLayer   |string  |  |  |The query layer.  |
|wkt   |string  |  |  |The well-known text of target shape.  |
|callback   |function  |  |  |the callback for response.  |
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |srid   |integer  |  |The SRID (coordinate system ID) in which to input and output the result. Mutually exclusive from the Proj4String parameter.  |
|         |proj4String   |string  |"+proj=longlat +datum=WGS84 +no_defs"  |The Proj4 projection string (coordinate system) in which to input and output the result. Mutually exclusive from the Srid parameter. Defaults to “+proj=longlat +datum=WGS84 +no_defs”.  |
|         |distance   |double |200  |The distance within which to find features.  |
|         |distanceUnit   |string |"Meter"  |The unit of measure in which the distance is expressed.  |
|         |searchRadius   |double |  |The radius of the search area around the target geometry. If not specified, it's assumed that there is no limit.  |
|         |searchRadiusUnit   |string |  |The unit of measure in which the searchRadius is expressed.  |
|         |maxResults   |integer |100  |The maximum number of features to return.  |
|         |returnFeatureAttributes   |boolean  |true  |If true, specifies that the feature attribute column names and values will be returned in the response.  |
|         |featureAttributesToReturn   |array  |  |If returnFeatureAttributes is true, this allows the user to specify which a specific subset of attributes to be returned.  |
