#!/usr/bin/env node
import Cli from "cli-er";
import c from "@modules/config";
// import command definitions
import config from "@commands/config/definition";
import deploy from "@commands/deploy/definition";
import zip from "@commands/zip/definition";
import init from "@commands/init/definition";

new Cli(
  { deploy, config, zip, init },
  {
    cliName: "rpi",
    rootCommand: false,
    configFile: { names: [".rpirc"], parse: c.parse },
  },
).run();
