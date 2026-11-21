import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

/* Audit qualité 3D — socle mesurable de la méthode « détail de qualité militaire ».
 *
 * Mesure, pour chaque structure et chaque LOD :
 *  - topologie : arêtes libres (bords), arêtes non-manifold, composantes connexes ;
 *  - intégrité : triangles dégénérés, faces dupliquées, indices hors bornes, NaN ;
 *  - normales : faces inversées par rapport aux normales de sommet, normales nulles ;
 *  - géométrie : aire, volume signé (si fermé), longueurs d'arêtes (mm), densité ;
 *  - orientation globale : volume signé négatif sur un maillage fermé.
 *
 * Sortie : docs/analyses/qualite-3d.json + qualite-3d.md
 * Usage : node scripts/audit-qualite-3d.mjs [--lod=high|medium|low|all]
 */

const BASE = process.env.V2_DIR || path.resolve(import.meta.dirname, "../public/models/v2");
const OUT = process.env.QUALITE_OUT || path.resolve(import.meta.dirname, "../docs/analyses");
const LOD_ARG = (process.argv.find((a) => a.startsWith("--lod=")) || "--lod=high").split("=")[1];
const LODS = LOD_ARG === "all" ? ["low", "medium", "high"] : [LOD_ARG];
const CHECK = process.argv.includes("--check");
const WRITE_BASELINE = process.argv.includes("--baseline");
const BASELINE_PATH = process.env.QUALITE_BASELINE || path.resolve(OUT, "qualite-3d-baseline.json");
if (!["low", "medium", "high"].includes(LODS[0])) {
  console.error("LOD inconnu :", LOD_ARG);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(path.join(BASE, "manifest.json"), "utf8"));

const chunkCache = new Map();
function chunkFor(category, lod, record) {
  const cle = record?.chunk ? record.chunk.replace(/\.bin$/, "") : `${category}.${lod}`;
  const key = `${cle}:${lod}`;
  if (!chunkCache.has(key)) {
    const file = path.join(BASE, `${cle}.bin.gz`);
    chunkCache.set(key, zlib.gunzipSync(fs.readFileSync(file)));
  }
  return chunkCache.get(key);
}

function views(buf, rec) {
  const pos = new Float32Array(buf.buffer, buf.byteOffset + rec.positions, rec.vertexCount * 3);
  const nrm = new Int16Array(buf.buffer, buf.byteOffset + rec.normals, rec.vertexCount * 3);
  const idx = rec.indexType === "u16"
    ? new Uint16Array(buf.buffer, buf.byteOffset + rec.indices, rec.indexCount)
    : new Uint32Array(buf.buffer, buf.byteOffset + rec.indices, rec.indexCount);
  return { pos, nrm, idx };
}

const median = (sorted) => sorted.length ? sorted[Math.floor((sorted.length - 1) / 2)] : 0;
const percentile = (sorted, p) => sorted.length ? sorted[Math.floor(p * (sorted.length - 1))] : 0;

