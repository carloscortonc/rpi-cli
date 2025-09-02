import fs from "fs";
import path from "path";
import { stringify, parse as iniParse } from "ini";
import op from "object-path";

export const names = [".rpirc"];

class Config {
  config: object = {};
  exists = false;
  // By default, create file in the current directory
  filepath: string = path.join(process.cwd(), names[0]);

  constructor() {
    this.parse = this.parse.bind(this);
  }

  parse(content: string, filepath: string) {
    this.filepath = filepath;
    this.config = iniParse(content);
    // This method is called by `cli-er` to parse config when a file is found
    this.exists = true;
    return this.config;
  }

  get(key: string, defaultValue?: string) {
    return op.get(this.config, key, defaultValue);
  }

  set(o: object) {
    for (const k of Object.keys(o)) {
      op.set(this.config, k, o[k]);
    }
    fs.writeFileSync(this.filepath, stringify(this.config));
    this.exists = true;
  }
}

export default new Config();
