import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(root + "index.html", "utf8");
const js = readFileSync(root + "src/corps-viewer.js", "utf8");

const LAYERS = ["skin", "muscles", "skeleton", "organs", "vessels", "nerves", "cosmetic"];
assert.ok(!html.includes('id="cp-couche"'), "l'ancien select doit être supprimé");
assert.ok(html.includes('id="cp-couche-all"'), "case maîtresse absente");
for (const layer of LAYERS) {
  const id = `cp-couche-${layer}`;
  assert.ok(html.includes(`id="${id}"`), `checkbox ${layer} absente`);
  assert.ok(html.includes(`for="${id}"`), `label ${layer} absent`);
  assert.ok(new RegExp(`data-layer="${layer}"[^>]*checked`).test(html),
    `${layer} doit être cochée par défaut`);
}
assert.ok(!html.includes('id="cp-couche-facial"'), "couche faciale encore séparée");
assert.ok(!html.includes('id="cp-preset-face"'), "préréglage Visage encore présent");
for (const id of ["cp-preset-skin", "cp-preset-muscles", "cp-preset-skeleton",
  "cp-preset-organs", "cp-preset-xray"]) {
  assert.ok(html.includes(`id="${id}"`), `préréglage ${id} absent`);
}
assert.ok(!js.includes("groundSquare"), "carrés de sol encore présents");
assert.ok(!html.includes('id="nav-focus-male"'),
  "anciens boutons H/F encore présents");
assert.ok(!html.includes('id="nav-commands"'), "ancienne barre de commandes encore présente");
assert.ok(html.includes('#toolbar { position:absolute; left:0; right:0; bottom:0;'),
  "barre horizontale absente");
assert.ok(html.includes('id="cp-preset-xray" aria-pressed="false"'), "Rayon X sans aria-pressed");
assert.ok(!html.includes('data-panel="concours"'), "le bouton concours doit être supprimé");
assert.ok(!html.includes('id="panel-concours"'), "le panneau concours doit être supprimé");
assert.ok(js.includes("id: 'seema'"), "champion homme absent");
assert.ok(html.includes('id="toolbar"'), "barre d'outils absente");
assert.ok(html.includes('id="pivot-indicator"'), "indicateur de pivot absent");
assert.ok(js.includes("active.has(o.userData.layer)"), "bascule par couche absente");
console.log("PASS couches, barre horizontale et bouton sexe");
