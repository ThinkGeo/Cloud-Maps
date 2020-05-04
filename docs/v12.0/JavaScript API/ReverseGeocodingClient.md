# tg.ReverseGeocodingClient

 A class provides the methods to access the ReverseGeocoding APIs. Reverse geocode to find locations near a geometry.

Syntax

```javascript
  var reverseGeocodingClient = new tg.ReverseGeocodingClient ('Your-Cloud-Service-Api-Key');
```

Parameters

|Name|Type|Description|
|---|---|---|
|apiKey   |string  | An API key for access to ThinkGeo Cloud services, it can be created following the  [guide](../client-keys.md)  |

**Return Value** - a ReverseGeocoding object to access the ReverseGeocoding APIs in ThinkGeo Cloud service.

---

## `search(options, callback)`

Searches for locations around a geometry.

Syntax

```javascript
  var options = {
      pointX: -10780076.527743513,
      pointY: 3864866.351926295,
      srid: 3857,
  };
  var callback = function (status, response) {
      console.log(response);
  };
  reverseGeocodingClient.search(options , callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |pointX   |number |  |The X coordinate of the point.  |
|         |pointY   |number |  |The Y coordinate of the point.  |
|         |wkt   |string  |  |The Well Known Text (WKT) of the geometry to use as the search area.  |
|         |body   |array  |  |A list of points to be reverse geocoded.  |
|         |srid   |integer  |4326  |The SRID (coordinate system) in which to express the result.  |
|         |proj4String   |string  |  |The Proj4String (coordinate system) in which to express the result.    |
|         |searchRadius   |number  |200  |The maximun radius around the input point to search for places. Defaults to 200.    |
|         |searchRadiusUnit   |string  |"Meter"  |The unit of measure in which the SearchRadius is expressed. Defaults to “Meter”.    |
|         |maxResults   |integer  |20  |The maximum number of results to return. Defaults to 20.    |
|         |locationCategories   |string  |"Common"  |The categories of locations to include in the result set. The default value is "Common".    |
|         |locationTypes   |string  |  |Filters the resulting locations by type. Multiple types should be separated by a comma. Defaults to no filter.    |
|         |verboseResults   |boolean  |false  |Indicates whether the results should be verbose or not. When false, the results will have fewer properties. Defaults to false.    |
|         |distanceFromQueryFeatureUnit   |string  |"Meter"  |The unit of measure in which the distance is expressed. Defaults to “Meter”.    |
|         |lang   |string  |"en"  |Optional. Sets the language for the search result. The default value is “en”.    |
|callback   |function  |  |  |the callback for response  |

---

## `searchPlaceByPoint(pointY, pointX, callback, options)`

Searches for locations around a geometry.

Syntax

```javascript
  var options = {
      srid: 3857
  };
  var callback = function (status, response) {
      console.log(response);
  };
  reverseGeocodingClient.searchPlaceByPoint(3864866.351926295, -10780076.527743513, callback, options);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|pointY   |number   |  |  |The Y coordinate of the point.             |
|pointX   |number   |  |  |The X coordinate of the point.             |
|callback   |function  |  |  |the callback for response  |
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |srid   |integer  |4326  |The SRID (coordinate system) in which to express the result.  |
|         |proj4String   |string  |  |The Proj4String (coordinate system) in which to express the result.    |
|         |searchRadius   |number  |200  |The maximun radius around the input point to search for places. Defaults to 200.    |
|         |searchRadiusUnit   |string  |"Meter"  |The unit of measure in which the SearchRadius is expressed. Defaults to “Meter”.    |
|         |maxResults   |integer  |20  |The maximum number of results to return. Defaults to 20.    |
|         |locationCategories   |string  |"Common"  |The categories of locations to include in the result set. The default value is "Common".    |
|         |locationTypes   |string  |  |Filters the resulting locations by type. Multiple types should be separated by a comma. Defaults to no filter.    |
|         |verboseResults   |boolean  |false  |Indicates whether the results should be verbose or not. When false, the results will have fewer properties. Defaults to false.    |
|         |distanceFromQueryFeatureUnit   |string  |"Meter"  |The unit of measure in which the distance is expressed. Defaults to “Meter”.    |
|         |lang   |string  |"en"  |Optional. Sets the language for the search result. The default value is “en”.    |

---

## `searchPlaceByLine(wkt, callback, options)`

Searches for locations around a line.

Syntax

