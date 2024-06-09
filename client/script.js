// import { setBallState } from "./three.js";
let currentUser = "";
let intervalId = 0;
//------------------------------------------------------------------------------------------
$(document).ready(function () {
    $(".section").hide();
    $(".logout").hide();

    $(".closeWindow").click(function () {
        $(".loginPage").hide();
        $(".signUpPage").hide();
    });
    //------------------------------------------------------------------------------------------
    $(".login").click(function () {
        $(".loginPage").show();
    });

    $(".closeLogin").click(function () {
        fetchUserInfo();
    });

    function fetchUserInfo() {
        const userData = {
            username: $(".loginUsername").val(),
            password: $(".loginPassword").val()
        };

        $.ajax({
            url: 'http://localhost:8080/api/ball-tracker/getUserInfo',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(userData),
            success: function (data) {
                confirmLogin(data);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching user info:', error);
            }
        });
    }
    function confirmLogin(user) {
        if (user.message === "200") {
            currentUser = user.username;
            $(".loginUsername").val("");
            $(".loginPassword").val("");

            alert("Login Successful!")
            $(".loginPage").hide();
            $(".login").hide();
            $(".signUp").hide();
            $(".noteClass").hide();

            $(".section").show();
            $(".logout").show();

            setBallPosition(parseFloat(user.x), parseFloat(user.y), parseFloat(user.z));
        } else {
            alert(user.message + ": User not Found!");
        }
    }
    //------------------------------------------------------------------------------------------
    $(".signUp").click(function () {
        $(".signUpPage").show();
    });

    $(".closeSignUp").click(function () {
        alert("SignUp Successful!")

        $(".signUpPage").hide();
        $(".login").hide();
        $(".signUp").hide();
        $(".noteClass").hide();

        $(".section").show();
        $(".logout").show();
    });
    //------------------------------------------------------------------------------------------
    $(".logout").click(function () {
        clearInterval(intervalId);

        alert("User Logged Out Successfully!")
        $(".section").hide();
        $(".logout").hide();

        $(".login").show();
        $(".signUp").show();
        $(".noteClass").show();
    });
});

//-------------------------------------------------------------------------------------------

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
    ball.position.x = (Math.random() - 0.5) * 4;
    ball.position.y = (Math.random() - 0.5) * 3;
    ball.position.z = (Math.random() - 0.5) * 3;
    alert(ball.position.x + ", " + ball.position.y + ", " + "z" + ball.position.z);
}

function animate() {
    requestAnimationFrame(animate);

    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;
    ball.rotation.z += 0.01;

    renderer.render(scene, camera);
}

animate();

function setBallPosition(x, y, z) {
    ball.position.x = x;
    ball.position.y = y;
    ball.position.z = z;
    alert(ball.position.x + ", " + ball.position.y + ", " + "z" + ball.position.z);
    intervalId = setInterval(moveBallRandomly, 3000);
}