#!/usr/bin/env node
import Cli from "cli-er";
// import command definitions
import config from "@commands/config/definition";
import deploy from "@commands/deploy/definition";
import zip from "@commands/zip/definition";

new Cli({ deploy, config, zip }, { cliName: "rpi", rootCommand: false }).run();
