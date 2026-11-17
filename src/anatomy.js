import * as THREE from "three";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import { ORGANS } from "./data/organs.js";
import { BONES } from "./data/bones.js";
import { MUSCLES } from "./data/muscles.js";

const ENTITY_DATA = Object.fromEntries(
  [...ORGANS, ...BONES, ...MUSCLES].map((e) => [e.id, e]),
);

const MAJOR_LABELS = new Set([
  "cerveau",
  "coeur",
  "poumons",
  "foie",
  "estomac",
  "reins",
  "intestin_grele",
  "vessie",
]);

const PI = Math.PI;
const TAU = Math.PI * 2;

/* ─────────────────────────────── helpers ─────────────────────────────── */

function std(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.5,
    metalness: 0.05,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.04,
    ...opts,
  });
}

function ellipsoid(rx, ry, rz, material, segments = 32) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, segments, Math.round(segments * 0.7)), material);
  mesh.scale.set(rx, ry, rz);
  return mesh;
}

function taperedTube(points, radius, material, radial = 10, segments = 64) {
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(...p)),
    false,
    "catmullrom",
    0.35,
  );
  const frames = curve.computeFrenetFrames(segments, false);
  const positions = [];
  const indices = [];
  const radiusAt = typeof radius === "function" ? radius : () => radius;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = curve.getPointAt(t);
    const n = frames.normals[i];
    const b = frames.binormals[i];
    const r = Math.max(0.0008, radiusAt(t));
    for (let j = 0; j < radial; j++) {
      const a = (j / radial) * TAU;
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      positions.push(
        p.x + n.x * cos * r + b.x * sin * r,
        p.y + n.y * cos * r + b.y * sin * r,
        p.z + n.z * cos * r + b.z * sin * r,
      );
    }
  }
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * radial + j;
      const b = i * radial + ((j + 1) % radial);
      const c = (i + 1) * radial + j;
      const d = (i + 1) * radial + ((j + 1) % radial);
      indices.push(a, c, b, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, material);
}

function loftGeometry(sections, radial = 36) {
  const positions = [];
  const indices = [];
  for (const s of sections) {
    for (let j = 0; j < radial; j++) {
      const a = (j / radial) * TAU;
      positions.push(Math.cos(a) * s.rx, s.y, Math.sin(a) * s.rz + (s.z || 0));
    }
  }
  for (let i = 0; i < sections.length - 1; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * radial + j;
      const b = i * radial + ((j + 1) % radial);
      const c = (i + 1) * radial + j;
      const d = (i + 1) * radial + ((j + 1) % radial);
      indices.push(a, c, b, b, c, d);
    }
  }
  // caps
  const first = sections[0];
  const last = sections[sections.length - 1];
  const bottomCenter = positions.length / 3;
  positions.push(0, first.y, first.z || 0);
  for (let j = 0; j < radial; j++) {
    indices.push(bottomCenter, (j + 1) % radial, j);
  }
  const topCenter = positions.length / 3;
  positions.push(0, last.y, last.z || 0);
  const off = (sections.length - 1) * radial;
  for (let j = 0; j < radial; j++) {
    indices.push(topCenter, off + j, off + ((j + 1) % radial));
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function wrinkledSphere(freq = 9, amp = 0.05, seed = 0) {
  const geo = new THREE.SphereGeometry(1, 56, 40);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const theta = Math.atan2(v.z, v.x);
    const phi = Math.acos(THREE.MathUtils.clamp(v.y, -1, 1));
    const r =
      1 +
      amp * Math.sin(phi * freq * 1.7 + seed) * Math.sin(theta * freq + seed * 2) +
      amp * 0.45 * Math.sin(phi * freq * 3.4 + theta * 2.2);
    v.multiplyScalar(r);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

function addLabel(entry) {
  const el = document.createElement("div");
  el.className = "organ-label";
  if (MAJOR_LABELS.has(entry.id)) el.classList.add("major");
  el.innerHTML = `<i style="--c:${entry.color}"></i><span>${entry.name}</span>`;
  const label = new CSS2DObject(el);
  label.position.set(0, 0.012, 0);
  label.center.set(0, 1);
  entry.label = label;
  entry.labelEl = el;
  entry.group.add(label);
}

/* ─────────────────────────────── skin ─────────────────────────────── */

function makeSkinMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uBase: { value: new THREE.Color("#8ec5e6") },
      uRim: { value: new THREE.Color("#67e8f9") },
      uOpacity: { value: 1 },
      uTime: { value: 0 },
      uTint: { value: new THREE.Color("#67e8f9") },
      uScan: { value: 1 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vN;
      varying vec3 vV;
      varying vec3 vW;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vW = wp.xyz;
        vN = normalize(mat3(modelMatrix) * normal);
        vV = normalize(cameraPosition - wp.xyz);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uBase;
      uniform vec3 uRim;
      uniform vec3 uTint;
      uniform float uOpacity;
      uniform float uTime;
      uniform float uScan;
      varying vec3 vN;
      varying vec3 vV;
      varying vec3 vW;
      void main() {
        float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.1);
        float scan = smoothstep(0.86, 1.0, sin(vW.y * 22.0 - uTime * 1.1) * 0.5 + 0.5) * uScan;
        vec3 col = mix(uBase, uRim, fres * 0.95) + uTint * scan * 0.12;
        float alpha = (0.028 + fres * 0.52 + scan * 0.025) * uOpacity;
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });
}

