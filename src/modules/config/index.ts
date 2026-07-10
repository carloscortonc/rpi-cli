import fs from "fs";
import os from "os";
import path from "path";
import { stringify, parse as iniParse } from "ini";
import op from "object-path";

export const names = [".rpirc"];

class Config {
  config: Record<string, any> = {};
  exists = false;
  // By default, create file in home dir
  filepath: string = path.join(os.homedir(), names[0]);

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
    this.exists = true;
  }

  write() {
    fs.writeFileSync(this.filepath, stringify(this.config));
  }

  delete(key: string) {
    op.del(this.config, key);
  }
}

export default new Config();
