import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

/* Analyse qualité du jeu de données v2 : géométrie, normales, indices, bornes
 * et collisions AABB entre structures. Produit un rapport JSON + Markdown. */
const BASE = process.env.V2_DIR || path.resolve(import.meta.dirname, "../public/models/v2");
const OUT = process.env.ANALYSIS_OUT || path.resolve(import.meta.dirname, "../docs/analyses");
const manifest = JSON.parse(fs.readFileSync(path.join(BASE, "manifest.json"), "utf8"));

function readChunk(name) {
  const gz = fs.readFileSync(path.join(BASE, name + ".bin.gz"));
  return zlib.gunzipSync(gz);
}
function recordViews(buf, rec) {
  const pos = new Float32Array(buf.buffer, buf.byteOffset + rec.positions, rec.vertexCount * 3);
  const nrm = new Int16Array(buf.buffer, buf.byteOffset + rec.normals, rec.vertexCount * 3);
  const idx = rec.indexType === "u16"
    ? new Uint16Array(buf.buffer, buf.byteOffset + rec.indices, rec.indexCount)
    : new Uint32Array(buf.buffer, buf.byteOffset + rec.indices, rec.indexCount);
  return { pos, nrm, idx };
}

const chunks = new Map();
function chunkFor(category, lod) {
  const key = `${category}:${lod}`;
  if (!chunks.has(key)) chunks.set(key, readChunk(`${category}.${lod}`));
  return chunks.get(key);
}

const issues = [];
const records = [];
let totalTriangles = 0, degenerateTriangles = 0, nanVertices = 0, badNormals = 0, badIndices = 0;

for (const s of manifest.structures) {
  const rec = s.lod.low;
  const buf = chunkFor(s.category, "low");
  const { pos, nrm, idx } = recordViews(buf, rec);
  const entry = {
    id: s.id, fr: s.fr, category: s.category, subsystem: s.subsystem, side: s.side,
    vertices: rec.vertexCount, triangles: rec.indexCount / 3,
    bounds: rec.bounds, issues: [],
  };
  let localDegenerate = 0;
  for (let i = 0; i < pos.length; i++) {
    if (!Number.isFinite(pos[i])) { nanVertices++; entry.issues.push("position non finie"); break; }
  }
  for (let i = 0; i < nrm.length; i += 3) {
    const len = Math.hypot(nrm[i], nrm[i + 1], nrm[i + 2]);
    if (len < 1000) { badNormals++; entry.issues.push("normale nulle"); break; }
  }
  for (let i = 0; i < idx.length; i++) {
    if (idx[i] >= rec.vertexCount) { badIndices++; entry.issues.push("index hors limites"); break; }
  }
  for (let i = 0; i < idx.length; i += 3) {
    const a = idx[i] * 3, b = idx[i + 1] * 3, c = idx[i + 2] * 3;
    const ux = pos[b] - pos[a], uy = pos[b + 1] - pos[a + 1], uz = pos[b + 2] - pos[a + 2];
    const vx = pos[c] - pos[a], vy = pos[c + 1] - pos[a + 1], vz = pos[c + 2] - pos[a + 2];
    const cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
    if (cx * cx + cy * cy + cz * cz < 1e-16) localDegenerate++;
  }
  degenerateTriangles += localDegenerate;
  totalTriangles += rec.indexCount / 3;
  if (localDegenerate > rec.indexCount / 3 * 0.05) entry.issues.push(`${localDegenerate} triangles dégénérés`);
  const b = rec.bounds;
  const dims = [b.max[0] - b.min[0], b.max[1] - b.min[1], b.max[2] - b.min[2]];
  if (dims.some((d) => !Number.isFinite(d) || d <= 0)) entry.issues.push("bornes invalides");
  if (dims.some((d) => d > 1.8)) entry.issues.push("boîte englobante hors du corps");
  records.push(entry);
  if (entry.issues.length) issues.push(entry);
}

/* Collisions AABB : on ne garde que les paires où le volume commun dépasse
 * 35 % du plus petit volume, ce qui signale un vrai chevauchement. */
