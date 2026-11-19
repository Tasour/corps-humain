import fs from "node:fs";
import path from "node:path";

/* Consolide les revues JSON des sous-agents en une todolist unique.
 * Entrées : /home/tasour/.cache/revue-visuelle/reviews/lot-*.json
 * Sorties : docs/analyses/revue-visuelle/todolist.json + todolist.md
 *
 * Aucune correction : les entrées ont toutes le statut `a_faire`.
 */

const CACHE = process.env.REVUE_CACHE || "/home/tasour/.cache/revue-visuelle";
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = process.env.REVUE_OUT || path.join(ROOT, "docs/analyses/revue-visuelle");
const REVIEWS = path.join(CACHE, "reviews");
const IMAGES = path.join(CACHE, "qualite-3d");

const byId = new Map(JSON.parse(fs.readFileSync(path.join(ROOT, "public/models/v2/manifest.json"), "utf8")).structures.map((s) => [s.id, s]));
const LOTS = JSON.parse(fs.readFileSync(path.join(CACHE, "lots/index.json"), "utf8"));

const GATE = {
  geometrie: "G2",
  assemblage: "G5",
  cadrage: "G8",
  lisibilite: "G8",
  materiau: "G6",
  anatomie_a_valider: "G1/G8",
};
const SEVERITY = { bloquant: 0, majeur: 1, mineur: 2 };
const CATEGORIES = Object.keys(GATE);

function clean(s) {
  return String(s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ").toLowerCase().split(/\s+/).filter((w) => w.length > 3);
}
function similarity(a, b) {
  const A = new Set(clean(a)), B = new Set(clean(b));
  const inter = [...A].filter((w) => B.has(w)).length;
  return inter / Math.max(1, new Set([...A, ...B]).size);
}
function severityRank(s) { return SEVERITY[s] ?? 3; }

const files = fs.existsSync(REVIEWS)
  ? fs.readdirSync(REVIEWS).filter((f) => /^lot-\d+\.json$/.test(f)).sort()
  : [];
const raw = [];
const lotsDone = [];
const errors = [];
for (const file of files) {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(REVIEWS, file), "utf8"));
    const lot = data.lot ?? Number(file.match(/\d+/)[0]);
    lotsDone.push(lot);
    for (const subject of data.subjects || []) {
      for (const angle of subject.angles || []) {
        for (const o of angle.observations || []) {
          raw.push({
            lot,
            subjectId: subject.id,
            angle: angle.angle,
            category: CATEGORIES.includes(o.category) ? o.category : "geometrie",
            severity: o.severity === "moyen" ? "majeur" : (SEVERITY[o.severity] !== undefined ? o.severity : "mineur"),
            confidence: ["elevee", "moyenne", "faible"].includes(o.confidence) ? o.confidence : "moyenne",
            description: String(o.description || "").replace(/[\u3400-\u9fff]/g, "").trim(),
          });
        }
      }
    }
  } catch (e) {
    errors.push(`${file} : ${e.message}`);
  }
}

/* Pré-analyse automatique : couverture trop faible sur les captures. */
const captureIndexFile = path.join(CACHE, "qualite-3d/index.json");
if (fs.existsSync(captureIndexFile)) {
  const ci = JSON.parse(fs.readFileSync(captureIndexFile, "utf8"));
  for (const s of ci.subjects || []) {
    const low = (s.captures || []).filter((c) => c.coveragePct < 10);
    if (!low.length) continue;
    const min = Math.min(...low.map((c) => c.coveragePct));
    raw.push({
      lot: 0,
      subjectId: s.id,
      angle: low[0].angle,
      category: "cadrage",
      severity: min < 2 ? "bloquant" : "majeur",
      confidence: "elevee",
      description: `Couverture ${min}% au minimum (${low.length}/8 angles sous 10%) : objet trop petit dans le cadre. ATTENTION : artefact possible du harnais (controls.minDistance = 0,12 m).`,
    });
  }
}

/* Déduplication : même sujet + même catégorie + description proche. */
const groups = new Map();
for (const r of raw) {
  const key = `${r.subjectId}|${r.category}`;
  let list = groups.get(key);
  if (!list) { list = []; groups.set(key, list); }
  const found = list.find((g) => similarity(g.description, r.description) >= 0.55);
  if (found) {
    found.angles.push(r.angle);
    found.lots.add(r.lot);
    if (severityRank(r.severity) < severityRank(found.severity)) found.severity = r.severity;
    if (r.confidence === "elevee") found.confidence = "elevee";
  } else {
    list.push({ ...r, angles: [r.angle], lots: new Set([r.lot]) });
  }
}