/* Analyse d'une structure. Les positions sont en mètres, les sorties en mm / cm². */
function analyzeStructure(pos, nrm, idx, vertexCount) {
  const triCount = idx.length / 3;
  const result = {
    triangles: triCount,
    vertices: vertexCount,
    degenerate: 0,
    duplicateFaces: 0,
    outOfRange: 0,
    nan: 0,
    zeroNormals: 0,
    flippedFaces: 0,
    boundaryEdges: 0,
    nonManifoldEdges: 0,
    components: 0,
    isolatedVertices: 0,
    areaCm2: 0,
    volumeCm3: null,
    edgeMinMm: 0,
    edgeMedianMm: 0,
    edgeP99Mm: 0,
    edgeMaxMm: 0,
    densityPerCm2: 0,
    invertedWinding: false,
  };

  for (let i = 0; i < pos.length; i++) {
    if (!Number.isFinite(pos[i])) { result.nan++; break; }
  }
  for (let i = 0; i < nrm.length; i += 3) {
    if (Math.hypot(nrm[i], nrm[i + 1], nrm[i + 2]) < 1000) result.zeroNormals++;
  }
  for (let i = 0; i < idx.length; i++) {
    if (idx[i] >= vertexCount) result.outOfRange++;
  }
  if (result.outOfRange || result.nan) return result;

  if (vertexCount >= 2097152) throw new Error(`vertexCount trop grand pour la clé d'arête : ${vertexCount}`);
  const edges = new Map();       // clé min*2^21+max -> occurrences
  const faces = new Set();
  const lengths = new Float64Array(triCount * 3);
  let area = 0;
  let signedVolume = 0;

  const parent = new Int32Array(vertexCount);
  const used = new Uint8Array(vertexCount);
  for (let i = 0; i < vertexCount; i++) parent[i] = i;
  const find = (x) => {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  };
  const union = (a, b) => {
    const ra = find(a), rb = find(b);
    if (ra !== rb) parent[rb] = ra;
  };

  const addEdge = (a, b) => {
    const lo = a < b ? a : b, hi = a < b ? b : a;
    const key = lo * 2097152 + hi;
    edges.set(key, (edges.get(key) || 0) + 1);
  };

  let l = 0;
  for (let t = 0; t < triCount; t++) {
    const ia = idx[t * 3], ib = idx[t * 3 + 1], ic = idx[t * 3 + 2];
    const a = ia * 3, b = ib * 3, c = ic * 3;

    const ux = pos[b] - pos[a], uy = pos[b + 1] - pos[a + 1], uz = pos[b + 2] - pos[a + 2];
    const vx = pos[c] - pos[a], vy = pos[c + 1] - pos[a + 1], vz = pos[c + 2] - pos[a + 2];
    const cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
    const cross2 = cx * cx + cy * cy + cz * cz;
    const triArea = Math.sqrt(cross2) / 2;
    area += triArea;
    if (triArea < 1e-12) result.degenerate++;

    const wx = pos[c] - pos[b], wy = pos[c + 1] - pos[b + 1], wz = pos[c + 2] - pos[b + 2];
    lengths[l++] = Math.hypot(ux, uy, uz) * 1000;
    lengths[l++] = Math.hypot(vx, vy, vz) * 1000;
    lengths[l++] = Math.hypot(wx, wy, wz) * 1000;

    // volume signé : (a · (b × c)) / 6
    signedVolume += (pos[a] * (pos[b + 1] * pos[c + 2] - pos[b + 2] * pos[c + 1])
      + pos[a + 1] * (pos[b + 2] * pos[c] - pos[b] * pos[c + 2])
      + pos[a + 2] * (pos[b] * pos[c + 1] - pos[b + 1] * pos[c])) / 6;

    // normale de face vs normales de sommet
    const fn = [cx, cy, cz];
    const vn = [nrm[a] + nrm[b] + nrm[c], nrm[a + 1] + nrm[b + 1] + nrm[c + 1], nrm[a + 2] + nrm[b + 2] + nrm[c + 2]];
    if (fn[0] * vn[0] + fn[1] * vn[1] + fn[2] * vn[2] < 0) result.flippedFaces++;

    // faces dupliquées (même triplet, ordre indifférent)
    const s0 = Math.min(ia, ib, ic), s2 = Math.max(ia, ib, ic), s1 = ia + ib + ic - s0 - s2;
    const fkey = (s0 * vertexCount + s1) * vertexCount + s2;
    if (faces.has(fkey)) result.duplicateFaces++; else faces.add(fkey);

    addEdge(ia, ib); addEdge(ib, ic); addEdge(ic, ia);
    union(ia, ib); union(ib, ic);
    used[ia] = used[ib] = used[ic] = 1;
  }

  for (const count of edges.values()) {
    if (count === 1) result.boundaryEdges++;
    else if (count > 2) result.nonManifoldEdges++;
  }
  for (let i = 0; i < vertexCount; i++) {
    if (!used[i]) result.isolatedVertices++;
    else if (find(i) === i) result.components++;
  }

  const sorted = lengths.subarray(0, l).sort();
  result.areaCm2 = area * 10000;
  result.volumeCm3 = result.boundaryEdges === 0 && result.nonManifoldEdges === 0
    ? signedVolume * 1e6
    : null;
  result.invertedWinding = result.volumeCm3 !== null && result.volumeCm3 < 0;
  if (result.volumeCm3 !== null) result.volumeCm3 = Math.abs(result.volumeCm3);
  result.edgeMinMm = sorted[0] || 0;
  result.edgeMedianMm = median(sorted);
  result.edgeP99Mm = percentile(sorted, 0.99);
  result.edgeMaxMm = sorted[sorted.length - 1] || 0;
  result.densityPerCm2 = result.areaCm2 > 0 ? triCount / result.areaCm2 : 0;
  return result;
}

