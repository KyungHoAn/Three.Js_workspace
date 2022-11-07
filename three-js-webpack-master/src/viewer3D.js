import * as THREE from 'three';
import { Texture } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {GUI} from 'three/examples/jsm/libs/dat.gui.module';
import {WEBGL} from './webgl'

if(WEBGL.isWebGLAvailable()){
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)
    const TRAY = document.getElementById('js-tray-slide');
    const canvas = document.querySelector('#ex-03')

    const clock = new THREE.Clock()
    const gui = new GUI()

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true})
    let autoE = false
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    document.body.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    function setCamera() {
        camera.position.set(10,5,17)
        controls.enableDamping = true
        // controls.minDistance = 1
        controls.maxDistance = 10
        controls.update()
    }
    setCamera()

    const loader = new GLTFLoader()
    // const vaz = await loader.loadAsync('./vaz/scene.gltf')
    // const vaz = await loader.loadAsync('../vaz/vaz-2105.glb')
    let theModel
    loader.load('../vaz/vaz-2105.gltf',function(gltf) {
        theModel = gltf.scene
        theModel.traverse((o) => {
            if(o.isMesh) {
                o.castShadow = true
                o.receiveShadow = true
            }
        })

        for(let object of inital_map) {
            initColor(theModel, object.childID, object.mtl)
        }

        scene.add(theModel);
    },undefined, function(error) {
        console.log(error)
    })
    scene.add(theModel)

    const inital_mtl = new THREE.MeshPhongMaterial({color:0xf1f1f1, shininess: 10})
    const inital_map = [
        {childID:"back", mtl: inital_mtl},
        {childID:"base", mtl: inital_mtl},
        {childID:"cushions", mtl:inital_mtl},
        {childID:"legs", mtl:inital_mtl},
        {childID:"supports",mtl:inital_mtl},
    ]

    function initColor(parent, type, mtl) {
        parent.traverse((o)=> {
            if(o.isMesh) {
                if(o.name.includes(type)) {
                    o.material = mtl
                    o.nameID = type
                }
            }
        });
    }
    
    // let ambientLight = new THREE.AmbientLight(0xffffff,1)
    // scene.add(ambientLight)
    let hemiLight = new THREE.HemisphereLight(0xffffff,0xffffff,0.61)
    hemiLight.position.set(0,50,0);
    scene.add(hemiLight)

    let dirLight = new THREE.DirectionalLight(0xffffff,0.54)
    dirLight.position.set(-8,12,8)
    dirLight.castShadow = true
    dirLight.shadow.mapSize = new THREE.Vector2(1024,1024)
    scene.add(dirLight)

    const background_color = 0xf1f1f1
    scene.background = new THREE.Color(background_color);
    scene.fog = new THREE.Fog(background_color,20,100)

    //Floor
    let floorGeometry = new THREE.PlaneGeometry(5000,5000,1,1)
    let floorMaterial = new THREE.MeshPhongMaterial({
        color: 0xeeeeee,
        shininess:0
    })

    let floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -0.5*Math.PI
    floor.receiveShadow = true
    floor.position.y = -1
    scene.add(floor)

    const colors = [ { color: '66533C' }, { color: '173A2F' }, { color: '153944' }, { color: '27548D' }, { color: '438AAC' } ]


    function buildColors(colors) {
        for (let [i, color] of colors.entries()) {
          let swatch = document.createElement('div');
          swatch.classList.add('tray__swatch');
          swatch.style.background = "#" + color.color;
          swatch.setAttribute('data-key', i);
          TRAY.append(swatch);
        }
      }
      buildColors(colors);
    
    function animate() {
        requestAnimationFrame(animate)
        // vaz.scene.children[0].rotation.z += 0.001
        // console.log(camera.position)
        // console.log(camera.rotation)
        renderer.render(scene, camera)
    }        
    animate()

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onWindowResize)

} else {
    var warning = WEBGL.getWebGLErrorMessage()
    document.body.appendChild(warning)
}