function buildSkin() {
  const group = new THREE.Group();
  group.name = "skin";
  const material = makeSkinMaterial();

  const torso = new THREE.Mesh(
    loftGeometry([
      { y: 0.835, rx: 0.148, rz: 0.1, z: 0.005 },
      { y: 0.875, rx: 0.173, rz: 0.112, z: 0.004 },
      { y: 0.93, rx: 0.176, rz: 0.113, z: 0.002 },
      { y: 0.99, rx: 0.164, rz: 0.108, z: 0.006 },
      { y: 1.05, rx: 0.153, rz: 0.104, z: 0.008 },
      { y: 1.11, rx: 0.158, rz: 0.11, z: 0.006 },
      { y: 1.17, rx: 0.173, rz: 0.118, z: 0.003 },
      { y: 1.24, rx: 0.19, rz: 0.128, z: 0 },
      { y: 1.3, rx: 0.199, rz: 0.13, z: -0.002 },
      { y: 1.36, rx: 0.2, rz: 0.127, z: -0.004 },
      { y: 1.405, rx: 0.186, rz: 0.117, z: -0.003 },
      { y: 1.44, rx: 0.148, rz: 0.104, z: 0.004 },
    ]),
    material,
  );
  group.add(torso);

  const neck = new THREE.Mesh(
    loftGeometry([
      { y: 1.43, rx: 0.064, rz: 0.058, z: 0.008 },
      { y: 1.48, rx: 0.057, rz: 0.052, z: 0.01 },
      { y: 1.53, rx: 0.052, rz: 0.048, z: 0.01 },
    ]),
    material,
  );
  group.add(neck);

  const head = ellipsoid(0.089, 0.116, 0.097, material, 48);
  head.position.set(0, 1.648, 0.008);
  group.add(head);

  const jaw = ellipsoid(0.058, 0.052, 0.062, material, 32);
  jaw.position.set(0, 1.573, 0.027);
  group.add(jaw);

  const nose = ellipsoid(0.011, 0.028, 0.016, material, 16);
  nose.position.set(0, 1.63, 0.104);
  group.add(nose);

  for (const s of [-1, 1]) {
    const arm = taperedTube(
      [
        [s * 0.19, 1.405, 0],
        [s * 0.218, 1.32, 0.004],
        [s * 0.245, 1.2, 0.01],
        [s * 0.253, 1.13, 0.012],
        [s * 0.268, 1.02, 0.018],
        [s * 0.281, 0.9, 0.024],
      ],
      (t) => 0.045 - t * 0.021,
      material,
      14,
      64,
    );
    group.add(arm);

    const palm = ellipsoid(0.029, 0.046, 0.019, material, 24);
    palm.position.set(s * 0.285, 0.835, 0.03);
    group.add(palm);

    for (let f = 0; f < 4; f++) {
      const x = s * (0.273 + f * 0.008);
      const finger = taperedTube(
        [
          [x, 0.825, 0.035],
          [x + s * 0.002, 0.79, 0.04],
          [x + s * 0.003, 0.762, 0.045],
        ],
        (t) => 0.006 - t * 0.002,
        material,
        8,
        16,
      );
      group.add(finger);
    }
    const thumb = taperedTube(
      [
        [s * 0.262, 0.845, 0.043],
        [s * 0.255, 0.82, 0.055],
        [s * 0.256, 0.802, 0.062],
      ],
      0.007,
      material,
      8,
      14,
    );
    group.add(thumb);

    const leg = taperedTube(
      [
        [s * 0.085, 0.87, 0],
        [s * 0.084, 0.76, 0.002],
        [s * 0.081, 0.62, 0.006],
        [s * 0.078, 0.475, 0.012],
        [s * 0.077, 0.36, 0.012],
        [s * 0.075, 0.24, 0.008],
        [s * 0.074, 0.1, 0.008],
      ],
      (t) => 0.076 - t * 0.042,
      material,
      16,
      72,
    );
    group.add(leg);

    const foot = ellipsoid(0.045, 0.038, 0.108, material, 24);
    foot.position.set(s * 0.075, 0.045, 0.055);
    group.add(foot);

    const heel = ellipsoid(0.035, 0.036, 0.045, material, 20);
    heel.position.set(s * 0.074, 0.05, 0.0);
    group.add(heel);
  }

  group.traverse((o) => {
    if (o.isMesh) o.renderOrder = 20;
  });
  return { group, material };
}

/* ─────────────────────────────── skeleton ─────────────────────────────── */

