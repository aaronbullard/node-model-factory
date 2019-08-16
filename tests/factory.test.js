import Factory from '../src/factory.js';

describe('Factory', () => {

    let factory = new Factory();

    beforeEach(() => {
        factory.define('City', (faker) => {
            return {
                city: faker.address.city(),
                state: faker.address.stateAbbr()
            }
        });

        factory.define('Person', (faker, factory) => {
            return {
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                hometown: factory.make('City')
            }
        });
    })

    it('defines a model', () => {
        let city = factory.make('City');
        expect(Object.keys(city)).toEqual(['city', 'state']);
    })

    it('defines a model with a nested model', () => {
        let person = factory.make('Person');
        expect(Object.keys(person)).toEqual(['first_name', 'last_name', 'hometown']);
        expect(Object.keys(person.hometown)).toEqual(['city', 'state']);
    })

    it('makes multiple models', () => {
        let cities = factory.times(5).make('City');
        expect(cities.length).toEqual(5);
        cities.forEach(city => {
            expect(Object.keys(city)).toEqual(['city', 'state']);
        })

        // ensure # of times is reset and now returns one instance
        let city = factory.make('City');
        expect(Object.keys(city)).toEqual(['city', 'state']);
    })

    it('can override attributes', () => {
        let town = factory.make('City', {city: "Charleston"});
        expect(town.city).toEqual('Charleston');
    })
})