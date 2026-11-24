/* Corps humain — sélecteur de sources anatomiques ouvertes. */
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
};
const CHUNK = {
  bodyatlas: './docs/models/body-atlas/',
  slorksmo: './docs/models/forks/slorksmo/',
  enhanced: './docs/models/forks/enhanced/',
};
const GLBSETS = {
  seema: {
    dir: './docs/models/forks/seema/models/',
    files: {
      skin: ['skin.glb'], muscles: ['muscles.glb'], skeleton: ['skeleton.glb'],
      organs: ['organs.glb'], vessels: ['arteries.glb', 'veins.glb'], nerves: ['nerves.glb'],
    },
  },
  nqwrc: {
    dir: './docs/models/forks/nqwrc/models/',
    files: {
      skeleton: ['skeletal.glb', 'joints.glb'], muscles: ['muscular.glb'],
      organs: ['visceral.glb', 'lymphatic.glb'], vessels: ['cardiovascular.glb'],
      nerves: ['nervous.glb'],
    },
  },
};
const NERVE_FILES = [
  ['spinal-cord-with-nerve-roots-7c8957a4.glb', 'spine'],
  ['brain-with-spinal-cord-5c8ea879.glb', 'spine'],
  ['cranial-nerves-under-the-brain-396de6f6.glb', 'brain'],
  ['arm-nerves-bc1c5fa1.glb', 'arm'],
  ['leg-nerves-60edf433.glb', 'leg'],
];

