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
  const aspect = window.innerWidth / window.innerHeight;  //종횡비 - 가로 세로 비율
  const near = 0.1;
  const far = 600;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);  
//   camera.position.z = 3;
    // camera.position.set(0,0.1);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 1;
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


    //OrbitControls 추가  : 무조건 카메라 세팅 이후에 설정해주어야 한다.
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2; //가까이 가는 범위 설정
    controls.maxDistance = 5; //멀리 가는 범위 설정
    controls.maxPolarAngle = Math.PI / 2;   //밑으로 가는 범위 설정
    controls.update();


  //빛
  const pointLight = new THREE.PointLight(0xffffbb, 1);
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
  scene.add(plane);

  function render(time) {
    renderer.render(scene, camera);
  }
  requestAnimationFrame(render);

  function animate() {
    requestAnimationFrame( animate );
  
      cube.rotation.y +=0.005;
  
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
