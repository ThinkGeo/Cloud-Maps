
# Maps Query

ThinkGeo Cloud Maps Query provides RESTful APIs to perform spatial query against each types of data.

## RESTful APIs

* ***Try it Online**:All of the ThinkGeo Cloud RESTful APIs can be tested online by following the instructions below:
  * Get a ThinkGeo Cloud Client Key. Check out [ThinkGeo Cloud Client Keys Guideline](../client-keys.md) to see how to acquire and apply one. All ThinkGeo Cloud evaluations are FREE for 60 days.
  * Visit our [ThinkGeo Cloud API Explorer](https://cloud.thinkgeo.com/help/), click the "Authorize" button at the top and enter your client credentials. You are then free to play with all the APIs online.

***ThinkGeo Cloud Maps Query provides the following RESTful APIs***

### Get Features Within

Get the features that are within the target shape.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/maps/query/{queryLayer}/within
```

***URL Parameters***

* queryLayer: The layer to query.
* wkt: The well-known text of the target geometry.
* srid: Optional. The SRID of the input and output feature's coordinate system. Defaults to 4326.
* proj4String: Optional. The Proj4 string of the input and output feature's coordinate system.
* maxResults: Optional. The maximum number of features to return. Defaults to 100.
* returnFeatureAttributes: Optional. Specify whether the feature attribute names and values will be returned in the response. Defaults to true.
* featureAttributesToReturn: Optional. If returnFeatureAttributes is true, this specifies which a specific subset of attributes to be returned. Formatted as a comma-delimited list of attribute names that should be returned with each feature in the response.

Visit [GetFeaturesWithin](https://cloud.thinkgeo.com/help/index.html#/WorldMapsQuery/Get%20Features%20WithinV1) and click "Try It Out" to explore this API online.

### Get Features Containing

Get the features that contain the target shape.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/maps/query/{queryLayer}/containing
```

***URL Parameters***

* queryLayer: The layer to query.
* wkt: The well-known text of the target geometry.
* srid: Optional. The SRID of the input and output feature's coordinate system. Defaults to 4326.
* proj4String: Optional. The Proj4 string of the input and output feature's coordinate system.
* maxResults: Optional. The maximum number of features to return. Defaults to 100.
* returnFeatureAttributes: Optional. Specify whether the feature attribute names and values will be returned in the response. Defaults to true.
* featureAttributesToReturn: Optional. If returnFeatureAttributes is true, this specifies which a specific subset of attributes to be returned. Formatted as a comma-delimited list of attribute names that should be returned with each feature in the response.

Visit [GetFeaturesContaining](https://cloud.thinkgeo.com/help/index.html#/WorldMapsQuery/Get%20Features%20ContainingV1) and click "Try It Out" to explore this API online.

### Get Features Intersecting

Get the features that intersect the target shape.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/maps/query/{queryLayer}/intersecting
```

***URL Parameters***

* queryLayer: The layer to query.
* wkt: The well-known text of the target geometry.
* srid: Optional. The SRID of the input and output feature's coordinate system. Defaults to 4326.
* proj4String: Optional. The Proj4 string of the input and output feature's coordinate system.
* maxResults: Optional. The maximum number of features to return. Defaults to 100.
* returnFeatureAttributes: Optional. Specify whether the feature attribute names and values will be returned in the response. Defaults to true.
* featureAttributesToReturn: Optional. If returnFeatureAttributes is true, this specifies which a specific subset of attributes to be returned. Formatted as a comma-delimited list of attribute names that should be returned with each feature in the response.

Visit [GetFeaturesIntersecting](https://cloud.thinkgeo.com/help/index.html#/WorldMapsQuery/Get%20Features%20IntersectingV1) and click "Try It Out" to explore this API online.

### Get Features Overlapping

Get the features that overlap the target shape.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/maps/query/{queryLayer}/overlapping
```

***URL Parameters***

* queryLayer: The layer to query.
* wkt: The well-known text of the target geometry.
* srid: Optional. The SRID of the input and output feature's coordinate system. Defaults to 4326.
* proj4String: Optional. The Proj4 string of the input and output feature's coordinate system.
* maxResults: Optional. The maximum number of features to return. Defaults to 100.
* returnFeatureAttributes: Optional. Specify whether the feature attribute names and values will be returned in the response. Defaults to true.
* featureAttributesToReturn: Optional. If returnFeatureAttributes is true, this specifies which a specific subset of attributes to be returned. Formatted as a comma-delimited list of attribute names that should be returned with each feature in the response.

Visit [GetFeaturesOverlapping](https://cloud.thinkgeo.com/help/index.html#/WorldMapsQuery/Get%20Features%20OverlappingV1) and click "Try It Out" to explore this API online.

### Get Features Touching

Get the features that touch the target shape.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/maps/query/{queryLayer}/touching
```

***URL Parameters***

* queryLayer: The layer to query.
* wkt: The well-known text of the target geometry.
* srid: Optional. The SRID of the input and output feature's coordinate system. Defaults to 4326.
* proj4String: Optional. The Proj4 string of the input and output feature's coordinate system.
* maxResults: Optional. The maximum number of features to return. Defaults to 100.
* returnFeatureAttributes: Optional. Specify whether the feature attribute names and values will be returned in the response. Defaults to true.
* featureAttributesToReturn: Optional. If returnFeatureAttributes is true, this specifies which a specific subset of attributes to be returned. Formatted as a comma-delimited list of attribute names that should be returned with each feature in the response.

Visit [GetFeaturesTouching](https://cloud.thinkgeo.com/help/index.html#/WorldMapsQuery/Get%20Features%20TouchingV1) and click "Try It Out" to explore this API online.

### Get Features Nearest

Get the features that are nearest the target shape.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/maps/query/{queryLayer}/nearest
```

***URL Parameters***

* queryLayer: The layer to query.
* wkt: The well-known text of the target geometry.
* srid: Optional. The SRID of the input and output feature's coordinate system. Defaults to 4326.
* proj4String: Optional. The Proj4 string of the input and output feature's coordinate system.
* searchRadius: Optional. The radius of the search area around the target geometry. If not specified, it's assumed that there is no limit.
* searchRadiusUnit: Optional. The unit of measure in which the searchRadius is expressed. Defaults to Meter.
* maxResults: Optional. The maximum number of features to return. Defaults to 100.
* returnFeatureAttributes: Optional. Specify whether the feature attribute names and values will be returned in the response. Defaults to true.
* featureAttributesToReturn: Optional. If `returnFeatureAttributes` is true, this specifies which a specific subset of attributes to be returned. Formatted as a comma-delimited list of attribute names that should be returned with each feature in the response.

Visit [GetFeaturesNearest](https://cloud.thinkgeo.com/help/index.html#/WorldMapsQuery/Get%20Features%20NearestV1) and click "Try It Out" to explore this API online.

### Get Features Within Distance

Get the features that are within a certain distance of the target shape.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/maps/query/{queryLayer}/within-distance
```

***URL Parameters***

* queryLayer: The layer to query.
* wkt: The well-known text of the target geometry.
* srid: Optional. The SRID of the input and output feature's coordinate system. Defaults to 4326.
* proj4String: Optional. The Proj4 string of the input and output feature's coordinate system.
* distance: Optional. The distance within which to find features. Defaults to 200.
* distanceUnit: Optional. The unit of measure in which the `distance` is expressed. Defaults to Meter.
* maxResults: Optional. The maximum number of features to return. Defaults to 100.
* returnFeatureAttributes: Optional. Specify whether the feature attribute names and values will be returned in the response. Defaults to true.
* featureAttributesToReturn: Optional. If `returnFeatureAttributes` is true, this specifies which a specific subset of attributes to be returned. Formatted as a comma-delimited list of attribute names that should be returned with each feature in the response.

Visit [GetFeaturesWithinDistance](https://cloud.thinkgeo.com/help/index.html#/WorldMapsQuery/Get%20Features%20Within%20DistanceV1) and click "Try It Out" to explore this API online.

### Get Features Custom

Perform a custom spatial query, using the specified query layer, spatial relationship type, and query feature.

```html
HTTP POST
https://cloud.thinkgeo.com/api/v1/maps/query/custom
```

***POST Body (Content-Type: application/json)***

```javascript
{
  "queryLayer": "string",The layer to query.
  "queryType": "string",The type of query to perform. Value can be one of: "Within", "Containing", "Intersecting", "Overlapping", "Touching", "Nearest", "Within-Distance".
  "wkt": "string",The well-known text of the target geometry.
  "srid": int,Optional. The SRID of the input and output feature's coordinate system. Defaults to 4326.
  "proj4String": "string",Optional. The Proj4 string of the input and output feature's coordinate system.
  "distance": double,Optional. The distance within which to find features. Defaults to 200.
  "distanceUnit": "string",Optional. The unit of measure in which the distance is expressed. Defaults to Meter.
  "searchRadius": double,Optional. The radius of the search area around the target geometry. If not specified, it's assumed that there is no limit.
  "searchRadiusUnit": "string",Optional. The unit of measure in which the searchRadius is expressed. Defaults to Meter.
  "maxResults": int,Optional. The maximum number of features to return. Defaults to 100.
  "returnFeatureAttributes": bool,Optional. Specify whether the feature attribute names and values will be returned in the response. Defaults to true.
  "featureAttributesToReturn": [
    "string"
  ]Optional. If returnFeatureAttributes is true, this specifies which a specific subset of attributes to be returned. Formatted as a comma-delimited list of attribute names that should be returned with each feature in the response.
}
```

Visit [GetFeaturesCustom](https://cloud.thinkgeo.com/help/index.html#/WorldMapsQuery/Get%20Features%20CustomV1) and click "Try It Out" to explore this API online.

### Get Query Layers

List the available query layers.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/maps/query/layers
```

Visit [GetQueryLayers](https://cloud.thinkgeo.com/help/index.html#/WorldMapsQuery/Get%20World%20Maps%20Query%20LayersV1) and click "Try It Out" to explore this API online.

### Get Attributes of Layer

List the feature attributes available on the given query layer.

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/maps/query/{queryLayer}/attributes
```

***URL Parameters***

* queryLayer: The query layer.

Visit [GetAttributesOfLayer](https://cloud.thinkgeo.com/help/index.html#/WorldMapsQuery/Get%20World%20Maps%20Query%20Attributes%20Of%20LayerV1) and click "Try It Out" to explore this API online.

## Consume From Client Side SDKs

```csharp
Coming soon
```

## Samples

Online Sample:

* [ThinkGeo Cloud Spatial Queries Sample](https://samples.thinkgeo.com/cloud/#PerformSpatialQueries)

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
