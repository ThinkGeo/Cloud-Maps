
# Projection

ThinkGeo Cloud Projection provides RESTful APIs to re-project a point, line, or polygon shape between two coordinate systems. Check out the [online sample](https://samples.thinkgeo.com/cloud/#TransformProjection) for a quick look.

## RESTful APIs

 **Try it Online**: All the ThinkGeo Projection RESTful APIs can be tested online following the instructions below:

* Get a ThinkGeo Cloud Client Key. Check out [ThinkGeo Cloud Client Keys Guideline](../client-keys.md) see how to apply one. It's free for 60 days.
* Visit our [ThinkGeo Cloud API Explorer](https://cloud.thinkgeo.com/help/), click the "Authorize" button at the top and enter your client credentials. You are then free to play with all the APIs online.

***ThinkGeo Cloud Projection provides the following Restful APIs***

### Project Point

Converts a point from one spatial reference system to another.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/projection/{pointY},{pointX}
```

***URL Parameters***

- All parameters for this API are required and must be specified on each request.
  * pointY: The Y coordinate of the point.
  * pointX: The X coordinate of the point.
  * fromProj: The EPSG/ESRI ID or Proj4 projection string describing the original spatial reference system in which the geometry is expressed. If using a Proj4 string, the value should be URL-encoded.
  * toProj: The EPSG/ESRI ID or Proj4 projection string describing the target spatial reference system that you want the geometry reprojected to. If using a Proj4 string, the value should be URL-encoded.

Visit [ProjectPoint](https://cloud.thinkgeo.com/help/#/Projection/ProjectPointV1) and click "Try It Out" to explore this API online.

### Project Geometry

Converts geometry in Well Known Text format from one spatial reference system to another.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/projection
```

***URL Parameters***

- All parameters for this API are required and must be specified on each request.
  * wkt: The geometry that you want to reproject.
  * fromProj: The EPSG/ESRI ID or Proj4 projection string describing the original spatial reference system in which the geometry is expressed. If using a Proj4 string, the value should be URL-encoded.
  * toProj: The EPSG/ESRI ID or Proj4 projection string describing the target spatial reference system that you want the geometry reprojected to. If using a Proj4 string, the value should be URL-encoded.

Visit [ProjectGeometry](https://cloud.thinkgeo.com/help/#/Projection/ProjectGeometryV1) and click "Try It Out" to explore this API online.

## Consume from Client Side

ThinkGeo Cloud Projection does not allow anonymous users to access the API. Before working with these APIs, you will need to register with ThinkGeo Cloud and create your own clients. A new account come with two clients: **NativeConfidential** and **JavaScript**. See more details at [here](../client-keys.md).

ThinkGeo Cloud provides standard RESTful APIs which can be consumed in any platform through any language. ThinkGeo also offers two prepackaged API clients to make it easier to integrate into .NET and JavaScript applications.

### SDK for .NET

The SDK for .NET enables developers to build .NET applications that use the ThinkGeo Cloud services. The NuGet package can be found at [ThinkGeo.Cloud.Client](https://www.nuget.org/packages/ThinkGeo.Cloud.Client) or you can install this package with PM by running the command: `Install-Package ThinkGeo.Cloud.Client -Version VERSION_TO_BE_INSTALLED`

You can also check out the [.NET Cloud Maps samples](https://gitlab.com/thinkgeo/public/thinkgeo-cloud-maps/-/tree/master/samples/wpf).

### SDK for JavaScript

The SDK for JavaScript enables developers to directly access ThinkGeo Cloud services from JavaScript code running in browser. This SDK can be found at [thinkgeocloudclient-js](https://www.npmjs.com/package/thinkgeocloudclient-js). The [Transform Projection](https://samples.thinkgeo.com/cloud/#TransformProjection) sample shows how to work with this SDK.

## Samples

Online Sample:

```csharp
Coming soon
```

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
