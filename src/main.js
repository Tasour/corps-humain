import "./style.css";
import { AnatomyScene } from "./scene.js";
import { VitalsMonitor } from "./monitor.js";
import { DISEASES, DISEASE_MAP, NORMAL_VITALS } from "./data/diseases.js";
import { SYSTEMS } from "./data/systems.js";
import { DiagnosticGame, OrganHunt } from "./games.js";
import { setupPWA } from "./pwa.js";
import {
  renderSystemChips,
  renderEntityList,
  countMatches,
  renderHome,
  renderEntity,
  renderDisease,
  diseasesForEntity,
  diseaseStageText,
  systemName,
} from "./ui.js";

/* ───────────────────────────── DOM ───────────────────────────── */

const $ = (sel) => document.querySelector(sel);
const stage = $("#stage");
const labelsHost = $("#labels");
const viewport = $("#viewport");
const leftPanel = $("#left-panel");
const rightContent = $("#right-content");
const systemFilter = $("#system-filter");
const organList = $("#organ-list");
const listCount = $("#list-count");
const search = $("#search");
const tooltip = $("#tooltip");
const toastEl = $("#toast");
const activePath = $("#active-path");
const apName = $("#ap-name");
const huntHud = $("#hunt-hud");
const appEl = $("#app");
const monitorEl = $("#monitor");

/* ───────────────────────────── state ───────────────────────────── */

const state = {
  mode: "explore",
  view: "home",
  selectedId: null,
  activeDisease: null,
  severity: 0.65,
  system: "all",
  kind: "organ",
  query: "",
  layers: { skin: true, muscles: false, bones: false, organs: true },
  labels: !window.matchMedia("(max-width: 920px)").matches,
  autoRotate: false,
  explode: false,
  explodeAmount: 0,
  crossSection: false,
  isolatedId: null,
  compareOn: false,
  severityBefore: 0.65,
};

let huntReturn = null;

/* ───────────────────────────── scene ───────────────────────────── */

const scene = new AnatomyScene({
  stage,
  labels: labelsHost,
  onSelect: (id) => handlePick(id),
  onHover: (entry, x, y) => handleHover(entry, x, y),
});

const entries = scene.entries;

const monitor = new VitalsMonitor($("#ecg"), {
  hr: $("#v-hr"),
  spo2: $("#v-spo2"),
  rr: $("#v-rr"),
  bp: $("#v-bp"),
  temp: $("#v-temp"),
  note: $("#monitor-note"),
});

scene.onFrame = (dt) => {
  monitor.update(dt, scene.getVitals(), scene.disease, scene.severity);
  if (state.mode === "hunt") hunt.update(dt);
};

/* ───────────────────────────── games ───────────────────────────── */

const quiz = new DiagnosticGame({
  entries,
  clearBody: () => {
    scene.clearDisease();
    state.activeDisease = null;
    monitor.setDisease(null, 0);
    updateActivePath();
  },
  showDisease: (d, sev) => applyDisease(d, sev),
  focus: (id) => {
    const entry = entries[id];
    if (!entry) return;
    ensureLayer(entry.kind);
    scene.focusEntry(id, 0.95);
  },
  focusDisease: (d) => {
    const ids = [...new Set(d.effects.map((e) => e.target))];
    for (const id of ids) {
      const entry = entries[id];
      if (entry) ensureLayer(entry.kind);
    }
    scene.focusEntries(ids, 1);
  },
  openOrgan: (id) => {
    state.mode = "explore";
    quiz.active = false;
    state.view = "entity";
    selectEntity(id, { focus: true });
  },
  onChange: () => {
    renderLeft();
    renderRight();
  },
  toast: (msg, tone) => toast(msg, tone),
  exit: () => exitQuiz(),
});

const hunt = new OrganHunt({
  entries,
  scene,
  els: {
    hud: huntHud,
    name: $("#hunt-name"),
    sub: $("#hunt-sub"),
    score: $("#hunt-score"),
    bar: $("#hunt-bar"),
    time: $("#hunt-time"),
  },
  toast: (msg, tone) => toast(msg, tone),
  onFinish: (score) => {
    try {
      if (score > (Number(localStorage.getItem("corps.best.hunt")) || 0)) {
        localStorage.setItem("corps.best.hunt", String(score));
      }
    } catch {
      /* ignore */
    }
    setTimeout(() => {
      if (state.mode === "hunt" && !hunt.active) exitHunt(true);
    }, 4800);
  },
});

