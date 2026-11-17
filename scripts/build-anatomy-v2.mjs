import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { MeshoptSimplifier } from "meshoptimizer";

/* Fabrique le jeu de données v2 : 2 202 structures × 3 niveaux de détail.
 * Sources : Z-Anatomy (export complet) + BodyParts3D (human-atlas).
 * Format binaire identique à anatomy.bin : positions F32, normales I16
 * normalisées, indices U16/U32. Chunks par catégorie et par LOD.
 */
const INVENTORY = process.env.INVENTORY_JSON || path.resolve(import.meta.dirname, "../docs/inventaire-anatomique/structures.json");
const ZANATOMY = process.env.ZANATOMY_ALL || path.resolve(import.meta.dirname, "../zanatomy-export");
const BP = process.env.ANATOMY_SOURCE || "/tmp/opencode/human-atlas/public/models";
const OUT = process.env.V2_OUT || path.resolve(import.meta.dirname, "../public/models/v2");
const CURRENT_MODELS = path.resolve(import.meta.dirname, "../public/models");

const inventory = JSON.parse(fs.readFileSync(INVENTORY, "utf8"));
const zManifest = JSON.parse(fs.readFileSync(path.join(ZANATOMY, "zanatomy-all.json"), "utf8"));
const zBuffer = fs.readFileSync(path.join(ZANATOMY, zManifest.bin));
const atlas = JSON.parse(fs.readFileSync(path.join(BP, "atlas.json"), "utf8"));
const bpChunks = atlas.chunks.map((c) => fs.readFileSync(path.join(BP, c.url.split("/").pop())));
const currentManifest = JSON.parse(fs.readFileSync(path.join(CURRENT_MODELS, "anatomy.json"), "utf8"));
const currentBuffer = fs.readFileSync(path.join(CURRENT_MODELS, "anatomy.bin"));

const partByName = new Map(atlas.parts.map((p) => [p.name, p]));
const allStructures = Object.values(inventory.categories).flat();
/* Concepts à exclure du rendu :
 *  - agrégats « région / système » (> 20 pièces) déjà couverts individuellement ;
 *  - catégories morphologiques génériques (« os plat », « os court »…) qui ne
 *    sont pas une structure anatomique unique ;
 *  - la peau de BodyParts3D, qui est une enveloppe corporelle complète et
 *    doublerait notre lot `skin` dédié. */
const EXCLUDED_CONCEPTS = new Set([
  "organ:bp-skin",
  "organ:bp-skin-appendage",
  "bone:bp-investing-fascia-l",
  "bone:bp-investing-fascia-r",
  "bone:bp-flat-bone",
  "bone:bp-flat-bone-l",
  "bone:bp-flat-bone-r",
  "bone:bp-short-bone-l",
  "bone:bp-short-bone-r",
  "bone:bp-irregular-bone",
  "bone:bp-irregular-bone-l",
  "bone:bp-irregular-bone-r",
  "bone:bp-long-bone-l",
  "bone:bp-long-bone-r",
  "bone:bp-sesamoid-bone-l",
  "bone:bp-sesamoid-bone-r",
  /* Régions anatomiques génériques, pas des structures individuelles. */
  "bone:bp-abdomen",
  "bone:bp-abdomen-l",
  "bone:bp-abdomen-r",
  "bone:bp-back-of-abdomen",
  "bone:bp-neck",
  "muscle:bp-pelvis",
  "muscle:bp-pelvis-l",
  "muscle:bp-pelvis-r",
  "organ:bp-nerve-trunk",
  "organ:bp-nerve-trunk-l",
  "organ:bp-nerve-trunk-r",
]);
const structures = allStructures.filter(
  (s) => !(s.bodyParts3D?.parts > 20) && !EXCLUDED_CONCEPTS.has(s.id),
);
const excludedAggregates = allStructures.length - structures.length;

const LOD = {
  low: { target: 300, label: "vue d'ensemble" },
  medium: { target: 1500, label: "vue d'un système" },
  high: { target: 12000, label: "structure isolée" },
};
const CATEGORIES = ["bone", "muscle", "organ", "skin"];

/* ---------- lecture des sources ---------- */
function readZObject(name) {
  const rec = zManifest.objects[name];
  if (!rec) return null;
  const base = zBuffer.buffer;
  const off = zBuffer.byteOffset;
  const positions = new Float32Array(base, off + rec.positions, rec.vertexCount * 3);
  const srcNormals = new Float32Array(base, off + rec.normals, rec.vertexCount * 3);
  const normals = new Int16Array(srcNormals.length);
  for (let i = 0; i < srcNormals.length; i++) {
    const v = Math.round(srcNormals[i] * 32767);
    normals[i] = Math.max(-32767, Math.min(32767, v));
  }
  const indices = new Uint32Array(base, off + rec.indices, rec.indexCount);
  return { positions, normals, indices, vertexCount: rec.vertexCount, indexCount: rec.indexCount, bounds: rec.bounds };
}

