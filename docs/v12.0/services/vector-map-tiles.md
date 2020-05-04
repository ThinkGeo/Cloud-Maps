
# Vector Tiles

ThinkGeo Cloud Maps Vector Tiles serve vector map tiles through XYZ. Check out [ThinkGeo Cloud Vector Map Online Sample](https://samples.thinkgeo.com/cloud/#VectorMaps) for a quick look.

## RESTful APIs

* ***Try it Online**:All the ThinkGeo Cloud RESTful APIs can be tested online following the instructions below:
  * Get a ThinkGeo Cloud Client Key. Check out [ThinkGeo Cloud Client Keys Guideline](../client-keys.md) see how to apply one. It's free for 60 days.
  * Visit our [ThinkGeo Cloud API Explorer](https://cloud.thinkgeo.com/help/), click the "Authorize" button at the top and enter your client credentials. You are then free to play with all the APIs online.

***ThinkGeo Cloud provides a RESTful API to consume the map tiles***

### Get Maps Vector Tile By XYZ

Get the vector tile at the specified zoom level and X/Y coordinate, using the supplied parameters.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/maps/vector/{srid}/{tileZ}/{tileX}/{tileY}.pbf?apikey={key}
```

* srid: The spatial reference system ID for the tile you are requesting.  Currently only "3857" (Spherical Mercator) is supported.
* tileZ: The Z index (zoom level) of the requesting tile, from 0 to 19. Zoom Level 0 is the highest zoom level with the entire world in one single tile.  Each zoom level *z* has 4*z* tiles for the entire world. The greater the z value, the closer to the Earth's surface the current zoom level is.
* tileX: The X index (column index in the tiling matrix) of the requesting tile. Valid range is between 0 and 4*z* for each given zoom level *z*.
* tileY: The Y index (row index in the tiling matrix) of the requesting tile. Valid range is between 0 and 4*z* for each given zoom level *z*.
* apikey: The ThinkGeo Cloud API key that authenticates your request.

Here is an example of a vector tile request URL: [https://cloud.thinkgeo.com/api/v1/maps/vector/streets/3857/0/0/0.pbf?apiKey=apiKey](https://cloud.thinkgeo.com/api/v1/maps/vector/streets/3857/0/0/0.pbf?apiKey=apiKey) (a valid API key is required). Please check out [Client Keys Guideline](../client-keys.md) to find out how to get your own API key.

## Why Vector Tiles

Vector tiles allows for more efficient downloads and more rapid map updates than pre-rendered raster tiles. When changes are made to the OSM base layer, rather than waiting for an image tile to be redrawn, only the coordinates and drawing instructions for that particular building or road need to be updated. Depending on the URL syntax, vector tiles can return all of the OSM data, or just individual layers, or combinations of layers, including water, earth, land-use, roads, buildings and other points of interest.

## Map Data Coverage

Map Suite Vector Tile Data sources from OpenStreetMap and Natural Earth are both open data sets. The data is updated twice a month on ThinkGeo servers keeping up with the latest data available. Generally speaking, Natural Earth is used at lower zoom levels, and OpenStreetMap is serving for higher zoom levels.

* **OpenStreetMap**[Open Street Map](https://www.openstreetmap.org) is built by a community of mappers that contribute and maintain data pertaining to roads, trails, cafés, railway stations, and much more, all over the world. OpenStreetMap's community is diverse, passionate, and growing every day. It's open data ao you are free to use it for any purpose as long as you credit OpenStreetMap and its contributors.

* **Natural Earth**[Natural Earth](http://www.naturalearthdata.com/) is a public domain map dataset available at 1:10 million (1 cm = 100 km), 1:50 million, and 1:110 million [map scales](https://en.wikipedia.org/wiki/Map_scale). Featuring closely integrated vector and raster data, with Natural Earth one can make a variety of maps with all commonly used cartography and GIS software. Natural Earth is designed to meet the needs of experienced cartographers using a variety of software applications.

Natural Earth was built through a collaboration of many volunteers and is supported by the [North American Cartographic Information Society](https://en.wikipedia.org/wiki/North_American_Cartographic_Information_Society)(NACIS). It is free for public use in any type of project.

## Vector Tile Schema

The Vector Tile data is organized into different thematic layers, each of which has attributes and values, for example: roads, buildings, POIs, water etc. A selection of these layers are typically used for base map rendering with a map style specified in Map Suite StyleJSON Schema.

***Definition of layers***

* [Marine_name](Marine_name)
* [Water](Water)
* [Water_name](Water_name)
* [Waterway](Waterway)
* [Landcover](Landcover)
* [Country](Country)
* [Admin_boundary](Admin_boundary)
* [Admin_name](Admin_name)
* [Place](Place)
* [Aeroway](Aeroway)
* [Building](Building)
* [POI](POI)
* [Road](Road)
* [Road_name](Road_name)
* [Railway](Railway)
* [Housenumber](Housenumber)
* [Urban](Urban)
* [Building_name](Building_name)

Schema [updates change log](../changelog.md) .

## Consume from the Client

Multiple ways are provided to consume the server from different platforms.

### From JavaScript Library

Load [VectorMap-js](https://www.npmjs.com/package/thinkgeocloudclient-js) from CDN in your project:

```javascript
    <link rel="stylesheet" href="https://cdn.thinkgeo.com/vectormap-js/3.0.0/vectormap.css"></link>
    <script src="https://cdn.thinkgeo.com/vectormap-js/3.0.0/vectormap.js"></script>
```

 In the `<body>` of your HTML page, add a div with "id="map""

```html
<body>
    <div id="map"></div>
</body>
```

Create the map object and load with the "DIV" created before.

```javascript
    var worldstreetsStyle = "https://cdn.thinkgeo.com/worldstreets-styles/3.0.0/light.json";
    var worldstreets = new ol.mapsuite.VectorTileLayer(worldstreetsStyle,
        {
            apiKey:'your-ThinkGeo-Cloud-Service-key'
        });
    let map =  new ol.Map({
        layers: [worldstreets],
        target: 'map',
        renderer: 'webgl',
        view: new ol.View({
            center: [-10775718.490585351, 3868389.0226015863],
            zoom: 4,
            maxResolution: 40075016.68557849 / 512
        }),
    });
```

**NOTE:**

* **ThinkGeo Cloud Service key** Access to ThinkGeo Cloud services, including Vector Tile data, requires an API Key that connects API requests to your account, Please check [here](https://thinkgeo.gitbooks.io/map-suite-vector-map-js/content/sign-up-thinkgeo-account.html) on how to create your own ThinkGeo Cloud Service key **FOR FREE**.

* **World Streets Styles** World Streets Style is a syntax of map styling language, similar to CSS. It defines the styles of your vector data. Map Suite World Streets Styles are professionally designed map styles from our ThinkGeo experts. You can use it in your application without any changes, if you are consuming the Vector Tile data from ThinkGeo Cloud Service.

### From Client Side SDKs

Our .NET SDKThinkGeo Cloud Client makes it easy to consume all of the ThinkGeo Cloud services in your applications. It's available on [NuGet](https://www.nuget.org/packages/ThinkGeo.Cloud.Client).

At the NuGet Package Manager terminal, you can install this package by running the command: `Install-Package ThinkGeo.Cloud.Client -Version VERSION_TO_BE_INSTALLED`.

You can also check out ThinkGeo on GitHub for [samples utilizing the ThinkGeo Cloud Client](https://github.com/ThinkGeo?utf8=%E2%9C%93&q=cloud&type=&language=).

Sample Code:

```csharp
using ThinkGeo.Cloud;

MapsClient client = new MapsClient("Your Client ID", "Your Client Secret");
Stream imageStream = client.GetRasterTile(z, x, y, projection);
```

The API is for downloading the vector tiles. Additional coding is needed to parse or render it.

Native SDKs for Python, iOS and Android are coming soon.

## Samples

Online Sample:

* [ThinkGeo Cloud Vector Tile Online Sample](https://samples.thinkgeo.com/cloud/#VectorMaps)

Desktop Sample:

* [ThinkGeoCloudVectorMapsSample-WPF](https://gitlab.com/thinkgeo/public/thinkgeo-cloud-maps/-/tree/master/samples/wpf/ThinkGeoCloudVectorMapsSample) for [ThinkGeo Desktop Maps](https://gitlab.com/thinkgeo/public/thinkgeo-desktop-maps)
