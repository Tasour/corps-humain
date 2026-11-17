import fs from "node:fs";
import path from "node:path";

const IN = process.env.INVENTORY_JSON || path.resolve(import.meta.dirname, "../docs/inventaire-anatomique/structures.json");
const OUT = process.env.INVENTORY_REPORT || path.resolve(import.meta.dirname, "../docs/inventaire-anatomique/rapport.md");
const doc = JSON.parse(fs.readFileSync(IN, "utf8"));

const esc = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
const sideLabel = (sides) => (sides.includes("left") && sides.includes("right") ? "G + D" : sides.includes("left") ? "G" : sides.includes("right") ? "D" : "—");

const lines = [];
lines.push("# Inventaire anatomique 3D complet — CORPS");
lines.push("");
lines.push(`> Généré le ${doc.meta.generated}. Objectif : ${doc.meta.objective}`);
lines.push("");
lines.push("## Sources");
lines.push("");
for (const s of doc.meta.sources) {
  lines.push(`- **[${s.name}](${s.url})**${s.license ? ` — ${s.license}` : ""} : ${s.role}`);
}
lines.push("");
lines.push("## Méthode");
lines.push("");
for (const m of doc.meta.methodology) lines.push(`- ${m}`);
lines.push("");
lines.push("## Résultats");
lines.push("");
lines.push("| Catégorie | Objets maillés | Structures canoniques | Triangles du meilleur modèle | Noms TA2 | Avec BodyParts3D | Uniquement BodyParts3D | Meilleur Z-Anatomy | Meilleur BodyParts3D |");
lines.push("|---|---:|---:|---:|---:|---:|---:|---:|---:|");
const labels = { bone: "Os", muscle: "Muscles", organ: "Organes" };
for (const [k, c] of Object.entries(doc.meta.counts)) {
  lines.push(
    `| ${labels[k]} | ${c.objects} | ${c.canonicalStructures} | ${c.bestModelTriangles.toLocaleString("fr-FR")} | ${c.withTA2} | ${c.withBodyParts3D} | ${c.onlyInBodyParts3D} | ${c.bestFromZAnatomy} | ${c.bestFromBodyParts3D} |`,
  );
}
lines.push("");
lines.push(`**Total : ${Object.values(doc.meta.counts).reduce((a, c) => a + c.objects, 0)} maillages individuels** ` +
  `(${Object.values(doc.meta.counts).reduce((a, c) => a + c.canonicalStructures, 0)} structures canoniques). ` +
  `${doc.meta.matching.ta2Hits} noms normalisés TA2 appariés, ${doc.meta.matching.bpHits} concepts BodyParts3D appariés.`);
lines.push("");
lines.push("Le fichier `structures.json` contient l'intégralité des entrées, avec pour chacune : le nom français (TA2), le nom latin, l'identifiant TA2, les collections d'origine, le maillage Z-Anatomy, l'éventuel concept BodyParts3D, le **meilleur modèle** (source, objet, triangles, licence) et les alternatives.");
lines.push("");

for (const [category, list] of Object.entries(doc.categories)) {
  lines.push(`## ${labels[category]} (${list.length} maillages)`);
  lines.push("");
  const groups = new Map();
  for (const e of list) {
    if (!groups.has(e.canonical)) groups.set(e.canonical, []);
    groups.get(e.canonical).push(e);
  }
  if (category === "organ") {
    const bySub = new Map();
    for (const [canonical, entries] of groups) {
      const sub = entries[0].subsystem || "Autre";
      if (!bySub.has(sub)) bySub.set(sub, new Map());
      bySub.get(sub).set(canonical, entries);
    }
    for (const [sub, group] of bySub) {
      lines.push(`### ${sub}`);
      lines.push("");
      emitTable(lines, group);
    }
  } else {
    emitTable(lines, groups);
  }
}

function emitTable(lines, groups) {
  lines.push("| Structure (français) | Nom TA2 / latin | Côté | Meilleur modèle | Source | Triangles | Alternative |");
  lines.push("|---|---|:--:|---|---|---:|---|");
  for (const [canonical, entries] of groups) {
    const first = entries[0];
    const sides = [...new Set(entries.map((e) => e.side).filter(Boolean))];
    const fr = first.french || canonical;
    const name = first.english && first.english !== canonical ? `${esc(first.english)}${first.latin ? ` / ${esc(first.latin)}` : ""}` : esc(first.latin || first.english);
    const best = first.best;
    const bestModel = best.object || best.model;
    const alt = first.alternatives.map((a) => `${a.source} (${a.object || a.model})`).join(", ") || "—";
    lines.push(
      `| ${esc(fr)} | ${name} | ${sideLabel(sides)} | ${esc(bestModel)} | ${esc(best.source)} | ${best.triangles.toLocaleString("fr-FR")} | ${esc(alt)} |`,
    );
  }
  lines.push("");
}

fs.writeFileSync(OUT, lines.join("\n"));
console.log("REPORT", OUT, lines.length, "lines");
