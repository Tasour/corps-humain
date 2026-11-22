/* Une seule application en ligne : index.html (version unifiée).
 * Les anciennes entrées v1/v2 sont supprimées du dist. */

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const index = path.join(dist, "index.html");
const v2 = path.join(dist, "v2.html");
const classique = path.join(dist, "classique.html");

if (!fs.existsSync(v2)) throw new Error("dist/v2.html absent");
if (!fs.existsSync(index)) throw new Error("dist/index.html absent");

fs.copyFileSync(v2, index);
for (const old of [v2, classique]) {
  if (fs.existsSync(old)) fs.rmSync(old);
}

const unifie = fs.readFileSync(index, "utf8");
for (const marqueur of ["id=\"patho-list\"", "id=\"hunt-modes\"", "id=\"btn-sources\"", "id=\"coupe-hud\""]) {
  if (!unifie.includes(marqueur)) throw new Error(`index.html unifié incomplet : marqueur ${marqueur} absent`);
}

// modèles animés pour le widget intégré
const srcModels = path.join(root, "docs", "models");
const dstModels = path.join(dist, "docs", "models");
if (fs.existsSync(srcModels)) {
  fs.mkdirSync(dstModels, { recursive: true });
  for (const f of fs.readdirSync(srcModels)) {
    if (f.endsWith(".glb") || f === "catalog.json") {
      fs.copyFileSync(path.join(srcModels, f), path.join(dstModels, f));
    }
  }
}

console.log("[unify] une seule application : index.html ; modèles copiés dans docs/models");