const rows = [];
let structuresAnalyzed = 0;

for (const s of manifest.structures) {
  for (const lod of LODS) {
    const rec = s.lod?.[lod];
    if (!rec || !rec.indexCount) continue;
    const { pos, nrm, idx } = views(chunkFor(s.category, lod, rec), rec);
    const m = analyzeStructure(pos, nrm, idx, rec.vertexCount);
    rows.push({
      id: s.id,
      fr: s.fr,
      category: s.category,
      subsystem: s.subsystem || "",
      source: s.source,
      lod,
      ...m,
    });
    structuresAnalyzed++;
  }
}

/* Agrégats par catégorie et par LOD. */
function groupBy(rows, keyFn) {
  const map = new Map();
  for (const r of rows) {
    const k = keyFn(r);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(r);
  }
  return map;
}

const byCatLod = [...groupBy(rows, (r) => `${r.category}:${r.lod}`)]
  .map(([key, list]) => {
    const [category, lod] = key.split(":");
    const tri = list.map((r) => r.triangles).sort((a, b) => a - b);
    const dens = list.map((r) => r.densityPerCm2).sort((a, b) => a - b);
    return {
      category, lod,
      structures: list.length,
      triangles: tri.reduce((a, b) => a + b, 0),
      triMedian: median(tri),
      triP10: percentile(tri, 0.1),
      triP90: percentile(tri, 0.9),
      densityMedian: +median(dens).toFixed(1),
      watertight: list.filter((r) => r.boundaryEdges === 0 && r.nonManifoldEdges === 0).length,
      nonManifold: list.filter((r) => r.nonManifoldEdges > 0).length,
      withBoundary: list.filter((r) => r.boundaryEdges > 0).length,
      multiComponent: list.filter((r) => r.components > 1).length,
      degenerate: list.reduce((a, r) => a + r.degenerate, 0),
      flipped: list.reduce((a, r) => a + r.flippedFaces, 0),
      inverted: list.filter((r) => r.invertedWinding).length,
    };
  })
  .sort((a, b) => a.lod.localeCompare(b.lod) || a.category.localeCompare(b.category));

const totalTris = rows.reduce((a, r) => a + r.triangles, 0);
const totalDegenerate = rows.reduce((a, r) => a + r.degenerate, 0);
const totalFlipped = rows.reduce((a, r) => a + r.flippedFaces, 0);
const totalDuplicate = rows.reduce((a, r) => a + r.duplicateFaces, 0);
const watertightRows = rows.filter((r) => r.boundaryEdges === 0 && r.nonManifoldEdges === 0);

const ranked = (fn) => [...rows].sort(fn).slice(0, 25).map((r) => ({
  id: r.id, fr: r.fr, category: r.category, lod: r.lod,
  triangles: r.triangles, boundaryEdges: r.boundaryEdges,
  nonManifoldEdges: r.nonManifoldEdges, components: r.components,
  densityPerCm2: +r.densityPerCm2.toFixed(1),
  edgeP99Mm: +r.edgeP99Mm.toFixed(2), edgeMaxMm: +r.edgeMaxMm.toFixed(2),
  areaCm2: +r.areaCm2.toFixed(2),
  flippedFaces: r.flippedFaces, degenerate: r.degenerate,
  duplicateFaces: r.duplicateFaces, volumeCm3: r.volumeCm3,
}));

const bySource = [...groupBy(rows, (r) => r.source || "inconnue")]
  .map(([source, list]) => ({
    source,
    structures: list.length,
    watertight: list.filter((r) => r.boundaryEdges === 0 && r.nonManifoldEdges === 0).length,
    inverted: list.filter((r) => r.invertedWinding).length,
    multiComponent: list.filter((r) => r.components > 1).length,
    triangles: list.reduce((a, r) => a + r.triangles, 0),
  }))
  .sort((a, b) => b.structures - a.structures);