/* ───────────────────────────── chrome ───────────────────────────── */

function toast(message, tone = "info") {
  toastEl.textContent = message;
  toastEl.className = `toast show ${tone}`;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    toastEl.className = "toast";
  }, 2600);
}

function ensureLayer(kind) {
  if (kind === "bone" && !state.layers.bones) state.layers.bones = true;
  if (kind === "muscle" && !state.layers.muscles) state.layers.muscles = true;
  if (kind === "organ" && !state.layers.organs) state.layers.organs = true;
  syncSceneLayers();
  syncLayerUI();
}

function syncSceneLayers() {
  for (const key of ["skin", "muscles", "bones", "organs"]) {
    scene.setLayer(key, state.layers[key]);
  }
  scene.setLabels(state.labels);
}

function syncLayerUI() {
  document.querySelectorAll("#layers [data-layer]").forEach((btn) => {
    const key = btn.dataset.layer;
    const active = key === "labels" ? state.labels : state.layers[key];
    btn.classList.toggle("active", !!active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
  $("#btn-rotate").classList.toggle("active", state.autoRotate);
  const explodeBtn = $("#btn-explode");
  if (explodeBtn) {
    explodeBtn.classList.toggle("active", state.explode);
    explodeBtn.setAttribute("aria-pressed", state.explode ? "true" : "false");
  }
  const range = $("#explode-range");
  if (range) range.value = String(Math.round(state.explodeAmount * 100));
  const value = $("#explode-value");
  if (value) value.textContent = `${Math.round(state.explodeAmount * 100)} %`;
  const sectionBtn = $("#btn-section");
  if (sectionBtn) {
    sectionBtn.classList.toggle("active", state.crossSection);
    sectionBtn.setAttribute("aria-pressed", state.crossSection ? "true" : "false");
  }
}

function updateActivePath() {
  if (!state.activeDisease) {
    activePath.hidden = true;
    return;
  }
  const d = DISEASE_MAP[state.activeDisease];
  if (!d) {
    activePath.hidden = true;
    return;
  }
  activePath.hidden = false;
  apName.textContent = `${d.name} · ${Math.round(state.severity * 100)} %`;
}

function applyDisease(d, severity) {
  state.activeDisease = d.id;
  state.severity = severity;
  state.compareOn = false;
  const kinds = new Set(d.effects.map((e) => entries[e.target]?.kind).filter(Boolean));
  if (kinds.has("bone")) state.layers.bones = true;
  if (kinds.has("muscle")) state.layers.muscles = true;
  if (kinds.has("organ")) state.layers.organs = true;
  syncSceneLayers();
  syncLayerUI();
  scene.showDisease(d, severity);
  monitor.setDisease(d, severity);
  updateActivePath();
}

function clearActiveDisease() {
  scene.clearDisease();
  state.activeDisease = null;
  state.compareOn = false;
  monitor.setDisease(null, 0);
  updateActivePath();
}

/* ───────────────────────────── rendering ───────────────────────────── */

function renderLeft() {
  systemFilter.innerHTML = renderSystemChips(state.system);

  const all = Object.values(entries);
  const list = state.kind === "all" ? all : all.filter((e) => e.kind === state.kind);

  organList.innerHTML = renderEntityList({
    entries: list,
    activeId: state.mode === "quiz" ? null : state.view === "entity" ? state.selectedId : null,
    system: state.system,
    query: state.query,
    kind: state.kind,
  });

  const total = countMatches(all, {
    system: state.system,
    query: state.query,
    kind: state.kind,
  });
  listCount.textContent = `${total} résultat${total > 1 ? "s" : ""}`;

  document.querySelectorAll("#kind-filter .seg").forEach((btn) => {
    const checked = btn.dataset.kind === state.kind;
    btn.classList.toggle("active", checked);
    btn.setAttribute("aria-checked", String(checked));
    btn.tabIndex = checked ? 0 : -1;
  });
}

function renderRight() {
  if (state.mode === "quiz") {
    quiz.render(rightContent);
    return;
  }

  if (state.view === "disease" && state.activeDisease) {
    const d = DISEASE_MAP[state.activeDisease];
    rightContent.innerHTML = renderDisease(d, state.severity, entries, { comparing: state.compareOn });
    return;
  }

  if (state.view === "entity" && state.selectedId) {
    const entry = entries[state.selectedId];
    const related = diseasesForEntity(entry.id);
    rightContent.innerHTML = renderEntity(entry, related, { isolated: state.isolatedId === entry.id });
    return;
  }

  rightContent.innerHTML = renderHome({
    stats: { organs: 22, diseases: DISEASES.length, systems: SYSTEMS.length },
    featured: ["asthme", "infarctus", "cirrhose", "parkinson"].map((id) => DISEASE_MAP[id]),
    bestDiag: readBest("corps.best.diag"),
    bestHunt: readBest("corps.best.hunt"),
  });
}

function readBest(key) {
  try {
    return Number(localStorage.getItem(key)) || 0;
  } catch {
    return 0;
  }
}

/* ───────────────────────────── scene tools ───────────────────────────── */

function setExplode(on, { announce = true } = {}) {
  setExplodeAmount(on ? 1 : 0, { announce: false });
  if (announce) {
    toast(on ? "Vue éclatée : chaque organe se détache" : "Vue anatomique restaurée", "info");
  }
}

function setExplodeAmount(value, { announce = false } = {}) {
  const amount = Math.max(0, Math.min(1, value));
  const wasExploded = state.explodeAmount > 0.02;
  const hadIsolate = !!state.isolatedId;
  if (amount > 0.001 && state.crossSection) {
    state.crossSection = false;
    scene.setCrossSection(false);
  }
  state.explodeAmount = amount;
  state.explode = amount > 0.02;
  if (amount > 0) {
    state.isolatedId = null;
    scene.isolateEntry(null);
  }
  scene.setExplodeAmount(amount);
  syncLayerUI();
  if (hadIsolate) renderRight();
  if (amount <= 0.001) {
    scene.setView("full");
  } else if (!wasExploded) {
    requestAnimationFrame(() => scene.frameAll(1.32 + amount * 0.3));
  }
  if (announce) {
    toast(`Vue éclatée : ${Math.round(amount * 100)} %`, "info");
  }
}

function setCrossSection(on, { announce = true } = {}) {
  state.crossSection = on;
  if (on) {
    if (state.explodeAmount > 0) setExplodeAmount(0, { announce: false });
    clearIsolate();
    state.layers.organs = true;
    state.layers.bones = true;
    syncSceneLayers();
    syncLayerUI();
    scene.setCrossSection(true);
    scene.setView("full");
  } else {
    scene.setCrossSection(false);
    syncLayerUI();
  }
  if (state.view !== "home") renderRight();
  if (announce) {
    toast(
      on ? "Coupe anatomique : la partie avant est retirée" : "Coupe anatomique désactivée",
      "info",
    );
  }
}

function resetScene() {
  state.mode = "explore";
  state.view = "home";
  state.selectedId = null;
  state.activeDisease = null;
  state.severity = 0.65;
  state.compareOn = false;
  state.system = "all";
  state.kind = "organ";
  state.query = "";
  state.layers = { skin: true, muscles: false, bones: false, organs: true };
  state.labels = !window.matchMedia("(max-width: 920px)").matches;
  state.autoRotate = false;
  state.explode = false;
  state.explodeAmount = 0;
  state.crossSection = false;
  state.isolatedId = null;
  search.value = "";
  quiz.active = false;
  hunt.active = false;
  huntHud.hidden = true;
  appEl.classList.remove("playing");
  monitorEl.hidden = false;
  scene.clearDisease();
  scene.isolateEntry(null);
  scene.setExplodeAmount(0);
  scene.setCrossSection(false);
  scene.setSystemFilter("all");
  scene.setSelected(null);
  scene.setAutoRotate(false);
  syncSceneLayers();
  syncLayerUI();
  renderLeft();
  renderRight();
  updateActivePath();
  scene.setView("full");
  toast("Scène réinitialisée", "info");
}

function resetTools() {
  if (state.explodeAmount > 0) setExplodeAmount(0, { announce: false });
  if (state.crossSection) {
    state.crossSection = false;
    scene.setCrossSection(false);
  }
  if (state.isolatedId) {
    state.isolatedId = null;
    scene.isolateEntry(null);
  }
  syncLayerUI();
}

function clearIsolate() {
  if (!state.isolatedId) return;
  state.isolatedId = null;
  scene.isolateEntry(null);
}

function toggleIsolate(id) {
  const entry = entries[id];
  if (!entry) return;
  if (state.isolatedId === id) {
    clearIsolate();
    toast("Silhouette complète restaurée", "info");
  } else {
    ensureLayer(entry.kind);
    state.isolatedId = id;
    scene.isolateEntry(id);
    scene.setSelected(id);
    requestAnimationFrame(() => scene.focusEntry(id, 1.1));
    toast(`${entry.name} isolé · cliquez à nouveau pour tout afficher`, "info");
  }
  renderRight();
}

function toggleCompare() {
  const d = DISEASE_MAP[state.activeDisease];
  if (!d) return;
  if (!state.compareOn) {
    state.severityBefore = state.severity || 0.65;
    state.compareOn = true;
    state.severity = 0;
  } else {
    state.compareOn = false;
    state.severity = state.severityBefore || 0.65;
  }
  scene.setSeverity(state.severity);
  monitor.setDisease(d, state.severity);
  updateActivePath();
  renderRight();
}

/* ───────────────────────────── navigation ───────────────────────────── */

function selectEntity(id, { focus = true } = {}) {
  const entry = entries[id];
  if (!entry) return;
  if (state.isolatedId && state.isolatedId !== id) clearIsolate();
  state.selectedId = id;
  state.view = "entity";
  state.kind = entry.kind;
  if (state.system !== "all" && entry.system !== state.system) {
    state.system = "all";
    scene.setSystemFilter("all");
  }
  ensureLayer(entry.kind);
  scene.setSelected(id);
  renderLeft();
  renderRight();
  if (focus) {
    requestAnimationFrame(() => scene.focusEntry(id));
  }
}

function selectDisease(id, { focus = true } = {}) {
  const d = DISEASE_MAP[id];
  if (!d) return;
  clearIsolate();
  state.mode = "explore";
  state.activeDisease = id;
  state.selectedId = null;
  state.view = "disease";
  state.system = "all";
  scene.setSystemFilter("all");
  scene.setSelected(null);
  applyDisease(d, state.severity);
  renderLeft();
  renderRight();
  if (focus) {
    const ids = [...new Set(d.effects.map((e) => e.target))];
    if (ids.length) requestAnimationFrame(() => scene.focusEntries(ids));
  }
}

function backHome() {
  clearIsolate();
  state.view = "home";
  state.selectedId = null;
  scene.setSelected(null);
  renderLeft();
  renderRight();
}

function enterGameMode() {
  appEl.classList.add("playing");
  monitorEl.hidden = true;
  state.kind = "organ";
  state.system = "all";
  state.query = "";
  search.value = "";
  scene.setSystemFilter("all");
}

function leaveGameMode() {
  appEl.classList.remove("playing");
  monitorEl.hidden = false;
  state.kind = "organ";
  state.system = "all";
  state.query = "";
  search.value = "";
  scene.setSystemFilter("all");
}

function startQuiz() {
  if (state.mode === "hunt") exitHunt(false);
  resetTools();
  state.mode = "quiz";
  state.view = "home";
  state.selectedId = null;
  state.layers = { skin: true, muscles: false, bones: false, organs: true };
  state.labels = !window.matchMedia("(max-width: 920px)").matches;
  syncSceneLayers();
  syncLayerUI();
  scene.setSelected(null);
  clearActiveDisease();
  state.severity = 0.7;
  scene.setView("full");
  enterGameMode();
  quiz.start();
  renderLeft();
  renderRight();
}

function exitQuiz() {
  if (state.mode !== "quiz") return;
  quiz.active = false;
  state.mode = "explore";
  state.view = "home";
  state.selectedId = null;
  clearActiveDisease();
  scene.setSelected(null);
  scene.setView("full");
  leaveGameMode();
  renderLeft();
  renderRight();
}

function startHunt() {
  if (state.mode === "quiz") exitQuiz();
  resetTools();
  huntReturn = { layers: { ...state.layers }, labels: state.labels };
  state.mode = "hunt";
  state.view = "home";
  state.selectedId = null;
  state.layers = { skin: true, muscles: false, bones: false, organs: true };
  state.labels = false;
  syncSceneLayers();
  syncLayerUI();
  scene.setSelected(null);
  scene.setSystemFilter("all");
  clearActiveDisease();
  scene.setView("full");
  enterGameMode();
  renderLeft();
  renderRight();
  hunt.start();
}

function exitHunt(restore = true) {
  hunt.active = false;
  huntHud.hidden = true;
  if (state.mode !== "hunt") return;
  state.mode = "explore";
  if (restore && huntReturn) {
    state.layers = { ...huntReturn.layers };
    state.labels = huntReturn.labels;
    syncSceneLayers();
    syncLayerUI();
  }
  huntReturn = null;
  leaveGameMode();
  renderLeft();
  renderRight();
}

/* ───────────────────────────── interaction ───────────────────────────── */

function handlePick(id) {
  if (state.mode === "hunt") {
    if (id) hunt.pick(id);
    return;
  }
  if (state.mode === "quiz") return;

  if (!id) {
    clearIsolate();
    state.view = "home";
    state.selectedId = null;
    scene.setSelected(null);
    renderLeft();
    renderRight();
    return;
  }
  selectEntity(id, { focus: false });
}

function handleHover(entry, x, y) {
  if (!entry || state.mode === "hunt") {
    tooltip.hidden = true;
    return;
  }
  const rect = viewport.getBoundingClientRect();
  tooltip.hidden = false;
  tooltip.innerHTML = `<i style="--c:${entry.color}"></i><strong>${entry.name}</strong><span>${systemName(entry.system)}</span>`;
  tooltip.style.left = `${x - rect.left + 16}px`;
  tooltip.style.top = `${y - rect.top + 14}px`;
}

/* ───────────────────────────── events ───────────────────────────── */

document.querySelector("#layers").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-layer]");
  if (btn) {
    const key = btn.dataset.layer;
    if (key === "labels") {
      state.labels = !state.labels;
      scene.setLabels(state.labels);
    } else {
      state.layers[key] = !state.layers[key];
      scene.setLayer(key, state.layers[key]);
    }
    syncLayerUI();
    return;
  }
  if (e.target.closest("#btn-rotate")) {
    state.autoRotate = !state.autoRotate;
    scene.setAutoRotate(state.autoRotate);
    syncLayerUI();
  }
});

