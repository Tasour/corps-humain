/* Vue corps statique. Trois sources disponibles :
 *  - "current"     : nos GLB dérivés et validés ;
 *  - "openanatomy" : open-anatomy-3d pristine (CC BY 4.0) ;
 *  - "bodyatlas"   : Body Atlas 3D (CC BY 4.0), chargé par chunks.
 * Aucune animation, aucun mixer.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const BODY_SYSTEMS = [
  ['skeletal', '#e4dcc0'], ['muscular', '#a9584c'], ['cardiac', '#b9605a'],
  ['arterial', '#c24b3f'], ['venous', '#4f7aa0'], ['nervous', '#d9b45f'],
  ['respiratory', '#c08a93'], ['digestive', '#bb9068'], ['urinary', '#b5775d'],
  ['sensory', '#a9c6cd'], ['endocrine', '#c79f98'], ['lymphatic', '#86a07a'],
  ['reproductive', '#bfa199'], ['connective', '#aac3b9'],
  ['integumentary', '#bc9c7e'], ['pregnancy', '#cf9aa0'],
];
const BODY_LAYER = {
  skeletal: 'skeleton', muscular: 'muscles', connective: 'muscles',
  integumentary: 'skin', arterial: 'vessels', venous: 'vessels',
  cardiac: 'organs', respiratory: 'organs', digestive: 'organs',
  urinary: 'organs', sensory: 'organs', endocrine: 'organs',
  lymphatic: 'organs', reproductive: 'organs', pregnancy: 'organs',
};

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
  for (const [x, z, intensity] of [[2, 3, 2.0], [-2, -1, 0.8]]) {
    const light = new THREE.DirectionalLight(0xffffff, intensity);
    light.position.set(x, -2, z);
    scene.add(light);
  }

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.85, 0);
  controls.enableDamping = false;
  controls.enablePan = false;
  controls.minZoom = 0.6;
  controls.maxZoom = 3;
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const modelCache = new Map();
  const systemOf = new Map();
  const catalogByKey = new Map();
  const LAYERS = ['skin', 'muscles', 'skeleton', 'organs', 'vessels', 'nerves'];
  const layerBoxes = [...document.querySelectorAll('#cp-couches input[data-layer]')];
  const masterBox = document.getElementById('cp-couche-all');
  let model = null, skinMesh = null, needsRender = true, loadToken = 0;

  controls.addEventListener('change', () => { needsRender = true; });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) needsRender = true; },
      { threshold: 0.01 },
    ).observe(host);
  }

  const build = document.documentElement.dataset.build || '';
  const suffix = build ? `?v=${encodeURIComponent(build)}` : '';
  fetch('./docs/models/catalog.json')
    .then((r) => r.json())
    .then((catalog) => {
      for (const e of catalog) {
        systemOf.set(e.key.toLowerCase(), e.system);
        catalogByKey.set(e.key.toLowerCase(), e);
      }
      applyLayer();
    })
    .catch(() => {});

  function keyOf(name) {
    return name.toLowerCase().replace(/[.\s]/g, '')
      .replace(/(\D)\d+$/, '$1').replace(/_+$/, '');
  }

  function syncMaster() {
    const count = layerBoxes.filter((b) => b.checked).length;
    masterBox.checked = count === LAYERS.length;
    masterBox.indeterminate = count > 0 && count < LAYERS.length;
  }

  function readUrlLayers() {
    const param = new URLSearchParams(location.search).get('layers');
    if (!param) return;
    if (param === 'all') {
      for (const box of layerBoxes) box.checked = true;
      syncMaster();
      return;
    }
    const wanted = new Set(param.split(',').filter((x) => LAYERS.includes(x)));
    for (const box of layerBoxes) box.checked = wanted.has(box.dataset.layer);
    syncMaster();
  }

  function writeUrlLayers() {
    const url = new URL(location.href);
    const active = layerBoxes.filter((b) => b.checked).map((b) => b.dataset.layer);
    if (active.length === LAYERS.length) url.searchParams.delete('layers');
    else url.searchParams.set('layers', active.join(','));
    history.replaceState(null, '', url);
  }

  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    const a = w / h, s = a < 0.85 ? 1.05 : 1.12;
    camera.left = -s * a; camera.right = s * a;
    camera.top = s; camera.bottom = -s;
    camera.updateProjectionMatrix();
  }

  function applyLayer() {
    if (!model) return;
    const active = new Set(layerBoxes.filter((b) => b.checked).map((b) => b.dataset.layer));
    const all = active.size === LAYERS.length;
    let visible = 0;
    model.traverse((o) => {
      if (!o.isMesh) return;
      let system = o.userData.layer;
      if (!system) {
        const key = keyOf(o.name);
        system = systemOf.get(key)
          || (key.startsWith('nerve') ? 'nerves' : null)
          || (key.replace(/_/g, '').startsWith('vesselext') ? 'vessels' : null);
        if (system === 'joints') system = 'skeleton';
      }
      o.visible = active.has(system);
      if (o.visible) visible++;
    });
    if (skinMesh) {
      const translucide = all;
      const mat = skinMesh.material;
      mat.transparent = translucide;
      mat.opacity = translucide ? 0.22 : 1;
      mat.depthWrite = !translucide;
    }
    if (window.__corps) window.__corps.activeLayers = [...active];
    document.getElementById('corps-info').textContent = `${visible} maillage(s) visible(s)`;
    camera.zoom = 1;
    camera.updateProjectionMatrix();
    controls.target.set(0, 0.85, 0);
    camera.lookAt(controls.target);
    controls.update();
    renderer.render(scene, camera);
    needsRender = true;
  }

  async function fetchChunk(chunk, signal) {
    const useGzip = !!chunk.gzip && typeof DecompressionStream !== 'undefined';
    const res = await fetch(useGzip ? chunk.gzip : chunk.url, { signal });
    if (!res.ok) throw new Error(`Chunk absent : ${chunk.gzip || chunk.url}`);
    let buf = await res.arrayBuffer();
    const head = new Uint8Array(buf, 0, 2);
    if (useGzip && head[0] === 0x1f && head[1] === 0x8b) {
      buf = await new Response(new Blob([buf]).stream()
        .pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
    }
    return buf;
  }

  async function loadBodyAtlas(sexe, token, signal) {
    const manifestPath = sexe === 'female'
      ? './docs/models/body-atlas/atlas-female.json'
      : './docs/models/body-atlas/atlas.json';
    const res = await fetch(manifestPath, { signal });
    if (!res.ok) throw new Error('Manifest Body Atlas absent');
    const atlas = await res.json();
    const group = new THREE.Group();
    const materials = {};
    for (const [id, color] of BODY_SYSTEMS) {
      materials[id] = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color), roughness: 0.62, metalness: 0.02,
      });
    }
    const byChunk = atlas.chunks.map(() => []);
    for (const p of atlas.parts) byChunk[p.chunk].push(p);
    let next = 0;
    const worker = async () => {
      while (next < atlas.chunks.length) {
        if (signal.aborted || token !== loadToken) return;
        const ci = next++;
        const buffer = await fetchChunk(atlas.chunks[ci], signal);
        for (const p of byChunk[ci]) {
          const g = new THREE.BufferGeometry();
          g.setAttribute('position', new THREE.BufferAttribute(
            new Float32Array(buffer, p.positions, p.vertexCount * 3), 3));
          g.setAttribute('normal', new THREE.BufferAttribute(
            new Int16Array(buffer, p.normals, p.vertexCount * 3), 3, true));
          g.setIndex(new THREE.BufferAttribute(
            new Uint32Array(buffer, p.indices, p.indexCount), 1));
          g.computeBoundingSphere();
          const m = new THREE.Mesh(g, materials[p.system]);
          m.name = p.name;
          m.userData.system = p.system;
          m.userData.layer = BODY_LAYER[p.system] || 'organs';
          m.matrixAutoUpdate = false;
          group.add(m);
        }
      }
    };
    await Promise.all([worker(), worker(), worker()]);
    return group;
  }

  async function load() {
    const sexe = document.getElementById('cp-sexe').value;
    const source = document.getElementById('cp-source').value;
    const token = ++loadToken;
    const controller = new AbortController();
    if (window.__corps && window.__corps.controller) window.__corps.controller.abort();
    if (model) scene.remove(model);
    const key = `${source}:${sexe}`;
    let asset = modelCache.get(key);
    if (!asset) {
      if (source === 'bodyatlas') {
        asset = await loadBodyAtlas(sexe, token, controller.signal);
      } else {
        const path = source === 'openanatomy'
          ? `./docs/models/open-anatomy/anatomy-${sexe}.glb${suffix}`
          : `./docs/models/corps-${sexe}-opt.glb${suffix}`;
        const gltf = await loader.loadAsync(path);
        asset = gltf.scene;
        if (source === 'openanatomy') {
          const mats = new Map();
          asset.traverse((o) => {
            if (!o.isMesh) return;
            const entry = catalogByKey.get(keyOf(o.name));
            if (!entry || !entry.color) return;
            if (!mats.has(entry.system)) {
              mats.set(entry.system, new THREE.MeshStandardMaterial({
                color: new THREE.Color(entry.color), roughness: 0.62, metalness: 0.02,
              }));
            }
            o.material = mats.get(entry.system);
          });
        }
      }
      modelCache.set(key, asset);
    }
    if (token !== loadToken) return;
    model = asset;
    scene.add(model);
    skinMesh = null;
    model.traverse((o) => {
      if (!skinMesh && o.isMesh && o.name.toLowerCase().startsWith('skin')) skinMesh = o;
    });
    window.__corps = {
      model, systemOf, sexe, source, THREE, camera, renderer, controller,
    };
    applyLayer(); resize();
    needsRender = true;
  }

  document.getElementById('cp-sexe').addEventListener('change', load);
  document.getElementById('cp-source').addEventListener('change', load);
  for (const box of layerBoxes) {
    box.addEventListener('change', () => {
      syncMaster(); writeUrlLayers(); applyLayer();
    });
  }
  masterBox.addEventListener('change', () => {
    for (const box of layerBoxes) box.checked = masterBox.checked;
    masterBox.indeterminate = false;
    writeUrlLayers(); applyLayer();
  });
  const sourceParam = new URLSearchParams(location.search).get('source');
  if (sourceParam && ['current', 'openanatomy', 'bodyatlas'].includes(sourceParam)) {
    document.getElementById('cp-source').value = sourceParam;
  }
  readUrlLayers();
  window.addEventListener('resize', () => { resize(); needsRender = true; });

  function frame() {
    requestAnimationFrame(frame);
    const visible = !document.hidden;
    if (!visible || !needsRender) return;
    controls.update();
    resize();
    renderer.render(scene, camera);
    needsRender = false;
  }

  resize();
  frame();
  load();
}
