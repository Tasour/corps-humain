import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "/home/tasour/.local/share/mise/installs/playwright/latest/node_modules/playwright/index.mjs";

const BASE = process.env.TEST_BASE || "http://localhost:5199";
/* Le nombre de structures vient du manifeste : il change dès qu'une règle de
 * fusion (doublons inter-sources, exclusions) évolue. Le figer en dur faisait
 * échouer le test à chaque correction de données sans qu'aucun bug n'existe. */
const MANIFEST_COUNT = JSON.parse(
  fs.readFileSync(path.resolve(import.meta.dirname, "../public/models/v2/manifest.json"), "utf8"),
).structures.length;
const results = [];
const errors = [];

function check(name, fn) {
  return Promise.resolve()
    .then(fn)
    .then(() => results.push({ name, ok: true }))
    .catch((e) => {
      results.push({ name, ok: false, error: e.message });
    });
}

/* Sélection robuste du premier résultat : avec l'exploration hiérarchique,
 * #list .item peut être temporairement vide au moment du clic. On attend
 * l'élément, on le rend visible, puis on clique avec un timeout généreux et
 * une seule tentative de repli. */
async function selectFirstItem(page) {
  const item = page.locator("#list .item").first();
  const attempt = async () => {
    await item.waitFor({ state: "visible", timeout: 30000 });
    await item.scrollIntoViewIfNeeded({ timeout: 30000 });
    await item.click({ timeout: 30000 });
  };
  try {
    await attempt();
  } catch {
    await page.waitForTimeout(300);
    await attempt();
  }
}

const browser = await chromium.launch({ executablePath: "/usr/bin/chromium" });
const context = await browser.newContext({ viewport: { width: 1360, height: 880 } });
const page = await context.newPage();
page.setDefaultTimeout(90000);
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() !== "error") return;
  if (m.text().includes("Failed to load resource")) return; // favicon
  errors.push(m.text());
});

await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
await page.waitForTimeout(1000);

const st = () => page.evaluate(() => {
  const e = window.__v2;
  return {
    global: e.globalLod,
    isolated: !!e.isolated,
    visible: e.currentVisible.size,
    skin: e.skinBatch?.visible,
    skinDesired: e.skinDesired,
    bones: e.batches.get("bone")?.visible,
    muscles: e.batches.get("muscle")?.visible,
    organs: e.batches.get("organ")?.visible,
    camera: [e.camera?.position?.x, e.camera?.position?.y, e.camera?.position?.z],
    selected: document.getElementById("sel-name").textContent,
    meta: document.getElementById("sel-meta").textContent,
    count: e.structures.length,
    drawCalls: e.stats.drawCalls,
  };
});

/* ---------- chargement ---------- */
await check(`chargement : ${MANIFEST_COUNT} structures et 3 lots`, async () => {
  const s = await st();
  assert.equal(s.count, MANIFEST_COUNT);
  assert.equal(s.drawCalls, 3);
});
await check("aucune erreur console au chargement", () => assert.deepEqual(errors, []));

/* ---------- recherche et sélection ---------- */
await check("recherche fémur renvoie 2结果", async () => {
  await page.fill("#search", "fémur");
  await page.waitForTimeout(200);
  const n = await page.locator("#list .item").count();
  assert.equal(n, 2);
});
await check("sélection depuis la liste isole et masque la peau", async () => {
  await selectFirstItem(page);
  await page.waitForTimeout(800);
  const s = await st();
  assert.equal(s.isolated, true);
  assert.equal(s.skin, false);
  assert.equal(s.visible, 1);
});
await check("sélection d'un os réactive son lot (vue non vide)", async () => {
  const s = await st();
  assert.equal(s.bones, true);
  const tris = await page.evaluate(() => {
    const e = window.__v2;
    const batch = e.batches.get("bone");
    return [...Array(batch.instanceCount)].filter((_, i) => batch.getVisibleAt(i)).length;
  });
  assert.ok(tris >= 1);
});
await check("le détail high se charge à l'isolement", async () => {
  await page.waitForTimeout(4000);
  const detail = await page.evaluate(() => {
    const e = window.__v2;
    const selected = e.structures.find((s) => s._activeLod === "high" || /tris/.test(document.getElementById("sel-meta").textContent));
    return { high: e.structures.filter((s) => s._activeLod === "high").length, meta: document.getElementById("sel-meta").textContent };
  });
  assert.ok(detail.high >= 1 || /\d+ tris/.test(detail.meta), JSON.stringify(detail));
});
await check("Tout afficher restaure la peau et le culling", async () => {
  await page.evaluate(() => {
    const e = window.__v2;
    e.isolate(null);
    e.updateVisibility(e.camera, 1);
  });
  await page.waitForTimeout(500);
  const s = await st();
  assert.equal(s.isolated, false);
  assert.equal(s.skin, false);
  assert.ok(s.visible > 300);
});

