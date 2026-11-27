import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(root + "index.html", "utf8");
const js = readFileSync(root + "src/corps-viewer.js", "utf8");

for (const id of ["nav-zoom-in", "nav-zoom-out", "nav-fit", "nav-reset",
  "nav-focus-male"]) {
  assert.ok(!html.includes(`id="${id}"`), `bouton ${id} encore présent`);
}
assert.ok(html.includes('role="application"'), "canvas sans rôle application");
assert.ok(html.includes('aria-label="Vue 3D interactive du corps humain"'), "aria-label canvas absent");
assert.ok(js.includes("CameraControls.ACTION.ROTATE"), "orbite souris absente");
assert.ok(js.includes("CameraControls.ACTION.TRUCK"), "pan souris absent");
assert.ok(js.includes("CameraControls.ACTION.TOUCH_ROTATE"), "orbite tactile absente");
assert.ok(js.includes("CameraControls.ACTION.TOUCH_ZOOM_TRUCK"), "pincement tactile absent");
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
assert.ok(js.includes('setDecoderPath'), "décodeur Draco absent");
assert.ok(js.includes('const setPreset = (kind)'), "préréglages non câblés");
assert.ok(js.includes('setXray(kind === \'xray\')'), "mode Rayon X absent");
assert.ok(js.includes('CameraControls.install'), "contrôles camera-controls absents");
assert.ok(js.includes('dollyToCursor'), "zoom vers le curseur absent");
assert.ok(js.includes("G_FJ2811: 'skin'"), "oreille externe non mapée vers peau");
assert.ok(js.includes("new THREE.ShaderMaterial"), "overlay Fresnel absent");
assert.ok(js.includes("uOpacity"), "pulsation du shader absente");
assert.ok(js.includes("THIN_LAYERS"), "couches fines non protégées du hull");
assert.ok(!js.includes("makeScale(1.012"), "ancien hull inversé encore présent");
assert.ok(!js.includes('setPivotBody(startBody)'), "changement de pivot au relâchement encore présent");
assert.ok(js.includes('zoomAtPoint('), "zoom au point touché absent");
assert.ok(js.includes('now - lastTap.t < 300'), "détection du double-tap absente");
assert.ok(!js.includes('setActiveSex('), "bouton sexe encore câblé");
assert.ok(!js.includes("searchParams.set('sex'"), "sexe encore conservé dans l'URL");

/* Ergonomie : pan modifié, seuil de glissement, bornes, aide et boutons zoom. */
assert.ok(js.includes('PAN_MOD') && js.includes('shiftKey') && js.includes('metaKey'),
  "pan au glisser avec Shift/Ctrl/Cmd absent");
assert.ok(js.includes("cc.mouseButtons.left = PAN_MOD(e)"), "bascule TRUCK du bouton gauche absente");
assert.ok(js.includes('dragArmed'), "seuil de glissement absent");
assert.ok(js.includes('cc.mouseButtons.left = CameraControls.ACTION.NONE'), "seuil non appliqué au bouton gauche");
assert.ok(js.includes('TOUCH_ZOOM_TRUCK'), "pincement orthographique non conforme");
assert.ok(js.includes('cc.touches.three'), "geste trois doigts non configuré");
assert.ok(js.includes('setNavBoundary') && js.includes('navBox'), "frontière de navigation absente");
assert.ok(js.includes('minPolarAngle') && js.includes('maxPolarAngle'), "bornes polaires absentes");
assert.ok(js.includes('const panStep'), "pas de pan proportionnel absent");
assert.ok(js.includes('shiftKey') && js.includes("addEventListener('wheel'"), "pan à la molette+Shift absent");
assert.ok(js.includes('popupTimer'), "délai du popup absent");
assert.ok(js.includes('const wake') && js.includes('rafId'), "suspension de la boucle absente");
assert.ok(!js.includes('cc.mouseButtons.LEFT'), "clés mouseButtons en majuscules (ignorées)");
assert.ok(!js.includes('cc.touches.ONE'), "clés touches en majuscules (ignorées)");
assert.ok(html.includes('cursor:grab') && html.includes('cursor:grabbing'), "affordance de curseur absente");
assert.ok(html.includes('aria-keyshortcuts'), "aria-keyshortcuts absent");
assert.ok(html.includes('id="shortcuts-help"'), "aide des raccourcis absente");
assert.ok(html.includes('id="zoom-in"') && html.includes('id="zoom-out"'), "boutons zoom absents");
assert.ok(html.includes('overscroll-behavior'), "overscroll-behavior absent");
console.log("PASS navigation, double-tap et contrôles camera-controls");
