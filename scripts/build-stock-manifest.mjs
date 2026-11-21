/* Construit un manifeste applicatif depuis l'export Z-Anatomy stock.
 * Écrit dans STOCK_BUILD_OUT (jamais directement dans public/ sans validation).
 * Corrections mécaniques uniquement : faces dégénérées, LOD, aucune anatomie. */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { MeshoptSimplifier } from "meshoptimizer";

const root = path.resolve(import.meta.dirname, "..");
const src = process.env.STOCK_EXPORT || "/home/tasour/.cache/corps-sources/zanatomy-stock/export";
const out = process.env.STOCK_BUILD_OUT || "/tmp/opencode/stock-build";
const stock = JSON.parse(fs.readFileSync(path.join(src, "stock.json"), "utf8"));
const buffer = fs.readFileSync(path.join(src, "stock.bin"));
const CATEGORIES = ["bone", "muscle", "organ", "skin"];
const LOD = { low: 300, medium: 1500, high: null };

const REGLES = [
  [/skeletal system/i, "bone"],
  [/muscular system/i, "muscle"],
  [/skin|integument/i, "skin"],
  [/visceral systems|cardiovascular|lymphoid organs|nervous system/i, "organ"],
];
const IGNORER = /muscular insertions|joints|regions of human body|general terms|reference lines|movements|scene collection/i;

function compact(indices, positions, normals) {
  const map = new Int32Array(positions.length / 3).fill(-1);
  let n = 0;
  for (const v of indices) if (map[v] < 0) map[v] = n++;
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
function removeDegenerate(g) {
  const kept = [];
  for (let i = 0; i < g.indices.length; i += 3) {
    const a = g.indices[i] * 3, b = g.indices[i + 1] * 3, c = g.indices[i + 2] * 3;
    const ux = g.positions[b] - g.positions[a], uy = g.positions[b + 1] - g.positions[a + 1], uz = g.positions[b + 2] - g.positions[a + 2];
    const vx = g.positions[c] - g.positions[a], vy = g.positions[c + 1] - g.positions[a + 1], vz = g.positions[c + 2] - g.positions[a + 2];
    const cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
    if (Math.sqrt(cx * cx + cy * cy + cz * cz) / 2 >= 1e-12) kept.push(g.indices[i], g.indices[i + 1], g.indices[i + 2]);
  }
  return kept.length === g.indices.length || kept.length < 3 ? g : compact(Uint32Array.from(kept), g.positions, g.normals);
}
function boundsOf(p) {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < p.length; i += 3) for (let a = 0; a < 3; a++) {
    if (p[i + a] < min[a]) min[a] = p[i + a];
    if (p[i + a] > max[a]) max[a] = p[i + a];
  }
  return { min, max };
}
function repairWinding(g) {
  const { positions, indices } = g;
  const edges = new Map();
  for (let i = 0; i < indices.length; i += 3) {
    const t = [indices[i], indices[i + 1], indices[i + 2]];
    for (let k = 0; k < 3; k++) {
      const a = t[k], b = t[(k + 1) % 3];
      const key = a < b ? `${a}:${b}` : `${b}:${a}`;
      edges.set(key, (edges.get(key) || 0) + 1);
    }
  }
  let boundary = 0;
  for (const n of edges.values()) if (n === 1) boundary++;
  if (boundary) return g; // surface ouverte : pas de volume signé fiable
  let volume = 0;
  for (let i = 0; i < indices.length; i += 3) {
    const a = indices[i] * 3, b = indices[i + 1] * 3, c = indices[i + 2] * 3;
    volume += positions[a] * (positions[b + 1] * positions[c + 2] - positions[b + 2] * positions[c + 1])
      + positions[a + 1] * (positions[b + 2] * positions[c] - positions[b] * positions[c + 2])
      + positions[a + 2] * (positions[b] * positions[c + 1] - positions[b + 1] * positions[c]);
  }
  if (volume >= -1e-10) return g;
  const idx = new Uint32Array(indices.length);
  for (let i = 0; i < indices.length; i += 3) {
    idx[i] = indices[i]; idx[i + 1] = indices[i + 2]; idx[i + 2] = indices[i + 1];
  }
  const normals = new Int16Array(g.normals.length);
  for (let i = 0; i < normals.length; i++) normals[i] = -g.normals[i];
  return { ...g, indices: idx, normals };
}

function makeLod(g, target) {
  if (target == null || g.indexCount / 3 <= target) return g;
  try {
    const [idx] = MeshoptSimplifier.simplify(g.indices, g.positions, 3, target * 3, 0.02, ["LockBorder"]);
    return idx && idx.length >= 3 ? compact(idx, g.positions, g.normals) : g;
  } catch { return g; }
}

