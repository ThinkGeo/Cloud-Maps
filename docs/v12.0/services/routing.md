
# Routing

ThinkGeo Cloud Routing provides RESTful APIs to get turn-by-turn driving directions, define service areas that can be reached by car in a given time or distance, and more.  Check out the [online sample](https://samples.thinkgeo.com/cloud/#RoutinginNorthAmerica/) for a quick look.

## RESTful APIs

**Try it Online**: All the ThinkGeo Cloud RESTful APIs can be tested online following the instructions below:

* Get a ThinkGeo Cloud Client Key. Check out [ThinkGeo Cloud Client Keys Guideline](../client-keys.md) see how to apply one. It's free for 60 days.
* Visit our [ThinkGeo Cloud API Explorer](https://cloud.thinkgeo.com/help/), click the "Authorize" button at the top and enter your client credentials. You are then free to play with all the APIs online.

***ThinkGeo Cloud Routing provides the following Restful APIs***

### Get Route

Finds the shortest route between 2-25 waypoints.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/route/{coordinates}
```

***URL Parameters***

* coordinates: A semicolon-delimited list of {y},{x} coordinates to travel in order.
* srid: Optional. The SRID of the input and output feature's coordinate system. Defaults to 4326.
* proj4String: Optional. The Proj4 string of the input and output feature's coordinate system.
* turnByTurn: Optional. Whether to return turn-by-turn instructions or not. Defaults to false.
* coordinateSnapRadius: Optional. The maximum distance of a coordinate can be snapped to the road network. Defaults to 5000 meters.
* coordinateSnapRadiusUnit: Optional. The unit of the radius to snap the input coordinate to road network.
* distanceUnit: Optional. The unit of measure in which to express the length of the route.
* durationUnit: Optional. The unit of the time in which to express the duration of the route.

Visit the [Routing](https://cloud.thinkgeo.com/help/index.html#/Routing/Get%20routeV1) API explorer page and click "Try It Out" to explore this API online.

### Find Service Area

Find all the areas you can reach by car in a given time or distance.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/service-area/{pointY},{pointX}
```

***URL Parameters***

* pointY: The Y coordinate of the point.
* pointX: The X coordinate of the point.
* srid: Optional. The SRID of the input and output feature's coordinate system. Defaults to 4326.
* proj4String: Optional. The Proj4 string of the input and output feature's coordinate system.
* serviceLimits: A comma-delimited list of integer array, which specifies the travel distances or travel times to generate for each facility. The maximum number of serviceLimits is 6.
* contourGranularity: Optional. A float in the range of (0, 1.0) to identify how much we want to remove the contours. 0 means do not remove any contour at all, 1.0 means only return the largest contours.
* coordinateSnapRadius: Optional. The maximum distance of a coordinate can be snapped to the road network. Defaults to 5000 meters.
* coordinateSnapRadiusUnit: Optional. The unit of the radius to snap the input coordinate to road network.
* distanceUnit: Optional. The unit of measure in which to express the length of the route.
* durationUnit: Optional. The unit of the time in which to express the duration of traveling the route.
* gridSizeInMeters: Optional. A float value in meters used as the tolerance for concave polygon. The smaller of the number is getting more accurate of the service areas but slower performance, better a value bigger than 300, but depends on the size of the result coverage. Defaults to 400.
* serviceAreaSeparationType: Optional. Specify whether to include the region covered by the smaller service area into the region covered by the larger service area.
* serviceAreaType: Optional. Indicates whether the result is returned as polygons enveloping the accessible roads, or as linestrings surrounding those roads.
* serviceLimitsType: Optional. Indicates the unit of the serviceLimits.
* travelDirection: Optional. Indicates the direction of travel to or from the coordinate.

Visit the [Routing: Service Area](https://cloud.thinkgeo.com/help/index.html#/Routing/Get%20service%20areaV1) API explorer page and click "Try It Out" to explore this API online.

### Get Cost Matrix

Calculates the travel time or distance between each waypoint in a series of coordinates and returns a matrix.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/route/matrix/?origins={origins}&destinations={destinations}
```

***URL Parameters***

* origins: A semicolon-delimited list of {y},{x} coordinates to treat at route starting points.
* destinations: A semicolon-delimited list of {y},{x} coordinates to treat as route ending points.
* costMatrixType: Optional. Whether to return a matrix of travel times or distances.  Acceptable values are time and distance.  Defaults to time.
* srid: Optional. The SRID of the coordinate system in which to express the input and output origins and destinations. Defaults to 4326.
* proj4String: Optional. The Proj4 string of the coordinate system in which to express the input and output origins and destinations.
* coordinateSnapRadius: Optional. The maximum distance of a coordinate can be snapped to the road network. Defaults to 5000 meters.
* coordinateSnapRadiusUnit: Optional. The unit of the radius to snap the input coordinate to road network.
* distanceUnit: Optional. The unit of measure in which to express the length of each route in the matrix.
* durationUnit: Optional. The unit of the time in which to express the travel time for each route in the matrix.

Visit the [Routing: Cost Matrix](https://cloud.thinkgeo.com/help/index.html#/Routing/Get%20cost%20matrixV1) API explorer page and click "Try It Out" to explore this API online.

### Optimize Route for TSP

Find the shortest route through a series of destinations, optionally returning to the starting point.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/route/optimization/{coordinates}
```

***URL Parameters***

* coordinates: A semicolon-separated list of {y},{x} coordinate pairs to visit along the route. You can specify between 2 and 25 coordinates.
* srid: Optional. The SRID of the input and output feature's coordinate system. Defaults to 4326.
* proj4String: Optional. The Proj string of the input and output feature's coordinate system.
* roundtrip: Optional. Indicates whether the returned route is round-trip, meaning the route returns to the starting location (true) or not (false). Defaults to true.
* source: Optional. Identifies which coordinate should be used as the start point of the route. Acceptable values are `first`, which uses the first point in the coordinates array, or `any`, which chooses the most efficient start point. Defaults to `first`.
* destination: Optional. Identifies which coordinate should be used as the final destination of the route.  Acceptable values are `any`, which chooses the most efficient start point, or `last`, which uses the last point in the coordinates array. Defaults to `any`.
* turnByTurn: Optional. Specifies whether to return turn-by-turn directions with your route.  Defaults to false.
* coordinateSnapRadius: Optional. The maximum distance a coordinate can be snapped to the road network. Defaults to 5000.
* coordinateSnapRadiusUnit: Optional. The unit of the radius to snap the input coordinate to road network. Defaults to meters.
* distanceUnit: Optional. The unit of measure in which to express the length of the route. Defaults to meters.
* durationUnit: Optional. The unit of the time in which to express the duration of traveling the route. Defaults to minutes.

Visit the [Routing: Optimization](https://cloud.thinkgeo.com/help/index.html#/Routing/OptimizationV1) API explorer page and click "Try It Out" to explore this API online.

## Consume from Client Side

ThinkGeo Cloud Routing does not allow anonymous users to access the API. Before working with these APIs, you will need to register with ThinkGeo Cloud and create your own clients. A new account come with two clients: **NativeConfidential** and **JavaScript**. See more details at [here](../client-keys.md).

ThinkGeo Cloud provides standard RESTful APIs which can be consumed in any platform through any language. ThinkGeo also offers two prepackaged API clients to make it easier to integrate into .NET and JavaScript applications.

### SDK for .NET

The SDK for .NET enables developers to build .NET applications that use the ThinkGeo Cloud services. The NuGet package can be found at [ThinkGeo.Cloud.Client](https://www.nuget.org/packages/ThinkGeo.Cloud.Client) or you can install this package with PM by running the command: `Install-Package ThinkGeo.Cloud.Client -Version VERSION_TO_BE_INSTALLED`.

### SDK for JavaScript

The SDK for JavaScript enables developers to directly access ThinkGeo Cloud services from JavaScript code running in browser. This SDK can be found at [thinkgeocloudclient-js](https://www.npmjs.com/package/thinkgeocloudclient-js).

The [Routing in North America](https://samples.thinkgeo.com/cloud/#RoutinginNorthAmerica) and [Get Service Area](https://samples.thinkgeo.com/cloud/#GetServiceArea) samples show how to work with this SDK.

## Samples

Online Sample:

* [ThinkGeo Cloud Routing Online Sample](https://samples.thinkgeo.com/cloud/#RoutinginNorthAmerica)

Desktop Sample:

```csharp
Coming soon
```

Web Sample:

```csharp
Coming soon
```

Mobile Sample:

```csharp
Coming soon
```
