import yaml from "js-yaml";
import fs from "fs/promises";

export const readYaml = async <T = any>(filePath: string): Promise<T> => {
  const fileContents = await fs.readFile(filePath, "utf8");
  return yaml.load(fileContents);
};