await MeshoptSimplifier.ready;
fs.mkdirSync(out, { recursive: true });
const chunks = {};
for (const c of CATEGORIES) for (const l of Object.keys(LOD)) chunks[`${c}.${l}`] = { parts: [], length: 0 };
function push(acc, buf) { acc.parts.push(buf); acc.length += buf.length; }
function pad4(acc) { while (acc.length % 4) { acc.parts.push(Buffer.from([0])); acc.length++; } }
function writeGeometry(acc, g) {
  const clean = removeDegenerate(g);
  pad4(acc); const positions = acc.length;
  push(acc, Buffer.from(clean.positions.buffer, clean.positions.byteOffset, clean.positions.byteLength));
  pad4(acc); const normals = acc.length;
  push(acc, Buffer.from(clean.normals.buffer, clean.normals.byteOffset, clean.normals.byteLength));
  pad4(acc); const indices = acc.length;
  const u16 = clean.vertexCount <= 65535;
  const idx = u16 ? Uint16Array.from(clean.indices) : clean.indices;
  push(acc, Buffer.from(idx.buffer, idx.byteOffset, idx.byteLength));
  return { positions, normals, indices, vertexCount: clean.vertexCount, indexCount: idx.length, indexType: u16 ? "u16" : "u32", bounds: boundsOf(clean.positions) };
}

const manifest = {
  version: "2.1-stock",
  generated: new Date().toISOString().slice(0, 10),
  format: "positions F32, normales I16 normalisées, indices U16/U32",
  sources: [{ name: "Z-Anatomy", license: "CC BY-SA 4.0", url: "https://github.com/Z-Anatomy/Models-of-human-anatomy" }],
  license: "CC BY-SA 4.0 (socle Z-Anatomy stock)",
  stock: { commit: "0a849e8acf7080f8da3251a926fbc160d2bc3f7a", objects: Object.keys(stock.objects).length, exclusions: stock.excluded },
  lod: { low: { target: 300 }, medium: { target: 1500 }, high: { target: null } },
  structures: [],
};
const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const vus = new Set();
let ignores = 0;

for (const [name, rec] of Object.entries(stock.objects)) {
  const collection = rec.collection || "";
  if (IGNORER.test(collection)) { ignores++; continue; }
  let category = REGLES.find(([re]) => re.test(collection))?.[1];
  if (!category) { ignores++; continue; }
  const base = name.trim();
  const side = /\.(l|r)$/.test(base) ? base.slice(-1) : null;
  const propre = base.replace(/[()]/g, "").replace(/\.[lr]$/, "");
  let id = `${category}:${slug(propre)}${side ? `-${side}` : ""}`;
  let n = 2;
  while (vus.has(id)) id = `${category}:${slug(propre)}-${n++}${side ? `-${side}` : ""}`;
  vus.add(id);
  const dv = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const positions = new Float32Array(buffer.buffer, buffer.byteOffset + rec.positions, rec.vertexCount * 3);
  const normals = new Int16Array(buffer.buffer, buffer.byteOffset + rec.normals, rec.vertexCount * 3);
  const idx = rec.indexType === "u16"
    ? new Uint16Array(buffer.buffer, buffer.byteOffset + rec.indices, rec.indexCount)
    : new Uint32Array(buffer.buffer, buffer.byteOffset + rec.indices, rec.indexCount);
  const g = repairWinding({ positions, normals, indices: Uint32Array.from(idx), vertexCount: rec.vertexCount, indexCount: rec.indexCount });
  const entry = {
    id,
    source_id: `za:${base}`,
    fr: propre.trim(),
    en: propre.trim(),
    la: "",
    ta2: null,
    category,
    subsystem: collection,
    side: side === "l" ? "left" : side === "r" ? "right" : null,
    source: "Z-Anatomy",
    materials: [],
    path: [collection],
    bounds: boundsOf(positions),
    lod: {},
  };
  for (const [lod, target] of Object.entries(LOD)) {
    const g2 = makeLod(g, target);
    entry.lod[lod] = writeGeometry(chunks[`${category}.${lod}`], g2);
  }
  manifest.structures.push(entry);
}

for (const [cle, acc] of Object.entries(chunks)) {
  const contenu = Buffer.concat(acc.parts);
  fs.writeFileSync(path.join(out, `${cle}.bin`), contenu);
  fs.writeFileSync(path.join(out, `${cle}.bin.gz`), zlib.gzipSync(contenu));
}
fs.writeFileSync(path.join(out, "manifest.json"), JSON.stringify(manifest));
const parCat = manifest.structures.reduce((a, s) => { a[s.category] = (a[s.category] || 0) + 1; return a; }, {});
fs.writeFileSync(path.join(out, "build-report.json"), `${JSON.stringify({ structures: manifest.structures.length, parCategorie: parCat, ignores, chunks: Object.keys(chunks).length, verdict: "built" }, null, 1)}\n`);
console.log(`[stock-manifest] ${manifest.structures.length} structures ${JSON.stringify(parCat)}, ${ignores} ignorées`);
