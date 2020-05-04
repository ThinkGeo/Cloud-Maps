
# Colors

ThinkGeo Cloud Colors provides several ways to generate harmonious themes of colors, which you can use to design attractive and meaningful maps.  Your color themes can be designed around a specific base color, or the service can choose a random color for you.  Check out [Generate Color Themes](https://vectormapsamples.thinkgeo.com/#GenerateColorThemes) for a quick look.

## RESTful APIs

***Try it Online***

- Check out [Quick Start Guide](../quickstart.md) and get an APIKey for free for 60 days.
- Visit our [ThinkGeo Cloud API Explorer](https://cloud.thinkgeo.com/help/), click the "Authorize" button at the top and enter your client credentials. You are then free to play with all the APIs online.
- For all the APIs, check out [ThinkGeo Cloud Colors APIs](https://cloud.thinkgeo.com/help/#/Colors) and hit**Try it Out**button inside each API to start.

There are two kinds of APIs provided by ThinkGeo Cloud Colors Utility that provide different color generation algorithms.

### Generate Colors Based On A Specific Color

```html
HTTP GET https://cloud.thinkgeo.com/api/v1/color/scheme/{algorithm}/{inputColor}/{numberOfColors}?inFormat={inFormat}&outFormat={outFormat}&apiKey={apiKey}
```

***URL Parameters***

- algorithm: The algorithm to use for generating colors. Supported values are:
  - analogous: Get a family of colors based on three analogous hues.
  - complementary: Get a family of colors based on two complementary hues.
  - contrasting: Get a family of colors based on two contrasting hues.
  - sequential: Get a family of colors with the same hue and sequential variances in lightness and saturation.
  - qualitative: Get a family of colors with qualitative variances in hue, but similar lightness and saturation.
  - tetrad: Get a family of colors based on a harmonious tetrad (two sets of complements).
  - triad: Get a family of colors based on a harmonious triad (three colors equidistant from each other on the color wheel).
- inputColor: A base color, for different algorithms:
  - analogous: Two analogous hues will be found for you.
  - complementary: A complementary hue will be found for you.
  - contrasting: A contrasting hue will be found for you.
  - sequential: We'll create variations of brightness based on the hue of your base color.
  - qualitative: We'll create a variety of different hues of a brightness similar to your base color.
  - tetrad: Three colors will be found for you to create a pair of complements that includes your base color.
  - triad: Two colors of equal distance around the color wheel from your base color will be found for you.
- numberOfColors: The total number of colors you want to be returned, for different algorithms:
  - analogous: The value must be between 3 and 54.
  - complementary: The value must be between 2 and 36.
  - contrasting: The value must be between 2 and 36.
  - sequential: The value must be between 1 and 255.
  - qualitative: The value must be between 1 and 255.
  - tetrad: The value must be between 4 and 72.
  - triad: The value must be between 3 and 54.
- apikey: the apikey
- inFormat (optional): The format of the inputColor. Supported formats are ''Hex'', ''RGB'', and ''HSL''. If unspecified, the server will try to parse the inputColor format automatically in the order of Hex, then RGB, and finally HSL.
- outFormat (optional): The format in which you want the output colors. Supported formats: Hex, RGB, HSL. Defaults to Hex.

***Sample Request***
[https://cloud.thinkgeo.com/api/v1/color/scheme/analogous/FF00FF/5?apiKey=mykey](https://cloud.thinkgeo.com/api/v1/color/scheme/analogous/FF00FF/5?apiKey=mykey)

### Generate Colors Based On A Random Color

```html
HTTP GET
https://cloud.thinkgeo.com/api/v1/color/scheme/{algorithm}/random/{numberOfColors}?outFormat={outFormat}&apiKey={apiKey}
```

**URL Parameters***

- algorithm: The algorithm, supported values are:
  - analogous: Get a family of colors based on three analogous hues.
  - complementary: Get a family of colors based on two complementary hues.
  - contrasting: Get a family of colors based on two contrasting hues.
  - sequential: Get a family of colors with the same hue and sequential variances in lightness and saturation.
  - qualitative: Get a family of colors with qualitative variances in hue, but similar lightness and saturation.
  - tetrad: Get a family of colors based on a harmonious tetrad (two sets of complements).
  - triad: Get a family of colors based on a harmonious triad (three colors equidistant from each other on the color wheel).
- numberOfColors: The total number of colors you want to be returned, for different algorithm:
  - analogous: The value must be between 3 and 54.
  - complementary: The value must be between 2 and 36.
  - contrasting: The value must be between 2 and 36.
  - sequential: The value must be between 1 and 255.
  - qualitative: The value must be between 1 and 255.
  - tetrad: The value must be between 4 and 72.
  - triad: The value must be between 3 and 54.
- apikey: the apikey
- outFormat (optional): The format in which you want the output colors. Supported formats are `Hex`, `RGB`, and `HSL`. Defaults to `Hex`.

***Sample Request***
[https://cloud.thinkgeo.com/api/v1/color/scheme/analogous/random/5?apiKey=mykey](https://cloud.thinkgeo.com/api/v1/color/scheme/analogous/random/5?apiKey=mykey)

## Consume From Client Side SDKs

Our .NET SDKThinkGeo Cloud Client makes it easy to consume all of the ThinkGeo Cloud services in your applications. It's available on [NuGet](https://www.nuget.org/packages/ThinkGeo.Cloud.Client)

At the NuGet Package Manager terminal, you can install this package by running the command: `Install-Package ThinkGeo.Cloud.Client -Version VERSION_TO_BE_INSTALLED`.

Sample Code:

``` csharp
using ThinkGeo.Cloud;
using ThinkGeo.MapSuite.Drawing;

ColorClient client = new ColorClient("Your Client ID", "Your Client Secret");
Dictionary<GeoColor, Collection<GeoColor>> results = client.GetColorsInAnalogousFamily(new GeoColor(255, 0, 255), 5);
Dictionary<GeoColor, Collection<GeoColor>> results = client.GetColorsInAnalogousFamily(5);
```

Native SDKs for Python, iOS and Android are coming soon.

## Samples

Online Sample:

- [ThinkGeo Cloud Color Online Sample](https://vectormapsamples.thinkgeo.com/#GenerateColorThemes)

Desktop Sample:

- [ThinkGeoCloudColorSample](https://gitlab.com/thinkgeo/public/thinkgeo-cloud-maps/-/tree/master/samples/wpf/ThinkGeoCloudColorSample) for [ThinkGeo Desktop Maps](https://gitlab.com/thinkgeo/public/thinkgeo-desktop-maps)

Web Sample:

```
Coming soon
```

Mobile Sample:

```
Coming soon
```
