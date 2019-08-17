# node-model-factory
A laravel-like model factory using faker.js

[![Maintainability](https://api.codeclimate.com/v1/badges/5b334028ff6b50a80746/maintainability)](https://codeclimate.com/github/aaronbullard/node-model-factory/maintainability)
<!-- [![Test Coverage](https://api.codeclimate.com/v1/badges/5b334028ff6b50a80746/test_coverage)](https://codeclimate.com/github/aaronbullard/node-model-factory/test_coverage) -->

### Install

Node dependencies

```
npm install node-model-factory
```
### Initializing
`node-model-factory` includes the latest 4.0 version of [faker.js](https://www.npmjs.com/package/faker).  It is injected as the first agument of your definition closure.

### API
> Factory::define(name, closure)

> Factory::times(amount)

> Factory::make(name)

### Example
./my-factories/factory.js
```js
import Factory from 'node-model-factory'

//Define your models...
let factory = new Factory();

factory.define('City', (faker) => {
    return {
        city: faker.address.city(),
        state: faker.address.stateAbbr()
    }
});

// include other models (see hometown)
factory.define('Person', (faker, factory) => {
    return {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        hometown: factory.make('City')
    }
});

export default factory;
```

### Sample Use Cases

#### Make One
```js
import factory from './my-factories/factory.js'

// Make 1 Person
var person = factory.make('Person');

console.log(person);
/*
{
  first_name: "Bob",
  last_name: "Smith",
  hometown: {
    city: "Wilmington"
    state: "NC"
  }
}
*/
```

#### Make Several
```js
import factory from './my-factories/factory.js'

// Make 1 Person
var people = factory.times(2).make('Person');

console.log(people);
/*
[
  {
    first_name: "Bob",
    last_name: "Smith",
    hometown: {
      city: "Wilmington"
      state: "NC"
    }
  },
  {
    first_name: "Jane",
    last_name: "Doe",
    hometown: {
      city: "Charleston"
      state: "SC"
    }
  }
]
*/
```

#### Override Attributes
```js
import factory from './my-factories/factory.js'

// Make 1 Person
var person = factory.make('Person', {
  first_name: "John"
});

console.log(person);
/*
{
  first_name: "John", //first name is 'John' and not random from faker
  last_name: "Smith",
  hometown: {
    city: "Wilmington"
    state: "NC"
  }
}
*/
```

#### Not using Faker.js

In case you want to use another library, just include it in the constructor when you initialize the Factory class.

```js
import Factory from 'node-model-factory'
import randomLib from './random-lib.js'

let factory = new Factory(randomLib);

factory.define('City', (randomLib) => {
  // randomLib is in scope as the first 
  // argument of this closure
})

```
