import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(root + "index.html", "utf8");
const js = readFileSync(root + "src/corps-viewer.js", "utf8");

assert.ok(js.includes("CameraControls.install"), "contrôles camera-controls absents");
assert.ok(js.includes("dollyToCursor"), "zoom vers le curseur absent");
assert.ok(js.includes("cc.smoothTime"), "amortissement absent");
assert.ok(js.includes("prefers-reduced-motion"), "reduced motion non respecté");
assert.ok(js.includes("RENDER_ORDER"), "ordre de rendu des couches absent");
assert.ok(js.includes("xray = false"), "peau opaque par défaut absente");
assert.ok(js.includes("BatchedMesh"), "batching absent");
assert.ok(js.includes("DRACOLoader"), "décodeur Draco absent");
assert.ok(js.includes("zoomAtPoint("), "zoom au point touché absent");
assert.ok(!js.includes("setPivotBody(startBody)"), "pivot encore modifié au relâchement");
assert.ok(js.includes("lastWidth"), "redimensionnement par frame encore présent");
assert.ok(!js.includes("resize(); renderer.render"), "resize encore appelé à chaque frame");
assert.ok(!js.includes("setActiveSex("), "bouton sexe encore câblé");
assert.ok(!js.includes("sex-toggle"), "bouton sexe encore présent");
assert.ok(!html.includes("cp-couche-pregnancy"), "couche grossesse encore présente");
assert.ok(!html.includes("id=\"panel-concours\""), "sélecteur de modèles encore présent");
console.log("PASS interface homme unique, batching et contrôles");