export function buildSkeleton() {
  const root = new THREE.Group();
  root.name = "skeleton";
  const entries = {};

  const boneMat = () =>
    std("#e5ddc8", {
      roughness: 0.58,
      metalness: 0.08,
      emissive: "#7b715c",
      emissiveIntensity: 0.06,
    });

  function entry(id) {
    const data = ENTITY_DATA[id];
    const group = new THREE.Group();
    group.name = id;
    root.add(group);
    const mats = [];
    const material = boneMat();
    mats.push(material);
    const e = { ...data, kind: "bone", group, materials: mats, meshes: [], base: new THREE.Vector3() };
    entries[id] = e;
    if (id === "colonne") e.vertebrae = [];
    return { e, group, material };
  }

  /* skull */
  {
    const { e, group, material } = entry("crane");
    const cranium = ellipsoid(0.078, 0.092, 0.087, material, 40);
    cranium.position.set(0, 1.665, 0.006);
    group.add(cranium);
    const face = ellipsoid(0.055, 0.06, 0.062, material, 32);
    face.position.set(0, 1.59, 0.032);
    group.add(face);
    const cheekL = ellipsoid(0.026, 0.018, 0.02, material, 16);
    cheekL.position.set(0.045, 1.6, 0.055);
    group.add(cheekL);
    const cheekR = cheekL.clone();
    cheekR.position.x = -0.045;
    group.add(cheekR);
    const jaw = taperedTube(
      [
        [-0.055, 1.585, 0.028],
        [-0.035, 1.548, 0.06],
        [0.035, 1.548, 0.06],
        [0.055, 1.585, 0.028],
      ],
      0.009,
      material,
      7,
      28,
    );
    group.add(jaw);
    e.group = group;
  }

  /* spine */
  {
    const { e, group, material } = entry("colonne");
    const verts = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const y = 1.525 - t * 0.585;
      const z = -0.052 + Math.sin(t * PI) * 0.012 + (t > 0.72 ? 0.01 : 0);
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.019, 0.021, 0.014, 12), material);
      body.position.set(0, y, z);
      group.add(body);
      const spinous = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.008, 0.03), material);
      spinous.position.set(0, y + 0.001, z - 0.022);
      group.add(spinous);
      if (i % 2 === 0) {
        const disc = new THREE.Mesh(
          new THREE.CylinderGeometry(0.0165, 0.0165, 0.004, 12),
          std("#a9c4c1", { roughness: 0.5, emissive: "#3a5b56", emissiveIntensity: 0.05 }),
        );
        disc.position.set(0, y - 0.009, z);
        group.add(disc);
        e.materials.push(disc.material);
      }
      verts.push({ mesh: body, base: body.position.clone(), spinous, spinousBase: spinous.position.clone(), t });
    }
    e.vertebrae = verts;
  }

  /* ribs + sternum + clavicles */
  {
    const { e, group, material } = entry("cotes");
    for (let i = 0; i < 10; i++) {
      const t = i / 9;
      const y = 1.375 - t * 0.26;
      const width = 0.155 - (i < 2 ? 0.008 : 0) - t * 0.018;
      for (const s of [-1, 1]) {
        const rib = taperedTube(
          [
            [s * 0.025, y, -0.045],
            [s * 0.075, y + 0.002, -0.03],
            [s * 0.135, y - 0.002, 0.015],
            [s * width, y - 0.012, 0.055],
            [s * 0.105, y - 0.026, 0.082],
            [s * 0.035, y - 0.04, 0.093],
          ],
          0.0062 - t * 0.0012,
          material,
          7,
          36,
        );
        group.add(rib);
      }
    }
    const sternum = taperedTube(
      [
        [0, 1.38, 0.088],
        [0, 1.31, 0.096],
        [0, 1.22, 0.094],
        [0, 1.145, 0.088],
      ],
      (t) => 0.011 - t * 0.003,
      material,
      8,
      32,
    );
    group.add(sternum);
    e.group = group;
  }

  /* clavicles */
  {
    const { e, group, material } = entry("clavicule");
    for (const s of [-1, 1]) {
      const clavicle = taperedTube(
        [
          [s * 0.012, 1.4, 0.084],
          [s * 0.075, 1.425, 0.055],
          [s * 0.145, 1.432, 0.015],
          [s * 0.19, 1.418, -0.005],
        ],
        0.0075,
        material,
        7,
        28,
      );
      group.add(clavicle);
    }
    e.group = group;
  }

  /* pelvis */
  {
    const { e, group, material } = entry("bassin");
    const pts = [];
    for (let i = 0; i <= 26; i++) {
      const a = (i / 26) * TAU;
      pts.push([Math.cos(a) * 0.135, 0.885 + Math.sin(a * 2) * 0.008, Math.sin(a) * 0.085]);
    }
    const ring = taperedTube(pts, 0.013, material, 8, 80);
    group.add(ring);
    const sacrum = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.09, 4), material);
    sacrum.position.set(0, 0.92, -0.07);
    sacrum.rotation.x = -0.3;
    sacrum.rotation.y = PI / 4;
    group.add(sacrum);
    for (const s of [-1, 1]) {
      const wing = ellipsoid(0.065, 0.058, 0.016, material, 24);
      wing.position.set(s * 0.105, 0.945, -0.022);
      wing.rotation.z = s * 0.35;
      wing.rotation.y = s * -0.2;
      group.add(wing);
      const socket = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.009, 8, 20), material);
      socket.position.set(s * 0.083, 0.868, 0.008);
      socket.rotation.y = PI / 2;
      group.add(socket);
    }
    e.group = group;
  }

  /* scapulae */
  {
    const { e, group, material } = entry("omoplate");
    for (const s of [-1, 1]) {
      const blade = ellipsoid(0.058, 0.07, 0.011, material, 20);
      blade.position.set(s * 0.112, 1.315, -0.066);
      blade.rotation.z = s * -0.22;
      blade.rotation.x = 0.12;
      group.add(blade);
      const spine = taperedTube(
        [
          [s * 0.06, 1.345, -0.073],
          [s * 0.11, 1.335, -0.075],
          [s * 0.165, 1.335, -0.06],
        ],
        0.007,
        material,
        6,
        20,
      );
      group.add(spine);
    }
    e.group = group;
  }

  /* humerus */
  {
    const { e, group, material } = entry("humerus");
    for (const s of [-1, 1]) {
      const shaft = taperedTube(
        [
          [s * 0.19, 1.4, -0.002],
          [s * 0.222, 1.32, 0.006],
          [s * 0.243, 1.2, 0.01],
          [s * 0.25, 1.14, 0.014],
        ],
        0.0135,
        material,
        8,
        24,
      );
      group.add(shaft);
      const headB = ellipsoid(0.02, 0.022, 0.02, material, 16);
      headB.position.set(s * 0.192, 1.407, 0.002);
      group.add(headB);
      for (const o of [-1, 1]) {
        const condyle = ellipsoid(0.011, 0.014, 0.011, material, 12);
        condyle.position.set(s * 0.248 + o * 0.008, 1.133, 0.017);
        group.add(condyle);
      }
    }
    e.group = group;
  }

  /* forearm */
  {
    const { e, group, material } = entry("avant_bras");
    for (const s of [-1, 1]) {
      for (const off of [-0.008, 0.008]) {
        const bone = taperedTube(
          [
            [s * (0.249 + off), 1.132, 0.018],
            [s * (0.263 + off), 1.02, 0.023],
            [s * (0.276 + off), 0.905, 0.028],
          ],
          off === 0.008 ? 0.0065 : 0.0085,
          material,
          7,
          20,
        );
        group.add(bone);
      }
    }
    e.group = group;
  }

  /* hands */
  {
    const { e, group, material } = entry("main");
    for (const s of [-1, 1]) {
      const palm = ellipsoid(0.026, 0.038, 0.014, material, 16);
      palm.position.set(s * 0.283, 0.858, 0.031);
      group.add(palm);
      for (let f = 0; f < 4; f++) {
        const x = s * (0.271 + f * 0.008);
        const phal = taperedTube(
          [
            [x, 0.847, 0.036],
            [x + s * 0.002, 0.812, 0.041],
            [x + s * 0.003, 0.785, 0.045],
          ],
          0.004,
          material,
          5,
          12,
        );
        group.add(phal);
      }
      const thumb = taperedTube(
        [
          [s * 0.258, 0.86, 0.042],
          [s * 0.251, 0.835, 0.053],
        ],
        0.0045,
        material,
        5,
        10,
      );
      group.add(thumb);
    }
    e.group = group;
  }

  /* femur */
  {
    const { e, group, material } = entry("femur");
    for (const s of [-1, 1]) {
      const shaft = taperedTube(
        [
          [s * 0.09, 0.86, 0],
          [s * 0.086, 0.76, 0.002],
          [s * 0.081, 0.61, 0.008],
          [s * 0.078, 0.49, 0.012],
        ],
        0.0165,
        material,
        9,
        28,
      );
      group.add(shaft);
      const headF = ellipsoid(0.022, 0.022, 0.022, material, 16);
      headF.position.set(s * 0.073, 0.868, 0.002);
      group.add(headF);
      const condyle = ellipsoid(0.022, 0.026, 0.018, material, 16);
      condyle.position.set(s * 0.077, 0.485, 0.014);
      group.add(condyle);
    }
    e.group = group;
  }

  /* patella */
  {
    const { e, group, material } = entry("rotule");
    for (const s of [-1, 1]) {
      const knee = ellipsoid(0.022, 0.026, 0.012, material, 16);
      knee.position.set(s * 0.078, 0.487, 0.045);
      group.add(knee);
    }
    e.group = group;
  }

  /* tibia */
  {
    const { e, group, material } = entry("tibia");
    for (const s of [-1, 1]) {
      const tibia = taperedTube(
        [
          [s * 0.077, 0.472, 0.012],
          [s * 0.076, 0.34, 0.014],
          [s * 0.074, 0.2, 0.012],
          [s * 0.073, 0.08, 0.01],
        ],
        0.0135,
        material,
        8,
        26,
      );
      group.add(tibia);
      const fibula = taperedTube(
        [
          [s * 0.093, 0.46, 0.004],
          [s * 0.091, 0.32, 0.004],
          [s * 0.088, 0.13, 0.008],
        ],
        0.007,
        material,
        6,
        20,
      );
      group.add(fibula);
    }
    e.group = group;
  }

  /* feet */
  {
    const { e, group, material } = entry("pied");
    for (const s of [-1, 1]) {
      const tarsals = ellipsoid(0.035, 0.022, 0.07, material, 16);
      tarsals.position.set(s * 0.075, 0.028, 0.045);
      group.add(tarsals);
      for (let f = 0; f < 5; f++) {
        const toe = ellipsoid(0.008, 0.008, 0.022, material, 10);
        toe.position.set(s * (0.045 + f * 0.014), 0.016, 0.115);
        group.add(toe);
      }
    }
    e.group = group;
  }

  return { group: root, entries };
}