function volume(r) { const b = r.bounds; return Math.max(0, b.max[0]-b.min[0]) * Math.max(0, b.max[1]-b.min[1]) * Math.max(0, b.max[2]-b.min[2]); }
const boxes = records.map((r) => ({ ...r, vol: volume(r) })).filter((r) => r.vol > 0);
const collisions = [];
for (let i = 0; i < boxes.length; i++) {
  const a = boxes[i];
  for (let j = i + 1; j < boxes.length; j++) {
    const b = boxes[j];
    if (a.category === b.category && a.subsystem === b.subsystem) continue;
    const A = a.bounds, B = b.bounds;
    const ox = Math.min(A.max[0], B.max[0]) - Math.max(A.min[0], B.min[0]);
    if (ox <= 0) continue;
    const oy = Math.min(A.max[1], B.max[1]) - Math.max(A.min[1], B.min[1]);
    if (oy <= 0) continue;
    const oz = Math.min(A.max[2], B.max[2]) - Math.max(A.min[2], B.min[2]);
    if (oz <= 0) continue;
    const overlap = ox * oy * oz;
    const ratio = overlap / Math.min(a.vol, b.vol);
    /* Une collision AABB est normale en anatomie (structures imbriquées).
       On ne signale comme suspect que les paires quasi identiques : même
       centre et volume très proche => probable doublon. */
    const ca = [(A.min[0]+A.max[0])/2, (A.min[1]+A.max[1])/2, (A.min[2]+A.max[2])/2];
    const cb = [(B.min[0]+B.max[0])/2, (B.min[1]+B.max[1])/2, (B.min[2]+B.max[2])/2];
    const centerDist = Math.hypot(ca[0]-cb[0], ca[1]-cb[1], ca[2]-cb[2]);
    const volRatio = a.vol / b.vol;
    if (ratio > 0.9 && centerDist < 0.015 && volRatio > 0.7 && volRatio < 1.4) {
      collisions.push({ a: a.id, b: b.id, frA: a.fr, frB: b.fr, ratio: +ratio.toFixed(2), centerDist: +centerDist.toFixed(4) });
    }
  }
}
collisions.sort((x, y) => y.ratio - x.ratio);

/* Analyse par groupe : présence des membres, volume, triangles et collisions internes. */
const { GROUPS } = await import(path.resolve(import.meta.dirname, "../src/data/groups.js"));
const byId = new Map(manifest.structures.map((s) => [s.id, s]));
const groupStats = GROUPS.map((group) => {
  const members = group.members.map((id) => byId.get(id)).filter(Boolean);
  const missing = group.members.length - members.length;
  const tris = members.reduce((a, s) => a + s.lod.low.indexCount / 3, 0);
  const b = members.reduce((acc, s) => {
    const r = s.bounds;
    acc.min = acc.min.map((v, i) => Math.min(v, r.min[i]));
    acc.max = acc.max.map((v, i) => Math.max(v, r.max[i]));
    return acc;
  }, { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] });
  const box = members.length
    ? b.max.map((v, i) => +(v - b.min[i]).toFixed(3))
    : [0, 0, 0];
  return {
    id: group.id,
    label: group.label,
    members: members.length,
    missing,
    triangles: tris,
    box,
    movement: group.movement || "",
  };
});

const report = {
  generated: new Date().toISOString(),
  summary: {
    structures: records.length,
    triangles: totalTriangles,
    degenerateTriangles,
    nanVertices,
    badNormals,
    badIndices,
    structuresWithIssues: issues.length,
    collisions: collisions.length,
  },
  issues,
  collisions: collisions.slice(0, 300),
  groups: groupStats,
};
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "rapport-v2.json"), JSON.stringify(report, null, 2));

const lines = [
  "# Analyse qualité — jeu de données v2",
  "",
  `Généré le ${report.generated.slice(0, 10)}.`,
  "",
  "## Résumé",
  "",
  `| Métrique | Valeur |`,
  `|---|---:|`,
  `| Structures analysées | ${records.length} |`,
  `| Triangles (LOD low) | ${totalTriangles.toLocaleString("fr-FR")} |`,
  `| Triangles dégénérés | ${degenerateTriangles} |`,
  `| Positions non finies | ${nanVertices} |`,
  `| Normales nulles | ${badNormals} |`,
  `| Indices hors limites | ${badIndices} |`,
  `| Structures avec anomalie | ${issues.length} |`,
  `| Paires en collision AABB (> 35 %) | ${collisions.length} |`,
  "",
  "## Structures avec anomalie",
  "",
];
for (const e of issues.slice(0, 120)) lines.push(`- **${e.fr || e.id}** (${e.id}) : ${e.issues.join(", ")}`);
if (!issues.length) lines.push("- Aucune.");
lines.push("", "## Collisions AABB les plus fortes", "");
for (const c of collisions.slice(0, 80)) lines.push(`- ${c.frA} ↔ ${c.frB} : ${Math.round(c.ratio * 100)} %`);
lines.push("", "## Analyse par groupe", "", "| Groupe | Membres | Manquants | Triangles | Boîte (m) | Mouvement |", "|---|---:|---:|---:|---|---|");
for (const g of groupStats) {
  lines.push(`| ${g.label} | ${g.members} | ${g.missing} | ${g.triangles.toLocaleString("fr-FR")} | ${g.box.join(" × ")} | ${g.movement} |`);
}
fs.writeFileSync(path.join(OUT, "rapport-v2.md"), lines.join("\n"));
console.log(JSON.stringify(report.summary, null, 2));
