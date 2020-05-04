# tg.RoutingClient

 A class provides the methods to access the Routing APIs. Get turn-by-turn driving directions, define service areas that can be reached by car in a given time or distance, and more.

Syntax

```javascript
var routingClient = new tg.RoutingClient ('Your-Cloud-Service-Api-Key');
```

Parameters

|Name|Type|Description|
|---|---|---|
|apiKey   |string  | An API key for access to ThinkGeo Cloud services, it can be created following the  [guide](../client-keys.md)  |

**Return Value** - a Routing object to access the Routing APIs in ThinkGeo Cloud service.

---

## `getRoute(waypoints, callback, options)`

Get a route through the specified waypoints.

Syntax

```javascript
  var waypoints = [{
    x: -96.872893,
    y: 33.184352
  },{
    x: -83.441568,
    y: 42.404719
  }];
  var options = {
       srid: 4326,
       turnByTurn: true,
       distanceUnit: 'Meter',
       durationUnit: 'Minute'
  };
  var callback = function (status, response) {
      console.log(response);
  };
  routingClient.getRoute(waypoints, callback, options);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|waypoints   |array  |  |  |A list of coordinates to travel in order.  |
|callback   |function  |  |  |the callback for response.  |
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |srid   |integer  |  |The SRID (coordinate system ID) in which to input and output the result. Mutually exclusive from the Proj4String parameter.  |
|         |proj4String   |string  |"+proj=longlat +datum=WGS84 +no_defs"  |The Proj4 projection string (coordinate system) in which to input and output the result. Mutually exclusive from the Srid parameter. Defaults to “+proj=longlat +datum=WGS84 +no_defs”.  |
|         |turnByTurn   |boolean |false  |Whether to return turn-by-turn instructions or not. Defaults to false.  |
|         |coordinateSnapRadius   |double  |5000  |The maximum distance of a coordinate can be snapped to the road network. Defaults to 5000 meters.  |
|         |coordinateSnapRadiusUnit   |string  |meter  |The unit of the radius to snap the input coordinate to road network.  |
|         |distanceUnit   |string  |meter  |The unit of measure in which to express the length of the route. Default to Meter.  |
|         |durationUnit  |string  |minute  |The unit of the time in which to express the duration of the route.  |

---

## `getServiceArea(pointY, pointX, serviceLimits, callback, options)`

Get the reachable service area (isochrones) for a coordinate point, based on the specified time or distance constraints.

Syntax

```javascript
  var serviceLimits = [10, 30, 60];
  var callback = function (status, response) {
    console.log(response);
  };
  var options = {
    srid = 3857,
    serviceLimitsType = 'Time',
    durationUnit = 'minute',
    distanceUnit = 'meter'
  };
  routingClient.getServiceArea(33.184352, -96.872893, serviceLimits, callback, options);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|pointY   |double  |  |  |The Y coordinate of the point.    |
|pointX   |double  |  |  |The X coordinate of the point.    |
|serviceLimits   |array  |  |  |The list represents the travel distances or travel times to generate for each facility. The maximum number of serviceLimits is 6.    |
|callback   |function  |  |  |the callback for response.  |
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |srid   |integer  |  |The SRID (coordinate system ID) in which to input and output the result. Mutually exclusive from the Proj4String parameter.  |
|         |proj4String   |string  |"+proj=longlat +datum=WGS84 +no_defs"  |The Proj4 projection string (coordinate system) in which to input and output the result. Mutually exclusive from the Srid parameter. Defaults to “+proj=longlat +datum=WGS84 +no_defs”.  |
|         |contourGranularity   |double  |1.0  |A float in the range of (0, 1.0) to identify how much we want to remove the contours. 0 means do not remove any contour at all, 1.0 means only return the largest contour.  |
|         |coordinateSnapRadius   |double  |5000  |The maximum distance of a coordinate can be snapped to the road network.  |
|         |coordinateSnapRadiusUnit   |string  |meter  |The unit of the radius to snap the input coordinate to road network.  |
|         |distanceUnit   |string  |meter   |The unit of measure in which to express the length of route.  |
|         |durationUnit   |string  |minute   |The unit of the time in which to express the duration of traveling the route.  |
|         |gridSizeInMeters   |double  |400   |A float value in meters used as the tolerance for concave polygon. The smaller of the number is getting more accurate of the service areas but slower performance, better a value bigger than 300, but depends on the size of the result coverage.  |
|         |serviceAreaSeparationType   |string  |separated   |Specify whether to include the region covered by the smaller service area into the region covered by the larger service area.  |
|         |serviceAreaType   |string  |polygon   |Indicates whether the result is returned as polygons enveloping the accessible roads, or as linestrings surrounding those roads.  |
|         |serviceLimitsType   |string  |time   |Indicates the unit of the serviceLimits.  |
|         |travelDirection   |string  |from   |Indicates the direction of travel to or from the coordinates.  |
