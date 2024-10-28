import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import "./style.css";

// Instanciem el loader de models GLTF
const loader = new GLTFLoader();
const rotationSpeed = 0.001;
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

//camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 50, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

//render
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

// controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

// Cargar el HDRI y establecer como fondo
const pmremGenerator = new THREE.PMREMGenerator( renderer );
        const hdriLoader = new RGBELoader()
        hdriLoader.load("hdri/space.hdr", function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = texture;
            scene.environment = texture;
        });
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 2;
        renderer.outputEncoding = THREE.sRGBEncodig;

// array d’objectes dels quals hem d’actualitzar la rotació.
  const objects = [];

// objecte 3d buid que serà el pare de la resta
  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);

// emprarem una mateixa esfera per a tots.
  const radius = 1;
  const widthSegments = 6;
  const heightSegments = 6;
  const sphereGeometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  );

// Crear un plano para el suelo
  const planeGeometry = new THREE.PlaneGeometry(100, 100);
  const planeMaterial = new THREE.MeshPhongMaterial({color: 0x444444,})
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -5; 
  plane.receiveShadow = true; 
  scene.add(plane);

// sol amb un material emisiu
  const sunMaterial = new THREE.MeshStandardMaterial({ emissive: 0xffff00 });
  const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
  sun.scale.set(8, 8, 8); 

// Pokemon que farà de sol
  let HaunterSun = null;
  loadModel(
    "Models/Haunter/scene.gltf",
    HaunterSun,
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(500, 500, 500),
    solarSystem
  );

// punt de llum al centre
  const color = 0xffffff;
  const intensity = 1000;
  const light = new THREE.PointLight(color, intensity);
  solarSystem.add(light);

// objecte buid que contindrà la terra i els seus estelits
  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 10;
  solarSystem.add(earthOrbit);
  objects.push(earthOrbit);

// colo blau lleugerament emisiu. vora el sol
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x002855,
    emissive: 0x112244,
  });
  const earth = new THREE.Mesh(sphereGeometry, earthMaterial);
  earthOrbit.add(earth);

// objecte buid que rotarà la lluna i els seus fulls ( si en tengués )
  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 2;
  earthOrbit.add(moonOrbit);
  objects.push(moonOrbit);

// lluna lleugerament emisiva vora la terra
  const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222,
  });
  const moon = new THREE.Mesh(sphereGeometry, moonMaterial);
  moon.scale.set(0.5, 0.5, 0.5);
  moonOrbit.add(moon);

// objecte buid que contindrà El mon de Zelda i els seus satelits
  const MajoraOrbit = new THREE.Object3D();
  MajoraOrbit.position.z = 15;
  MajoraOrbit.position.x = 15;
  solarSystem.add(MajoraOrbit);
  objects.push(MajoraOrbit);

// Majora com a planeta
let skullPlanet = null;
loadModel(
  "Models/MAJORA/scene.gltf",
  skullPlanet,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(90, 90, 90),
  MajoraOrbit
);

// objecte buid que rotarà la lluna calavera
const SkullOrbit = new THREE.Object3D();
SkullOrbit.position.x = 2.5;
MajoraOrbit.add(SkullOrbit);
objects.push(SkullOrbit);

// model de calavera que farà de lluna
let skullZelda = null;
loadModel(
  "Models/Skull/scene.gltf",
  skullZelda,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(20, 20,  20),
  SkullOrbit
);

// objecte buid que rotarà la lluna terrorifica
const SkullOrbit2 = new THREE.Object3D();
SkullOrbit2.position.z = 3.5;
MajoraOrbit.add(SkullOrbit2);
objects.push(SkullOrbit2);

// model de lluna terrorifica
let MoonMajora = null;
loadModel(
  "Models/moon/scene.gltf",
  MoonMajora,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, 60, 60),
  SkullOrbit2
);

