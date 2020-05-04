
# Reverse Geocoding

ThinkGeo Cloud Reverse Geocoding provides RESTful APIs to find an address from a location/location coordinates. Check out the [online sample](https://cloudclientsamples.thinkgeo.com/#Reverse-Geocoding) for a quick look.

## RESTful APIs

* ***Try it Online**:All the ThinkGeo Cloud RESTful APIs can be tested online following the instructions below:
  * Get a ThinkGeo Cloud Client Key. Check out [ThinkGeo Cloud Client Keys Guideline](../client-keys.md) see how to apply one. It's free for 60 days.
  * Visit our [ThinkGeo Cloud API Explorer](https://cloud.thinkgeo.com/help/), click the "Authorize" button at the top and enter your client credentials. You are then free to play with all the APIs online.

***ThinkGeo Cloud ReverseGeocoding provides the following Restful APIs***

### Get Reverse Geocoding For Point

Get reverse geocoding for point.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/location/reverse-geocode/{pointY},{pointX}
```

***URL Parameters***

* pointY: The Y coordinate of the point.
* pointX: The X coordinate of the point.
* srid: *Optional.* The SRID (coordinate system) in which to express the result. Defaults to 4326.
* proj4String: *Optional.* The Proj4String (coordinate system) in which to express the result.
* lang: *Optional.* The language in which to express the result.
* searchRadius: *Optional.* The maximum radius around the input point to search for places. Defaults to 200.
* searchRadiusUnit: *Optional.* The unit of measure in which the SearchRadius is expressed. Defaults to "Meter".
* maxResults: *Optional.* The maximum number of results to return. Defaults to 20.
* locationCategories: *Optional.* The categories of locations to include in the result set. The default value is "Common".
* locationTypes: *Optional.* Filters the resulting locations by type. Multiple types should be separated by a comma. Defaults to no filter.
* verboseResults: *Optional.* Indicates whether the results should be verbose or not. When false, the results will have fewer properties. Defaults to false.
* distanceFromQueryFeatureUnit: *Optional.* The unit of measure in which the distance is expressed. Defaults to "Meter".

Visit [GetReverseGeocodingForPoint](https://cloud.thinkgeo.com/help/#/ReverseGeocoding/ReverseGeocodeByPointV1) and click "Try It Out" to explore this API online.

### Reverse Geocode By Points (Batch Request)

Get reverse geocoding for points.

```html
HTTP POST
https://cloud.thinkgeo.com/api/v1/location/reverse-geocode/multi
```

***POST Body (Content-Type: application/json)***

```javascript
[
  {
    "coord": "string",The coordinates of the point. The format is: y,x.
    "srid": int,Optional. The SRID (coordinate system) in which to express the result. Defaults to 4326.
    "proj4String": "string",Optional. The Proj4String (coordinate system) in which to express the result.
    "lang": "string",Optional. The language in which to express the result.
    "searchRadius": int,Optional. The maximun radius around the input point to search for places. Defaults to 200.
    "searchRadiusUnit": "Meter",Optional. The unit of measure in which the SearchRadius is expressed. Defaults to "Meter".
    "maxResults": int,Optional. The maximum number of results to return. Defaults to 20.
    "locationCategories": "string",Optional. The categories of locations to include in the result set. The default value is "Common".
    "locationTypes": "string",Optional. Filters the resulting locations by type. Multiple types should be separated by a comma. Defaults to no filter.
    "verboseResults": bool,Optional. Indicates whether the results should be verbose or not. When false, the results will have fewer properties. Defaults to false.
    "distanceFromQueryFeatureUnit": "Meter"Optional. The unit of measure in which the distance is expressed. Defaults to "Meter".
  }
]
```

Each item in the batch can locally override a parameter specified on the request URL.

***URL Parameters***

* srid: *Optional.* The SRID (coordinate system) in which to express the result. Defaults to 4326.
* proj4String: *Optional.* The Proj4String (coordinate system) in which to express the result.
* lang: *Optional.* The language in which to express the result.
* searchRadius: *Optional.* The maximum radius around the input point to search for places. Defaults to 200.
* searchRadiusUnit: *Optional.* The unit of measure in which the SearchRadius is expressed. Defaults to "Meter".
* maxResults: *Optional.* The maximum number of results to return. Defaults to 20.
* locationCategories: *Optional.* The categories of locations to include in the result set. The default value is "Common".
* locationTypes: *Optional.* Filters the resulting locations by type. Multiple types should be separated by a comma. Defaults to no filter.
* verboseResults: *Optional.* Indicates whether the results should be verbose or not. When false, he results will have fewer properties. Defaults to false.
* distanceFromQueryFeatureUnit: *Optional.* The unit of measure in which the distance is expressed. Defaults to "Meter".

Visit [ReverseGeocodeByPointsBatch](https://cloud.thinkgeo.com/help/#/ReverseGeocoding/ReverseGeocodeByPointsBatchV1) and click "Try It Out" to explore this API online.

### Get Reverse Geocoding For Area

Get reverse geocoding for area.  Returns locations found only within the polygon you specify.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/location/reverse-geocode/area?wkt={polygon}
```

***URL Parameters***

* wkt: The Well Known Text (WKT) of the polygon feature to use as the search area.
* srid: *Optional.* The SRID (coordinate system) in which to express the result. Defaults to 4326.
* proj4String: *Optional.* The Proj4String (coordinate system) in which to express the result.
* lang: *Optional.* The language in which to express the result.
* searchRadius: *Optional.* The maximum radius around the input point to search for places. Defaults to 200.
* searchRadiusUnit: *Optional.* The unit of measure in which the SearchRadius is expressed. Defaults to "Meter".
* maxResults: *Optional.* The maximum number of results to return. Defaults to 20.
* locationCategories: *Optional.* The categories of locations to include in the result set. The default value is "Common".
* locationTypes: *Optional.* Filters the resulting locations by type. Multiple types should be separated by a comma. Defaults to no filter.
* verboseResults: *Optional.* Indicates whether the results should be verbose or not. When false, the results will have fewer properties. Defaults to false.
* distanceFromQueryFeatureUnit: *Optional.* The unit of measure in which the distance is expressed. Defaults to "Meter".

Visit [GetReverseGeocodingForArea](https://cloud.thinkgeo.com/help/#/ReverseGeocoding/ReverseGeocodeByAreaV1) and click "Try It Out" to explore this API online.

### Get Reverse Geocoding For Line

Get reverse geocoding along a line. Useful for seeing what addresses or places are located along a road or highway.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/location/reverse-geocode/line?wkt={line}
```

***URL Parameters***

* wkt: The Well Known Text (WKT) of the line feature to use as the search area.
* srid: *Optional.* The SRID (coordinate system) in which to express the result. Defaults to 4326.
* proj4String: *Optional.* The Proj4String (coordinate system) in which to express the result.
* lang: *Optional.* The language in which to express the result.
* searchRadius: *Optional.* The maximum radius around the input point to search for places. Defaults to 200.
* searchRadiusUnit: *Optional.* The unit of measure in which the SearchRadius is expressed. Defaults to "Meter".
* maxResults: *Optional.* The maximum number of results to return. Defaults to 20.
* locationCategories: *Optional.* The categories of locations to include in the result set. The default value is "Common".
* locationTypes: *Optional.* Filters the resulting locations by type. Multiple types should be separated by a comma. Defaults to no filter.
* verboseResults: *Optional.* Indicates whether the results should be verbose or not. When false, the results will have fewer properties. Defaults to false.
* distanceFromQueryFeatureUnit: *Optional.* The unit of measure in which the distance is expressed. Defaults to "Meter".

Visit [GetReverseGeocodingForLine](https://cloud.thinkgeo.com/help/#/ReverseGeocoding/ReverseGeocodeByLineV1) and click "Try It Out" to explore this API online.

### Get Place By ID

Get details about a specific point of interest by its ID.  Places returned in response to your reverse geocode requests will have IDs associated with them, which you can use with this endpoint.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/location/place/{placeId}
```

***URL Parameters***

* placeId: The OpenStreetMap ID of the place.
* lang: *Optional.* Sets the language for the search result. The default value is "en".

Visit [GetPlaceById](https://cloud.thinkgeo.com/help/#/ReverseGeocoding/GetPlaceByIdV1) and click "Try It Out" to explore this API online.

### Get Location Categories

Get a list of the available location categories.  These can be passed in to the reverse geocoding endpoints to filter the types of locations the service will return to you.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/location/reverse-geocode/location-categories
```

***URL Parameters***
No parameters.

Visit [GetLocationCategories](https://cloud.thinkgeo.com/help/#/ReverseGeocoding/GetReverseGeocodingLocationCategoriesV1) and click "Try It Out" to explore this API online.

### Get Common Location Categories

When requesting a reverse geocode, you can filter the types of locations the service will return to you, with one option being "Common".  This API lists what types of categories fall under "Common".

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/location/reverse-geocode/location-categories/common
```

***URL Parameters***
No parameters.

Visit [GetLocationCategoriesInCommonGroup](https://cloud.thinkgeo.com/help/#/ReverseGeocoding/GetReverseGeocodingCommonLocationCategoriesV1) and click "Try It Out" to explore this API online.

## Consume from Client Side

ThinkGeo Cloud Reverse Geocoding does not allow anonymous users to access the API. Before working with these APIs, you will need to register with ThinkGeo Cloud and create your own clients. A new account comes with two clients: **NativeConfidential** and **JavaScript**. See more details at [here](../client-keys.md).

ThinkGeo Cloud provides standard RESTful APIs which can be consumed on any platform through any language. ThinkGeo also offers two prepackaged API clients to make it easier to integrate into .NET and JavaScript applications.

### SDK for .NET

Our .NET SDKThinkGeo Cloud Client makes it easy to consume all of the ThinkGeo Cloud services in your applications. It's available on [NuGet](https://www.nuget.org/packages/ThinkGeo.Cloud.Client).

At the NuGet Package Manager terminal, you can install this package by running the command: `Install-Package ThinkGeo.Cloud.Client -Version VERSION_TO_BE_INSTALLED`.

### SDK for JavaScript

The SDK for JavaScript enables developers to directly access ThinkGeo Cloud services from JavaScript code running in browser. This SDK can be found at [thinkgeocloudclient-js](https://www.npmjs.com/package/thinkgeocloudclient-js).

## Samples

Online Sample:

* [ThinkGeo Cloud Geocoding Online Sample](https://samples.thinkgeo.com/cloud/#FindNearbyPlaces)

Desktop Sample:

* [ThinkGeo Cloud Geocoding Sample for Wpf](https://gitlab.com/thinkgeo/public/thinkgeo-cloud-maps/-/tree/master/samples/wpf/ThinkGeoCloudReverseGeocodingSample) for [ThinkGeo Desktop Maps](https://gitlab.com/thinkgeo/public/thinkgeo-desktop-maps)

Web Sample:

```csharp
Coming soon
```

Mobile Sample:

```csharp
Coming soon
```
