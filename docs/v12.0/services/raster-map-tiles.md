
# Raster Tiles

ThinkGeo Cloud Raster Tile serves raster map tiles through XYZ. Check out [ThinkGeo Cloud Raster Map Online Sample](https://samples.thinkgeo.com/thinkgeo-cloud/maps/xyz/) for a quick look.

## RESTful APIs

* ***Try it Online**:All the ThinkGeo Cloud RESTful APIs can be tested online following the instructions below:
  * Get a ThinkGeo Cloud Client Key. Check out [ThinkGeo Cloud Client Keys Guideline](../client-keys.md) see how to apply one. It's free for 60 days.
  * Visit our [ThinkGeo Cloud API Explorer](https://cloud.thinkgeo.com/help/), click the "Authorize" button at the top and enter your client credentials. You are then free to play with all the APIs online.

***ThinkGeo Cloud provides a RESTful API to consume the map tiles***

### Get Maps Raster Tile By XYZ

Get the raster tile at the specified zoom level and X/Y coordinate, using the supplied parameters.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/maps/raster/{style}/x{resolution}/{srid}/{tileSize}/{tileZ}/{tileX}/{tileY}.{fileExtension}?apikey={key}
***URL Parameters***
  * style: The style of the raster tile. Available values are:
     * light - street map, light theme
     * dark - street map, dark theme
     * aerial - aerial imagery
     * hybrid - aerial imagery with street map overlaid on top
     * transparent-background - street map with transparent background
  * resolution: The resolution of the raster tile. "x1" is available for all sizes, while "x2" is supported in certain scenarios.  "x1" is intended for display on a regular 72-96 DPI laptop or desktop monitor, while "x2" is for high-DPI displays such as mobile phones and tablets.  When you request an "x2" tile, the server will double the size of the image while rendering the same geographic area.  So if you request an "x2" tile at size 512, the server will return you a 1024x1024 image.
  * srid: The spatial reference system ID for the raster tile.  Currently only "3857" (Spherical Mercator) is supported.
  * tileSize: The pixel size of the raster tile. "512" is recommended. "256" is also supported.
  * tileZ: The Z index (zoom level) of the requesting tile, from 0 to 19. Zoom Level 0 is the highest zoom level with the entire world in one single tile.  Each zoom level *z* has 4*z* tiles for the entire world. The greater the z value, the closer to the Earth's surface the current zoom level is.
  * tileX: The X index (column index in the tiling matrix) of the requesting tile. Valid range is between 0 and 4*z* for each given zoom level *z*.
  * tileY: The Y index (row index in the tiling matrix) of the requesting tile. Valid range is between 0 and 4*z* for each given zoom level *z*.
  * fileExtension: The image format of the raster tile.  Different formats are available depending on the tile style you have requested, as follows:
     * png - supported for *light*, *dark*, and *transparent-background* style tiles.
     * jpeg or jpg - supported for *aerial* and *hybrid* style tiles.
  * apikey: The ThinkGeo Cloud API key that authenticates your request.
```

Here is an example of a raster tile request URL: [https://cloud.thinkgeo.com/api/v1/maps/raster/light/x1/3857/512/0/0/0.png](https://cloud.thinkgeo.com/api/v1/maps/raster/light/x1/3857/512/0/0/0.png).  When no API key is specified, the tile will be watermarked with a ThinkGeo logo.  To remove the watermark, a valid ThinkGeo Cloud API key is required. Please check out [Client Keys Guideline](../client-keys.md) to find out how to get your own API key.

Visit [GetMapsRasterTileByXyz](https://cloud.thinkgeo.com/help/#/MapsRasterTiles/GetMapsRasterTileByXyzV1) and click "Try It Out" to explore this API online.

## Map Data Coverage

Map Suite Raster Tile Data is composed of street tiles and aerial images tiles.

* **Street Tiles** The data of streets tiles (light / dark / transparent-background) mainly come from [Open Street Map](https://www.openstreetmap.org), and partially from [Natural Earth](https:/www.naturalearthdata.com/). The tiles cover the entire world. The tiles are scheduled to be updated on a monthly basis.
* **Aerial Image Tiles**
  * The data for zoom level 0 ~ 11 comes from [LandSat](https://www.usgs.gov/land-resources/nlilandsat), it covers the entire world.
  * The data for zoom level 12 ~ 19 comes from [NAIP](https://www.fsa.usda.govprograms-and-services/aerial-photography/imagery-programs/naip-imagery/index) 2018. It covers the contiguous US (48 states). The tiles are scheduled to be updated every 2 years.

## Consume from Client Side

Multiple ways are provided to consume the server from different platforms.

### From JavaScript Library

[OpenLayers](https://openlayers.org/) and [Leaflet](https://leafletjs.com/) have built-in classes consuming the tiles through XYZ. Here is the code snippet in OpenLayers.

```javascript
var lightLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
 urls: [
   "https://cloud.thinkgeo.com/api/v1/maps/raster/light/x1/3857/512/{z}/{x}/{y}.png?apikey=yourkey",
 ],
 tileSize: 512
  }),
  name: "lightLayerKey"
});
```

The sample code in LeafLet:

```javascript
var lightLayer = L.tileLayer("https://cloud.thinkgeo.com/api/v1/maps/raster/light/x1/3857/512/{z}/{x}/{y}.png?apikey=yourkey");
```

Here is an [Online Sample](https://samples.thinkgeo.com/thinkgeo-cloud/maps/xyz/) consuming the map tiles using OpenLayers.

### From Map Suite UI Controls

All of the MapSuite UI Controls have built-in a straightforward way for consuming the raster tiles.

Sample Code:

```csharp
using ThinkGeo.Cloud;

/// Setup the overlay
var thinkGeoMapsOverlay = new ThinkGeoCloudRasterMapsOverlay("Your Client ID", "Your Client Secret");
Map.Overlays.Add(thinkGeoMapsOverlay);
```

### Consume From Client Side SDKs

Our .NET SDK ThinkGeo Cloud Client makes it easy to consume all of the ThinkGeo Cloud services in your applications. It's available on [NuGet](https://www.nuget.org/packages/ThinkGeo.Cloud.Client).

At the NuGet Package Manager terminal, you can install this package by running the command: `Install-Package ThinkGeo.Cloud.Client -Version VERSION_TO_BE_INSTALLED`.

Sample Code:

```csharp
using ThinkGeo.Cloud;

MapsClient client = new MapsClient("Your Client ID", "Your Client Secret");
Stream imageStream = client.GetRasterTile(z, x, y, projection, mapType, tileSize, tileResolution);
```

Native SDKs for Python, iOS and Android are coming soon.

## Samples

Online Sample:

* [ThinkGeo Cloud Raster Map Online Sample](https://samples.thinkgeo.com/thinkgeo-cloud/maps/xyz/)

Desktop Sample:

* [ThinkGeoCloudMapsSample-WPF](https://gitlab.com/thinkgeo/public/thinkgeo-cloud-maps/-/tree/master/samples/wpf/ThinkGeoCloudMapsSample) for [ThinkGeo Desktop Maps](https://gitlab.com/thinkgeo/public/thinkgeo-desktop-maps)
