/* Vue vitruvienne statique : corps humain en position croix, toutes couches.
 * Aucune animation, aucun mixer : les GLB sont des géométries cuites en pose
 * croix dans Blender (voir scripts/rebuild-anatomy-v6.py). */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initCorpsViewer() {
  const host = document.getElementById('cp-view');
  if (!host) return;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x161a20);
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 20);
  camera.position.set(0, 0.85, 4);
  camera.lookAt(0, 0.85, 0);

  const tactile = window.matchMedia('(pointer: coarse)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
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
  const LAYERS = ['skin', 'muscles', 'skeleton', 'organs', 'vessels', 'nerves'];
  const layerBoxes = [...document.querySelectorAll('#cp-couches input[data-layer]')];
  const masterBox = document.getElementById('cp-couche-all');
  let model = null, skinMesh = null, needsRender = true;

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
      for (const e of catalog) systemOf.set(e.key.toLowerCase(), e.system);
      applyLayer();
    })
    .catch(() => {});

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
      const key = o.name.toLowerCase().replace(/[.\s]/g, '')
        .replace(/(\D)\d+$/, '$1').replace(/_+$/, '');
      let system = systemOf.get(key)
        || (key.startsWith('nerve') ? 'nerves' : null)
        || (key.replace(/_/g, '').startsWith('vesselext') ? 'vessels' : null);
      if (system === 'joints') system = 'skeleton';
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
    needsRender = true;
  }

  async function load() {
    const sexe = document.getElementById('cp-sexe').value;
    if (model) scene.remove(model);
    let asset = modelCache.get(sexe);
    if (!asset) {
      asset = await loader.loadAsync(`./docs/models/corps-${sexe}-opt.glb${suffix}`);
      modelCache.set(sexe, asset);
    }
    model = asset.scene;
    scene.add(model);
    skinMesh = null;
    model.traverse((o) => {
      if (!skinMesh && o.isMesh && o.name.toLowerCase().startsWith('skin')) skinMesh = o;
    });
    window.__corps = { model, systemOf, sexe, THREE, camera, renderer };
    applyLayer(); resize();
    needsRender = true;
  }

  document.getElementById('cp-sexe').addEventListener('change', load);
  for (const box of layerBoxes) {
    box.addEventListener('change', () => {
      syncMaster();
      writeUrlLayers();
      applyLayer();
    });
  }
  masterBox.addEventListener('change', () => {
    for (const box of layerBoxes) box.checked = masterBox.checked;
    masterBox.indeterminate = false;
    writeUrlLayers();
    applyLayer();
  });
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
  return load();
}
