import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let w = window.innerWidth
let h = window.innerHeight
const stat = new Stat()
// const gui = new dat.GUI()

//Scene
const scene = new THREE.Scene()

//Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
directionalLight.position.set(0.25, 3, -2.25)
scene.add(directionalLight)

//Camera
let camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
camera.position.set(3, 3, 3)
camera.lookAt(0, 0, 0)

//Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
})
renderer.setSize(w, h)
// renderer.setClearColor(0x95e4e8)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//保证颜色和Blender中一样
renderer.physicallyCorrectLights = true

renderer.outputEncoding = THREE.sRGBEncoding

renderer.toneMapping = THREE.CineonToneMapping
renderer.toneMappingExposure = 1

renderer.shadowMap.enabled = true

document.body.append(renderer.domElement)
document.body.append(stat.dom)

//更新所有material
function updateAllMaterials() {
  scene.traverse(e => {
    if (e instanceof THREE.Mesh && e.material instanceof THREE.MeshStandardMaterial) {
      e.material.envMap = environmentMap
      e.material.envMapIntensity = 2
    }
  })
}

let gltf1 = './models/Duck/glTF-Binary/Duck.glb'
let gltf2 = './models/FlightHelmet/glTF/FlightHelmet.gltf'
let gltf3 = './models/Fox/glTF/Fox.gltf'
let gltf4 = './models/hanburger.glb'

//Loaders
const glTFLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMap = cubeTextureLoader.load([
  './img/flowers/right.png',
  './img/flowers/left.png',
  './img/flowers/top.png',
  './img/flowers/bottom.png',
  './img/flowers/front.png',
  './img/flowers/back.png',
])
environmentMap.encoding = THREE.sRGBEncoding
scene.background = environmentMap
// scene.envMap = environmentMap

glTFLoader.load(gltf2, (gltf) => {
  gltf.scene.position.y = -2
  gltf.scene.scale.set(5, 5, 5)
  scene.add(gltf.scene)

  updateAllMaterials()
})





//导入动画
// let mixer = null
// loader.load(gltf3, (gltf) => {

//   mixer = new THREE.AnimationMixer(gltf.scene)
//   const action = mixer.clipAction(gltf.animations[1])
//   action.play()

//   console.log(gltf)
//   gltf.scene.scale.set(0.025, 0.025, 0.025)
//   scene.add(gltf.scene)
// })


const orbitControls = new OrbitControls(camera, renderer.domElement)

const clock = new THREE.Clock()
let previousTime = 0
tick()
function tick() {
  const time = clock.getElapsedTime()
  const deltaTime = time - previousTime
  previousTime = time

  // if (mixer !== null) {
  //   mixer.update(deltaTime)
  // }

  requestAnimationFrame(tick)
  renderer.render(scene, camera)
  camera.updateProjectionMatrix()
  stat.update()
  orbitControls.update()
}


//resize
window.addEventListener('resize', () => {
  w = window.innerWidth
  h = window.innerHeight

  //Camera
  camera.aspect = w / h
  camera.updateProjectionMatrix()

  //Renderer
  renderer.setSize(w, h)
})



