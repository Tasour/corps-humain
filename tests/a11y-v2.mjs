import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "/home/tasour/.local/share/mise/installs/playwright/latest/node_modules/playwright/index.mjs";

/* Contrôle d'accessibilité et de responsive de l'atlas v2.
 *
 * Ces vérifications sont mesurées dans le navigateur, pas déclaratives :
 * contraste calculé sur les couleurs réellement rendues, cibles tactiles
 * mesurées en pixels, navigation clavier exercée sur le canvas, feuille de
 * détails ouverte sur un viewport de téléphone.
 *
 * Usage : node tests/a11y-v2.mjs  (serveur Vite sur TEST_BASE, défaut 5199) */

const BASE = process.env.TEST_BASE || "http://localhost:5199";
const OUT = path.resolve(import.meta.dirname, "../docs/analyses/a11y-v2.json");
const results = [];

function check(name, fn) {
  return Promise.resolve()
    .then(fn)
    .then(() => results.push({ name, ok: true }))
    .catch((e) => results.push({ name, ok: false, error: e.message }));
}

const browser = await chromium.launch({ executablePath: "/usr/bin/chromium" });

/* ---------- bureau ------------------------------------------------------- */
const desktop = await browser.newContext({ viewport: { width: 1360, height: 880 } });
const page = await desktop.newPage();
page.setDefaultTimeout(90000);
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() !== "error") return;
  if (m.text().includes("Failed to load resource")) return;
  errors.push(m.text());
});
await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
await page.waitForTimeout(800);

await check("langue et titre du document", async () => {
  const d = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    title: document.title.trim(),
  }));
  assert.equal(d.lang, "fr");
  assert.ok(d.title.length > 5, "titre vide");
});

await check("un seul <main>, repères nommés", async () => {
  const d = await page.evaluate(() => ({
    mains: document.querySelectorAll("main").length,
    sidebars: [...document.querySelectorAll("aside")].map((a) => a.getAttribute("aria-label")),
    nav: document.querySelector('nav[aria-label="Fil d\'Ariane"]') !== null,
  }));
  assert.equal(d.mains, 1);
  assert.ok(d.sidebars.every(Boolean), `aside sans nom : ${JSON.stringify(d.sidebars)}`);
  assert.ok(d.nav, "fil d'Ariane sans rôle navigation");
});

await check("canvas focusable, décrit et nommé", async () => {
  const d = await page.evaluate(() => {
    const c = document.querySelector("#viewport canvas");
    return {
      tabindex: c.getAttribute("tabindex"),
      role: c.getAttribute("role"),
      label: c.getAttribute("aria-label"),
      describedby: c.getAttribute("aria-describedby"),
      help: document.getElementById("canvas-help")?.textContent.length || 0,
    };
  });
  assert.equal(d.tabindex, "0");
  assert.equal(d.role, "application");
  assert.ok(d.label && d.label.length > 10, "aria-label manquant");
  assert.equal(d.describedby, "canvas-help");
  assert.ok(d.help > 40, "aide clavier absente");
});

await check("tous les boutons visibles ont un nom accessible", async () => {
  const unnamed = await page.evaluate(() => {
    const out = [];
    for (const b of document.querySelectorAll("button")) {
      if (!b.getClientRects().length) continue;
      const name = (b.getAttribute("aria-label") || b.textContent || "").trim();
      if (!name) out.push(b.id || b.className || b.outerHTML.slice(0, 60));
    }
    return out;
  });
  assert.deepEqual(unnamed, [], `boutons sans nom : ${unnamed.join(" | ")}`);
});

await check("couches : aria-pressed suit l'état visuel", async () => {
  const before = await page.evaluate(() => [...document.querySelectorAll("[data-cat]")]
    .map((b) => [b.dataset.cat, b.getAttribute("aria-pressed"), b.classList.contains("active")]));
  for (const [cat, pressed, active] of before) {
    assert.equal(pressed, String(active), `couche ${cat} incohérente`);
  }
  await page.click('[data-cat="bone"]');
  const after = await page.evaluate(() => {
    const b = document.querySelector('[data-cat="bone"]');
    return { pressed: b.getAttribute("aria-pressed"), active: b.classList.contains("active") };
  });
  assert.equal(after.pressed, String(after.active));
  assert.equal(after.pressed, "true");
  await page.click('[data-cat="bone"]'); // remise en état
});

/* Contraste réellement rendu : on remonte les ancêtres jusqu'à un fond
 * opaque, puis on applique la formule WCAG 2.1. */
