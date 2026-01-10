#!/usr/bin/env node
import Cli from "cli-er";
import c, { names } from "@modules/config";
// import command definitions
import config from "@commands/config/definition";
import deploy from "@commands/deploy/definition";
import exec from "@commands/exec/definition";
import upload from "@commands/upload/definition";
import zip from "@commands/zip/definition";
import init from "@commands/init/definition";

process.on("uncaughtException", (e) => Cli.logger.error(e.message, "\n"));

new Cli(
  { deploy, exec, config, zip, upload, init },
  {
    cliName: "rpi",
    rootCommand: false,
    baseLocation: "commands",
    commandsPath: "",
    configFile: { names, parse: c.parse },
    envPrefix: "RPI_",
  },
).run();
