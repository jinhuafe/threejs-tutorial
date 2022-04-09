import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

const w = window.innerWidth
const h = window.innerHeight
const stat = new Stat()
const gui = new dat.GUI()

//Scene
const scene = new THREE.Scene()

//Camera 
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 10)
camera.lookAt(0, 0, 0)
camera.position.set(0, 2, 3)

//Plane 
const planeM = new THREE.MeshPhongMaterial({ color: 0xcccccc })
const planeG = new THREE.PlaneGeometry(10, 10)
const plane = new THREE.Mesh(planeG, planeM)
plane.rotation.x = -0.5 * Math.PI
plane.receiveShadow = true
scene.add(plane)

//Sphere
const material = new THREE.MeshStandardMaterial({ color: 0xff00ff })
const sphereG = new THREE.SphereGeometry(0.5)
const sphere = new THREE.Mesh(sphereG, material)
sphere.position.y = 0.5
sphere.castShadow = true
scene.add(sphere)

//Light
const light = new THREE.SpotLight(0xffffff)
light.position.set(2, 2, 2)
light.angle = 45 / 180 * Math.PI
scene.add(light)
light.castShadow = true
scene.add(new THREE.SpotLightHelper(light))
scene.add(new THREE.AmbientLight(0xffffff, 0.2))

console.log(scene)

//Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
renderer.shadowMap.enabled = true
document.body.append(renderer.domElement)
document.body.append(stat.dom)

const orbitControls = new OrbitControls(camera, renderer.domElement)


const clock = new THREE.Clock()
tick()
function tick() {
  const time = clock.getElapsedTime()

  sphere.position.y = Math.abs(Math.sin(time)) + 0.5

  requestAnimationFrame(tick)
  renderer.render(scene, camera)
  stat.update()
  orbitControls.update()
  // spotLightHelper.update()
}



