# tg.MapsClient

A class provides the methods to access the WorldImagery APIs.

Syntax

```javascript
var mapClient = new tg.MapsClient ('Your-Cloud-Service-Api-Key');
```

Parameters

|Name|Type|Description|
|---|---|---|
|apiKey   |string  | An API key for access to ThinkGeo Cloud services, it can be created following the  [guide](../client-keys.md)  |

**Return Value** - a map object to access the Map APIs in ThinkGeo Cloud service.

## `getRasterTile(options, callback)`

Get a Maps raster tile by XYZ.

Syntax

```javascript
  var options = {
      z: 3,
      x: 2,
      y: 3,
      projection: 3857,
      mapType:'light',
      tileSize:512
      tileResolution:1
  };
  var callback = function (status, response) {
      console.log(response);
  };
  mapClient.getRasterTile(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |z   |integer  |  |The Z value (zoom level) of the tile to get.  |
|         |x   |integer  |  |The X value (matrix column) of the tile to get.  |
|         |y   |integer  |  |The Y value (matrix row) of the tile to get.  |
|         |projection   |integer  |  |The SRID in which to generate the tile. Currently only “3857” is supported.  |
|         |mapType   |string  |  |The style for the requested tile, include 'light', 'dark', 'hybrid', 'aerial', 'transparentBackground'   |
|         |tileSize   |integer  |  |The size of the tile to be returned, include 512,256.   |
|         |tileResolution   |integer  |  |The resolution for the request tile. include 1,2.   |
|callback   |function  |  |  |the callback for response  |

---

## `getVectorTile(options, callback)`

Get a Maps Streets vector tile by XYZ.

Syntax

```javascript
  var options = {
      z: 3,
      x: 2,
      y: 3,
      projection: 3857
  };
  var callback = function (status, response) {
      console.log(response);
  };
  mapClient.getVectorTile(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |z   |integer  |  |The Z value (zoom level) of the tile to get.  |
|         |x   |integer  |  |The X value (matrix column) of the tile to get.  |
|         |y   |integer  |  |The Y value (matrix row) of the tile to get.  |
|         |projection   |integer  |  |The SRID in which to generate the tile. Currently only “3857” is supported.  |
|callback  |function  |  |  |the callback for response  |