const report = {
  generated: new Date().toISOString(),
  dataset: {
    structures: manifest.structures.length,
    lodAnalyzed: LODS,
    rows: structuresAnalyzed,
    triangles: totalTris,
    sources: manifest.sources,
  },
  summary: {
    watertightStructures: watertightRows.length,
    watertightPct: +(100 * watertightRows.length / rows.length).toFixed(1),
    nonManifoldStructures: rows.filter((r) => r.nonManifoldEdges > 0).length,
    withBoundaryStructures: rows.filter((r) => r.boundaryEdges > 0).length,
    multiComponentStructures: rows.filter((r) => r.components > 1).length,
    degenerateTriangles: totalDegenerate,
    degeneratePct: +(100 * totalDegenerate / totalTris).toFixed(4),
    flippedFaces: totalFlipped,
    flippedPct: +(100 * totalFlipped / totalTris).toFixed(3),
    duplicateFaces: totalDuplicate,
    invertedWindingStructures: rows.filter((r) => r.invertedWinding).length,
    zeroNormalVertices: rows.reduce((a, r) => a + r.zeroNormals, 0),
    outOfRangeIndices: rows.reduce((a, r) => a + r.outOfRange, 0),
    nanPositions: rows.reduce((a, r) => a + r.nan, 0),
  },
  byCategoryLod: byCatLod,
  bySource,
  worst: {
    boundaryRatio: ranked((a, b) => (b.boundaryEdges / Math.max(1, b.triangles)) - (a.boundaryEdges / Math.max(1, a.triangles))),
    nonManifold: ranked((a, b) => b.nonManifoldEdges - a.nonManifoldEdges),
    fragmented: ranked((a, b) => b.components - a.components),
    lowDensity: ranked((a, b) => a.densityPerCm2 - b.densityPerCm2),
    longEdges: ranked((a, b) => b.edgeMaxMm - a.edgeMaxMm),
    flipped: ranked((a, b) => b.flippedFaces - a.flippedFaces),
  },
  structures: rows.map((r) => ({
    ...r,
    areaCm2: +r.areaCm2.toFixed(3),
    volumeCm3: r.volumeCm3 === null ? null : +r.volumeCm3.toFixed(3),
    densityPerCm2: +r.densityPerCm2.toFixed(2),
    edgeMinMm: +r.edgeMinMm.toFixed(4),
    edgeMedianMm: +r.edgeMedianMm.toFixed(3),
    edgeP99Mm: +r.edgeP99Mm.toFixed(3),
    edgeMaxMm: +r.edgeMaxMm.toFixed(3),
  })),
};

/* --- Porte CI : comparaison à une baseline versionnée ---------------------
 * On ne compare pas seulement les totaux : une structure qui passe de saine à
 * défectueuse est une régression même si la moyenne s'améliore ailleurs. */
