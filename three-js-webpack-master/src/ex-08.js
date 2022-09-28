import * as THREE from 'three'
import { Curve, RectAreaLight } from 'three';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  
  //장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  //카메라
  const fov = 150;
  const aspect = window.innerWidth / window.innerHeight;  //종횡비 - 가로 세로 비율
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);  
//   camera.position.z = 3;
    // camera.position.set(0,0.1);
    camera.position.x = 0;
    camera.position.y = 1;
    camera.position.z = 1.8;
    camera.lookAt(new THREE.Vector3(0,0,0));

  //캔버스
  // const canvas = document.querySelector('#ex-03');
  
  //렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha : true,       //투명도
    antialias : true    //매끄럽게
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  //빛
//   const pointLight = new THREE.PointLight(0xffffbb, 1);
//   pointLight.position.set(0, 2, 12);
//   scene.add(pointLight);    //MeshBasicmaterial사용시 빛 변화 x


    //도형
  const geometry = new THREE.SphereGeometry(0.5,32,16);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.y = 0.5;
  cube.position.y = 0.2;
  scene.add(cube);

  //바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(20,20,1,1);
  const planeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.2;
  scene.add(plane);

  //빛
  const ambientLight = new THREE.AmbientLight(0xFFA500, 0.1);
//   scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1,1,1);
  const dlHelper = new THREE.DirectionalLightHelper(directionalLight,0.2, 0x0000ff);
//   scene.add(dlHelper);
//   scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.3);
// scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xffffff,1);
// scene.add(pointLight);
pointLight.position.set(0.5,0.5,0.5);
const plhelper = new THREE.PointLightHelper(pointLight,0.1);
// scene.add(plhelper);

const pointLight2 = new THREE.PointLight(0xffffff,1);
// scene.add(pointLight2);
pointLight2.position.set(0.5,0.5,0.5);
const plhelper2 = new THREE.PointLightHelper(pointLight2,0.1);
// scene.add(plhelper2);

const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 0.5);
// scene.add(rectLight);
rectLight.position.set(0.5,0.5,1);
rectLight.lookAt(0,0,0);

const spotLight = new THREE.SpotLight(0xffffff, 0.5);
scene.add(spotLight)



  function render(time) {
    renderer.render(scene, camera);
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
