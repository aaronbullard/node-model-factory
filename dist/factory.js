"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _faker = _interopRequireDefault(require("faker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Factory =
/*#__PURE__*/
function () {
  function Factory() {
    var fakerInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Factory);

    this._faker = fakerInstance || _faker["default"];
    this._factories = {};
    this._times = null;
  }

  _createClass(Factory, [{
    key: "define",
    value: function define(name, callback) {
      this._factories[name] = callback;
      return this;
    }
  }, {
    key: "times",
    value: function times(number) {
      if (number < 1) {
        throw new Error('Argument 1 must be positive');
      }

      this._times = number;
      return this;
    }
  }, {
    key: "make",
    value: function make(name) {
      var _this = this;

      var overrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!this._factories.hasOwnProperty(name)) {
        throw new Error("Model '".concat(name, "' not defined"));
      }

      var callback = this._factories[name]; // Do we want 1 or an array of several

      if (this._times !== null) {
        var amount = this._times;
        this._times = null;
        return _toConsumableArray(new Array(amount)).map(function (i) {
          return _this._makeOnce(callback, overrides);
        });
      } // return one instance


      return this._makeOnce(callback, overrides);
    }
  }, {
    key: "_makeOnce",
    value: function _makeOnce(callback, overrides) {
      var obj = callback(this._faker, this);
      return _objectSpread({}, obj, {}, overrides);
    }
  }]);

  return Factory;
}();

var _default = Factory;
exports["default"] = _default;