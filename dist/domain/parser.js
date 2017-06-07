"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _winston = require("winston");

var _winston2 = _interopRequireDefault(_winston);

var _entity = require("./entity");

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomainParser = function () {
    function DomainParser(model, rootName, nameHandler) {
        _classCallCheck(this, DomainParser);

        this.model = model;
        this.rootName = rootName;
        this.nameHandler = nameHandler;
        this.entities = {};
    }

    _createClass(DomainParser, [{
        key: "parse",
        value: function parse() {
            this._parseEntity(this.rootName, this.model, "");
            return this.entities;
        }
    }, {
        key: "_parseEntity",
        value: function _parseEntity(key, entity, parent) {
            if (entity === null) {
                _winston2.default.warn("null value for: " + key);
                return null;
            }
            switch (typeof entity === "undefined" ? "undefined" : _typeof(entity)) {
                case "object":
                    return entity instanceof Array ? this._parseArray(key, entity, parent) : this._parseObject(key, entity, parent);

                case "number":
                    return this._parseNumber(key, entity);

                case "string":
                    return this._parseString(key, entity);

                case "boolean":
                    return this._parseBoolean(key, entity);

                default:
                    console.warn("Unhandled type: " + (typeof entity === "undefined" ? "undefined" : _typeof(entity)));
            }
        }
    }, {
        key: "_parseObject",
        value: function _parseObject(key, entity, parent) {
            var _this = this;

            var type = "object";
            var name = this.nameHandler(key.charAt(0).toUpperCase() + key.slice(1));

            var properties = {};

            Reflect.ownKeys(entity).map(function (key) {
                return Reflect.set(properties, key, _this._parseEntity(key, Reflect.get(entity, key), name));
            });

            var old = Reflect.get(this.entities, name);
            var refs = old ? old.refs : [];
            var newEntity = new _entity2.default(name, type, properties, parent ? [].concat(_toConsumableArray(refs), [parent]) : []);

            Reflect.set(this.entities, name, _extends({}, old, newEntity));
            return newEntity;
        }
    }, {
        key: "_parseArray",
        value: function _parseArray(key, entity, parent) {
            var _this2 = this;

            entity.map(function (entry) {
                return _this2._parseEntity(key, entry, parent);
            });
            return new _entity2.default(key, "array");
        }
    }, {
        key: "_parseNumber",
        value: function _parseNumber(key, entity) {
            return new _entity2.default(this.nameHandler(key), "number");
        }
    }, {
        key: "_parseString",
        value: function _parseString(key, entity) {
            return new _entity2.default(this.nameHandler(key), "string");
        }
    }, {
        key: "_parseBoolean",
        value: function _parseBoolean(key, entity) {
            return new _entity2.default(this.nameHandler(key), "boolean");
        }
    }]);

    return DomainParser;
}();

exports.default = DomainParser;