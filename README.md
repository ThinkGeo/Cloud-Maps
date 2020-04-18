# Cloud Maps

## Repository Layout

`/api-docs`: An offline version the API documentation HTML pages.

`/hero-app`: A real world application that shows off many of this products features along with best practices.

`/samples`: A collection of feature by feature samples.  We suggest you start with the [How Do I Sample](samples/wpf/HowDoISample/HowDoI) as it shows dozens of features in one easy to navigate app.

`/.assets`: Any assets needed for the readme.md.

`README.md`: A quick start guide to show you how to quickly get up and running.

## Quick Start: Find POIs Within 1 Mile

This section will introduce you to getting a nice looking map up and running with some external data and styling.  After reviewing this we strongly recommend that you open the [How Do I Sample](samples/wpf/HowDoISample/HowDoI).  It's packed with dozens of examples covering nearly everything you can do with the control.

We will begin by creating a .NET Core WPF project in your favorite editor.  Next we will walk you through adding the required packages and getting a map on the default form.  Next we will add some code to show a nice looking background map and finally add some custom which will be styled and labeled.  After reading this you will be in a good position to look over the [How Do I Sample](samples/wpf/HowDoISample/HowDoI) and explore our other features.

![alt text](.assets/quickstart_shapefile_pointstyle_screenshot.png "Simple Map")

### Step 1: Setup a New Project

  In your editor of choice you need to create a **.NET Core WPF** project.  Please see your editor's instructions on how to create the project.  Here is a [sample video](https://channel9.msdn.com/Series/Desktop-and-NET-Core-101/Create-your-first-WPF-app-on-NET-Core) using Visual Studio for reference.  

### Step 2: Add NuGet Packages

You will need to install the **ThinkGeo.UI.Wpf** NuGet package.  We highly suggest you use your editors [built in NuGet package manager](https://docs.microsoft.com/en-us/nuget/quickstart/) if possible.  If you're not using an IDE you can [install it via the the dotnet CLI](https://docs.microsoft.com/en-us/nuget/consume-packages/install-use-packages-dotnet-cli) from inside your project folder where where your project file exists.

```shell
dotnet add package ThinkGeo.UI.Wpf
```
