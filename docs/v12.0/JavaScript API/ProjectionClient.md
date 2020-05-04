# tg.ProjectionClient

 A class that provides the methods to access the GIS Server Projection APIs. Converts geometry in Well Known Text format from one spatial reference system to another.

Syntax

```javascript
var projectionClient = new tg.ProjectionClient('Your-Cloud-Service-Api-Key');
```

Parameters

|Name|Type|Description|
|---|---|---|
|apiKey   |string  | An API key for access to ThinkGeo Cloud services, it can be created following the  [guide](../client-keys.md)  |

**Return Value** - a project object to access the Projection APIs in ThinkGeo Cloud service.

---

## `project(options, callback)`

Converts a geometry from one spatial reference system to another.

Syntax

```javascript
  var options = {
    pointX: 31.9000,
    pointY: -55.0000,
    fromProj: 4326,
    toProj: 3857
  };
  var callback = function (status, response) {
      console.log(response);
  };
  projectionClient.project(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |pointX   |number  |  |The X coordinate of the point.  |
|         |pointY   |number  |  |The Y coordinate of the point.  |
|         |wkt   |string  |  |The geometry that you want to reproject.  |
|         |body   |object |  |A request object containing the geometries to be reprojected, as well as input and output spatial reference systems.  |
|         |fromProj   |string  |  |The EPSG/ESRI ID or Proj4 projection string describing the original spatial reference system in which the geometry is expressed. If using a Proj4 string, the value should be URL-encoded.  |
|         |toProj   |string  |  |The EPSG/ESRI ID or Proj4 projection string describing the target spatial reference system that you want the geometry reprojected to. If using a Proj4 string, the value should be URL-encoded.  |
|callback   |function  |  |  |the callback for response  |

---

## `projectForPoint(pointY, pointX, fromProj, toProj, callback)`

Converts a geometry from one spatial reference system to another.

Syntax

```javascript
  var callback = function (status, response) {
      console.log(response);
  };
  projectionClient.projectForPoint(-55.0000,31.9000,4326,3857, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|pointY   |number  |  |The Y coordinate of the point.             |
|pointX   |number  |  |The X coordinate of the point.             |
|fromProj   |string  |  |The EPSG/ESRI ID or Proj4 projection string describing the original spatial reference system in which the geometry is expressed. If using a Proj4 string, the value should be URL-encoded.  |
|toProj   |string  |  |The EPSG/ESRI ID or Proj4 projection string describing the target spatial reference system that you want the geometry reprojected to. If using a Proj4 string, the value should be URL-encoded.   |
|callback   |function  |  |  |the callback for response  |

---

## ```projectionClient.projectForGeometry(wkt, fromProj, toProj, callback)```

Converts geometry in Well Known Text format from one spatial reference system to another.

Syntax

```javascript
  var callback = function (status, response) {
      console.log(response);
  };
  projectionClient.projectForGeometry('LINESTRING(-1399103.3657318656 308805.5942721125,-802283.0488812095 592539.8432666864)',3857, 4326, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|wkt   |string  |  |The geometry that you want to reproject.             |
|fromProj   |string  |  |The EPSG/ESRI ID or Proj4 projection string describing the original spatial reference system in which the geometry is expressed. If using a Proj4 string, the value should be URL-encoded.  |
|toProj   |string  |  |The EPSG/ESRI ID or Proj4 projection string describing the target spatial reference system that you want the geometry reprojected to. If using a Proj4 string, the value should be URL-encoded.   |
|callback   |function  |  |  |the callback for response  |

---

## `projectForGeometries(options, callback)`

Converts a collection of geometries in Well Known Text format from one spatial reference system to another.

Syntax

```javascript
   var wktArr=[
      "POINT(-997961.8412912609 563188.0244051788)",
      "POINT(-900122.4450862352 484916.5074411584)",
      "POINT(-802283.0488812095 612107.7225076917)"
   ];
   var options = {
      body: {
          wkt: wktArr,
          fromProj: "3857",
          toProj: "4326"
      }
  };
  var callback = function (status, response) {
      console.log(response);
  };
  projectionClient.projectForGeometries(options , callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |body   |object  |  |A request object containing the geometries to be reprojected, as well as input and output spatial reference systems.  |
|callback   |function  |  |  |the callback for response  |
