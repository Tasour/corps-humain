/* Extrait le maillage « Modesty cover » de seema et découpe une ouverture
 * autour de la génitalité, afin d'obtenir un patch cutané naturel. */
import fs from 'node:fs';
import zlib from 'node:zlib';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
await page.goto('http://127.0.0.1:8901/?sex=m', { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => window.__corps && /visible/.test(
  document.getElementById('corps-info').textContent), { timeout: 120000 });

const data = await page.evaluate(async () => {
  const { GLTFLoader, DRACOLoader } = window.__corps.loaders;
  const draco = new DRACOLoader();
  draco.setDecoderPath('./draco/');
  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);
  const gltf = await loader.loadAsync('./docs/models/forks/seema/models/skin.glb');
  let result = null;
  const skin = { positions: [], normals: [] };
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    if (/modesty/i.test(o.name)) {
      result = {
        positions: Array.from(o.geometry.getAttribute('position').array),
        normals: Array.from(o.geometry.getAttribute('normal').array),
        indices: Array.from(o.geometry.index.array),
      };
      return;
    }
    const pos = o.geometry.getAttribute('position').array;
    const nor = o.geometry.getAttribute('normal').array;
    for (let i = 0; i < pos.length; i += 3) {
      skin.positions.push(pos[i], pos[i + 1], pos[i + 2]);
      skin.normals.push(nor[i], nor[i + 1], nor[i + 2]);
    }
  });
  return { ...result, skin };
});
await browser.close();
if (!data) throw new Error('Modesty cover introuvable');

const { positions, normals, indices, skin } = data;
const kept = [];
const remap = new Map();
for (let i = 0; i < indices.length; i += 3) {
  const tri = [indices[i], indices[i + 1], indices[i + 2]];
  const cx = tri.reduce((s, v) => s + positions[v * 3], 0) / 3;
  const cy = tri.reduce((s, v) => s + positions[v * 3 + 1], 0) / 3;
  const cz = tri.reduce((s, v) => s + positions[v * 3 + 2], 0) / 3;
  // Ouverture elliptique autour des organes, sans bord droit visible.
  const ex = cx / 0.055;
  const ey = (cy - 0.822) / 0.078;
  if (ex * ex + ey * ey < 1 && cz > 0.004) continue;
  kept.push(tri);
}
for (const tri of kept) for (const v of tri) if (!remap.has(v)) remap.set(v, remap.size);

// Sommets de frontière : projetés sur l'ellipse pour lisser l'ouverture.
const edgeUse = new Map();
for (const [a, b, c] of kept) {
  for (const [u, v] of [[a, b], [b, c], [c, a]]) {
    const key = u < v ? `${u}_${v}` : `${v}_${u}`;
    edgeUse.set(key, (edgeUse.get(key) || 0) + 1);
  }
}
const boundary = new Set();
for (const [a, b, c] of kept) {
  for (const [u, v] of [[a, b], [b, c], [c, a]]) {
    const key = u < v ? `${u}_${v}` : `${v}_${u}`;
    if (edgeUse.get(key) === 1) { boundary.add(u); boundary.add(v); }
  }
}
const moved = Float32Array.from(positions);
for (const v of boundary) {
  const x = positions[v * 3], y = positions[v * 3 + 1];
  const ux = x, uy = y - 0.822;
  const len = Math.hypot(ux, uy);
  const r = Math.hypot(x / 0.055, (y - 0.822) / 0.078);
  const z = positions[v * 3 + 2];
  if (len < 1e-6 || r > 1.45 || z < 0.004) continue;
  moved[v * 3] = 0.055 * (ux / len);
  moved[v * 3 + 1] = 0.822 + 0.078 * (uy / len);
}

// Normales recomposées sur le maillage déplacé.
const acc = new Float32Array(moved.length);
for (const [a, b, c] of kept) {
  const ax = moved[a * 3], ay = moved[a * 3 + 1], az = moved[a * 3 + 2];
  const bx = moved[b * 3], ay2 = moved[b * 3 + 1], bz = moved[b * 3 + 2];
  const cx2 = moved[c * 3], cy2 = moved[c * 3 + 1], cz2 = moved[c * 3 + 2];
  const ux = bx - ax, uy = ay2 - ay, uz = bz - az;
  const vx = cx2 - ax, vy = cy2 - ay, vz = cz2 - az;
  const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
  for (const i of [a, b, c]) {
    acc[i * 3] += nx; acc[i * 3 + 1] += ny; acc[i * 3 + 2] += nz;
  }
}

const outPos = new Float32Array(remap.size * 3);
const outNor = new Float32Array(remap.size * 3);
for (const [oldIndex, newIndex] of remap) {
  const n = [acc[oldIndex * 3], acc[oldIndex * 3 + 1], acc[oldIndex * 3 + 2]];
  const len = Math.hypot(...n) || 1;
  for (let k = 0; k < 3; k++) {
    outPos[newIndex * 3 + k] = moved[oldIndex * 3 + k];
    outNor[newIndex * 3 + k] = n[k] / len;
  }
}
const outIdx = new Uint32Array(kept.length * 3);
kept.forEach((tri, t) => tri.forEach((v, k) => { outIdx[t * 3 + k] = remap.get(v); }));

let offset = 0;
const pad = () => { const r = offset % 4; if (r) { offset += 4 - r; } };
const parts = [];
const blobs = [];
const part = {
  name: 'Male_genital_skin_patch', layer: 'skin',
  vertexCount: remap.size, indexCount: outIdx.length,
};
pad(); part.positions = offset; blobs.push(Buffer.from(outPos.buffer)); offset += outPos.byteLength;
pad(); part.normals = offset; blobs.push(Buffer.from(outNor.buffer)); offset += outNor.byteLength;
pad(); part.indices = offset; blobs.push(Buffer.from(outIdx.buffer)); offset += outIdx.byteLength;
parts.push(part);
const raw = Buffer.concat(blobs);
const dir = 'docs/models/male-genitalia';
fs.writeFileSync(`${dir}/skin-patch.json`, JSON.stringify({ version: 1, format: 'raw', parts }, null, 1));
fs.writeFileSync(`${dir}/skin-patch.bin.gz`, zlib.gzipSync(raw, { level: 9 }));
console.log('patch', remap.size, 'verts', kept.length, 'tris', 'raw', raw.length);
