/* Une seule application en ligne : les deux champions figés, homme et femme.
 * Les autres candidats restent dans le dépôt comme archive, hors dist. */

import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const index = path.join(dist, "index.html");
if (!fs.existsSync(index)) throw new Error("dist/index.html absent");

/* Identifiant de build : court sha + date. */
let sha = "local";
try {
  sha = execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
} catch { /* hors dépôt */ }
const build = `${sha}-${new Date().toISOString().slice(0, 10)}`;

/* Empreinte de la géométrie publiée : manifestes + chunks Body Atlas. */
const modelsDir = path.join(root, "docs", "models");
const atlasDir = path.join(modelsDir, "body-atlas");
const geometry = {};
for (const f of fs.readdirSync(atlasDir).sort()) {
  const fp = path.join(atlasDir, f);
  if (!fs.statSync(fp).isFile()) continue;
  geometry[f] = createHash("sha256")
    .update(fs.readFileSync(path.join(atlasDir, f))).digest("hex");
}
const geometryHash = createHash("sha256")
  .update(JSON.stringify(geometry)).digest("hex").slice(0, 16);
fs.mkdirSync(path.join(root, "docs", "analyses"), { recursive: true });
fs.writeFileSync(path.join(root, "docs", "analyses", "build-geometry.json"),
  JSON.stringify({ build, geometry, combined: geometryHash }, null, 1) + "\n");

let html = fs.readFileSync(index, "utf8");
html = html.replace(/data-build="[^"]*"/, `data-build="${build}"`);
html = html.replace(/<html\b/, `<html data-geometry="${geometryHash}"`);
if (!html.includes("cp-view") || !html.includes("data-build")) {
  throw new Error("index.html incomplet");
}
if (html.includes("ancien-atlas")) {
  throw new Error("ancienne source encore présente dans index.html");
}
const mainBundle = fs.readdirSync(path.join(dist, "assets"))
  .find((f) => f.startsWith("main-") && f.endsWith(".js"));
if (mainBundle && !html.includes(`assets/${mainBundle}`)) {
  html = html.replace("</head>", `<link rel="modulepreload" href="./assets/${mainBundle}"></head>`);
}
fs.writeFileSync(index, html);

const swPath = path.join(dist, "sw.js");
if (fs.existsSync(swPath)) {
  let sw = fs.readFileSync(swPath, "utf8");
  sw = sw.replace(/const CACHE_VERSION = "[^"]+";/, `const CACHE_VERSION = "corps-${build}";`);
  sw = sw.replace(/"__BUILD__"/, `"${build}"`);
  fs.writeFileSync(swPath, sw);
}

/* Publier uniquement les deux champions. */
const dstModels = path.join(dist, "docs", "models");
fs.mkdirSync(dstModels, { recursive: true });
for (const f of fs.readdirSync(dstModels)) {
  const p = path.join(dstModels, f);
  if (fs.statSync(p).isDirectory()) fs.rmSync(p, { recursive: true, force: true });
  else fs.rmSync(p, { force: true });
}
fs.cpSync(path.join(modelsDir, "forks", "seema"),
  path.join(dstModels, "forks", "seema"), { recursive: true });
fs.cpSync(path.join(modelsDir, "male-genitalia"),
  path.join(dstModels, "male-genitalia"), { recursive: true });
const femaleSrc = path.join(modelsDir, "body-atlas");
const femaleDst = path.join(dstModels, "body-atlas");
fs.mkdirSync(femaleDst, { recursive: true });
fs.copyFileSync(path.join(femaleSrc, "atlas-female-meshopt.json"),
  path.join(femaleDst, "atlas-female-meshopt.json"));
for (const f of fs.readdirSync(femaleSrc)) {
  if (/^female-meshopt-\d+\.bin$/.test(f) || /^female-supplements\.(json|bin\.gz)$/.test(f)) {
    fs.copyFileSync(path.join(femaleSrc, f), path.join(femaleDst, f));
  }
}
for (const source of ["seema", "bodyatlas"]) {
  fs.copyFileSync(path.join(modelsDir, `selection-descriptions-${source}.json`),
    path.join(dstModels, `selection-descriptions-${source}.json`));
}
for (const old of [
  "v2.html", "classique.html", "ancien-atlas.html", "models", "structures",
  "textures", "data", "screenshots", "v2-style.css",
]) {
  const p = path.join(dist, old);
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

console.log(`[unify] index.html = champions seema + bodyatlas (${build})`);
