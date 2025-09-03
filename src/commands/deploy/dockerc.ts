//@ts-nocheck
import Cli from "cli-er";
import fs from "fs";
import path from "path";
import { executeScript } from "@modules/execute";
import definition from "./definition";
import { zipEntries } from "@modules/utils/zip";
import { finalPath } from "@modules/utils/path";
import { readYaml } from "@modules/utils/fs";
import { type Compose } from "@json-types/compose";

type DockerCParams = Cli.NamespaceOptions<typeof definition>["dockerc"] & { __?: string[] };
export default async function (options: DockerCParams) {
  const files = options.files.map(finalPath);
  // Create the folder in cwd
  const location = path.join(process.cwd(), "dockerc-".concat(Math.floor(Date.now() / 1000).toString(), ".zip"));

  // Build on target: create a list of folders and files required for the build
  if (options.buildOnTarget) {
    /**
     * !!! Currently works only if such folders/files live under `params.files`
     * !!! A workaround to this could be creating intermediate dirs e.g.
     *
     *  entries: ["../../dir-1", "../../dir-2"]
     *
     *  zipped folder:
     *   /dir-1
     *   /dir-2
     *   /_/_/docker-compose.yaml
     */
    Cli.logger.log("[build-on-target] Preparing files ...\n");
    const entries: { type: "file" | "dir"; path: string }[] = [];
    // Include all provided files
    entries.push(...files.map((f) => ({ type: "file", path: f } as const)));
    // List of contexts that need to be copied
    const dcFiles = await Promise.all(files.map((f) => readYaml<Compose>(f)));
    for (const dc of dcFiles) {
      // Top level config+secrets
      Object.values({ ...dc.configs, ...dc.secrets }).forEach(
        (c) => c.file && entries.push({ type: "file", path: c.file }),
      );
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

    await zipEntries({ entries, to: location, log: true });
  }

  executeScript("dockerc_deploy.sh", {
    LOCATION: location,
    COMPOSE_ARGS: "-f ".concat(options.files.join(" -f ")),
    BUILD_ARGS: (options.__ || []).join(" "),
    LOGS: options.logs.toString(),
    BUILD_ON_TARGET: options.buildOnTarget.toString(),
  });
}
