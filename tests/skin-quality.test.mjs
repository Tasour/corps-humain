/* Qualité de la peau, du regard et de la région génitale.
 *
 * Ces assertions figent les corrections du 2026-11-27 : rendu mobile non bridé,
 * coutures de peau lissées, sourcils et cils sombres, muscles oculomoteurs
 * masqués sous la peau, couvreur génital conservé, zoom plus sensible et
 * affichage initial avec toutes les couches.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const js = readFileSync(root + 'src/corps-viewer.js', 'utf8');
const html = readFileSync(root + 'index.html', 'utf8');

/* 1. Rendu : plus de bridage lié à l'user-agent, anticrénelage et DPR 2. */
assert.ok(js.includes('antialias: true'), 'anticrénelage coupé');
assert.ok(js.includes('setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))'), 'DPR non plafonné à 2');
assert.ok(!/\/Mobile\/i\.test\(navigator\.userAgent\)/.test(js), 'user-agent encore utilisé comme palier');
assert.ok(js.includes('navigator.hardwareConcurrency') && js.includes('navigator.deviceMemory'),
  'capacité réelle non mesurée');

/* 2. Éclairage et matière : tone mapping, environnement, bruit borné. */
assert.ok(js.includes('ACESFilmicToneMapping'), 'tone mapping absent');
assert.ok(js.includes('PMREMGenerator'), 'environnement PMREM absent');
assert.ok(js.includes('vnoise(vWPos * 120.0)'), 'bruit de peau non borné (striures)');
assert.ok(!js.includes('vnoise(vWPos * 520.0)'), 'bruit sous-échantillonné encore présent');

/* 3. Coutures de peau : normales moyennées au même endroit, sans fusion. */
assert.ok(js.includes('const smoothSeams = '), 'lissage des coutures absent');
assert.ok(js.includes('smoothSeams(gltf.scene)'), 'lissage non appliqué à la peau');
assert.ok(js.includes('own.x * b[k] + own.y * b[k + 1] + own.z * b[k + 2] < 0.4'),
  'filtre angulaire des normales absent');

/* 4. Regard : cils et sourcils sombres, paupière teintée, oculomoteurs cachés. */
assert.ok(/eyelash\|?\^?eyebrow/.test(js) || js.includes('/eyelash|^eyebrow/i'), 'cils non reconnus comme poils');
assert.ok(js.includes("lid: '#b9857a'"), 'teinte de paupière absente');
assert.ok(/palpebral_part_of_orbicularis/.test(js), 'paupière non détectée');
assert.ok(js.includes('hideWithSkin'), 'masquage sous la peau absent');
assert.ok(/\(lateral\|medial\|superior\|inferior\)_rectus_muscle/.test(js), 'muscles oculomoteurs non détectés');
assert.ok(js.includes('!(o.userData.hideWithSkin && active.has(\'skin\'))'), 'règle de masquage non appliquée');

/* 5. Région génitale : couvreur d'origine, rétracté, sans patch découpé. */
assert.ok(/modesty\[ _\]\?cover/i.test(js), 'couvreur génital non reconnu');
assert.ok(js.includes('const conformCover = '), 'rétraction du couvreur absente');
assert.ok(/const scale = 0\.96/.test(js), 'facteur de rétraction inattendu');
assert.ok(!js.includes('buildMaleSkinPatch'), 'ancien patch découpé encore chargé');

/* 6. Affichage initial : toutes les couches. */
assert.ok(js.includes('for (const b of boxes) b.checked = ALL_LAYERS.includes(b.dataset.layer);'),
  'toutes les couches ne sont pas actives par défaut');

/* 7. Zoom plus sensible. */
assert.ok(js.includes('cc.dollySpeed = 4.0'), 'sensibilité de molette non augmentée');
assert.ok(js.includes("case '+': case '=': zoomBy(1.5); break;"), 'zoom clavier non augmenté');
assert.ok(js.includes("case '-': case '_': zoomBy(1 / 1.5); break;"), 'dézoom clavier non augmenté');
assert.ok(js.includes('zoomAtPoint(e.clientX, e.clientY, 2.5)'), 'double-tap à 2,5× absent');

/* 8. L'interface expose le rail des couches, dans l'ordre extérieur → intérieur. */
const order = ['skin', 'muscles', 'vessels', 'nerves', 'skeleton', 'organs'];
let cursor = -1;
for (const layer of order) {
  const at = html.indexOf(`data-layer-step="${layer}"`);
  assert.ok(at > cursor, `couche ${layer} absente ou hors ordre dans le rail`);
  cursor = at;
}

console.log('PASS peau : rendu, coutures, regard, région génitale, zoom et couches par défaut');