/* ─────────────────────────────── muscles ─────────────────────────────── */

export function buildMuscles() {
  const root = new THREE.Group();
  root.name = "muscles";
  const entries = {};

  function makeGroup(id) {
    const data = ENTITY_DATA[id];
    const group = new THREE.Group();
    const material = std(data.color, {
      roughness: 0.62,
      metalness: 0.02,
      emissive: new THREE.Color(data.color).multiplyScalar(0.5),
      emissiveIntensity: 0.08,
      transparent: true,
      opacity: 0.94,
    });
    root.add(group);
    const e = { ...data, kind: "muscle", group, materials: [material], meshes: [] };
    entries[id] = e;
    return { e, group, material };
  }

  /* trapezius */
  {
    const { group, material } = makeGroup("trapezes");
    for (const s of [-1, 1]) {
      const upper = ellipsoid(0.085, 0.028, 0.028, material, 24);
      upper.position.set(s * 0.082, 1.435, -0.025);
      upper.rotation.z = s * -0.22;
      group.add(upper);
      const lower = ellipsoid(0.055, 0.1, 0.025, material, 24);
      lower.position.set(s * 0.105, 1.34, -0.058);
      lower.rotation.z = s * 0.18;
      lower.rotation.x = 0.15;
      group.add(lower);
    }
    const neck = ellipsoid(0.045, 0.05, 0.025, material, 20);
    neck.position.set(0, 1.47, -0.03);
    group.add(neck);
  }

  /* deltoids */
  {
    const { group, material } = makeGroup("deltoides");
    for (const s of [-1, 1]) {
      const delt = ellipsoid(0.053, 0.068, 0.052, material, 28);
      delt.position.set(s * 0.205, 1.385, 0.002);
      delt.rotation.z = s * 0.2;
      group.add(delt);
    }
  }

  /* pectorals */
  {
    const { group, material } = makeGroup("pectoraux");
    for (const s of [-1, 1]) {
      const pec = ellipsoid(0.077, 0.062, 0.03, material, 28);
      pec.position.set(s * 0.077, 1.315, 0.078);
      pec.rotation.z = s * -0.1;
      group.add(pec);
    }
  }

  /* lats */
  {
    const { group, material } = makeGroup("dorsaux");
    for (const s of [-1, 1]) {
      const lat = ellipsoid(0.068, 0.15, 0.032, material, 26);
      lat.position.set(s * 0.112, 1.235, -0.07);
      lat.rotation.z = s * 0.12;
      group.add(lat);
    }
  }

  /* abs */
  {
    const { group, material } = makeGroup("abdominaux");
    for (let row = 0; row < 3; row++) {
      for (const s of [-1, 1]) {
        const abs = ellipsoid(0.033, 0.026, 0.012, material, 16);
        abs.position.set(s * 0.035, 1.155 - row * 0.052, 0.1 - row * 0.003);
        group.add(abs);
      }
    }
  }

  /* obliques */
  {
    const { group, material } = makeGroup("obliques");
    for (const s of [-1, 1]) {
      const oblique = ellipsoid(0.024, 0.085, 0.014, material, 18);
      oblique.position.set(s * 0.095, 1.09, 0.085);
      oblique.rotation.z = s * -0.18;
      group.add(oblique);
    }
  }

  /* biceps + triceps */
  {
    const { group, material } = makeGroup("biceps");
    const tri = makeGroup("triceps");
    for (const s of [-1, 1]) {
      const biceps = ellipsoid(0.028, 0.082, 0.029, material, 20);
      biceps.position.set(s * 0.229, 1.255, 0.027);
      biceps.rotation.z = s * 0.16;
      group.add(biceps);
      const triceps = ellipsoid(0.027, 0.09, 0.027, tri.material, 20);
      triceps.position.set(s * 0.237, 1.25, -0.019);
      triceps.rotation.z = s * 0.16;
      tri.group.add(triceps);
    }
  }

  /* glutes */
  {
    const { group, material } = makeGroup("fessiers");
    for (const s of [-1, 1]) {
      const glute = ellipsoid(0.073, 0.088, 0.055, material, 28);
      glute.position.set(s * 0.083, 0.887, -0.072);
      glute.rotation.z = s * 0.12;
      group.add(glute);
    }
  }

  /* quadriceps */
  {
    const { group, material } = makeGroup("quadriceps");
    for (const s of [-1, 1]) {
      const quad = ellipsoid(0.056, 0.155, 0.055, material, 26);
      quad.position.set(s * 0.082, 0.665, 0.028);
      quad.rotation.z = s * 0.04;
      group.add(quad);
    }
  }

  /* hamstrings */
  {
    const { group, material } = makeGroup("ischio_jambiers");
    for (const s of [-1, 1]) {
      const ham = ellipsoid(0.05, 0.145, 0.048, material, 26);
      ham.position.set(s * 0.086, 0.66, -0.031);
      group.add(ham);
    }
  }

  /* calves */
  {
    const { group, material } = makeGroup("mollets");
    for (const s of [-1, 1]) {
      const calf = ellipsoid(0.043, 0.1, 0.042, material, 24);
      calf.position.set(s * 0.077, 0.305, -0.02);
      group.add(calf);
    }
  }

  return { group: root, entries };
}

