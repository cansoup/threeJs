import * as THREE from 'three'

const $result = document.getElementById('result');

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);
// scene.add(요소);

// 2. Camera: Scene을 바라볼 시점을 결정
// PerspectiveCamera: 원근감을 적용하여 객체를 투영하는 카메라, 3D 공간감을 표현
// fov: 시야각. 커질수록 화면에 많은 영역을 출력.
//      시야각이 커지면 같은 크기의 화면에 더 많은 영역을 출력해야하므로 객체가 작아보인다.
// aspect: 카메라 종횡비. 랜더러의 크기 비율로 설정한다.
// near, far: 랜더링 할 범위를 지정한다. 카메라를 기준으로 near ~ far 사이에 포함되어 있는 곳만 화면에 랜더링한다.
// 카메라 왜곡
// - 원인: 카메라의 종횡비가 캔버스의 종횡비와 다르기 때문
// - 해결방법: aspect를 캔버스의 종횡비와 맞춘다.
const camera = new THREE.PerspectiveCamera(50, $result.clientWidth / $result.clientHeight, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0)

// 3. Renderer: Scene과 카메라의 정보를 이용하여 화면을 그려주는 역할
// 계단 현상
// - 발생하는 이유: 랜더러의 사이즈 자체는 기본값인데 캔버스의 css 속성에 의해 강제로 확대되면서 발생한다.
// - 해결방법
//    1. antialias 옵션을 true로 설정한다
//    2. renderer의 사이즈를 캔버스에 맞춘다.
const renderer = new THREE.WebGLRenderer({ canvas: $result, antialias: true });
renderer.setSize($result.clientWidth, $result.clientHeight);
// console.log(renderer);
document.body.appendChild(renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x2E6FF2
});
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// 애니메이션
// animate를 호출하면 브라우저가 다음 프레임을 랜더링하기 전에 animate를 반복적으로 호출한다.
function animate() {
  // box.rotation.y += 0.01;
  // 변경된 속성값을 랜더링해야 화면에 반영된다.
  renderer.render(scene, camera)
  requestAnimationFrame(animate);
}
animate();

// 브라우저 리사이징에 따른 반응형 처리
window.addEventListener('resize', () => {
  // 1. 카메라의 종횡비
  camera.aspect = window.innerWidth/window.innerHeight;
  // 카메라의 속성이 변경되면 카메라를 업데이트 해주어야 한다.
  camera.updateProjectionMatrix();

  // 2. 랜더러의 크기
  renderer.setSize(window.innerWidth, window.innerHeight)

})
