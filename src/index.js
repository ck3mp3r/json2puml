#! /usr/bin/env node
/* @flow */
import winston from "winston";
import yargs from "yargs";
import fs from "fs";
import Files from "./files";
import DomainParser from "./domain/parser";
import DomainPuml from "./domain/puml";

let data = "";
/**
 * This lambda handles the actuall processing orchestration
 *
 */
const domain2puml = () => {
    let model = JSON.parse(data);
    let domainParser = new DomainParser(model, name => {
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

/**
 * setup command line input parsing
 *
 */
yargs
    .usage("Usage: command | $0 domain > yourfile.puml")
    .demandCommand(1)
    .example(
        "cat my-file.json | $0 domain > output.puml",
        "Taking an existing json file to turn into plantuml representation"
    )
    .example(
        "curl http://some-address.com/api | $0 domain > output.puml",
        "Loading json from an api call to turn into plantuml representation"
    )
    .command("domain", "process domain model from incoming api", info => {
        process.stdin.on("data", chunk => (data += chunk));
        process.stdin.on("end", domain2puml);
    })
    .command("objects", false, info => console.warn("Not implemented yet..."))
    .help().argv;

winston.level = process.env.LOG_LEVEL || "error";
