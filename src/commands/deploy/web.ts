import Cli from "cli-er";
import { executeScript } from "@modules/execute";
import definition from "./definition";
import zip from "@modules/utils/zip";
import { finalPath } from "@modules/utils/path";

type WebParams = Cli.NamespaceOptions<typeof definition>["web"];
export default async function (options: WebParams) {
  const location = finalPath(options.location);

  await zip(location, location.concat(".zip"));

  executeScript("web_deploy.sh", {
    LOCATION: location,
    APP_NAME: options.name!,
  });
}
