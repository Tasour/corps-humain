import fs from "node:fs";
import path from "node:path";

/* Scorecard qualité 3D — statut S0–S4 par structure.
 *
 * Entrées :
 *  - public/models/v2/manifest.json
 *  - docs/analyses/qualite-3d.json        (audit topologique, LOD high)
 *  - docs/analyses/qualite-3d/index.json  (captures 8 angles, si présentes)
 *
 * Sorties :
 *  - docs/qualite/classification-structures.provisional.json
 *  - docs/analyses/qualite-3d/scorecard.json
 *  - docs/analyses/qualite-3d/scorecard.md
 *
 * La classification ouvert/fermé est PROVISOIRE : elle est déduite du nom et
 * de la catégorie, pas d'une revue anatomique. Elle sert à ne pas compter un
 * fascia ouvert comme un organe troué, et doit être validée en P2.
 */

const ROOT = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "public/models/v2/manifest.json"), "utf8"));
const auditPath = path.join(ROOT, "docs/analyses/qualite-3d.json");
const audit = JSON.parse(fs.readFileSync(auditPath, "utf8"));
const capturePath = path.join(ROOT, "docs/analyses/qualite-3d/index.json");
const captures = fs.existsSync(capturePath) ? JSON.parse(fs.readFileSync(capturePath, "utf8")) : null;

const OUT = path.join(ROOT, "docs/analyses/qualite-3d");
const CLASSIF_OUT = path.join(ROOT, "docs/qualite");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(CLASSIF_OUT, { recursive: true });

/* Classification provisoire : ouvert si le nom désigne une surface, une
 * membrane, un conduit ou une structure en feuille. Les os et les ventres
 * musculaires sont fermés par défaut. */
const OPEN_PATTERN = /(fascia|membrane|peritoneum|pleura|mesentery|mesocolon|omentum|ligament|tendon|sheath|bursa|capsule|skin|serous|retinaculum|aponeurosis|septum|sulcus|fissure|gyrus|nerve|artery|vein|vessel|duct|sinus|canal|ureter|urethra|trachea|bronchus|intestine|colon|stomach|bladder|gallbladder|atrium|ventricle|heart)/i;

function classify(s) {
  const hay = `${s.id} ${s.fr} ${s.en}`;
  const open = OPEN_PATTERN.test(hay);
  return {
    closed: !open,
    reason: open ? "surface, membrane, conduit ou structure creuse" : "os, organe plein ou ventre musculaire",
    provisional: true,
  };
}

const classification = {};
for (const s of manifest.structures) classification[s.id] = classify(s);
fs.writeFileSync(
  path.join(CLASSIF_OUT, "classification-structures.provisional.json"),
  JSON.stringify({
    version: "provisoire-1",
    generated: new Date().toISOString(),
    method: "heuristique nom + catégorie ; à valider par revue anatomique en P2",
    structures: classification,
  }, null, 1),
);

/* Captures par structure. */
const captureById = new Map();
if (captures) {
  for (const subject of captures.subjects) {
    const angles = subject.captures?.length || 0;
    const clipped = subject.captures?.filter((c) => c.clipped || c.empty).length || 0;
    for (const id of subject.ids || []) {
      captureById.set(id, { subject: subject.id, angles, clipped, files: subject.captures?.map((c) => c.file) || [] });
    }
  }
}

const byId = new Map(manifest.structures.map((s) => [s.id, s]));
const rows = [];
const counts = { S0: 0, S1: 0, S2: 0, S3: 0, S4: 0 };
const gatePass = { G0: 0, G2: 0, G3: 0, G2closed: 0, G3strict: 0 };

