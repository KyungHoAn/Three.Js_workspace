import * as THREE from 'three'
import { CubeCamera, Curve } from 'three';
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
    camera.position.y = 1.5;
    camera.position.z = 1.8;
    camera.lookAt(new THREE.Vector3(0,0,0));
  x
  //캔버스
  // const canvas = document.querySelector('#ex-03');
  
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


  //빛
//   const pointLight = new THREE.PointLight(0xffffbb, 1);
//   pointLight.position.set(0, 2, 12);
//   scene.add(pointLight);    //MeshBasicmaterial사용시 빛 변화 x

    //도형
//   const geometry = new THREE.SphereGeometry(0.5,32,16);
const geometry = new THREE.IcosahedronGeometry(0.5,0);
//   const geometry = new THREE.ConeGeometry(0.4, 0.7,6);
  const material = new THREE.MeshStandardMaterial({color: 0x004fff});
  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.y = 0.5;
  cube.position.y = 0.5;
  scene.add(cube);
  cube.castShadow = true;
  cube.receiveShadow=true;

    //도형2
//   const geometry2 = new THREE.SphereGeometry(0.5,32,16);
const geometry2 = new THREE.IcosahedronGeometry(0.5,0);
//   const geometry2 = new THREE.ConeGeometry(0.4, 0.7,6);
  const material2 = new THREE.MeshStandardMaterial({color: 0x004433});
  const cube2 = new THREE.Mesh(geometry2, material2);
  cube2.position.set(-0.8,1,0.5);
  scene.add(cube2);
  cube2.castShadow = true;



  //바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(20,20,1,1);
  const planeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.2;
  scene.add(plane);
  plane.receiveShadow = true;

  //빛
  const ambientLight = new THREE.AmbientLight(0xFFA500, 0.1);
  scene.add(ambientLight);
//   ambientLight.castShadow = true;   // 그림자 적용 x

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(-1.5,2,1);
  const dlHelper = new THREE.DirectionalLightHelper(directionalLight,0.2, 0x0000ff);
  scene.add(dlHelper);
  scene.add(directionalLight);
  directionalLight.castShadow = true;   // 그림자 0
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.radius = 6;

const pointLight = new THREE.PointLight(0xffffff,0.5);
pointLight.position.set(-1,1,0.5);
const plhelper = new THREE.PointLightHelper(pointLight,0.1);
// scene.add(plhelper);
// scene.add(pointLight);
// pointLight.castShadow = true; //그림자 관여 o

const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 0.5);
// scene.add(rectLight);
rectLight.position.set(0.5,0.5,1);
rectLight.lookAt(0,0,0);
// scene.add(rectLight);
// rectLight.castShadow = true;    //그림자 적용 x

const spotLight = new THREE.SpotLight(0xffffff, 0.5);
// scene.add(spotLight)
// spotLight.castShadow = true;    //그림자 적용 o


function animate() {
	requestAnimationFrame( animate );

    cube.rotation.y +=0.05;
    cube2.rotation.x +=0.008;
    cube2.rotation.y +=0.008;

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
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
