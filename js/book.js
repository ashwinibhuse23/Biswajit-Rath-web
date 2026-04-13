const container = document.getElementById('book-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);

// --- FIX 1: HIGH DPI RENDERER ---
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio); // This makes it sharp on Retina/4K screens
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();

// --- FIX 2: TEXTURE FILTERING ---
// This function applies sharpness settings to your images once they load
const optimizeTexture = (texture) => {
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); // Sharpness at angles
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
};

const frontCover = loader.load('./assets/Book/frontbook.jpeg', optimizeTexture);
const backCover = loader.load('./assets/Book/Back2.jpeg', optimizeTexture);
const sideCover = loader.load('./assets/Book/slidebook.png', optimizeTexture); // This is your spine

const pageColor = new THREE.MeshPhongMaterial({ color: 0xffffff }); // White for top, bottom, and right edges

const geometry = new THREE.BoxGeometry(3.5, 5, 1);
const materials = [
    pageColor,                                          // 1. Right (+x) - The "pages" edge
    new THREE.MeshPhongMaterial({ map: sideCover }),    // 2. Left (-x) - THE SPINE IMAGE
    pageColor,                                          // 3. Top (+y) - The "pages" edge
    pageColor,                                          // 4. Bottom (-y) - The "pages" edge
    new THREE.MeshPhongMaterial({ map: frontCover }),   // 5. Front (+z) - The Front Cover
    new THREE.MeshPhongMaterial({ map: backCover })     // 6. Back (-z) - The Back Cover
];

const book = new THREE.Mesh(geometry, materials);
scene.add(book);

// Lighting setup to highlight "Humanizing AI" themes [cite: 4, 53]
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Increased intensity
scene.add(ambientLight);

const light = new THREE.PointLight(0xffffff, 0.8);
light.position.set(10, 10, 10);
scene.add(light);

camera.position.z = 8; // Moved camera slightly closer for detail

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.5; // Slightly slower for better readability

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});