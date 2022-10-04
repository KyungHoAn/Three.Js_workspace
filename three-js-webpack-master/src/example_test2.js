import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {WEBGL} from './webgl'

class App {
    constructor() {
        if(WEBGL.isWebGLAvailable()){
            const divContainer = document.querySelector("#ex-03");
            this._divContainer = divContainer;
    
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            divContainer.appendChild(renderer.domElement);
    
            this._renderer = renderer;
    
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x696969);
            this._scene = scene;

            this._setupCamera();
            this._setupLight();
            // this._setupBackground();
            //this._setupModel();
            this._setupControls();
    
            window.onresize = this.resize.bind(this);
            this.resize();
    
            requestAnimationFrame(this.render.bind(this));
        } else{
            var warning = WEBGL.getWebGLErrorMessage()
            document.body.appendChild(warning)
        }
    }

    _setupControls() {
        new OrbitControls(this._camera, this._divContainer);
    }

    // _setupBackground() {
        // scene.background = new THREE.Color(0x696969);    
        // const loader = new THREE.TextureLoader();
        // loader.load("./data/christmas_photo_studio_04.jpg", texture => {
        //     const renderTarget = new THREE.WebGLCubeRenderTarget(texture.image.height);
        //     renderTarget.fromEquirectangularTexture(this._renderer, texture);
        //     this._scene.background = renderTarget.texture;
        //     this._setupModel();
        // });
    // }

    _setupModel() {
        const sphereRenderTarget = new THREE.WebGLCubeRenderTarget(1024, {
            format: THREE.RGBFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter
        });
        sphereRenderTarget._pmremGen = new THREE.PMREMGenerator(this._renderer);
        const sphereCamera = new THREE.CubeCamera(0.01, 10, sphereRenderTarget);
        const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const sphereMaterial = new THREE.MeshPhysicalMaterial({
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

        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.add(sphereCamera);
        this._scene.add(sphere);
        this._sphere = sphere;

        const cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.2, 1.5, 32);
        const cylinderMaterial = new THREE.MeshNormalMaterial();
        const cylinderPivot = new THREE.Object3D();
        for(let degree=0; degree<=360; degree+=30) {
            const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
            const radian = THREE.Math.degToRad(degree);
            cylinder.position.set(2*Math.sin(radian), 0, 2*Math.cos(radian));
            cylinderPivot.add(cylinder);
        }
        this._scene.add(cylinderPivot);
        this._cylinderPivot = cylinderPivot;
    }

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            100
        );

        camera.position.set(0, 4, 5);
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }

    update(time) {
        time *= 0.001; // second unit

        if(this._sphere) {
            this._sphere.visible = false;

            const cubeCamera = this._sphere.children[0];
            cubeCamera.update(this._renderer, this._scene);
            const renderTarget = cubeCamera.renderTarget._pmremGen.fromCubemap(
                cubeCamera.renderTarget.texture);
            this._sphere.material.envMap = renderTarget.texture;
            this._sphere.visible = true;
        }

        if(this._cylinderPivot) {
            this._cylinderPivot.rotation.y = Math.sin(time);
        }

    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);

        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }
}

window.onload = function () {
    new App();
}