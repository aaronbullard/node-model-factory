var faker = require('faker');

module.exports = {

  _factories: {},


  _times: 1,


  _makeOnce: function(name, overrides){
    var callback = this._factories[name];

    var times = this._times;
    this._times = 1;

    var obj =  callback(faker, this);
    
    this._times = times;

    return this._merge(obj, overrides);
  },

  _merge: function(obj1, obj2){
      var obj3 = {};
      for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
      for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
      return obj3;
  },


  define: function(name, callback){
    this._factories[name] = callback;

    return this;
  },


  make: function(name, overrides){
    var results = [];

    while(this._times--){
      results.push(this._makeOnce(name, overrides));
    }

    this._times = 1;

    return results;
  },


  times: function(number){
    this._times = number;
    return this;
  }
};