await check("contraste AA (4,5:1) des textes secondaires", async () => {
  const samples = await page.evaluate(() => {
    function rgb(c) {
      const m = c.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const p = m[1].split(",").map((x) => parseFloat(x));
      return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    }
    function lum({ r, g, b }) {
      const f = (v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    }
    function ratio(a, b) {
      const A = lum(a), B = lum(b);
      return (Math.max(A, B) + 0.05) / (Math.min(A, B) + 0.05);
    }
    function background(el) {
      let node = el;
      while (node) {
        const c = rgb(getComputedStyle(node).backgroundColor);
        if (c && c.a > 0.9) return c;
        node = node.parentElement;
      }
      return { r: 255, g: 255, b: 255, a: 1 };
    }
    const selectors = [".item small", ".group", ".perf", ".tree-count", ".section-title", ".breadcrumb .sep"];
    const out = [];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (!el || !el.getClientRects().length) continue;
      const fg = rgb(getComputedStyle(el).color);
      const bg = background(el);
      out.push({ sel, fg: getComputedStyle(el).color, bg: `rgb(${bg.r}, ${bg.g}, ${bg.b})`, ratio: ratio(fg, bg) });
    }
    return out;
  });
  assert.ok(samples.length >= 4, "échantillons de contraste insuffisants");
  for (const s of samples) {
    assert.ok(s.ratio >= 4.5, `${s.sel} : ${s.ratio.toFixed(2)}:1 (${s.fg} sur ${s.bg})`);
  }
});

await check("focus visible au clavier", async () => {
  await page.evaluate(() => document.body.focus());
  let found = null;
  for (let i = 0; i < 8 && !found; i++) {
    await page.keyboard.press("Tab");
    found = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      return {
        tag: el.tagName,
        id: el.id,
        outlineStyle: s.outlineStyle,
        outlineWidth: parseFloat(s.outlineWidth),
      };
    });
  }
  assert.ok(found, "aucun élément focusable atteint par Tab");
  assert.notEqual(found.outlineStyle, "none", `pas d'outline sur ${found.tag}#${found.id}`);
  assert.ok(found.outlineWidth >= 2, `outline trop fin (${found.outlineWidth}px)`);
});

await check("canvas : flèches font tourner la caméra", async () => {
  const before = await page.evaluate(() => {
    document.querySelector("#viewport canvas").focus();
    const c = window.__v2.camera.position;
    return [c.x, c.y, c.z];
  });
  await page.keyboard.press("ArrowLeft");
  await page.waitForTimeout(120);
  const after = await page.evaluate(() => {
    const c = window.__v2.camera.position;
    return [c.x, c.y, c.z];
  });
  const moved = Math.hypot(after[0] - before[0], after[1] - before[1], after[2] - before[2]);
  assert.ok(moved > 0.01, `caméra immobile (${moved.toFixed(4)})`);
});

await check("canvas : Entrée sélectionne ou explique l'absence de cible", async () => {
  await page.evaluate(() => document.querySelector("#viewport canvas").focus());
  await page.keyboard.press("Enter");
  await page.waitForTimeout(400);
  const d = await page.evaluate(() => ({
    status: document.getElementById("a11y-status").textContent,
    selected: !!document.body.classList.contains("has-selection"),
  }));
  assert.ok(d.status.length > 0, "aucune annonce après Entrée");
});

await check("Échap efface la sélection et rétablit le panneau", async () => {
  await page.locator("#list .item").first().click();
  await page.waitForTimeout(300);
  const selected = await page.evaluate(() => document.body.classList.contains("has-selection"));
  assert.ok(selected, "la sélection n'ouvre pas le panneau");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  const d = await page.evaluate(() => ({
    open: document.body.classList.contains("has-selection"),
    name: document.getElementById("sel-name").textContent,
  }));
  assert.equal(d.open, false);
  assert.match(d.name, /Cliquez sur une structure/);
});

await check("touche / place le focus dans la recherche", async () => {
  await page.evaluate(() => document.body.focus());
  await page.keyboard.press("/");
  const id = await page.evaluate(() => document.activeElement?.id);
  assert.equal(id, "search");
});

await check("aucune erreur console", async () => {
  assert.deepEqual(errors, []);
});

await desktop.close();

/* ---------- téléphone ---------------------------------------------------- */
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});
const mp = await mobile.newPage();
mp.setDefaultTimeout(90000);
const mobileErrors = [];
mp.on("pageerror", (e) => mobileErrors.push(String(e)));
await mp.goto(`${BASE}/v2.html`);
await mp.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
await mp.waitForTimeout(800);

