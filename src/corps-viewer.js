/* Corps humain — champions figés, sélection par raycast, popup et contour turquoise. */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const LAYERS = ['skin', 'muscles', 'skeleton', 'organs', 'vessels', 'nerves'];
const MAP = {
  skeletal: 'skeleton', joints: 'skeleton', ligaments: 'skeleton', skeleton: 'skeleton',
  muscular: 'muscles', muscles: 'muscles', 'donor-muscle': 'muscles', connective: 'muscles',
  integumentary: 'skin', skin: 'skin',
  arterial: 'vessels', venous: 'vessels', cardiovascular: 'vessels',
  arteries: 'vessels', veins: 'vessels', vessels: 'vessels',
  nervous: 'nerves', nerves: 'nerves',
  cardiac: 'organs', respiratory: 'organs', digestive: 'organs', urinary: 'organs',
  sensory: 'organs', endocrine: 'organs', lymphatic: 'organs', reproductive: 'organs',
  pregnancy: 'organs', visceral: 'organs', heart: 'organs', organs: 'organs',
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
  id: 'female-atlas',
  label: 'Female Atlas',
  license: 'CC BY 4.0',
  kind: 'chunk', dir: './docs/models/contests/female-atlas/', manifest: 'atlas.json',
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
    organs: '#bb9068', vessels: '#c24b3f', nerves: '#d9b45f' };
  for (const [k, c] of Object.entries(colors)) {
    mats.set(k, new THREE.MeshStandardMaterial({ color: new THREE.Color(c), roughness: 0.62 }));
  }
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
  let descriptions = { seema: {}, 'female-atlas': {} };
  let descAlias = { seema: {}, 'female-atlas': {} };
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
  let maleModel = null, femaleModel = null;
  const allBodies = () => [maleModel, femaleModel].filter(Boolean);

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
      o.geometry.dispose();
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
  function select(mesh, clientX, clientY) {
    clearOutline();
    scene.updateMatrixWorld(true);
    const edges = new THREE.EdgesGeometry(mesh.geometry, 25);
    const material = new THREE.LineBasicMaterial({
      color: 0x40f0e0, transparent: true, opacity: reduced ? 0.9 : 0.6,
      blending: THREE.AdditiveBlending, depthTest: true,
    });
    const line = new THREE.LineSegments(edges, material);
    line.matrixAutoUpdate = false;
    line.matrix.copy(mesh.matrixWorld);
    line.matrixWorldNeedsUpdate = true;
    outlineGroup.add(line);
    const entry = mesh.userData.selectionEntry || {};
    popupName.textContent = entry.name || mesh.userData.selectionLabel || 'Structure';
    popupDesc.textContent = entry.description || 'Structure anatomique référencée dans la source.';
    popupSource.textContent = `${entry.source || ''}${entry.license ? ' — ' + entry.license : ''}`;
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
    const n = boxes.filter((b) => b.checked).length;
    master.checked = n === LAYERS.length;
    master.indeterminate = n > 0 && n < LAYERS.length;
  };
  const readUrl = () => {
    const l = new URLSearchParams(location.search).get('layers');
    if (!l) return;
    const want = new Set(l === 'all' ? LAYERS : l.split(','));
    for (const b of boxes) b.checked = want.has(b.dataset.layer);
    sync();
  };
  const writeUrl = () => {
    const u = new URL(location.href);
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
  const mark = (o, sys, source, id) => {
    o.userData.layer = MAP[sys] || sys || 'organs';
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
    for (const m of allBodies()) b.union(new THREE.Box3().setFromObject(m));
    return b;
  };
  const apply = () => {
    const active = new Set(boxes.filter((b) => b.checked).map((b) => b.dataset.layer));
    const all = active.size === LAYERS.length;
    let n = 0;
    for (const m of allBodies()) m.traverse((o) => {
      if (!o.isMesh) return;
      o.visible = active.has(o.userData.layer);
      if (o.visible) n++;
    });
    const skin = mats.get('skin'); skin.transparent = all; skin.opacity = all ? 0.16 : 1; skin.depthWrite = !all;
    const muscle = mats.get('muscles'); muscle.transparent = all; muscle.opacity = all ? 0.6 : 1; muscle.depthWrite = !all;
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
    camera.zoom = 1; camera.updateProjectionMatrix(); controls.update(); need = true;
  };
  const focusPoint = (p) => {
    const off = camera.position.clone().sub(controls.target);
    controls.target.copy(p); camera.position.copy(p).add(off); controls.update(); need = true;
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
          o.material = mats.get(layer);
          mark(o, layer, cfg.id, o.name);
        });
        for (const o of doomed) o.parent.remove(o);
        g.add(gltf.scene);
      }
    }
    return g;
  }
  async function buildChunk(cfg) {
    const at = await (await fetch(cfg.dir + cfg.manifest)).json();
    const g = new THREE.Group();
    const by = at.chunks.map(() => []);
    for (const p of at.parts) by[p.chunk].push(p);
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
          const m = new THREE.Mesh(geo, mats.get(MAP[p.system] || 'organs'));
          m.name = p.name; mark(m, p.system, cfg.id, p.id);
          m.userData.selectionLabel = p.name;
          if (descriptions[cfg.id]?.[p.id]) m.userData.selectionEntry = descriptions[cfg.id][p.id];
          m.matrixAutoUpdate = false;
          g.add(m);
        }
      }
    };
    await Promise.all([worker(), worker(), worker()]);
    return g;
  }

  async function load() {
    const myToken = ++token;
    if (ctrl) ctrl.abort();
    ctrl = new AbortController();
    bodies.clear();
    maleModel = null; femaleModel = null;
    const male = await buildGlbSet(MALE);
    if (myToken !== token) return;
    const female = await buildChunk(FEMALE);
    if (myToken !== token) return;
    maleModel = male; femaleModel = female;
    maleModel.position.x = -0.45; femaleModel.position.x = 0.45;
    bodies.add(maleModel, femaleModel);
    document.querySelector('.source-label').textContent = 'Champions ♂/♀';
    document.getElementById('source-sexe-note').textContent =
      `Homme : ${MALE.label} (${MALE.license}) · Femme : ${FEMALE.label} (${FEMALE.license}). Cliquez une structure pour l'identifier.`;
    window.__corps = {
      maleModel, femaleModel, source: MALE.id, female: FEMALE.id,
      THREE, camera, controls, renderer, controller: ctrl, fitView, resetView, focusPoint,
      bodyBox, zoomBy, orbitBy, panBy, presetView, select, clearSelection,
    };
    clearSelection();
    apply(); resize(); fitView();
  }

  function pick(clientX, clientY) {
    const rect = renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1);
    const ray = new THREE.Raycaster(); ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(allBodies(), true);
    const visible = (o) => {
      let cur = o;
      while (cur) { if (!cur.visible) return false; cur = cur.parent; }
      return true;
    };
    const hit = hits.find((h) => visible(h.object));
    return hit ? hit.object : null;
  }
  let down = null;
  renderer.domElement.addEventListener('pointerdown', (e) => {
    down = { x: e.clientX, y: e.clientY };
  });
  renderer.domElement.addEventListener('pointerup', (e) => {
    if (!down) return;
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
    down = null;
    if (moved > 6) return;
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
  document.getElementById('nav-zoom-in').addEventListener('click', () => zoomBy(1.2));
  document.getElementById('nav-zoom-out').addEventListener('click', () => zoomBy(1 / 1.2));
  document.getElementById('nav-fit').addEventListener('click', fitView);
  document.getElementById('nav-reset').addEventListener('click', resetView);
  for (const b of boxes) b.addEventListener('change', () => { sync(); writeUrl(); apply(); });
  master.addEventListener('change', () => {
    for (const b of boxes) b.checked = master.checked;
    master.indeterminate = false; writeUrl(); apply();
  });
  window.addEventListener('resize', () => { resize(); need = true; });

  function frame() {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const changed = controls.update();
    if (selection && !reduced) {
      const op = 0.5 + 0.5 * Math.sin(performance.now() / 1200 * Math.PI * 2);
      for (const o of outlineGroup.children) o.material.opacity = op;
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
