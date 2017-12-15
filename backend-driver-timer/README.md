# Driver Timer v3 (Dracula)

##### Check out v1 [here](https://github.com/CodingTea17/driver-timer-v1-php "Frankenstein").
##### Check out v2 [here](https://github.com/CodingTea17/driver-timer-v2-mongo-express-node "Nessie").

## Concept

The idea was to create a simple application to increase delivery efficiency. Drivers were required to call back after every delivery so that shift leads could route the upcoming deliveries and 'insiders' could prepare those orders to be ready as soon as the driver returned. Ideally a driver would return from a delivery and immediately leave on the next. However, that was almost never the case. During rush periods shift leads were unable to mentally keep track of who was returning and phone calls to the store were often not even reported to the shift lead. Drivers would return and the next delivery would not have even been 'slapped out'(rolled out and tossed), delaying an order by 15+ minutes.

#### Goals of the Original Driver Timer (PHP):

* Provide accurate, consistent communication between the drivers and shift lead
* Reduce distractions for driver (e.g. making a phone call while driving back to the store)
* Improve delivery overall times by cutting down out-the-door times

#### Goals of the 2nd Driver Timer (Mongo, Express, Node):

* Rewrite the application to be used at multiple stores.
* Integrate with a cheaper communications API (Nexmo)
* Use a database to store drivers and allow in app driver addition.

#### Goals of the 3rd Driver Timer (Rails, React, Postgres):

  * Restructure the project to a RESTful backend API and a modular frontend collection of React components.
  * Implement full CRUD functionality for managing drivers.
  * Implement Websockets to get live data for each store's drivers.
