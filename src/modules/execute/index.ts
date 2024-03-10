import config from "@modules/config";
import { validate } from "@modules/config/utils";
import { spawn } from "child_process";
import path from "path";

export async function executeScript(
  name: string,
  params: Record<string, string> = {}
): Promise<void> {
  // Check first if required configuration is present
  await validate({ ip: "Server IP address", user: "Server user" });
  const location = path.join(__dirname, "..", "scripts", name);
  // TODO check for valid location
  return new Promise((resolve, reject) => {
    // TODO "win32" support
    const child = spawn("sh", [location], {
      shell: true,
      cwd: path.dirname(location),
      env: {
        IP: config.get("ip") as string,
        USER: config.get("user") as string,
        ...params,
      },
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on("close", (code) => (code === 0 ? resolve() : reject()));
  });
}
