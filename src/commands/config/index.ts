import Cli from "cli-er";
import config from "@modules/config";
import definition from "./definition";
import { stringify } from "ini";

type ConfigParams = Cli.CommandOptions<typeof definition>;
const operations = {
  get: ({ key }: ConfigParams) => {
    const content = key !== undefined ? config.get(key, "Not value found") : config.config;
    Cli.logger.log(typeof content === "string" ? content : stringify(content, { whitespace: true }));
  },
  set: ({ key, value }: ConfigParams) => {
    config.set({ [key!]: value });
    Cli.logger.log(`Config value for \`${key}\` successfully updated\n`);
  },
};

export default function (params: ConfigParams) {
  // Allow alias: `config x` == `config get x`
  if (!["get", "set"].includes(params.operation)) {
    params.key = params.operation;
    params.operation = "get";
  }
  operations[params.operation](params);
}
