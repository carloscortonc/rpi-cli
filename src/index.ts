#!/usr/bin/env node
import Cli from "cli-er";
import path from "path";
// import command definitions
import config from "@commands/config/definition";
import deploy from "@commands/deploy/definition";

new Cli(
  {
    deploy,
    config,
  },
  {
    cliName: "rpi",
    rootCommand: false,
  }
).run();
