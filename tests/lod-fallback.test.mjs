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

console.log('PASS LOD : configuration, swap atomique, repli, statut et descriptions gzip');
