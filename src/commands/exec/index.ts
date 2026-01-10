import Cli from "cli-er";
import fs from "fs";
import definition from "./definition";
import { executeRemoteCommand } from "@modules/execute";
import { finalPath } from "@modules/utils/path";

export default async function (params: Cli.CommandOptions<typeof definition>) {
  // Check if a script location is provided
  const locationOrCmd = finalPath(params.args[0]);
  if (fs.existsSync(locationOrCmd)) {
    return executeRemoteCommand("bash -s", ["--", "<", locationOrCmd, ...params.args.slice(1)]).catch(() => {});
  }
  return executeRemoteCommand(params.args.join(" ")).catch(() => {});
}
