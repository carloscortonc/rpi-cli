import archiver from "archiver";
import path from "path";
import fs from "fs";
import Cli from "cli-er";

/**
 * Zip a given folder
 * @param from Source folder
 * @param to Destination file
 * @returns Promise<void>
 */
export default function zip(from: string, to: string): Promise<void> {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(to);
  return new Promise((resolve, reject) => {
    archive
      .directory(from, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
}

/**
 * Zip a list of directories and/or files
 * @param params.entries List of files/dirs to include
 * @param params.to Target file e.g. "test.zip"
 * @returns Promise<void>
 */
export async function zipEntries(params: {
  entries: { type: "file" | "dir"; path: string }[];
  to: string;
  log?: boolean;
}) {
  return new Promise<void>((resolve, reject) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const stream = fs.createWriteStream(params.to);
    archive.pipe(stream);

    const root = path.dirname(params.to);
    const rootName = path.parse(params.to).name;

    stream.on("close", () => resolve());
    archive.on("error", (err) => reject(err));

    for (const entry of params.entries) {
      const p = path.resolve(entry.path);
      const name = path.join(rootName, path.relative(root, entry.path));
      params.log && Cli.logger.log("[zip] Adding ", name, "\n");
      if (entry.type === "dir") {
        archive.directory(p, name);
      } else {
        archive.file(p, { name });
      }
    }
    archive.finalize();
  });
}
