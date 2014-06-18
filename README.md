=======
# squishle-pegg

Node app that pulls from Squishlescope and pushes to Pegg

## Getting Started
First of all, clone this repository and cd into project folder.
npm install
node index

This runs importing feed data to Parse.com

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Andrey Dimitrov



requirements
=============

Node.js app that pulls from Squishlescope and pushes to Pegg


## Feed

http://squishle.meteor.com/json


## Parse

https://parse.com/docs/api_libraries


## Mappings
### Feed :: Parse

- title :: Card.question
- guid: Card.squishleId
- image1 :: Choice.image
- caption1 :: Choice.text
- image2 :: Choice.image
- caption2 :: Choice.text
- image3 :: Choice.image
- caption3 :: Choice.text
- image4 :: Choice.image
- caption4 :: Choice.text
- image5 :: Choice.image
- caption5 :: Choice.text
- categories.name :: Category.name


## Relationships

Each 1 set item in the Feed corresponds with 1 **Card** row and up to 5 **Choice** rows in Parse.
**Choice** rows will have a foreign key relation to the corresponding **Card** row.

Each 1 set item in the Feed may contain up to 20 categories.
For each category on a Feed item, there will be 1 **CardCategory** row with relations to the **Card** and the **Category** tables.

There will be 1 **Category** row for each of the ~20 categories from the Feed.