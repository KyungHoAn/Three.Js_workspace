import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer';
import { WEBGL } from './webgl';

if(WEBGL.isWebGLAvailable()) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)

    let renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.clear = true;
    // renderer.depthTest = true;
    document.body.appendChild(renderer.domElement);

    // scene 2
    const scene2 = new THREE.Scene();
    const cam2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // cam2.lookAt(0,0,0);
    cam2.position.set(-10,0,60);
    let renderer2 = new THREE.WebGLRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer2.domElement)

    const geometry = new THREE.BoxGeometry(10,10,10);
    const material = new THREE.MeshBasicMaterial({ color:0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    // cube.lookAt(cam2.position)
    scene2.add(cube);
    console.log(scene)

    let el = document.createElement('div');
    el.innerHTML = "<h1>Hello CSS3D</h1>" + "<input type=text/>"+"<button> click </button>";
    let obj = new CSS3DObject(el);
    obj.position.set(-300,0,-1000);
    // obj.lookAt(camera.position);
    obj.rotation.y += Math.PI / 4;
    scene.add(obj);

    function animate() {
        renderer.render(scene,camera);
        cube.rotation.y += .02
        cube.rotation.z += .01
        renderer2.render(scene2,cam2);
        requestAnimationFrame(animate);
    }
    animate()

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize',onWindowResize);
} else {
    let warning = WEBGL.getWebGLErrorMessage()
    document.body.appendChild(warning)
}