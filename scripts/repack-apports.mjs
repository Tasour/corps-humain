/* Fusionne les géométries des apports BodyParts3D DANS les chunks canoniques.
 * Chaque chunk est un accumulateur {parts[], length} avec padding 4 octets. */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = path.resolve(import.meta.dirname, "..");
const mergePath = process.env.MERGE_MANIFEST || "/tmp/opencode/stock-merge/manifest.json";
const merge = JSON.parse(fs.readFileSync(mergePath, "utf8"));
const dest = path.join(root, "public/models/v2");
const anciensChunks = "/tmp/opencode/apports-orig";
const MODES = ["low", "medium", "high"];
const ancien = JSON.parse(fs.readFileSync("/tmp/opencode/manifest-avant-stock.json", "utf8"));
const parId = new Map(ancien.structures.map((s) => [s.id, s]));

const chunks = new Map();
function chargeur(cle) {
  if (!chunks.has(cle)) {
    const buf = fs.readFileSync(path.join(dest, cle + ".bin"));
    chunks.set(cle, { parts: [buf], length: buf.length });
  }
  return chunks.get(cle);
}
function pad4(acc) { while (acc.length % 4) { acc.parts.push(Buffer.from([0])); acc.length++; } }
function push(acc, buf) { acc.parts.push(buf); acc.length += buf.length; }

let reecrits = 0;
for (const entree of merge.structures) {
  if (!entree.apport) continue;
  const source = parId.get(entree.id);
  if (!source) throw new Error(`apport introuvable : ${entree.id}`);
  for (const mode of MODES) {
    const cle = `${entree.category}.${mode}`;
    const rec = source.lod?.[mode];
    const acc = chargeur(cle);
    const src = fs.readFileSync(path.join(anciensChunks, `${cle}.bin`));
    pad4(acc);
    const positions = acc.length;
    const p = new Float32Array(src.buffer, src.byteOffset + rec.positions, rec.vertexCount * 3);
    push(acc, Buffer.from(p.buffer, p.byteOffset, p.byteLength));
    pad4(acc);
    const normals = acc.length;
    const n = new Int16Array(src.buffer, src.byteOffset + rec.normals, rec.vertexCount * 3);
    push(acc, Buffer.from(n.buffer, n.byteOffset, n.byteLength));
    pad4(acc);
    const indices = acc.length;
    const idx = rec.indexType === "u16"
      ? new Uint16Array(src.buffer, src.byteOffset + rec.indices, rec.indexCount)
      : new Uint32Array(src.buffer, src.byteOffset + rec.indices, rec.indexCount);
    push(acc, Buffer.from(idx.buffer, idx.byteOffset, idx.byteLength));
    Object.assign(entree.lod[mode], { positions, normals, indices });
    delete entree.lod[mode].chunk;
    reecrits++;
  }
}

for (const [cle, acc] of chunks) {
  const contenu = Buffer.concat(acc.parts);
  fs.writeFileSync(path.join(dest, `${cle}.bin`), contenu);
  fs.writeFileSync(path.join(dest, `${cle}.bin.gz`), zlib.gzipSync(contenu));
}
for (const f of fs.readdirSync(dest)) if (f.startsWith("bp.")) fs.rmSync(path.join(dest, f));
fs.writeFileSync(path.join(dest, "manifest.json"), JSON.stringify(merge));
console.log(`[repack] ${reecrits} offsets réécrits dans ${chunks.size} chunks canoniques`);
