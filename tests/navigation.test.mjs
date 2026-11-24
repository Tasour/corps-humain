import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(root + "index.html", "utf8");
const js = readFileSync(root + "src/corps-viewer.js", "utf8");

for (const id of ["nav-zoom-in", "nav-zoom-out", "nav-fit", "nav-reset"]) {
  assert.ok(html.includes(`id="${id}"`), `bouton ${id} absent`);
}
for (const removed of ["bodyatlas", "slorksmo", "enhanced"]) {
  assert.ok(!html.includes(`value="${removed}"`), `source ${removed} encore présente`);
}
for (const kept of ["seema", "nqwrc", "wangzh"]) {
  assert.ok(html.includes(`value="${kept}"`), `source ${kept} absente`);
}
assert.ok(!html.includes('Body Atlas 3D'), "ancienne source encore dans le header");
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
console.log("PASS navigation 3D et sources réduites");
