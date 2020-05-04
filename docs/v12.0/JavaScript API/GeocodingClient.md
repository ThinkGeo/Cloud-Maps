# tg.GeocodingClient

 A class provides the methods to access the GeocodingClient APIs. Geocode to get the coordinates of an address.

Syntax

```javascript
var geocodingClient = new tg.GeocodingClient ('Your-Cloud-Service-Api-Key');
```

Parameters

|Name|Type|Description|
|---|---|---|
|apiKey   |string  | An API key for access to ThinkGeo Cloud services, it can be created following the  [guide](../client-keys.md)  |

**Return Value** - a Geocoding object to access the Geocoding APIs in ThinkGeo Cloud service.

---

## `search(options, callback)`

Search for a location expression.

Syntax

```javascript
  var options = {
       location: "Dallas",
       maxResults: 5,
  };
  var callback = function (status, response) {
      console.log(response);
  };
  geocodingClient.search(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |location   |array |  |The location expression.  |
|         |body   |string  |  |A list of addresses to be geocoded.  |
|         |locationType   |string  |  |Specifies what types of locations will be considered a match. Possible values are Address, Street, State, City, County, Zipcode, Country.  |
|         |fuzzyMatch   |boolean  |false  |Specifies whether to attempt approximate, as well as exact, matching when performing geocodes. Defaults to false.  |
|         |maxResults  |integer  |10   |The maximum number of possible matches to return, if multiple candidates are found. Defaults to 10.  |
|         |verboseResults   |boolean  |false  |Indicates whether the results should be verbose or not. When false, the results will have fewer properties. Defaults to false.  |
|         |srid   |integer  |  |The SRID (coordinate system ID) in which to express the result. Mutually exclusive from the Proj4String parameter.  |
|         |proj4String   |string  |"+proj=longlat +datum=WGS84 +no_defs"  |The Proj4 projection string (coordinate system) in which to express the result. Mutually exclusive from the Srid parameter. Defaults to “+proj=longlat +datum=WGS84 +no_defs”.  |
|callback   |function  |  |  |the callback for response  |

---

## `searchByPoint(location, callback, options)`

Search for a location expression.

Syntax

```javascript
  var options = {
       maxResults: 5,
  };
  var callback = function (status, response) {
      console.log(response);
  };
  geocodingClient.searchByPoint("Dallas", callback, options);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|location   |string  |  |  |The location expression.    |
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |locationType   |string  |  |Specifies what types of locations will be considered a match. Possible values are Address, Street, State, City, County, Zipcode, Country.  |
|         |fuzzyMatch   |boolean  |false  |Specifies whether to attempt approximate, as well as exact, matching when performing geocodes. Defaults to false.  |
|         |maxResults   |integer  |10   |The maximum number of possible matches to return, if multiple candidates are found. Defaults to 10.  |
|         |verboseResults   |boolean  |false  |Indicates whether the results should be verbose or not. When false, the results will have fewer properties. Defaults to false.  |
|         |srid   |integer  |  |The SRID (coordinate system ID) in which to express the result. Mutually exclusive from the Proj4String parameter.  |
|         |proj4String   |string  |"+proj=longlat +datum=WGS84 +no_defs"  |The Proj4 projection string (coordinate system) in which to express the result. Mutually exclusive from the Srid parameter. Defaults to “+proj=longlat +datum=WGS84 +no_defs”.  |
|callback   |function  |  |  |the callback for response  |

---

## `searchBatch(options, callback)`

Search for a location expression

Syntax

```javascript
  var options = {
       body:[
           {
              searchText:"Dallas",
              maxResults:5
           },
           {
              searchText:"Frisco"
           }
       ]
       maxResults: 6,
  };
  var callback = function (status, response) {
      console.log(response);
  };
  geocodingClient.searchBatch(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |body   |string  |  |A list of addresses to be geocoded.  |
|         |locationType   |string  |  |Specifies what types of locations will be considered a match. Possible values are Address, Street, State, City, County, Zipcode, Country.  |
|         |fuzzyMatch   |boolean  |false  |Specifies whether to attempt approximate, as well as exact, matching when performing geocodes. Defaults to false.  |
|         |maxResults   |integer  |10   |The maximum number of possible matches to return, if multiple candidates are found. Defaults to 10.  |
|         |verboseResults   |boolean  |false  |Indicates whether the results should be verbose or not. When false, the results will have fewer properties. Defaults to false.  |
|         |srid   |integer  |  |The SRID (coordinate system ID) in which to express the result. Mutually exclusive from the Proj4String parameter.  |
|         |proj4String   |string  |"+proj=longlat +datum=WGS84 +no_defs"  |The Proj4 projection string (coordinate system) in which to express the result. Mutually exclusive from the Srid parameter. Defaults to “+proj=longlat +datum=WGS84 +no_defs”.  |
|callback   |function  |  |  |the callback for response  |
