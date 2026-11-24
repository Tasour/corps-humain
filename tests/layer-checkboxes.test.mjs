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
assert.ok(!html.includes('data-panel="concours"'), "le bouton concours doit être supprimé");
assert.ok(!html.includes('id="panel-concours"'), "le panneau concours doit être supprimé");
assert.ok(js.includes("id: 'seema'"), "champion homme absent");
assert.ok(js.includes("id: 'female-atlas'"), "championne femme absente");
assert.ok(!html.includes('ancien-atlas'), "le lien vers l'ancien atlas doit être supprimé");
assert.ok(html.includes('id="toolbar"'), "barre d'outils absente");
assert.ok(js.includes("active.has(o.userData.layer)"), "bascule par couche absente");
console.log("PASS couches et champions");
