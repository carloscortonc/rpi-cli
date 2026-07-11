import Cli from "cli-er";
import config from "@modules/config";
import definition from "./definition";
import { stringify } from "ini";

type ConfigParams = Cli.NamespaceOptions<typeof definition>;
export const get = (params: ConfigParams["get"]) => {
  // Check if config file exists
  if (!config.exists) {
    return Cli.logger.log("Config file not found at ".concat(config.filepath, "\n"));
  }
  const content = params.key !== undefined ? config.get(params.key, "No value found") : config.config;
  Cli.logger.log(
    typeof content === "string" ? content : stringify(content, { whitespace: true, align: true }).replace(/\r?\n$/, ""),
    "\n",
  );
};

export const set = (params: ConfigParams["set"]) => {
  const exists = config.exists;
  config.set({ [params.key]: params.value });
  Cli.logger.log(
    `Config value for \'${params.key}\' successfully updated`,
    !exists ? ` on ${config.filepath}` : "",
    "\n",
  );
};

export const del = (params: ConfigParams["del"]) => {
  if (config.get(params.key) === undefined) {
    return Cli.logger.error(`Config key \'${params.key}\' not found\n`);
  }
  config.delete(params.key);
  Cli.logger.log(`Config key \'${params.key}\' successfully deleted\n`);
};
