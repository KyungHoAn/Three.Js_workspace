import * as THREE from 'three';
import { Texture } from 'three';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

import {WEBGL} from './webgl'

if(WEBGL.isWebGLAvailable()){
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x696969);

    const fov = 10;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far =1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    const canvas = document.querySelector('#ex-03');

    camera.position.x = 1;
    camera.position.y =1.5;
    camera.position.z = 1.8;
    camera.lookAt(new THREE.Vector3(0,0,0));

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias : Texture
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0,20,100);
    controls.maxDistance = 30;
    controls.update();

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(10,10,10);
    scene.add(spotLight);

    const spotLightHelper =  new THREE.SpotLightHelper(spotLight);
    scene.add(spotLightHelper);

    const geometry = new THREE.BoxGeometry(1,1,1);   //Box
    //const geometry = new THREE.CircleGeometry(2,32);    //Circle
    // const geometry = new THREE.TorusKnotGeometry(10,3,100,16);
    // const material = new THREE.MeshPhongMaterial({color:0xfff0f5});
    const material = new THREE.MeshPhysicalMaterial({
        //flatShading: true,
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        ior: 1.5,
        //thickness: 0.001,
        //envMap: renderTarget.texture,
        envMapIntensity: 1,
        reflectivity: 1,
        transmission: 1,
        specularIntensity: 1,
        specularTint: 0xffffff,
        opacity: 1,
        side: THREE.DoubleSide,
        transparent: true
    });
    
    const cube = new THREE.Mesh(geometry, material);
    cube.rotation.y=0.5;
    scene.add(cube);

    function render(time){

        cube.rotation.y+=0.005;
        cube.rotation.x+=0.005;       

        controls.update();

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

} else {
    var warning = WEBGL.getWebGLErrorMessage()
    document.body.appendChild(warning)
}