// objeto buid que contindrà el Planeta de Metroid
const planetMOrbit = new THREE.Object3D();
planetMOrbit.position.x = 20;
planetMOrbit.position.z = -10;
solarSystem.add(planetMOrbit);
objects.push(planetMOrbit);

// model de Planet1
let Metroid = null;
loadModel(
  "Models/Metroid/scene.gltf",
  Metroid,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(90, 90, 90),
  planetMOrbit
);

// objeto buid que contindrà el Planeta de Luigi
const LuigiOrbit = new THREE.Object3D();
LuigiOrbit.position.x = 30;
solarSystem.add(LuigiOrbit);
objects.push(LuigiOrbit);

// model de Planet2
let KingBoo = null;
loadModel(
  "Models/KBoo/scene.gltf",
  KingBoo,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(110, 110, 110), // Escala del planeta
  LuigiOrbit
);

// Afegir lluna al Planeta de Luigi
const satelliteOrbit = new THREE.Object3D();
satelliteOrbit.position.x = 3;
LuigiOrbit.add(satelliteOrbit);
objects.push(satelliteOrbit);

// model de la lluna boo
let Boo = null;
loadModel(
  "Models/Boo/scene.gltf", 
  Boo,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(70, 70, 70),
  satelliteOrbit
);

//planeta textures 1
    // Crear un objeto vacío para la órbita del nuevo planeta
    const newPlanetOrbit = new THREE.Object3D();
    solarSystem.add(newPlanetOrbit);
    objects.push(newPlanetOrbit);

    // Añadir un nuevo planeta con texturas normal y diffuse
    const planetTexture = textureLoader.load('textura/terradiff.jpg');
    const normalTexture = textureLoader.load('textura/terranorm.jpg');
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: planetTexture, normalMap: normalTexture 
    });
    // Crea la geometría del planeta
    const planetGeometry = new THREE.SphereGeometry(2, 16, 16);
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.castShadow = true; 
    planet.receiveShadow = true;

    // Posiciona el planeta en la órbita
    planet.position.set(35, 0, 0);
    newPlanetOrbit.add(planet);

//planeta textures 2
    // Crear un objeto vacío para la órbita del nuevo planeta
    const newPlanetOrbit2 = new THREE.Object3D();
    solarSystem.add(newPlanetOrbit2);
    objects.push(newPlanetOrbit2);

    // Añadir un nuevo planeta con texturas normal y diffuse
    const planetTexture2 = textureLoader.load('textura/terra2diff.jpg');
    const normalTexture2 = textureLoader.load('textura/terra2norm.jpg');
    const planetMaterial2 = new THREE.MeshStandardMaterial({
      map: planetTexture2, normalMap: normalTexture2 
    });
    // Crea la geometría del planeta
    const planetGeometry2 = new THREE.SphereGeometry(2, 16, 16);
    const planet2 = new THREE.Mesh(planetGeometry2, planetMaterial2);

    // Posiciona el planeta en la órbita
    planet2.position.set(40, 0, 0);
    newPlanetOrbit2.add(planet2);


// directional light
const dirlight = new THREE.DirectionalLight(0xffffff, 3);
dirlight.position.set(-1, 2, 4);
scene.add(dirlight);

// ambient light
const ambiLight = new THREE.AmbientLight(0x808080, 2.5);
scene.add(ambiLight);

//Funcio Animacio
let time = Date.now();
function animate() {
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  objects.forEach((obj) => {
    if (obj != null) obj.rotation.y += rotationSpeed * deltaTime;
  });

  // Rotar la órbita del nuevo planeta
  newPlanetOrbit.rotation.y += rotationSpeed * deltaTime * 0.2;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

function loadModel(path, object3dRef, position, scale, systemToAdd) {
  loader.load(
    path,
    function (gltf) {
      object3dRef = gltf.scene;
      object3dRef.position.set(position.x, position.y, position.z);
      object3dRef.scale.set(scale.x, scale.y, scale.z);
      systemToAdd.add(object3dRef);
      objects.push(object3dRef);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error(error);
    }
  );
}

// No he sabut fer les ombres