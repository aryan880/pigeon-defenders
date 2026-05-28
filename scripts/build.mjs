import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

await cp(join(root, "src/pages"), dist, { recursive: true });
await cp(join(root, "src/styles/main.css"), join(dist, "styles.css"));
await cp(join(root, "src/scripts/main.js"), join(dist, "script.js"));
await cp(join(root, "public"), dist, { recursive: true });

console.log("Built Pigeon Defenders site to dist/");
