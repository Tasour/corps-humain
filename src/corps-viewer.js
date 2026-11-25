/* Corps humain — champions figés, sélection par raycast, popup et contour turquoise. */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const LAYERS = ['skin', 'muscles', 'skeleton', 'organs', 'vessels', 'nerves', 'cosmetic'];
const REFERENCE_LAYERS = ['pregnancy'];
const ALL_LAYERS = [...LAYERS, ...REFERENCE_LAYERS];
const FEMALE_OVERRIDES = { G_FJ2811: 'skin' };
const THIN_LAYERS = new Set(['nerves', 'vessels', 'cosmetic']);
const RENDER_ORDER = { pregnancy: 0, organs: 1, skeleton: 2, vessels: 3,
  nerves: 4, muscles: 5, skin: 6, cosmetic: 7 };
const MAP = {
  skeletal: 'skeleton', joints: 'skeleton', ligaments: 'skeleton', skeleton: 'skeleton',
  muscular: 'muscles', muscles: 'muscles', 'donor-muscle': 'muscles', connective: 'muscles',
  integumentary: 'skin', skin: 'skin',
  arterial: 'vessels', venous: 'vessels', cardiovascular: 'vessels',
  arteries: 'vessels', veins: 'vessels', vessels: 'vessels',
  nervous: 'nerves', nerves: 'nerves',
  cardiac: 'organs', respiratory: 'organs', digestive: 'organs', urinary: 'organs',
  sensory: 'organs', endocrine: 'organs', lymphatic: 'organs', reproductive: 'organs',
  pregnancy: 'pregnancy', visceral: 'organs', heart: 'organs', organs: 'organs',
  brain: 'organs', borrowed: 'organs', renal: 'organs',
};
const MALE = {
  id: 'seema',
  label: '3D Human Body Anatomy',
  license: 'CC BY-SA 4.0',
  kind: 'glbset', dir: './docs/models/forks/seema/models/',
  files: { skin: ['skin.glb'], muscles: ['muscles.glb'], skeleton: ['skeleton.glb'],
    organs: ['organs.glb'], vessels: ['arteries.glb', 'veins.glb'], nerves: ['nerves.glb'] },
};
const FEMALE = {
  id: 'bodyatlas',
  label: 'Body Atlas 3D — femme',
  license: 'CC BY 4.0',
  note: '2 534 pièces, peau Visible Human Female, apports masculins recalés et documentés.',
  kind: 'chunk', dir: './docs/models/body-atlas/', manifest: 'atlas-female.json',
};

/* Compléments issus de la référence masculine : jamais fusionnés avec le HRA,
 * chaque pièce reste sélectionnable et étiquetée comme adaptation. */
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const FACIAL_TOKENS = ['frontalis', 'orbicularisoculi', 'orbicularisoris', 'masseter',
  'temporalis', 'zygomaticus', 'risorius', 'levatorlabii', 'depressorlabii',
  'depressoranguli', 'mentalis', 'corrugator', 'procerus', 'nasalis'];
const TRUNK_TOKENS = ['latissimusdorsi', 'rectusabdominis', 'quadratuslumborum',
  'internaloblique', 'transversusabdominis'];
const HAIR_TOKENS = ['hairsofhead', 'hairsofeyebrow', 'eyebrow'];
const matches = (name, tokens) => {
  const n = norm(name);
  return tokens.some((t) => n.includes(t));
};

