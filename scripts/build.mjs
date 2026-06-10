import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const assetVersion = "20260602e";

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

await cp(join(root, "src/pages"), dist, { recursive: true });
await cp(join(root, "src/styles/main.css"), join(dist, "styles.css"));
await cp(join(root, "src/scripts/main.js"), join(dist, "script.js"));
await cp(join(root, "public"), dist, { recursive: true });

const htmlFiles = (await readdir(dist)).filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const path = join(dist, file);
  const html = await readFile(path, "utf8");
  await writeFile(
    path,
    html
      .replaceAll('href="styles.css"', `href="styles.css?v=${assetVersion}"`)
      .replaceAll('src="script.js"', `src="script.js?v=${assetVersion}"`)
  );
}

console.log("Built Pigeon Defenders site to dist/");
