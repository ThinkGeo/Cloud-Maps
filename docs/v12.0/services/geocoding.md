
# Geocoding

ThinkGeo Cloud Geocoding provides RESTful APIs to find the Geolocation from an address in the United States. Check out the [online sample](https://cloudclientsamples.thinkgeo.com/#Geocoding) for a quick look.

## RESTful APIs

**Try it Online**: All the ThinkGeo Cloud RESTful APIs can be tested online following the instructions below:

* Get a ThinkGeo Cloud Client Key. Check out [ThinkGeo Cloud Client Keys Guideline](../client-keys.md) see how to apply one. It's free for 60 days.
* Visit our [ThinkGeo Cloud API Explorer](https://cloud.thinkgeo.com/help/), click the "Authorize" button at the top and enter your client credentials. You are then free to play with all the APIs online.

***ThinkGeo Cloud Geocoding provides the following 2 Restful APIs***

### Geocode Address

Get location from an address.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/location/geocode/{searchText}
```

***URL Parameters***

* searchText: The address to be geocoded.
* locationType: *Optional.* Specifies what types of locations will be considered a match. Possible values are Address, Street, State, City, County, Zipcode. Defaults to Default.
* fuzzyMatch: *Optional.* Specifies whether to attempt approximate, as well as exact, matching when performing geocodes. Defaults to false.
* countries: *Optional.* Limit the results only within the countries specified here. It can be one or more “ISO Language Name” mentioned  ISO 639-1 language code.
* bbox: *Optional.* Limits the results to only those contained within the supplied bounding box.  The valid format is "minX,minY,maxX,maxY". Defaults to null, as the global.
* maxResults: *Optional.* The maximum number of possible matches to return, if multiple candidates are found. Defaults to 10.
* verboseResults: *Optional.* Indicates whether the results should be verbose or not. When false, the results will have fewer properties. Defaults to false.
* autocomplete: *Optional.* Specifies whether to return the autocomplete results or not. When autocomplete is enabled, all results will be started with the query string, rather than just the response includes it extractly. Defaults to false.
* language: *Optional.* Specifies what language would like to be returned in the response. If no specified language, take English instead.  The possible values can be any “Language Code” mentioned at ISO 639-1 language code.
* srid: *Optional.* The SRID (coordinate system ID) in which to express the result. Mutually exclusive from the Proj4String parameter.
* proj4String: *Optional.* The Proj4 projection string (coordinate system) in which to express the result. Mutually exclusive from the Srid parameter. Defaults to "+proj=longlat +datum=WGS84 +no_defs".

Visit [GeocodeAddress](https://cloud.thinkgeo.com/help/#/Geocoding/GeocodeAddressV1) and click "Try It Out" to explore this API online.

### Geocode Addresses (Batch Request)

Get locations from multiple addresses.

```html
HTTP POST
https://cloud.thinkgeo.com/api/v1/location/geocode/multi
```

***POST Body (Content-Type: application/json)***

```javascript
  {
    "searchText": "string",Free-form text representing the address or location to be geocoded.
    "locationType": "string",Optional. Specifies what types of locations will be considered a match. Possible values are Address, Street, State, City, County, Postcode, Zipcode. Defaults to all types.
    "fuzzyMatch": bool,Optional. Specifies whether to attempt approximate, as well as exact, matching when performing geocodes. Defaults to false.
    "countries": "string"Optional. Limit the results only within the countries specified here. It can be one or more “ISO Language Name” mentioned ISO 639-1 language code.
    "bbox": "string",Optional. Limits the results to only those contained within the supplied bounding box. The valid format is "minX,minY,maxX,maxY". Defaults to null, as the global.
    "maxResults": int,Optional. The maximum number of possible matches to return, if multiple candidates are found. Defaults to 20.
    "verboseResults": bool,Optional. Indicates whether the results should be verbose or not. When false, the results will have fewer properties. Defaults to false.
    "language": "string",Optional. Specifies what language would like to be returned in the response. If no specified language, take English instead. The possible values can be any “Language Code” mentioned at ISO 639-1 language code.
    "srid": int,Optional. The SRID (coordinate system ID) in which to express the result. Mutually exclusive from the Proj4String parameter.
    "proj4String": "string"Optional. The Proj4 projection string (coordinate system) in which to express the result. Mutually exclusive from the Srid parameter. Defaults to "+proj=longlat +datum=WGS84 +no_defs".
  }
```

Each item in the batch can locally override a parameter specified on the request URL.

***Example Request***

Here is an example geocode batch request containing three items.  For each item, we want verbose results and a maximum of one result, so we can place these options in the request URL so they apply to all items in the batch.  Notice that we can search for place names ("Cedar Point", a theme park in Ohio) as well as addresses.

```html
HTTP POST
https://cloud.thinkgeo.com/api/v1/location/geocode/multi?maxResults=1&verboseResults=true
```

```javascript
  {
    "searchText": "200 Epcot Center Drive, Bay Lake, FL"
  },
  {
    "searchText": "1313 South Harbor Blvd, Anaheim, CA"
  },
  {
    "searchText": "Cedar Point"
  }
```

***URL Parameters***

* locationType: *Optional.* Specifies what types of locations will be considered a match. Possible values are Address, Street, State, City, County, Zipcode. Defaults to Default.
* fuzzyMatch: *Optional.* Specifies whether to attempt approximate, as well as exact, matching when performing geocodes. Defaults to false.
* countries: *Optional.* Limit the results only within the countries specified here. It can be one or more “ISO Language Name” mentioned ISO 639-1 language code.
* bbox: *Optional.* Limits the results to only those contained within the supplied bounding box. The valid format is "minX,minY,maxX,maxY". Defaults to null, as the global.
* maxResults: *Optional.* The maximum number of possible matches to return, if multiple candidates are found. Defaults to 10.
* verboseResults: *Optional.* Indicates whether the results should be verbose or not. When false, the results will have fewer properties. Defaults to false.
* language: *Optional.* Specifies what language would like to be returned in the response. If no specified language, take English instead. The possible values can be any “Language Code” mentioned at ISO 639-1 language code.
* srid: *Optional.* The SRID (coordinate system ID) in which to express the result. Mutually exclusive from the Proj4String parameter.
* proj4String: *Optional.* The Proj4 projection string (coordinate system) in which to express the result. Mutually exclusive from the Srid parameter. Defaults to "+proj=longlat +datum=WGS84 +no_defs".

Visit [GeocodeAddressesBatch](https://cloud.thinkgeo.com/help/#/Geocoding/GeocodeAddressesBatchV1) and click "Try It Out" to explore this API online.

## Consume from Client Side

ThinkGeo Cloud Geocoding does not allow anonymous users to access the API. Before working with these APIs, you will need to register with ThinkGeo Cloud and create your own clients. A new account comes with two clients: **NativeConfidential** and **JavaScript**. See more details at [here](../client-keys.md).

ThinkGeo Cloud provides standard RESTful APIs which can be consumed on any platform through any language. ThinkGeo also offers two prepackaged API clients to make it easier to integrate into .NET and JavaScript applications.

### SDK for .NET

Our .NET SDKThinkGeo Cloud Client makes it easy to consume all of the ThinkGeo Cloud services in your applications. It's available on [NuGet](https://www.nuget.org/packages/ThinkGeo.Cloud.Client)

At the NuGet Package Manager terminal, you can install this package by running the command: `Install-Package ThinkGeo.Cloud.Client -Version VERSION_TO_BE_INSTALLED`.

You can also check out ThinkGeo on GitHub for [samples utilizing the ThinkGeo Cloud Client](https://gitlab.com/thinkgeo/public/thinkgeo-cloud-maps/-/tree/master/samples/wpf).

### SDK for JavaScript

The SDK for JavaScript enables developers to directly access ThinkGeo Cloud services from JavaScript code running in browser. This SDK can be found at [thinkgeocloudclient-js](https://www.npmjs.com/package/thinkgeocloudclient-js).

## Samples

Online Sample:

* [ThinkGeo Cloud Geocoding Online Sample](https://samples.thinkgeo.com/cloud/#FindanAddressintheUS)

Desktop Sample:

* [ThinkGeo Cloud Geocoding Sample for Wpf](https://gitlab.com/thinkgeo/public/thinkgeo-cloud-maps/-/tree/master/samples/wpf/ThinkGeoCloudGeocodingSample) for [ThinkGeo Desktop Maps](https://gitlab.com/thinkgeo/public/thinkgeo-desktop-maps)

Web Sample:

```csharp
Coming soon
```

Mobile Sample:

```csharp
Coming soon
```
