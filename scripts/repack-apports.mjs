/* Reconstruit les chunks des apports BodyParts3D à partir de l'ancien
 * manifeste : seules les structures apportées y sont écrites, avec des
 * offsets recalculés. */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = path.resolve(import.meta.dirname, "..");
const ancienPath = process.env.APPORTS_MANIFEST || "/tmp/opencode/manifest-avant-stock.json";
const ancien = JSON.parse(fs.readFileSync(ancienPath, "utf8"));
const mergePath = process.env.MERGE_MANIFEST || "/tmp/opencode/stock-merge/manifest.json";
const merge = JSON.parse(fs.readFileSync(mergePath, "utf8"));
const srcDir = process.env.APPORTS_DIR || "/tmp/opencode/apports-orig";
const out = process.env.MERGE_OUT || "/tmp/opencode/stock-merge";
const buffers = new Map();
for (const categorie of ["bone", "muscle", "organ"]) {
  for (const niveau of ["low", "medium", "high"]) {
    const cle = `${categorie}.${niveau}`;
    const f = path.join(srcDir, `${cle}.bin`);
    buffers.set(cle, fs.readFileSync(f));
  }
}
const chunks = new Map();
function pad4(buf) { while (buf.length % 4) buf.push(Buffer.from([0])); }
for (const entree of merge.structures) {
  if (!entree.apport) continue;
  const original = ancien.structures.find((s) => s.id === entree.id);
  if (!original) throw new Error(`apport introuvable : ${entree.id}`);
  for (const [niveau, rec] of Object.entries(original.lod)) {
    const cle = `${entree.category}.${niveau}`;
    const src = buffers.get(cle);
    let sortie = chunks.get(cle);
    if (!sortie) { sortie = { buf: [], length: 0 }; chunks.set(cle, sortie); }
    const { buf, length } = sortie;
    pad4(buf);
    const positions = length + buf.length;
    const p = new Float32Array(src.buffer, src.byteOffset + rec.positions, rec.vertexCount * 3);
    buf.push(Buffer.from(p.buffer, p.byteOffset, p.byteLength));
    pad4(buf);
    const normals = length + buf.length;
    const n = new Int16Array(src.buffer, src.byteOffset + rec.normals, rec.vertexCount * 3);
    buf.push(Buffer.from(n.buffer, n.byteOffset, n.byteLength));
    pad4(buf);
    const indices = length + buf.length;
    const idx = rec.indexType === "u16"
      ? new Uint16Array(src.buffer, src.byteOffset + rec.indices, rec.indexCount)
      : new Uint32Array(src.buffer, src.byteOffset + rec.indices, rec.indexCount);
    buf.push(Buffer.from(idx.buffer, idx.byteOffset, idx.byteLength));
    entree.lod[niveau] = { positions, normals, indices, vertexCount: rec.vertexCount, indexCount: rec.indexCount, indexType: rec.indexType, bounds: rec.bounds, chunk: `bp.${cle}.bin` };
  }
}
for (const [cle, sortie] of chunks) {
  const contenu = Buffer.concat(sortie.buf);
  fs.writeFileSync(path.join(out, `bp.${cle}.bin`), contenu);
  fs.writeFileSync(path.join(out, `bp.${cle}.bin.gz`), zlib.gzipSync(contenu));
}
fs.writeFileSync(path.join(out, "manifest.json"), JSON.stringify(merge));
console.log(`[repack] ${chunks.size} chunks apports reconstruits`);
