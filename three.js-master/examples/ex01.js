import * as THREE from '../build/three.module.js';

function main() {
    const scene = new THREE.Scene();

    const fov = 75;
    const aspect =2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspoectiveCamera(fov, aspect, near, far);
    camera.postion.z =2;

    const boxWidth =1;
    const boxHeight =1;
    const boxDepth =1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    renderer.render(scene, camera);
}

main();