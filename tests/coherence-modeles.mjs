/* Test systémique de cohérence des modèles fusionnés (Z-Anatomy + BodyParts3D).
 *
 * Lit public/models/v2/manifest.json, applique 5 contrôles et écrit un rapport
 * exhaustif dans docs/analyses/coherence.json. Le processus sort avec le code 1
 * dès qu'au moins une anomalie est détectée.
 *
 * Contrôles :
 *   1. source-pair            : les paires gauche/droite (ids -l/-r de même base)
 *                               doivent provenir de la même source.
 *   2. bounds-envelope        : les bornes doivent tenir dans l'enveloppe corps
 *                               (± 5 cm de tolérance).
 *   3. lod-complete           : low/medium/high avec vertexCount > 0 et indexCount > 0.
 *   4. duplicate-fr-source    : un même nom français ne doit pas être associé à
 *                               plusieurs sources différentes.
 *   5. ta2-name-side          : un ta2 dont le nom porte un latéralisateur anglais
 *                               explicite ("left"/"right") doit avoir un champ
 *                               `side` cohérent.
 *
 * Note sur le contrôle 5 : seuls les mots anglais non ambigus "left"/"right"
 * sont comparés au champ `side`. Les termes français "droit"/"gauche" sont
 * exclus (« droit » signifie aussi « rectus » en anatomie) et `side: null`
 * est considéré comme « structure non latéralisée / non appariée » : les
 * organes impairs physiologiquement latéralisés (ventricule gauche, atrium
 * droit, poumon droit, ...) ne sont donc pas signalés. Seules les contradictions
 * explicites (name left ↔ side right, ou name right ↔ side left) sont des
 * anomalies.
 */

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = path.join(root, "public", "models", "v2", "manifest.json");
const reportPath = path.join(root, "docs", "analyses", "coherence.json");

const ENVELOPE = {
  x: [-0.4, 0.4],
  y: [-0.05, 1.8],
  z: [-0.25, 0.25],
};
const TOLERANCE = 0.05; // 5 cm
const AXES = ["x", "y", "z"];
const LOGS = ["low", "medium", "high"];

const CHECKS = [
  { id: "source-pair", label: "Cohérence de source des paires gauche/droite" },
  { id: "bounds-envelope", label: "Bornes dans l'enveloppe corps" },
  { id: "lod-complete", label: "Présence et validité des 3 LOD" },
  { id: "duplicate-fr-source", label: "Unicité du nom français par source" },
  { id: "ta2-name-side", label: "Cohérence TA2 nom / side" },
];

const anomalies = [];
function add(check, type, message, details = {}) {
  anomalies.push({ check, type, message, ...details });
}

function writeReport(report) {
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}

/* ---------- lecture du manifeste ---------- */
let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
} catch (err) {
  const report = {
    generatedAt: new Date().toISOString(),
    manifest: path.relative(root, manifestPath),
    error: `Manifeste illisible : ${err.message}`,
    summary: { structures: 0, anomalyCount: 0, byCheck: {}, ok: false },
    anomalies: [],
  };
  writeReport(report);
  console.error(report.error);
  process.exit(1);
}

const structures = Array.isArray(manifest.structures) ? manifest.structures : [];

/* ---------- contrôle 1 : paires gauche/droite, même source ---------- */
const pairs = new Map();
for (const s of structures) {
  const m = /^(.*)-(l|r)$/.exec(String(s.id || ""));
  if (!m) continue;
  const base = m[1];
  if (!pairs.has(base)) pairs.set(base, {});
  pairs.get(base)[m[2]] = s;
}
for (const [base, pair] of pairs) {
  if (!pair.l || !pair.r) continue;
  if (pair.l.source !== pair.r.source) {
    add(
      "source-pair",
      "left_right_source_mismatch",
      `La paire « ${base} » mélange deux sources : ${pair.l.source} (gauche) et ${pair.r.source} (droite).`,
      {
        base,
        leftId: pair.l.id,
        rightId: pair.r.id,
        leftSource: pair.l.source,
        rightSource: pair.r.source,
      },
    );
  }
}

/* ---------- contrôle 2 : bornes dans l'enveloppe ---------- */
for (const s of structures) {
  const b = s.bounds;
  if (!b || !Array.isArray(b.min) || !Array.isArray(b.max)) {
    add("bounds-envelope", "bounds_missing", `Structure « ${s.id} » sans bornes exploitables.`, {
      id: s.id,
    });
    continue;
  }
  for (let a = 0; a < AXES.length; a += 1) {
    const axis = AXES[a];
    const [lo, hi] = ENVELOPE[axis];
    const allowed = [lo - TOLERANCE, hi + TOLERANCE];
    for (const which of ["min", "max"]) {
      const value = b[which][a];
      if (typeof value !== "number" || !Number.isFinite(value)) {
        add(
          "bounds-envelope",
          "bounds_invalid",
          `Structure « ${s.id} » : borne ${axis}.${which} non numérique.`,
          { id: s.id, axis, which, value },
        );
        continue;
      }
      if (value < allowed[0] || value > allowed[1]) {
        add(
          "bounds-envelope",
          "bounds_out_of_envelope",
          `Structure « ${s.id} » : ${axis}.${which} = ${value.toFixed(4)} hors de [${allowed[0].toFixed(3)}, ${allowed[1].toFixed(3)}].`,
          { id: s.id, axis, which, value, allowed },
        );
      }
    }
  }
}

