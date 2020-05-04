# Pricing

## For Evaluation users

* Each user can evaluate for 60 days.
* Each user has 10k transactions per day within the 60 days evaluation.
* A warning message “Only X days before evaluation” shows up when there are less than 14 days left for evaluation.
* An HTTP 400 Bad Request Error with the Expiration message will return after it expires.

## For Subscription users

* There are 2 price models available, $495 per month or $4,995 per year. Users can purchase through the [subscription manager](https://subscriptions.thinkgeo.com/), the annual subscription can be purchased through ThinkGeo Sales as well.
* A subscribed user has 100k transactions per day or 3 million transactions per month.
* The transactions in the current month don’t roll over to the next month.
* The service will not shut down if it exceeds the transaction. Instead, a warning email will send over to the customer from sales@thinkgeo.com about the service termination/purchasing more transactions.  The service will shut down for that customer 14 days after the expiration if no further steps are taken.

## Transaction Details

* One transaction is one elevation request (including batch request) for up to 100 points. For example, if I request elevation information along a polyline and get 1,500 elevation points, it takes 15 transactions. If I send a batch request with 250 points, it counts as 3 transactions.
* One transaction is one reverse geocoding request. For example, it takes 100 transactions for a batch reverse geocoding with 100 addresses.
* One transaction is one geocoding request. For example, it takes 100 transactions for a batch geocoding with 100 addresses.
* One transaction is one map view, which is 10 XYZ tile request, including vector tile, raster tile or hybrid tile request.
* One transaction is one WMS tile request.
* One transaction is one Color Scheme request.
* One transaction is one projection conversion for up to 100 vertices. For example, if I project one polygon with 1,500 vertices from projection A to projection B, it takes 15 transactions.
* One transaction is one Time Zone request.
* One transaction is one World Maps Query request.
* One transaction is one Routing request with 10 or less waypoints, it takes 2 transactions if it's more than 10 waypoints.
* One transaction is one Cost Matrix request with 10 or less waypoints, it takes 2 transactions if it's more than 10 waypoints.
* One transaction is one TSP (Traveling Sales Man) request with 10 or less waypoints, it takes 2 transactions if it's more than 10 waypoints.
* One transaction is one Service Area request.
