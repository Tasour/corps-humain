import fs from "node:fs";
import path from "node:path";

/* Ajoute à la todolist « Fait mais à vérifier » les corrections par exclusion
 * (vague 1). Pour chaque structure retirée du manifeste, on consigne :
 *  - les captures AVANT ;
 *  - l'absence de capture APRÈS (preuve : plus d'entrée dans le manifeste) ;
 *  - les identifiants de remplacement vérifiés dans le manifeste courant.
 *
 * Aucune géométrie n'est modifiée ici. */

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "docs/analyses/revue-visuelle");
const TODO = path.join(OUT, "todolist.json");
const VERIF = path.join(OUT, "todolist-fait-a-verifier.json");
const CACHE = "/home/tasour/.cache/revue-visuelle";

const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "public/models/v2/manifest.json"), "utf8"));
const todo = JSON.parse(fs.readFileSync(TODO, "utf8"));
const verif = JSON.parse(fs.readFileSync(VERIF, "utf8"));
const present = new Set(manifest.structures.map((s) => s.id));
const exclusions = manifest.reviewExclusions?.applied || [];

const added = [];
for (const ex of exclusions) {
  const remaining = todo.entries.filter((e) => e.subject === ex.id);
  const replacements = ex.replacements.filter((id) => present.has(id));
  const beforeDir = path.join(CACHE, "qualite-3d", ex.id);
  const beforeImages = fs.existsSync(beforeDir)
    ? fs.readdirSync(beforeDir).filter((f) => f.endsWith(".jpg")).sort().map((f) => path.join(beforeDir, f))
    : [];
  for (const e of remaining) {
    added.push({
      ...e,
      status: "fait_a_verifier",
      verdict: replacements.length ? "verifie" : "partiel",
      correction: "exclusion_du_manifeste",
      reason: ex.reason,
      beforeImages,
      afterImages: [],
      after: { excluded: true, presentInManifest: false },
      replacements,
      testVisuel: replacements.length
        ? "absence confirmee dans le manifeste ; structures de remplacement presentes"
        : "absence confirmee mais aucun remplacement verifie",
      verifiedAt: new Date().toISOString(),
    });
  }
}

verif.entries.push(...added);
verif.summary.vague1 = {
  exclusions: exclusions.length,
  entreesAjoutees: added.length,
  remplacementsVerifies: exclusions.filter((e) => e.replacements.some((r) => present.has(r))).length,
};
fs.writeFileSync(VERIF, JSON.stringify(verif, null, 1));

const lines = [];
lines.push("");
lines.push("## Vague 1 — agrégats exclus du manifeste");
lines.push("");
lines.push(`${exclusions.length} structures exclues, ${added.length} entrées de la todolist concernées.`);
lines.push("");
lines.push("| ID | Structure | Remplacements présents | Verdict |");
lines.push("|---|---|---:|---|");
for (const e of added.filter((x, i, a) => a.findIndex(y => y.subject === x.subject) === i)) {
  lines.push(`| ${e.id} | \`${e.subject}\` | ${e.replacements.length} | ${e.verdict} |`);
}
lines.push("");
fs.appendFileSync(path.join(OUT, "todolist-fait-a-verifier.md"), lines.join("\n"));
console.log(`[exclusions] ${exclusions.length} exclusions, ${added.length} entrées ajoutées à la liste « fait mais à vérifier »`);
