import * as THREE from 'three'
import { CubeCamera, Curve } from 'three';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {

    // 안개
    const FogColor = 0x004fff;
    const objColor = 0xffffff;
    const FloorColor = 0x555555;
  
  //장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(FogColor);
  // 안개추가
//   scene.fog = new THREE.Fog(FogColor, 1 ,8)      // 1.Fog    거리로 조절
    scene.fog = new THREE.FogExp2(FogColor, 0.3)    // 2.FogExp2    밀도를 조절

  //카메라
  const camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0,2,3)
  camera.lookAt(0,0,0)
  
  //렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha : true,       //투명도
    antialias : true    //매끄럽게
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;

  //OrbitControls 추가  : 무조건 카메라 세팅 이후에 설정해주어야 한다.
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 2; //가까이 가는 범위 설정
  controls.maxDistance = 5; //멀리 가는 범위 설정
  controls.maxPolarAngle = Math.PI / 2;   //밑으로 가는 범위 설정
  controls.update();

    //도형 추가
    const geometry = new THREE.TorusGeometry(0.7,0.3,12,80)
    const material = new THREE.MeshStandardMaterial({
        color: objColor,
    })
    const obj = new THREE.Mesh(geometry, material)
    obj.position.y = 0.8
    scene.add(obj)

  //바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30,30,1,1);
  const planeMaterial = new THREE.MeshStandardMaterial({color: FloorColor});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5
  scene.add(plane)

  // 빛 추가
  const directionalLight = new THREE.DirectionalLight(0xffffff,1)
  directionalLight.position.set(1,1,1)
  scene.add(directionalLight)

function animate() {
	requestAnimationFrame( animate );
    obj.rotation.y += 0.01
	renderer.render( scene, camera );
}
animate()

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