systemFilter.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-system]");
  if (!btn) return;
  state.system = btn.dataset.system;
  if (state.system === "squelettique") state.kind = "bone";
  else if (state.system === "musculaire") state.kind = "muscle";
  else if (state.system !== "all" && state.kind !== "organ") state.kind = "organ";
  scene.setSystemFilter(state.system);
  renderLeft();
});

const kindFilter = document.querySelector("#kind-filter");
kindFilter.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-kind]");
  if (!btn) return;
  state.kind = btn.dataset.kind;
  renderLeft();
});
/* Choix unique : navigation flèches/Home/End avec tabindex mobile (roving),
 * conformément au motif radiogroup plutôt qu'à une succession de bascules. */
kindFilter.addEventListener("keydown", (e) => {
  const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
  if (!keys.includes(e.key)) return;
  const buttons = [...kindFilter.querySelectorAll("[data-kind]")];
  const current = buttons.indexOf(document.activeElement);
  if (current < 0) return;
  const next = e.key === "Home" ? 0
    : e.key === "End" ? buttons.length - 1
    : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (current - 1 + buttons.length) % buttons.length
    : (current + 1) % buttons.length;
  e.preventDefault();
  buttons[next].focus();
  buttons[next].click();
});

organList.addEventListener("click", (e) => {
  const organBtn = e.target.closest("[data-organ]");
  if (organBtn) {
    selectEntity(organBtn.dataset.organ);
    return;
  }
  const diseaseBtn = e.target.closest("[data-disease]");
  if (diseaseBtn) {
    selectDisease(diseaseBtn.dataset.disease);
  }
});