function readBPParts(names) {
  const parts = names.map((n) => partByName.get(n)).filter(Boolean);
  if (!parts.length) return null;
  let vertexCount = 0, indexCount = 0;
  for (const p of parts) { vertexCount += p.vertexCount; indexCount += p.indexCount; }
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Int16Array(vertexCount * 3);
  const indices = new Uint32Array(indexCount);
  let vo = 0, io = 0;
  for (const p of parts) {
    const buf = bpChunks[p.chunk];
    positions.set(new Float32Array(buf.buffer, buf.byteOffset + p.positions, p.vertexCount * 3), vo * 3);
    normals.set(new Int16Array(buf.buffer, buf.byteOffset + p.normals, p.vertexCount * 3), vo * 3);
    const idx = new Uint32Array(buf.buffer, buf.byteOffset + p.indices, p.indexCount);
    for (let i = 0; i < idx.length; i++) indices[io + i] = idx[i] + vo;
    vo += p.vertexCount; io += p.indexCount;
  }
  return { positions, normals, indices, vertexCount, indexCount, bounds: computeBounds(positions) };
}

function readCurrentSkin() {
  const rec = currentManifest.skin;
  return {
    positions: new Float32Array(currentBuffer.buffer, currentBuffer.byteOffset + rec.positions, rec.vertexCount * 3),
    normals: new Int16Array(currentBuffer.buffer, currentBuffer.byteOffset + rec.normals, rec.vertexCount * 3),
    indices: rec.indexType === "u16"
      ? new Uint16Array(currentBuffer.buffer, currentBuffer.byteOffset + rec.indices, rec.indexCount)
      : new Uint32Array(currentBuffer.buffer, currentBuffer.byteOffset + rec.indices, rec.indexCount),
    vertexCount: rec.vertexCount,
    indexCount: rec.indexCount,
    bounds: rec.bounds,
  };
}

function computeBounds(positions) {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < positions.length; i += 3) {
    for (let a = 0; a < 3; a++) {
      const v = positions[i + a];
      if (v < min[a]) min[a] = v;
      if (v > max[a]) max[a] = v;
    }
  }
  return { min, max };
}

function compact(indices, positions, normals) {
  const map = new Int32Array(positions.length / 3).fill(-1);
  let n = 0;
  for (let i = 0; i < indices.length; i++) {
    const v = indices[i];
    if (map[v] < 0) map[v] = n++;
  }
  const p = new Float32Array(n * 3), no = new Int16Array(n * 3);
  for (let v = 0; v < map.length; v++) {
    const nv = map[v];
    if (nv < 0) continue;
    p[nv * 3] = positions[v * 3]; p[nv * 3 + 1] = positions[v * 3 + 1]; p[nv * 3 + 2] = positions[v * 3 + 2];
    no[nv * 3] = normals[v * 3]; no[nv * 3 + 1] = normals[v * 3 + 1]; no[nv * 3 + 2] = normals[v * 3 + 2];
  }
  const idx = new Uint32Array(indices.length);
  for (let i = 0; i < indices.length; i++) idx[i] = map[indices[i]];
  return { positions: p, normals: no, indices: idx, vertexCount: n, indexCount: idx.length };
}

function removeDegenerate(geometry) {
  const kept = [];
  const { positions, indices } = geometry;
  for (let i = 0; i < indices.length; i += 3) {
    const a = indices[i] * 3, b = indices[i + 1] * 3, c = indices[i + 2] * 3;
    const ux = positions[b] - positions[a], uy = positions[b + 1] - positions[a + 1], uz = positions[b + 2] - positions[a + 2];
    const vx = positions[c] - positions[a], vy = positions[c + 1] - positions[a + 1], vz = positions[c + 2] - positions[a + 2];
    const cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
    if (cx * cx + cy * cy + cz * cz >= 1e-16) kept.push(indices[i], indices[i + 1], indices[i + 2]);
  }
  if (kept.length === indices.length) return geometry;
  if (kept.length < 3) return geometry;
  return compact(Uint32Array.from(kept), geometry.positions, geometry.normals);
}

function makeLod(geometry, targetTriangles) {
  const triangles = geometry.indexCount / 3;
  if (triangles <= targetTriangles) return geometry;
  const target = Math.max(3, Math.floor(targetTriangles) * 3);
  try {
    const [simplified] = MeshoptSimplifier.simplify(
      geometry.indices, geometry.positions, 3, target, 0.02, ["LockBorder"],
    );
    if (!simplified || simplified.length < 3) return geometry;
    return compact(simplified, geometry.positions, geometry.normals);
  } catch {
    return geometry;
  }
}

