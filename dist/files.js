"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Files = function () {
    function Files() {
        _classCallCheck(this, Files);
    }

    _createClass(Files, null, [{
        key: "getCurrentDirectoryBase",
        value: function getCurrentDirectoryBase() {
            return _path2.default.basename(process.cwd());
        }
    }, {
        key: "directoryExists",
        value: function directoryExists(filePath) {
            try {
                return _fs2.default.statSync(filePath).isDirectory();
            } catch (err) {
                return false;
            }
        }
    }]);

    return Files;
}();

exports.default = Files;