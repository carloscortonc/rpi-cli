import Cli from "cli-er";
import fs from "fs";
import definition from "./definition";
import { executeRemoteCommand } from "@modules/execute";
import { finalPath } from "@modules/utils/path";

export default async function (params: Cli.CommandOptions<typeof definition>) {
  // Check if a script location is provided
  const locationOrCmd = finalPath(params.args[0]);
  // Check if a file was provided
  if (fs.existsSync(locationOrCmd)) {
    // Instead of relying on shell `<` redirection, pipe the file into stdin.
    // This works correctly on both Unix and Windows.
    return executeRemoteCommand("bash -s", {
      args: params.args.slice(1),
      stdin: fs.createReadStream(locationOrCmd),
    }).catch(() => {});
  }
  return executeRemoteCommand(params.args.join(" ")).catch(() => {});
}
