import fs from "node:fs";
import path from "node:path";

/* Vue « active » de la todolist : retire les entrées déjà vérifiées et les
 * faux positifs identifiés pendant la vérification visuelle. Les fichiers
 * historiques restent inchangés ; celui-ci sert au pilotage des prochaines
 * vagues. */

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "docs/analyses/revue-visuelle");
const todo = JSON.parse(fs.readFileSync(path.join(OUT, "todolist.json"), "utf8"));
const verif = JSON.parse(fs.readFileSync(path.join(OUT, "todolist-fait-a-verifier.json"), "utf8"));

const resolved = new Set(verif.entries.filter((e) => e.verdict === "verifie").map((e) => e.id));
const falsePositive = new Set(verif.entries.filter((e) => e.verdict === "faux_positif").map((e) => e.id));
const entries = todo.entries.filter((e) => !resolved.has(e.id) && !falsePositive.has(e.id));

const byCategory = {}, bySeverity = {};
for (const e of entries) {
  byCategory[e.category] = (byCategory[e.category] || 0) + 1;
  bySeverity[e.severity] = (bySeverity[e.severity] || 0) + 1;
}
const summary = {
  generated: new Date().toISOString(),
  total: todo.entries.length,
  verified: resolved.size,
  falsePositives: falsePositive.size,
  active: entries.length,
  byCategory,
  bySeverity,
  note: "Les faux positifs sont des entrées de cadrage sur des objets allongés vus de bout : le harnais a été corrigé, aucune anomalie applicative n'est à traiter.",
};
fs.writeFileSync(path.join(OUT, "todolist-active.json"), JSON.stringify({ summary, entries }, null, 1));

const lines = [
  "# Todolist active — prochaines vagues",
  "",
  `Généré le ${summary.generated.slice(0, 10)}. ${summary.total} entrées initiales, `
    + `${summary.verified} vérifiées, ${summary.falsePositives} faux positifs, **${summary.active} actives**.`,
  "",
  `> ${summary.note}`,
  "",
  "| Catégorie | Actives | Action possible |",
  "|---|---:|---|",
  "| geometrie | " + (byCategory.geometrie || 0) + " | Résolution source ; pas de correctif sûr |",
  "| assemblage | " + (byCategory.assemblage || 0) + " | Connexion de segments = fabrication interdite |",
  "| anatomie_a_valider | " + (byCategory.anatomie_a_valider || 0) + " | Revue anatomiste requise |",
  "| materiau | " + (byCategory.materiau || 0) + " | Textures CC0 à acquérir |",
  "| lisibilite | " + (byCategory.lisibilite || 0) + " | Réglages de rendu à valider |",
  "| cadrage | " + (byCategory.cadrage || 0) + " | Vues de bout / limites du protocole 8 angles |",
  "",
  "Sévérité : " + Object.entries(bySeverity).map(([k, v]) => `${k} ${v}`).join(" · "),
  "",
];
fs.writeFileSync(path.join(OUT, "todolist-active.md"), lines.join("\n"));
console.log(`[active] ${summary.active} entrées actives (${summary.verified} vérifiées, ${summary.falsePositives} faux positifs écartés)`);
