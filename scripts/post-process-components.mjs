import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

/* Post-traitement ciblé du jeu de données v2 : retire les composantes
 * connexes négligeables d'une structure(liste).
 *
 * Le jeu est réécrit catégorie par catégorie : les enregistrements conservés
 * sont recopiés tels quels, ceux qui sont corrigés sont compactés, puis le
 * manifeste est mis à jour (offsets, counts, bounds). Aucune géométrie n'est
 * inventée : seules des composantes déjà présentes sont supprimées.
 *
 * Usage :
 *   V2_OUT=/tmp/opencode/v2-test node scripts/post-process-components.mjs
 * Les corrections sont déclarées dans docs/analyses/revue-visuelle/fixes-composantes.json.
 */

const ROOT = path.resolve(import.meta.dirname, "..");
const V2 = process.env.V2_OUT || path.join(ROOT, "public/models/v2");
const FIXES = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/analyses/revue-visuelle/fixes-composantes.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(V2, "manifest.json"), "utf8"));
const LODS = ["low", "medium", "high"];

function truncate(geometry, minArea) {
  const { pos, idx } = geometry;
  const V = pos.length / 3, T = idx.length / 3;
  const parent = new Int32Array(V);
  for (let i = 0; i < V; i++) parent[i] = i;
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  const union = (a, b) => { const ra = find(a), rb = find(b); if (ra !== rb) parent[rb] = ra; };
  for (let t = 0; t < T; t++) {
    union(idx[t * 3], idx[t * 3 + 1]);
    union(idx[t * 3 + 1], idx[t * 3 + 2]);
  }
  const area = new Map();
  for (let t = 0; t < T; t++) {
    const r = find(idx[t * 3]);
    const a = idx[t * 3] * 3, b = idx[t * 3 + 1] * 3, c = idx[t * 3 + 2] * 3;
    const ux = pos[b] - pos[a], uy = pos[b + 1] - pos[a + 1], uz = pos[b + 2] - pos[a + 2];
    const vx = pos[c] - pos[a], vy = pos[c + 1] - pos[a + 1], vz = pos[c + 2] - pos[a + 2];
    area.set(r, (area.get(r) || 0) + 0.5 * Math.hypot(uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx));
  }
  const keep = new Set([...area.entries()].filter(([, a]) => a * 1e4 >= minArea).map(([r]) => r));
  if (keep.size === area.size) {
    return {
      geometry: {
        /* Copies exactes : les vues originales pointent dans tout le chunk,
         * Buffer.from(view.buffer) écraserait le fichier entier. */
        positions: pos.slice(), normals: geometry.norm.slice(), indices: idx.slice(),
        vertexCount: V, indexCount: idx.length, bounds: geometry.bounds,
      },
      removed: 0,
    };
  }
  const keptTris = [];
  for (let t = 0; t < T; t++) if (keep.has(find(idx[t * 3]))) keptTris.push(idx[t * 3], idx[t * 3 + 1], idx[t * 3 + 2]);
  /* compactage */
  const map = new Int32Array(V).fill(-1);
  let n = 0;
  for (const v of keptTris) if (map[v] < 0) map[v] = n++;
  const p = new Float32Array(n * 3), no = new Int16Array(n * 3);
  for (let v = 0; v < V; v++) {
    if (map[v] < 0) continue;
    const nv = map[v] * 3;
    for (let k = 0; k < 3; k++) { p[nv + k] = pos[v * 3 + k]; no[nv + k] = geometry.norm[v * 3 + k]; }
  }
  const nidx = Uint32Array.from(keptTris.map((v) => map[v]));
  const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < p.length; i += 3) for (let k = 0; k < 3; k++) { mn[k] = Math.min(mn[k], p[i + k]); mx[k] = Math.max(mx[k], p[i + k]); }
  return {
    geometry: { positions: p, normals: no, indices: nidx, vertexCount: n, indexCount: nidx.length, bounds: { min: mn, max: mx } },
    removed: area.size - keep.size,
  };
}

