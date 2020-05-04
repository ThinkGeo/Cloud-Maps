# WMS

ThinkGeo Cloud Maps WMS provides an API with which you can retrieve map images through a standards-compliant WMS (Web Map Service). This can be either a single image of a complete map, or one tile from a multi-tile map.

## APIs

* ***Try it Online**:All the ThinkGeo Cloud RESTful APIs can be tested online following the instructions below:
  * Get a ThinkGeo Cloud Client Key. Check out [ThinkGeo Cloud Client Keys Guideline](../client-keys.md) see how to apply one. It's free for 60 days.
  * Visit our [ThinkGeo Cloud API Explorer](https://cloud.thinkgeo.com/help/), click the "Authorize" button at the top and enter your client credentials. You are then free to play with all the APIs online.

***ThinkGeo Cloud Maps WMS provides the following RESTful API***

### Get WMS Map

Retrieve a map image via WMS.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/maps/wms
```

***URL Parameters***

* Request: *Required.* The type of WMS request. Supported values are:
  * GetMap: Requests a map image. This will be the request type you use most often.
  * GetCapabilities: Details the capabilities of the WMS service.
* Service: *Required.* The service name. Must be "WMS".  **Default value: WMS**
* Version: *Required.* The WMS version to use. Supported values are “1.1.1” and "1.3.0". **Default value: 1.1.1**
* Layers: *Required for "GetMap".* The map layers to include in the requested image. Use “,” as the separator for multiple layers. For a list of supported values, please send a “GetCapablities” request.
* Styles: *Required for "GetMap".* The styles for the requested image. Use “,” as the separator for multiple styles. For a list of supported values, please send a “GetCapablities” request.
* Format: *Required for "GetMap".* The format of the requested image. For a list of supported values, please send a “GetCapablities” request.
* Width: *Required for "GetMap".* The width of the requested image in pixels. **Default value: 512**
* Height: *Required for "GetMap".* The height of the requested image in pixels. **Default value: 512**
* BBox: *Required for "GetMap".* The bounding box of the requested image, expressed as the spatial coordinates of a rectangle. The required format is "minX,minY,maxX,maxY".
* Srs: *Required for "GetMap".* The spatial reference system in which the BBox is specified.  Applies only to version "1.1.1". **Default value: EPSG:3857**
* Crs: *Required for "GetMap".* The coordinate reference system in which the BBox is specified.  Applies only to version "1.3.0".
* Exceptions: The output format to use for exceptions.
* Transparent: Indicates whether or not the requested image should have an alpha channel (transparent background).

Visit [GetWmsMap](https://cloud.thinkgeo.com/help/#/MapsWms/GetWmsMapV1) and click "Try It Out" to explore this API online.

## Consume from Client Side

ThinkGeo Cloud provides standard RESTful APIs which can be consumed on any platform through any language. ThinkGeo also offers two prepackaged API clients to make it easier to integrate into .NET and JavaScript applications.

### SDK for .NET

Our .NET SDK ThinkGeo Cloud Client makes it easy to consume all of the ThinkGeo Cloud services in your applications. It's available on [NuGet](https://www.nuget.org/packages/ThinkGeo.Cloud.Client).

At the NuGet Package Manager terminal, you can install this package by running the command: `Install-Package ThinkGeo.Cloud.Client -Version VERSION_TO_BE_INSTALLED`.

### SDK for JavaScript

The SDK for JavaScript enables developers to directly access ThinkGeo Cloud services from JavaScript code running in browser. This SDK can be found at [thinkgeocloudclient-js](https://www.npmjs.com/package/thinkgeocloudclient-js).

## Samples

Online Sample:

```csharp

Coming soon

```

Web Sample:

```csharp

Coming soon

```

Desktop Sample:

```csharp

Coming soon

```

Mobile Sample:

```csharp

Coming soon

```