for (const a of audit.structures) {
  const s = byId.get(a.id);
  if (!s) continue;
  const c = classification[a.id];
  const g0 = !!s.source && !!s.path?.length && !!s.ta2;
  const g3 = !a.invertedWinding
    && a.zeroNormals === 0
    && a.outOfRange === 0
    && a.nan === 0
    && a.flippedFaces / Math.max(1, a.triangles) < 0.0005;
  const g2topo = a.nonManifoldEdges === 0 && a.duplicateFaces === 0 && a.degenerate === 0;
  const g2closed = c.closed ? a.boundaryEdges === 0 && a.components === 1 : true;
  const g2 = g2topo && g2closed;
  const cap = captureById.get(a.id) || null;
  const capturesComplete = !!cap && cap.angles === 8 && cap.clipped === 0;

  let status = "S1";
  if (g0 && g2 && g3) status = "S2";
  /* S3 exige aussi G4 (résolution) et G5 (assemblage), non mesurés ici :
   * on ne le décerne jamais automatiquement. */
  counts[status]++;
  if (g0) gatePass.G0++;
  if (g2) gatePass.G2++;
  if (g3) gatePass.G3++;
  if (g2topo) gatePass.G2closed++;
  if (g3) gatePass.G3strict++;

  const blockers = [];
  if (!g0) blockers.push(s.ta2 ? "G0 source/chemin" : "G0 TA2 absent");
  if (a.nonManifoldEdges > 0) blockers.push(`${a.nonManifoldEdges} arêtes non-manifold`);
  if (a.duplicateFaces > 0) blockers.push(`${a.duplicateFaces} faces dupliquées`);
  if (a.degenerate > 0) blockers.push(`${a.degenerate} triangles dégénérés`);
  if (c.closed && a.boundaryEdges > 0) blockers.push(`${a.boundaryEdges} arêtes libres`);
  if (c.closed && a.components > 1) blockers.push(`${a.components} composantes`);
  if (a.invertedWinding) blockers.push("winding inversé");
  if (a.flippedFaces / Math.max(1, a.triangles) >= 0.0005) blockers.push(`${a.flippedFaces} faces inversées`);
  if (a.zeroNormals > 0) blockers.push(`${a.zeroNormals} normales nulles`);
  if (!capturesComplete) blockers.push(cap ? `captures ${cap.angles}/8` : "captures absentes");

  rows.push({
    id: a.id,
    fr: s.fr,
    category: s.category,
    source: s.source,
    ta2: s.ta2 || null,
    status,
    closed: c.closed,
    gates: { G0: g0, G2: g2, G3: g3 },
    metrics: {
      triangles: a.triangles,
      boundaryEdges: a.boundaryEdges,
      nonManifoldEdges: a.nonManifoldEdges,
      duplicateFaces: a.duplicateFaces,
      components: a.components,
      degenerate: a.degenerate,
      flippedFaces: a.flippedFaces,
      invertedWinding: a.invertedWinding,
      zeroNormals: a.zeroNormals,
      densityPerCm2: a.densityPerCm2,
      edgeP99Mm: a.edgeP99Mm,
    },
    captures: cap,
    blockers,
  });
}

rows.sort((a, b) => b.blockers.length - a.blockers.length || a.id.localeCompare(b.id));

/* Scorecard des 5 pilotes. */
const pilots = (captures?.subjects || []).map((subject) => {
  const members = (subject.ids || []).map((id) => rows.find((r) => r.id === id)).filter(Boolean);
  const s2 = members.filter((r) => r.status === "S2").length;
  const clipped = subject.captures?.filter((c) => c.clipped || c.empty).length || 0;
  return {
    id: subject.id,
    label: subject.label,
    members: members.length,
    s2,
    captures: subject.captures?.length || 0,
    clipped,
    blockers: [...new Set(members.flatMap((m) => m.blockers))].slice(0, 12),
  };
});

const summary = {
  generated: new Date().toISOString(),
  structures: rows.length,
  counts,
  gatePass,
  captures: captures ? {
    subjects: captures.subjects.length,
    images: captures.subjects.reduce((a, s) => a + (s.captures?.length || 0), 0),
    clipped: captures.subjects.reduce((a, s) => a + (s.captures?.filter((c) => c.clipped || c.empty).length || 0), 0),
  } : null,
};

fs.writeFileSync(path.join(OUT, "scorecard.json"), JSON.stringify({ summary, pilots, structures: rows }, null, 1));

