import Cli from "cli-er";
import { executeScript } from "@modules/execute";
import definition from "./definition";
import zip from "@modules/utils/zip";
import { finalPath } from "@modules/utils/path";

type DockerParams = Cli.NamespaceOptions<typeof definition>["docker"];
export default async function (options: DockerParams) {
  let [location, envFile] = [options.location, options.envFile!].map(finalPath);
  const variables = options.variables.reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    return { ...acc, [key]: value };
  }, {} as Record<string, string>);

  // build-on-target: create zip from source folder
  if (options.buildOnTarget) {
    await zip(location, location.concat(".zip"));
  }
  const allVars = options.variables.join(" ");
  executeScript("docker_deploy.sh", {
    ...variables,
    LOCATION: location,
    APP_NAME: options.name!,
    VARS: allVars,
    ENVFILE: envFile,
    LOGS: options.logs.toString(),
    BUILD_ON_TARGET: options.buildOnTarget.toString(),
  });
}