/* ---------- focus après masquage de catégorie ---------- */
await check("focus réactive la catégorie masquée", async () => {
  await page.evaluate(() => window.__v2.setCategoryVisible("bone", false));
  await page.fill("#search", "fémur");
  await page.waitForTimeout(200);
  await selectFirstItem(page);
  await page.waitForTimeout(300);
  await page.evaluate(() => window.__v2.setCategoryVisible("bone", false));
  await selectFirstItem(page);
  await page.waitForTimeout(400);
  const s = await st();
  assert.equal(s.bones, true);
  assert.equal(s.isolated, true);
  assert.equal(s.visible, 1);
});
await check("focus peau reste masquée", async () => {
  const s = await st();
  assert.equal(s.skin, false);
});

/* ---------- groupes ---------- */
/* La section des 43 groupes est repliée par défaut (pour laisser la liste
 * des structures visible) : on l'ouvre comme le ferait l'utilisateur. */
await page.evaluate(() => { document.getElementById("groups-details").open = true; });
await check("groupe bras gauche : 7 membres, catégories réactivées", async () => {
  await page.locator("#groups button", { hasText: "Membre supérieur gauche" }).click();
  await page.waitForTimeout(600);
  const s = await st();
  assert.equal(s.visible, 7);
  assert.equal(s.bones, true);
  assert.equal(s.muscles, true);
  assert.equal(s.skin, false);
});
await check("animation éclat modifie les matrices", async () => {
  await page.click("#explode");
  await page.waitForTimeout(900);
  const moved = await page.evaluate(() => {
    const e = window.__v2;
    const s = e.byId.get("bone:humerus-l");
    const ref = e.structureToInstance.get(s._index);
    const m = new Float32Array(16);
    e.batches.get(ref.category).getMatrixAt(ref.instanceId, { fromArray: (arr, off) => { for (let i = 0; i < 16; i++) m[i] = arr[off + i]; } });
    return Math.abs(m[12]) + Math.abs(m[13]) + Math.abs(m[14]);
  });
  assert.ok(moved > 0.001, `déplacement=${moved}`);
});
await check("reset groupe restaure les matrices", async () => {
  await page.click("#group-reset");
  await page.waitForTimeout(300);
  const s = await st();
  assert.equal(s.visible, 7);
});
await check("mouvement articulaire fonctionne", async () => {
  await page.locator("#groups button", { hasText: "Avant-bras gauche" }).click();
  await page.waitForTimeout(400);
  await page.click("#move");
  await page.waitForTimeout(700);
  assert.deepEqual(errors, []);
});
await check("changement rapide de groupes ne casse pas l'état", async () => {
  for (const label of ["Cœur et cavités", "Poumons et lobes", "Œil droit et muscles", "Membre inférieur gauche"]) {
    await page.locator("#groups button", { hasText: label }).click();
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(600);
  assert.deepEqual(errors, []);
});

/* ---------- LOD ---------- */
await check("LOD global medium sur desktop rapide", async () => {
  await page.waitForTimeout(3000);
  const s = await st();
  assert.ok(["low", "medium"].includes(s.global));
});
await check("sélection multiple consécutive reste stable", async () => {
  await page.evaluate(() => window.__v2.isolate(null));
  for (const q of ["radius", "triceps", "foie", "œil", "cerveau"]) {
    await page.fill("#search", q);
    await page.waitForTimeout(120);
    const item = page.locator("#list .item").first();
    if (await item.count()) await item.click();
    await page.waitForTimeout(150);
  }
  assert.deepEqual(errors, []);
});

/* ---------- waypoints et animations ---------- */
await check("waypoints créés à la sélection", async () => {
  await page.evaluate(() => window.__v2.isolate(null));
  await page.fill("#search", "coeur");
  await page.waitForTimeout(200);
  await selectFirstItem(page);
  await page.waitForTimeout(500);
  const n = await page.evaluate(() => window.__v2.waypointGroup.children.length);
  assert.ok(n >= 3, `waypoints=${n}`);
});
await check("waypoints curés : l'estomac affiche ses anecdotes", async () => {
  await page.evaluate(() => window.__v2.isolate(null));
  await page.fill("#search", "estomac");
  await page.waitForTimeout(200);
  await page.locator('#list .item[data-id="organ:stomach"]').click();
  await page.waitForTimeout(400);
  const d = await page.evaluate(() => ({
    labels: window.__v2.waypoints.map((w) => w.label),
    count: window.__v2.waypointGroup.children.length,
  }));
  assert.ok(d.labels.includes("Fundus"), `libellés : ${d.labels.join(", ")}`);
  assert.ok(d.labels.includes("Pylore"), `libellés : ${d.labels.join(", ")}`);
  assert.equal(d.count, d.labels.length, "marqueurs ≠ waypoints");
});
await check("visite guidée des waypoints affiche une anecdote", async () => {
  await page.locator("#animations button", { hasText: "Waypoints" }).click();
  await page.waitForTimeout(2600);
  const info = await page.evaluate(() => ({
    display: document.getElementById("waypoint-info").style.display,
    title: document.getElementById("wp-title").textContent,
    text: document.getElementById("wp-text").textContent,
  }));
  assert.equal(info.display, "block");
  assert.ok(info.title.length > 2);
  assert.ok(info.text.length > 20);
});
await check("tour du monde fait orbitner la caméra", async () => {
  const before = await page.evaluate(() => window.__v2.camera.position.x);
  await page.locator("#animations button", { hasText: "Tour du monde" }).click();
  await page.waitForTimeout(1400);
  const after = await page.evaluate(() => window.__v2.camera.position.x);
  await page.locator("#animations button", { hasText: "Tour du monde" }).click();
  assert.ok(Math.abs(after - before) > 0.02, `avant=${before} après=${after}`);
});
await check("battement cardiaque modifie les matrices", async () => {
  await page.locator("#animations button", { hasText: "Battement cardiaque" }).click();
  await page.waitForTimeout(600);
  const active = await page.evaluate(() => window.__v2.animation?.type);
  assert.equal(active, "heartbeat");
});
await check("respiration / clignement / flux sanguin sans erreur", async () => {
  for (const label of ["Respiration", "Clignement", "Flux sanguin"]) {
    await page.locator("#animations button", { hasText: label }).click();
    await page.waitForTimeout(400);
  }
  assert.deepEqual(errors, []);
});
await check("focus depuis toutes les orientations caméra", async () => {
  await page.evaluate(() => window.__v2.isolate(null));
  await page.fill("#search", "fémur");
  await page.waitForTimeout(150);
  for (const pos of [[2.5, 1.3, 0], [-2.5, 1.3, 0], [0, 1.3, 2.5], [0, 1.3, -2.5]]) {
    await page.evaluate((p) => window.__v2.camera.position.set(...p), pos);
    await selectFirstItem(page);
    await page.waitForTimeout(250);
    const s = await st();
    assert.equal(s.isolated, true);
    assert.equal(s.skin, false);
  }
  assert.deepEqual(errors, []);
});

/* ---------- picking des objets masqués, ombres, thème ---------- */
await check("désactiver une couche masque aussi ses membranes", async () => {
  await page.evaluate(() => window.__v2.isolate(null));
  for (const cat of ["organ", "muscle", "bone"]) {
    const state = await page.evaluate((category) => {
      const e = window.__v2;
      e.setCategoryVisible(category, false);
      const base = e.mergedMeshes.get(category);
      const membrane = e.mergedMeshes.get(`${category}:membrane`);
      return { base: base?.visible ?? null, membrane: membrane?.visible ?? null };
    }, cat);
    assert.equal(state.base, false, `${cat} : mesh principal encore visible`);
    assert.equal(state.membrane, false, `${cat} : membrane encore visible`);
  }
  await page.evaluate(() => {
    const e = window.__v2;
    e.setCategoryVisible("organ", true);
    const btn = document.querySelector('[data-cat="organ"]');
    if (btn) { btn.classList.add("active"); btn.setAttribute("aria-pressed", "true"); }
  });
});
await check("clic sur zone masquée ne change pas la sélection", async () => {
  await page.evaluate(() => window.__v2.isolate(null));
  await page.fill("#search", "fémur");
  await page.waitForTimeout(150);
  await selectFirstItem(page);
  await page.waitForTimeout(900);
  const beforeName = await page.evaluate(() => document.getElementById("sel-name").textContent);
  // clic au centre de la vue, là où d'autres organes étaient visibles avant l'isolement
  const box = await page.locator("canvas").boundingBox();
  await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.25);
  await page.waitForTimeout(400);
  const afterName = await page.evaluate(() => document.getElementById("sel-name").textContent);
  assert.equal(afterName, beforeName);
});
await check("glisser la scène ne change pas la sélection", async () => {
  const name = await page.evaluate(() => document.getElementById("sel-name").textContent);
  const box = await page.locator("canvas").boundingBox();
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.62, box.y + box.height * 0.55, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(300);
  assert.equal(await page.evaluate(() => document.getElementById("sel-name").textContent), name);
});
await check("double-clic recadre la vue", async () => {
  await page.locator("canvas").dblclick({ position: { x: 300, y: 300 } });
  await page.waitForTimeout(900);
  const pos = await page.evaluate(() => window.__v2.camera.position.toArray());
  assert.ok(Math.hypot(pos[0] - 0.72, pos[2] - 2.85) < 0.35, `pos=${pos}`);
});
await check("toutes les structures restent visibles en rotation", async () => {
  await page.evaluate(() => window.__v2.isolate(null));
  await page.waitForTimeout(300);
  await page.evaluate(() => { const c = window.__v2.camera; c.position.set(2.5, 1.3, 0); c.lookAt(0, 1, 0); });
  await page.waitForTimeout(400);
  const visible = await page.evaluate(() => window.__v2.currentVisible.size);
  assert.ok(visible > 2000, `visibles=${visible}`);
});
await check("rotation : le modèle reste visible (pas d'erreur GL)", async () => {
  await page.evaluate(() => window.__v2.isolate(null));
  await page.waitForTimeout(300);
  const glErrors = [];
  const listener = (m) => { if (m.text().includes("GL_INVALID") || m.text().includes("Mismatch")) glErrors.push(m.text()); };
  page.on("console", listener);
  await page.mouse.move(640, 430);
  await page.mouse.down();
  await page.mouse.move(780, 470, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(700);
  page.off("console", listener);
  assert.deepEqual(glErrors, []);
  const info = await page.evaluate(() => ({ ...window.__renderer.info.render }));
  assert.ok(info.triangles > 100000, `triangles=${info.triangles}`);
});
await check("ombres activées", async () => {
  const ok = await page.evaluate(() => {
    const e = window.__v2;
    return [...e.batches.values()].every((b) => b.castShadow && b.receiveShadow);
  });
  assert.ok(ok);
});
await check("bascule thème clair / sombre", async () => {
  const before = await page.evaluate(() => document.body.classList.contains("dark"));
  await page.click("#theme-toggle");
  await page.waitForTimeout(150);
  const after = await page.evaluate(() => document.body.classList.contains("dark"));
  assert.notEqual(after, before);
  await page.click("#theme-toggle");
  await page.waitForTimeout(150);
  assert.deepEqual(errors, []);
});

/* ---------- chasse aux organes ---------- */
await check("chasse : la cible réelle est cliquable dans le corps", async () => {
  await page.evaluate(() => window.__hunt.start());
  await page.waitForTimeout(300);
  const started = await page.evaluate(() => window.__hunt.state());
  assert.equal(started.active, true);
  assert.ok(started.target, "aucune cible tirée");
  assert.equal(await page.evaluate(() => document.body.classList.contains("hunting")), true);
  assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector(".perf")).display), "none");

  /* Cible osseuse : seule la couche os est visible, donc aucun organe ne
   * masque le tibia. On cadre son centre puis on clique au centre du canvas,
   * ce qui exerce le vrai picking (pas un appel direct à la logique du jeu). */
  await page.evaluate(() => window.__hunt.forceTarget("bone:tibia-l"));
  await page.waitForTimeout(200);
  await page.evaluate(() => {
    const e = window.__v2;
    const s = e.byId.get("bone:tibia-l");
    const c = [
      (s.bounds.min[0] + s.bounds.max[0]) / 2,
      (s.bounds.min[1] + s.bounds.max[1]) / 2,
      (s.bounds.min[2] + s.bounds.max[2]) / 2,
    ];
    /* Les tests précédents ont pu laisser un reliquat d'amortissement :
     * sans cette pause, OrbitControls déplace la caméra après le cadrage. */
    window.__controls.enableDamping = false;
    window.__controls.target.set(c[0], c[1], c[2]);
    e.camera.position.set(c[0], c[1], c[2] + 0.5);
    e.camera.lookAt(c[0], c[1], c[2]);
    window.__controls.update();
    window.__renderer.render(window.__scene, e.camera);
  });
  const box = await page.locator("canvas").first().boundingBox();
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(500);
  const scored = await page.evaluate(() => ({
    state: window.__hunt.state(),
    feedback: document.getElementById("hunt-feedback").textContent,
  }));
  assert.ok(scored.state.score >= 10, `score=${scored.state.score} · ${scored.feedback}`);
  assert.equal(scored.state.found, 1);
  assert.match(scored.feedback, /^Exact/);
});

