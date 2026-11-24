/* Corps humain — concours homme et femme, navigation universelle. */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
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
  seema: {
    label: '3D Human Body Anatomy', license: 'CC BY-SA 4.0',
    note: '2 197 pièces, organes colorés, peau sans vêtement.',
    kind: 'glbset', dir: './docs/models/forks/seema/models/',
    files: { skin: ['skin.glb'], muscles: ['muscles.glb'], skeleton: ['skeleton.glb'],
      organs: ['organs.glb'], vessels: ['arteries.glb', 'veins.glb'], nerves: ['nerves.glb'] },
  },
  nqwrc: {
    label: '3D Anatomy — nqwrc', license: 'CC BY-NC-SA 4.0',
    note: '3 499 pièces, homme, sans peau. Comparaison locale.',
    kind: 'glbset', dir: './docs/models/forks/nqwrc/models/',
    files: { skeleton: ['skeletal.glb', 'joints.glb'], muscles: ['muscular.glb'],
      organs: ['visceral.glb', 'lymphatic.glb'], vessels: ['cardiovascular.glb'],
      nerves: ['nervous.glb'] },
  },
  wangzh: {
    label: 'Human Atlas 3D — wangzh', license: 'MIT + CC BY 4.0',
    note: '14 lots système, source initialement en millimètres, convertie en mètres.',
    kind: 'wangzh',
  },
};
const FEMALE = {
  'female-atlas': {
    label: 'Female Atlas', license: 'MIT + CC BY 4.0',
    note: '3 004 pièces, corps féminin complet avec appareil reproducteur.',
    kind: 'chunk', dir: './docs/models/contests/female-atlas/', manifest: 'atlas.json',
  },
  enhanced: {
    label: 'Human Atlas Enhanced — femme', license: 'MIT + CC BY 4.0',
    note: '888 pièces, femme dérivée expérimentale.',
    kind: 'chunk', dir: './docs/models/forks/enhanced/', manifest: 'atlas-female.json',
  },
  slorksmo: {
    label: 'Human Atlas — femme', license: 'MIT + CC BY 4.0',
    note: '1 220 pièces, femme HRA v1.10 avec reproducteur.',
    kind: 'chunk', dir: './docs/models/forks/slorksmo/', manifest: 'atlas-female.json',
  },
  bodyatlas: {
    label: 'Body Atlas — femme', license: 'CC BY 4.0',
    note: '2 534 pièces, femme HuBMAP avec organes génitaux.',
    kind: 'chunk', dir: './docs/models/body-atlas/', manifest: 'atlas-female.json',
  },
  anatria: {
    label: 'Anatria — femme', license: 'CC BY 4.0',
    note: 'Tronc seulement : pas de tête, de membres ni de muscles squelettiques.',
    kind: 'glbset', dir: './docs/models/contests/anatria-female/',
    files: { skeleton: ['skeletal_female.glb'], skin: ['integumentary_female.glb'],
      vessels: ['cardiovascular_female.glb'],
      organs: ['digestive_female.glb', 'renal_female.glb', 'reproductive_female.glb',
        'lymphatic_female.glb'] },
  },
  organui: {
    label: 'OrganUI — organes reproducteurs', license: 'CC BY 4.0',
    note: '27 organes reproducteurs seulement, pas de corps entier.',
    kind: 'single', path: './docs/models/contests/organui-female/reproductive.glb',
    layer: 'organs',
  },
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
  const maleSel = document.getElementById('cp-male');
  const femaleSel = document.getElementById('cp-female');
  const cache = new Map();
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

  // Sols : bleu homme, rose femme avec « Vide » si personne n'est choisie.
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
  const femaleSquare = groundSquare('#d16b9c', 'Vide'); femaleSquare.position.x = 0.45;
  ground.add(maleSquare, femaleSquare); scene.add(ground);

  const bodies = new THREE.Group(); scene.add(bodies);
  let maleModel = null, femaleModel = null;

  controls.addEventListener('change', () => { need = true; });
  new IntersectionObserver((e) => { if (e[0].isIntersecting) need = true; }, { threshold: 0.01 }).observe(host);

  const sync = () => {
    const n = boxes.filter((b) => b.checked).length;
    master.checked = n === LAYERS.length;
    master.indeterminate = n > 0 && n < LAYERS.length;
  };
  const readUrl = () => {
    const q = new URLSearchParams(location.search);
    const m = q.get('m'), f = q.get('f');
    if (m && MALE[m]) maleSel.value = m;
    if (f && (FEMALE[f] || f === 'none')) femaleSel.value = f;
    const l = q.get('layers');
    if (!l) return;
    const want = new Set(l === 'all' ? LAYERS : l.split(','));
    for (const b of boxes) b.checked = want.has(b.dataset.layer);
    sync();
  };
  const writeUrl = () => {
    const u = new URL(location.href);
    u.searchParams.set('m', maleSel.value);
    u.searchParams.set('f', femaleSel.value);
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
  const mark = (o, sys) => { o.userData.layer = MAP[sys] || sys || 'organs'; return o; };
  const allBodies = () => [maleModel, femaleModel].filter(Boolean);
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

  async function chunkFetch(chunk, signal) {
    const use = !!chunk.gzip && typeof DecompressionStream !== 'undefined';
    const r = await fetch(use ? chunk.gzip : chunk.url, { signal });
    if (!r.ok) throw new Error('chunk absent');
    let buf = await r.arrayBuffer();
    const h = new Uint8Array(buf, 0, 2);
    if (use && h[0] === 0x1f && h[1] === 0x8b) {
      buf = await new Response(new Blob([buf]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
    }
    return buf;
  }
  async function buildChunk(cfg, signal) {
    const r = await fetch(cfg.dir + cfg.manifest, { signal });
    if (!r.ok) throw new Error('manifeste absent');
    const at = await r.json();
    const g = new THREE.Group();
    const by = at.chunks.map(() => []);
    for (const p of at.parts) by[p.chunk].push(p);
    let next = 0;
    const worker = async () => {
      while (next < at.chunks.length) {
        if (signal.aborted) return;
        const ci = next++; const buf = await chunkFetch(at.chunks[ci], signal);
        for (const p of by[ci]) {
          const geo = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(buf, p.positions, p.vertexCount * 3), 3));
          geo.setAttribute('normal', new THREE.BufferAttribute(new Int16Array(buf, p.normals, p.vertexCount * 3), 3, true));
          geo.setIndex(new THREE.BufferAttribute(new Uint32Array(buf, p.indices, p.indexCount), 1));
          geo.computeBoundingSphere();
          const m = new THREE.Mesh(geo, mats.get(MAP[p.system] || 'organs'));
          m.name = p.name; mark(m, p.system); m.matrixAutoUpdate = false; g.add(m);
        }
      }
    };
    await Promise.all([worker(), worker(), worker()]);
    return g;
  }
  async function buildGlbSet(cfg, signal) {
    draco.setDecoderPath('./draco/');
    const g = new THREE.Group();
    for (const [layer, files] of Object.entries(cfg.files)) {
      for (const f of files) {
        if (signal.aborted) return g;
        const gltf = await loader.loadAsync(cfg.dir + f);
        const doomed = [];
        gltf.scene.traverse((o) => {
          if (!o.isMesh) return;
          if (/modesty[ _]?cover/i.test(o.name)) { doomed.push(o); return; }
          o.material = mats.get(layer); mark(o, layer);
        });
        for (const o of doomed) o.parent.remove(o);
        g.add(gltf.scene);
      }
    }
    return g;
  }
  async function buildSingle(cfg, signal) {
    if (signal.aborted) return new THREE.Group();
    const gltf = await loader.loadAsync(cfg.path);
    const g = new THREE.Group();
    gltf.scene.traverse((o) => {
      if (!o.isMesh) return;
      o.material = matFor(organColor(o.name)); mark(o, cfg.layer);
    });
    g.add(gltf.scene);
    return g;
  }
  async function buildWangzh(signal) {
    await MeshoptDecoder.ready;
    const base = './docs/models/forks/wangzh/data/';
    const m = await (await fetch(base + 'manifest.json', { signal })).json();
    const g = new THREE.Group();
    const built = await Promise.all(m.chunks.map(async (c) => {
      if (signal.aborted) return null;
      const buf = new Uint8Array(await (await fetch(base + c.name + '.bin', { signal })).arrayBuffer());
      const dv = new DataView(buf.buffer);
      const nV = dv.getUint32(0, true), nI = dv.getUint32(4, true);
      const vL = dv.getUint32(8, true), iL = dv.getUint32(12, true);
      const v = new Uint8Array(nV * 20);
      MeshoptDecoder.decodeVertexBuffer(v, nV, 20, buf.subarray(16, 16 + vL));
      const idx = new Uint32Array(nI);
      MeshoptDecoder.decodeIndexBuffer(new Uint8Array(idx.buffer), nI, 4, buf.subarray(16 + vL, 16 + vL + iL));
      const u = new Uint16Array(v.buffer), pos = new Float32Array(nV * 3);
      for (let i = 0; i < nV; i++) {
        pos[i * 3] = m.qmin[0] + u[i * 10] * m.qscale[0];
        pos[i * 3 + 1] = m.qmin[1] + u[i * 10 + 1] * m.qscale[1];
        pos[i * 3 + 2] = m.qmin[2] + u[i * 10 + 2] * m.qscale[2];
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setIndex(new THREE.BufferAttribute(idx, 1)); geo.computeVertexNormals();
      return { geo, c };
    }));
    for (const item of built) {
      if (!item) continue;
      const mesh = new THREE.Mesh(item.geo, mats.get(MAP[item.c.system] || 'organs'));
      mark(mesh, item.c.system); g.add(mesh);
    }
    g.scale.setScalar(0.001);
    return g;
  }
  const buildCandidate = (cfg, signal) => {
    if (cfg.kind === 'chunk') return buildChunk(cfg, signal);
    if (cfg.kind === 'glbset') return buildGlbSet(cfg, signal);
    if (cfg.kind === 'single') return buildSingle(cfg, signal);
    return buildWangzh(signal);
  };

  async function loadCandidate(id, cfg, signal) {
    if (!cfg) return null;
    if (!cache.has(id)) cache.set(id, await buildCandidate(cfg, signal));
    return cache.get(id);
  }

  async function load() {
    const mid = maleSel.value, fid = femaleSel.value;
    const myToken = ++token;
    if (ctrl) ctrl.abort();
    ctrl = new AbortController();
    bodies.clear();
    maleModel = null; femaleModel = null;
    const male = await loadCandidate('m:' + mid, MALE[mid], ctrl.signal);
    if (myToken !== token) return;
    const female = await loadCandidate('f:' + fid, FEMALE[fid], ctrl.signal);
    if (myToken !== token) return;
    maleModel = male; femaleModel = female;
    if (maleModel) { maleModel.position.x = -0.45; bodies.add(maleModel); }
    if (femaleModel) { femaleModel.position.x = 0.45; bodies.add(femaleModel); }
    femaleSquare.material.map = groundSquare('#d16b9c', femaleModel ? '' : 'Vide').material.map;
    femaleSquare.material.needsUpdate = true;
    const mi = MALE[mid], fi = FEMALE[fid];
    document.querySelector('.source-label').textContent = 'Concours ♂/♀';
    document.getElementById('concours-note').textContent =
      `${mi.label} (${mi.license}) — ${mi.note} | ` +
      (fi ? `${fi.label} (${fi.license}) — ${fi.note}` : 'Aucune candidate femme : carré rose vide.');
    window.__corps = {
      maleModel, femaleModel, source: mid, female: fid,
      THREE, camera, controls, renderer, controller: ctrl, fitView, resetView, focusPoint,
      bodyBox, zoomBy, orbitBy, panBy, presetView,
    };
    apply(); resize(); fitView();
  }

  const pointFromClient = (x, y) => {
    const rect = renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((x - rect.left) / rect.width) * 2 - 1,
      -((y - rect.top) / rect.height) * 2 + 1);
    const ray = new THREE.Raycaster(); ray.setFromCamera(ndc, camera);
    return ray.intersectObjects(allBodies(), true)[0]?.point || null;
  };
  renderer.domElement.addEventListener('dblclick', (e) => {
    e.preventDefault();
    const p = pointFromClient(e.clientX, e.clientY);
    if (p) focusPoint(p); else fitView();
  });
  let lastTap = 0, lastX = 0, lastY = 0;
  renderer.domElement.addEventListener('touchend', (e) => {
    if (e.touches.length) return;
    const t = e.changedTouches[0], now = Date.now();
    if (now - lastTap < 320 && Math.hypot(t.clientX - lastX, t.clientY - lastY) < 30) {
      const p = pointFromClient(t.clientX, t.clientY);
      if (p) focusPoint(p); else fitView();
    }
    lastTap = now; lastX = t.clientX; lastY = t.clientY;
  }, { passive: true });
  window.addEventListener('keydown', (e) => {
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

  readUrl();
  maleSel.addEventListener('change', () => { writeUrl(); load(); });
  femaleSel.addEventListener('change', () => { writeUrl(); load(); });
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
    if (changed || need) { resize(); renderer.render(scene, camera); need = false; }
  }
  resize(); frame(); load();
}
