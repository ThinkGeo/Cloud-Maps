
# Changelog

## Version 1.8

Release date: November 7, 2019

* Route optimization (Traveling Salesman Problem) service introduced.
* Updated routing data to include private-access roads.
* Increased maximum routing cost matrix waypoints from 10 to 25.
* Updated ThinkGeo Core spatial infrastructure to version 12.0.
* Improved X, Y, Z validation in Cloud Maps Vector and Raster services.
* Fixed an issue where toll roads were no longer being indicated as such in routing services.

## Version 1.7

Release date: August 23, 2019

* API for generating a matrix of travel times or distances between each point in a collection of locations.
* API for returning the boundary polygons for all of the world's time zones in Well-Known Text (WKT) format.
* Further reliability improvements for the ThinkGeo Cloud Geocoder service.
* Improved result quality for batch geocode requests in certain edge cases.
* Added caching headers to vector tile responses.

## Version 1.6.2

Release date: July 26, 2019

* Introduced a dark theme for the ThinkGeo Cloud web console, enabled by default.
* Performance and reliability improvements for the ThinkGeo Cloud Geocoder and Reverse Geocoder services.
* Beginning with this version, you must have a ThinkGeo Cloud account and authenticate your requests if you want to use the Cloud Maps Raster Tiles service.

## Version 1.6

Release date: July 4, 2019

This version includes geocoder enhancements and some bug fixes.

* Supported Worldwide geocoder.
* Supported more options for geocoder.
* Fixed distance of route is not correct.
* Fixed "Access-Control-Allow-Origin" header is missing for invalid API key.

## Version 1.5

Release date: June 14, 2019

This version introduces a new service for routing.

* API for calculating a route through the specified waypoints.
* API for calculating the reachable service areas (isochrones) for a coordinate point, based on the specified time or distance constraints.

## Version 1.4

Release date: April 27, 2019

ThinkGeo Cloud 1.4 is all about improving service discoverability for new customers.

* The Cloud web console's dashboard page is now visible to the public and serves as the new login page.
* The web console dashboard offers users a tour of the console so they can see what is possible, how to create clients and how to check their transaction stats.
* The web console dashboard also lists all available services in the ThinkGeo Cloud, with quick links to API reference, online samples and quick start guides.
* A new "Samples" item has been added to the web console dashboard, allowing users to take each available ThinkGeo Cloud service for a test drive.
* Numerous behind-the-scenes improvements and bug fixes are also included.

## Version 1.3

Release date: March 29, 2019

This version introduces a new API for getting time zone information by geographic coordinates, extends high-DPI support to all ThinkGeo Cloud Maps Raster tile types, and greatly improves ThinkGeo Cloud's Geocoding performance.  Numerous bug fixes and QoL enhancements are also included.

* API for getting time zone, local time and UTC offset by coordinate.

* x2 (high-DPI) resolution is now supported for all raster map tiles (light, dark, aerial, hybrid and transparent-background).
* Improved geocoder input parsing.
* Improved geocoder performance.
* Ability to visualize historical aggregated transaction statistics over a custom date range, by day (up to 1 year in the past) or by month (up to 4 years in the past).
* Return a friendly HTML error page instead of a blank response body if a nonexistent route is requested.
* Added HATEOAS links to all endpoints, which help expose consuming clients to other related actions they can take.
* In the ThinkGeo Cloud web console, added hash to the filename of local assets such as JavaScript libraries and style sheets to provide automatic browser cache-busting when these assets change.
* Fix for issue where transactions were not recorded for APIs with a fractional cost of less than 1 transaction.
* Added infrastructural support for interstitial PNG optimization of World Streets raster tiles.

## Version 1.2

Release date: February 16, 2019

Largely a stability and performance improvement release, this version focused on enabling asynchronous execution of methods and better performance for high-frequency actions.  We also introduced a system that allows users to see the transaction costs accrued by their clients, and allows admins to set the relative cost in transactions for each service.  Numerous bug fixes were also included.

* GIS-354: Implemented transaction system, including:
        *Ability to record and report on the cost of API actions separately from simple request volume.
        * Ability for admins to set a relative transaction cost multiplier on a per-service basis.
        * User-facing UI for visualizing transaction accrual over the past rolling 24-hour period (timeframe to be expanded in the future).
