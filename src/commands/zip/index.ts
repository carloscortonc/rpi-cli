import Cli from "cli-er";
import definition from "./definition";
import zip from "@modules/utils/zip";
import { finalPath } from "@modules/utils/path";

export default function ({ location, destination }: Cli.CommandOptions<typeof definition>): Promise<void> {
  const [resolvedLocation, optResolvedDestination] = [location, destination].filter((e) => e).map((e) => finalPath(e!));
  const resolvedDestination = optResolvedDestination || resolvedLocation.concat(".zip");

  return zip(resolvedLocation, resolvedDestination);
}
