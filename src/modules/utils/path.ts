import path from "path";

export const finalPath = (p: string) => (!p || path.isAbsolute(p) ? p : path.join(process.cwd(), p));