search.addEventListener("input", () => {
  state.query = search.value;
  renderLeft();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    e.preventDefault();
    search.focus();
  }
  if (e.key === "Escape" && document.activeElement === search) {
    search.value = "";
    state.query = "";
    search.blur();
    renderLeft();
  }
});

rightContent.addEventListener("click", (e) => {
  const diseaseBtn = e.target.closest("[data-disease]");
  if (diseaseBtn) {
    selectDisease(diseaseBtn.dataset.disease);
    return;
  }

  const organBtn = e.target.closest("[data-organ]");
  if (organBtn) {
    if (state.mode !== "explore") {
      quiz.active = false;
      hunt.active = false;
      huntHud.hidden = true;
      state.mode = "explore";
    }
    selectEntity(organBtn.dataset.organ);
    return;
  }

  const focusBtn = e.target.closest("[data-focus]");
  if (focusBtn) {
    const id = focusBtn.dataset.focus;
    const entry = entries[id];
    if (entry) {
      ensureLayer(entry.kind);
      scene.setSelected(id);
      scene.focusEntry(id);
    }
    return;
  }

  const isolateBtn = e.target.closest("[data-isolate]");
  if (isolateBtn) {
    toggleIsolate(isolateBtn.dataset.isolate);
    return;
  }

  if (e.target.closest("[data-compare]")) {
    toggleCompare();
    return;
  }

  if (e.target.closest("[data-back]")) {
    backHome();
    return;
  }

  const sysJump = e.target.closest("[data-system-jump]");
  if (sysJump) {
    clearIsolate();
    state.system = sysJump.dataset.systemJump;
    scene.setSystemFilter(state.system);
    state.kind = "organ";
    renderLeft();
    toast(`Filtre : ${systemName(state.system)}`, "info");
    return;
  }

  if (e.target.closest("[data-quiz]")) {
    startQuiz();
    return;
  }

  if (e.target.closest("[data-hunt]")) {
    startHunt();
  }
});

