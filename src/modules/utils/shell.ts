import { execSync } from "child_process";

/** Returns the path to a usable sh-compatible shell on any platform */
export function resolveShell() {
  if (process.platform !== "win32") {
    return ["sh"];
  }
  const candidates = [
    // Git for Windows ships sh.exe and ssh.exe — it's the most common Windows dev setup
    { cmd: "C:\\Program Files\\Git\\bin\\sh.exe" },
    { cmd: "C:\\Program Files (x86)\\Git\\bin\\sh.exe" },
    // Fall back to WSL if available
    { cmd: "wsl", value: ["wsl", "--", "sh"] },
  ];
  for (const c of candidates) {
    try {
      const v = c.value ? c.value : [c.cmd];
      execSync(v.join(" ").concat(" --version"), { stdio: "ignore" });
      return v;
    } catch {
      // not found at this path, try next
    }
  }
  throw new Error(
    "No compatible shell found on Windows.\n" + "Please install Git for Windows (https://git-scm.com) or enable WSL.",
  );
}

/** Returns the path to a usable ssh binary on any platform */
export function resolveSsh(): string {
  if (process.platform !== "win32") {
    return "ssh";
  }
  const candidates = [
    // Windows 10/11 ships OpenSSH as an optional feature
    "ssh",
    // Fall back to Git for Windows ssh
    "C:\\Program Files\\Git\\usr\\bin\\ssh.exe",
    "C:\\Program Files (x86)\\Git\\usr\\bin\\ssh.exe",
  ];

  for (const c of candidates) {
    try {
      execSync(c.concat(" -V"), { stdio: "ignore" });
      return c;
    } catch {
      // not found at this path
    }
  }
  throw new Error(
    "No compatible ssh found on Windows.\n" +
      "Please install Git for Windows (https://git-scm.com) or enable the OpenSSH optional feature.",
  );
}
