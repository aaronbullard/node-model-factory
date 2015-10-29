# node-model-factory
A laravel-like model factory using faker.js


### Example
```
var express = require('express');
var factory = require('node-model-factory');

//Define your models...

// Address
factory.define('Address', function(faker){
  return {
    city: faker.address.city(),
    state: faker.address.state()
  };
});

// Car
factory.define('Car', function(faker){
  return {
    make: faker.company.companyName(),
    model: faker.hacker.noun(),
    year: faker.random.arrayElement([2012, 2013, 2014, 2015])
  };
});

// User
factory.define('User', function(faker, factory){
  var address = factory.make('Address');
  var cars = factory.times(2).make('Car');
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.random.arrayElement([35, 36, 37, 38]),
    address: address,
    cars: cars
  };
});


// Sample use case
// Make 3 users
var users = factory('User').times(3).make();

console.log(users);
//
{
  "firstName": "Susana",
  "lastName": "Christiansen",
  "age": 37,
  "address": 
  {
    "city": "Joaquin berg",
    "state": "Rhode Island"
  },
  "cars": [
    {
      "make": "Wuckert LLC",
      "model": "microchip",
      "year": 2014
    },
    {
      "make": "Hodkiewicz - Boyle",
      "model": "card",
      "year": 2015
    }
  ]
}

```