/* ---------- contrôle 3 : 3 LOD valides ---------- */
for (const s of structures) {
  for (const lod of LOGS) {
    const l = s.lod && s.lod[lod];
    if (!l) {
      add("lod-complete", "lod_missing", `Structure « ${s.id} » : LOD ${lod} absent.`, {
        id: s.id,
        lod,
      });
      continue;
    }
    const vc = l.vertexCount;
    const ic = l.indexCount;
    if (!(vc > 0) || !(ic > 0)) {
      add(
        "lod-complete",
        "lod_empty",
        `Structure « ${s.id} » : LOD ${lod} incomplet (vertexCount=${vc}, indexCount=${ic}).`,
        { id: s.id, lod, vertexCount: vc, indexCount: ic },
      );
    }
  }
}

/* ---------- contrôle 4 : nom français dupliqué avec sources différentes ---------- */
const byFr = new Map();
for (const s of structures) {
  const name = s.fr;
  if (typeof name !== "string" || name.trim() === "") continue;
  if (!byFr.has(name)) byFr.set(name, []);
  byFr.get(name).push(s);
}
for (const [fr, group] of byFr) {
  const sources = [...new Set(group.map((s) => s.source))];
  if (group.length > 1 && sources.length > 1) {
    add(
      "duplicate-fr-source",
      "duplicate_fr_multiple_sources",
      `Le nom « ${fr} » est porté par ${group.length} structures issues de ${sources.length} sources distinctes.`,
      {
        fr,
        sources,
        ids: group.map((s) => ({ id: s.id, source: s.source })),
      },
    );
  }
}

/* ---------- contrôle 5 : cohérence TA2 nom / side ---------- */
for (const s of structures) {
  if (!s.ta2) continue;
  const text = `${s.fr || ""} ${s.en || ""}`.toLowerCase();
  const left = /\bleft\b/.test(text);
  const right = /\bright\b/.test(text);
  if (left === right) continue; // aucun latéralisateur, ou les deux : ambigu, ignoré
  const nameSide = left ? "left" : "right";
  const side = s.side;
  if (side !== "left" && side !== "right") continue; // null = non latéralisé
  if (nameSide === side) continue;
  add(
    "ta2-name-side",
    "ta2_name_side_mismatch",
    `TA2 ${s.ta2} : « ${s.fr} » dit "${nameSide}" alors que side="${side}".`,
    {
      id: s.id,
      ta2: s.ta2,
      fr: s.fr,
      en: s.en,
      nameSide,
      side,
    },
  );
}

/* ---------- tri déterministe et rapport ---------- */
const checkOrder = new Map(CHECKS.map((c, i) => [c.id, i]));
anomalies.sort((a, b) => {
  const d = checkOrder.get(a.check) - checkOrder.get(b.check);
  if (d !== 0) return d;
  const idA = a.id || a.base || a.fr || "";
  const idB = b.id || b.base || b.fr || "";
  return String(idA).localeCompare(String(idB), "fr");
});

const byCheck = {};
for (const c of CHECKS) byCheck[c.id] = 0;
const byType = {};
for (const a of anomalies) {
  byCheck[a.check] = (byCheck[a.check] || 0) + 1;
  byType[a.type] = (byType[a.type] || 0) + 1;
}

const report = {
  generatedAt: new Date().toISOString(),
  manifest: path.relative(root, manifestPath),
  manifestVersion: manifest.version ?? null,
  manifestGenerated: manifest.generated ?? null,
  method: {
    envelope: ENVELOPE,
    toleranceMeters: TOLERANCE,
    lateralTokens: ["left", "right"],
    note: "side=null est traité comme non latéralisé ; les termes français droit/gauche sont ambigus et exclus du contrôle 5.",
  },
  summary: {
    structures: structures.length,
    pairsChecked: [...pairs.values()].filter((p) => p.l && p.r).length,
    anomalyCount: anomalies.length,
    byCheck,
    byType,
    ok: anomalies.length === 0,
  },
  checks: CHECKS.map((c) => ({ ...c, anomalies: byCheck[c.id] })),
  anomalies,
};

writeReport(report);

/* ---------- affichage console ---------- */
console.log(`Contrôle de cohérence des modèles — ${structures.length} structures`);
for (const c of CHECKS) {
  console.log(`  [${c.id}] ${c.label} : ${byCheck[c.id]} anomalie(s)`);
}
console.log(`Total anomalies : ${anomalies.length}`);
console.log(`Rapport : ${path.relative(root, reportPath)}`);
if (anomalies.length > 0) {
  for (const a of anomalies.slice(0, 10)) console.log(`  - ${a.type}: ${a.message}`);
  if (anomalies.length > 10) console.log(`  ... et ${anomalies.length - 10} autre(s) (voir le rapport).`);
  process.exit(1);
}
process.exit(0);
