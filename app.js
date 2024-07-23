import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
import { FBXLoader } from "./FBXLoader.js"; // Import FBXLoader

// Variables
let rightValue = 0;
let leftValue = 0;
let forwardValue = 0;
let backwardValue = 0;
let rotationValue = 0;
let currentRotationX = 0; // Track current rotation in X-axis
let currentRotationZ = 0; // Track current rotation in Z-axis
let tempVector = new THREE.Vector3();
let upVector = new THREE.Vector3(0, 1, 0);
let joyManager;
let character, mixer, clock; // Variables to store the character, mixer, and clock

var width = window.innerWidth,
    height = window.innerHeight;

// Create a renderer and add it to the DOM.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Create the scene
var scene = new THREE.Scene();

// Add Skybox
function _AddSkybox() {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './space-posx.jpg', // Positive X
        './space-negx.jpg', // Negative X
        './space-posy.jpg', // Positive Y
        './space-negy.jpg', // Negative Y
        './space-posz.jpg', // Positive Z
        './space-negz.jpg'  // Negative Z
    ]);
    scene.background = texture;
}

_AddSkybox();

// Create a camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.z = 50; // Move the camera back to better see the scene
camera.position.y = 50;

scene.add(camera);

// Add OrbitControls so that we can pan around with the mouse.
var controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 100;
controls.minDistance = 10;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = 0;
controls.autoRotate = false;
controls.autoRotateSpeed = 0;
controls.rotateSpeed = 0.4;
controls.enableDamping = false;
controls.dampingFactor = 0.1;
controls.enableZoom = false;
controls.enablePan = false;
controls.minAzimuthAngle = -Math.PI / 2; // radians
controls.maxAzimuthAngle = Math.PI / 4; // radians

// Add axes
//var axes = new THREE.AxesHelper(50);
//scene.add(axes);

// Initialize clock
clock = new THREE.Clock();

// Add light
const ambientLight = new THREE.AmbientLight(0x0000ff); // Blue light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x0000ff, 10); // Blue light
directionalLight.position.set(10, 10, 10).normalize();
scene.add(directionalLight);

//Add light
const whitLight = new THREE.AmbientLight(0xFFFFFF); // white light
scene.add(whitLight);

const whitdirection = new THREE.DirectionalLight(0xFFFFFF, 10); // white light
directionalLight.position.set(10, 10, 10).normalize();
scene.add(whitdirection);

// Load the FBX character
const fbxLoader = new FBXLoader();
fbxLoader.load('./tbosnoframebakeanim.fbx', (object) => {
    character = object;
    character.scale.set(0.1, 0.1, 0.1); // Scale the character to fit the scene

    // Set the initial rotation of the character
    character.rotation.set(5, Math.PI / 2, 0); // Rotate 90 degrees around the Y-axis

    scene.add(character);

    // Create an AnimationMixer and load the dance animation
    mixer = new THREE.AnimationMixer(character);
    fbxLoader.load('./flymananimx.fbx', (anim) => {
        const danceAction = mixer.clipAction(anim.animations[0]);
        character.rotation.set(5, Math.PI / 2, 0);
        danceAction.loop = THREE.LoopRepeat;
        danceAction.play();
    });
});


fbxLoader.load('./rocks.fbx', (object) => {
    object = object;
   object.scale.set(0.1, 0.1, 0.1); // Scale the character to fit the scene
    object.position.set(1000, 0, 0); 
    scene.add(object);
 
  });



  

fbxLoader.load('./rocks.fbx', (object) => {
    object = object;
   object.scale.set(0.1, 0.1, 0.1); // Scale the character to fit the scene
    object.position.set(1000, 0, 500); 
    scene.add(object);
 
  });

 
 

  fbxLoader.load('./mooo.fbx', (object) => {
      
object = object;
    object.scale.set(2, 2, 2); // Scale the character to fit the scene
   object.position.set(1900, 0, -600); 
   
 
 scene.add(object);
   
  
  });

  

fbxLoader.load('./mop.fbx', (object) => {
    object = object;
   object.scale.set(0.7, 0.7, 0.7); // Scale the character to fit the scene
    object.position.set(2300, 0, -100); 
    object.rotation.set(0, Math.PI / -5, 0);
    scene.add(object);
 
  });

  

