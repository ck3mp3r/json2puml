#! /usr/bin/env node
"use strict";

var _winston = require("winston");

var _winston2 = _interopRequireDefault(_winston);

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _files = require("./files");

var _files2 = _interopRequireDefault(_files);

var _parser = require("./domain/parser");

var _parser2 = _interopRequireDefault(_parser);

var _puml = require("./domain/puml");

var _puml2 = _interopRequireDefault(_puml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This lambda handles the actuall processing orchestration
 *
 */
var domain2puml = function domain2puml(rootName) {
    return function () {
        var model = JSON.parse(data);
        var domainParser = new _parser2.default(model, rootName, function (name) {
            var newName = name;
            if (name.endsWith("ies")) {
                newName = name.replace(new RegExp("ies$"), "y");
            } else if (name.endsWith("s")) {
                newName = name.replace(new RegExp("s$"), "");
            }
            return newName;
        });
        try {
            var pumlRenderer = new _puml2.default(_fs2.default.readFileSync(__dirname + "/domain/puml.tpl").toString());
            var _model = domainParser.parse();
            console.log(pumlRenderer.render(_model));
        } catch (e) {
            console.log(e);
        }
    };
};

/**
 * setup command line input parsing
 *
 */
var data = "";
_yargs2.default.usage("Usage: command | $0 [--name FooBar] domain > yourfile.puml").example("cat foo.json | $0 domain > bar.puml", "Taking an existing json file to turn into plantuml representation").example("curl https://foo.com/path | $0 domain > bar.puml", "Loading json from an api call to turn into plantuml representation").option("n", {
    alias: "name",
    type: "string",
    describe: "optional alternative root entity name",
    default: "root",
    requiresArg: true
}).command("domain", "process domain model from incoming api", function (info) {
    process.stdin.on("data", function (chunk) {
        return data += chunk;
    });
    process.stdin.on("end", domain2puml(info.argv.n));
}).command("objects", false, function (info) {
    return console.warn("Not implemented yet...");
}).demandCommand(1).help().argv;
_winston2.default.level = process.env.LOG_LEVEL || "error";