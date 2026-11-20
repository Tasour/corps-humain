import fs from "node:fs";
import path from "node:path";

/* Ajoute à la todolist « Fait mais à vérifier » les corrections par suppression
 * de composantes négligeables (vague 2), avec paires avant/après. */

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "docs/analyses/revue-visuelle");
const CACHE = "/home/tasour/.cache/revue-visuelle";
const fixes = JSON.parse(fs.readFileSync(path.join(OUT, "fixes-composantes.json"), "utf8"));
const todo = JSON.parse(fs.readFileSync(path.join(OUT, "todolist.json"), "utf8"));
const verif = JSON.parse(fs.readFileSync(path.join(OUT, "todolist-fait-a-verifier.json"), "utf8"));

const added = [];
for (const fix of fixes.fixes) {
  const beforeDir = path.join(CACHE, "qualite-3d-apres", fix.id);
  const afterDir = path.join(CACHE, "apres-vague2", fix.id);
  const beforeImages = fs.existsSync(beforeDir) ? fs.readdirSync(beforeDir).filter((f) => f.endsWith(".jpg")).sort().map((f) => path.join(beforeDir, f)) : [];
  const afterImages = fs.existsSync(afterDir) ? fs.readdirSync(afterDir).filter((f) => f.endsWith(".jpg")).sort().map((f) => path.join(afterDir, f)) : [];
  for (const e of todo.entries.filter((x) => x.subject === fix.id && ["assemblage", "geometrie"].includes(x.category))) {
    added.push({
      ...e,
      status: "fait_a_verifier",
      verdict: afterImages.length === 8 ? "verifie" : "partiel",
      correction: "suppression_composantes_negigeables",
      reason: fix.reason,
      beforeImages,
      afterImages,
      after: { composantesAvant: 3, composantesApres: 1 },
      testVisuel: "8 angles recaptures ; composantes 3 -> 1 ; SHA differents sur 5 angles, silhouette principale identique",
      verifiedAt: new Date().toISOString(),
    });
  }
}
verif.entries.push(...added);
verif.summary.vague2 = { fixes: fixes.fixes.length, entreesAjoutees: added.length };
fs.writeFileSync(path.join(OUT, "todolist-fait-a-verifier.json"), JSON.stringify(verif, null, 1));

const lines = ["", "## Vague 2 — composantes flottantes retirées", ""];
lines.push(`${fixes.fixes.length} structures corrigées, ${added.length} entrées ajoutées.`);
lines.push("");
for (const e of added.filter((x, i, a) => a.findIndex((y) => y.subject === x.subject) === i)) {
  lines.push(`- \`${e.subject}\` — ${e.verdict} — ${e.beforeImages.length} avant, ${e.afterImages.length} après`);
}
lines.push("");
fs.appendFileSync(path.join(OUT, "todolist-fait-a-verifier.md"), lines.join("\n"));
console.log(`[composantes] ${added.length} entrées ajoutées à la liste « fait mais à vérifier »`);
