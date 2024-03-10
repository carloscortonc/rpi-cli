import Cli from "cli-er";
import config from "@modules/config";
import definition from "./definition";

type ConfigParams = Cli.CommandOptions<typeof definition>;
const operations = {
  get: ({ key }: ConfigParams) => {
    if (key !== undefined) {
      Cli.logger.log(config.get(key) || "Not value found\n");
    }
    // Print all key-values
    else {
      Cli.logger.log(JSON.stringify(config.store, null, 2), "\n");
    }
  },
  set: ({ key, value }: ConfigParams) => {
    if ([key, value].some((e) => e == undefined)) {
      Cli.logger.error("Missing key/value\n");
    }
    config.set(key!, value);
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
