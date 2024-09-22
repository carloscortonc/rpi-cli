import Cli from "cli-er";
import path from "path";
import definition from "./definition";
import zip from "@modules/utils/zip";

export default function ({
  location,
  destination,
}: Cli.CommandOptions<typeof definition>): Promise<void> {
  const [resolvedLocation, optResolvedDestination] = [location, destination]
    .filter((e) => e)
    .map((e) =>
      path.isAbsolute(e!) ? path.resolve(e!) : path.join(process.cwd(), e!)
    );
  const resolvedDestination =
    optResolvedDestination || resolvedLocation.concat(".zip");

  return zip(resolvedLocation, resolvedDestination);
}
