const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(1350, 535);
document.getElementById("section").appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
const context = canvas.getContext('2d');

context.fillStyle = 'blue';
context.fillRect(0, 0, canvas.width, canvas.height);
context.font = '48px Arial';
context.fillStyle = 'white';
context.textAlign = 'center';
context.fillText('-------------------------------------------', canvas.width / 3, canvas.height / 1.2);
context.fillText('-------------------------------------------', canvas.width / 3, canvas.height / 1.5);
context.fillText('-------------------------------------------', canvas.width / 3, canvas.height / 2);
context.fillText('-------------------------------------------', canvas.width / 3, canvas.height / 3);
context.fillText('-------------------------------------------', canvas.width / 3, canvas.height / 5);

const texture = new THREE.CanvasTexture(canvas);

const material = new THREE.MeshPhongMaterial({ map: texture, shininess: 100 });

const geometry = new THREE.SphereGeometry(1, 32, 32);

const ball = new THREE.Mesh(geometry, material);

scene.add(ball);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

function moveBallRandomly() {
    ball.position.x = (Math.random() - 0.5) * 2;
    ball.position.y = (Math.random() - 0.5) * 2;
    ball.position.z = (Math.random() - 0.5) * 2;
}

setInterval(moveBallRandomly, 3000);

function animate() {
    requestAnimationFrame(animate);

    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;
    ball.rotation.z += 0.01;

    renderer.render(scene, camera);
}

animate();
