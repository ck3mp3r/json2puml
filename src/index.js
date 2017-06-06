#! /usr/bin/env node
/* @flow */
import yargs from "yargs";
import fs from "fs";
import Files from "./files";
import DomainParser from "./domain/parser";
import DomainPuml from "./domain/puml";

/**
 * steps to load and parse json files or API end point:
 *
 * 1. parse command line arguments
 * 2. load file(s) or end point
 * 3. parse file(s)
 * 4. build class tree
 * 5. render PUML output
 *
 */

/**
 * setup command line input parsing
 *
 */
yargs
    .command("domain", true, info => {
        let data = "";
        process.stdin.on("data", chunk => {
            data += chunk;
        });
        process.stdin.on("end", () => {
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
        });
    })
    .command("objects", false, info => console.log("Not implemented yet..."))
    .help().argv;
