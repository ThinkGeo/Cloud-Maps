# tg.BaseClient

A class provides the basic methods to send request to ThinkGeo Cloud services. Subclasses:  ColorClient, Elevation, GeocodingClient, MapsClient, ProjectionClient, ReverseGeocodingClient.

---

## `on(event, callback)`

Event types:

* `sendingrequest`
* `sentrequest`

```javascript
// For example elevationClient
elevationClient.on("sendingrequest", function (e){
    console.log(e);
});
elevationClient.on("sentrequest", function (e){
    console.log(e);
})
```
