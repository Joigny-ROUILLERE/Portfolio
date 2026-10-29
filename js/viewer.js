// Visionneuse 3D : lit directement un fichier STEP (.stp) dans le navigateur.
// Librairies chargées à la demande depuis un CDN (three.js + occt-import-js).
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const OCCT_BASE = "https://cdn.jsdelivr.net/npm/occt-import-js@0.0.23/dist/";
let occtPromise = null;

function loadOcct() {
  if (occtPromise) return occtPromise;
  occtPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = OCCT_BASE + "occt-import-js.js";
    s.onload = () => window.occtimportjs({ locateFile: (f) => OCCT_BASE + f }).then(resolve, reject);
    s.onerror = () => reject(new Error("occt-import-js indisponible"));
    document.head.appendChild(s);
  });
  return occtPromise;
}

export async function mountViewer(container, stepUrl) {
  const [occt, buf] = await Promise.all([
    loadOcct(),
    fetch(stepUrl).then((r) => { if (!r.ok) throw new Error("STEP introuvable"); return r.arrayBuffer(); }),
  ]);
  const result = occt.ReadStepFile(new Uint8Array(buf), null);
  if (!result.success) throw new Error("Lecture STEP impossible");

  container.innerHTML = "";
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const group = new THREE.Group();
  for (const m of result.meshes) {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(m.attributes.position.array, 3));
    if (m.attributes.normal) g.setAttribute("normal", new THREE.Float32BufferAttribute(m.attributes.normal.array, 3));
    g.setIndex(new THREE.BufferAttribute(Uint32Array.from(m.index.array), 1));
    if (!m.attributes.normal) g.computeVertexNormals();
    const c = m.color ? new THREE.Color(m.color[0], m.color[1], m.color[2]) : new THREE.Color(0xb9bcc2);
    group.add(new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: c, metalness: 0.35, roughness: 0.45, side: THREE.DoubleSide })));
  }
  group.rotation.x = -Math.PI / 2; // CATIA : Z vers le haut → three.js : Y vers le haut
  scene.add(group);

  const box = new THREE.Box3().setFromObject(group);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  group.position.sub(center);
  const radius = Math.max(size.x, size.y, size.z) || 1;

  const camera = new THREE.PerspectiveCamera(35, 1, radius / 100, radius * 100);
  camera.position.set(radius * 1.2, radius * 0.7, radius * 1.6);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.1;
  controls.addEventListener("start", () => (controls.autoRotate = false));

  const hint = document.createElement("p");
  hint.className = "viewer-hint";
  hint.textContent = "Glisse pour tourner · molette pour zoomer";
  container.appendChild(hint);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = container;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  let raf;
  const loop = () => { controls.update(); renderer.render(scene, camera); raf = requestAnimationFrame(loop); };
  loop();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    controls.dispose();
    renderer.dispose();
    group.traverse((o) => { if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); } });
  };
}
