import * as THREE from 'three'
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  
  //장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  //카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);  
  camera.position.z = 3;

  //캔버스
  const canvas = document.querySelector('#ex-03');
  
  //렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha : true,       //투명도
    antialias : true    //매끄럽게
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  //빛
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 2, 12);
  scene.add(pointLight);    //MeshBasicmaterial사용시 빛 변화 x
  

  //텍스터 추가
  const textureLoader = new THREE.TextureLoader();
  const textrueBaseColor = textureLoader.load('../static/img/Skin_Lizard_002_basecolor.jpg');
  const textrueNormalMap = textureLoader.load('../static/img/Skin_Lizard_002_ambientOcclusion.jpg');
  const textrueheight = textureLoader.load('../static/img/Skin_Lizard_002_height.png');
  const textrueroughness = textureLoader.load('../static/img/Skin_Lizard_002_roughness.jpg');
  const textrueambientOcclusion = textureLoader.load('../static/img/Skin_Lizard_002_ambientOcclusion.jpg');

    //도형
    // const geometry = new THREE.PlaneGeometry(1,1);
    const geometry = new THREE.SphereGeometry( 0.3, 32, 16 );
    const material01 = new THREE.MeshBasicMaterial( { 
        map : textrueBaseColor
    } );
    const obj01 = new THREE.Mesh( geometry, material01 );
    obj01.position.x = -2
    scene.add( obj01 );

    const material02 = new THREE.MeshBasicMaterial( {
        map : textrueBaseColor,
        normalMap : textrueNormalMap
     } );
    const obj02 = new THREE.Mesh( geometry, material02 );
    obj02.position.x = -1
    scene.add( obj02 );

    const material03 = new THREE.MeshBasicMaterial( { 
        map : textrueBaseColor,
        normalMap : textrueNormalMap,
        displacementMap : textrueheight,
        displacementScale : 0.02
     } );
    const obj03 = new THREE.Mesh( geometry, material03 );
    obj03.position.x = 0
    scene.add( obj03 );

    const material04 = new THREE.MeshBasicMaterial( { 
        map : textrueBaseColor,
        normalMap : textrueNormalMap,
        displacementMap : textrueheight,
        displacementScale : 0.02,
        roughnessMap : textrueroughness,
        roughness:0.8
     } );
    const obj04 = new THREE.Mesh( geometry, material04 );
    obj04.position.x = 1
    scene.add( obj04 );

    const material05 = new THREE.MeshBasicMaterial( { color: 0xaaaeee } );
    const obj05 = new THREE.Mesh( geometry, material05 );
    obj05.position.x = 2
    scene.add( obj05 );



  // renderer.render(scene, camera);
  function render(time) {
    time *= 0.0005;  // convert time to seconds
   
    obj01.rotation.y = time;
    obj02.rotation.y = time;
    obj03.rotation.y = time;
    obj04.rotation.y = time;
    obj05.rotation.y = time;
   
    renderer.render(scene, camera);
   
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // 반응형 처리
  function onWindowResize(){
    camera.aspect = wondow.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
