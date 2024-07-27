import config from "@modules/config";
import { requireConfig } from "@modules/config/utils";
import { spawn } from "child_process";
import path from "path";

export async function executeScript(
  name: string,
  params: Record<string, string> = {},
  serverId: string = "default"
): Promise<void> {
  // Check first if required configuration is present
  const [ip, user] = ["ip", "user"].map((e) => serverId.concat(".", e));
  await requireConfig({ [ip]: "Server IP address", [user]: "Server user" });
  const location = path.join(__dirname, "..", "scripts", name);
  // TODO check for valid location
  return new Promise((resolve, reject) => {
    // TODO "win32" support
    const child = spawn("sh", [location], {
      shell: true,
      cwd: path.dirname(location),
      env: {
        ...process.env,
        IP: config.get(ip) as string,
        USER: config.get(user) as string,
        ...params,
      },
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on("close", (code) => (code === 0 ? resolve() : reject()));
  });
}
