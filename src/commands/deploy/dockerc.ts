import Cli from "cli-er";
import fs from "fs";
import path from "path";
import { executeScript } from "@modules/execute";
import definition from "./definition";
import { zipEntries } from "@modules/utils/zip";
import { finalPath } from "@modules/utils/path";
import { readYaml } from "@modules/utils/fs";
import { type Compose } from "@json-types/compose";
import { minimatch } from "minimatch";

// TODO --dryRun => list files to be included

type DockerCParams = Cli.NamespaceOptions<typeof definition>["dockerc"];
export default async function (options: DockerCParams) {
  const files = options.files.map(finalPath);
  const rootFolder = path.dirname(files[0]);
  // Create the folder in cwd, using current dir as name
  const location = path.join(rootFolder, path.basename(rootFolder)).concat(".zip");
  let rootDir: string;

  // Build on target: create a list of folders and files required for the build
  Cli.logger.log("[build-on-target] Preparing files ...\n");
  let entries: { type: "file" | "dir"; path: string }[] = [];
  // Include all provided files
  entries.push(...files.map((f) => ({ type: "file", path: f } as const)));
  // List of contexts that need to be copied
  const dcFiles = await Promise.all(files.map((f) => readYaml<Compose>(f)));
  for (const dc of dcFiles) {
    // Top level config+secrets
    Object.values({ ...dc.configs, ...dc.secrets }).forEach(
      (c) => c.file && entries.push({ type: "file", path: c.file }),
    );
    // TODO: dc.volumes
    // TODO: dc.include
    const services = Object.values(dc.services || {});
    for (const s of services) {
      // Env files
      if (s.env_file) {
        const ef = typeof s.env_file === "string" ? [s.env_file] : s.env_file;
        ef.forEach((e) => entries.push({ type: "file", path: typeof e === "string" ? e : e.path }));
      }
      // Service extends
      typeof s.extends !== "string" && s.extends?.file && entries.push({ type: "file", path: s.extends.file });

      // Volumes
      if (s.volumes) {
        entries.push(
          ...s.volumes
            .map((v) => (typeof v == "string" ? v.split(":")[0] : v.source!))

            .map((v) => ({ type: "file" as const, path: v })),
        );
      }
      // Check build information
      if (!s.build) {
        continue;
      }
      if (typeof s.build === "string") {
        entries.push({ type: "dir", path: s.build });
        continue;
      }
      // Check dockerfile param
      s.build.dockerfile && entries.push({ type: "file", path: s.build.dockerfile });
      s.build.context && entries.push({ type: "dir", path: s.build.context });
      // process additional contexts
      const additCtx = Array.isArray(s.build.additional_contexts)
        ? s.build.additional_contexts.map((c) => c.replace(/\w+=(.+)/, "$1"))
        : (Object.values(s.build!.additional_contexts || {}) as string[]);
      if (additCtx.length) {
        // Not all of additional contexts are fs paths, so we will have to filter them
        entries.push(
          ...additCtx
            .map((c) => c.replace(/\w+=(.+)/, "$1"))
            .filter((p) => fs.existsSync(p))
            .map((p) => ({ type: "dir", path: p } as const)),
        );
      }
    }
  }

  // Check if entry exists && apply exclusions to entries
  entries = entries.filter((e) => fs.existsSync(e.path) && !options.exclude.some((ex) => minimatch(e.path, ex)));

  rootDir = await zipEntries({ entries, to: location, log: true });

  executeScript("dockerc_deploy.sh", {
    LOCATION: location,
    COMPOSE_ARGS: "-f ".concat(options.files.map((f) => path.join(rootDir, f)).join(" -f ")),
    BUILD_ARGS: (options.__ || []).join(" "),
    LOGS: options.logs.toString(),
    BUILD_ON_TARGET: "true",
  });
}
