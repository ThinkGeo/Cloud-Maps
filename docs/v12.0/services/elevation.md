
# Elevation

ThinkGeo Cloud Elevation provides a way to get elevation data from the ThinkGeo Cloud service. Check out [Get Elevation Along Path](https://samples.thinkgeo.com/cloud/#GetElevationAlongPath) for a quick look.

The Elevation service supports querying of elevation data by points, lines and polygons and uses SRTM and NED13 as its underlying elevation source data. It accepts three basic types of input:

* **Points** - Returns the elevation at the specific coordinate requested, interpolated if necessary between the nearest values in the source data.
* **Lines** - Returns the result of dividing the line into segments and getting the elevation of each division point. Can also return the slope grade in degrees of each segment.  To fine-tune, you can specify either how many segments to divide the line into, or how long you want each segment to be.
* **Polygons** - Returns the result of dividing the polygon into a grid and getting the elevation of the center point of each grid cell.  You can specify an interval distance to control how far apart each point will be from the others.

## RESTful APIs

 ***Try it Online***: All of the ThinkGeo Cloud RESTful APIs can be tested online by following the instructions below:

* Get a ThinkGeo Cloud Client Key. Check out [ThinkGeo Cloud Client Keys Guideline](../client-keys.md) to see how to acquire and apply one. All ThinkGeo Cloud evaluations are FREE for 60 days.
* Visit our [ThinkGeo Cloud API Explorer](https://cloud.thinkgeo.com/help/), click the "Authorize" button at the top and enter your client credentials. You are then free to play with all the APIs online.

***ThinkGeo Cloud Elevation provides the following RESTful APIs***

### Get Elevation of Point

Get the elevation at a single coordinate.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/elevation/{pointY},{pointX}
```

***URL Parameters***

* pointY: The Y coordinate of the point.
* pointX: The X coordinate of the point.

Visit [GetElevationOfPoint](https://cloud.thinkgeo.com/help/#/Elevation/GetElevationOfPointV1) and click "Try It Out" to test this API online.

### Get Elevation of Points (Batch Request)

Get the elevation for each point in a batch of points (up to 1,000 points maximum per batch).

```html
HTTP POST
https://cloud.thinkgeo.com/api/v1/elevation/point/multi
```

***POST Body (Content-Type: application/json)***

```javascript
  {
    "coord": "string",The coordinates of the point. The format is: y,x.
    "elevationUnit": "string"Optional. The measurement unit in which the elevation result is expressed. Defaults to "Feet".
    "srid": int,Optional. The SRID of the input feature's coordinate system. Defaults to 4326.
    "proj4String": "string",Optional. The Proj4 string of the input feature's coordinate system.
  }
```

Each item in the batch can locally override a parameter specified on the request URL (for instance, if you have a batch of points that use multiple coordinate systems).

***URL Parameters***

* srid: *Optional.* The SRID of the input feature's coordinate system. Defaults to 4326.
* proj4String: *Optional.* The Proj4 string of the input feature's coordinate system.
* ElevationUnit: *Optional.* The measurement unit in which the elevation result is expressed. Defaults to "Feet".

Visit [GetElevationsOfPointsBatch](https://cloud.thinkgeo.com/help/#/Elevation/GetElevationsOfPointsBatchV1) and click "Try It Out" to explore this API online.

### Get Elevation of Line

Get the elevation of each sample point along a line.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/elevation/line
```

***URL Parameters***

* wkt: The Well Known Text (WKT) of a line feature to get the elevation.
* srid: *Optional.* The SRID of the input feature's coordinate system. Defaults to 4326.
* proj4String: *Optional.* The Proj4 string of the input feature's coordinate system.
* NumberOfSegments: *Optional.* Splits the requested line into this many segments, then calculates elevation of each point joining the segments.
* ElevationUnit: *Optional.* The unit of measure in which the elevation result is expressed. Defaults to "Feet".
* IntervalDistance: *Optional.* Splits the requested line into intervals of this length. The unit of measure for this distance is specified by the IntervalDistanceUnit parameter.
* IntervalDistanceUnit: *Optional.* The unit of measure in which the IntervalDistance is expressed. Defaults to "Feet".

Visit [GetElevationOfLine](https://cloud.thinkgeo.com/help/#/Elevation/GetElevationOfLineV1) and click "Try It Out" to explore this API online.

### Get Elevation of Area

Get the elevation of a matrix of points within an area.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/elevation/area
```

***URL Parameters***

* wkt: The Well Known Text (WKT) of a polygon feature to get the elevation.
* srid: *Optional.* The SRID of the input feature's coordinate system. Defaults to 4326.
* proj4String: *Optional.* The Proj4 string of the input feature's coordinate system.
* ElevationUnit: *Optional.* The unit of measure in which the elevation result is expressed. Defaults to "Feet".
* IntervalDistance: *Optional.* The distance between every two points in the area matrix. Elevation of each point will be calculated and returned. Defaults to 1000.0. The unit of measure for this distance is specified by the IntervalDistanceUnit parameter.
* IntervalDistanceUnit: *Optional.* The unit of measure in which the IntervalDistance is expressed. Defaults to "Feet".

Visit [GetElevationOfArea](https://cloud.thinkgeo.com/help/#/Elevation/GetElevationOfAreaV1) and click "Try It Out" to explore this API online.

### Get Grade of Line

Get the grade (slope) in degrees of a line, optionally split into segments.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/elevation/grade/line
```

***URL Parameters***

* wkt: The Well Known Text(WKT) of the line feature to get the grade.
* srid: *Optional.* The SRID of the input feature's coordinate system. Defaults to 4326.
* proj4String: *Optional.* The Proj4 string of the input feature's coordinate system.
* NumberOfSegments: *Optional.* Splits the requested line into this many segments, then calculates elevation of each point joining the segments.
* ElevationUnit: *Optional.* The unit of measure in which the elevation result is expressed. Defaults to "Feet".
* IntervalDistance: *Optional.* Splits the requested line into intervals of this length. The unit of measure for this distance is specified by the IntervalDistanceUnit parameter.
* IntervalDistanceUnit: *Optional.* The unit of measure in which the IntervalDistance is expressed. Defaults to "Feet".

Visit [GetGradeOfLine](https://cloud.thinkgeo.com/help/#/Elevation/GetGradeOfLineV1) and click "Try It Out" to explore this API online.

## Consume From Client Side SDKs

Our .NET SDKThinkGeo Cloud Client makes it easy to consume all of the ThinkGeo Cloud services in your applications. It's available on [NuGet](https://www.nuget.org/packages/ThinkGeo.Cloud.Client)

At the NuGet Package Manager terminal, you can install this package by running the command: `Install-Package ThinkGeo.Cloud.Client -Version VERSION_TO_BE_INSTALLED`.

You can also check out the [.NET Cloud Maps samples](https://gitlab.com/thinkgeo/public/thinkgeo-cloud-maps/-/tree/master/samples/wpf).

**Sample Code**

This snippet uses the .NET ThinkGeo Cloud Client SDK to get the elevation of a line by dividing it into 15 segments and taking samples at each segment point. The response is expressed in meters.

```csharp
using ThinkGeo.Cloud;
using ThinkGeo.MapSuite.Shapes;

LineShape line = new LineShape("LINESTRING(-12359831.643855993 4167388.583607652,-12358190.636404995 4167794.6553204176)");
ElevationClient elevationClient = new ElevationClient("Your Client ID", "Your Client Secret");
elevationClient.BaseUris.Add(new Uri("https://cloud.thinkgeo.com"));
var response = elevationClient.GetElevationOfLine(line, 3857, numberOfSegments: 15, elevationUnit: DistanceUnit.Meter);
```

Native SDKs forPython//,iOSandAndroidare coming soon.

## Samples

Online Sample:

* [ThinkGeo Cloud Elevation Online Sample](https://samples.thinkgeo.com/cloud/#GetElevationAlongPath)

Desktop Sample:

* [ThinkGeo Cloud Elevation Sample for Wpf](https://gitlab.com/thinkgeo/public/thinkgeo-cloud-maps/-/tree/master/samples/wpf/ThinkGeoCloudElevationSample) for [ThinkGeo Desktop Maps](https://gitlab.com/thinkgeo/public/thinkgeo-desktop-maps)

Web Sample:

```
Coming soon
```

Mobile Sample:

```
Coming soon
```
