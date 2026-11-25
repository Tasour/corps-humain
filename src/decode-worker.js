import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

let ready = false;
const pending = [];

MeshoptDecoder.ready.then(() => {
  ready = true;
  while (pending.length) handle(pending.shift());
});

function handle(event) {
  const { id, buffer, parts } = event.data;
  const source = new Uint8Array(buffer);
  const results = [];
  const transfers = [];
  for (const part of parts) {
    const packed = new Uint8Array(part.vertexCount * 8);
    MeshoptDecoder.decodeVertexBuffer(packed, part.vertexCount, 8,
      source.subarray(part.vOffset, part.vOffset + part.vBytes));
    const indexBytes = new Uint8Array(part.indexCount * 4);
    MeshoptDecoder.decodeIndexBuffer(indexBytes, part.indexCount, 4,
      source.subarray(part.iOffset, part.iOffset + part.iBytes));
    const positions = new Float32Array(part.vertexCount * 3);
    const normals = new Int16Array(part.vertexCount * 3);
    for (let i = 0; i < part.vertexCount; i++) {
      for (let a = 0; a < 3; a++) {
        const q = packed[i * 8 + a * 2] | (packed[i * 8 + a * 2 + 1] << 8);
        positions[i * 3 + a] = part.min[a] + q / 65535 * (part.max[a] - part.min[a]);
      }
      let x = packed[i * 8 + 6] / 255 * 2 - 1;
      let y = packed[i * 8 + 7] / 255 * 2 - 1;
      let z = 1 - Math.abs(x) - Math.abs(y);
      if (z < 0) {
        const ox = x, oy = y;
        x = ox >= 0 ? 1 - ox : -1 - ox;
        y = oy >= 0 ? 1 - oy : -1 - oy;
      }
      const len = Math.hypot(x, y, z) || 1;
      normals[i * 3] = Math.round(x / len * 32767);
      normals[i * 3 + 1] = Math.round(y / len * 32767);
      normals[i * 3 + 2] = Math.round(z / len * 32767);
    }
    const indices = new Uint32Array(indexBytes.buffer);
    results.push({ id: part.id, positions, normals, indices });
    transfers.push(positions.buffer, normals.buffer, indices.buffer);
  }
  self.postMessage({ id, results }, transfers);
}

self.onmessage = (event) => {
  if (ready) handle(event);
  else pending.push(event);
};
