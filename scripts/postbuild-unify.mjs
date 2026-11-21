/* La build Vite produit deux entrées : index.html (v1 classique) et v2.html.
 * L'application unifiée est v2 : on la sert à la racine et on conserve
 * l'ancienne page sous classique.html pour ne rien perdre. */

import fs from "node:fs";
import path from "node:path";

const dist = path.resolve(import.meta.dirname, "../dist");
const index = path.join(dist, "index.html");
const v2 = path.join(dist, "v2.html");
const classique = path.join(dist, "classique.html");

if (!fs.existsSync(v2)) throw new Error("dist/v2.html absent");
if (!fs.existsSync(index)) throw new Error("dist/index.html absent");
if (fs.existsSync(classique)) fs.rmSync(classique);
fs.renameSync(index, classique);
fs.copyFileSync(v2, index);
const unifie = fs.readFileSync(index, "utf8");
for (const marqueur of ["id=\"patho-list\"", "id=\"hunt-modes\"", "id=\"btn-sources\"", "id=\"coupe-hud\""]) {
  if (!unifie.includes(marqueur)) throw new Error(`index.html unifié incomplet : marqueur ${marqueur} absent`);
}
console.log("[unify] index.html = application unifiée ; classique.html = ancienne v1");