if (CHECK) {
  if (!fs.existsSync(BASELINE_PATH)) {
    console.error(`[audit:3d:check] baseline absente : ${BASELINE_PATH}`);
    console.error("  générez-la avec : npm run audit:3d:baseline");
    process.exit(1);
  }
  const base = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  if (base.lod !== LODS[0]) {
    console.error(`[audit:3d:check] baseline ${base.lod} ≠ LOD analysé ${LODS[0]}`);
    process.exit(1);
  }
  const regressions = [];
  const current = new Map(rows.map((r) => [r.id, r]));
  for (const [id, b] of Object.entries(base.structures)) {
    const c = current.get(id);
    if (!c) { regressions.push(`${id} : structure disparue`); continue; }
    if (c.nonManifoldEdges > b.nonManifoldEdges) regressions.push(`${id} : non-manifold ${b.nonManifoldEdges} → ${c.nonManifoldEdges}`);
    if (c.duplicateFaces > b.duplicateFaces) regressions.push(`${id} : faces dupliquées ${b.duplicateFaces} → ${c.duplicateFaces}`);
    if (c.degenerate > b.degenerate) regressions.push(`${id} : dégénérés ${b.degenerate} → ${c.degenerate}`);
    if (c.boundaryEdges > b.boundaryEdges) regressions.push(`${id} : arêtes libres ${b.boundaryEdges} → ${c.boundaryEdges}`);
    if (c.components > b.components) regressions.push(`${id} : composantes ${b.components} → ${c.components}`);
    if (c.invertedWinding && !b.invertedWinding) regressions.push(`${id} : winding inversé apparu`);
    if (c.zeroNormals > b.zeroNormals) regressions.push(`${id} : normales nulles ${b.zeroNormals} → ${c.zeroNormals}`);
    if (c.outOfRange > b.outOfRange) regressions.push(`${id} : indices hors bornes ${b.outOfRange} → ${c.outOfRange}`);
    if (c.nan > b.nan) regressions.push(`${id} : positions NaN ${b.nan} → ${c.nan}`);
    const flippedTolerance = Math.max(2, b.triangles * 0.0002);
    if (c.flippedFaces > b.flippedFaces + flippedTolerance) regressions.push(`${id} : faces inversées ${b.flippedFaces} → ${c.flippedFaces}`);
    if (c.triangles < b.triangles * 0.98) regressions.push(`${id} : détail perdu ${b.triangles} → ${c.triangles} triangles`);
  }
  const g = base.summary;
  const globalChecks = [
    ["structures étanches", report.summary.watertightStructures, g.watertightStructures, "baisse"],
    ["structures non-manifold", report.summary.nonManifoldStructures, g.nonManifoldStructures, "hausse"],
    ["structures à bords", report.summary.withBoundaryStructures, g.withBoundaryStructures, "hausse"],
    ["structures pluri-composantes", report.summary.multiComponentStructures, g.multiComponentStructures, "hausse"],
    ["triangles dégénérés", report.summary.degenerateTriangles, g.degenerateTriangles, "hausse"],
    ["faces inversées", report.summary.flippedFaces, g.flippedFaces, "hausse"],
    ["faces dupliquées", report.summary.duplicateFaces, g.duplicateFaces, "hausse"],
    ["winding inversé", report.summary.invertedWindingStructures, g.invertedWindingStructures, "hausse"],
    ["normales nulles", report.summary.zeroNormalVertices, g.zeroNormalVertices, "hausse"],
    ["indices hors bornes", report.summary.outOfRangeIndices, g.outOfRangeIndices, "hausse"],
    ["positions NaN", report.summary.nanPositions, g.nanPositions, "hausse"],
  ];
  for (const [label, value, reference, direction] of globalChecks) {
    if (direction === "hausse" ? value > reference : value < reference) {
      regressions.push(`${label} : ${reference} → ${value}`);
    }
  }
  if (regressions.length) {
    console.error(`[audit:3d:check] ÉCHEC · ${regressions.length} régression(s)`);
    for (const r of regressions.slice(0, 50)) console.error(`  - ${r}`);
    if (regressions.length > 50) console.error(`  … et ${regressions.length - 50} autre(s)`);
    process.exit(1);
  }
  console.log(`[audit:3d:check] OK · ${rows.length} structures comparées à ${path.basename(BASELINE_PATH)}`);
  process.exit(0);
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "qualite-3d.json"), JSON.stringify(report, null, 1));

if (WRITE_BASELINE) {
  if (LODS.length > 1) {
    console.error("[audit:3d] une baseline s'écrit pour un seul LOD");
    process.exit(1);
  }
  const baseline = {
    version: 1,
    generated: new Date().toISOString(),
    lod: LODS[0],
    summary: report.summary,
    structures: Object.fromEntries(rows.map((r) => [r.id, {
      triangles: r.triangles,
      boundaryEdges: r.boundaryEdges,
      nonManifoldEdges: r.nonManifoldEdges,
      duplicateFaces: r.duplicateFaces,
      components: r.components,
      degenerate: r.degenerate,
      flippedFaces: r.flippedFaces,
      invertedWinding: r.invertedWinding,
      zeroNormals: r.zeroNormals,
      outOfRange: r.outOfRange,
      nan: r.nan,
    }])),
  };
  fs.writeFileSync(BASELINE_PATH, JSON.stringify(baseline));
  console.log(`[audit:3d] baseline écrite : ${BASELINE_PATH}`);
}

