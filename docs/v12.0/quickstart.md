# Quickstart

ThinkGeo Cloud is a set of cloud-hosted RESTful APIs that have been designed to optimize your productivity in the world of mapping by taking away the complicated deployments, data warehousing and IT concerns that you would normally encounter. It can be consumed from web applications, desktop applications, mobile apps or services on a wide variety of platforms.

## Getting Started

ThinkGeo Cloud is easy to get started for anyone including those without too much coding background. Just log into the Cloud web console, grab your API key and get to work!  We've put together a video that will give you a high-level overview of how to get started:

<!--
YouTube video for "Getting Started with ThinkGeo Cloud"
Link: https://youtu.be/vM9OGfeiVv4
-->
<iframe width="560" height="315" src="https://www.youtube.com/embed/vM9OGfeiVv4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### ThinkGeo Cloud Console

Log into [ThinkGeo Cloud Console](https://cloud.thinkgeo.com) with existing ThinkGeo account or sign up a new one. Not just for creating client keys, you can also check out recent activities, API references, and online samples.

### Get a Client Key

A client key (can either be an APIKey, or ClientId and ClientSecret combination) is needed to consume the Cloud services. Two test client keys are pre-generated for each account and you can also create as many new keys as you want. Check out [ThinkGeo Cloud Client Keys Guideline](client-keys.md) to see how to get the keys.

### Consume the Online Services

Now with the key, you can hit the ThinkGeo Cloud RESTful APIs in any platform through any language. Check out [ThinkGeo Cloud RESTful APIs](https://cloud.thinkgeo.com/help/) and find out what APIs are available. By authorizing with a key (check it out [here](client-keys.md#Explore-ThinkGeo-Cloud-Maps-REST-APIs) for how to do it), you can also try out those APIs online.

Furthermore, [ThinkGeo Cloud .NET SDK](dotNet-sdk.md) and [ThinkGeo Cloud JavaScript SDK](javascript-sdk.md)  are provided to make it easier for using the ThinkGeo Cloud RESTful APIs in a .NET/JavaScript application.

## Services

ThinkGeo Cloud includes the following Services. More Services are on the way.  A complete API list can be found here: [ThinkGeo Cloud APIs](https://cloud.thinkgeo.com/help/)

|Service|Description|
|-------|-----------|
| [Maps Vector Tiles](services/vector-map-tiles.md) | Consume XYZ vector map tiles |
| [Maps Raster Tiles](services/raster-map-tiles.md) | Consume XYZ raster map tiles |
| [Maps WMS](services/wms-maps.md) | WMS service |
| [Elevation](services/elevation.md) | Get elevation information of specified geometries |
| [Geocoding](services/geocoding.md) | Get the location from a US address |
| [Reverse Geocoding](services/reverse-geocoding.md) | Get the real world information of specified geometries |
| [Routing](services/routing.md) | Turn-by-turn directions, service area calculation and more. |
| [Maps Query](services/map-query.md) | Perform spatial query against each types of data. |
| [Projection](services/projection.md) | Project the specified geometries |
| [Colors](services/colors.md) | Get related colors of specified color |
| [Time Zones](services/time-zones.md) | Get time zone information about a specified point |
|  |  |

## Try the APIs Online

* Check out [ThinkGeo Cloud Client Keys Guideline](client-keys.md) and get a key for free for 60 days.

* Authorize with the key at the top of [ThinkGeo Cloud APIs](https://cloud.thinkgeo.com/help/) and you are then free to play with all the APIs online. Visit [here](client-keys.md) for more information.

## Create your own service

* ThinkGeo Cloud On-Premise is available to help you easily set up the ThinkGeo Cloud with all the above services on your own server.

## Client SDK

ThinkGeo offers two prepackaged API clients for developers who want to use the ThinkGeo Cloud APIs in their applications.  Currently the following API clients are available:

ThinkGeo Cloud .NET SDK

[.NET SDK](dotNet-sdk.md)

ThinkGeo Cloud JavaScript SDK

[JavaScript SDK](javascript-sdk.md)

## Samples

You can find code samples in the GitLab repository below.

 [GitLab Samples Source](https://gitlab.com/thinkgeo/public/thinkgeo-cloud-maps/-/tree/master/samples)

We also have samples running online at the link below.

 [Online Samples](https://samples.thinkgeo.com/cloud)

It includes pure client-side sample consuming ThinkGeo Cloud.

## Change Logs

* [Features & Bug Fixes Change Log](changelog.md) This changelog details the new features and bug fixes applied to the product for each major release cycle.
