import config from "@modules/config";
import Cli from "cli-er";
import { prompt } from "enquirer";

/**
 * Validate a list of config keys
 * @param keys Object containing {[key]: description } to check if present in configuration
 */
export async function requireConfig(
  keys: Record<string, string>,
  override = false
) {
  const missingKeys = override
    ? keys
    : Object.entries(keys)
        .filter(([k]) => !config.get(k))
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  if (Object.keys(missingKeys).length === 0) {
    return;
  }
  Cli.logger.log("\nInput the following required configuration:\n");
  return request(missingKeys).then((values) => {
    config.set(values!);
  });
}

export async function request(keys: Record<string, string>) {
  return prompt(
    Object.keys(keys).map((name) => ({
      type: "input",
      name,
      message: keys[name],
      required: true,
    }))
  ).catch(() => {
    throw new Error("There was a problem requesting information");
  });
}