rightContent.addEventListener("input", (e) => {
  if (e.target.id !== "severity" || !state.activeDisease) return;
  const sev = Number(e.target.value) / 100;
  state.compareOn = false;
  state.severity = sev;
  scene.setSeverity(sev);
  const d = DISEASE_MAP[state.activeDisease];
  monitor.setDisease(d, sev);
  updateActivePath();
  updateSeverityUI(d, sev);
});

rightContent.addEventListener("change", (e) => {
  if (e.target.id !== "severity" || !state.activeDisease) return;
  renderRight();
});

$("#btn-quiz").addEventListener("click", startQuiz);
$("#btn-hunt").addEventListener("click", startHunt);
$("#btn-explode").addEventListener("click", () => setExplode(!state.explode));

const explodeRange = $("#explode-range");
if (explodeRange) {
  explodeRange.addEventListener("input", () => {
    setExplodeAmount(Number(explodeRange.value) / 100);
  });
  explodeRange.addEventListener("change", () => {
    const amount = Number(explodeRange.value) / 100;
    if (amount > 0.001) {
      requestAnimationFrame(() => scene.frameAll(1.32 + amount * 0.3));
    }
  });
}

$("#btn-section")?.addEventListener("click", () => setCrossSection(!state.crossSection));
$("#btn-reset-scene")?.addEventListener("click", resetScene);
$("#hunt-quit").addEventListener("click", () => exitHunt(true));
$("#ap-clear").addEventListener("click", () => {
  clearActiveDisease();
  if (state.view === "disease") state.view = "home";
  renderLeft();
  renderRight();
});

