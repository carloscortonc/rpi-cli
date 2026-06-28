import Cli from "cli-er";
import definition from "./definition";
import { finalPath } from "@modules/utils/path";
import { executeScript } from "@modules/execute";

export default async function (params: Cli.CommandOptions<typeof definition>): Promise<void> {
  const locations = params.files.map(finalPath);

  return executeScript(
    "upload.sh ".concat(locations.join(" ")),
    params.destination ? { DESTINATION: params.destination } : {},
  );
}
