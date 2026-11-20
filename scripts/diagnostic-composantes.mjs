import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

/* Diagnostic des composantes connexes d'une liste de structures.
 * Usage : node scripts/diagnostic-composantes.mjs id1,id2,... > diagnostic.json
 * Lecture seule : ne modifie ni le manifeste ni les chunks.
 */

const BASE = process.env.V2_DIR || path.resolve(import.meta.dirname, "../public/models/v2");
const ids = (process.argv[2] || "").split(",").map((s) => s.trim()).filter(Boolean);
const manifest = JSON.parse(fs.readFileSync(path.join(BASE, "manifest.json"), "utf8"));
const cache = new Map();

function views(s) {
  const key = `${s.category}:high`;
  if (!cache.has(key)) cache.set(key, zlib.gunzipSync(fs.readFileSync(path.join(BASE, `${s.category}.high.bin.gz`))));
  const buf = cache.get(key), r = s.lod.high;
  return {
    pos: new Float32Array(buf.buffer, buf.byteOffset + r.positions, r.vertexCount * 3),
    idx: r.indexType === "u16"
      ? new Uint16Array(buf.buffer, buf.byteOffset + r.indices, r.indexCount)
      : new Uint32Array(buf.buffer, buf.byteOffset + r.indices, r.indexCount),
  };
}

function diagnose(s) {
  const { pos, idx } = views(s);
  const V = pos.length / 3, T = idx.length / 3;
  const parent = new Int32Array(V);
  for (let i = 0; i < V; i++) parent[i] = i;
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  const union = (a, b) => { const ra = find(a), rb = find(b); if (ra !== rb) parent[rb] = ra; };
  for (let t = 0; t < T; t++) { union(idx[t * 3], idx[t * 3 + 1]); union(idx[t * 3 + 1], idx[t * 3 + 2]); }
  const comps = new Map();
  for (let t = 0; t < T; t++) {
    const root = find(idx[t * 3]);
    let c = comps.get(root);
    if (!c) { c = { tris: 0, area: 0, min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] }; comps.set(root, c); }
    c.tris++;
    const a = idx[t * 3] * 3, b = idx[t * 3 + 1] * 3, d = idx[t * 3 + 2] * 3;
    const ux = pos[b] - pos[a], uy = pos[b + 1] - pos[a + 1], uz = pos[b + 2] - pos[a + 2];
    const vx = pos[d] - pos[a], vy = pos[d + 1] - pos[a + 1], vz = pos[d + 2] - pos[a + 2];
    c.area += 0.5 * Math.hypot(uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx);
    for (const v of [a, b, d]) for (let k = 0; k < 3; k++) { c.min[k] = Math.min(c.min[k], pos[v + k]); c.max[k] = Math.max(c.max[k], pos[v + k]); }
  }
  const list = [...comps.values()].sort((a, b) => b.area - a.area).map((c) => ({
    triangles: c.tris,
    areaCm2: +(c.area * 1e4).toFixed(3),
    dimsCm: c.max.map((v, i) => +((v - c.min[i]) * 100).toFixed(2)),
  }));
  const largest = list[0]?.areaCm2 || 0;
  const tiny = list.filter((c) => c.areaCm2 < Math.max(0.1, largest * 0.01)).length;
  const comparable = list.filter((c) => c.areaCm2 >= largest * 0.1).length;
  const suggestion = list.length <= 2 ? "multipart_legitime"
    : tiny >= list.length - 2 && tiny >= 2 ? "fragment_negigeable"
      : comparable >= 3 ? "multipart_legitime"
        : "a_valider";
  return { id: s.id, fr: s.fr, category: s.category, triangles: T, components: list.length, largestCm2: +largest.toFixed(3), tiny, comparable, componentsDetail: list.slice(0, 12), suggestion };
}

console.log(JSON.stringify(ids.map((id) => {
  const s = manifest.structures.find((x) => x.id === id);
  return s ? diagnose(s) : { id, error: "absent du manifeste" };
}), null, 1));
