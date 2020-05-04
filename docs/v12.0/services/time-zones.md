
# Time Zones

The ThinkGeo Cloud Time Zones service provides a RESTful API to retrieve time zone and UTC offset information for a given spatial coordinate.  Check out the [online sample](https://cloudclientsamples.thinkgeo.com/) for a quick look.

## RESTful APIs

* **Try it Online**: The ThinkGeo Cloud Time Zones RESTful API can be tested online following the instructions below:
  * Get a ThinkGeo Cloud Client Key. Check out [ThinkGeo Cloud Client Keys Guideline](../client-keys.md) see how to apply one. It's free for 60 days.
  * Visit our [ThinkGeo Cloud API Explorer](https://cloud.thinkgeo.com/help/), click the "Authorize" button at the top and enter your client credentials. You are then free to play with all the APIs online.

***ThinkGeo Cloud Time Zones provides the following Restful APIs***

### Get Time Zone For Point

Returns information about a local time zone for the specified point, including the Olson time zone ID, country code, UTC offset, current local time and more.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/timezones/{pointY},{pointX}
```

***URL Parameters***

* pointY: The Y coordinate of the point.
* pointX: The X coordinate of the point.
* srid: *Optional.* The SRID of the input point's coordinate system. Defaults to 4326.
* proj4String: *Optional.* The Proj4 string of the input point's coordinate system.

Visit [https://cloud.thinkgeo.com/help/#/TimeZone/GetTimeZonesByCoordinateV1](https://cloud.thinkgeo.com/help/#/TimeZone/GetTimeZonesByCoordinateV1) and click "Try It Out" to explore this API online.

***Example Output***

```javascript
{
    "timezone": "Asia/Bangkok",
    "countryName": "Thailand",
    "countryCode": "TH",
    "comment": "",
    "currentLocalTime": "2019-03-31T23:16:26.1379980",
    "currentUtcTime": "2019-03-31T16:16:26.1379980Z",
    "offsetSeconds": 25200
}
```

## Consume from Client Side

ThinkGeo Cloud Time Zones does not allow anonymous users to access the API. Before working with these APIs, you will need to register with ThinkGeo Cloud and create your own clients. A new account come with two clients: **NativeConfidential** and **JavaScript**. See more details at [here](../client-keys.md).

ThinkGeo Cloud provides standard RESTful APIs which can be consumed in any platform through any language. ThinkGeo also offers two prepackaged API clients to make it easier to integrate into .NET and JavaScript applications.

### SDK for .NET

The SDK for .NET enables developers to build .NET applications that use the ThinkGeo Cloud services. The NuGet package can be found at [ThinkGeo.Cloud.Client](https://www.nuget.org/packages/ThinkGeo.Cloud.Client) or you can install this package with PM by running the command: `Install-Package ThinkGeo.Cloud.Client -Version VERSION_TO_BE_INSTALLED`.

### SDK for JavaScript

The SDK for JavaScript enables developers to directly access ThinkGeo Cloud services from JavaScript code running in browser. This SDK can be found at [thinkgeocloudclient-js](https://www.npmjs.com/package/thinkgeocloudclient-js).
