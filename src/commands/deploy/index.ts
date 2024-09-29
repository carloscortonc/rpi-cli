import Cli from "cli-er";
import { executeScript } from "@modules/execute";
import definition from "./definition";
import zip from "@modules/utils/zip";
import { finalPath } from "@modules/utils/path";

export default async function (options: Cli.CommandOptions<typeof definition>) {
  const [location, envFile] = [options.location, options.envFile!].map(finalPath);
  const scriptName = options.type.concat("_deploy.sh");
  const variables = options.variables.reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    return { ...acc, [key]: value };
  }, {});
  // web/build-on-target: create zip from source folder
  if (options.type === "web" || options.buildOnTarget) {
    await zip(location, location.concat(".zip"));
  }
  const allVars = options.variables.join(" ");
  executeScript(scriptName, {
    ...variables,
    LOCATION: location,
    APP_NAME: options.name!,
    VARS: allVars,
    ENVFILE: envFile,
    LOGS: options.logs.toString(),
    BUILD_ON_TARGET: options.buildOnTarget.toString(),
  });
}
