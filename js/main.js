import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
antialias: true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document.body.appendChild(
renderer.domElement
);

// SUN

const light = new THREE.DirectionalLight(
0xffffff,
2
);

light.position.set(
50,
100,
50
);

scene.add(light);

scene.add(
new THREE.AmbientLight(
0xffffff,
0.7
)
);

// GROUND

const ground = new THREE.Mesh(
new THREE.PlaneGeometry(
500,
500
),
new THREE.MeshStandardMaterial({
color:0x3fa34d
})
);

ground.rotation.x = -Math.PI / 2;

scene.add(ground);

// PLAYER

const player = new THREE.Mesh(
new THREE.BoxGeometry(
2,
2,
2
),
new THREE.MeshStandardMaterial({
color:0x3399ff
})
);

player.position.y = 1;

scene.add(player);

camera.position.set(
0,
8,
12
);

const keys = {};

window.addEventListener(
'keydown',
e => keys[e.key.toLowerCase()] = true
);

window.addEventListener(
'keyup',
e => keys[e.key.toLowerCase()] = false
);

// TREES

for(let i = 0; i < 150; i++){

const tree = new THREE.Mesh(
new THREE.ConeGeometry(
2,
6,
8
),
new THREE.MeshStandardMaterial({
color:0x1c7d2d
})
);

tree.position.set(
(Math.random()-0.5)*200,
3,
(Math.random()-0.5)*200
);

scene.add(tree);
}

function animate(){

requestAnimationFrame(
animate
);

const speed = 0.2;

if(keys['w']) player.position.z -= speed;
if(keys['s']) player.position.z += speed;
if(keys['a']) player.position.x -= speed;
if(keys['d']) player.position.x += speed;

camera.position.x = player.position.x;
camera.position.z = player.position.z + 12;

camera.lookAt(
player.position
);

renderer.render(
scene,
camera
);
}

animate();
