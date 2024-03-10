import config from "@modules/config";
import Cli from "cli-er";
import { prompt } from "enquirer";

/**
 * Validate a list of config keys
 * @param keys Object containing {[key]: description } to check if present in configuration
 */
export async function validate(keys: Record<string, string>) {
  const missingKeys = Object.keys(keys).filter((k) => !config.get(k));
  if (missingKeys.length === 0) {
    return;
  }
  Cli.logger.log("\nInput the following required configuration:\n");
  return prompt(
    missingKeys.map((name) => ({
      type: "input",
      name,
      message: keys[name],
      required: true,
    }))
  )
    .then((values) => {
      for (const [k, v] of Object.entries(values)) {
        config.set(k, v);
      }
    })
    .catch(() => {});
}
