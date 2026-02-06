import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

const canvas = document.querySelector("#room-canvas");
const app = document.querySelector("#app");
const toggleButton = document.querySelector("#toggle-light");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0f14);
scene.fog = new THREE.Fog(0x0b0f14, 10, 25);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50);
camera.position.set(0, 1.6, 4.2);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0";
labelRenderer.domElement.style.pointerEvents = "none";
app.appendChild(labelRenderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.minDistance = 2.2;
controls.maxDistance = 6;
controls.minPolarAngle = Math.PI / 2 - 0.5;
controls.maxPolarAngle = Math.PI / 2 + 0.5;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
keyLight.position.set(4, 6, 2);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x88aaff, 0.4);
fillLight.position.set(-4, 3, -2);
scene.add(fillLight);

const roomMaterial = new THREE.MeshStandardMaterial({
  color: 0x111720,
  side: THREE.BackSide,
  roughness: 0.9,
});
const room = new THREE.Mesh(new THREE.BoxGeometry(12, 6, 12), roomMaterial);
scene.add(room);

const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x0f141a,
  roughness: 0.8,
});
const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.8;
floor.receiveShadow = true;
scene.add(floor);

const deskGroup = new THREE.Group();
const deskTop = new THREE.Mesh(
  new THREE.BoxGeometry(2.8, 0.12, 1.2),
  new THREE.MeshStandardMaterial({ color: 0x202833, roughness: 0.4 })
);
deskTop.position.set(0, -0.4, -1);
deskTop.castShadow = true;
deskTop.receiveShadow = true;
deskGroup.add(deskTop);

const legMaterial = new THREE.MeshStandardMaterial({ color: 0x151b22, roughness: 0.6 });
[-1.2, 1.2].forEach((x) => {
  const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.2, 0.12), legMaterial);
  leg.position.set(x, -1.05, -0.45);
  leg.castShadow = true;
  deskGroup.add(leg);
});
[-1.2, 1.2].forEach((x) => {
  const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.2, 0.12), legMaterial);
  leg.position.set(x, -1.05, -1.55);
  leg.castShadow = true;
  deskGroup.add(leg);
});
scene.add(deskGroup);

const keyboard = new THREE.Mesh(
  new THREE.BoxGeometry(1.4, 0.06, 0.4),
  new THREE.MeshStandardMaterial({ color: 0x0f141a, roughness: 0.7 })
);
keyboard.position.set(0, -0.32, -0.8);
keyboard.castShadow = true;
scene.add(keyboard);

const mouse = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.12, 0.2, 6, 12),
  new THREE.MeshStandardMaterial({ color: 0x121820, roughness: 0.5 })
);
mouse.position.set(0.8, -0.3, -0.7);
mouse.rotation.x = Math.PI / 2;
mouse.castShadow = true;
scene.add(mouse);

const monitorGroup = new THREE.Group();
const monitorBody = new THREE.Mesh(
  new THREE.BoxGeometry(1.4, 0.85, 0.08),
  new THREE.MeshStandardMaterial({ color: 0x151b22, roughness: 0.3 })
);
monitorBody.castShadow = true;
monitorBody.position.set(0, 0.2, -1.25);
monitorGroup.add(monitorBody);

const screenMaterial = new THREE.MeshStandardMaterial({
  color: 0x0d1117,
  emissive: 0x0b203a,
  emissiveIntensity: 1.4,
});
const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.65), screenMaterial);
screen.position.set(0, 0.2, -1.21);
monitorGroup.add(screen);

const stand = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 0.35, 0.2),
  new THREE.MeshStandardMaterial({ color: 0x151b22, roughness: 0.4 })
);
stand.position.set(0, -0.2, -1.25);
stand.castShadow = true;
monitorGroup.add(stand);

const standBase = new THREE.Mesh(
  new THREE.BoxGeometry(0.6, 0.05, 0.4),
  new THREE.MeshStandardMaterial({ color: 0x11161d, roughness: 0.5 })
);
standBase.position.set(0, -0.38, -1.25);
standBase.castShadow = true;
monitorGroup.add(standBase);

scene.add(monitorGroup);

const shelf = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.08, 0.3),
  new THREE.MeshStandardMaterial({ color: 0x1b222c, roughness: 0.6 })
);
shelf.position.set(-2.5, 1.2, -4.5);
shelf.castShadow = true;
scene.add(shelf);

const shelfDecor = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 0.5, 0.3),
  new THREE.MeshStandardMaterial({ color: 0x2a3340, roughness: 0.5 })
);
shelfDecor.position.set(-2.2, 1.5, -4.4);
scene.add(shelfDecor);

const screenContent = document.createElement("div");
screenContent.className = "screen-overlay";
screenContent.innerHTML = `
  <h2>Hi, I’m Taylor Lee</h2>
  <p>Creative Developer · WebGL · 3D Experiences</p>
  <p>
    <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a> ·
    <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
  </p>
  <p>Projects: Immersive portfolio · Data viz · Product launches</p>
`;

const screenLabel = new CSS2DObject(screenContent);
screenLabel.position.set(0, 0.5, 0.02);
screen.add(screenLabel);

const interactiveMeshes = [monitorBody, screen];
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let isHovering = false;

const focusState = {
  active: false,
  targetPosition: new THREE.Vector3(),
  targetLookAt: new THREE.Vector3(),
};

const defaultCameraPosition = camera.position.clone();
const defaultTarget = new THREE.Vector3(0, 0.4, -1.4);
controls.target.copy(defaultTarget);

function setFocus(position, lookAt) {
  focusState.active = true;
  focusState.targetPosition.copy(position);
  focusState.targetLookAt.copy(lookAt);
}

function clearFocus() {
  focusState.active = false;
}

function onPointerMove(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function onPointerClick() {
  if (isHovering) {
    setFocus(new THREE.Vector3(0, 1.2, 1.4), new THREE.Vector3(0, 0.2, -1.25));
  } else {
    clearFocus();
  }
}

canvas.addEventListener("pointermove", onPointerMove);
canvas.addEventListener("pointerdown", onPointerClick);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
});

let isDay = true;

toggleButton.addEventListener("click", () => {
  isDay = !isDay;
  ambientLight.intensity = isDay ? 0.6 : 0.25;
  keyLight.intensity = isDay ? 1.1 : 0.5;
  fillLight.intensity = isDay ? 0.4 : 0.2;
  roomMaterial.color.set(isDay ? 0x111720 : 0x0a0f14);
  scene.background.set(isDay ? 0x0b0f14 : 0x05070a);
});

const clock = new THREE.Clock();

function animate() {
  const elapsed = clock.getElapsedTime();
  const drift = new THREE.Vector3(Math.sin(elapsed * 0.2) * 0.15, 0, Math.cos(elapsed * 0.2) * 0.1);

  raycaster.setFromCamera(pointer, camera);
  const intersections = raycaster.intersectObjects(interactiveMeshes);
  isHovering = intersections.length > 0;
  document.body.style.cursor = isHovering ? "pointer" : "grab";

  if (focusState.active) {
    camera.position.lerp(focusState.targetPosition, 0.06);
    controls.target.lerp(focusState.targetLookAt, 0.06);
  } else {
    camera.position.lerp(defaultCameraPosition, 0.03);
    controls.target.lerp(defaultTarget.clone().add(drift), 0.04);
  }

  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// Note: Replace these primitive meshes with real models or textures as needed.
// You can swap the monitor content by editing the HTML in screenContent above.
