/* Convertit les chunks femelle gzip en buffers meshopt quantifiés. */
import fs from 'node:fs';
import zlib from 'node:zlib';
import { MeshoptEncoder } from 'meshoptimizer';

await MeshoptEncoder.ready;

const root = new URL('..', import.meta.url).pathname;
const dir = root + 'docs/models/body-atlas/';
const source = JSON.parse(fs.readFileSync(dir + 'atlas-female.json', 'utf8'));

const oct = (x, y, z) => {
  const len = Math.hypot(x, y, z) || 1;
  x /= len; y /= len; z /= len;
  const d = 1 / (Math.abs(x) + Math.abs(y) + Math.abs(z));
  let a = x * d, b = y * d;
  if (z < 0) {
    const na = a >= 0 ? 1 - a : -1 - a;
    const nb = b >= 0 ? 1 - b : -1 - b;
    a = na; b = nb;
  }
  return [Math.round((a * 0.5 + 0.5) * 255), Math.round((b * 0.5 + 0.5) * 255)];
};

const manifest = {
  ...source,
  version: 'HRA united-female v1.5',
  format: 'meshopt',
  chunks: [],
};
let totalBytes = 0;

for (let ci = 0; ci < source.chunks.length; ci++) {
  const raw = zlib.gunzipSync(fs.readFileSync(dir + `female-${ci}.bin.gz`));
  const view = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);
  const blobs = [];
  let offset = 0;
  const pad = () => {
    const r = offset % 4;
    if (r) { blobs.push(Buffer.alloc(4 - r)); offset += 4 - r; }
  };
  for (const part of source.parts.filter((p) => p.chunk === ci)) {
    const n = part.vertexCount;
    const positions = new Float32Array(raw.buffer, raw.byteOffset + part.positions, n * 3);
    const normals = new Int16Array(raw.buffer, raw.byteOffset + part.normals, n * 3);
    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < n; i++) {
      for (let a = 0; a < 3; a++) {
        min[a] = Math.min(min[a], positions[i * 3 + a]);
        max[a] = Math.max(max[a], positions[i * 3 + a]);
      }
    }
    const packed = new Uint8Array(n * 8);
    for (let i = 0; i < n; i++) {
      for (let a = 0; a < 3; a++) {
        const q = Math.round((positions[i * 3 + a] - min[a]) / (max[a] - min[a] || 1) * 65535);
        packed[i * 8 + a * 2] = q & 255;
        packed[i * 8 + a * 2 + 1] = q >> 8;
      }
      const o = oct(normals[i * 3] / 32767, normals[i * 3 + 1] / 32767, normals[i * 3 + 2] / 32767);
      packed[i * 8 + 6] = o[0];
      packed[i * 8 + 7] = o[1];
    }
    const encodedVertices = MeshoptEncoder.encodeVertexBuffer(packed, n, 8);
    const indexBytes = new Uint8Array(raw.buffer, raw.byteOffset + part.indices, part.indexCount * 4);
    const encodedIndices = MeshoptEncoder.encodeIndexBuffer(indexBytes, part.indexCount, 4);
    part.vOffset = offset;
    part.vBytes = encodedVertices.length;
    blobs.push(Buffer.from(encodedVertices)); offset += encodedVertices.length; pad();
    part.iOffset = offset;
    part.iBytes = encodedIndices.length;
    blobs.push(Buffer.from(encodedIndices)); offset += encodedIndices.length; pad();
    part.min = min.map((v) => +v.toFixed(6));
    part.max = max.map((v) => +v.toFixed(6));
    delete part.positions; delete part.normals; delete part.indices;
  }
  const buffer = Buffer.concat(blobs);
  const file = `female-meshopt-${ci}.bin`;
  fs.writeFileSync(dir + file, buffer);
  totalBytes += buffer.length;
  manifest.chunks.push({ url: `./docs/models/body-atlas/${file}`, bytes: buffer.length });
  console.log(file, (buffer.length / 1e6).toFixed(2), 'Mo');
}

fs.writeFileSync(dir + 'atlas-female-meshopt.json', JSON.stringify(manifest));
console.log('total', (totalBytes / 1e6).toFixed(2), 'Mo');
