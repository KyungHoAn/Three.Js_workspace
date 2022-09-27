# three-js-webpack

핵심 요약

[재질 Material]
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
