import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { buildAnatomy } from "./anatomy.js";
import { NORMAL_VITALS } from "./data/diseases.js";

const TAU = Math.PI * 2;
const clamp = THREE.MathUtils.clamp;

/* deterministic pseudo-random */
function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const VIEWS = {
  full: { pos: [0.72, 1.28, 2.55], target: [0, 1.0, 0] },
  thorax: { pos: [0.42, 1.36, 0.95], target: [0, 1.27, 0] },
  abdomen: { pos: [0.3, 1.08, 0.86], target: [0, 1.02, 0] },
  head: { pos: [0.32, 1.68, 0.58], target: [0, 1.64, 0] },
  profile: { pos: [2.45, 1.18, 0.22], target: [0, 1.02, 0] },
  back: { pos: [-0.15, 1.18, -2.5], target: [0, 1.06, 0] },
};

const EFFECT_COLORS = {
  inflammation: ["#e85656", "#d61f1f", 0.38],
  obstruction: ["#a83c47", "#ff5a5a", 0.32],
  fibrosis: ["#bdb488", "#c79a2e", 0.34],
  necrosis: ["#4d2229", "#7a1020", 0.24],
  edema: ["#a9cfe4", "#4aa6cd", 0.24],
  atrophy: ["#9c7a6c", "#b85a3e", 0.26],
  hypertrophy: ["#dd5264", "#ff2d45", 0.34],
  tumor: ["#c084d8", "#a855f7", 0.35],
  plague: ["#b48a4f", "#6d4d1e", 0.18],
  plaque: ["#c9a35a", "#8a6a2a", 0.2],
  stone: ["#d9b65a", "#f5c542", 0.25],
  hemorrhage: ["#ff3d3d", "#ff1010", 0.55],
  demyelination: ["#efe9d8", "#cfc6ae", 0.18],
  fracture: ["#d8ceb0", "#ff6b6b", 0.2],
  wear: ["#e79b5c", "#ff6b35", 0.28],
  destruction: ["#7d6a6c", "#3b2024", 0.14],
  consolidation: ["#efd9cd", "#c9a08e", 0.16],
  hyperactivity: ["#ffd75e", "#ffb703", 0.6],
  porosity: ["#cfc5a9", "#6e6450", 0.14],
  scoliosis: ["#e5ddc8", "#e5ddc8", 0.02],
};

const MORPH = {
  inflammation: 1.06,
  obstruction: 0.985,
  fibrosis: 0.93,
  necrosis: 0.99,
  edema: 1.16,
  atrophy: 0.74,
  hypertrophy: 1.13,
  tumor: 1.02,
  destruction: 1.12,
  consolidation: 1.03,
  wear: 1.0,
  hemorrhage: 1.0,
  demyelination: 1.0,
  fracture: 1.0,
  porosity: 0.98,
  plaque: 1.0,
  stone: 1.03,
  hyperactivity: 1.0,
  scoliosis: 1.0,
};

export class AnatomyScene {
  constructor({ stage, labels, onSelect, onHover }) {
    this.stage = stage;
    this.onSelect = onSelect || (() => {});
    this.onHover = onHover || (() => {});
    this.selectedId = null;
    this.hoverId = null;
    this.disease = null;
    this.severity = 0;
    this.systemFilter = "all";
    this.labelsOn = true;
    this.layers = { skin: true, muscles: false, bones: false, organs: true };
    this.vitals = { ...NORMAL_VITALS };
    this.morphs = new Map();
    this.overlays = [];
    this.auras = [];
    this.auraEntries = new Set();
    this.animated = [];
    this.glowMats = [];
    this.flashes = [];
    this.tween = null;
    this.skinOpacity = 1;
    this.skinOpacityTarget = 1;
    this.explode = 0;
    this.explodeTarget = 0;
    this.explodeData = [];
    this.isolatedId = null;
    this.tremor = 0;
    this.tremorPhase = 0;
    this.clock = new THREE.Clock();
    this.pointerDown = null;
    this.hoverRaf = null;
    this.lastPointer = { x: 0, y: 0 };
    this.tint = new THREE.Color("#67e8f9");

    this._initRenderer(labels);
    this._initScene();
    this._buildBody();
    this._initHalo();
    this._initExplode();
    this._initEvents();
    this.resize();
    this._setVitals(NORMAL_VITALS);

    this._animate = this._animate.bind(this);
    this.renderer.setAnimationLoop(this._animate);
  }

  /* ───────────────────────────── setup ───────────────────────────── */

  _initRenderer(labelsHost) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.02;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.className = "webgl";
    this.stage.appendChild(this.renderer.domElement);

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.domElement.className = "label-layer";
    labelsHost.appendChild(this.labelRenderer.domElement);
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#04080f");

    this.camera = new THREE.PerspectiveCamera(38, 1, 0.05, 60);
    this.camera.position.set(...VIEWS.full.pos);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(...VIEWS.full.target);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.075;
    this.controls.enablePan = false;
    this.controls.minDistance = 0.32;
    this.controls.maxDistance = 5.2;
    this.controls.minPolarAngle = Math.PI * 0.12;
    this.controls.maxPolarAngle = Math.PI * 0.52;
    this.controls.rotateSpeed = 0.65;
    this.controls.zoomSpeed = 0.8;
    this.controls.autoRotateSpeed = 0.45;
    this.controls.update();

    const amb = new THREE.AmbientLight(0x9fc4ff, 0.75);
    this.scene.add(amb);
    const hemi = new THREE.HemisphereLight(0xa9dcff, 0x08101a, 1.1);
    this.scene.add(hemi);

    const key = new THREE.DirectionalLight(0xeaf4ff, 2.4);
    key.position.set(1.8, 3.2, 2.2);
    this.scene.add(key);

    const fill = new THREE.DirectionalLight(0x4cc9f0, 1.4);
    fill.position.set(-2.6, 1.5, 1.6);
    this.scene.add(fill);

    const rim = new THREE.DirectionalLight(0x2dd4bf, 2.0);
    rim.position.set(-0.4, 2.0, -2.4);
    this.scene.add(rim);

    const low = new THREE.PointLight(0x1d4ed8, 4, 4);
    low.position.set(0, 0.2, 0.8);
    this.scene.add(low);

