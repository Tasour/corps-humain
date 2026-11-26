/* Graft du modèle homme Body Explorer sur la référence locale.
 * Sources : docs/models/body-explorer (134 GLB meshopt + index v2026.11.0).
 * Repère : X = bp3d_x/1000, Y = bp3d_z/1000, Z = -bp3d_y/1000 (identique au modèle local).
 * Translation mesurée sur 1 340 paires : nouveau = local + (0, -78.11, +100.00) mm.
 * Donc : nouveau + (0, +78.11, -100.00) mm = local.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

/* GLTFExporter utilise FileReader pour convertir ses Blob en ArrayBuffer. */
globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((b) => { this.result = b; this.onloadend?.({ target: this }); });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((b) => {
      this.result = 'data:' + blob.type + ';base64,' + Buffer.from(b).toString('base64');
      this.onloadend?.({ target: this });
    });
  }
};
const requireTools = createRequire(import.meta.url);
const { processGlb } = requireTools('gltf-pipeline');

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'docs/models/body-explorer');
const OUT = path.join(ROOT, 'docs/models/forks/bodyexplorer/models');
const TX = new THREE.Vector3(0, 0.07811, -0.10000);

const SYSTEMS = {
  skeleton: new Set(['skeletal', 'joints']),
  nerves: new Set(['nervous_central', 'nervous_peripheral']),
  organs: new Set(['respiratory', 'digestive', 'urinary', 'heart', 'endocrine',
    'sense_organs', 'lymphatic', 'reproductive_male']),
};
const LAYER = {
  skeletal: 'skeleton', joints: 'skeleton', nervous_central: 'nerves',
  nervous_peripheral: 'nerves', respiratory: 'organs', digestive: 'organs',
  urinary: 'organs', heart: 'organs', endocrine: 'organs',
  sense_organs: 'organs', lymphatic: 'organs', reproductive_male: 'organs',
};
const LICENCE = {
  'CC-BY-SA-4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'CC-BY-4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC0-1.0': 'https://creativecommons.org/publicdomain/zero/1.0/',
  'Slicer-B': 'https://www.slicer.org/license',
};

/* Traduction déterministe : aucun mot anglais ne doit rester dans name_fr. */
const WORDS = [
  ['anterior', 'antérieur'], ['posterior', 'postérieur'], ['superior', 'supérieur'],
  ['inferior', 'inférieur'], ['left', 'gauche'], ['right', 'droit'],
  ['artery', 'artère'], ['vein', 'veine'], ['nerve', 'nerf'], ['bone', 'os'],
  ['with', 'avec'], ['from', 'de'], ['and', 'et'], ['of', 'de'], ['the', 'le'],
  ['branch', 'branche'], ['ligament', 'ligament'], ['node', 'ganglion'],
  ['nodes', 'ganglions'], ['muscle', 'muscle'], ['part', 'partie'],
  ['head', 'tête'], ['body', 'corps'], ['horn', 'corne'], ['tract', 'tractus'],
  ['nucleus', 'noyau'], ['lobe', 'lobe'], ['gyrus', 'gyrus'], ['sulcus', 'sillon'],
  ['duct', 'canal'], ['gland', 'glande'], ['joint', 'articulation'],
  ['cartilage', 'cartilage'], ['tendon', 'tendon'], ['fascia', 'fascia'],
  ['cavity', 'cavité'], ['wall', 'paroi'], ['surface', 'surface'],
  ['area', 'aire'], ['region', 'région'], ['arch', 'arc'], ['root', 'racine'],
  ['trunk', 'tronc'], ['plexus', 'plexus'], ['valve', 'valve'], ['leaflet', 'feuillet'],
  ['cusp', 'cuspide'], ['sinus', 'sinus'], ['capillary', 'capillaire'],
  ['segment', 'segment'], ['arteries', 'artères'], ['veins', 'veines'],
  ['nerves', 'nerfs'], ['bones', 'os'], ['teeth', 'dents'], ['tooth', 'dent'],
];
const ENGLISH = /\b(of|the|and|left|right|artery|vein|nerve|bone|with|from)\b/i;
function french(row, extra) {
  const latin = String(extra.latin || row.latin || '').trim();
  let s = latin;
  if (!s || ENGLISH.test(s)) {
    s = String(extra.name || row.name || '').trim();
    for (const [en, fr] of WORDS) s = s.replace(new RegExp('\\b' + en + '\\b', 'gi'), fr);
  }
  s = s.replace(/\s+/g, ' ').trim();
  if (!s || ENGLISH.test(s)) s = 'Structure anatomique';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

await MeshoptDecoder.ready;
const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);
const index = JSON.parse(fs.readFileSync(path.join(SRC, 'index.json'), 'utf8'));
const rows = new Map();
for (const r of index.rows) {
  if (r.body === 'female') continue;
  if (!rows.has(r.id)) rows.set(r.id, r);
}
fs.mkdirSync(OUT, { recursive: true });