await check("mobile : pas de débordement horizontal", async () => {
  const d = await mp.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    inner: innerWidth,
  }));
  assert.ok(d.scroll <= d.inner + 1, `débordement ${d.scroll} > ${d.inner}`);
});

await check("mobile : le tiroir s'ouvre, se ferme et se nomme", async () => {
  const before = await mp.getAttribute("#mobile-toggle", "aria-expanded");
  assert.equal(before, "false");
  await mp.click("#mobile-toggle");
  const open = await mp.evaluate(() => ({
    expanded: document.getElementById("mobile-toggle").getAttribute("aria-expanded"),
    sidebar: document.getElementById("sidebar").classList.contains("open"),
    scrim: !document.getElementById("scrim").hidden,
  }));
  assert.deepEqual(open, { expanded: "true", sidebar: true, scrim: true });
  await mp.keyboard.press("Escape");
  const closed = await mp.evaluate(() => ({
    expanded: document.getElementById("mobile-toggle").getAttribute("aria-expanded"),
    sidebar: document.getElementById("sidebar").classList.contains("open"),
    scrim: !document.getElementById("scrim").hidden,
    focus: document.activeElement?.id,
  }));
  assert.equal(closed.expanded, "false");
  assert.equal(closed.sidebar, false);
  assert.equal(closed.scrim, false);
  assert.equal(closed.focus, "mobile-toggle");
});

await check("mobile : la feuille de détails s'ouvre à la sélection", async () => {
  await mp.click("#mobile-toggle");
  await mp.locator("#list .item").first().click();
  await mp.waitForTimeout(400);
  const d = await mp.evaluate(() => {
    const info = document.getElementById("info");
    const r = info.getBoundingClientRect();
    return {
      open: document.body.classList.contains("has-selection"),
      inert: info.inert,
      ariaHidden: info.getAttribute("aria-hidden"),
      visible: r.top < innerHeight && r.height > 40,
      close: getComputedStyle(document.getElementById("details-close")).display !== "none",
    };
  });
  assert.equal(d.open, true, `has-selection absent : ${JSON.stringify(d)}`);
  assert.equal(d.inert, false, `panneau inert : ${JSON.stringify(d)}`);
  assert.equal(d.ariaHidden, "false", `aria-hidden : ${JSON.stringify(d)}`);
  assert.equal(d.visible, true, `feuille hors écran : ${JSON.stringify(d)}`);
  assert.equal(d.close, true, `bouton fermer masqué : ${JSON.stringify(d)}`);
});

await check("mobile : cibles tactiles principales ≥ 44 px", async () => {
  const small = await mp.evaluate(() => {
    const sels = [
      "#theme-toggle", "#mobile-toggle", "#reset", "[data-cat]", "#list .item",
      ".tree-node", "#animations button", "#shortcuts button", "#groups button",
    ];
    const out = [];
    for (const sel of sels) {
      for (const el of document.querySelectorAll(sel)) {
        if (!el.getClientRects().length) continue;
        const r = el.getBoundingClientRect();
        if (r.height < 44) out.push(`${sel} → ${r.height.toFixed(1)}px`);
      }
    }
    return [...new Set(out)];
  });
  assert.deepEqual(small, [], `cibles trop petites : ${small.join(" | ")}`);
});

await check("mobile : aucune erreur console", async () => {
  assert.deepEqual(mobileErrors, []);
});

await mobile.close();

/* ---------- réduction des mouvements ------------------------------------ */
const calm = await browser.newContext({
  viewport: { width: 1360, height: 880 },
  reducedMotion: "reduce",
});
const cp = await calm.newPage();
await cp.goto(`${BASE}/v2.html`);
await cp.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });

await check("prefers-reduced-motion : transitions neutralisées", async () => {
  const d = await cp.evaluate(() => {
    const s = getComputedStyle(document.getElementById("reset"));
    return { duration: s.transitionDuration, anim: s.animationDuration };
  });
  const seconds = (v) => parseFloat(v) || 0;
  assert.ok(seconds(d.duration) < 0.02, `transition ${d.duration}`);
  assert.ok(seconds(d.anim) < 0.02, `animation ${d.anim}`);
});
await calm.close();
await browser.close();

const passed = results.filter((r) => r.ok).length;
fs.writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString(), passed, total: results.length, results }, null, 2));
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.ok ? "" : ` — ${r.error}`}`);
console.log(`\n${passed}/${results.length} contrôles d'accessibilité réussis`);
process.exit(passed === results.length ? 0 : 1);
