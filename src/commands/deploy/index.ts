import path from "path";
import Cli from "cli-er";
import { executeScript } from "@modules/execute";
import definition from "./definition";

export default function (options: Cli.CommandOptions<typeof definition>) {
  const location = path.isAbsolute(options.location)
    ? options.location
    : path.join(process.cwd(), options.location);
  const scriptName = options.type.concat("_deploy.sh");
  const variables = options.variables.reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    return { ...acc, [key]: value };
  }, {});
  executeScript(scriptName, { LOCATION: location, ...variables });
}
