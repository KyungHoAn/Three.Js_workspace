import * as THREE from 'three'
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

    //도형
    const geometry = new THREE.TorusGeometry( 0.3, 0.15, 16, 40 );
    const material01 = new THREE.MeshBasicMaterial( { color: 0xaaaeee } );
    const obj01 = new THREE.Mesh( geometry, material01 );
    obj01.position.x = -2
    scene.add( obj01 );

    const material02 = new THREE.MeshStandardMaterial( {    //standard : 가장 많이 사용
        color: 0xaaaeee,
        // metalness : 0.9,    //재질
        // roughness: 0.5,     //거칠기
        // wireframe: true,        //wireframe 모드
        // transparent: true,  //투명
        // opacity: 0.5        //투명도
    } );
    // material02.wireframe = true;

    const obj02 = new THREE.Mesh( geometry, material02 );
    obj02.position.x = -1
    scene.add( obj02 );

    const material03 = new THREE.MeshPhysicalMaterial( { 
        color: 0xaaaeee,
        clearcoat:1,
        clearcoatRoughness:0.3, //거칠기    
    } );  //Depth : 깊이감을 탐색
    const obj03 = new THREE.Mesh( geometry, material03 );
    obj03.position.x = 0
    scene.add( obj03 );

    const material04 = new THREE.MeshLambertMaterial( { color: 0xaaaeee } );
    const obj04 = new THREE.Mesh( geometry, material04 );
    obj04.position.x = 1
    scene.add( obj04 );

    const material05 = new THREE.MeshPhongMaterial( { 
        color: 0xaaaeee,
        shininess: 60,  //빛
        specular : 0x004fff,    //광 색상
     } );
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
