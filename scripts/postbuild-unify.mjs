/* Une seule application en ligne : index.html = vue corps animé (Blender).
 * L'ancien atlas reste disponible sur /ancien-atlas.html en chargement différé. */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const index = path.join(dist, "index.html");
const v2 = path.join(dist, "v2.html");
const legacy = path.join(dist, "ancien-atlas.html");
const classique = path.join(dist, "classique.html");

if (!fs.existsSync(v2)) throw new Error("dist/v2.html absent");
if (!fs.existsSync(index)) throw new Error("dist/index.html absent");

fs.copyFileSync(v2, legacy);
for (const old of [v2, classique]) {
  if (fs.existsSync(old)) fs.rmSync(old);
}

/* Identifiant de build : court sha + date. Sert à versionner les GLB et le SW. */
let sha = "local";
try {
  sha = execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
} catch { /* hors dépôt */ }
const build = `${sha}-${new Date().toISOString().slice(0, 10)}`;

let html = fs.readFileSync(index, "utf8");
html = html.replace(/data-build="[^"]*"/, `data-build="${build}"`);
fs.writeFileSync(index, html);

const swPath = path.join(dist, "sw.js");
if (fs.existsSync(swPath)) {
  let sw = fs.readFileSync(swPath, "utf8");
  sw = sw.replace(/const CACHE_VERSION = "[^"]+";/, `const CACHE_VERSION = "corps-${build}";`);
  sw = sw.replace(/"__BUILD__"/, `"${build}"`);
  fs.writeFileSync(swPath, sw);
}

const legacyHtml = fs.readFileSync(legacy, "utf8");
for (const marqueur of ["id=\"patho-list\"", "id=\"hunt-modes\"", "id=\"btn-sources\"", "id=\"coupe-hud\""]) {
  if (!legacyHtml.includes(marqueur)) throw new Error(`ancien-atlas.html incomplet : marqueur ${marqueur} absent`);
}
if (!html.includes("cp-view") || !html.includes("data-build")) {
  throw new Error("index.html unifié incomplet");
}

/* Seuls les modèles optimisés sont publiés : les GLB bruts de 53 Mo restent
 * dans docs/models/ (source Blender), pas dans le site. */
const srcModels = path.join(root, "docs", "models");
const dstModels = path.join(dist, "docs", "models");
if (fs.existsSync(srcModels)) {
  fs.mkdirSync(dstModels, { recursive: true });
  for (const f of fs.readdirSync(srcModels)) {
    if (f.endsWith("-opt.glb") || f === "catalog.json") {
      fs.copyFileSync(path.join(srcModels, f), path.join(dstModels, f));
    }
  }
}

console.log(`[unify] index.html = corps animé (${build}) ; ancien atlas = ancien-atlas.html`);
