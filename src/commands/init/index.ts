import Cli from "cli-er";
import { prompt } from "enquirer";
import { executeScript } from "@modules/execute";
import definition from "./definition";

export default async function (options: Cli.CommandOptions<typeof definition>) {
  const flags = {
    INSTALL_NGINX: "Configure nginx for web applications (Y/n)",
  };
  const params = await prompt<Record<string, string>>(
    Object.keys(flags).map((name) => ({
      type: "input",
      name,
      message: flags[name],
    })),
  )
    .then((r) =>
      Object.entries(r).reduce(
        (acc, [k, v]) => ({
          ...acc,
          [k]: [undefined, "", "y"].includes(v) ? "1" : "0",
        }),
        {},
      ),
    )
    .catch((e) => {
      Cli.logger.error(e.message, "\n");
      process.exit(1);
    });
  executeScript("init.sh", params).catch((e) => {
    Cli.logger.error("There was a problem executing the script.", e.message, "\n");
  });
}
