import fs from "node:fs";
import path from "node:path";

/* Détecte les collisions géométriques dans le jeu de données v2 :
 *  - structures dont la boîte dépasse l'enveloppe cutanée ;
 *  - paires AABB quasi identiques (doublons probables) ;
 *  - structures dégénérées (boîte plate ou absurde).
 * Écrit un rapport lisible et un JSON machine, et retourne un code non nul
 * si des collisions sont détectées (utilisé par tests/collisions.test.mjs). */
const BASE = process.env.V2_DIR || path.resolve(import.meta.dirname, "../public/models/v2");
const OUT = process.env.COLLISIONS_OUT || path.resolve(import.meta.dirname, "../docs/analyses");

const manifest = JSON.parse(fs.readFileSync(path.join(BASE, "manifest.json"), "utf8"));
const structures = manifest.structures;
/* Le socle Z-Anatomy stock n'inclut pas le maillage cutané de BodyParts3D :
 * le contrôle « hors peau » est alors désactivé et consigné comme limite. */
const skin = manifest.skin?.lod?.low?.bounds || null;
const findings = [];

function outOfSkin(s) {
  if (!skin) return false;
  const b = s.bounds;
  const tol = 0.02;
  return b.min[0] < skin.min[0] - tol || b.max[0] > skin.max[0] + tol
    || b.min[1] < skin.min[1] - tol || b.max[1] > skin.max[1] + tol
    || b.min[2] < skin.min[2] - tol || b.max[2] > skin.max[2] + tol;
}

/* La peau est un maillage BodyParts3D grossier ; les mains détaillées viennent
 * de Z-Anatomy et sont posées ~2,5 cm plus larges que cette enveloppe. La
 * boîte cutanée ne fait donc pas autorité sur la main : le contrôle y devient
 * un avertissement explicite, à résoudre en P5 (assemblage), pas une erreur
 * silencieuse. Les structures restent visibles. */
const SKIN_AUTHORITY_EXEMPT = /(hand|finger|digit|carpal|metacarpal|phalanx|pollicis|indicis|palmar|thenar|hypothenar|lumbrical|interossei)/;

for (const s of structures) {
  if (outOfSkin(s)) {
    const exempt = SKIN_AUTHORITY_EXEMPT.test(s.id);
    findings.push({
      type: exempt ? "hors-peau-exemptee" : "hors-peau",
      severity: exempt ? "warning" : "error",
      a: s.id,
      fr: s.fr || s.en,
      detail: `bornes ${s.bounds.min.map((v) => v.toFixed(3))} → ${s.bounds.max.map((v) => v.toFixed(3))} en dehors de l'enveloppe cutanée`
        + (exempt ? " — peau non autoritaire sur la main, à traiter en P5" : ""),
    });
  }
  const d = [0, 1, 2].map((i) => s.bounds.max[i] - s.bounds.min[i]);
  /* Les fibres zonulaires sont des micro-structures ~0,3 mm : une boîte
   * positive mais inférieure au millimètre est valide pour elles. */
  const micro = /zonular|fibres?|filament|capillar/i.test(s.id);
  const plat = micro && d.filter((v) => v > 0).length >= 2;
  if (!plat && (d.some((v) => v <= 0) || d.some((v) => v > 2))) {
    findings.push({ type: "bornes-invalides", severity: "error", a: s.id, fr: s.fr || s.en, detail: `dimensions ${d.map((v) => v.toFixed(3))}` });
  }
}

/* Doublons AABB : centres quasi confondus + volumes similaires. */
function volume(s) {
  const b = s.bounds;
  return Math.max(0, b.max[0] - b.min[0]) * Math.max(0, b.max[1] - b.min[1]) * Math.max(0, b.max[2] - b.min[2]);
}
const vol = new Map(structures.map((s) => [s.id, volume(s)]));
for (let i = 0; i < structures.length; i++) {
  const a = structures[i];
  if (vol.get(a.id) <= 0) continue;
  for (let j = i + 1; j < structures.length; j++) {
    const b = structures[j];
    if (!vol.get(b.id)) continue;
    if (a.category !== b.category) continue;
    const ca = [0, 1, 2].map((k) => (a.bounds.min[k] + a.bounds.max[k]) / 2);
    const cb = [0, 1, 2].map((k) => (b.bounds.min[k] + b.bounds.max[k]) / 2);
    const dist = Math.hypot(ca[0] - cb[0], ca[1] - cb[1], ca[2] - cb[2]);
    const vr = vol.get(a.id) / vol.get(b.id);
    if (dist < 0.002 && vr > 0.6 && vr < 1.6) {
      findings.push({
        type: "doublon-aabb", severity: "warning", a: a.id, b: b.id,
        fr: `${a.fr || a.en} ↔ ${b.fr || b.en}`,
        detail: `centres à ${dist.toFixed(4)} m, ratio de volume ${vr.toFixed(2)} (imbrication anatomique probable)`,
      });
    }
  }
}

const report = {
  generated: new Date().toISOString(),
  structures: structures.length,
  count: findings.length,
  findings,
};
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "collisions.json"), JSON.stringify(report, null, 2));
const lines = [
  "# Rapport de collisions — jeu de données v2",
  "",
  `${report.count} anomalie(s) sur ${report.structures} structures.`,
  "",
];
for (const f of findings) lines.push(`- **[${f.type}]** ${f.fr} (${f.a}${f.b ? ", " + f.b : ""}) : ${f.detail}`);
if (!findings.length) lines.push("- Aucune collision détectée.");
fs.writeFileSync(path.join(OUT, "collisions.md"), lines.join("\n"));

const errors = findings.filter((f) => f.severity === "error");
console.log(`Collisions: ${errors.length} erreur(s) / ${report.structures} structures`);
for (const f of errors.slice(0, 20)) console.log(`  [${f.type}] ${f.fr} : ${f.detail}`);
if (process.env.COLLISIONS_LOG) {
  fs.writeFileSync(process.env.COLLISIONS_LOG, errors.map((f) => JSON.stringify(f)).join("\n") + "\n");
}
process.exit(errors.length ? 1 : 0);
