/* Viewer principal : corps humain animé issu des exports Blender.
 * Remplace l'ancien atlas comme vue par défaut. Aucun autre modèle n'est
 * chargé ici : les buffers Z-Anatomy/BodyParts3D ne sont pas référencés. */
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
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
  let model = null, mixer = null, clips = [], skinMesh = null;
  /* Hook déterministe pour l'audit image par image : fige une frame précise
   * sans dépendre du temps réel ni du nombre de images rendues. */
  const api = {
    systemOf,
    seekFrame(frame) {
      if (!mixer || !clips.length) return false;
      const name = document.getElementById('cp-anim').value;
      const clip = clips.find((c) => c.name.toLowerCase().includes(name)) || clips[0];
      mixer.stopAllAction();
      mixer.clipAction(clip).play();
      mixer.setTime(Math.max(0, frame) / 30);
      playing = false;
      syncPause();
      needsRender = true;
      return frame;
    },
  };
  let playing = !reduceMotion, needsRender = true, offscreen = false;

  controls.addEventListener('change', () => { needsRender = true; });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => { offscreen = !entries[0].isIntersecting; needsRender = true; },
      { threshold: 0.01 },
    ).observe(host);
  }

  let jointLimits = null;
  fetch('./docs/models/joint-limits.json')
    .then((r) => r.json())
    .then((spec) => { jointLimits = spec.joints || null; })
    .catch(() => {});

  const build = document.documentElement.dataset.build || '';
  const suffix = build ? `?v=${encodeURIComponent(build)}` : '';
  fetch('./docs/models/catalog.json')
    .then((r) => r.json())
    .then((catalog) => { for (const e of catalog) systemOf.set(e.key.toLowerCase(), e.system); })
    .catch(() => {});

  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    const a = w / h, s = a < 0.85 ? 1.3 : 1.05;
    camera.left = -s * a; camera.right = s * a;
    camera.top = s; camera.bottom = -s;
    camera.updateProjectionMatrix();
  }

  function applyLayer() {
    if (!model) return;
    const layer = document.getElementById('cp-couche').value;
    if (layer !== 'skin') {
      if (mixer) { mixer.stopAllAction(); mixer.setTime(0); }
      playing = false;
    } else {
      playing = !reduceMotion;
      playClip();
    }
    syncPause();
    let visible = 0;
    model.traverse((o) => {
      if (!o.isMesh) return;
      const key = o.name.toLowerCase().replace(/[.\s]/g, '')
        .replace(/(\D)\d+$/, '$1').replace(/_+$/, '');
      const system = systemOf.get(key)
        || (key.startsWith('nerve') ? 'nerves' : null)
        || (key.replace(/_/g, '').startsWith('vesselext') ? 'vessels' : null);
      o.visible = layer === 'all' || system === layer;
      if (o.visible) visible++;
    });
    /* Enveloppe translucide pour la couche muscles : elle donne le volume du
     * corps et évite que les muscles fins (cou, mains, pieds) paraissent flotter. */
    if (skinMesh) {
      const envelope = layer === 'muscles';
      skinMesh.visible = envelope || layer === 'skin' || layer === 'all';
      const mat = skinMesh.material;
      mat.transparent = envelope;
      mat.opacity = envelope ? 0.28 : 1;
      mat.depthWrite = !envelope;
      if (envelope) visible++;
    }
    document.getElementById('corps-info').textContent =
      `${clips.length} animation(s), ${visible} maillage(s) visible(s)`;
    const interne = layer === 'organs' || layer === 'vessels' || layer === 'nerves';
    const aspect = host.clientWidth / Math.max(host.clientHeight, 1);
    camera.zoom = interne ? (aspect < 0.85 ? 1.9 : 1.6)
      : (layer === 'vessels' || layer === 'nerves' || layer === 'all') ? 0.8 : 1;
    controls.target.set(0, interne ? 1.05 : 0.85, 0);
    camera.lookAt(controls.target);
    camera.updateProjectionMatrix();
    controls.update();
    needsRender = true;
  }

  function playClip() {
    if (!mixer) return;
    mixer.stopAllAction();
    const name = document.getElementById('cp-anim').value;
    const clip = clips.find((c) => c.name.toLowerCase().includes(name));
    if (clip) mixer.clipAction(clip).play();
    else if (clips.length) mixer.clipAction(clips[0]).play();
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
    api.model = model;
    api.mixer = mixer;
    api.clips = clips;
    window.__corps = api;
    mixer = new THREE.AnimationMixer(model);
    clips = asset.animations;
    playClip(); applyLayer(); resize();
    needsRender = true;
  }

  const pauseBtn = document.getElementById('cp-pause');
  const syncPause = () => {
    pauseBtn.textContent = playing ? 'Pause' : 'Reprendre';
    pauseBtn.setAttribute('aria-pressed', String(!playing));
  };
  syncPause();
  pauseBtn.addEventListener('click', () => {
    playing = !playing; syncPause(); needsRender = true;
  });
  /* Changer de couche ne recharge pas le modèle : on évite la course entre
   * load() et applyLayer() qui désynchronisait le select et la visibilité. */
  document.getElementById('cp-sexe').addEventListener('change', load);
  document.getElementById('cp-couche').addEventListener('change', applyLayer);
  document.getElementById('cp-anim').addEventListener('change', () => {
    const layer = document.getElementById('cp-couche');
    if (layer.value !== 'skin') {
      layer.value = 'skin';
      applyLayer();
    }
    /* Une animation choisie explicitement reprend toujours la lecture,
     * même si une couche interne avait mis le viewer en pause. */
    playing = !reduceMotion;
    syncPause();
    playClip();
    needsRender = true;
  });
  window.addEventListener('resize', () => { resize(); needsRender = true; });

  /* Limites mécaniques : après chaque mise à jour du mixer, on borne la
   * rotation locale des articulations aux amplitudes anatomiques standards. */
  const identite = new THREE.Quaternion();
  function clampJoints() {
    if (!jointLimits || !model) return;
    model.traverse((o) => {
      if (!o.isBone) return;
      const base = o.name.toLowerCase().replace(/[._]?[lr]$/, '');
      const limit = jointLimits[base];
      if (!limit || !limit.maxAngle) return;
      const q = o.quaternion;
      /* Quaternion et -q représentent la même rotation : on choisit le
       * demi-espace w>0 pour que le slerp suive le chemin court. */
      if (q.w < 0) q.set(-q.x, -q.y, -q.z, -q.w);
      const angle = 2 * Math.acos(Math.min(1, q.w));
      const max = THREE.MathUtils.degToRad(limit.maxAngle);
      if (angle > max) {
        q.copy(identite.clone().slerp(q, max / angle));
      }
    });
  }

  let lastTime = performance.now(), lastRender = 0;
  const FRAME_MS = 1000 / 24;
  function frame() {
    requestAnimationFrame(frame);
    const now = performance.now();
    const visible = !document.hidden && !offscreen;
    const renderState = visible && needsRender;
    const renderAnim = visible && playing && now - lastRender >= FRAME_MS;
    if (!renderState && !renderAnim) return;
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    if (mixer && playing) mixer.update(dt);
    /* Le clamp runtime est désactivé : les rotations des os sont relatives à
     * leur pose de repos, pas à l'identité. Le borner ici cassait la peau.
     * Les amplitudes sont appliquées à l'export (scripts/clamp-animations.py). */
    controls.update();
    resize();
    renderer.render(scene, camera);
    needsRender = false;
    lastRender = now;
  }

  resize();
  frame();
  return load();
}