const entries = [];
for (const list of groups.values()) {
  for (const g of list) {
    const s = byId.get(g.subjectId);
    const angles = [...new Set(g.angles)];
    const filesForAngle = angles.map((a) => {
      const rel = path.join(IMAGES, g.subjectId, `${a}.jpg`);
      return fs.existsSync(rel) ? path.relative(ROOT, rel) : rel;
    });
    entries.push({
      id: "",
      status: "a_faire",
      subject: g.subjectId,
      fr: s?.fr || "",
      category: g.category,
      gate: GATE[g.category],
      severity: g.severity,
      confidence: g.confidence,
      description: g.description,
      angles,
      evidence: filesForAngle,
      lots: [...g.lots],
    });
  }
}
entries.sort((a, b) =>
  severityRank(a.severity) - severityRank(b.severity)
  || a.subject.localeCompare(b.subject)
  || a.category.localeCompare(b.category));
entries.forEach((e, i) => { e.id = `VIS-${String(i + 1).padStart(5, "0")}`; });

const covered = new Set();
for (const file of files) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(REVIEWS, file), "utf8"));
    for (const s of d.subjects || []) covered.add(s.id);
  } catch { /* déjà compté dans errors */ }
}

const summary = {
  generated: new Date().toISOString(),
  lotsTotal: LOTS.lots,
  lotsReviewed: lotsDone.length,
  lotsPending: LOTS.lots - lotsDone.length,
  subjectsTotal: LOTS.total,
  subjectsReviewed: covered.size,
  subjectsPending: LOTS.total - covered.size,
  observationsBrutes: raw.length,
  todoEntries: entries.length,
  bySeverity: Object.fromEntries(Object.keys(SEVERITY).map((k) => [k, entries.filter((e) => e.severity === k).length])),
  byCategory: Object.fromEntries(CATEGORIES.map((k) => [k, entries.filter((e) => e.category === k).length])),
  limitations: [
    "Le harnais de capture impose controls.minDistance = 0,12 m : les structures de moins de ~12 cm sont cadrées trop loin. Les entrées 'cadrage' sur petits objets sont donc des ARTÉFACTS OUTIL à confirmer après correction du harnais, pas des défauts de l'application.",
    "Les observations 'anatomie_a_valider' sont des signalements à soumettre à un anatomiste, jamais des affirmations.",
  ],
  errors,
};

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "todolist.json"), JSON.stringify({ summary, entries }, null, 1));

const sevOrder = ["bloquant", "majeur", "mineur"];
const lines = [];
lines.push("# Todolist — revue visuelle 3D (sans correction)");
lines.push("");
lines.push(`Généré le ${summary.generated.slice(0, 10)}. **Aucune correction appliquée.**`);
lines.push("");
lines.push(`- Lots relus : **${summary.lotsReviewed}/${summary.lotsTotal}**`);
lines.push(`- Structures relues : **${summary.subjectsReviewed}/${summary.subjectsTotal}**`);
lines.push(`- Observations brutes : ${summary.observationsBrutes} → **${summary.todoEntries}** entrées dédupliquées`);
lines.push(`- Sévérité : ${sevOrder.map((s) => `${s} ${summary.bySeverity[s]}`).join(" · ")}`);
lines.push("");
lines.push("> **Limite outil :** `controls.minDistance = 0,12 m` dans `v2.html` force la caméra à 12 cm");
lines.push("> minimum. Les captures des structures < 12 cm sont donc cadrées trop loin : les entrées");
lines.push("> « cadrage » sur ces objets sont des **artefacts du harnais**, pas des défauts applicatifs.");
lines.push("");
lines.push("| Catégorie | Entrées | Porte |");
lines.push("|---|---:|---|");
for (const c of CATEGORIES) lines.push(`| ${c} | ${summary.byCategory[c]} | ${GATE[c]} |`);
lines.push("");
for (const sev of sevOrder) {
  const list = entries.filter((e) => e.severity === sev);
  if (!list.length) continue;
  lines.push(`## ${sev.toUpperCase()} (${list.length})`);
  lines.push("");
  lines.push("| ID | Structure | Cat. | Porte | Défaut | Angles | Preuves |");
  lines.push("|---|---|---|---|---|---|---|");
  for (const e of list) {
    const desc = e.description.replace(/\|/g, "/").slice(0, 160);
    lines.push(`| ${e.id} | \`${e.subject}\`${e.fr ? ` (${e.fr})` : ""} | ${e.category} | ${e.gate} | ${desc} | ${e.angles.join(", ")} | ${e.evidence.slice(0, 2).map((f) => `\`${f}\``).join(" ")} |`);
  }
  lines.push("");
}
if (summary.lotsPending > 0) {
  lines.push(`## Non relus`);
  lines.push("");
  lines.push(`${summary.lotsPending} lot(s) et ${summary.subjectsPending} structure(s) restent à relire. La todolist est donc **partielle**.`);
  lines.push("");
}
if (errors.length) {
  lines.push("## Erreurs de consolidation");
  lines.push("");
  for (const e of errors) lines.push(`- ${e}`);
  lines.push("");
}
fs.writeFileSync(path.join(OUT, "todolist.md"), lines.join("\n"));

console.log(`[revue] ${summary.lotsReviewed}/${summary.lotsTotal} lots · ${summary.subjectsReviewed}/${summary.subjectsTotal} structures · ${summary.todoEntries} entrées`);
console.log(`[revue] écrit ${path.join(OUT, "todolist.md")}`);