    /* soft backdrop glow */
    const bgTex = this._radialTexture("#12304d", "#04080f");
    const bg = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: bgTex,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        opacity: 0.9,
      }),
    );
    bg.position.set(0, 1.15, -3.2);
    bg.scale.set(7.5, 7.5, 1);
    bg.renderOrder = -20;
    this.scene.add(bg);

    /* ground */
    const grid = new THREE.PolarGridHelper(1.7, 12, 7, 72, 0x1c3f5c, 0x0d2233);
    grid.material.transparent = true;
    grid.material.opacity = 0.6;
    grid.position.y = 0.002;
    this.scene.add(grid);

    const discTex = this._radialTexture("#1b4b66", "#04080f", true);
    const disc = new THREE.Mesh(
      new THREE.PlaneGeometry(4.6, 4.6),
      new THREE.MeshBasicMaterial({
        map: discTex,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    disc.rotation.x = -Math.PI / 2;
    disc.position.y = 0.001;
    this.scene.add(disc);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.86, 0.872, 128),
      new THREE.MeshBasicMaterial({
        color: 0x2dd4bf,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.003;
    this.scene.add(ring);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.55, 0.5, 0.72);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
  }

  _radialTexture(inner, outer, soft = false) {
    const size = 512;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, inner);
    g.addColorStop(soft ? 0.32 : 0.12, inner);
    g.addColorStop(1, "rgba(4,8,15,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }

  _buildBody() {
    this.anatomy = buildAnatomy();
    this.body = this.anatomy.root;
    this.entries = this.anatomy.entries;
    this.scene.add(this.body);

    this.overlayRoot = new THREE.Group();
    this.body.add(this.overlayRoot);

    this.pickRoots = [this.anatomy.organsGroup, this.anatomy.skeletonGroup, this.anatomy.musclesGroup];

    const skip = new Set(["cerveau", "cervelet", "tronc_cerebral", "moelle_epiniere"]);
    for (const entry of Object.values(this.entries)) {
      if (entry.kind === "organ" && entry.label) {
        const pos = this._labelOffset(entry.id);
        entry.label.position.copy(pos);
        if (skip.has(entry.id)) entry.label.position.y += 0.015;
      }
    }

    this.heart = this.entries.coeur;
    this.lungs = this.entries.poumons;
    this.skinMaterial = this.anatomy.skinMaterial;

    this._applyLayers();
  }

  _labelOffset(id) {
    const map = {
      cerveau: [0.0, 0.14, 0.0],
      cervelet: [-0.085, 0.06, -0.01],
      tronc_cerebral: [-0.06, 0.0, 0.02],
      moelle_epiniere: [0.075, 0.15, 0.0],
      coeur: [0.105, 0.06, 0.02],
      coronaires: [-0.095, 0.0, 0.045],
      aorte: [-0.1, 0.17, -0.02],
      poumons: [-0.175, 0.1, 0.0],
      bronches: [0.1, 0.19, 0.0],
      oesophage: [-0.02, 0.21, 0.0],
      estomac: [0.1, 0.03, 0.01],
      foie: [-0.13, 0.04, 0.0],
      vesicule: [-0.15, -0.01, 0.02],
      pancreas: [0.01, -0.07, 0.0],
      intestin_grele: [0.08, -0.04, 0.09],
      colon: [0.175, -0.02, 0.0],
      reins: [0.15, 0.1, -0.02],
      ureteres: [-0.1, -0.03, 0.02],
      vessie: [0.0, -0.055, 0.05],
      rate: [0.12, 0.03, -0.02],
      thyroide: [0.065, 0.03, 0.02],
      surrenales: [-0.14, 0.015, -0.01],
    };
    return new THREE.Vector3(...(map[id] || [0, 0.03, 0]));
  }

  _initHalo() {
    const mat = (opacity) =>
      new THREE.MeshBasicMaterial({
        color: 0x67e8f9,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        depthTest: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
    this.halo = new THREE.Group();
    this.haloRing = new THREE.Mesh(new THREE.RingGeometry(0.955, 1, 80), mat(0.9));
    this.haloRing2 = new THREE.Mesh(new THREE.RingGeometry(1.16, 1.175, 80), mat(0.32));
    this.halo.add(this.haloRing, this.haloRing2);
    this.halo.visible = false;
    this.halo.renderOrder = 40;
    this.scene.add(this.halo);
  }

  _initEvents() {
    const el = this.renderer.domElement;

    el.addEventListener("pointerdown", (e) => {
      this.pointerDown = { x: e.clientX, y: e.clientY };
      this.tween = null;
    });

    el.addEventListener("pointerup", (e) => {
      if (!this.pointerDown) return;
      const dx = e.clientX - this.pointerDown.x;
      const dy = e.clientY - this.pointerDown.y;
      this.pointerDown = null;
      if (Math.hypot(dx, dy) > 6) return;
      const id = this._pick(e.clientX, e.clientY);
      this.onSelect(id, e);
    });

    el.addEventListener("pointermove", (e) => {
      this.lastPointer.x = e.clientX;
      this.lastPointer.y = e.clientY;
      if (this.hoverRaf) return;
      this.hoverRaf = requestAnimationFrame(() => {
        this.hoverRaf = null;
        const id = this._pick(this.lastPointer.x, this.lastPointer.y);
        if (id !== this.hoverId) {
          this.hoverId = id;
          el.style.cursor = id ? "pointer" : "grab";
          this.onHover(id ? this.entries[id] : null, this.lastPointer.x, this.lastPointer.y);
        } else if (id) {
          this.onHover(this.entries[id], this.lastPointer.x, this.lastPointer.y);
        }
      });
    });

    el.addEventListener("pointerleave", () => {
      this.hoverId = null;
      this.onHover(null, 0, 0);
    });
  }

  _pick(clientX, clientY) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster = this.raycaster || new THREE.Raycaster();
    this.raycaster.setFromCamera({ x: nx, y: ny }, this.camera);
    const roots = this.pickRoots.filter((r) => r.visible);
    const hits = this.raycaster.intersectObjects(roots, true);
    for (const hit of hits) {
      let o = hit.object;
      while (o) {
        if (o.userData && o.userData.pickId) return o.userData.pickId;
        o = o.parent;
      }
    }
    return null;
  }

  /* ───────────────────────────── layers ───────────────────────────── */

  setLayer(name, value) {
    if (name === "labels") {
      this.setLabels(value);
      return;
    }
    this.layers[name] = value;
    this._applyLayers();
  }

  _applyLayers() {
    this.anatomy.skinGroup.visible = this.layers.skin && !this.isolatedId;
    this.anatomy.musclesGroup.visible = this.layers.muscles;
    this.anatomy.skeletonGroup.visible = this.layers.bones;
    this.anatomy.organsGroup.visible = this.layers.organs;

    if (this.layers.muscles) this.skinOpacityTarget = 0.32;
    else if (this.layers.bones) this.skinOpacityTarget = 0.62;
    else this.skinOpacityTarget = 1;

    if (this.disease && this.severity > 0.02) {
      this.skinOpacityTarget = this.layers.muscles ? 0.1 : 0.15;
    }

    this._updateLabelVisibility();
  }

  setLabels(value) {
    this.labelsOn = value;
    this._updateLabelVisibility();
  }

  _updateLabelVisibility() {
    for (const entry of Object.values(this.entries)) {
      if (!entry.label) continue;
      const isolated = this.isolatedId ? entry.id === this.isolatedId : true;
      entry.label.visible = this.labelsOn && this.layers.organs && isolated;
    }
  }

  setSystemFilter(system) {
    this.systemFilter = system;
    this._updateEmphasis();
  }

  /* ───────────────────────────── selection ───────────────────────────── */

  setSelected(id) {
    this.selectedId = id;
    this._updateEmphasis();
    if (!id) {
      this.halo.visible = false;
      return;
    }
    this._positionHalo();
  }

  _positionHalo() {
    const entry = this.entries[this.selectedId];
    if (!entry) {
      this.halo.visible = false;
      return;
    }
    const box = new THREE.Box3().setFromObject(entry.group);
    if (box.isEmpty()) return;
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const radius = Math.max(size.x, size.y, size.z) * 0.52 + 0.018;
    this.halo.position.copy(center);
    this.halo.scale.setScalar(radius);
    this.halo.visible = true;
  }

  focusEntry(id, mult = 1) {
    const entry = this.entries[id];
    if (!entry) return;
    const box = new THREE.Box3().setFromObject(entry.group);
    const center = box.isEmpty()
      ? entry.group.getWorldPosition(new THREE.Vector3())
      : box.getCenter(new THREE.Vector3());
    const sphere = box.isEmpty() ? new THREE.Sphere(center, 0.1) : box.getBoundingSphere(new THREE.Sphere());
    const dir = this.camera.position.clone().sub(this.controls.target).normalize();
    if (dir.lengthSq() < 0.1) dir.set(0.2, 0.1, 1).normalize();
    const dist = clamp(sphere.radius * 4.6, 0.92, 2.1) * mult;
    this._tweenTo(center.clone().add(dir.multiplyScalar(dist)), center, 0.9);
  }

  focusEntries(ids, mult = 1) {
    const box = new THREE.Box3();
    for (const id of ids) {
      const entry = this.entries[id];
      if (entry) box.expandByObject(entry.group);
    }
    if (box.isEmpty()) return;
    const center = box.getCenter(new THREE.Vector3());
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const dir = this.camera.position.clone().sub(this.controls.target).normalize();
    if (dir.lengthSq() < 0.1) dir.set(0.2, 0.1, 1).normalize();
    const dist = clamp(sphere.radius * 3.4, 1.0, 2.35) * mult;
    this._tweenTo(center.clone().add(dir.multiplyScalar(dist)), center, 0.95);
  }

  _initExplode() {
    const bodyCenter = new THREE.Vector3(0, 1.02, 0);
    let i = 0;
    for (const entry of Object.values(this.entries)) {
      if (entry.kind !== "organ") continue;
      const box = new THREE.Box3().setFromObject(entry.group);
      const center = box.isEmpty()
        ? entry.group.getWorldPosition(new THREE.Vector3())
        : box.getCenter(new THREE.Vector3());
      const dir = center.clone().sub(bodyCenter);
      dir.y *= 0.45;
      if (Math.hypot(dir.x, dir.z) < 0.02) {
        const a = (i / 3) * Math.PI * 2 + 0.4;
        dir.x = Math.cos(a) * 0.14;
        dir.z = Math.sin(a) * 0.14;
      }
      dir.normalize();
      this.explodeData.push({
        entry,
        base: entry.group.position.clone(),
        dir,
        dist: 0.5 + (i % 3) * 0.035,
      });
      i++;
    }
  }

  setExplode(on) {
    this.explodeTarget = on ? 1 : 0;
    if (on) this.isolateEntry(null);
  }

  isolateEntry(id) {
    this.isolatedId = id || null;
    if (!id) {
      for (const entry of Object.values(this.entries)) entry.group.visible = true;
      for (const ov of this.overlays) ov.visible = true;
      this._applyLayers();
      this._updateEmphasis();
      return;
    }
    for (const entry of Object.values(this.entries)) entry.group.visible = entry.id === id;
    for (const ov of this.overlays) ov.visible = ov.userData.entryId === id;
    this.anatomy.skinGroup.visible = false;
    this._updateLabelVisibility();
  }

  frameAll(margin = 1.18) {
    const box = new THREE.Box3();
    for (const entry of Object.values(this.entries)) {
      if (entry.group.visible) box.expandByObject(entry.group);
    }
    if (box.isEmpty()) return;
    const center = box.getCenter(new THREE.Vector3());
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const dir = this.camera.position.clone().sub(this.controls.target).normalize();
    if (dir.lengthSq() < 0.1) dir.set(0.2, 0.1, 1).normalize();
    const dist = clamp(sphere.radius * 2.45 * margin, 1.7, 7);
    this._tweenTo(center.clone().add(dir.multiplyScalar(dist)), center, 0.95);
  }

  _applyExplode() {
    for (const d of this.explodeData) {
      d.entry.group.position.copy(d.base).addScaledVector(d.dir, this.explode * d.dist);
    }
  }

  setView(name) {
    const v = VIEWS[name] || VIEWS.full;
    this._tweenTo(new THREE.Vector3(...v.pos), new THREE.Vector3(...v.target), 0.85);
  }

  _tweenTo(pos, target, duration = 0.8) {
    this.tween = {
      fromPos: this.camera.position.clone(),
      toPos: pos.clone(),
      fromTarget: this.controls.target.clone(),
      toTarget: target.clone(),
      t: 0,
      duration,
    };
  }

  setAutoRotate(value) {
    this.controls.autoRotate = value;
  }

  /* ───────────────────────────── vitals ───────────────────────────── */

  _setVitals(base) {
    this.vitals = { ...base };
  }

  _computeVitals() {
    if (!this.disease || this.severity <= 0.01) {
      this.vitals = { ...NORMAL_VITALS };
      return;
    }
    const t = clamp(this.severity, 0, 1);
    const target = this.disease.vitals;
    const lerp = (a, b) => Math.round((a + (b - a) * t) * 10) / 10;
    this.vitals = {
      hr: Math.round(lerp(NORMAL_VITALS.hr, target.hr)),
      spo2: Math.round(lerp(NORMAL_VITALS.spo2, target.spo2)),
      rr: Math.round(lerp(NORMAL_VITALS.rr, target.rr)),
      sbp: Math.round(lerp(NORMAL_VITALS.sbp, target.sbp)),
      dbp: Math.round(lerp(NORMAL_VITALS.dbp, target.dbp)),
      temp: Math.round(lerp(NORMAL_VITALS.temp, target.temp) * 10) / 10,
    };
  }

  getVitals() {
    return this.vitals;
  }

  /* ───────────────────────────── pathology ───────────────────────────── */

  showDisease(disease, severity = 0.65) {
    this.disease = disease;
    this.severity = clamp(severity, 0, 1);
    this._applyPathology();
  }

  setSeverity(severity) {
    this.severity = clamp(severity, 0, 1);
    this._applyPathology();
  }

  clearDisease() {
    this.disease = null;
    this.severity = 0;
    this._resetPathology();
    this._applyLayers();
    this._updateEmphasis();
    this._computeVitals();
    this._positionHalo();
  }

  _resetPathology() {
    for (const entry of Object.values(this.entries)) {
      this._restoreEntry(entry);
    }
    for (const ov of this.overlays) {
      ov.parent && ov.parent.remove(ov);
      ov.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
          else o.material.dispose();
        }
      });
    }
    this.overlays = [];
    this.animated = [];
    this.glowMats = [];
    this.morphs.clear();
    for (const a of this.auras) {
      a.parent && a.parent.remove(a.mesh);
      a.mesh.material && a.mesh.material.dispose();
    }
    this.auras = [];
    this.auraEntries.clear();
    this.tremor = 0;
    this.skinMaterial.uniforms.uTint.value.set("#67e8f9");
    this.skinMaterial.uniforms.uBase.value.set("#8ec5e6");
    this.skinMaterial.uniforms.uRim.value.set("#67e8f9");
    if (this.body) {
      this.body.position.x = 0;
      this.body.rotation.z = 0;
    }
  }

  _restoreEntry(entry) {
    for (const mesh of entry.meshes) {
      const base = entry.meshBase.get(mesh);
      if (base) {
        mesh.scale.copy(base.scale);
        mesh.position.copy(base.position);
        mesh.rotation.copy(base.rotation);
      }
      const m = mesh.material;
      if (!m || !m.userData.__orig) continue;
      const o = m.userData.__orig;
      if (m.color) m.color.copy(o.color);
      if (m.emissive) m.emissive.copy(o.emissive);
      if (m.emissiveIntensity !== undefined) m.emissiveIntensity = o.emissiveIntensity;
      m.opacity = o.opacity;
      m.transparent = o.transparent;
      m.depthWrite = o.depthWrite;
      if (m.roughness !== undefined) m.roughness = o.roughness;
      m.needsUpdate = true;
    }
    if (entry.vertebrae) {
      for (const v of entry.vertebrae) {
        v.mesh.position.copy(v.base);
        v.mesh.rotation.z = 0;
        v.spinous.position.copy(v.spinousBase);
      }
    }
    if (entry.group) entry.group.scale.set(1, 1, 1);
    entry.morph = 1;
    if (entry.labelEl) entry.labelEl.classList.remove("dim");
  }

  _applyPathology() {
    this._resetPathology();
    if (!this.disease || this.severity <= 0.005) {
      this._computeVitals();
      this._applyLayers();
      this._updateEmphasis();
      this._positionHalo();
      return;
    }

    const sev = this.severity;
    const affected = new Set();
    this.affected = affected;
    const auraPicks = new Map();

    for (const effect of this.disease.effects) {
      const entry = this.entries[effect.target];
      if (!entry) continue;
      affected.add(effect.target);
      const amount = clamp(effect.amount * sev, 0, 1);
      this._applyEffect(entry, effect, amount);
      const colors = EFFECT_COLORS[effect.type] || EFFECT_COLORS.inflammation;
      const score = amount * (colors[2] || 0.2);
      const prev = auraPicks.get(entry.id);
      if (!prev || score > prev.score) {
        auraPicks.set(entry.id, { entry, color: colors[1], amount, score });
      }
    }

    for (const pick of auraPicks.values()) {
      this._addAura(pick.entry, pick.color, pick.amount);
    }

    if (this.disease.global) {
      if (this.disease.global.skin) {
        const tint = new THREE.Color(this.disease.global.skin);
        this.skinMaterial.uniforms.uTint.value.copy(tint);
        this.skinMaterial.uniforms.uBase.value.copy(new THREE.Color("#8ec5e6").lerp(tint, 0.55));
        this.skinMaterial.uniforms.uRim.value.copy(tint);
      }
      if (this.disease.global.tremor) this.tremor = this.disease.global.tremor * sev;
    }

    this._computeVitals();
    this._applyLayers();
    this._updateEmphasis();
    this._positionHalo();
  }

  _applyEffect(entry, effect, amount) {
    if (amount <= 0.001) return;
    const colors = EFFECT_COLORS[effect.type] || EFFECT_COLORS.inflammation;
    const [color, emissive, strength] = colors;
    this._tint(entry, color, emissive, strength * 0.55 + amount * 0.45);
    this._glow(entry, emissive, strength * (0.45 + amount * 0.8));

    const morph = MORPH[effect.type] ?? 1;
    if (morph !== 1) {
      const factor = 1 + (morph - 1) * amount;
      const existing = this.morphs.get(entry.id) || 1;
      const combined = entry.kind === "organ" ? existing * factor : Math.min(existing, factor);
      this.morphs.set(entry.id, combined);
      entry.morph = combined;
      this._applyMorph(entry, combined);
    }

    if (effect.type === "scoliosis") {
      this._bendSpine(entry, amount);
    }

    this._addOverlay(entry, effect.type, amount, hash(entry.id + effect.type));

    if (entry.kind === "organ" && (entry.id === "coeur" || entry.id === "poumons")) {
      this._positionHalo();
    }
  }

  _addAura(entry, color, amount) {
    if (this.auraEntries.has(entry.id)) return;
    this.auraEntries.add(entry.id);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.18 + amount * 0.16,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
      depthTest: true,
    });
    const seen = new Set();
    for (const mesh of entry.meshes) {
      if (!mesh.geometry || seen.has(mesh)) continue;
      seen.add(mesh);
      const shell = new THREE.Mesh(mesh.geometry, mat);
      shell.scale.setScalar(1.1);
      shell.renderOrder = 8;
      shell.frustumCulled = false;
      mesh.add(shell);
      this.auras.push({ parent: mesh, mesh: shell });
      this.animated.push({ obj: shell, base: 1.1, phase: Math.random() * TAU, speed: 1.7, amp: 0.02 });
    }
  }

  _applyMorph(entry, factor) {
    if (entry.kind === "organ") {
      entry.group.scale.setScalar(factor);
    } else if (entry.kind === "muscle") {
      for (const mesh of entry.meshes) {
        const base = entry.meshBase.get(mesh);
        if (base) mesh.scale.copy(base.scale).multiplyScalar(factor);
      }
    }
    // bones are rigid: their geometry lives in world space, so only color changes apply
  }

  _tint(entry, color, emissive, strength) {
    const c = new THREE.Color(color);
    const ec = new THREE.Color(emissive);
    const seen = new Set();
    for (const mesh of entry.meshes) {
      const m = mesh.material;
      if (!m || !m.color || seen.has(m)) continue;
      seen.add(m);
      m.color.lerp(c, 0.62);
      if (m.emissive) m.emissive.lerp(ec, 0.7);
      m.roughness = Math.min(1, (m.roughness ?? 0.5) + 0.15);
    }
    entry.__lastColor = c;
    entry.__lastEmissive = ec;
  }

  _glow(entry, emissive, intensity) {
    const seen = new Set();
    for (const mesh of entry.meshes) {
      const m = mesh.material;
      if (!m || seen.has(m) || !m.emissive) continue;
      seen.add(m);
      const target = Math.min(1.1, intensity + 0.1);
      m.emissiveIntensity = Math.max(m.emissiveIntensity || 0, target);
      this.glowMats.push({ mat: m, base: m.emissiveIntensity, phase: Math.random() * TAU });
    }
  }

  _bendSpine(entry, amount) {
    if (!entry.vertebrae) return;
    for (const v of entry.vertebrae) {
      const offset = Math.sin(v.t * Math.PI) * 0.075 * amount;
      v.mesh.position.x = offset;
      v.mesh.rotation.z = -Math.cos(v.t * Math.PI) * 0.25 * amount;
      v.spinous.position.x = offset;
      v.spinous.rotation.z = v.mesh.rotation.z;
    }
  }

  _addOverlay(entry, type, amount, seed) {
    const box = new THREE.Box3().setFromObject(entry.group);
    if (box.isEmpty()) return;
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 0.02);
    const rng = seeded(seed);
    const group = new THREE.Group();
    group.position.copy(center);
    group.userData.entryId = entry.id;
    this.overlayRoot.add(group);
    this.overlays.push(group);

    const addMesh = (geo, material, pos) => {
      const mesh = new THREE.Mesh(geo, material);
      mesh.position.copy(pos);
      group.add(mesh);
      return mesh;
    };

    switch (type) {
      case "obstruction": {
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0xb43a3a,
          emissive: 0xff3b30,
          emissiveIntensity: 0.5,
          roughness: 0.55,
          transparent: true,
          opacity: 0.9,
        });
        const count = 3;
        for (let i = 0; i < count; i++) {
          const r = maxDim * (0.14 + rng() * 0.1) * (0.7 + amount * 0.6);
          const ring = new THREE.Mesh(new THREE.TorusGeometry(r, r * 0.16, 6, 20), ringMat);
          ring.position.set((rng() - 0.5) * size.x * 0.5, (rng() - 0.5) * size.y * 0.75, (rng() - 0.5) * size.z * 0.5);
          ring.rotation.set(Math.PI / 2 + (rng() - 0.5) * 0.4, (rng() - 0.5) * 0.4, 0);
          group.add(ring);
          this.animated.push({ obj: ring, base: ring.scale.x, phase: rng() * TAU, speed: 2.2, amp: 0.07 });
        }
        const plugMat = new THREE.MeshStandardMaterial({
          color: 0xf0c46a,
          emissive: 0x8a5a12,
          emissiveIntensity: 0.15,
          roughness: 0.4,
        });
        for (let i = 0; i < 5; i++) {
          const r = maxDim * (0.03 + rng() * 0.03);
          const plug = addMesh(
            new THREE.IcosahedronGeometry(r, 1),
            plugMat,
            new THREE.Vector3((rng() - 0.5) * size.x * 0.7, (rng() - 0.5) * size.y * 0.7, (rng() - 0.5) * size.z * 0.7),
          );
          plug.scale.set(1, 1, 1);
        }
        break;
      }
      case "plaque": {
        const mat = new THREE.MeshStandardMaterial({
          color: 0xe0bf74,
          emissive: 0x7a5a1e,
          emissiveIntensity: 0.1,
          roughness: 0.35,
          metalness: 0.15,
        });
        const count = 7;
        for (let i = 0; i < count; i++) {
          const dir = new THREE.Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).normalize();
          const pos = new THREE.Vector3(dir.x * size.x * 0.44, dir.y * size.y * 0.44, dir.z * size.z * 0.44);
          const mesh = addMesh(new THREE.SphereGeometry(maxDim * (0.018 + rng() * 0.014), 8, 6), mat, pos);
          mesh.scale.z = 0.45;
          mesh.lookAt(center);
        }
        break;
      }
      case "tumor": {
        const mat = new THREE.MeshStandardMaterial({
          color: 0xa855c8,
          emissive: 0x7e22ce,
          emissiveIntensity: 0.35,
          roughness: 0.55,
          transparent: true,
          opacity: 0.95,
        });
        for (let i = 0; i < 3; i++) {
          const r = maxDim * (0.11 + rng() * 0.05) * (0.6 + amount * 0.65);
          const lump = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), mat);
          lump.position.set(
            (rng() - 0.5) * size.x * 0.3,
            (rng() - 0.5) * size.y * 0.35,
            (rng() - 0.5) * size.z * 0.3 + 0.01,
          );
          group.add(lump);
          this.animated.push({ obj: lump, base: 1, phase: rng() * TAU, speed: 1.4, amp: 0.04 });
        }
        break;
      }
      case "stone": {
        const mat = new THREE.MeshStandardMaterial({
          color: 0xe9c968,
          emissive: 0xb8860b,
          emissiveIntensity: 0.35,
          roughness: 0.35,
          metalness: 0.1,
        });
        for (let i = 0; i < 4; i++) {
          const r = maxDim * (0.035 + rng() * 0.045) * (0.7 + amount * 0.5);
          const stone = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), mat);
          stone.position.set(
            (rng() - 0.5) * size.x * 0.45,
            (rng() - 0.5) * size.y * 0.45,
            (rng() - 0.5) * size.z * 0.45,
          );
          stone.rotation.set(rng() * 3, rng() * 3, rng() * 3);
          group.add(stone);
        }
        break;
      }
      case "inflammation": {
        if (entry.kind !== "organ") break;
        const mat = new THREE.MeshBasicMaterial({
          color: 0xff3b30,
          transparent: true,
          opacity: 0.08 + amount * 0.14,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        for (let i = 0; i < 7; i++) {
          const r = Math.min(maxDim * (0.16 + rng() * 0.18) * (0.75 + amount * 0.5), 0.085);
          const blob = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 9), mat);
          blob.position.set(
            (rng() - 0.5) * size.x * 0.55,
            (rng() - 0.5) * size.y * 0.55,
            (rng() - 0.5) * size.z * 0.55,
          );
          group.add(blob);
          this.animated.push({ obj: blob, base: 1, phase: rng() * TAU, speed: 1.8, amp: 0.06, pulse: true });
        }
        break;
      }
      case "edema": {
        const mat = new THREE.MeshBasicMaterial({
          color: 0x7ec8f0,
          transparent: true,
          opacity: 0.1 + amount * 0.1,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        for (let i = 0; i < 8; i++) {
          const r = maxDim * (0.05 + rng() * 0.07);
          const drop = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), mat);
          drop.position.set(
            (rng() - 0.5) * size.x * 0.62,
            (rng() - 0.5) * size.y * 0.62,
            (rng() - 0.5) * size.z * 0.62,
          );
          drop.scale.set(1.3, 0.85, 1.1);
          group.add(drop);
          this.animated.push({ obj: drop, base: 1, phase: rng() * TAU, speed: 1.5, amp: 0.08 });
        }
        break;
      }
      case "fibrosis": {
        const mat = new THREE.MeshStandardMaterial({
          color: 0xdad5c6,
          emissive: 0x514c40,
          emissiveIntensity: 0.08,
          roughness: 0.95,
          transparent: true,
          opacity: 0.88,
        });
        for (let i = 0; i < 12; i++) {
          const dir = new THREE.Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).normalize();
          const pos = new THREE.Vector3(dir.x * size.x * 0.44, dir.y * size.y * 0.44, dir.z * size.z * 0.44);
          const r = maxDim * (0.026 + rng() * 0.03) * (0.7 + amount * 0.5);
          const patch = addMesh(new THREE.SphereGeometry(r, 8, 6), mat, pos);
          patch.scale.set(1.35, 1.35, 0.34);
          patch.lookAt(center);
        }
        break;
      }
      case "atrophy": {
        const mat = new THREE.MeshStandardMaterial({
          color: 0x402a2e,
          emissive: 0x1b090c,
          emissiveIntensity: 0.1,
          roughness: 0.9,
          transparent: true,
          opacity: 0.78,
        });
        for (let i = 0; i < 7; i++) {
          const dir = new THREE.Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).normalize();
          const pos = new THREE.Vector3(dir.x * size.x * 0.4, dir.y * size.y * 0.4, dir.z * size.z * 0.4);
          const r = maxDim * (0.03 + rng() * 0.035);
          const patch = addMesh(new THREE.SphereGeometry(r, 8, 6), mat, pos);
          patch.scale.set(1.2, 1.2, 0.3);
          patch.lookAt(center);
        }
        break;
      }
      case "hypertrophy": {
        const mat = new THREE.MeshBasicMaterial({
          color: 0xff4d5e,
          transparent: true,
          opacity: 0.06 + amount * 0.09,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const shell = new THREE.Mesh(new THREE.SphereGeometry(maxDim * (0.5 + amount * 0.1), 20, 14), mat);
        group.add(shell);
        this.animated.push({ obj: shell, base: 1, phase: rng() * TAU, speed: 2.6, amp: 0.045, pulse: true });
        break;
      }
      case "destruction": {
        const mat = new THREE.MeshStandardMaterial({
          color: 0x1a0c10,
          emissive: 0x090104,
          emissiveIntensity: 0.08,
          roughness: 0.95,
          transparent: true,
          opacity: 0.72,
        });
        for (let i = 0; i < 10; i++) {
          const dir = new THREE.Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).normalize();
          const pos = new THREE.Vector3(dir.x * size.x * 0.4, dir.y * size.y * 0.4, dir.z * size.z * 0.4);
          const r = maxDim * (0.025 + rng() * 0.04);
          const hole = addMesh(new THREE.SphereGeometry(r, 8, 6), mat, pos);
          hole.scale.set(1, 1, 0.35);
          hole.lookAt(center);
        }
        const dustMat = new THREE.PointsMaterial({
          color: 0x8b6b6b,
          size: maxDim * 0.03,
          transparent: true,
          opacity: 0.5,
          depthWrite: false,
        });
        const positions = [];
        for (let i = 0; i < 24; i++) {
          positions.push(
            (rng() - 0.5) * size.x * 0.7,
            (rng() - 0.5) * size.y * 0.7,
            (rng() - 0.5) * size.z * 0.7,
          );
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        const pts = new THREE.Points(geo, dustMat);
        group.add(pts);
        this.animated.push({ obj: pts, base: 1, phase: rng() * TAU, speed: 0.6, amp: 0, rotate: 0.15 });
        break;
      }
      case "necrosis":
      case "consolidation":
      case "demyelination": {
        const color = type === "necrosis" ? 0x2b0d13 : type === "consolidation" ? 0xf1ded0 : 0xf2ecdb;
        const mat = new THREE.MeshStandardMaterial({
          color,
          emissive: type === "necrosis" ? 0x120104 : 0x6b6150,
          emissiveIntensity: 0.12,
          roughness: 0.75,
          transparent: true,
          opacity: 0.92,
        });
        const count = type === "necrosis" ? 6 : 6;
        for (let i = 0; i < count; i++) {
          const dir = new THREE.Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).normalize();
          const pos = new THREE.Vector3(dir.x * size.x * 0.4, dir.y * size.y * 0.4, dir.z * size.z * 0.4);
          const r = maxDim * (0.035 + rng() * 0.03);
          const patch = addMesh(new THREE.SphereGeometry(r, 10, 8), mat, pos);
          patch.scale.set(1, 1, 0.35);
          patch.lookAt(center);
        }
        break;
      }
      case "hemorrhage": {
        const mat = new THREE.PointsMaterial({
          color: 0xff2d2d,
          size: maxDim * 0.055,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const positions = [];
        for (let i = 0; i < 46; i++) {
          positions.push(
            (rng() - 0.5) * size.x * 0.8,
            (rng() - 0.5) * size.y * 0.8,
            (rng() - 0.5) * size.z * 0.8,
          );
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        const pts = new THREE.Points(geo, mat);
        group.add(pts);
        this.animated.push({ obj: pts, base: 1, phase: 0, speed: 0.7, amp: 0, rotate: 0.25 });
        const glowMat = new THREE.MeshBasicMaterial({
          color: 0xff2d2d,
          transparent: true,
          opacity: 0.12 + amount * 0.12,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        addMesh(new THREE.SphereGeometry(maxDim * 0.34, 16, 12), glowMat, new THREE.Vector3());
        break;
      }
      case "hyperactivity": {
        const mat = new THREE.PointsMaterial({
          color: 0xffd75e,
          size: maxDim * 0.06,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const positions = [];
        for (let i = 0; i < 60; i++) {
          const dir = new THREE.Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).normalize().multiplyScalar(rng());
          positions.push(dir.x * size.x * 0.55, dir.y * size.y * 0.55, dir.z * size.z * 0.55);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        const pts = new THREE.Points(geo, mat);
        group.add(pts);
        this.animated.push({ obj: pts, base: 1, phase: 0, speed: 1.2, amp: 0, rotate: 0.4, pulse: true });
        break;
      }
      case "fracture": {
        const mat = new THREE.MeshStandardMaterial({
          color: 0x280b0b,
          emissive: 0x6b1212,
          emissiveIntensity: 0.25,
          roughness: 0.8,
        });
        const pts = [];
        const dir = rng() > 0.5 ? 1 : -1;
        for (let i = 0; i <= 5; i++) {
          const t = i / 5;
          pts.push(
            new THREE.Vector3(
              (t - 0.5) * size.x * 0.9,
              (rng() - 0.5) * size.y * 0.22,
              (rng() - 0.5) * size.z * 0.3 + dir * size.z * 0.18,
            ),
          );
        }
        const curve = new THREE.CatmullRomCurve3(pts);
        const crack = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, maxDim * 0.012, 5, false), mat);
        group.add(crack);
        const boneMat = new THREE.MeshStandardMaterial({
          color: 0xf1e6c8,
          emissive: 0xff5a5a,
          emissiveIntensity: 0.12,
          roughness: 0.5,
        });
        for (let i = 0; i < 4; i++) {
          const shard = new THREE.Mesh(new THREE.TetrahedronGeometry(maxDim * 0.02, 0), boneMat);
          shard.position.set((rng() - 0.5) * size.x * 0.5, (rng() - 0.5) * size.y * 0.5, (rng() - 0.5) * size.z * 0.5);
          group.add(shard);
        }
        break;
      }
      case "wear": {
        const mat = new THREE.MeshBasicMaterial({
          color: 0xff7a3c,
          transparent: true,
          opacity: 0.16 + amount * 0.14,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const r = maxDim * (0.07 + amount * 0.035);
        if (entry.kind !== "bone") {
          for (let i = 0; i < 2; i++) {
            const glow = addMesh(
              new THREE.SphereGeometry(r, 16, 12),
              mat,
              new THREE.Vector3(
                (rng() - 0.5) * size.x * 0.3,
                (rng() - 0.5) * size.y * 0.3,
                (rng() - 0.5) * size.z * 0.3,
              ),
            );
            glow.scale.y = 0.75;
            this.animated.push({ obj: glow, base: 1, phase: rng() * TAU, speed: 2.4, amp: 0.08 });
          }
        }
        const spurMat = new THREE.MeshStandardMaterial({ color: 0xe9e0c7, roughness: 0.65 });
        for (let i = 0; i < 3; i++) {
          const spur = addMesh(new THREE.ConeGeometry(maxDim * 0.022, maxDim * 0.055, 4), spurMat, new THREE.Vector3(
            (rng() - 0.5) * size.x * 0.5,
            (rng() - 0.5) * size.y * 0.45,
            (rng() - 0.5) * size.z * 0.45,
          ));
          spur.rotation.set(rng() * 2, rng() * 2, rng() * 2);
        }
        break;
      }
      case "porosity": {
        const mat = new THREE.MeshStandardMaterial({
          color: 0x50452f,
          roughness: 0.9,
          transparent: true,
          opacity: 0.8,
        });
        for (let i = 0; i < 16; i++) {
          const dir = new THREE.Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).normalize();
          const pos = new THREE.Vector3(dir.x * size.x * 0.42, dir.y * size.y * 0.42, dir.z * size.z * 0.42);
          const hole = addMesh(new THREE.SphereGeometry(maxDim * (0.009 + rng() * 0.012), 6, 5), mat, pos);
          hole.scale.set(1, 1, 0.4);
          hole.lookAt(center);
        }
        break;
      }
      default:
        break;
    }
  }

  _updateEmphasis() {
    const diseaseActive = this.disease && this.severity > 0.02;
    const affected = this.affected || new Set();
    for (const entry of Object.values(this.entries)) {
      let dim = false;
      if (this.systemFilter !== "all" && entry.system !== this.systemFilter) dim = true;
      if (diseaseActive && !affected.has(entry.id)) dim = true;
      if (entry.id === this.selectedId) dim = false;
      this._dimEntry(entry, dim);
      if (entry.labelEl) entry.labelEl.classList.toggle("dim", dim);
    }
  }

  _dimEntry(entry, dim) {
    const seen = new Set();
    for (const mesh of entry.meshes) {
      const m = mesh.material;
      if (!m || seen.has(m) || !m.userData.__orig) continue;
      seen.add(m);
      const o = m.userData.__orig;
      if (dim) {
        m.transparent = true;
        m.opacity = Math.min(o.opacity, entry.kind === "organ" ? 0.16 : 0.1);
        m.depthWrite = false;
      } else {
        m.opacity = o.opacity;
        m.transparent = o.transparent;
        m.depthWrite = o.depthWrite;
      }
    }
    for (const ov of this.overlays) {
      // overlays follow their affected entry only implicitly; hide if empty not needed
    }
  }

  /* ───────────────────────────── feedback ───────────────────────────── */

  flashEntry(id, ok = true) {
    const entry = this.entries[id];
    if (!entry) return;
    const box = new THREE.Box3().setFromObject(entry.group);
    if (box.isEmpty()) return;
    const center = box.getCenter(new THREE.Vector3());
    const radius = Math.max(...box.getSize(new THREE.Vector3()).toArray()) * 0.7 + 0.05;
    const mat = new THREE.MeshBasicMaterial({
      color: ok ? 0x4ade80 : 0xff4d6d,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(new THREE.RingGeometry(0.92, 1, 64), mat);
    mesh.position.copy(center);
    mesh.scale.setScalar(radius);
    mesh.renderOrder = 50;
    this.scene.add(mesh);
    this.flashes.push({ mesh, life: 0, ttl: 0.9, radius });
  }

  toastFlash(id, ok) {
    this.flashEntry(id, ok);
  }

  /* ───────────────────────────── frame ───────────────────────────── */

  resize() {
    const w = this.stage.clientWidth || 1;
    const h = this.stage.clientHeight || 1;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
    this.labelRenderer.setSize(w, h);
    this.bloom.resolution.set(w, h);
  }

  _animate() {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.elapsedTime;

    if (this.tween) {
      this.tween.t += dt / this.tween.duration;
      const p = Math.min(1, this.tween.t);
      const e = 1 - Math.pow(1 - p, 3);
      this.camera.position.lerpVectors(this.tween.fromPos, this.tween.toPos, e);
      this.controls.target.lerpVectors(this.tween.fromTarget, this.tween.toTarget, e);
      if (p >= 1) this.tween = null;
    }

    this.controls.update();

    /* exploded view */
    if (Math.abs(this.explode - this.explodeTarget) > 0.0004) {
      this.explode += (this.explodeTarget - this.explode) * Math.min(1, dt * 4.2);
      if (Math.abs(this.explode - this.explodeTarget) < 0.0004) this.explode = this.explodeTarget;
      this._applyExplode();
      if (this.selectedId) this._positionHalo();
    }

    /* skin opacity transition */
    this.skinOpacity += (this.skinOpacityTarget - this.skinOpacity) * Math.min(1, dt * 5);
    this.skinMaterial.uniforms.uOpacity.value = this.skinOpacity;
    this.skinMaterial.uniforms.uTime.value = t;

    /* heartbeat */
    if (this.heart) {
      const hr = this.vitals.hr || 72;
      const morph = this.morphs.get("coeur") || 1;
      const phase = (t * hr) / 60;
      const beat = Math.pow(Math.max(0, Math.sin(phase * TAU)), 9);
      const scale = morph * (1 + beat * 0.055);
      this.heart.group.scale.setScalar(scale);
    }

    /* breathing */
    if (this.lungs) {
      const rr = this.vitals.rr || 14;
      const morph = this.morphs.get("poumons") || 1;
      let stiffness = 0;
      if (this.disease && this.severity > 0) {
        for (const e of this.disease.effects) {
          if (e.target === "poumons" && (e.type === "fibrosis" || e.type === "destruction")) {
            stiffness += e.amount * this.severity;
          }
        }
      }
      stiffness = Math.min(0.9, stiffness);
      const breath = Math.sin((t * rr * TAU) / 60);
      const amp = 0.026 * (1 - stiffness * 0.75);
      this.lungs.group.scale.set(
        morph * (1 + breath * amp * 0.45),
        morph * (1 + breath * amp),
        morph * (1 + breath * amp * 0.6),
      );
    }

    /* tremor */
    if (this.tremor > 0.001) {
      this.tremorPhase += dt;
      const phase = this.tremorPhase;
      this.body.position.x = Math.sin(phase * 34) * 0.0016 * this.tremor;
      this.body.rotation.z = Math.sin(phase * 27 + 1) * 0.0012 * this.tremor;
    }

    /* animated overlays */
    for (const a of this.animated) {
      if (!a.obj || !a.obj.parent) continue;
      if (a.rotate) a.obj.rotation.y += dt * a.rotate;
      if (a.amp) {
        const s = a.base * (1 + Math.sin(t * a.speed + a.phase) * a.amp);
        a.obj.scale.setScalar(s);
      }
      if (a.pulse && a.obj.material) {
        a.obj.material.opacity = 0.55 + Math.sin(t * 4 + a.phase) * 0.35;
      }
    }

    /* effect glow pulse */
    for (const g of this.glowMats) {
      if (!g.mat) continue;
      g.mat.emissiveIntensity = g.base * (0.9 + Math.sin(t * 2.4 + g.phase) * 0.22);
    }

    /* halo */
    if (this.halo.visible) {
      this.halo.quaternion.copy(this.camera.quaternion);
      const s = 1 + Math.sin(t * 2.2) * 0.025;
      this.haloRing.scale.setScalar(s);
      this.haloRing2.scale.setScalar(1 + Math.sin(t * 2.2 + 1) * 0.04);
    }

    /* flashes */
    for (let i = this.flashes.length - 1; i >= 0; i--) {
      const f = this.flashes[i];
      f.life += dt;
      const p = f.life / f.ttl;
      f.mesh.scale.setScalar(f.radius * (1 + p * 1.1));
      f.mesh.material.opacity = (1 - p) * 0.9;
      f.mesh.quaternion.copy(this.camera.quaternion);
      if (p >= 1) {
        this.scene.remove(f.mesh);
        f.mesh.geometry.dispose();
        f.mesh.material.dispose();
        this.flashes.splice(i, 1);
      }
    }

    this.composer.render();
    this.labelRenderer.render(this.scene, this.camera);

    if (this.onFrame) this.onFrame(dt);
  }
}