* GIS-358: Improved the performance of looking up a client by API key.
* GIS-374: Implemented async/await pattern with CancellationToken support across the API surface for better scalability and responsiveness in certain scenarios.
* GIS-419: Finalized the rename of ThinkGeo.GisServer to ThinkGeo.Cloud throughout the solution.
* GIS-423: Bug fixes related to the ThinkGeo Cloud Maps Vector Tiles and ThinkGeo Cloud Maps Raster Tiles services:
        *Fixed NullReferenceException when a negative X or Y coordinate is requested from the MapsRasterController.
        * Fixed NullReferenceException when a negative Z value is requested from the MapsVectorController.
        * Added missing range validation for the Z value in the MapsVectorController.
* GIS-424: Added creation time to account entities.
* GIS-429: Fixed bug where the required STYLES parameter was not validated on requests to either the legacy or current-gen WMS endpoints.
* GIS-430: Bug fixes related to the ThinkGeo Cloud Maps WMS service:
        * Support rendering non-square WMS images.
        *Added maximum WMS image width and height setting with corresponding validation.  Exposed this value in the GetCapabilities response.
        * Improved drawing strategy for ThinkGeo logo watermark on anonymous requests.
* GIS-431: Obfuscated certain request parameters when saving log messages.
* GIS-433: Improved accuracy of some documentation in the API explorer page.
* Fixed an issue where a cancelled request for a raster tile may cause a SemaphoreFullException.
* Updated to the latest version of ThinkGeo StyleJSON(Light Theme) in the Cloud console's plugin test pages.
* Updated all projects to .NET Framework 4.6.1.

## Version 1.1

Release date: January 9, 2019

Version 1.1 formally introduced the ThinkGeo Cloud Geocoding service and fixed a number of bugs observed in the initial release.

* GIS-387 - Moved the Legacy WMS service configuration from a file to the database.
* GIS-396 - Multiple improvements related to versioning:
        *Added auto-incrementing Revision and Build numbers to all projects (e.g. 1.1.6948.25477 is the full version number of today’s release).  The Revision number is the number of days since 1/1/2000 and the Build number is the number of seconds since midnight, divided by two, of the time the solution was built.
        * Display ThinkGeo.Cloud version number on the Server Settings page in the web console so we can tell what build version the environment is running.
        * Attach application version number to logger messages.
* GIS-399 - Fixed null reference exception in Maps Raster XYZ service.
* GIS-401 - Fixed System.OutOfMemory exception in Legacy WMS service.
* GIS-404 - Added Geocoding test page in the web console.
* GIS-406 - Added Geocoding settings page and stored those settings in the database.
* GIS-408 - Renamed all project classes and namespaces from ThinkGeo.GisServer to ThinkGeo.Cloud.  This required some related reconfiguration of the server environments, scripts and logs.
* GIS-411 - Fixed "Invalid Array Length" error in the web console's Permissions UI which resulted in the page becoming unresponsive or crashing.
* GIS-412 - Fixed "Lat/Long Out of Range" exception in the Elevation service.
* GIS-413 - Fixed NullReferenceException in Elevation SDK by upgrading to 11.0.0-beta022.
* GIS-415 - Fixed "Points must form a closed linestring" exception in the Elevation service.
* GIS-417 - Fixed null reference exception in the Geocoding service.
* GIS-418 - When logging exceptions, we will now include the request parameters to aid in reproducing errors.
* GIS-421 - Enabled deep-linking and custom service group names on the Swagger-UI page, which will help us link to this page from our wiki more effectively.
* Fixed "Index was outside the bounds of the array" exception in the Colors service.
* Fixed various issues with the MapsRasterController when requesting non-512px tiles.
* Fixed client-side form validation on the various settings pages in the web console.
* Upgraded the VectorMap-JS lib references to 2.0.2.
* Upgraded the ThinkGeo Maps Web Font references to 2.0.0-beta006.
* Refactored the Legacy World Map Kit WMS and the new ThinkGeo Maps WMS common code into its own shared project.
* Refactored prevention of saving empty tiles to the S3 cache in the Legacy WMS service.
* Revealed the ThinkGeo Maps WMS endpoint on the Swagger-UI page.
* Enabled Linux Skia-related assemblies (*.so) to be automatically included during build.
* Updated Geocoding SDK to 11.0.0-beta014 to improve performance for search-as-you-type.
* Updated Geocoding SDK to 11.0.0-beta017 to add fuzzy zipcode matching, store citystate.dbf and zip.dbf in memory, and reduce result limit from 10,000 to 3,000.
* Updated Geocoding SDK to 11.0.0-beta022 to integrate various improvements and bug fixes.

## Version 1.0

Release date: December 19, 2018

Initial stable public release.
