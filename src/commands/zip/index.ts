import Cli from "cli-er";
import path from "path";
import fs from "fs";
import archiver from "archiver";
import definition from "./definition";

export default function ({
  location,
  destination,
}: Cli.CommandOptions<typeof definition>): Promise<void> {
  const [resolvedLocation, resolvedDestination] = [location, destination]
    .filter((e) => e)
    .map((e) =>
      path.isAbsolute(e!) ? path.resolve(e!) : path.join(process.cwd(), e!)
    );
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(
    resolvedDestination || resolvedLocation.concat(".zip")
  );
  return new Promise((resolve, reject) => {
    archive
      .directory(resolvedLocation, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
}