/* Rapport Markdown. */
const fmt = (n) => Number(n).toLocaleString("fr-FR");
const pct = (n, d) => `${(100 * n / Math.max(1, d)).toFixed(1)} %`;
const lines = [];
lines.push("# Scorecard qualité 3D — statuts par structure");
lines.push("");
lines.push(`Généré le ${new Date().toISOString().slice(0, 10)} par \`npm run scorecard:3d\`.`);
lines.push("");
lines.push("> **Lecture :** S1 = mesurée, S2 = topologie et orientation saines, S3 = production.");
lines.push("> Aucune structure n'est S3 aujourd'hui : G4 (résolution) et G5 (assemblage) ne sont pas");
lines.push("> encore mesurés. La classification ouvert/fermé est **provisoire**.");
lines.push("");
lines.push("## Synthèse");
lines.push("");
lines.push("| Statut | Structures | Part |");
lines.push("|---|---:|---:|");
for (const k of ["S0", "S1", "S2", "S3", "S4"]) {
  lines.push(`| ${k} | ${fmt(counts[k] || 0)} | ${pct(counts[k] || 0, rows.length)} |`);
}
lines.push("");
lines.push("## Portes");
lines.push("");
lines.push("| Porte | Structures qui passent | Part |");
lines.push("|---|---:|---:|");
lines.push(`| G0 traçabilité (source, chemin, TA2) | ${fmt(gatePass.G0)} | ${pct(gatePass.G0, rows.length)} |`);
lines.push(`| G2 topologie + étanchéité (classification provisoire) | ${fmt(gatePass.G2)} | ${pct(gatePass.G2, rows.length)} |`);
lines.push(`| G2 topologie seule (hors étanchéité) | ${fmt(gatePass.G2closed)} | ${pct(gatePass.G2closed, rows.length)} |`);
lines.push(`| G3 orientation et normales | ${fmt(gatePass.G3)} | ${pct(gatePass.G3, rows.length)} |`);
lines.push("");
lines.push("## Pilotes — 5 structures prioritaires");
lines.push("");
lines.push("| Sujet | Structures | S2 | Captures | Débordements | Principaux bloqueurs |");
lines.push("|---|---:|---:|---:|---:|---|");
for (const p of pilots) {
  lines.push(`| ${p.label} | ${p.members} | ${p.s2} | ${p.captures}/8 | ${p.clipped} | ${p.blockers.slice(0, 4).join(" ; ") || "—"} |`);
}
lines.push("");
lines.push("## 20 structures les plus bloquées");
lines.push("");
lines.push("| Structure | Cat. | Statut | Bloqueurs |");
lines.push("|---|---|---|---|");
for (const r of rows.slice(0, 20)) {
  lines.push(`| \`${r.id}\` | ${r.category} | ${r.status} | ${r.blockers.slice(0, 4).join(" ; ")} |`);
}
lines.push("");
lines.push("## Trous de complétude constatés");
lines.push("");
lines.push("| Élément | Constat | Preuve |");
lines.push("|---|---|---|");
lines.push("| Myocarde du cœur | `organ:bp-heart` ne contient que 11 pièces BodyParts3D : valves, sinus coronaire, veines cardiaques. Aucun muscle cardiaque. | inventaire `organ:bp-heart` + capture `coeur/face.jpg` |");
lines.push("| Œsophage | aucun identifiant `esophag` dans le manifeste | recherche manifeste |");
lines.push("| Poumons entiers | seuls les lobes existent, pas de structure `poumon` complète | recherche manifeste |");
lines.push("| Hémisphères cérébraux | aucun identifiant `hemisphere` ; le cerveau est un agrégat de 466 composantes | recherche manifeste + audit |");
lines.push("| Ménisques et ligaments du genou | aucun `menisc`, aucun ligament croisé/collatéral | recherche manifeste + capture `genou-droit/face.jpg` |");
lines.push("");
lines.push("## Limites");
lines.push("");
lines.push("- La classification ouvert/fermé est heuristique : un fascia peut être classé ouvert à tort,");
lines.push("  un organe creux fermé à tort. Elle doit être validée en P2 avant toute correction.");
lines.push("- S2 ne dit rien de la fidélité anatomique : un maillage sain peut être faux.");
lines.push("- Les captures 8 angles existent pour 5 sujets, pas pour les 2 039 structures.");
lines.push("- Aucune structure n'est S3 : la résolution (G4) et l'assemblage (G5) restent à mesurer.");
lines.push("");
lines.push("JSON : `docs/analyses/qualite-3d/scorecard.json` · classification :");
lines.push("`docs/qualite/classification-structures.provisional.json`.");
fs.writeFileSync(path.join(OUT, "scorecard.md"), lines.join("\n"));

console.log(`[scorecard] ${rows.length} structures · S1 ${counts.S1} · S2 ${counts.S2} · S3 ${counts.S3}`);
console.log(`[scorecard] G0 ${gatePass.G0} · G2 ${gatePass.G2} · G3 ${gatePass.G3}`);
console.log(`[scorecard] écrit ${path.join(OUT, "scorecard.md")}`);