```javascript
  var options = {
      srid: 3857,
  };
  var callback = function (status, response) {
      console.log(response);
  };
  reverseGeocodingClient.searchPlaceByLine("LINESTRING(-10780840.898026364 3864952.343583116,-10780219.847171547 3865009.67135433)", callback, options);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|wkt    |string   |  |  | The Well Known Text (WKT) of the geometry to use as the search area.            |
|callback   |function  |  |  |the callback for response  |
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |srid   |integer  |4326  |The SRID (coordinate system) in which to express the result.  |
|         |proj4String   |string  |  |The Proj4String (coordinate system) in which to express the result.    |
|         |searchRadius   |number  |200  |The maximum radius around the input point to search for places. Defaults to 200.    |
|         |searchRadiusUnit   |string  |"Meter"  |The unit of measure in which the SearchRadius is expressed. Defaults to “Meter”.    |
|         |maxResults   |integer  |20  |The maximum number of results to return. Defaults to 20.    |
|         |locationCategories   |string  |"Common"  |The categories of locations to include in the result set. The default value is "Common".    |
|         |locationTypes   |string  |  |Filters the resulting locations by type. Multiple types should be separated by a comma. Defaults to no filter.    |
|         |verboseResults   |boolean  |false  |Indicates whether the results should be verbose or not. When false, the results will have fewer properties. Defaults to false.    |
|         |distanceFromQueryFeatureUnit   |string  |"Meter"  |The unit of measure in which the distance is expressed. Defaults to “Meter”.    |
|         |lang   |string  |"en"  |Optional. Sets the language for the search result. The default value is “en”.    |

---

## `searchPlaceByArea(wkt, callback, options)`

Searches for locations around a geometry.

Syntax

```javascript
  var wkt= "POLYGON((-10780611.586941509 3864847.242669224,-10780831.343397828 3864617.9315843685,-10780363.166599581 3864637.0408414397,-10780611.586941509 3864847.242669224))"
  var options = {
      srid: 3857,
  };
  var callback = function (status, response) {
      console.log(response);
  };
  reverseGeocodingClient.searchPlaceByArea(wkt, callback, options);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|wkt    |string   |  |  | The Well Known Text (WKT) of the geometry to use as the search area.            |
|callback   |function  |  |  |the callback for response  |
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |srid   |integer  |4326  |The SRID (coordinate system) in which to express the result.  |
|         |proj4String   |string  |  |The Proj4String (coordinate system) in which to express the result.    |
|         |searchRadius   |number  |200  |The maximun radius around the input point to search for places. Defaults to 200.    |
|         |searchRadiusUnit   |string  |"Meter"  |The unit of measure in which the SearchRadius is expressed. Defaults to “Meter”.    |
|         |maxResults   |integer  |20  |The maximum number of results to return. Defaults to 20.    |
|         |locationCategories   |string  |"Common"  |The categories of locations to include in the result set. The default value is "Common".    |
|         |locationTypes   |string  |  |Filters the resulting locations by type. Multiple types should be separated by a comma. Defaults to no filter.    |
|         |verboseResults   |boolean  |false  |Indicates whether the results should be verbose or not. When false, the results will have fewer properties. Defaults to false.    |
|         |distanceFromQueryFeatureUnit   |string  |"Meter"  |The unit of measure in which the distance is expressed. Defaults to “Meter”.    |
|         |lang   |string  |"en"  |Optional. Sets the language for the search result. The default value is “en”.    |

---

## `searchPlaceByPoints(options, callback)`

Searches for locations around multi points.

Syntax

```javascript

  var options = {
      body:[
          {
             coord: "32.8345,-96.8616",
             srid: 4326
          },
          {
             coord: "34.8345,-93.8616",
             srid: 4326
          }
      ]
  };
  var callback = function (status, response) {
      console.log(response);
  };
  reverseGeocodingClient.searchPlaceByPoints(options , callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |body   |array  |  |A list of points to be reverse geocoded.  |
|         |srid   |integer  |4326  |The SRID (coordinate system) in which to express the result.  |
|         |proj4String   |string  |  |The Proj4String (coordinate system) in which to express the result.    |
|         |searchRadius   |number  |200  |The maximun radius around the input point to search for places. Defaults to 200.    |
|         |searchRadiusUnit   |string  |"Meter"  |The unit of measure in which the SearchRadius is expressed. Defaults to “Meter”.    |
|         |maxResults   |integer  |20  |The maximum number of results to return. Defaults to 20.    |
|         |locationCategories   |string  |"Common"  |The categories of locations to include in the result set. The default value is "Common".    |
|         |locationTypes   |string  |  |Filters the resulting locations by type. Multiple types should be separated by a comma. Defaults to no filter.    |
|         |verboseResults   |boolean  |false  |Indicates whether the results should be verbose or not. When false, the results will have fewer properties. Defaults to false.    |
|         |distanceFromQueryFeatureUnit   |string  |"Meter"  |The unit of measure in which the distance is expressed. Defaults to “Meter”.    |
|         |lang   |string  |"en"  |Optional. Sets the language for the search result. The default value is “en”.    |
|callback   |function  |  |  |the callback for response  |

---

## `searchPlaceById(placeId, callback, options)`

Get details about a place by its OpenStreetMap ID.

Syntax

```javascript
  var options={
      lang:"en"
  }
  var callback = function (status, response) {
      console.log(response);
  };
  reverseGeocodingClient.searchPlaceById(8689729, callback, options);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|placeId   |integer  |  |  |The OpenStreetMap ID of the place            |
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |lang   |string  |"en"  |Optional. Sets the language for the search result. The default value is “en”.    |
|callback   |function  |  |  |the callback for response  |

---

## getPlaceCategories(callback)

Get the available location categories.

Syntax

```javascript
  var callback = function (status, response) {
      console.log(response);
  };
  reverseGeocodingClient.getPlaceCatergories(callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|callback   |function  |  |  |the callback for response  |

---

## `getCommonCatergories(callback)`

Get the types of locations that are considered common.

Syntax

```javascript
  var callback = function (status, response) {
      console.log(response);
  };
  reverseGeocodingClient.getCommonCatergories(callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|callback   |function  |  |  |the callback for response  |
