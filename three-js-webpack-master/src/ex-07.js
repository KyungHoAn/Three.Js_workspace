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
  const fov = 80;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 600;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);  
//   camera.position.z = 3;
    camera.position.set(0,0.1);

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


    //도형
  const geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
  const material = new THREE.MeshStandardMaterial({
    color: 0xFF7F00
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.y=0.5;
  scene.add(cube);

  //바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30,30,1,1);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xeeeeee
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5*Math.PI;
  plane.position.y = -0.5;
  plane.add(plane);




  // renderer.render(scene, camera);
  function render(time) {
    time *= 0.0005;  // convert time to seconds
   
    // obj01.rotation.y = time;
   
    renderer.render(scene, camera);
   
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // 반응형 처리
  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
