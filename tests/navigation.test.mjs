import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(root + "index.html", "utf8");
const js = readFileSync(root + "src/corps-viewer.js", "utf8");

for (const id of ["nav-zoom-in", "nav-zoom-out", "nav-fit", "nav-reset",
  "nav-focus-male", "nav-focus-female"]) {
  assert.ok(!html.includes(`id="${id}"`), `bouton ${id} encore présent`);
}
assert.ok(html.includes('role="application"'), "canvas sans rôle application");
assert.ok(html.includes('aria-label="Vue 3D interactive du corps humain"'), "aria-label canvas absent");
assert.ok(js.includes("THREE.MOUSE.ROTATE"), "orbite souris absente");
assert.ok(js.includes("THREE.MOUSE.PAN"), "pan souris absent");
assert.ok(js.includes("THREE.TOUCH.ROTATE"), "orbite tactile absente");
assert.ok(js.includes("THREE.TOUCH.DOLLY_PAN"), "pan/zoom tactile absent");
assert.ok(js.includes("prefers-reduced-motion"), "Reduced motion non respecté");
assert.ok(js.includes("preserveDrawingBuffer: capture"), "buffer de rendu non conditionné");
assert.ok(!js.includes('#2f6fb3'), "carré bleu encore présent");
assert.ok(!js.includes('#d16b9c'), "carré rose encore présent");
assert.ok(html.includes('id="selection-popup"'), "popup de sélection absente");
assert.ok(html.includes('id="selection-close"'), "bouton de fermeture absent");
assert.ok(js.includes('intersectObjects(activeBodies(), true)'), "raycast sur corps actif absent");
assert.ok(js.includes('clearSelection()'), "reset de sélection absent");
assert.ok(js.includes('EdgesGeometry'), "contour absent");
assert.ok(js.includes('0x40f0e0'), "couleur turquoise absente");
assert.ok(js.includes('selection-descriptions-${source}.json'), "descriptions fractionnées absentes");
assert.ok(js.includes('BatchedMesh'), "batching absent");
assert.ok(js.includes('decodeChunk('), "décodage worker absent");
assert.ok(js.includes('const setPreset = (kind)'), "préréglages non câblés");
assert.ok(js.includes('setXray(kind === \'xray\')'), "mode Rayon X absent");
assert.ok(js.includes('buildSupplements'), "compléments anatomiques absents");
assert.ok(js.includes("G_FJ2811: 'skin'"), "oreille externe non mapée vers peau");
assert.ok(js.includes("new THREE.ShaderMaterial"), "overlay Fresnel absent");
assert.ok(js.includes("uOpacity"), "pulsation du shader absente");
assert.ok(js.includes("THIN_LAYERS"), "couches fines non protégées du hull");
assert.ok(!js.includes("makeScale(1.012"), "ancien hull inversé encore présent");
assert.ok(!js.includes('setPivotBody(startBody)'), "changement de pivot au relâchement encore présent");
assert.ok(js.includes('zoomAtPoint('), "zoom au point touché absent");
assert.ok(js.includes('now - lastTap.t < 300'), "détection du double-tap absente");
assert.ok(js.includes('setActiveSex('), "bouton sexe non câblé");
assert.ok(js.includes("searchParams.set('sex'"), "sexe non conservé dans l'URL");
console.log("PASS navigation, double-tap et bouton sexe");
