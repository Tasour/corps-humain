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
  assert.ok(js.includes(`'${layer}'`), `${layer} absent du modèle d'état`);
}

assert.ok(js.includes("active.has(o.userData.layer)"), "bascule par couche absente");
assert.ok(!js.includes("getElementById('cp-couche')"), "ancien écouteur encore présent");
assert.ok(html.includes('id="cp-source"'), "sélecteur de source absent");
for (const source of ['bodyatlas', 'slorksmo', 'enhanced', 'seema', 'nqwrc', 'wangzh']) {
  assert.ok(html.includes(`value="${source}"`), `source ${source} absente`);
}
assert.ok(!html.includes('ancien-atlas'), "le lien vers l'ancien atlas doit être supprimé");
assert.ok(html.includes('id="toolbar"'), "barre d'outils absente");
assert.ok(js.includes("history.replaceState"), "état des cases non reflété dans l'URL");
assert.ok(js.includes("sync()"), "case maîtresse non synchronisée");

console.log("PASS sélecteur de couches en checkbox");
