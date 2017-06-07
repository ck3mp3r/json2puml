"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomainEntity = function DomainEntity(name, type) {
    var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var refs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    _classCallCheck(this, DomainEntity);

    this.name = name;
    this.type = type;
    this.refs = refs;
    this.properties = properties;
};

exports.default = DomainEntity;