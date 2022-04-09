import * as THREE from 'three'

const w = window.innerWidth
const h = window.innerHeight

//Scene
const scene = new THREE.Scene()


//Objects
const axes = new THREE.AxesHelper(2, 2, 2)
scene.add(axes)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial()
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

//Camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
camera.position.set(0, 0, 5)
camera.lookAt(0, 0, 0)

//Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
document.body.append(renderer.domElement)

//SetInterval
// setInterval(() => {
//   cube.rotation.z += 0.01
//   renderer.render(scene, camera)
// }, 1000 / 60)


//requestAnimationFrame
// function tick() {
//   cube.rotation.z += 0.01
//   renderer.render(scene, camera)

//   requestAnimationFrame(tick)
// }

// tick()

//60hz 60 * 0.01 = 0.6
//120hz 120 * 0.01 = 1.2

//解决不同刷新率的问题
//requestAnimationFrame
// let time = Date.now()
// function tick() {
//   let currentTime = Date.now()
//   let deltaTime = currentTime - time
//   time = currentTime
//   console.log(deltaTime)
//   cube.rotation.z += deltaTime * 0.001
//   renderer.render(scene, camera)

//   requestAnimationFrame(tick)
// }

// tick()

const clock = new THREE.Clock()
tick()
function tick() {
  const time = clock.getElapsedTime()

  // cube.rotation.z = time
  cube.position.x = Math.sin(time * 2) * 2
  cube.position.y = Math.cos(time * 2) * 2

  requestAnimationFrame(tick)
  renderer.render(scene, camera)
}



