import path from "path";
import Cli from "cli-er";
import { executeScript } from "@modules/execute";
import definition from "./definition";
import zip from "@modules/utils/zip";

export default async function (options: Cli.CommandOptions<typeof definition>) {
  const location = path.isAbsolute(options.location)
    ? options.location
    : path.join(process.cwd(), options.location);
  const scriptName = options.type.concat("_deploy.sh");
  const variables = options.variables.reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    return { ...acc, [key]: value };
  }, {});
  // build-on-target: create zip from source folder
  if (options.buildOnTarget) {
    await zip(location, location.concat(".zip"));
  }
  const allVars = options.variables.join(" ");
  executeScript(scriptName, {
    ...variables,
    LOCATION: location,
    APP_NAME: options.name!,
    VARS: allVars,
    BUILD_ON_TARGET: options.buildOnTarget.toString(),
  });
}
