import Cli from "cli-er";
import { executeScript } from "@modules/execute";
import definition from "./definition";
import zip from "@modules/utils/zip";
import { finalPath } from "@modules/utils/path";

type DockerParams = Cli.NamespaceOptions<typeof definition>["docker"];
export default async function (options: DockerParams) {
  const location = finalPath(options.location);

  // build-on-target: create zip from source folder
  if (options.buildOnTarget) {
    await zip(location, location.concat(".zip"));
  }

  return executeScript("docker_deploy.sh", {
    LOCATION: location,
    APP_NAME: options.name!,
    RUN_ARGS: options.__?.join(" ") || "",
    LOGS: options.logs.toString(),
    BUILD_ON_TARGET: options.buildOnTarget.toString(),
  });
}