document.querySelector("#view-presets").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-view]");
  if (btn) scene.setView(btn.dataset.view);
});

function updateSeverityUI(d, sev) {
  const pct = Math.round(sev * 100);
  const value = document.getElementById("sev-value");
  if (value) value.textContent = pct;

  const stage = diseaseStageText(d, sev);
  const note = document.getElementById("sev-note");
  if (note) note.innerHTML = `<b>${stage.title}</b><p>${stage.text}</p>`;

  const labels = document.querySelectorAll(".sev-track-labels span");
  const idx = sev <= 0.01 ? -1 : Math.min(2, Math.floor(sev * 3));
  labels.forEach((el, i) => {
    el.classList.toggle("on", i === 0 ? idx < 0 : idx === i - 1);
  });

  document.querySelectorAll(".effect").forEach((el) => {
    const bar = el.querySelector(".effect-bar");
    if (!bar) return;
    const amount = Number(bar.dataset.amount) || 0;
    const p = Math.round(amount * sev * 100);
    bar.style.width = `${p}%`;
    const pctEl = el.querySelector(".effect-pct");
    if (pctEl) pctEl.textContent = `${p}%`;
  });
}

/* ───────────────────────────── boot ───────────────────────────── */

new ResizeObserver(() => scene.resize()).observe(stage);
window.addEventListener("resize", () => scene.resize());

syncLayerUI();
syncSceneLayers();
renderLeft();
renderRight();
updateActivePath();
setupPWA({ toast });

window.__app = { scene, state, quiz, hunt, monitor };

setTimeout(() => {
  if (state.mode === "explore" && state.view === "home") {
    toast("Cliquez sur un organe pour commencer l'exploration", "info");
  }
}, 1600);