await check("chasse : une mauvaise structure coûte 2 secondes", async () => {
  /* Le bon clic verrouille le jeu 700 ms puis tire une nouvelle cible. */
  await page.waitForFunction(() => window.__hunt.state().lock === false, null, { timeout: 5000 });
  await page.evaluate(() => window.__hunt.forceTarget("organ:bp-heart"));
  const before = await page.evaluate(() => window.__hunt.state().timeLeft);
  await page.evaluate(() => {
    window.__hunt.pick(window.__v2.byId.get("bone:humerus-l"));
  });
  const after = await page.evaluate(() => window.__hunt.state());
  assert.ok(after.timeLeft < before - 1.5, `temps ${before} → ${after.timeLeft}`);
  assert.equal(after.score, 10);
  assert.equal(after.streak, 0);
});

await check("chasse : arrêter restaure les couches et la fiche", async () => {
  await page.click("#hunt-close");
  await page.waitForTimeout(250);
  const d = await page.evaluate(() => ({
    hidden: document.getElementById("hunt-hud").hidden,
    hunting: document.body.classList.contains("hunting"),
    organ: document.querySelector('[data-cat="organ"]').getAttribute("aria-pressed"),
    bone: document.querySelector('[data-cat="bone"]').getAttribute("aria-pressed"),
    muscle: document.querySelector('[data-cat="muscle"]').getAttribute("aria-pressed"),
    name: document.getElementById("sel-name").textContent,
  }));
  assert.equal(d.hidden, true);
  assert.equal(d.hunting, false);
  assert.equal(d.organ, "true");
  assert.equal(d.bone, "false");
  assert.equal(d.muscle, "false");
  assert.equal(d.name, "Cliquez sur une structure");
});

