// Create a scene
const scene = new THREE.Scene();

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

// Create a canvas to draw the text
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
const context = canvas.getContext('2d');

// Draw text on the canvas
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

// Create a texture from the canvas
const texture = new THREE.CanvasTexture(canvas);

// Create a material with the texture
const material = new THREE.MeshPhongMaterial({ map: texture, shininess: 100 });

// Create a geometry for the ball (radius, widthSegments, heightSegments)
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Create a mesh
const ball = new THREE.Mesh(geometry, material);

// Add the mesh to the scene
scene.add(ball);

// Add a light to make the ball more visible
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Optionally, add ambient light to softly illuminate all objects in the scene
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// Function to move the ball to a random position
function moveBallRandomly() {
    ball.position.x = (Math.random() - 0.5) * 2; // Random position between -5 and 5
    ball.position.y = (Math.random() - 0.5) * 2; // Random position between -5 and 5
    ball.position.z = (Math.random() - 0.5) * 2; // Random position between -5 and 5
}

// Set an interval to move the ball every 3 seconds
setInterval(moveBallRandomly, 3000);

// Render the scene
function animate() {
    requestAnimationFrame(animate);

    // Rotate the ball
    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;

    // Render the scene with the camera
    renderer.render(scene, camera);
}

animate();
