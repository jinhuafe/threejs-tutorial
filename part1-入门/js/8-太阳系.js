import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const w = window.innerWidth
const h = window.innerHeight
const stat = new Stat()

//Scene
const scene = new THREE.Scene()

//Objects
//辅助参考坐标系
const axes = new THREE.AxesHelper(2, 2, 2)
// scene.add(axes)

//组合
const group = new THREE.Group()

const group2 = new THREE.Group()
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube1 = new THREE.Mesh(geometry, material)
group2.position.y = 1.5
group2.add(cube1)
group.add(group2)


const geometry2 = new THREE.BoxGeometry(1, 1, 1)
const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube2 = new THREE.Mesh(geometry2, material2)
group.add(cube2)



const geometry3 = new THREE.BoxGeometry(0.2, 0.2, 0.2)
const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff })
const cube3 = new THREE.Mesh(geometry3, material3)
cube3.position.y = 0.5
group2.add(cube3)


scene.add(group)


//Camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
camera.position.set(0, 0, 5)
camera.lookAt(0, 0, 0)

//Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
document.body.append(renderer.domElement)
document.body.append(stat.dom)

const orbitControls = new OrbitControls(camera, renderer.domElement)

const clock = new THREE.Clock()
tick()
function tick() {
  const time = clock.getElapsedTime()

  cube2.rotation.z = time
  cube1.rotation.z = time
  cube3.rotation.z = time

  group.rotation.z = time
  group2.rotation.z = time


  requestAnimationFrame(tick)
  renderer.render(scene, camera)
  stat.update()
  orbitControls.update()
}



