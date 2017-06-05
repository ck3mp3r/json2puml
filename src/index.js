#! /usr/bin/env node
/* @flow */
import figlet from "figlet";
import yargs from "yargs";
import chalk from "chalk";
import jsonfile from "jsonfile";
import Files from "./files";
import DomainParser from "./domain-parser";

console.log(
    chalk.yellow(figlet.textSync("json 2 puml", { horizontalLayout: "full" }))
);

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
    .command(
        "domain [file]",
        "File to parse.",
        { file: { required: true } },
        info => {
            let model = jsonfile.readFileSync(info.file);
            let domainParser = new DomainParser(model);
            domainParser.parse();
        }
    )
    .command(
        "objects [file]",
        "File to parse.",
        { file: { required: true } },
        info => console.log(info)
    )
    .help().argv;
