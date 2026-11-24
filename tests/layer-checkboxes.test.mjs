import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(root + "index.html", "utf8");
const js = readFileSync(root + "src/corps-viewer.js", "utf8");

const LAYERS = ["skin", "muscles", "skeleton", "organs", "vessels", "nerves"];
assert.ok(!html.includes('id="cp-couche"'), "l'ancien select doit être supprimé");
assert.ok(html.includes('id="cp-couche-all"'), "case maîtresse absente");
for (const layer of LAYERS) {
  const id = `cp-couche-${layer}`;
  assert.ok(html.includes(`id="${id}"`), `checkbox ${layer} absente`);
  assert.ok(html.includes(`for="${id}"`), `label ${layer} absent`);
  assert.ok(html.includes(`data-layer="${layer}" checked`), `${layer} doit être cochée par défaut`);
}
assert.ok(html.includes('id="cp-male"'), "sélecteur homme absent");
assert.ok(html.includes('id="cp-female"'), "sélecteur femme absent");
for (const male of ['seema', 'nqwrc', 'wangzh']) {
  assert.ok(html.includes(`value="${male}"`), `candidat homme ${male} absent`);
}
for (const female of ['female-atlas', 'enhanced', 'slorksmo', 'bodyatlas', 'anatria', 'organui', 'none']) {
  assert.ok(html.includes(`value="${female}"`), `candidate femme ${female} absente`);
}
assert.ok(!html.includes('ancien-atlas'), "le lien vers l'ancien atlas doit être supprimé");
assert.ok(html.includes('id="toolbar"'), "barre d'outils absente");
assert.ok(js.includes("active.has(o.userData.layer)"), "bascule par couche absente");
assert.ok(js.includes("history.replaceState"), "état non reflété dans l'URL");
console.log("PASS couches et concours");