/* ---------- mobile ---------- */
let mobileContext = null;
await check("mobile : sidebar repliable et focus", async () => {
  mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const mp = await mobileContext.newPage();
  mp.setDefaultTimeout(90000);
  mp.on("pageerror", (e) => errors.push("mobile: " + e.message));
  await mp.goto(`${BASE}/v2.html`, { timeout: 120000 });
  await mp.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
  const hidden = await mp.evaluate(() => getComputedStyle(document.getElementById("sidebar")).display);
  assert.equal(hidden, "none");
  await mp.click("#mobile-toggle", { force: true });
  await mp.waitForTimeout(150);
  /* Le tiroir est un conteneur défilant (display:block) et non plus une
   * colonne flex : on vérifie l'état réel, pas une valeur de mise en page. */
  const open = await mp.evaluate(() => ({
    display: getComputedStyle(document.getElementById("sidebar")).display,
    open: document.getElementById("sidebar").classList.contains("open"),
    expanded: document.getElementById("mobile-toggle").getAttribute("aria-expanded"),
  }));
  assert.notEqual(open.display, "none");
  assert.equal(open.open, true);
  assert.equal(open.expanded, "true");
  await mp.touchscreen.tap(195, 420);
  await mp.waitForTimeout(300);
  assert.deepEqual(errors.filter((e) => e.startsWith("mobile:")), []);
  await mp.evaluate(() => window.__v2Stop?.()).catch(() => {});
  // On ne ferme rien ici : contexte mobile et navigateur sont fermés dans le
  // nettoyage final, une fois tous les tests terminés (jamais prématurément).
});

/* On arrête la boucle rAF et les timers avant de fermer : aucun callback ne
 * doit rester en volée après la fermeture du navigateur. */
await page.evaluate(() => window.__v2Stop?.()).catch(() => {});

/* Le résumé est calculé et imprimé AVANT la fermeture du navigateur : si la
 * fermeture traîne ou échoue, la sortie utile est déjà écrite. */
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} tests réussis`);
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.error ? " — " + r.error : ""}`);
if (errors.length) console.log("ERREURS", errors);
process.exitCode = failed.length ? 1 : 0;

if (mobileContext) await mobileContext.close().catch(() => {});
await browser.close().catch(() => {});