/* Rapport Markdown lisible. */
const fmt = (n, d = 0) => Number(n).toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });
const lines = [];
lines.push("# Audit qualité 3D — mesures topologiques");
lines.push("");
lines.push(`Généré le ${new Date().toISOString().slice(0, 10)} par \`npm run audit:3d\`.`);
lines.push(`LOD analysé(s) : **${LODS.join(", ")}** · ${fmt(rows.length)} enregistrements · ${fmt(totalTris)} triangles.`);
lines.push("");
lines.push("## Synthèse");
lines.push("");
lines.push("| Indicateur | Valeur |");
lines.push("|---|---:|");
lines.push(`| Structures étanches et manifold | **${fmt(report.summary.watertightStructures)} / ${fmt(rows.length)}** (${report.summary.watertightPct} %) |`);
lines.push(`| Structures avec arêtes libres (bords) | ${fmt(report.summary.withBoundaryStructures)} |`);
lines.push(`| Structures avec arêtes non-manifold | ${fmt(report.summary.nonManifoldStructures)} |`);
lines.push(`| Structures en plusieurs composantes connexes | ${fmt(report.summary.multiComponentStructures)} |`);
lines.push(`| Triangles dégénérés | ${fmt(totalDegenerate)} (${report.summary.degeneratePct} %) |`);
lines.push(`| Faces inversées (normale de face ≠ sommets) | ${fmt(totalFlipped)} (${report.summary.flippedPct} %) |`);
lines.push(`| Faces dupliquées | ${fmt(totalDuplicate)} |`);
lines.push(`| Structures à volume signé négatif (winding inversé) | ${fmt(report.summary.invertedWindingStructures)} |`);
lines.push(`| Normales nulles | ${fmt(report.summary.zeroNormalVertices)} |`);
lines.push(`| Indices hors bornes | ${fmt(report.summary.outOfRangeIndices)} |`);
lines.push("");
lines.push("## Par catégorie et par LOD");
lines.push("");
lines.push("| Catégorie | LOD | Structures | Triangles | Médiane | P10 | P90 | Densité méd. (tri/cm²) | Étanches | Non-manifold | Pluri-composantes |");
lines.push("|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|");
for (const c of byCatLod) {
  lines.push(`| ${c.category} | ${c.lod} | ${fmt(c.structures)} | ${fmt(c.triangles)} | ${fmt(c.triMedian)} | ${fmt(c.triP10)} | ${fmt(c.triP90)} | ${c.densityMedian} | ${fmt(c.watertight)} | ${fmt(c.nonManifold)} | ${fmt(c.multiComponent)} |`);
}
lines.push("");
lines.push("## Par source");
lines.push("");
lines.push("| Source | Structures | Triangles | Étanches | Winding inversé | Pluri-composantes |");
lines.push("|---|---:|---:|---:|---:|---:|");
for (const s of bySource) {
  lines.push(`| ${s.source} | ${fmt(s.structures)} | ${fmt(s.triangles)} | ${fmt(s.watertight)} | ${fmt(s.inverted)} | ${fmt(s.multiComponent)} |`);
}
lines.push("");
lines.push("## 15 structures les plus ouvertes (ratio arêtes libres / triangles)");
lines.push("");
lines.push("| Structure | Cat. | LOD | Tris | Arêtes libres | Ratio |");
lines.push("|---|---|---|---:|---:|---:|");
for (const r of report.worst.boundaryRatio.slice(0, 15)) {
  lines.push(`| \`${r.id}\` | ${r.category} | ${r.lod} | ${fmt(r.triangles)} | ${fmt(r.boundaryEdges)} | ${(100 * r.boundaryEdges / Math.max(1, r.triangles)).toFixed(1)} % |`);
}
lines.push("");
lines.push("## 15 structures les plus fragmentées (composantes connexes)");
lines.push("");
lines.push("| Structure | Cat. | LOD | Tris | Composantes |");
lines.push("|---|---|---|---:|---:|");
for (const r of report.worst.fragmented.slice(0, 15)) {
  lines.push(`| \`${r.id}\` | ${r.category} | ${r.lod} | ${fmt(r.triangles)} | ${fmt(r.components)} |`);
}
lines.push("");
lines.push("## 15 structures fermées à winding inversé (volume signé négatif)");
lines.push("");
lines.push("| Structure | Cat. | LOD | Tris | Volume (cm³) |");
lines.push("|---|---|---|---:|---:|");
for (const r of rows.filter((x) => x.invertedWinding).sort((a, b) => a.volumeCm3 - b.volumeCm3).slice(0, 15)) {
  lines.push(`| \`${r.id}\` | ${r.category} | ${r.lod} | ${fmt(r.triangles)} | ${fmt(Math.abs(r.volumeCm3), 2)} |`);
}
lines.push("");
lines.push("## 15 densités les plus faibles (triangles / cm²)");
lines.push("");
lines.push("| Structure | Cat. | LOD | Tris | Aire (cm²) | Densité | Arête max (mm) |");
lines.push("|---|---|---|---:|---:|---:|---:|");
for (const r of report.worst.lowDensity.slice(0, 15)) {
  lines.push(`| \`${r.id}\` | ${r.category} | ${r.lod} | ${fmt(r.triangles)} | ${fmt(r.areaCm2, 2)} | ${r.densityPerCm2} | ${fmt(r.edgeMaxMm, 1)} |`);
}
lines.push("");
lines.push("## 15 arêtes les plus longues");
lines.push("");
lines.push("| Structure | Cat. | LOD | Tris | Arête max (mm) | P99 (mm) |");
lines.push("|---|---|---|---:|---:|---:|");
for (const r of report.worst.longEdges.slice(0, 15)) {
  lines.push(`| \`${r.id}\` | ${r.category} | ${r.lod} | ${fmt(r.triangles)} | ${fmt(r.edgeMaxMm, 1)} | ${fmt(r.edgeP99Mm, 2)} |`);
}
lines.push("");
lines.push("## 15 structures aux faces les plus inversées");
lines.push("");
lines.push("| Structure | Cat. | LOD | Tris | Faces inversées | % |");
lines.push("|---|---|---|---:|---:|---:|");
for (const r of report.worst.flipped.slice(0, 15)) {
  lines.push(`| \`${r.id}\` | ${r.category} | ${r.lod} | ${fmt(r.triangles)} | ${fmt(r.flippedFaces)} | ${(100 * r.flippedFaces / Math.max(1, r.triangles)).toFixed(1)} % |`);
}
lines.push("");
lines.push("## Limites de cet audit");
lines.push("");
lines.push("- Il mesure la **topologie et l'intégrité**, pas la **fidélité anatomique** : un maillage");
lines.push("  étanche peut être faux. La fidélité exige une revue experte et des captures multi-angles.");
lines.push("- Les maillages ouverts (séreuses, fascia, peau, vaisseaux coupés) sont légitimement");
lines.push("  non étanches ; le taux global d'étanchéité ne doit donc pas être lu comme une note.");
lines.push("- Les composantes multiples peuvent être anatomiquement légitimes (dents, ganglions) ;");
lines.push("  elles sont un signal à relire, pas une faute automatique.");
lines.push("- La densité en tri/cm² ne dit rien de la forme : une sphère dense reste une sphère.");
lines.push("");
lines.push("JSON complet : `docs/analyses/qualite-3d.json`.");
fs.writeFileSync(path.join(OUT, "qualite-3d.md"), lines.join("\n"));

console.log(`[audit:3d] ${rows.length} enregistrements, ${totalTris} triangles`);
console.log(`[audit:3d] étanches ${report.summary.watertightStructures}/${rows.length} (${report.summary.watertightPct} %)`);
console.log(`[audit:3d] non-manifold ${report.summary.nonManifoldStructures}, bords ${report.summary.withBoundaryStructures}, pluri-composantes ${report.summary.multiComponentStructures}`);
console.log(`[audit:3d] dégénérés ${totalDegenerate} (${report.summary.degeneratePct} %), inversées ${totalFlipped} (${report.summary.flippedPct} %), winding inversé ${report.summary.invertedWindingStructures}`);
console.log(`[audit:3d] écrit ${path.join(OUT, "qualite-3d.md")}`);