/* ---------- accumulateurs de chunks ---------- */
const chunks = {};
for (const cat of CATEGORIES) {
  chunks[cat] = {};
  for (const lod of Object.keys(LOD)) chunks[cat][lod] = { parts: [], length: 0 };
}

function pad4(acc) {
  while (acc.length % 4) { acc.parts.push(Buffer.from([0])); acc.length++; }
}
function push(acc, buffer) { acc.parts.push(buffer); acc.length += buffer.length; }

function writeGeometry(acc, input) {
  const geometry = removeDegenerate(input);
  pad4(acc);
  const positions = acc.length;
  push(acc, Buffer.from(geometry.positions.buffer, geometry.positions.byteOffset, geometry.positions.byteLength));
  pad4(acc);
  const normals = acc.length;
  push(acc, Buffer.from(geometry.normals.buffer, geometry.normals.byteOffset, geometry.normals.byteLength));
  pad4(acc);
  const indicesOffset = acc.length;
  const useU16 = geometry.vertexCount <= 65535;
  const indices = useU16 ? Uint16Array.from(geometry.indices) : geometry.indices;
  push(acc, Buffer.from(indices.buffer, indices.byteOffset, indices.byteLength));
  return {
    positions, normals, indices: indicesOffset,
    vertexCount: geometry.vertexCount,
    indexCount: indices.length,
    indexType: useU16 ? "u16" : "u32",
    bounds: computeBounds(geometry.positions),
  };
}

await MeshoptSimplifier.ready;

const manifest = {
  version: "2.0",
  generated: new Date().toISOString().slice(0, 10),
  format: "positions F32, normales I16 normalisées, indices U16/U32",
  sources: [
    { name: "BodyParts3D 4.0", license: "CC BY 4.0", url: "https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html" },
    { name: "Z-Anatomy", license: "CC BY-SA 4.0", url: "https://github.com/Z-Anatomy/Models-of-human-anatomy" },
  ],
  license: "CC BY-SA 4.0 (jeu de données combiné)",
  excludedAggregates,
  lod: LOD,
  structures: [],
};

let missing = 0;
for (const s of structures) {
  const geometry = s.object ? readZObject(s.object) : readBPParts(s.bodyParts3D?.partNames || []);
  if (!geometry) { missing++; continue; }
  const entry = {
    id: s.id,
    fr: s.french,
    en: s.english,
    la: s.latin,
    ta2: s.ta2Id,
    category: s.category,
    subsystem: s.subsystem || "",
    side: s.side || null,
    source: s.best.source,
    materials: s.materials || [],
    bounds: geometry.bounds,
    lod: {},
  };
  for (const [lodName, cfg] of Object.entries(LOD)) {
    const lodGeometry = makeLod(geometry, cfg.target);
    entry.lod[lodName] = writeGeometry(chunks[s.category][lodName], lodGeometry);
  }
  manifest.structures.push(entry);
}

/* La peau, commune à toutes les vues. */
manifest.skin = { lod: {} };
const skin = readCurrentSkin();
for (const [lodName, cfg] of Object.entries(LOD)) {
  manifest.skin.lod[lodName] = writeGeometry(chunks.skin[lodName], makeLod(skin, cfg.target));
}

fs.mkdirSync(OUT, { recursive: true });
let totalRaw = 0, totalGzip = 0;
for (const cat of CATEGORIES) {
  for (const [lodName, acc] of Object.entries(chunks[cat])) {
    const buffer = Buffer.concat(acc.parts);
    const gz = zlib.gzipSync(buffer, { level: 6 });
    const name = `${cat}.${lodName}.bin`;
    /* On ne versionne que le .gz (le navigateur le décompresse avec
     * DecompressionStream). KEEP_RAW=1 permet de garder le binaire brut. */
    if (process.env.KEEP_RAW === "1") fs.writeFileSync(path.join(OUT, name), buffer);
    fs.writeFileSync(path.join(OUT, name + ".gz"), gz);
    totalRaw += buffer.length; totalGzip += gz.length;
    console.log(`${name.padEnd(22)} ${(buffer.length / 1048576).toFixed(1)} Mo -> ${(gz.length / 1048576).toFixed(1)} Mo gz`);
  }
}
fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest));
fs.copyFileSync(path.join(CURRENT_MODELS, "README.md"), path.join(OUT, "README.md"));

console.log(`\nStructures: ${manifest.structures.length} (manquantes: ${missing})`);
console.log(`Total brut: ${(totalRaw / 1048576).toFixed(1)} Mo, gzip: ${(totalGzip / 1048576).toFixed(1)} Mo`);