export function initCorpsViewer() {
  const host = document.getElementById('cp-view');
  if (!host) return;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x161a20);
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 20);
  camera.position.set(0, 0.85, 4);
  camera.lookAt(0, 0.85, 0);
  const tactile = window.matchMedia('(pointer: coarse)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, tactile ? 1.25 : 1.5));
  host.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x444455, 1.9));
  for (const [x, z, i] of [[2, 3, 2.0], [-2, -1, 0.8]]) {
    const l = new THREE.DirectionalLight(0xffffff, i); l.position.set(x, -2, z); scene.add(l);
  }
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.85, 0); controls.enableDamping = false; controls.enablePan = false;
  controls.minZoom = 0.6; controls.maxZoom = 3;
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

  const loader = new GLTFLoader();
  const draco = new DRACOLoader();
  draco.setDecoderPath('./draco/');
  loader.setDRACOLoader(draco);
  const boxes = [...document.querySelectorAll('#cp-couches input[data-layer]')];
  const master = document.getElementById('cp-couche-all');
  const sourceSel = document.getElementById('cp-source');
  const cache = new Map(), nerveCache = new Map();
  const mats = new Map();
  const colors = { skin: '#bc9c7e', muscles: '#a9584c', skeleton: '#e4dcc0',
    organs: '#bb9068', vessels: '#c24b3f', nerves: '#d9b45f' };
  for (const [k, c] of Object.entries(colors)) {
    mats.set(k, new THREE.MeshStandardMaterial({ color: new THREE.Color(c), roughness: 0.62 }));
  }
  const extraMats = new Map();
  const matFor = (hex) => {
    if (!extraMats.has(hex)) {
      extraMats.set(hex, new THREE.MeshStandardMaterial({ color: new THREE.Color(hex), roughness: 0.62 }));
    }
    return extraMats.get(hex);
  };
  const organColor = (name) => {
    const n = name.toLowerCase();
    if (/heart|cardiac/.test(n)) return '#b23b3b';
    if (/lung|pulmon|bronch/.test(n)) return '#d99aa6';
    if (/liver|hepat/.test(n)) return '#8b4a3a';
    if (/kidney|renal|urinar|bladder/.test(n)) return '#a05a6a';
    if (/intestin|stomach|digest|esophag|colon|rectum/.test(n)) return '#c99a63';
    if (/brain|cerebr|cerebell|spinal|nerv/.test(n)) return '#d9b45f';
    if (/uterus|ovary|testis|prostat|reproduct/.test(n)) return '#b98aa0';
    if (/spleen|pancreas|thyroid|adrenal/.test(n)) return '#9a7b8f';
    return '#bb8f68';
  };
  let model = null, need = true, token = 0, ctrl = null;

  controls.addEventListener('change', () => { need = true; });
  new IntersectionObserver((e) => { if (e[0].isIntersecting) need = true; }, { threshold: 0.01 }).observe(host);

  const sync = () => {
    const n = boxes.filter((b) => b.checked).length;
    master.checked = n === LAYERS.length;
    master.indeterminate = n > 0 && n < LAYERS.length;
  };
  const readUrl = () => {
    const q = new URLSearchParams(location.search);
    if (q.get('source') && sourceSel && [...sourceSel.options].some((o) => o.value === q.get('source'))) {
      sourceSel.value = q.get('source');
    }
    const l = q.get('layers');
    if (!l) return;
    const want = new Set(l === 'all' ? LAYERS : l.split(','));
    for (const b of boxes) b.checked = want.has(b.dataset.layer);
    sync();
  };
  const writeUrl = () => {
    const u = new URL(location.href);
    const a = boxes.filter((b) => b.checked).map((b) => b.dataset.layer);
    if (a.length === LAYERS.length) u.searchParams.delete('layers'); else u.searchParams.set('layers', a.join(','));
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
  const apply = () => {
    if (!model) return;
    const active = new Set(boxes.filter((b) => b.checked).map((b) => b.dataset.layer));
    let n = 0;
    model.traverse((o) => { if (o.isMesh) { o.visible = active.has(o.userData.layer); if (o.visible) n++; } });
    const all = active.size === LAYERS.length;
    const skin = mats.get('skin');
    skin.transparent = all; skin.opacity = all ? 0.16 : 1; skin.depthWrite = !all;
    const muscle = mats.get('muscles');
    muscle.transparent = all; muscle.opacity = all ? 0.6 : 1; muscle.depthWrite = !all;
    if (window.__corps) window.__corps.activeLayers = [...active];
    document.getElementById('corps-info').textContent = `${n} maillage(s) visible(s)`;
    camera.zoom = 1; camera.updateProjectionMatrix(); controls.target.set(0, 0.85, 0);
    controls.update(); renderer.render(scene, camera); need = true;
  };
  const mark = (o, sys) => { o.userData.layer = MAP[sys] || sys || 'organs'; return o; };
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
  const bbox = (parts) => {
    const b = new THREE.Box3();
    for (const p of parts) {
      b.expandByPoint(new THREE.Vector3(...p.bounds[0]));
      b.expandByPoint(new THREE.Vector3(...p.bounds[1]));
    }
    return b;
  };
  async function buildChunk(src, sexe, signal) {
    const dir = CHUNK[src];
    const manifest = sexe === 'female' && src !== 'bodyatlas' ? 'atlas-female.json' : 'atlas.json';
    const r = await fetch(dir + manifest, { signal });
    if (!r.ok) throw new Error('manifest ' + src);
    const at = await r.json();
    const g = new THREE.Group();
    g.userData.targets = {
      brain: bbox(at.parts.filter((p) => p.system === 'nervous')),
      spine: bbox(at.parts.filter((p) => /vertebra|sacrum/i.test(p.name))),
      arm: bbox(at.parts.filter((p) => /left/i.test(p.name) && /humerus|radius|ulna/i.test(p.name))),
      leg: bbox(at.parts.filter((p) => /left/i.test(p.name) && /femur|tibia|fibula/i.test(p.name))),
    };
    const by = at.chunks.map(() => []);
    for (const p of at.parts) by[p.chunk].push(p);
    let next = 0, done = 0;
    const worker = async () => {
      while (next < at.chunks.length) {
        if (signal.aborted) return;
        const ci = next++;
        const buf = await chunkFetch(at.chunks[ci], signal);
        for (const p of by[ci]) {
          const geo = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(buf, p.positions, p.vertexCount * 3), 3));
          geo.setAttribute('normal', new THREE.BufferAttribute(new Int16Array(buf, p.normals, p.vertexCount * 3), 3, true));
          geo.setIndex(new THREE.BufferAttribute(new Uint32Array(buf, p.indices, p.indexCount), 1));
          geo.computeBoundingSphere();
          const m = new THREE.Mesh(geo, mats.get(MAP[p.system] || 'organs'));
          m.name = p.name; mark(m, p.system); m.matrixAutoUpdate = false; g.add(m);
        }
        document.getElementById('corps-info').textContent = `${src} ${++done}/${at.chunks.length}`;
      }
    };
    await Promise.all([worker(), worker(), worker()]);
    return g;
  }
  async function buildGlbSet(src, signal) {
    draco.setDecoderPath('./draco/');
    const cfg = GLBSETS[src];
    const g = new THREE.Group();
    for (const [layer, files] of Object.entries(cfg.files)) {
      for (const f of files) {
        if (signal.aborted) return g;
        const gltf = await loader.loadAsync(cfg.dir + f);
        const doomed = [];
        gltf.scene.traverse((o) => {
          if (!o.isMesh) return;
          if (/modesty[ _]?cover/i.test(o.name)) { doomed.push(o); return; }
          const material = (src === 'seema' && layer === 'organs')
            ? matFor(organColor(o.name)) : mats.get(layer);
          o.material = material; mark(o, layer);
        });
        for (const o of doomed) o.parent.remove(o);
        g.add(gltf.scene);
      }
    }
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
    return g;
  }
  function fit(o, sb, tb, mirror) {
    const ss = sb.getSize(new THREE.Vector3()), ts = tb.getSize(new THREE.Vector3());
    const cl = (v) => Math.max(0.35, Math.min(2.5, v));
    const s = new THREE.Vector3(cl(ts.x / ss.x), cl(ts.y / ss.y), cl(ts.z / ss.z));
    if (mirror) s.x = -s.x;
    o.scale.copy(s);
    o.position.copy(tb.getCenter(new THREE.Vector3()).sub(sb.getCenter(new THREE.Vector3()).multiply(s)));
  }
  async function addNerves(m, targets, signal) {
    for (const [f, k] of NERVE_FILES) {
      if (signal.aborted) return;
      if (!nerveCache.has(f)) nerveCache.set(f, await loader.loadAsync('./docs/models/body-atlas/nerves/' + f));
      const src = nerveCache.get(f).scene, box = new THREE.Box3().setFromObject(src);
      for (const mirror of (k === 'spine' ? [false] : [false, true])) {
        const c = src.clone(true);
        c.traverse((o) => { if (o.isMesh) { o.material = mats.get('nerves'); mark(o, 'nerves'); } });
        let t = targets[k];
        if (mirror) {
          t = t.clone(); const mn = t.min.clone(), mx = t.max.clone();
          t.min.x = -mx.x; t.max.x = -mn.x;
        }
        fit(c, box, t, mirror); m.add(c);
      }
    }
  }
  async function load() {
    const sexe = document.getElementById('cp-sexe').value;
    const src = sourceSel.value;
    const myToken = ++token;
    if (ctrl) ctrl.abort();
    ctrl = new AbortController();
    if (model) scene.remove(model);
    const key = src + ':' + sexe;
    const fresh = !cache.has(key);
    if (fresh) {
      let built;
      if (CHUNK[src]) built = await buildChunk(src, sexe, ctrl.signal);
      else if (GLBSETS[src]) built = await buildGlbSet(src, ctrl.signal);
      else built = await buildWangzh(ctrl.signal);
      if (myToken !== token) return;
      if (src === 'bodyatlas') await addNerves(built, built.userData.targets, ctrl.signal);
      cache.set(key, built);
    }
    if (myToken !== token) return;
    renderer.setPixelRatio(src === 'nqwrc' ? 1 : Math.min(window.devicePixelRatio || 1, tactile ? 1.25 : 1.5));
    model = cache.get(key); scene.add(model);
    window.__corps = { model, sexe, source: src, THREE, camera, renderer, controller: ctrl };
    apply(); resize(); need = true;
  }
  readUrl();
  document.getElementById('cp-sexe').addEventListener('change', load);
  sourceSel.addEventListener('change', load);
  for (const b of boxes) b.addEventListener('change', () => { sync(); writeUrl(); apply(); });
  master.addEventListener('change', () => {
    for (const b of boxes) b.checked = master.checked;
    master.indeterminate = false; writeUrl(); apply();
  });
  window.addEventListener('resize', () => { resize(); need = true; });
  function frame() {
    requestAnimationFrame(frame);
    if (document.hidden || !need) return;
    controls.update(); resize(); renderer.render(scene, camera); need = false;
  }
  resize(); frame(); load();
}
