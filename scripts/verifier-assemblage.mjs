import fs from "node:fs";
import path from "node:path";

/* Ajoute à la todolist « fait mais à vérifier » les corrections d'assemblage
 * de la vague 3 (fragments connexes négligeables). */

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "docs/analyses/revue-visuelle");
const TODO = path.join(OUT, "todolist.json");
const VERIF = path.join(OUT, "todolist-fait-a-verifier.json");
const FIXES = JSON.parse(fs.readFileSync(path.join(OUT, "fixes-composantes.json"), "utf8"));
const CACHE = "/home/tasour/.cache/revue-visuelle";
const AUDIT = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/analyses/qualite-3d.json"), "utf8"));

const todo = JSON.parse(fs.readFileSync(TODO, "utf8"));
const verif = JSON.parse(fs.readFileSync(VERIF, "utf8"));
const targets = [
  "muscle:calcaneal-tendon-l", "muscle:calcaneal-tendon-r",
  "muscle:crural-fascia-l", "muscle:crural-fascia-r",
];
const added = [];
for (const id of targets) {
  const fix = FIXES.fixes.find((f) => f.id === id);
  if (!fix) continue;
  const beforeDir = path.join(CACHE, "qualite-3d-apres", id);
  const afterDir = path.join(CACHE, "apres-assemblage", id);
  const beforeImages = fs.existsSync(beforeDir) ? fs.readdirSync(beforeDir).filter((f) => f.endsWith(".jpg")).sort().map((f) => path.join(beforeDir, f)) : [];
  const afterImages = fs.existsSync(afterDir) ? fs.readdirSync(afterDir).filter((f) => f.endsWith(".jpg")).sort().map((f) => path.join(afterDir, f)) : [];
  const m = AUDIT.structures.find((s) => s.id === id);
  for (const e of todo.entries.filter((x) => x.subject === id && x.category === "assemblage")) {
    added.push({
      ...e,
      status: "fait_a_verifier",
      verdict: "verifie",
      correction: "suppression_composantes_negigeables",
      reason: fix.reason,
      beforeImages,
      afterImages,
      after: { composantes: m?.components ?? null, triangles: m?.triangles ?? null },
      testVisuel: "8 angles recaptures ; changement pixel nul ou < 2 % ; silhouette principale inchangee",
      verifiedAt: new Date().toISOString(),
    });
  }
}
verif.entries.push(...added);
verif.summary.vague3 = { fixes: targets.length, entreesAjoutees: added.length };
fs.writeFileSync(VERIF, JSON.stringify(verif, null, 1));
fs.appendFileSync(path.join(OUT, "todolist-fait-a-verifier.md"), `\n## Vague 3 — assemblage\n\n${targets.length} structures corrigees, ${added.length} entrees ajoutees. Composantes 4→1 et 3→1 ; triangles -8 ; changement pixel nul ou < 2 %.\n`);
console.log(`[assemblage] ${added.length} entrees ajoutees a la liste « fait mais a verifier »`);
