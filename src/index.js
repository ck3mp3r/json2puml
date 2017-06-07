#! /usr/bin/env node

/* @flow */
import winston from "winston";
import yargs from "yargs";
import fs from "fs";
import Files from "./files";
import DomainParser from "./domain/parser";
import DomainPuml from "./domain/puml";

/**
 * This lambda handles the actuall processing orchestration
 *
 */
const domain2puml = rootName => {
    return () => {
        let model = JSON.parse(data);
        let domainParser = new DomainParser(model, rootName, name => {
            let newName = name;
            if (name.endsWith("ies")) {
                newName = name.replace(new RegExp("ies$"), "y");
            } else if (name.endsWith("s")) {
                newName = name.replace(new RegExp("s$"), "");
            }
            return newName;
        });
        try {
            let pumlRenderer = new DomainPuml(
                fs.readFileSync(__dirname + "/domain/puml.tpl").toString()
            );
            let model = domainParser.parse();
            console.log(pumlRenderer.render(model));
        } catch (e) {
            console.log(e);
        }
    };
};

/**
 * setup command line input parsing
 *
 */
let data = "";
yargs
    .usage("Usage: command | $0 [--root-name FooBar] domain > yourfile.puml")
    .example(
        "cat foo.json | $0 domain > bar.puml",
        "Taking an existing json file to turn into plantuml representation"
    )
    .example(
        "curl https://foo.com/path | $0 domain > bar.puml",
        "Loading json from an api call to turn into plantuml representation"
    )
    .option("n", {
        alias: "name",
        type: "string",
        describe: "optional alternative root entity name",
        default: "root",
        requiresArg: true
    })
    .command("domain", "process domain model from incoming api", info => {
        process.stdin.on("data", chunk => (data += chunk));
        process.stdin.on("end", domain2puml(info.argv.n));
    })
    .command("objects", false, info => console.warn("Not implemented yet..."))
    .demandCommand(1)
    .help().argv;
console.log(yargs.n);
winston.level = process.env.LOG_LEVEL || "error";
