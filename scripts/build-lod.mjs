/* Construit les LOD du modèle masculin, en Draco, sans perdre les noms de pièces.
 *
 * Mesures du 2026-11-27 (mobile bridé 4× / 1,6 Mbit/s) :
 *   LOD0 : 6 571 ms — LOD1 : 5 156 ms (−1,4 s) et −1,3 Mo.
 * `weld` est obligatoire avant `simplify`, sinon les sommets dupliqués bloquent
 * la simplification et le LOD sort à la taille de l'original.
 * `optimize` est interdit : il fusionne les pièces et détruit 254 noms.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'docs/models/male');
const OUT = path.join(ROOT, 'docs/models/male-lod');
const TMP = path.join(ROOT, 'docs/models/.lod-tmp');
const LAYERS = ['skin', 'muscles', 'skeleton', 'organs', 'arteries', 'veins', 'nerves'];
const RATIOS = { lod1: 0.5 };
/* Erreur contrainte à 0,2 % : non contrainte (--error 1), la simplification
 * perce la peau (points noirs, yeux creux) et déforme le visage. */
const MAX_ERROR = '0.002';

const run = (args) => execFileSync('npx', ['gltf-transform', ...args], {
  cwd: ROOT, stdio: ['ignore', 'ignore', 'pipe'],
});
const nodeNames = (file) => {
  const raw = fs.readFileSync(file);
  const len = raw.readUInt32LE(12);
  const doc = JSON.parse(raw.subarray(20, 20 + len).toString('utf8').replace(/\0+$/, ''));
  return (doc.nodes || []).filter((n) => n.mesh !== undefined).map((n) => n.name || '');
};

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });
let total = 0;

for (const layer of LAYERS) {
  const src = path.join(SRC, layer + '.glb');
  const names = nodeNames(src).sort();
  for (const [tag, ratio] of Object.entries(RATIOS)) {
    const welded = path.join(TMP, `${layer}-${tag}-weld.glb`);
    const simplified = path.join(TMP, `${layer}-${tag}-simp.glb`);
    const out = path.join(OUT, `${layer}-${tag}.glb`);
    run(['weld', src, welded]);
    run(['simplify', welded, simplified, '--ratio', String(ratio), '--error', MAX_ERROR]);
    run(['draco', simplified, out]);
    const lost = names.filter((n) => !nodeNames(out).includes(n));
    if (lost.length) throw new Error(`${layer}/${tag} : ${lost.length} noms perdus (ex ${lost[0]})`);
    const size = fs.statSync(out).size;
    total += size;
    console.log(`${tag} ${layer.padEnd(9)} ${(size / 1e3).toFixed(0)}k  noms ${names.length}`);
  }
}
fs.rmSync(TMP, { recursive: true, force: true });
console.log(`total LOD1+LOD2 ${(total / 1e6).toFixed(2)} Mo`);
