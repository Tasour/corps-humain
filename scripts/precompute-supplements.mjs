/* Précalcule les compléments féminins dans un chunk binaire. */
import fs from 'node:fs';
import zlib from 'node:zlib';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
await page.goto('http://127.0.0.1:8901/?sex=m', { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => window.__corps && /visible/.test(
  document.getElementById('corps-info').textContent), { timeout: 120000 });

const json = await page.evaluate(async () => {
  const d = window.__corps.debug;
  const at = await (await fetch('./docs/models/body-atlas/atlas-female-meshopt.json')).json();
  d.setFemaleManifest(at);
  const group = await d.buildSupplements();
  const parts = [];
  group.traverse((o) => {
    if (!o.isMesh) return;
    const pos = o.geometry.attributes.position.array;
    const nor = o.geometry.attributes.normal.array;
    const idx = o.geometry.index.array;
    parts.push({
      name: o.name,
      layer: o.userData.layer,
      label: o.userData.selectionLabel,
      entry: o.userData.selectionEntry,
      positions: Array.from(pos),
      normals: Array.from(nor),
      indices: Array.from(idx),
    });
  });
  return { count: group.userData.count, alignment: group.userData.facialAlignment, parts };
});
await browser.close();

let offset = 0;
const blobs = [];
const manifest = { version: 1, format: 'raw', alignment: json.alignment, parts: [] };
for (const part of json.parts) {
  const positions = new Float32Array(part.positions);
  const normals = new Float32Array(part.normals);
  const indices = new Uint32Array(part.indices);
  const p = {
    name: part.name, layer: part.layer, label: part.label, entry: part.entry,
    positions: offset, normals: 0, indices: 0,
    vertexCount: positions.length / 3, indexCount: indices.length,
  };
  const pad = () => {
    const r = offset % 4;
    if (r) { blobs.push(Buffer.alloc(4 - r)); offset += 4 - r; }
  };
  pad();
  p.normals = offset; blobs.push(Buffer.from(positions.buffer)); offset += positions.byteLength; pad();
  p.indices = offset; blobs.push(Buffer.from(normals.buffer)); offset += normals.byteLength; pad();
  blobs.push(Buffer.from(indices.buffer)); offset += indices.byteLength; pad();
  manifest.parts.push(p);
}
const raw = Buffer.concat(blobs);
const gz = zlib.gzipSync(raw, { level: 9 });
fs.writeFileSync('docs/models/body-atlas/female-supplements.json', JSON.stringify(manifest));
fs.writeFileSync('docs/models/body-atlas/female-supplements.bin.gz', gz);
console.log('parts', json.count, 'raw', (raw.length / 1e6).toFixed(2), 'Mo',
  'gz', (gz.length / 1e6).toFixed(2), 'Mo',
  'alignment', json.alignment.length);