/* ─────────────────────────────── organs ─────────────────────────────── */

export function buildOrgans() {
  const root = new THREE.Group();
  root.name = "organs";
  const entries = {};

  function makeOrgan(id, position, colorOverride) {
    const data = ENTITY_DATA[id];
    const group = new THREE.Group();
    group.position.set(...position);
    group.name = id;
    root.add(group);
    const material = std(colorOverride || data.color, {
      roughness: 0.43,
      metalness: 0.06,
      emissive: new THREE.Color(colorOverride || data.color).multiplyScalar(0.55),
      emissiveIntensity: 0.08,
    });
    const e = {
      ...data,
      kind: "organ",
      group,
      materials: [material],
      meshes: [],
      center: group.position.clone(),
    };
    entries[id] = e;
    addLabel(e);
    return { e, group, material };
  }

  /* brain */
  {
    const { e, group, material } = makeOrgan("cerveau", [0, 1.665, 0.004]);
    const geo = wrinkledSphere(11, 0.05, 1.3);
    for (const s of [-1, 1]) {
      const hemi = new THREE.Mesh(geo, material);
      hemi.scale.set(0.052, 0.069, 0.073);
      hemi.position.set(s * 0.049, 0, 0);
      hemi.rotation.y = s * 0.3;
      group.add(hemi);
    }
    e.group = group;
  }

  /* cerebellum */
  {
    const { e, group, material } = makeOrgan("cervelet", [0, 1.607, -0.062]);
    const geo = wrinkledSphere(22, 0.035, 3.1);
    const c = new THREE.Mesh(geo, material);
    c.scale.set(0.046, 0.031, 0.036);
    group.add(c);
    const lobe = new THREE.Mesh(geo, material);
    lobe.scale.set(0.026, 0.022, 0.026);
    lobe.position.set(0.033, -0.004, -0.004);
    group.add(lobe);
    const lobe2 = lobe.clone();
    lobe2.position.x = -0.033;
    group.add(lobe2);
    e.group = group;
  }

  /* brainstem */
  {
    const { e, group, material } = makeOrgan("tronc_cerebral", [0, 1.607, -0.014]);
    const stem = taperedTube(
      [
        [0, 0.04, 0.006],
        [0, 0.008, -0.005],
        [0, -0.03, -0.012],
        [0, -0.062, -0.004],
      ],
      (t) => 0.021 - t * 0.008,
      material,
      12,
      24,
    );
    group.add(stem);
    e.group = group;
  }

  /* spinal cord */
  {
    const { e, group, material } = makeOrgan("moelle_epiniere", [0, 1.255, -0.043]);
    const cord = taperedTube(
      [
        [0, 0.3, 0.006],
        [0, 0.16, -0.002],
        [0, 0.0, -0.004],
        [0, -0.16, 0.002],
        [0, -0.29, 0.012],
      ],
      0.0115,
      material,
      10,
      64,
    );
    group.add(cord);
    for (let i = 0; i < 7; i++) {
      const y = 0.2 - i * 0.07;
      for (const s of [-1, 1]) {
        const nerve = taperedTube(
          [
            [0, y, 0],
            [s * 0.032, y - 0.008, 0.012],
            [s * 0.05, y - 0.014, 0.025],
          ],
          0.0035,
          material,
          5,
          10,
        );
        group.add(nerve);
      }
    }
    e.group = group;
  }

  /* heart */
  {
    const { e, group, material } = makeOrgan("coeur", [0.033, 1.252, 0.012]);
    const lv = ellipsoid(0.046, 0.075, 0.043, material, 32);
    lv.position.set(0.005, -0.012, 0);
    lv.rotation.z = -0.18;
    lv.rotation.x = -0.12;
    group.add(lv);
    const rightMat = material.clone();
    rightMat.color.set("#c23a50");
    rightMat.emissive.set("#8e1e30");
    e.materials.push(rightMat);
    const rv = ellipsoid(0.038, 0.058, 0.036, rightMat, 28);
    rv.position.set(-0.033, -0.006, 0.009);
    rv.rotation.z = 0.12;
    group.add(rv);
    const la = ellipsoid(0.032, 0.027, 0.029, material, 24);
    la.position.set(0.03, 0.061, -0.003);
    group.add(la);
    const ra = ellipsoid(0.029, 0.025, 0.027, rightMat, 24);
    ra.position.set(-0.027, 0.056, 0.005);
    group.add(ra);
    const aortaStub = taperedTube(
      [
        [0.015, 0.075, -0.005],
        [0.008, 0.105, -0.014],
        [0, 0.115, -0.028],
      ],
      0.012,
      std("#c85555", { roughness: 0.5, emissive: "#7a1f1f", emissiveIntensity: 0.1 }),
      10,
      16,
    );
    group.add(aortaStub);
    const pulm = taperedTube(
      [
        [-0.02, 0.068, 0.0],
        [-0.025, 0.1, -0.01],
        [-0.02, 0.12, -0.022],
      ],
      0.009,
      std("#5b7fa8", { roughness: 0.5 }),
      8,
      14,
    );
    group.add(pulm);
    e.group = group;
  }

  /* coronary arteries */
  {
    const { e, group, material } = makeOrgan("coronaires", [0.033, 1.252, 0.012]);
    const left = taperedTube(
      [
        [0.005, 0.075, 0.018],
        [0.035, 0.035, 0.045],
        [0.038, -0.02, 0.042],
        [0.022, -0.06, 0.024],
        [0.005, -0.082, 0.008],
      ],
      (t) => 0.0038 - t * 0.0014,
      material,
      7,
      28,
    );
    group.add(left);
    const right = taperedTube(
      [
        [-0.015, 0.06, 0.025],
        [-0.045, 0.02, 0.035],
        [-0.052, -0.02, 0.024],
        [-0.043, -0.045, 0.008],
      ],
      (t) => 0.0032 - t * 0.0012,
      material,
      7,
      24,
    );
    group.add(right);
    e.group = group;
  }

  /* aorta */
  {
    const { e, group, material } = makeOrgan("aorte", [0, 1.28, 0]);
    const arch = taperedTube(
      [
        [0.004, 0.02, 0.015],
        [0.008, 0.085, 0.002],
        [0.032, 0.125, -0.03],
        [0.026, 0.09, -0.055],
        [0.008, 0.03, -0.06],
        [0.002, -0.06, -0.062],
        [0.0, -0.17, -0.056],
        [0.0, -0.24, -0.048],
      ],
      (t) => 0.016 - t * 0.004,
      material,
      12,
      60,
    );
    group.add(arch);
    for (const s of [-1, 1]) {
      const iliac = taperedTube(
        [
          [0, -0.235, -0.048],
          [s * 0.035, -0.275, -0.045],
          [s * 0.058, -0.315, -0.038],
        ],
        0.0085,
        material,
        8,
        18,
      );
      group.add(iliac);
    }
    for (let i = 0; i < 3; i++) {
      const branch = taperedTube(
        [
          [0.015 + i * 0.008, 0.115, -0.03 + i * 0.006],
          [0.03 + i * 0.012, 0.16, -0.025 + i * 0.008],
          [0.04 + i * 0.012, 0.19, -0.02 + i * 0.006],
        ],
        0.004,
        material,
        6,
        12,
      );
      group.add(branch);
    }
    e.group = group;
  }

  /* lungs */
  {
    const { e, group, material } = makeOrgan("poumons", [0, 1.255, 0]);
    const mat2 = material.clone();
    mat2.color.set("#ef9aa4");
    mat2.emissive.set("#b34a58");
    e.materials.push(mat2);
    for (const s of [-1, 1]) {
      const isLeft = s > 0;
      const upper = ellipsoid(0.058, 0.074, 0.055, material, 32);
      upper.position.set(s * 0.097, 0.048, -0.002);
      upper.rotation.z = s * -0.07;
      group.add(upper);
      const lower = ellipsoid(isLeft ? 0.058 : 0.067, 0.082, 0.057, mat2, 32);
      lower.position.set(s * (isLeft ? 0.112 : 0.101), -0.05, 0.002);
      lower.rotation.z = s * 0.06;
      group.add(lower);
      if (!isLeft) {
        const middle = ellipsoid(0.045, 0.043, 0.052, material, 24);
        middle.position.set(-0.09, -0.006, 0.02);
        group.add(middle);
      }
      const fissure = taperedTube(
        [
          [s * 0.07, 0.0, 0.045],
          [s * 0.1, -0.004, 0.02],
          [s * 0.13, -0.006, -0.015],
        ],
        0.0026,
        std("#b46670", { roughness: 0.7 }),
        5,
        12,
      );
      group.add(fissure);
    }
    e.group = group;
  }

  /* airways */
  {
    const { e, group, material } = makeOrgan("bronches", [0, 1.33, 0]);
    const cartilage = std("#f3c6cd", { roughness: 0.45, emissive: "#a35c68", emissiveIntensity: 0.08 });
    e.materials.push(cartilage);
    const trachea = taperedTube(
      [
        [0, 0.13, 0],
        [0, 0.08, 0.002],
        [0, 0.035, 0.002],
      ],
      0.012,
      material,
      10,
      24,
    );
    group.add(trachea);
    for (let i = 0; i < 7; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.012, 0.0022, 6, 18), cartilage);
      ring.position.set(0, 0.118 - i * 0.0125, 0.001);
      ring.rotation.x = PI / 2;
      group.add(ring);
    }
    for (const s of [-1, 1]) {
      const main = taperedTube(
        [
          [0, 0.036, 0],
          [s * 0.035, 0.005, 0],
          [s * 0.07, -0.025, 0.0],
          [s * 0.095, -0.06, -0.004],
        ],
        (t) => 0.0085 - t * 0.003,
        material,
        8,
        28,
      );
      group.add(main);
      const branches = [
        [
          [s * 0.06, -0.015, 0],
          [s * 0.085, -0.03, 0.028],
          [s * 0.11, -0.055, 0.042],
        ],
        [
          [s * 0.075, -0.03, 0],
          [s * 0.105, -0.055, -0.025],
          [s * 0.125, -0.085, -0.035],
        ],
        [
          [s * 0.088, -0.048, 0],
          [s * 0.112, -0.08, 0.02],
          [s * 0.118, -0.105, 0.03],
        ],
      ];
      for (const pts of branches) {
        const b = taperedTube(pts, (t) => 0.0055 - t * 0.003, material, 7, 20);
        group.add(b);
      }
    }
    e.group = group;
  }

  /* esophagus */
  {
    const { e, group, material } = makeOrgan("oesophage", [0, 1.2, 0]);
    const tube = taperedTube(
      [
        [0, 0.235, -0.014],
        [0, 0.16, -0.008],
        [0, 0.06, -0.004],
        [0, -0.03, -0.006],
        [0.02, -0.085, 0.002],
        [0.042, -0.105, 0.012],
      ],
      (t) => 0.011 - t * 0.0025,
      material,
      9,
      40,
    );
    group.add(tube);
    e.group = group;
  }

  /* stomach */
  {
    const { e, group, material } = makeOrgan("estomac", [0.06, 1.085, 0.012]);
    const curve = taperedTube(
      [
        [-0.038, 0.058, -0.008],
        [-0.048, 0.026, 0.014],
        [-0.028, -0.018, 0.03],
        [0.014, -0.042, 0.03],
        [0.045, -0.018, 0.018],
        [0.04, 0.018, 0.0],
      ],
      (t) => (t < 0.2 ? 0.024 + t * 0.04 : 0.032 - t * 0.014),
      material,
      14,
      48,
    );
    group.add(curve);
    const fundus = ellipsoid(0.033, 0.04, 0.029, material, 24);
    fundus.position.set(-0.04, 0.046, 0.004);
    group.add(fundus);
    e.group = group;
  }

  /* liver */
  {
    const { e, group, material } = makeOrgan("foie", [-0.085, 1.09, 0.017]);
    const right = ellipsoid(0.092, 0.06, 0.048, material, 36);
    right.position.set(-0.015, 0.004, 0);
    right.rotation.z = 0.14;
    right.rotation.x = -0.08;
    group.add(right);
    const left = ellipsoid(0.052, 0.036, 0.041, material, 28);
    left.position.set(0.082, 0.002, -0.004);
    left.rotation.z = -0.2;
    group.add(left);
    const lobe = ellipsoid(0.04, 0.03, 0.035, material, 20);
    lobe.position.set(-0.045, -0.035, 0.014);
    group.add(lobe);
    e.group = group;
  }

  /* gallbladder */
  {
    const { e, group, material } = makeOrgan("vesicule", [-0.14, 1.04, 0.038]);
    const sac = ellipsoid(0.017, 0.028, 0.016, material, 20);
    sac.rotation.z = 0.25;
    group.add(sac);
    const neck = taperedTube(
      [
        [0.002, 0.02, 0.002],
        [0.006, 0.045, 0.006],
        [0.012, 0.06, 0.008],
      ],
      0.005,
      material,
      6,
      12,
    );
    group.add(neck);
    e.group = group;
  }

  /* pancreas */
  {
    const { e, group, material } = makeOrgan("pancreas", [0.008, 1.075, -0.032]);
    const gland = taperedTube(
      [
        [-0.078, 0.002, 0.0],
        [-0.04, 0.014, 0.004],
        [0.0, 0.01, 0.002],
        [0.04, -0.002, -0.002],
        [0.078, 0.014, -0.008],
      ],
      (t) => 0.014 - Math.abs(t - 0.2) * 0.012,
      material,
      10,
      36,
    );
    group.add(gland);
    const head = ellipsoid(0.022, 0.025, 0.02, material, 18);
    head.position.set(-0.072, -0.006, 0.0);
    group.add(head);
    e.group = group;
  }

  /* small intestine */
  {
    const { e, group, material } = makeOrgan("intestin_grele", [0, 0.995, 0.022]);
    const pts = [];
    for (let i = 0; i <= 110; i++) {
      const t = i / 110;
      const x = 0.062 * Math.sin(t * PI * 9.4 + 0.4);
      const y = 0.065 - t * 0.14;
      const z = 0.03 * Math.cos(t * PI * 12.5) + Math.sin(t * PI * 4.2) * 0.008;
      pts.push([x, y, z]);
    }
    const coil = taperedTube(pts, 0.0105, material, 8, 180);
    group.add(coil);
    e.group = group;
  }

  /* colon */
  {
    const { e, group, material } = makeOrgan("colon", [0, 1.0, 0.005]);
    const frame = taperedTube(
      [
        [-0.055, -0.062, 0.018],
        [-0.115, -0.058, 0.012],
        [-0.132, -0.015, 0.006],
        [-0.13, 0.033, 0.004],
        [-0.105, 0.05, 0.02],
        [-0.06, 0.052, 0.033],
        [0.0, 0.054, 0.035],
        [0.06, 0.052, 0.03],
        [0.112, 0.042, 0.012],
        [0.128, 0.0, 0.004],
        [0.124, -0.048, 0.008],
        [0.09, -0.073, 0.016],
        [0.045, -0.077, 0.022],
        [0.01, -0.064, 0.012],
        [0.0, -0.075, -0.006],
      ],
      (t) => 0.0165 - t * 0.002,
      material,
      10,
      80,
    );
    group.add(frame);
    const appendix = taperedTube(
      [
        [-0.06, -0.062, 0.018],
        [-0.075, -0.085, 0.02],
        [-0.082, -0.103, 0.022],
      ],
      0.005,
      material,
      6,
      14,
    );
    group.add(appendix);
    const haustraMat = material.clone();
    haustraMat.color.set("#c99372");
    e.materials.push(haustraMat);
    for (let i = 0; i < 14; i++) {
      const t = 0.06 + (i / 14) * 0.82;
      const a = t * TAU;
      const x = Math.cos(a) * 0.122;
      const z = Math.sin(a) * 0.08;
      const y = 0.02 + Math.cos(a * 2) * 0.02;
      if (z > -0.02 && z < 0.045 && x > -0.14 && x < 0.14) {
        const bump = ellipsoid(0.008, 0.006, 0.008, haustraMat, 8);
        bump.position.set(x, y, z);
        group.add(bump);
      }
    }
    e.group = group;
  }

  /* kidneys */
  {
    const { e, group, material } = makeOrgan("reins", [0, 1.02, -0.06]);
    for (const s of [-1, 1]) {
      const kidney = ellipsoid(0.028, 0.054, 0.023, material, 28);
      kidney.position.set(s * 0.075, 0, 0);
      kidney.rotation.z = s * 0.16;
      kidney.rotation.x = -0.12;
      group.add(kidney);
      const hilum = ellipsoid(0.011, 0.022, 0.012, std("#6b2934", { roughness: 0.6 }), 14);
      hilum.position.set(s * 0.058, -0.004, 0.012);
      group.add(hilum);
      e.materials.push(hilum.material);
    }
    e.group = group;
  }

  /* ureters */
  {
    const { e, group, material } = makeOrgan("ureteres", [0, 0.955, -0.02]);
    for (const s of [-1, 1]) {
      const ureter = taperedTube(
        [
          [s * 0.065, 0.052, -0.038],
          [s * 0.05, 0.014, -0.01],
          [s * 0.024, -0.022, 0.02],
          [s * 0.012, -0.043, 0.036],
        ],
        0.0042,
        material,
        6,
        24,
      );
      group.add(ureter);
    }
    e.group = group;
  }

  /* bladder */
  {
    const { e, group, material } = makeOrgan("vessie", [0, 0.895, 0.028]);
    const bladder = ellipsoid(0.034, 0.03, 0.029, material, 26);
    group.add(bladder);
    const neck = taperedTube(
      [
        [0, -0.024, 0.004],
        [0, -0.042, 0.0],
      ],
      0.008,
      material,
      7,
      8,
    );
    group.add(neck);
    e.group = group;
  }

  /* spleen */
  {
    const { e, group, material } = makeOrgan("rate", [0.112, 1.118, -0.048]);
    const spleen = ellipsoid(0.031, 0.055, 0.025, material, 28);
    spleen.rotation.z = -0.2;
    spleen.rotation.x = 0.1;
    group.add(spleen);
    e.group = group;
  }

  /* thyroid */
  {
    const { e, group, material } = makeOrgan("thyroide", [0, 1.472, 0.03]);
    for (const s of [-1, 1]) {
      const lobe = ellipsoid(0.016, 0.028, 0.013, material, 18);
      lobe.position.set(s * 0.019, 0.002, 0);
      lobe.rotation.z = s * -0.25;
      group.add(lobe);
    }
    const isthmus = ellipsoid(0.02, 0.008, 0.01, material, 14);
    isthmus.position.set(0, -0.012, 0.002);
    group.add(isthmus);
    e.group = group;
  }

  /* adrenal glands */
  {
    const { e, group, material } = makeOrgan("surrenales", [0, 1.098, -0.055]);
    for (const s of [-1, 1]) {
      const gland = ellipsoid(0.021, 0.012, 0.016, material, 16);
      gland.position.set(s * 0.078, 0, 0);
      gland.rotation.z = s * 0.2;
      group.add(gland);
    }
    e.group = group;
  }

  return { group: root, entries };
}

