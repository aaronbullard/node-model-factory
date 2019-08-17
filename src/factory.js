import faker from 'faker';

class Factory {

    constructor(fakerInstance = null) {
        this._faker = fakerInstance || faker;
        this._factories = {};
        this._times = null;
    }

    define (name, callback) {
        this._factories[name] = callback;
        
        return this;
    }

    times (number) {
        if (number < 1) {
            throw new Error('Argument 1 must be positive');
        }

        this._times = number;

        return this;
    }

    make (name, overrides = {}) {
        if (!this._factories.hasOwnProperty(name)) {
            throw new Error(`Model '${name}' not defined`);
        }

        let callback = this._factories[name];

        // Do we want 1 or an array of several
        if(this._times !== null){
            let amount = this._times;

            this._times = null;

            return [...new Array(amount)].map(i => {
                return this._makeOnce(callback, overrides);
            })
        }

        // return one instance
        return this._makeOnce(callback, overrides);
    }

    _makeOnce (callback, overrides) {
        let obj = callback(this._faker, this);

        return {
            ...obj,
            ...overrides
        }
    }
}

export default Factory;