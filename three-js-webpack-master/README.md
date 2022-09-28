# three-js-webpack

핵심 요약

## [재질 Material]
* MeshBasicMaterial
  - 단순한 음영 방식으로 지오메트리를 표현하는 재질, 해당 재질의 특성은 조명이나 음영효과가 적용x
* MeshStandardmaterial
  - 3D에서 표준 물리적 기반의 재질
* MeshPysicalmaterial
  - MeshStandardMaterial와 거의 동일, 고급 물리 기반 렌더링 속성 제공. 클리어 코두, 물리적 기반의 투명도, 고급 반사율 등을 활용해서 섬유나
    젖은 표면, 페인트 등의ㅏ 불규칙하거나 거친 표면을 표현할 수 있다.
* MeshLamberMaterial
  - 반사 하이라이트가 없는 광택이 없는 표면용 재료, 빛을 계산해서 도형에 표현하는 방식에 대해서 물리적 기반이 아닌 Lambertian 모델을 사용
* MeshPhongMaterial
  - 빛을 계산해서 도형에 표현하는 방식에 대해서 Blinn-Phong모델을 사용
  
<hr/>
  
## [Camera]
```
//카메라 추가
const fov = 75; //화각 설정
const aspect = window.innerWidth / window.innerHeight; //종횡비
const near = 0.1;//가까이
const far = 1000; //멀리
const camera = new THREE.Perspectivevamera(fov, aspect, near, far);

//위 코드와 동일
const camera = new THREE.PerspectiveVamera(75, window.innerWidth / window.innerHeight,0.1,1000);
```
FOV(field of view)
- 시야각 / 화각
- three.js에서는 fov값을 직접 수치로 넣어야 함 ( 렌즈 종류 이해 필수)
- 렌즈 종류(표준렌즈, 광각렌즈, 망원렌즈)
  - 광각 렌즈 : 35mm 이하
  - 표준 렌즈 : 50mm
  - 망원 렌즈 : 85mm 이상
1. 오브젝트를 가까이 크게 보이게 하고 싶다면
- 망원으로 표현을 해야하는데 그러기 위해서는 화각(Fov)가 좁아야 한다. 8~28도
2. 평범한 표준
- 표준 렌즈로 표현, 화각 47도
3. 원근감 주고 작게 보여주고 싶다면
- 광각 렌즈, 화각 63~84도

aspect (aspect ratio)
- 가로 세로 비율 
- near & far
- near는 카메라의 시점이 시작되는 위치
- far는 카메라의 시점이 끝나는 위치

카메라의 위치 조정
```
camera.position.x = 0;  //카메라 좌우이동
camera.position.y = 0.3; //카메라 상하 이동
camera.position.z = 1; //카메라 앞뒤 이동

camera.postion.set(0,0.3,1) // 위와 동일
```

카메라가 특정 지점을 바라보는 방법
```
camera.lookAt(new THREE.Vector3(0,0,0); //특정 좌표를 쳐다보기

```

<hr/>

## 빛
- 6가지 빛 종류
1. AmbientLight : 모든 오브젝트를 대상으로 전역에 빛을 비춘다.
2. DirectionalLight : 특정 방향으로 빛을 비춘다. 해 느낌
3. HemisphereLight : 하늘색, 지상 색으로 설정하여 위아래로 빛을 비춘다.
4. PointLight : 한 방향으로 빛을 비춘다. 전구 비슷
5. ReactAreaLight : 직사각형 평면에 균일하게 빛을 비춘다.
6. SpootLight : 원뿔 모양으로 빛으로  특정 영역을 비춘다.

- 빛의 위치를 알 수 있게 도와주는 Helper 사용법
```
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.postion(1,1,1);
scene.add(directionalLight);

//빛 헬퍼 추가
const dlhelper = new THREE.directionalLightHelper(directionalLight,0.5);
scene.add(dlhelper);
```

<hr/>

## 그림자
1. Renderer에 그림자 사용 설정
2. 빛을 받아 그림자를 표현할 물체와 그 그림자를 받을 물체를 특정 코드로 설정
3. 빛에 그림자 설정

<hr/>

## Orbitcontrols
- import로 불러오기
```
import {
OrvitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
```

- OrbitControls 추가하기
```
  //OrbitControls 추가  : 무조건 카메라 세팅 이후에 설정해주어야 한다.
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 2; //가까이 가는 범위 설정
  controls.maxDistance = 5; //멀리 가는 범위 설정
  controls.maxPolarAngle = Math.PI / 2;   //밑으로 가는 범위 설정
  controls.update();
```
- update
```
function animate() {
	requestAnimationFrame( animate );

    cube.rotation.y +=0.05;
    cube2.rotation.x +=0.008;
    cube2.rotation.y +=0.008;

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	renderer.render( scene, camera );
}
```

<hr/>


Starter project for Three.JS. Configured with Webpack 4 as a bundler.

Great and easy way to bootstrap your Three.JS project.

## Development

Clone the project and install dependencies:

```bash
git clone https://github.com/aakatev/three-js-webpack.git
npm i
```

Start webpack development server:

```bash
npm run start
```

Webpack configuration is located in [`webpack.config.js`](webpack.config.js).

## Deployment on GitHub Pages

**Works with any other static website hosting too.**

Bundle your code, and push it in your repo:

```bash
npm run build
git add
git commit -m"Deploying on GitHub Pages"
git push
```

## Extra

The code can be formated with prettier:

```bash
npm run format
```