const groups = {
  skeleton: new THREE.Group(),
  nerves: new THREE.Group(),
  organs: new THREE.Group(),
};
const counts = { skeleton: 0, nerves: 0, organs: 0 };
const entries = {};
const material = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.8 });
const used = new Set();
function listGlb(dir, prefix = '') {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix + e.name;
    if (e.isDirectory()) out.push(...listGlb(path.join(dir, e.name), rel + '/'));
    else if (e.name.endsWith('.glb')) out.push(rel);
  }
  return out;
}
const files = listGlb(path.join(SRC, 'models'));
console.log(`chunks à lire : ${files.length}`);

for (const file of files) {
  const buf = fs.readFileSync(path.join(SRC, 'models', file));
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  const gltf = await new Promise((resolve, reject) => loader.parse(ab, '', resolve, reject));
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    const extra = o.userData || {};
    const row = rows.get(extra.id || o.name);
    if (!row) return;
    let key = null;
    for (const [g, systems] of Object.entries(SYSTEMS)) if (systems.has(row.system)) key = g;
    if (!key) return;
    /* KHR_mesh_quantization laisse des attributs Int16 normalisés : on les
     * déquantifie en Float32 avant d'appliquer la matrice et la translation,
     * sinon le décalage de +78 mm serait tronqué et le batching refuserait
     * un mélange de formats d'attributs. */
    const src = o.geometry;
    const pa = src.getAttribute('position');
    const pos = new Float32Array(pa.count * 3);
    for (let i = 0; i < pa.count; i++) {
      pos[i * 3] = pa.getX(i); pos[i * 3 + 1] = pa.getY(i); pos[i * 3 + 2] = pa.getZ(i);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const na = src.getAttribute('normal');
    if (na) {
      const nor = new Float32Array(na.count * 3);
      for (let i = 0; i < na.count; i++) {
        nor[i * 3] = na.getX(i); nor[i * 3 + 1] = na.getY(i); nor[i * 3 + 2] = na.getZ(i);
      }
      geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    }
    const ia = src.getIndex();
    if (ia) geo.setIndex(new THREE.BufferAttribute(new Uint32Array(ia.array), 1));
    geo.applyMatrix4(o.matrixWorld);
    geo.translate(TX.x, TX.y, TX.z);
    const clean = geo;
    let name = extra.id || o.name;
    if (used.has(name)) name = name + '__' + (extra.src || 'dup');
    used.add(name);
    const mesh = new THREE.Mesh(clean, material);
    mesh.name = name;
    groups[key].add(mesh);
    counts[key]++;
    const fr = french(row, extra);
    entries[name] = {
      name: extra.name || row.name || name,
      name_fr: fr,
      name_latin: String(extra.latin || row.latin || fr),
      name_en: extra.name || row.name || name,
      description: `${extra.name || row.name || name} — structure ${LAYER[row.system] || 'anatomique'} (Body Explorer).`,
      description_fr: `${fr} — structure du système ${LAYER[row.system] || 'anatomique'} (Body Explorer).`,
      description_en: `${extra.name || row.name || name} — ${LAYER[row.system] || 'anatomical'} structure (Body Explorer).`,
      source: 'Body Explorer — BodyParts3D / Z-Anatomy / HuBMAP',
      origin: extra.src || row.src || 'bodyexplorer',
      origin_fr: extra.src || row.src || 'bodyexplorer',
      origin_en: extra.src || row.src || 'bodyexplorer',
      license: LICENCE[extra.lic || row.lic] || (extra.lic || row.lic || ''),
      system: LAYER[row.system] || 'organs',
    };
  });
}
console.log('maillages retenus', JSON.stringify(counts), 'entrées', Object.keys(entries).length);

const exporter = new GLTFExporter();
for (const [key, group] of Object.entries(groups)) {
  const raw = await exporter.parseAsync(group, { binary: true, onlyVisible: false });
  const input = Buffer.from(raw);
  const result = await processGlb(input, {
    dracoOptions: { compressionLevel: 7 },
  });
  const out = Buffer.from(result.glb);
  fs.writeFileSync(path.join(OUT, key + '.glb'), out);
  console.log(`${key}.glb : ${(out.length / 1e6).toFixed(2)} Mo (brut ${(input.length / 1e6).toFixed(2)} Mo)`);
}

const desc = {
  version: '2026-11-26',
  sources: ['bodyexplorer'],
  descriptions: { bodyexplorer: entries },
};
const descPath = path.join(ROOT, 'docs/models/selection-descriptions-bodyexplorer.json');
fs.writeFileSync(descPath, JSON.stringify(desc));
console.log('libellés :', descPath, (fs.statSync(descPath).size / 1e6).toFixed(2), 'Mo');
