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
 * @param params.int Name for intermediate folders, if required (default: "_")
 * @returns Promise<rootDir>
 */
export async function zipEntries(params: {
  entries: { type: "file" | "dir"; path: string }[];
  to: string;
  int?: string;
  log?: boolean;
}) {
  return new Promise<string>((resolve, reject) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const stream = fs.createWriteStream(params.to);
    archive.pipe(stream);

    const root = path.dirname(params.to);
    const rootName = path.parse(params.to).name;
    const init = params.int || "_";

    const prevPathRegex = /(?<=(^|\/))\.\.(\/|$)/g;
    // Calculate the total count of parent directories per entry
    const entriesInfo = params.entries
      .map((e) => ({ ...e, path: path.relative(root, e.path) }))
      .map((e) => ({ ...e, count: e.path.match(prevPathRegex)?.length || 0 }));
    const maxCount = Math.max(...entriesInfo.map((e) => e.count));
    const rootDir = path.join(...Array(maxCount).fill(init));

    stream.on("close", () => resolve(rootDir));
    archive.on("error", (err) => reject(err));

    for (const entry of entriesInfo) {
      const p = path.resolve(entry.path);
      // Compose the final name: "{zip-name}/{..._}/{path}"
      const name = path.join(
        rootName,
        ...Array(maxCount - entry.count).fill(init),
        entry.path.replace(prevPathRegex, ""),
      );
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