/* ─────────────────────────────── assemble ─────────────────────────────── */

export function buildAnatomy() {
  const root = new THREE.Group();
  root.name = "body";

  const skin = buildSkin();
  const skeleton = buildSkeleton();
  const muscles = buildMuscles();
  const organs = buildOrgans();

  root.add(skin.group, skeleton.group, muscles.group, organs.group);

  skeleton.group.visible = false;
  muscles.group.visible = false;

  const entries = { ...organs.entries, ...skeleton.entries, ...muscles.entries };

  // collect meshes + save original material appearance
  for (const entry of Object.values(entries)) {
    entry.meshes = [];
    entry.meshBase = new Map();
    entry.group.traverse((o) => {
      if (!o.isMesh) return;
      o.userData.pickId = entry.id;
      entry.meshes.push(o);
      entry.meshBase.set(o, {
        scale: o.scale.clone(),
        position: o.position.clone(),
        rotation: o.rotation.clone(),
      });
      if (!o.material.userData.__orig) {
        const m = o.material;
        m.userData.__orig = {
          color: m.color.clone(),
          emissive: m.emissive ? m.emissive.clone() : new THREE.Color(0x000000),
          emissiveIntensity: m.emissiveIntensity ?? 0,
          opacity: m.opacity,
          transparent: m.transparent,
          depthWrite: m.depthWrite,
          roughness: m.roughness,
        };
      }
    });
  }

  return {
    root,
    skinGroup: skin.group,
    skinMaterial: skin.material,
    skeletonGroup: skeleton.group,
    musclesGroup: muscles.group,
    organsGroup: organs.group,
    entries,
  };
}