function readRecord(buf, rec) {
  return {
    pos: new Float32Array(buf.buffer, buf.byteOffset + rec.positions, rec.vertexCount * 3),
    norm: new Int16Array(buf.buffer, buf.byteOffset + rec.normals, rec.vertexCount * 3),
    idx: rec.indexType === "u16"
      ? new Uint16Array(buf.buffer, buf.byteOffset + rec.indices, rec.indexCount)
      : new Uint32Array(buf.buffer, buf.byteOffset + rec.indices, rec.indexCount),
  };
}

function pushAligned(list, total, buf) {
  while (total % 4) { list.push(Buffer.from([0])); total++; }
  list.push(buf);
  return total + buf.length;
}

const byCategory = new Map();
for (const s of manifest.structures) {
  if (!byCategory.has(s.category)) byCategory.set(s.category, []);
  byCategory.get(s.category).push(s);
}

for (const [category, structures] of byCategory) {
  const fixed = structures.filter((s) => FIXES.fixes.some((f) => f.id === s.id));
  if (!fixed.length) continue;
  for (const lod of LODS) {
    const file = path.join(V2, `${category}.${lod}.bin.gz`);
    const raw = zlib.gunzipSync(fs.readFileSync(file));
    const parts = [], sizes = [];
    let total = 0;
    for (const s of structures) {
      const rec = s.lod[lod];
      const rec0 = { ...rec };
      const indexBytes = rec0.indexCount * (rec0.indexType === "u16" ? 2 : 4);
      const original = Buffer.from(raw.buffer, raw.byteOffset + rec0.positions, rec0.indices + indexBytes - rec0.positions);
      const fix = FIXES.fixes.find((f) => f.id === s.id);
      if (fix?.lods && !fix.lods.includes(lod)) {
        total = pushAligned(parts, total, original);
        continue;
      }
      if (!fix) {
        while (total % 4) { parts.push(Buffer.from([0])); total++; }
        const start = total;
        total = pushAligned(parts, total, original);
        /* Les enregistrements après une correction se décalent : leurs
         * offsets doivent être réécrits, sinon le manifeste pointe dans le vide. */
        rec.positions = start;
        rec.normals = start + (rec0.normals - rec0.positions);
        rec.indices = start + (rec0.indices - rec0.positions);
        continue;
      }
      const g = readRecord(raw, rec);
      const out = truncate(g, fix.minAreaCm2);
      const positions = Buffer.from(out.geometry.positions.buffer);
      const normals = Buffer.from(out.geometry.normals.buffer);
      const useU16 = out.geometry.vertexCount <= 65535;
      const indices = useU16 ? Uint16Array.from(out.geometry.indices) : out.geometry.indices;
      const idxBuf = Buffer.from(indices.buffer, indices.byteOffset, indices.byteLength);
      while (total % 4) { parts.push(Buffer.from([0])); total++; }
      const positionsOffset = total; total = pushAligned(parts, total, positions);
      while (total % 4) { parts.push(Buffer.from([0])); total++; }
      const normalsOffset = total; total = pushAligned(parts, total, normals);
      while (total % 4) { parts.push(Buffer.from([0])); total++; }
      const indicesOffset = total; total = pushAligned(parts, total, idxBuf);
      Object.assign(s.lod[lod], {
        positions: positionsOffset, normals: normalsOffset, indices: indicesOffset,
        vertexCount: out.geometry.vertexCount, indexCount: indices.length,
        indexType: useU16 ? "u16" : "u32", bounds: out.geometry.bounds,
      });
      console.log(`[composantes] ${s.id} ${lod}: ${T0(g.idx.length)} -> ${T0(indices.length)} tris, ${out.removed} composantes retirees`);
    }
    fs.writeFileSync(file, zlib.gzipSync(Buffer.concat(parts), { level: 6 }));
  }
}
fs.writeFileSync(path.join(V2, "manifest.json"), JSON.stringify(manifest));
console.log(`[composantes] ${FIXES.fixes.length} structures corrigees`);
function T0(n) { return Math.round(n / 3); }
