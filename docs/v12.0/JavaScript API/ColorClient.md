# tg.ColorClient

A class provides the methods to access the ColorUtilities APIs. Generates an diversified family of colors by an input color or a random base color.

Syntax

```javascript
var colorClient = new tg.ColorClient('Your-Cloud-Service-Api-Key');
```

Parameters

|Name|Type|Description|
|---|---|---|
|apiKey  |string  | An API key for access to ThinkGeo Cloud services, it can be created following the  [guide](../client-keys.md)  |

**Return Value** - A color object to access the ColorUtilities APIs in ThinkGeo Cloud service.

---

## `getColorsInAnalogousFamily(options, callback)`

Get a family of colors based on three analogous hues.

Syntax

```javascript
  var options = {
      numberOfColors: 25
  };
  var callback = function (status, response) {
      console.log(response);
  };
  colorClient.getColorsInAnalogousFamily(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options  |Options  |  |             |
|         |Name|Type|Default|Description|
|         |---|---|---|---|
|         |numberOfColors   |integer  |  |A number of output colors desired. The value must be between 3 and 54.  |
|         |color   |string  |  |A base color. Two analogous hues will be found for you. If null, use random color.  |
|         |outFormat   |string  |Hex  |The format in which you want the output colors. Supported formats: Hex, RGB, HSL.  |
|         |inFormat   |string  |Hex/RGB  |The format of the input Color. Supported formats: Hex, RGB, HSL. If not specified, we will try to parse the inputColor as Hex first, then RGB.  |
|callback   |function  |  |  |the callback for response  |

---

## `getColorsInComplementaryFamily(options, callback)`

Get a family of colors based on two complementary hues.

 Syntax

```javascript
  var options = {
      numberOfColors: 25
  };
  var callback = function (status, response) {
      console.log(response);
  };
  colorClient.getColorsInComplementaryFamily(options, callback);
```

 Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |numberOfColors   |integer  |  |The total number of colors you want to be returned. The value must be between 2 and 36.  |
|         |color   |string  |  |A base color. A complementary hue will be found for you.  |
|         |outFormat   |string  |Hex  |The format in which you want the output colors. Supported formats: Hex, RGB, HSL.  |
|         |inFormat   |string  |Hex/RGB  |The format of the input Color. Supported formats: Hex, RGB, HSL. If not specified, we will try to parse the input Color as Hex first, then RGB.  |
|callback  |function  |  |  |the callback for response  |

---

## `getColorsInContrastingFamily(options, callback)`

Get a family of colors based on two contrasting hues.

Syntax

```javascript
  var options = {
      numberOfColors: 25
  };
  var callback = function (status, response) {
      console.log(response);
  };
  colorClient.getColorsInContrastingFamily(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |numberOfColors   |integer  |  |The total number of colors you want to be returned. The value must be between 2 and 36.  |
|         |color   |string  |  |A base color. A contrasting hue will be found for you.  |
|         |outFormat   |string  |Hex  |The format in which you want the output colors. Supported formats: Hex, RGB, HSL.  |
|         |inFormat   |string  |Hex/RGB  |The format of the input Color. Supported formats: Hex, RGB, HSL. If not specified, we will try to parse the input Color as Hex first, then RGB.  |
|callback   |function  |  |  |the callback for response  |

---

## `getColorsInHueFamily(options, callback)`

Get a family of colors with the same hue and sequential variances in lightness and saturation.

Syntax

```javascript
  var options = {
      numberOfColors: 25
  };
  var callback = function (status, response) {
      console.log(response);
  };
  colorClient.getColorsInHueFamily(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |numberOfColors   |integer  |  |The total number of colors you want to be returned. The value must be between 1 and 255.  |
|         |color   |string  |  |A base color. A contrasting hue will be found for you.  |
|         |outFormat   |string  |Hex  |The format in which you want the output colors. Supported formats: Hex, RGB, HSL.  |
|         |inFormat   |string  |Hex/RGB  |The format of the input Color. Supported formats: Hex, RGB, HSL. If not specified, we will try to parse the input Color as Hex first, then RGB.  |
|callback   |function  |  |  |the callback for response  |

---

## `getColorsInQualityFamily(options, callback)`

Get a family of colors with qualitative variances in hue, but similar lightness and saturation.

Syntax

```javascript
  var options = {
      numberOfColors: 25
  };
  var callback = function (status, response) {
      console.log(response);
  };
  colorClient.getColorsInQualityFamily(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |numberOfColors   |integer  |  |The total number of colors you want to be returned. The value must be between 1 and 255.  |
|         |color   |string  |  |The color on which you want to base the color collection.  |
|         |outFormat   |string  |Hex  |The format in which you want the output colors. Supported formats: Hex, RGB, HSL.  |
|         |inFormat   |string  |Hex/RGB  |The format of the input Color. Supported formats: Hex, RGB, HSL. If not specified, we will try to parse the input Color as Hex first, then RGB.  |
|callback   |function  |  |  |the callback for response  |

---

## `getColorsInTetradFamily(options, callback)`

Get a family of colors based on a harmonious tetrad of hues.

Syntax

```javascript
  var options = {
      numberOfColors: 25
  };
  var callback = function (status, response) {
      console.log(response);
  };
  colorClient.getColorsInTetradFamily(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |numberOfColors   |integer  |  |The total number of colors you want returned. The value must be between 4 and 72.  |
|         |color   |string  |  |A base color. Three harmonious hues will be found for you to create a tetrad.  |
|         |outFormat   |string  |Hex  |The format in which you want the output colors. Supported formats: Hex, RGB, HSL.  |
|         |inFormat   |string  |Hex/RGB  |The format of the inputColor. Supported formats: Hex, RGB, HSL. f unspecified, we will try to parse the inputColor as Hex first, then RGB.  |
|callback   |function  |  |  |the callback for response  |

---

## `getColorsInTriadFamily(options, callback)`

Get a family of colors based on a harmonious triad of hues.

Syntax

```javascript
  var options = {
      numberOfColors: 25
  };
  var callback = function (status, response) {
      console.log(response);
  };
  colorClient.getColorsInTetradFamily(options, callback);
```

Parameters

|Name|Type|||Description|
|---|---|---|---|---|
|options   |Options  |  |             |
||Name|Type|Default|Description|
||---|---|---|---|
|         |numberOfColors   |integer  |  |The number of colors you want returned. The value must be between 3 and 54.v  |
|         |color   |string  |  |The color on which you want to base the colors collections.  |
|         |outFormat   |string  |Hex  |The format in which you want the output colors. Supported formats: Hex, RGB, HSL.  |
|         |inFormat   |string  |Hex/RGB  |The format of the inputColor. Supported formats: Hex, RGB, HSL. f unspecified, we will try to parse the inputColor as Hex first, then RGB.  |
|callback   |function  |  |  |the callback for response  |
