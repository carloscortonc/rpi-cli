import config from "@modules/config";
import { requireConfig } from "@modules/config/utils";
import { spawn } from "child_process";
import path from "path";

export async function executeScript(name: string, params: Record<string, string> = {}): Promise<void> {
  // Check first if required configuration is present
  await requireConfig({ ip: "Server IP address", user: "Server user" });
  const [_name, ...args] = name.split(" ");
  const location = path.join(__dirname, "..", "scripts", _name);
  // TODO check for valid location
  return new Promise((resolve, reject) => {
    // TODO "win32" support https://www.npmjs.com/package/shelljs
    const child = spawn("sh", [location, ...args], {
      shell: true,
      cwd: path.dirname(location),
      env: {
        ...process.env,
        IP: config.get("ip"),
        USER: config.get("user"),
        ...params,
      },
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on("close", (code) => (code === 0 ? resolve() : reject()));
  });
}

export async function executeRemoteCommand(command: string, args: string[] = []): Promise<void> {
  // Check first if required configuration is present
  await requireConfig({ ip: "Server IP address", user: "Server user" });
  return new Promise((resolve, reject) => {
    // TODO "win32" support https://www.npmjs.com/package/shelljs
    const child = spawn("ssh", [`${config.get("user")}@${config.get("ip")}`, `"${command}"`, ...args], {
      shell: true,
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on("close", (code) => (code === 0 ? resolve() : reject()));
  });
}