export function initCorpsViewer() {
  const host = document.getElementById('cp-view');
  if (!host) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x161a20);
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 20);
  camera.position.set(0, 1.45, 4);
  camera.lookAt(0, 0.85, 0);
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  host.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x444455, 1.9));
  for (const [x, z, i] of [[2, 3, 2.0], [-2, -1, 0.8]]) {
    const l = new THREE.DirectionalLight(0xffffff, i);
    l.position.set(x, -2, z); scene.add(l);
  }
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.85, 0);
  controls.enableDamping = !reduced;
  controls.dampingFactor = 0.08;
  controls.enablePan = true;
  controls.screenSpacePanning = true;
  controls.minZoom = 0.5;
  controls.maxZoom = 4;
  controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.PAN };
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

  const loader = new GLTFLoader();
  const draco = new DRACOLoader();
  draco.setDecoderPath('./draco/');
  loader.setDRACOLoader(draco);

  const boxes = [...document.querySelectorAll('#cp-couches input[data-layer]')];
  const master = document.getElementById('cp-couche-all');
  const mats = new Map();
  const extraMats = new Map();
  const colors = { skin: '#bc9c7e', muscles: '#a9584c', skeleton: '#e4dcc0',
    organs: '#bb9068', vessels: '#c24b3f', nerves: '#d9b45f',
    cosmetic: '#2b211c', hair: '#2b211c' };
  for (const [k, c] of Object.entries(colors)) {
    mats.set(k, new THREE.MeshStandardMaterial({ color: new THREE.Color(c), roughness: 0.62 }));
  }
  // Variation déterministe et subtile de la peau, sans texture réseau.
  mats.get('skin').onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <color_fragment>',
      '#include <color_fragment>\n diffuseColor.rgb *= 0.975 + 0.025 * sin(gl_FragCoord.x * 0.07 + gl_FragCoord.y * 0.11);');
  };
  let xray = true;
  const xrayButton = document.getElementById('cp-preset-xray');
  const setXray = (on) => {
    xray = on;
    xrayButton.setAttribute('aria-pressed', String(on));
  };
  setXray(true);
  const matFor = (hex) => {
    if (!extraMats.has(hex)) extraMats.set(hex, new THREE.MeshStandardMaterial({
      color: new THREE.Color(hex), roughness: 0.62 }));
    return extraMats.get(hex);
  };
  const organColor = (name) => {
    const n = name.toLowerCase();
    if (/heart|cardiac/.test(n)) return '#b23b3b';
    if (/lung|pulmon|bronch/.test(n)) return '#d99aa6';
    if (/liver|hepat/.test(n)) return '#8b4a3a';
    if (/kidney|renal|urinar|bladder/.test(n)) return '#a05a6a';
    if (/intestin|stomach|digest|esophag|colon|rectum/.test(n)) return '#c99a63';
    if (/uter|vagin|ovar|reproduct|clitor|fallop|breast|mammar/.test(n)) return '#b98aa0';
    return '#bb8f68';
  };
  let need = true, token = 0, ctrl = null;
  let pivotBody = 'both';
  let activeSex = 'male';
  const pivotIndicator = document.getElementById('pivot-indicator');
  const PIVOT_LABELS = { both: 'Pivot : ensemble', male: 'Pivot : homme',
    female: 'Pivot : femme', item: 'Pivot : structure' };
  const updatePivotIndicator = () => {
    if (pivotIndicator) pivotIndicator.textContent = PIVOT_LABELS[pivotBody] || PIVOT_LABELS.both;
  };
  const bodyFromObject = (object) => {
    let cur = object;
    while (cur) {
      if (cur === maleModel) return 'male';
      if (cur === femaleModel || cur === supplements) return 'female';
      cur = cur.parent;
    }
    return null;
  };
  const bodyCenter = (which) => {
    const target = which === 'male' ? maleModel : which === 'female' ? femaleModel : null;
    if (!target) return null;
    return new THREE.Box3().setFromObject(target).getCenter(new THREE.Vector3());
  };
  const setPivotBody = (which) => {
    const center = bodyCenter(which);
    if (!center) return;
    const offset = camera.position.clone().sub(controls.target);
    controls.target.copy(center);
    camera.position.copy(center).add(offset);
    pivotBody = which;
    updatePivotIndicator();
    controls.update(); need = true;
  };
  const sexButton = document.getElementById('sex-toggle');
  const setActiveSex = (which) => {
    activeSex = which === 'female' ? 'female' : 'male';
    if (maleModel) maleModel.visible = activeSex === 'male';
    if (femaleModel) femaleModel.visible = activeSex === 'female';
    if (supplements) supplements.visible = activeSex === 'female';
    if (sexButton) {
      sexButton.textContent = activeSex === 'male' ? '♂' : '♀';
      sexButton.setAttribute('aria-label', activeSex === 'male'
        ? 'Sexe actif : homme. Cliquer pour afficher la femme'
        : 'Sexe actif : femme. Cliquer pour afficher l’homme');
      sexButton.setAttribute('aria-pressed', String(activeSex === 'female'));
      sexButton.title = activeSex === 'male' ? 'Afficher la femme' : 'Afficher l’homme';
    }
    clearSelection();
    writeUrl();
    apply();
    fitView();
  };
  updatePivotIndicator();
  let descriptions = { seema: {}, bodyatlas: {} };
  let descAlias = { seema: {}, bodyatlas: {} };
  const alpha = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '').replace(/\d+$/, '');
  const buildAlias = () => {
    for (const source of Object.keys(descriptions)) {
      descAlias[source] = {};
      for (const [key, value] of Object.entries(descriptions[source])) {
        descAlias[source][alpha(key)] = value;
      }
    }
  };

  // Sols fixed.
  const ground = new THREE.Group();
  const groundSquare = (color, label) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color; ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.lineWidth = 10; ctx.strokeRect(5, 5, 246, 246);
    if (label) {
      ctx.fillStyle = '#0d1116'; ctx.font = 'bold 56px system-ui, sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(label, 128, 128);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.8),
      new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }));
    mesh.rotation.x = -Math.PI / 2; mesh.position.y = 0.001;
    return mesh;
  };
  const maleSquare = groundSquare('#2f6fb3', ''); maleSquare.position.x = -0.45;
  const femaleSquare = groundSquare('#d16b9c', ''); femaleSquare.position.x = 0.45;
  ground.add(maleSquare, femaleSquare); scene.add(ground);

  const bodies = new THREE.Group(); scene.add(bodies);
  let maleModel = null, femaleModel = null, supplements = null, femaleManifest = null;
  const allBodies = () => [maleModel, femaleModel, supplements].filter(Boolean);
  const activeBodies = () => {
    if (!maleModel || !femaleModel) return allBodies();
    return activeSex === 'male' ? [maleModel] : [femaleModel, supplements].filter(Boolean);
  };

  // Sélection et contour.
  const outlineGroup = new THREE.Group(); scene.add(outlineGroup);
  const popup = document.getElementById('selection-popup');
  const popupName = document.getElementById('selection-name');
  const popupDesc = document.getElementById('selection-description');
  const popupSource = document.getElementById('selection-source');
  let selection = null;

  function clearOutline() {
    while (outlineGroup.children.length) {
      const o = outlineGroup.children.pop();
      if (!o.userData.sharedGeometry) o.geometry.dispose();
      o.material.dispose();
    }
  }
  function clearSelection() {
    selection = null;
    clearOutline();
    popup.hidden = true;
    if (window.__corps) window.__corps.selection = null;
    need = true;
  }
  function outlineFor(mesh) {
    const edges = new THREE.EdgesGeometry(mesh.geometry, 25);
    const edgeCount = edges.getAttribute('position').count;
    const thin = THIN_LAYERS.has(mesh.userData.layer) || matches(mesh.name, HAIR_TOKENS);
    if (edgeCount <= 6000 && !thin) {
      return new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
        color: 0x40f0e0, transparent: true, opacity: reduced ? 0.9 : 0.6,
        blending: THREE.AdditiveBlending, depthTest: true,
      }));
    }
    // Maillages fins ou denses : liseré Fresnel sur la surface elle-même,
    // sans hull inversé qui se recouvre sur les mèches et les vaisseaux.
    edges.dispose();
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0x40f0e0) },
        uOpacity: { value: reduced ? 0.9 : 0.6 },
      },
      vertexShader: `
        varying vec3 vNormalW;
        varying vec3 vViewW;
        void main() {
          vec4 world = modelMatrix * vec4(position, 1.0);
          vNormalW = normalize(mat3(modelMatrix) * normal);
          vViewW = normalize(cameraPosition - world.xyz);
          gl_Position = projectionMatrix * viewMatrix * world;
        }`,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying vec3 vNormalW;
        varying vec3 vViewW;
        void main() {
          float rim = pow(1.0 - abs(dot(normalize(vNormalW), normalize(vViewW))), 2.0);
          float alpha = rim * uOpacity;
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(uColor, alpha);
        }`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const overlay = new THREE.Mesh(mesh.geometry, material);
    overlay.userData.sharedGeometry = true;
    overlay.userData.outlineKind = 'fresnel';
    return overlay;
  }
  function select(mesh, clientX, clientY) {
    clearOutline();
    scene.updateMatrixWorld(true);
    const outline = outlineFor(mesh);
    outline.matrixAutoUpdate = false;
    outline.matrix.copy(mesh.matrixWorld);
    outline.matrixWorldNeedsUpdate = true;
    outlineGroup.add(outline);
    const entry = mesh.userData.selectionEntry || {};
    popupName.textContent = entry.name || mesh.userData.selectionLabel || 'Structure';
    popupDesc.textContent = entry.description || 'Structure anatomique référencée dans la source.';
    popupSource.textContent = [entry.source, entry.license, entry.origin].filter(Boolean).join(' · ');
    const section = host.parentElement.getBoundingClientRect();
    const x = Math.min(clientX - section.left + 12, section.width - 300);
    const y = Math.min(clientY - section.top + 12, section.height - 180);
    popup.style.left = Math.max(12, x) + 'px';
    popup.style.top = Math.max(12, y) + 'px';
    popup.hidden = false;
    selection = { mesh, id: mesh.userData.selectionId, source: mesh.userData.selectionSource };
    if (window.__corps) window.__corps.selection = selection;
    need = true;
  }

  controls.addEventListener('change', () => { need = true; });
  new IntersectionObserver((e) => { if (e[0].isIntersecting) need = true; }, { threshold: 0.01 }).observe(host);

  const sync = () => {
    const n = boxes.filter((b) => LAYERS.includes(b.dataset.layer) && b.checked).length;
    master.checked = n === LAYERS.length;
    master.indeterminate = n > 0 && n < LAYERS.length;
  };
  const readUrl = () => {
    const q = new URLSearchParams(location.search);
    const s = q.get('sex');
    if (s === 'f' || s === 'female') activeSex = 'female';
    const l = q.get('layers');
    if (!l) return;
    const want = new Set(l === 'all' ? ALL_LAYERS : l.split(','));
    for (const b of boxes) b.checked = want.has(b.dataset.layer);
    sync();
  };
  const writeUrl = () => {
    const u = new URL(location.href);
    u.searchParams.set('sex', activeSex === 'male' ? 'm' : 'f');
    const active = boxes.filter((b) => b.checked).map((b) => b.dataset.layer);
    if (active.length === LAYERS.length) u.searchParams.delete('layers');
    else u.searchParams.set('layers', active.join(','));
    history.replaceState(null, '', u);
  };
  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    const a = w / h, s = a < 0.85 ? 1.05 : 1.12;
    camera.left = -s * a; camera.right = s * a; camera.top = s; camera.bottom = -s;
    camera.updateProjectionMatrix();
  };
  const mark = (o, sys, source, id, forceLayer) => {
    o.userData.layer = forceLayer || FEMALE_OVERRIDES[id] || MAP[sys] || sys || 'organs';
    o.renderOrder = RENDER_ORDER[o.userData.layer] ?? 0;
    o.userData.selectionSource = source;
    o.userData.selectionId = id || o.name;
    o.userData.selectionLabel = id || o.name;
    const rawId = id || o.name;
    const entry = descriptions[source]?.[rawId] || descAlias[source]?.[alpha(rawId)];
    if (entry) o.userData.selectionEntry = entry;
    return o;
  };
  const bodyBox = () => {
    const b = new THREE.Box3();
    for (const m of activeBodies()) b.union(new THREE.Box3().setFromObject(m));
    return b;
  };
  const apply = () => {
    const active = new Set(boxes.filter((b) => b.checked).map((b) => b.dataset.layer));
    let n = 0;
    for (const m of activeBodies()) m.traverse((o) => {
      if (!o.isMesh) return;
      o.visible = active.has(o.userData.layer);
      if (o.visible) n++;
    });
    if (maleModel) maleModel.visible = activeSex === 'male';
    if (femaleModel) femaleModel.visible = activeSex === 'female';
    if (supplements) supplements.visible = activeSex === 'female';
    const skin = mats.get('skin'); skin.transparent = xray; skin.opacity = xray ? 0.16 : 1; skin.depthWrite = !xray;
    const muscle = mats.get('muscles'); muscle.transparent = xray; muscle.opacity = xray ? 0.6 : 1; muscle.depthWrite = !xray;
    if (window.__corps) window.__corps.activeLayers = [...active];
    document.getElementById('corps-info').textContent = `${n} maillage(s) visible(s)`;
    need = true;
  };
  const fitView = () => {
    const b = bodyBox();
    if (b.isEmpty()) return;
    const c = b.getCenter(new THREE.Vector3());
    const box = b.clone().union(new THREE.Box3().setFromObject(ground));
    const s = box.getSize(new THREE.Vector3());
    controls.target.copy(c);
    camera.position.set(c.x, c.y + 0.6, 4);
    pivotBody = activeSex; updatePivotIndicator();
    const a = (host.clientWidth || 1) / (host.clientHeight || 1);
    const span = a < 0.85 ? 1.05 : 1.12;
    const zoom = Math.min((2 * span * a) / Math.max(s.x, 0.1), (2 * span) / Math.max(s.y, 0.1)) * 0.85;
    camera.zoom = Math.max(0.5, Math.min(4, zoom));
    camera.updateProjectionMatrix(); controls.update(); need = true;
  };
  const resetView = () => {
    const b = bodyBox();
    const c = b.isEmpty() ? new THREE.Vector3(0, 0.85, 0) : b.getCenter(new THREE.Vector3());
    camera.position.set(c.x, c.y + 0.6, 4); controls.target.copy(c);
    pivotBody = activeSex; updatePivotIndicator();
    camera.zoom = 1; camera.updateProjectionMatrix(); controls.update(); need = true;
  };
  const focusPoint = (p) => {
    const off = camera.position.clone().sub(controls.target);
    controls.target.copy(p); camera.position.copy(p).add(off);
    pivotBody = 'item'; updatePivotIndicator();
    controls.update(); need = true;
  };
  const zoomBy = (f) => { camera.zoom = Math.max(0.5, Math.min(4, camera.zoom * f)); camera.updateProjectionMatrix(); need = true; };
  const orbitBy = (t, p) => {
    const off = camera.position.clone().sub(controls.target);
    const sph = new THREE.Spherical().setFromVector3(off);
    sph.theta += t; sph.phi = Math.max(0.15, Math.min(Math.PI - 0.15, sph.phi + p));
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(sph));
    controls.update(); need = true;
  };
  const panBy = (dx, dy) => {
    const right = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 0).multiplyScalar(dx);
    const up = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 1).multiplyScalar(dy);
    const d = right.add(up); controls.target.add(d); camera.position.add(d); controls.update(); need = true;
  };
  const presetView = (n) => {
    const presets = [[0, Math.PI / 2], [Math.PI, Math.PI / 2], [Math.PI / 2, Math.PI / 2],
      [-Math.PI / 2, Math.PI / 2], [0, 0.2], [0, Math.PI - 0.2]];
    const p = presets[n - 1]; if (!p) return;
    const off = camera.position.clone().sub(controls.target);
    const sph = new THREE.Spherical().setFromVector3(off);
    sph.theta = p[0]; sph.phi = p[1];
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(sph));
    controls.update(); need = true;
  };

  async function chunkFetch(chunk) {
    const use = !!chunk.gzip && typeof DecompressionStream !== 'undefined';
    const r = await fetch(use ? chunk.gzip : chunk.url);
    if (!r.ok) throw new Error('chunk absent');
    let buf = await r.arrayBuffer();
    const h = new Uint8Array(buf, 0, 2);
    if (use && h[0] === 0x1f && h[1] === 0x8b) {
      buf = await new Response(new Blob([buf]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
    }
    return buf;
  }
  async function buildGlbSet(cfg) {
    draco.setDecoderPath('./draco/');
    const g = new THREE.Group();
    for (const [layer, files] of Object.entries(cfg.files)) {
      for (const f of files) {
        const gltf = await loader.loadAsync(cfg.dir + f);
        const doomed = [];
        gltf.scene.traverse((o) => {
          if (!o.isMesh) return;
          if (/modesty[ _]?cover/i.test(o.name)) { doomed.push(o); return; }
          o.userData.file = f;
          const cosmetic = matches(o.name, HAIR_TOKENS);
          o.material = mats.get(cosmetic ? 'hair' : layer);
          mark(o, layer, cfg.id, o.name, cosmetic ? 'cosmetic' : undefined);
        });
        for (const o of doomed) o.parent.remove(o);
        g.add(gltf.scene);
      }
    }
    return g;
  }
  async function buildChunk(cfg) {
    const at = await (await fetch(cfg.dir + cfg.manifest)).json();
    femaleManifest = at;
    const g = new THREE.Group();
    const by = at.chunks.map(() => []);
    const nameCounts = new Map();
    for (const p of at.parts) {
      const key = norm(p.name);
      nameCounts.set(key, (nameCounts.get(key) || 0) + 1);
      by[p.chunk].push(p);
    }
    let next = 0;
    const worker = async () => {
      while (next < at.chunks.length) {
        const ci = next++; const buf = await chunkFetch(at.chunks[ci]);
        for (const p of by[ci]) {
          const geo = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(buf, p.positions, p.vertexCount * 3), 3));
          geo.setAttribute('normal', new THREE.BufferAttribute(new Int16Array(buf, p.normals, p.vertexCount * 3), 3, true));
          geo.setIndex(new THREE.BufferAttribute(new Uint32Array(buf, p.indices, p.indexCount), 1));
          geo.computeBoundingSphere();
          const layer = FEMALE_OVERRIDES[p.id] || MAP[p.system] || 'organs';
          const m = new THREE.Mesh(geo, mats.get(layer));
          m.name = p.name; mark(m, p.system, cfg.id, p.id, layer);
          const duplicate = nameCounts.get(norm(p.name)) > 1;
          const cx = (p.bounds[0][0] + p.bounds[1][0]) / 2;
          const side = Math.abs(cx) < 0.005 ? 'médian' : cx > 0 ? 'gauche' : 'droite';
          const label = duplicate ? `${p.name} — ${side}` : p.name;
          m.userData.selectionLabel = label;
          const entry = descriptions[cfg.id]?.[p.id];
          if (entry) m.userData.selectionEntry = duplicate ? { ...entry, name: label } : entry;
          m.matrixAutoUpdate = false;
          g.add(m);
        }
      }
    };
    await Promise.all([worker(), worker(), worker()]);
    return g;
  }

  const normName = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const centerOf = (bounds) => new THREE.Vector3(
    (bounds[0][0] + bounds[1][0]) / 2,
    (bounds[0][1] + bounds[1][1]) / 2,
    (bounds[0][2] + bounds[1][2]) / 2);
  const femaleCenter = (key) => {
    const part = femaleManifest?.parts.find((p) => p.id === key ||
      normName(p.name) === normName(key));
    return part ? centerOf(part.bounds) : null;
  };
  const maleCenter = (pattern, side, exact) => {
    let found = null;
    maleModel.updateMatrixWorld(true);
    const wanted = normName(exact || pattern + (side || ''));
    maleModel.traverse((o) => {
      if (found || !o.isMesh) return;
      const n = normName(o.name);
      const ok = exact ? n === wanted : n.includes(normName(pattern)) && (!side || n.endsWith(normName(side)));
      if (!ok) return;
      found = new THREE.Box3().setFromObject(o).getCenter(new THREE.Vector3()).sub(maleModel.position);
    });
    return found;
  };
  const buildLandmarks = () => {
    const pairs = [];
    const add = (male, female) => {
      if (male && female) pairs.push([male, female]);
    };
    add(maleCenter('sclera', 'r001'), femaleCenter('VH_F_sclera_R'));
    add(maleCenter('sclera', 'l001'), femaleCenter('VH_F_sclera_L'));
    add(maleCenter('mandible'), femaleCenter('G_FJ3289'));
    add(maleCenter('frontalbone'), femaleCenter('G_FJ3200'));
    add(maleCenter('bodyofsternum'), femaleCenter('G_FJ3178'));
    add(maleCenter('humerus', 'r001'), femaleCenter('G_FJ3368'));
    add(maleCenter('humerus', 'l001'), femaleCenter('G_FJ3262'));
    add(maleCenter('radius', 'r001'), femaleCenter('G_FJ3349'));
    add(maleCenter('radius', 'l001'), femaleCenter('G_FJ3277'));
    add(maleCenter(null, null, 'femurr001'), femaleCenter('VH_F_femur_R'));
    add(maleCenter(null, null, 'femurl001'), femaleCenter('VH_F_femur_L'));
    add(maleCenter(null, null, 'tibiar001'), femaleCenter('VH_F_tibia_R'));
    add(maleCenter(null, null, 'tibial001'), femaleCenter('VH_F_tibia_L'));
    add(maleCenter('sacrum'), femaleCenter('VH_F_sacrum'));
    return pairs;
  };
  const makeWarp = (pairs) => (p) => {
    if (!pairs.length) return p.clone();
    let sx = 0, sy = 0, sz = 0, sw = 0;
    for (const [male, female] of pairs) {
      const d2 = p.distanceToSquared(male);
      const w = 1 / (d2 * d2 + 1e-5);
      sx += (female.x - male.x) * w;
      sy += (female.y - male.y) * w;
      sz += (female.z - male.z) * w;
      sw += w;
    }
    return new THREE.Vector3(p.x + sx / sw, p.y + sy / sw, p.z + sz / sw);
  };
  const solveLinear = (matrix, rhs) => {
    const n = rhs.length;
    const a = matrix.map((row, i) => [...row, rhs[i]]);
    for (let i = 0; i < n; i++) {
      let pivot = i;
      for (let r = i + 1; r < n; r++) {
        if (Math.abs(a[r][i]) > Math.abs(a[pivot][i])) pivot = r;
      }
      [a[i], a[pivot]] = [a[pivot], a[i]];
      const d = a[i][i];
      if (!Number.isFinite(d) || Math.abs(d) < 1e-14) return null;
      for (let k = i; k <= n; k++) a[i][k] /= d;
      for (let r = 0; r < n; r++) {
        if (r === i) continue;
        const f = a[r][i];
        for (let k = i; k <= n; k++) a[r][k] -= f * a[i][k];
      }
    }
    return a.map((row) => row[n]);
  };
  const fitAffine = (pairs) => {
    if (pairs.length < 4) return null;
    const ata = Array.from({ length: 12 }, () => Array(12).fill(0));
    const atb = Array(12).fill(0);
    for (const [from, to] of pairs) {
      const v = [from.x, from.y, from.z, 1];
      const t = [to.x, to.y, to.z];
      for (let c = 0; c < 3; c++) {
        for (let j = 0; j < 4; j++) {
          atb[c * 4 + j] += v[j] * t[c];
          for (let k = 0; k < 4; k++) ata[c * 4 + j][c * 4 + k] += v[j] * v[k];
        }
      }
    }
    const m = solveLinear(ata, atb);
    if (!m || m.some((v) => !Number.isFinite(v))) return null;
    const apply = (p) => new THREE.Vector3(
      m[0] * p.x + m[1] * p.y + m[2] * p.z + m[3],
      m[4] * p.x + m[5] * p.y + m[6] * p.z + m[7],
      m[8] * p.x + m[9] * p.y + m[10] * p.z + m[11]);
    const det = m[0] * (m[5] * m[10] - m[6] * m[9])
      - m[1] * (m[4] * m[10] - m[6] * m[8])
      + m[2] * (m[4] * m[9] - m[5] * m[8]);
    if (!Number.isFinite(det) || Math.abs(det) < 1e-8) return null;
    let maxResidualMm = 0;
    for (const [from, to] of pairs) {
      maxResidualMm = Math.max(maxResidualMm, apply(from).distanceTo(to) * 1000);
    }
    return { apply, maxResidualMm, det };
  };
  const fitTps = (pairs) => {
    const n = pairs.length;
    if (n < 4) return null;
    const size = n + 4;
    const m = Array.from({ length: size }, () => Array(size).fill(0));
    for (let i = 0; i < n; i++) {
      const pi = pairs[i][0];
      const hom = [1, pi.x, pi.y, pi.z];
      for (let j = 0; j < n; j++) {
        const pj = pairs[j][0];
        const r = Math.hypot(pi.x - pj.x, pi.y - pj.y, pi.z - pj.z);
        m[i][j] = i === j ? 1e-8 : r;
      }
      for (let k = 0; k < 4; k++) {
        m[i][n + k] = hom[k];
        m[n + k][i] = hom[k];
      }
    }
    const solutions = [0, 1, 2].map((c) => {
      const rhs = Array(size).fill(0);
      for (let i = 0; i < n; i++) rhs[i] = pairs[i][1].getComponent(c);
      return solveLinear(m, rhs);
    });
    if (solutions.some((s) => !s || s.some((v) => !Number.isFinite(v)))) return null;
    const apply = (p) => {
      const out = [0, 0, 0];
      for (let c = 0; c < 3; c++) {
        const s = solutions[c];
        let v = s[n] + s[n + 1] * p.x + s[n + 2] * p.y + s[n + 3] * p.z;
        for (let i = 0; i < n; i++) {
          const pi = pairs[i][0];
          v += s[i] * Math.hypot(p.x - pi.x, p.y - pi.y, p.z - pi.z);
        }
        out[c] = v;
      }
      return new THREE.Vector3(out[0], out[1], out[2]);
    };
    let maxResidualMm = 0;
    for (const [from, to] of pairs) maxResidualMm = Math.max(maxResidualMm, apply(from).distanceTo(to) * 1000);
    return { apply, maxResidualMm };
  };
  const extremePoints = (geometry) => {
    const pos = geometry.getAttribute('position');
    const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
    const minIdx = [0, 0, 0], maxIdx = [0, 0, 0];
    for (let i = 0; i < pos.count; i++) {
      for (let a = 0; a < 3; a++) {
        const v = pos.getComponent(i, a);
        if (v < mn[a]) { mn[a] = v; minIdx[a] = i; }
        if (v > mx[a]) { mx[a] = v; maxIdx[a] = i; }
      }
    }
    const at = (i) => new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
    return [at(minIdx[0]), at(maxIdx[0]), at(minIdx[1]), at(maxIdx[1]), at(minIdx[2]), at(maxIdx[2])];
  };
  const femalePartPoints = (partId) => {
    let mesh = null;
    femaleModel?.traverse((o) => {
      if (!mesh && o.isMesh && o.userData.selectionId === partId) mesh = o;
    });
    if (!mesh) return null;
    const pos = mesh.geometry.getAttribute('position');
    const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < pos.count; i++) {
      for (let a = 0; a < 3; a++) {
        const v = pos.getComponent(i, a);
        mn[a] = Math.min(mn[a], v); mx[a] = Math.max(mx[a], v);
      }
    }
    const nearest = (target, axis) => {
      let best = 0, bd = Infinity;
      for (let i = 0; i < pos.count; i++) {
        const d = Math.abs(pos.getComponent(i, axis) - target);
        if (d < bd) { bd = d; best = i; }
      }
      return new THREE.Vector3(pos.getX(best), pos.getY(best), pos.getZ(best));
    };
    return [nearest(mn[0], 0), nearest(mx[0], 0),
      nearest(mn[1], 1), nearest(mx[1], 1),
      nearest(mn[2], 2), nearest(mx[2], 2)];
  };
  const HEAD_PAIRS = [
    ['sclera', 'r001', null, 'VH_F_sclera_R'],
    ['sclera', 'l001', null, 'VH_F_sclera_L'],
    ['mandible', null, null, 'G_FJ3289'],
    ['frontalbone', null, null, 'G_FJ3200'],
    [null, null, 'maxillar001', 'G_FJ3375'],
    [null, null, 'maxillal001', 'G_FJ3269'],
    [null, null, 'zygomaticboner001', 'G_FJ3392'],
    [null, null, 'zygomaticbonel001', 'G_FJ3287'],
    [null, null, 'temporalboner001', 'G_FJ3386'],
    [null, null, 'temporalbonel001', 'G_FJ3281'],
    ['occipitalbone', null, null, 'G_FJ3309'],
    [null, null, 'nasalboner001', 'G_FJ3378'],
    [null, null, 'nasalbonel001', 'G_FJ3272'],
  ];
  const headAffine = () => {
    const pairs = [];
    for (const [pattern, side, exact, femaleId] of HEAD_PAIRS) {
      const male = maleCenter(pattern, side, exact);
      const female = femaleCenter(femaleId);
      if (male && female) pairs.push([male, female]);
    }
    const tps = fitTps(pairs);
    const affine = fitAffine(pairs);
    return tps && tps.maxResidualMm <= 0.1 ? tps : affine;
  };
  const headPartFor = (name) => {
    const n = norm(name);
    const left = n.endsWith('l001');
    if (/frontalis|corrugator|procerus/.test(n)) return 'G_FJ3200';
    if (/orbicularisoculi/.test(n)) return left ? 'VH_F_sclera_L' : 'VH_F_sclera_R';
    if (/orbicularisoris|risorius|levatorlabii|depressorlabii|depressoranguli|mentalis|zygomaticus/.test(n)) {
      return left ? 'G_FJ3269' : 'G_FJ3375';
    }
    if (/masseter|temporalis/.test(n)) return left ? 'G_FJ3281' : 'G_FJ3386';
    return 'G_FJ3200';
  };
  const cleanName = (name) => {
    const raw = String(name || '');
    const side = raw.match(/[._]?([rl])\d+$/i)?.[1]?.toLowerCase();
    const base = raw.replace(/[._]?[rl]?\d+$/i, '').replace(/_/g, ' ').trim();
    return side ? `${base} — ${side === 'l' ? 'gauche' : 'droite'}` : base;
  };
  const supplementEntry = (name, kind) => ({
    name: cleanName(name),
    description: `${cleanName(name)} — ${kind} de la référence masculine (Z-Anatomy), recalé sur la morphologie féminine. Ce n'est pas une donnée issue de la femme scanée.`,
    source: 'Z-Anatomy via 3D Human Body Anatomy (SeemaBansal1)',
    license: 'CC BY-SA 4.0',
    origin: 'référence masculine adaptée',
  });

  async function buildSupplements() {
    const bodyWarp = makeWarp(buildLandmarks());
    const head = headAffine();
    const facialReport = [];
    const g = new THREE.Group();
    const nervesFile = MALE.files.nerves[0];
    const musclesFile = MALE.files.muscles[0];
    let added = 0;
    maleModel.traverse((o) => {
      if (!o.isMesh || !o.userData.file) return;
      let layer = null, kind = null;
      if (matches(o.name, HAIR_TOKENS)) { layer = 'cosmetic'; kind = 'cheveux ou sourcils'; }
      else if (o.userData.file === musclesFile && matches(o.name, FACIAL_TOKENS)) { layer = 'muscles'; kind = 'muscle facial'; }
      else if (o.userData.file === musclesFile && matches(o.name, TRUNK_TOKENS)) { layer = 'muscles'; kind = 'muscle du tronc'; }
      else if (o.userData.file === nervesFile) { layer = 'nerves'; kind = 'nerf périphérique'; }
      if (!layer) return;
      let deform = bodyWarp;
      if (layer === 'cosmetic' && head) deform = head.apply;
      if (kind === 'muscle facial') {
        const partId = headPartFor(o.name);
        const target = femalePartPoints(partId);
        const source = extremePoints(o.geometry);
        const local = target && fitAffine(source.map((p, i) => [p, target[i]]));
        if (local && local.maxResidualMm <= 0.1) {
          deform = local.apply;
          facialReport.push({ id: o.name, part: partId, residualMm: +local.maxResidualMm.toFixed(4) });
        } else if (head) {
          deform = head.apply;
          facialReport.push({ id: o.name, part: partId, method: 'tps',
            residualMm: +(head?.maxResidualMm ?? local?.maxResidualMm ?? Infinity).toFixed(6) });
        }
      }
      const geo = o.geometry.clone();
      const pos = geo.getAttribute('position');
      for (let i = 0; i < pos.count; i++) {
        const q = deform(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
        pos.setXYZ(i, q.x, q.y, q.z);
      }
      if (!pos.array.every(Number.isFinite)) return;
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      geo.computeBoundingSphere();
      const m = new THREE.Mesh(geo, mats.get(layer === 'cosmetic' ? 'hair' : layer));
      m.name = o.name;
      mark(m, layer, MALE.id, o.name, layer);
      m.userData.selectionLabel = cleanName(o.name);
      m.userData.selectionEntry = supplementEntry(o.name, kind);
      g.add(m);
      added++;
    });
    g.userData.count = added;
    g.userData.facialAlignment = facialReport;
    return g;
  }

  async function load() {
    const myToken = ++token;
    if (ctrl) ctrl.abort();
    ctrl = new AbortController();
    bodies.clear();
    maleModel = null; femaleModel = null; supplements = null; femaleManifest = null;
    const male = await buildGlbSet(MALE);
    if (myToken !== token) return;
    const female = await buildChunk(FEMALE);
    if (myToken !== token) return;
    maleModel = male; femaleModel = female;
    maleModel.position.x = -0.45; femaleModel.position.x = 0.45;
    bodies.add(maleModel, femaleModel);
    supplements = await buildSupplements();
    supplements.position.x = 0.45;
    bodies.add(supplements);
    document.querySelector('.source-label').textContent = 'Champions ♂/♀';
    document.getElementById('source-sexe-note').textContent =
      `Homme : ${MALE.label} (${MALE.license}) · Femme : ${FEMALE.label} (${FEMALE.license}) — ${FEMALE.note}. ` +
      `Compléments : muscles faciaux, muscles du tronc, cheveux et réseau nerveux périphérique issus de la ` +
      `référence masculine Z-Anatomy, recalés sur la femme et étiquetés comme adaptations. ` +
      `Le clic sélectionne le premier maillage touché par le rayon ; en mode Rayon X, il peut traverser la peau translucide.`;
    window.__corps = {
      maleModel, femaleModel, supplements, source: MALE.id, female: FEMALE.id,
      THREE, camera, controls, renderer, controller: ctrl, outlineGroup, fitView, resetView, focusPoint,
      bodyBox, zoomBy, orbitBy, panBy, presetView, select, clearSelection, setPreset, apply,
      setPivotBody, bodyCenter, bodyFromObject, setActiveSex,
      get pivotBody() { return pivotBody; }, get activeSex() { return activeSex; },
      get facialAlignment() { return supplements?.userData.facialAlignment || []; },
      loaders: { GLTFLoader, DRACOLoader }, get xray() { return xray; },
      debug: { fitAffine, fitTps, femalePartPoints, extremePoints, headAffine, headPartFor },
    };
    readUrl();
    setActiveSex(activeSex);
    resize();
  }

  function pick(clientX, clientY) {
    const rect = renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1);
    const ray = new THREE.Raycaster(); ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(activeBodies(), true);
    const visible = (o) => {
      let cur = o;
      while (cur) { if (!cur.visible) return false; cur = cur.parent; }
      return true;
    };
    const hit = hits.find((h) => visible(h.object));
    return hit ? hit.object : null;
  }
  const pointFromClient = (x, y) => {
    const rect = renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((x - rect.left) / rect.width) * 2 - 1,
      -((y - rect.top) / rect.height) * 2 + 1);
    const ray = new THREE.Raycaster(); ray.setFromCamera(ndc, camera);
    const visible = (o) => {
      let cur = o;
      while (cur) { if (!cur.visible) return false; cur = cur.parent; }
      return true;
    };
    const hit = ray.intersectObjects(activeBodies(), true).find((h) => visible(h.object));
    return hit ? hit.point : null;
  };
  const zoomAtPoint = (x, y, factor) => {
    const p = pointFromClient(x, y) || controls.target.clone();
    const offset = camera.position.clone().sub(controls.target);
    controls.target.copy(p);
    camera.position.copy(p).add(offset);
    camera.zoom = Math.max(0.5, Math.min(4, camera.zoom * factor));
    camera.updateProjectionMatrix();
    pivotBody = activeSex; updatePivotIndicator();
    controls.update(); need = true;
  };
  let down = null;
  let lastTap = { t: 0, x: 0, y: 0 };
  renderer.domElement.addEventListener('pointerdown', (e) => {
    down = { x: e.clientX, y: e.clientY };
  });
  renderer.domElement.addEventListener('pointerup', (e) => {
    if (!down) return;
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
    down = null;
    if (moved > 6) return;
    const now = Date.now();
    if (now - lastTap.t < 300 && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 24) {
      lastTap = { t: 0, x: 0, y: 0 };
      clearSelection();
      zoomAtPoint(e.clientX, e.clientY, 1.5);
      return;
    }
    lastTap = { t: now, x: e.clientX, y: e.clientY };
    const mesh = pick(e.clientX, e.clientY);
    if (mesh) select(mesh, e.clientX, e.clientY);
    else clearSelection();
  });
  document.getElementById('selection-close').addEventListener('click', clearSelection);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { clearSelection(); return; }
    if (['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes(document.activeElement?.tagName)) return;
    switch (e.key) {
      case 'f': case 'F': fitView(); break;
      case 'r': case 'R': resetView(); break;
      case '+': case '=': zoomBy(1.2); break;
      case '-': case '_': zoomBy(1 / 1.2); break;
      case 'ArrowLeft': panBy(-0.05, 0); break;
      case 'ArrowRight': panBy(0.05, 0); break;
      case 'ArrowUp': panBy(0, 0.05); break;
      case 'ArrowDown': panBy(0, -0.05); break;
      case 'a': case 'A': orbitBy(-0.15, 0); break;
      case 'd': case 'D': orbitBy(0.15, 0); break;
      case 'w': case 'W': orbitBy(0, -0.15); break;
      case 's': case 'S': orbitBy(0, 0.15); break;
      default:
        if (/^[1-6]$/.test(e.key)) presetView(Number(e.key));
        else return;
    }
    e.preventDefault();
  });
  if (sexButton) sexButton.addEventListener('click', () => {
    setActiveSex(activeSex === 'male' ? 'female' : 'male');
  });
  for (const b of boxes) b.addEventListener('change', () => {
    setXray(false); sync(); writeUrl(); apply();
  });
  master.addEventListener('change', () => {
    for (const b of boxes) {
      if (LAYERS.includes(b.dataset.layer)) b.checked = master.checked;
    }
    master.indeterminate = false; setXray(false); writeUrl(); apply();
  });
  const presets = {
    skin: ['skin', 'cosmetic'],
    muscles: ['muscles'],
    skeleton: ['skeleton'],
    organs: ['organs'],
    xray: ALL_LAYERS,
  };
  const setPreset = (kind) => {
    const want = new Set(presets[kind] || []);
    for (const b of boxes) b.checked = want.has(b.dataset.layer);
    setXray(kind === 'xray');
    sync(); writeUrl(); apply();
  };
  for (const [kind, id] of Object.entries({
    skin: 'cp-preset-skin', muscles: 'cp-preset-muscles',
    skeleton: 'cp-preset-skeleton', organs: 'cp-preset-organs', xray: 'cp-preset-xray',
  })) {
    document.getElementById(id).addEventListener('click', () => setPreset(kind));
  }
  window.addEventListener('resize', () => { resize(); need = true; });

  function frame() {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const changed = controls.update();
    if (selection && !reduced) {
      const op = 0.5 + 0.5 * Math.sin(performance.now() / 1200 * Math.PI * 2);
      for (const o of outlineGroup.children) {
        if (o.material.uniforms?.uOpacity) o.material.uniforms.uOpacity.value = op;
        else o.material.opacity = op;
      }
    }
    if (changed || need || selection) { resize(); renderer.render(scene, camera); need = false; }
  }
  resize(); frame();
  fetch('./docs/models/selection-descriptions.json')
    .then((r) => r.ok ? r.json() : null)
    .then((d) => { if (d?.descriptions) { descriptions = d.descriptions; buildAlias(); } })
    .catch(() => {})
    .finally(load);
}
