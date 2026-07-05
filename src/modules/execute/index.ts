import config from "@modules/config";
import { requireConfig } from "@modules/config/utils";
import { resolveShell, resolveSsh } from "@modules/utils/shell";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

export async function executeScript(name: string, params: Record<string, string> = {}): Promise<void> {
  // Check first if required configuration is present
  await requireConfig({ ip: "Server IP address", user: "Server user" });
  const [_name, ...args] = name.split(" ");
  const location = path.join(__dirname, "..", "scripts", _name);
  const [sh, ...shArgs] = resolveShell();
  const ssh = resolveSsh();

  return new Promise((resolve) => {
    const child = spawn(sh, [...shArgs, location, ...args], {
      shell: false,
      cwd: path.dirname(location),
      env: {
        ...process.env,
        IP: config.get("ip"),
        USER: config.get("user"),
        SSH: ssh,
        ...params,
      },
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on("close", resolve);
  });
}

export async function executeRemoteCommand(
  command: string,
  params: { args: string[]; stdin?: fs.ReadStream } = { args: [] },
): Promise<void> {
  // Check first if required configuration is present
  await requireConfig({ ip: "Server IP address", user: "Server user" });
  const ssh = resolveSsh();

  return new Promise((resolve, reject) => {
    const child = spawn(ssh, [`${config.get("user")}@${config.get("ip")}`, command, ...params.args], {
      shell: false,
      stdio: [params.stdin ? "pipe" : "inherit", "pipe", "pipe"],
    });
    if (params.stdin) {
      params.stdin.pipe(child.stdin!);
    }
    child.stdout!.pipe(process.stdout);
    child.stderr!.pipe(process.stderr);
    child.on("close", (code) => (code === 0 ? resolve() : reject()));
  });
}
