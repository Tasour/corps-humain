import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const js = readFileSync(root + 'src/corps-viewer.js', 'utf8');
const html = readFileSync(root + 'index.html', 'utf8');

/* LOD : configuration, choix par appareil, montée atomique. */
assert.ok(js.includes('const MALE_LOD'), 'configuration LOD absente');
assert.ok(js.includes("dir: './docs/models/male-lod/'"), 'dossier LOD absent');
assert.ok(js.includes("let quality = lowPower ? 'standard' : 'max'"), 'choix de qualité par appareil absent');
assert.ok(js.includes('async function createMaleModel'), 'fabrique de modèle absente');
assert.ok(js.includes('async function upgradeToMax'), 'montée en qualité absente');

/* Swap atomique : le modèle complet est construit hors scène puis échangé. */
assert.ok(js.includes('const fresh = await createMaleModel(MALE, { defer: false })'),
  'montée non atomique (chargement partiel)');
assert.ok(js.includes('bodies.add(fresh);') && js.includes('bodies.remove(previous)'),
  'échange des modèles absent');

/* Repli : un échec ne doit jamais laisser un état partiel. */
assert.ok(/catch \(error\) \{[\s\S]{0,400}setQuality\('fallback'\)/.test(js),
  'repli sur LOD1 absent en cas d’échec');
assert.ok(js.includes("console.warn('LOD0 indisponible"), 'échec non journalisé');

/* État visible et action de reprise. */
assert.ok(html.includes('id="quality-status"'), 'statut de qualité absent');
assert.ok(html.includes('role="status"') && html.includes('aria-live="polite"'),
  'statut non annoncé aux lecteurs d’écran');
assert.ok(html.includes('id="quality-retry"'), 'bouton de reprise absent');
assert.ok(js.includes("button.textContent = state === 'fallback' ? 'Réessayer' : 'Qualité maximale'"),
  'bouton de reprise non contextualisé');

/* Budget : descriptions servies gzippées avec repli. */
assert.ok(js.includes('DecompressionStream'), 'descriptions non gzippées');
assert.ok(js.includes('selection-descriptions-${source}.json.gz'), 'variante gzip non demandée');
assert.ok(js.includes('catch { data = null; }'), 'repli JSON absent si le serveur décompresse');


/* Œil : matériaux dédiés, pupille procédurale et dédoublonnage. */
assert.ok(js.includes("sclera: '#e9e4da'"), 'matériau sclère absent');
assert.ok(js.includes("iris: '#7a5236'"), 'matériau iris absent');
assert.ok(js.includes("pupil: '#0d0b0a'"), 'matériau pupille absent');
assert.ok(js.includes('CircleGeometry'), 'pupille procédurale absente');
assert.ok(js.includes("layer !== 'skin'") && js.includes('doomed.push(o)'),
  'dédoublonnage de l’œil organs absent');
assert.ok(js.includes('layer + \'|\' + (mesh.material?.uuid'), 'batching par matériau absent');
assert.ok(js.includes("mats.get('cornea').opacity = 0.1"), 'cornée trop opaque');


/* Qualité mobile : plus de bridage lié à l'user-agent. */
assert.ok(js.includes('antialias: true'), 'anticrénelage coupé');
assert.ok(js.includes('setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))'), 'DPR non plafonné à 2');
assert.ok(!/userAgent\.test|\/Mobile\/i\.test\(navigator\.userAgent\)/.test(js), 'user-agent encore utilisé');
assert.ok(js.includes('navigator.hardwareConcurrency') && js.includes('navigator.deviceMemory'),
  'capacité réelle non mesurée');

/* Oreilles : copie cartilage visible sans peau, avec squelette ou organes. */
assert.ok(js.includes("cartilage: '#d9d0ba'"), 'matériau cartilage absent');
assert.ok(js.includes('altForSkin'), 'copie cartilage non marquée');
assert.ok(js.includes("!active.has('skin') && (active.has('skeleton') || active.has('organes')".replace('organes','organs')), 'règle de visibilité des oreilles absente');

/* Rail des couches : ordre extérieur → intérieur, isolation au double-tap. */
assert.ok(js.includes("const LAYER_ORDER = ['skin', 'muscles', 'vessels', 'nerves', 'skeleton', 'organs']"),
  'ordre des couches absent');
assert.ok(js.includes("btn.addEventListener('dblclick'"), 'isolation au double-tap absente');
assert.ok(js.includes('railSaved'), 'retour après isolation absent');
assert.ok(js.includes("l === 'cosmetic' && layer === 'skin'"), 'cheveux non fusionnés avec la peau');
assert.ok(js.includes("matchMedia('(max-width:700px)')"), 'rail non replié sur mobile');

console.log('PASS LOD : configuration, swap atomique, repli, statut et descriptions gzip');
