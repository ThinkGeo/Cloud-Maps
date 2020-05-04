# tg.ElevationClient

A class provides the methods to access the Elevation APIs. Get the elevation of a geometry, include point, line, polygon.

Syntax

```javascript
var elevationClient = new tg.ElevationClient('Your-Cloud-Service-Api-Key');
```

Parameters

|Name|Type|Description|
|---|---|---|
|apiKey   |string  | An API key for access to ThinkGeo Cloud services, it can be created following the  [guide](../client-keys.md)  |

**Return Value** - an elevation object to access the Elevation APIs in ThinkGeo Cloud service.

---

## `getElevationOfPoint(options, callback)`

Get the elevation of a point.

Syntax

```javascript
  var options = {
      pointY: 33.128367,
      pointX:-96.809847,
      srid: 4326,
      elevationUnit:'Feet'
  };
  var callback = function (status, response) {
      console.log(response);
  };
  elevationClient.getElevationOfPoint(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |pointY   |number  |  |The Y coordinate of the point.  |
|         |pointX   |number  |  |The X coordinate of the point.  |
|         |srid   |integer  |4326  |The SRID (coordinate system) of the input Point.  |
|         |proj4String   |string  |  |The Proj4 (coordinate system) of the input Point.  |
|         |elevationUnit   |string  |"Feet"  |The unit of measure in which the elevation result is expressed.  |
|callback   |function  |  |  |the callback for response  |

---

## `getElevationOfPoints(options, callback)`

Get the elevations of all the points in a collection (up to 1,000 points maximum).

Syntax

```javascript
   var options = {
      body:[
            {
               "coord":"33.128367,-96.809847",
               "srid":4326,
               "elevationUnit":"Meter"
            }
      ]
      srid: 4326,
      elevationUnit:'Meter'
  };
  var callback = function (status, response) {
      console.log(response);
  };
  elevationClient.getElevationOfPoints(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |body  |array |  |A collection of point in JSON, the srid, proj4String and elevationUnit can be individually specified for each point.  |
|         |srid   |integer  |4326  |The common SRID (coordinate system) for points which hasn't been specified.  |
|         |proj4String   |string  |  |The common Proj4 (coordinate system) for points which hasn't been specified.  |
|         |elevationUnit   |string  |"Feet"  |The unit of measure in which the elevation result is expressed.  |
|callback   |function  |  |  |the callback for response  |

---

## `getElevationOfLine(options, callback)`

Get the elevation of points along a line.

Syntax

```javascript
 var options = {
      wkt: 'LINESTRING(-10717751.685805485 3864388.620499513,-10717359.946035523 3864570.1584416907)',
      srid: 3857,
      numberOfSegments:5,
      elevationUnit:'Meter',
  };
  var callback = function (status, response) {
      console.log(response);
  };
  elevationClient.getElevationOfPoints(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options  |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |wkt   |string  |  |The Well Known Text (WKT) of a line feature to get the elevation.  |
|         |srid   |integer  |4326  |The SRID (coordinate system) of the input line.  |
|         |proj4String   |string  |  |The Proj4String (coordinate system) of the input line.  |
|         |elevationUnit   |string  |"Feet"  |The unit of measure in which the elevation result is expressed.  |
|         |numberOfSegments   |integer  |  |Splits the requested line into this many segments, then calculates elevation of each point joining the segments.  |
|         |IntervalDistance   |integer  |  |Splits the requested line into intervals of this length. The unit of measure for this distance is specified by the IntervalDistanceUnit parameter.  |
|         |IntervalDistanceUnit   |string  |"Feet"  |The unit of measure in which the IntervalDistance is expressed.  |
|callback   |function  |  |  |the callback for response  |

---

## `getGradeOfLine(options, callback)`

Get the grade (slope) of a line, optionally split into segments.

Syntax

```javascript
 var options = {
      wkt: 'LINESTRING(-10717751.685805485 3864388.620499513,-10717359.946035523 3864570.1584416907)',
      srid: 3857,
      numberOfSegments:5,
      elevationUnit:'Meter',
  };
  var callback = function (status, response) {
      console.log(response);
  };
  elevationClient.getGradeOfLine(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |wkt   |string  |  |The Well Known Text(WKT) of the line feature to get the grade.  |
|         |srid   |integer  |4326  |The SRID (coordinate system) of the input line.  |
|         |proj4String   |string  |  |The Proj4String (coordinate system) of the input line.  |
|         |elevationUnit   |string  |"Feet"  |The unit of measure in which the elevation result is expressed.  |
|         |numberOfSegments   |integer  |  |Splits the requested line into this many segments, then calculates elevation of each point joining the segments.  |
|         |IntervalDistance   |number   |  |Splits the requested line into intervals of this length. The unit of measure for this distance is specified by the IntervalDistanceUnit parameter.  |
|         |IntervalDistanceUnit   |string  |"Feet"  |The unit of measure in which the IntervalDistance is expressed.  |
|callback   |function  |  |  |the callback for response  |

---

## `getElevationOfArea(options, callback)`

Get the elevation of a matrix of points within an area

Syntax

```javascript
 var options = {
      wkt: 'POLYGON((-10717723.021919878 3864742.1417553322,-10718038.324661555 3864426.839013656,-10716901.323865812 3864503.2760419413,-10717723.021919878 3864742.1417553322))',
      srid: 3857,
      numberOfSegments:5,
      elevationUnit:'Meter',
  };
  var callback = function (status, response) {
      console.log(response);
  };
  elevationClient.getElevationOfArea(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |wkt   |string  |  |The Well Known Text (WKT) of a polygon feature to get the elevation.  |
|         |srid   |integer  |4326  |The SRID (coordinate system) of the input polygon.  |
|         |proj4String   |string  |  |The Proj4String (coordinate system) of the input polygon.  |
|         |elevationUnit   |string  |"Feet"  |The unit of measure in which the elevation result is expressed.  |
|         |numberOfSegments   |integer  |  |Splits the requested line into this many segments, then calculates elevation of each point joining the segments.  |
|         |IntervalDistance   |number   |1000.0  |The distance between every two points in the area matrix. Elevation of each point will be calculated and returned. Defaults to 1000.0. The unit of measure for this distance is specified by the IntervalDistanceUnit parameter.  |
|         |IntervalDistanceUnit   |string  |"Feet"  |The unit of measure in which the IntervalDistance is expressed.  |
|callback   |function  |  |  |the callback for response  |