fbxLoader.load('./theway.fbx', (object) => {
    object = object;
   object.scale.set(0.1, 0.1, 0.1); // Scale the character to fit the scene
    object.position.set(0, 0, -50); 
    object.rotation.set(0, Math.PI / 37, 0);
    scene.add(object);
 
  });
 
  
// Add floor
//let size_floor = 100;
//var geometry_floor = new THREE.BoxGeometry(size_floor, 0.25, size_floor);
//var material_floor = new THREE.MeshNormalMaterial();
//var floor = new THREE.Mesh(geometry_floor, material_floor);
//floor.position.y = -5;
//floor.visible = true;
//scene.add(floor);

resize();
animate();
window.addEventListener("resize", resize);

// Add joystick + movement
addJoystick();

function resize() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
}

// Renders the scene
function animate() {
    requestAnimationFrame(animate);

    if (mixer) mixer.update(clock.getDelta()); // Update the mixer with the clock's delta time

    updatePlayer();
    renderer.render(scene, camera);
    controls.update();
}

function updatePlayer() {
    if (!character) return; // Wait until the character is loaded

    // Move the player
    const angle = controls.getAzimuthalAngle();

    if (forwardValue > 0) {
        tempVector.set(0, 0, -forwardValue).applyAxisAngle(upVector, angle);
        character.position.addScaledVector(tempVector, 2);
    }

    if (backwardValue > 0) {
        tempVector.set(0, 0, backwardValue).applyAxisAngle(upVector, angle);
        character.position.addScaledVector(tempVector, 1);
    }

    
    if (leftValue > 0) {
      tempVector.set(-leftValue, 0, 0).applyAxisAngle(upVector, angle);
      character.position.addScaledVector(tempVector, 1);
  }

  if (rightValue > 0) {
      tempVector.set(rightValue, 0, 0).applyAxisAngle(upVector, angle);
      character.position.addScaledVector(tempVector, 1);
  }

    // Rotate the player
    if (rotationValue !== 0) {
        // Rotate in X-axis (left/right)
        currentRotationX += rotationValue * 2; // Adjust rotation speed as needed
        currentRotationX = THREE.MathUtils.clamp(currentRotationX, -5, 5); // Clamp rotation to -10 to 10 degrees
        character.rotation.x = THREE.MathUtils.degToRad(currentRotationX);

        // Rotate in Z-axis (up/down)
        currentRotationZ += rotationValue * 2; // Adjust rotation speed as needed
        currentRotationZ = THREE.MathUtils.clamp(currentRotationZ, -5, 5); // Clamp rotation to -10 to 10 degrees
        character.rotation.z = THREE.MathUtils.degToRad(currentRotationZ);
    }

    character.updateMatrixWorld();
    camera.position.sub(controls.target);
    controls.target.copy(character.position);
    camera.position.add(character.position.sub(new THREE.Vector3(0, 0, 0)));
}

function addJoystick() {
    const options = {
        zone: document.getElementById("joystickWrapper1"),
        size: 120,
        multitouch: true,
        maxNumberOfNipples: 2,
        mode: "static",
        restJoystick: true,
        shape: "circle",
        position: { top: "60px", left: "60px" },
        dynamicPage: true,
    };

    joyManager = nipplejs.create(options);

    joyManager["0"].on("move", function (evt, data) {
        const forward = data.vector.y;
        const turn = data.vector.x;

        if (forward > 0) {
            forwardValue = Math.abs(forward);
            backwardValue = 0;
        } else if (forward < 0) {
            forwardValue = 0;
            backwardValue = Math.abs(forward);
        }

        if (turn > 0) {
          leftValue = 0;
          rightValue = Math.abs(turn);
      } else if (turn < 0) {
          leftValue = Math.abs(turn);
          rightValue = 0;
      }

        rotationValue = turn;
    });

    joyManager["0"].on("end", function (evt) {
        forwardValue = 0;
        backwardValue = 0;
        leftValue = 0;
        rightValue = 0;
        rotationValue = 0;
        currentRotationX = 0;
        currentRotationZ = 0;
        
    });
}
