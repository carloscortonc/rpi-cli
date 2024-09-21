import fs from "fs";
import { stringify, parse as iniParse } from "ini";
import op from "object-path";

class Config {
  config: object = {};
  filepath: string = process.cwd();

  constructor() {
    this.parse = this.parse.bind(this);
  }

  parse(content: string, filepath: string) {
    this.filepath = filepath;
    this.config = iniParse(content);
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
  }
}

export default new Config();
