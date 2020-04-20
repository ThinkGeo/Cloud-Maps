# Cloud Maps

## Repository Layout

`/api-docs`: An offline version the products documentation.

`/hero-app`: A real world application that shows off many of this products features along with best practices.

`/samples`: A collection of feature by feature samples.

`/.assets`: Any assets needed for the readme.md.

`README.md`: A quick start guide to show you how to quickly get up and running.

## Quick Start: Find First POI Within 1 Mile

In this sample we will use the Reverse Geocoder Cloud API to find the first point of interest within one mile of a location and display its information.  This will demonstrate a number of features common to the various Cloud APIs such as optional parameters and generally setting up a call.

We will begin by creating a .NET Core Console project in your favorite editor.  Next we will walk you through adding the required packages.  Then we will add some code to show you how to make a call to the Cloud Maps API using our built in C# client classes.  After reading this you will be in a good position to look over our [other samples](/samples) and explore our other features.

### Step 1: Setup a New Project

  In your editor of choice you need to create a **.NET Core Console** project.  Please see your editor's instructions on how to create the project.  Here is an [example](https://docs.microsoft.com/en-us/dotnet/core/tutorials/with-visual-studio?tabs=csharp) using Visual Studio for reference.  

### Step 2: Add NuGet Packages

You will need to install the **ThinkGeo.Core** NuGet package.  We highly suggest you use your editors [built in NuGet package manager](https://docs.microsoft.com/en-us/nuget/quickstart/) if possible.  If you're not using an IDE you can [install it via the the dotnet CLI](https://docs.microsoft.com/en-us/nuget/consume-packages/install-use-packages-dotnet-cli) from inside your project folder where where your project file exists.

```shell
dotnet add package ThinkGeo.UI.Wpf
```

### Step 3: Add Required Namespaces to `Program.cs`

Add the required usings.

```csharp
using ThinkGeo.Core;
```

### Step 4: Setup the ReverseGeocoder Client

Add the code below to the `Program.cs`.  Note that you can use your own ClientID and Secret based on your account at our [Cloud Maps Console](https://cloud.thinkgeo.com). All of the cloud clients end in `CloudClient`.

```csharp
// Create the client and set the ClientId and Secret
ReverseGeocodingCloudClient reverseGeocoder = new ReverseGeocodingCloudClient();

reverseGeocoder.ClientId = "FSDgWMuqGhZCmZnbnxh-Yl1HOaDQcQ6mMaZZ1VkQNYw~";
reverseGeocoder.ClientSecret = "IoOZkBJie0K9pz10jTRmrUclX6UYssZBeed401oAfbxb9ufF1WVUvg~~";
```

### Step 5: Define Optional Parameters

Many of our APIs have optional parameters that change the results of the request. In this case we only want to find the first item in the area and we want to have as much data returned as possible for that one location.

```csharp
// Set optional options to return verbose results as well as limit the results to the first one found           
CloudReverseGeocodingOptions options = new CloudReverseGeocodingOptions()
{
    ResultDetail = CloudReverseGeocodingResultDetail.Verbose,
    MaxResults = 1
};
```

### Step 6: Execute the Call Synchronously 

We are now calling the method passing in the search location along with the search distance, search distance unit and the optional parameters we defined above.  This call is being made synchronously however there there are asynchronous methods available as well.

```csharp
// Execute the reverse geocode getting the first feature in 1 mile
CloudReverseGeocodingResult results = reverseGeocoder.SearchPoint(-96.809962, 33.128448, 4326, 1, DistanceUnit.Mile, options);
```

### Step 7: Display the Results

We won't be able to see the points until a style is defined for it. Adding a style though is very straightforward, but extremely extensible and powerful.

```csharp
// Write the location information to the console assuming we returned results
if (results.NearbyLocations.Count > 0)
{
    CloudReverseGeocodingLocation location = results.NearbyLocations.First();

    Console.WriteLine($"LocationName: { location.LocationName }");
    Console.WriteLine($"Address: { location.Address }");
    Console.WriteLine($"DirectionFromQueryFeature: { location.DirectionFromQueryFeature }");
    Console.WriteLine($"DistanceFromQueryFeature: { location.DistanceFromQueryFeature }");
    Console.WriteLine($"HouseNumber: { location.HouseNumber }");
    Console.WriteLine($"LocationCategory: { location.LocationCategory }");
    Console.WriteLine($"LocationFeature: { location.LocationFeature }");
    Console.WriteLine($"LocationType: { location.LocationType }");
    Console.WriteLine($"Postcode: { location.Postcode }");
    Console.WriteLine($"Properties Count: { location.Properties.Count }");
}
```

## Summary

You now know the basics of using the ThinkGeo Cloud APIs and are able to get started adding functionality into your own applications. Let's recap what we have learned about the object relationships and how the pieces of ThinkGeo UI work together:

1. When your looking for cloud APIs all of the clients end in `CloudClient` which makes them easier to find.
1. Once you sign up for an account on the [Cloud Console](https://cloud.thinkgeo.com) you can create your own access keys to use in your applications.
1. On many API calls there might be optional parameters so look out for them.
1. Every cloud API has a synchronous and asynchronous version to fit many different scenarios.

You are now in a great position to look over the [samples](s/samples) and explore other features.
