import archiver from "archiver";
import fs from "fs";

/**
 * Zip a given folder
 * @param from Source folder
 * @param to Destination file
 * @returns void
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
