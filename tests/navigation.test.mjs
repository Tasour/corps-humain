import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(root + "index.html", "utf8");
const js = readFileSync(root + "src/corps-viewer.js", "utf8");

for (const id of ["nav-zoom-in", "nav-zoom-out", "nav-fit", "nav-reset"]) {
  assert.ok(html.includes(`id="${id}"`), `bouton ${id} absent`);
}
assert.ok(html.includes('data-panel="concours"'), "panneau concours absent");
assert.ok(html.includes('id="panel-concours"'), "panneau concours absent");
assert.ok(html.includes('role="application"'), "canvas sans rôle application");
assert.ok(html.includes('aria-label="Vue 3D interactive du corps humain"'), "aria-label canvas absent");
assert.ok(js.includes("THREE.MOUSE.ROTATE"), "orbite souris absente");
assert.ok(js.includes("THREE.MOUSE.PAN"), "pan souris absent");
assert.ok(js.includes("THREE.TOUCH.ROTATE"), "orbite tactile absente");
assert.ok(js.includes("THREE.TOUCH.DOLLY_PAN"), "pan/zoom tactile absent");
assert.ok(js.includes("dblclick"), "double-clic absent");
assert.ok(js.includes("touchend"), "double-tap absent");
assert.ok(js.includes("prefers-reduced-motion"), "Reduced motion non respecté");
assert.ok(js.includes("preserveDrawingBuffer"), "buffer de rendu non conservé");
assert.ok(js.includes('#2f6fb3'), "carré bleu absent");
assert.ok(js.includes('#d16b9c'), "carré rose absent");
assert.ok(js.includes("'Vide'"), "texte Vide absent");
assert.ok(js.includes("fitView"), "recadrage absent");
assert.ok(js.includes("resetView"), "reset absent");
assert.ok(js.includes("focusPoint"), "pivot sur point cliqué absent");
assert.ok(js.includes("setScalar(0.001)"), "mise à l'échelle wangzh absente");
console.log("PASS navigation et concours");
