"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handlebars = require("handlebars");

var _handlebars2 = _interopRequireDefault(_handlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomainPuml = function () {
    function DomainPuml(template) {
        _classCallCheck(this, DomainPuml);

        this.template = _handlebars2.default.compile(template);
    }

    _createClass(DomainPuml, [{
        key: "render",
        value: function render(model) {
            return this.template(this._parseModel(model));
        }
    }, {
        key: "_parseModel",
        value: function _parseModel(model) {
            var refs = new Set();
            Reflect.ownKeys(model).map(function (i) {
                var entity = Reflect.get(model, i);
                entity.refs.map(function (j) {
                    refs.add(j + " -- " + entity.name);
                });
            });
            return { entities: model, refs: [].concat(_toConsumableArray(refs)) };
        }
    }]);

    return DomainPuml;
}();

exports.default = DomainPuml;