import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

let w = window.innerWidth
let h = window.innerHeight
const stat = new Stat()
const gui = new dat.GUI()

//Scene
const scene = new THREE.Scene()


//Camera
let camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
// let camera = new THREE.OrthographicCamera(-w / 20, w / 20, h / 20, -h / 20, 0.1, 100)
camera.position.set(0, 1, 3)
camera.lookAt(0, 0, 0)
// camera.zoom = 20

// const helper = new THREE.CameraHelper(camera)
// scene.add(helper)

//Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
renderer.shadowMap.enabled = true
document.body.append(renderer.domElement)
document.body.append(stat.dom)


//Light
// directional
// spotLight
// pointLight
const directionalLight = new THREE.DirectionalLight(0xffffff)
directionalLight.position.set(1, 1, 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(directionalLight, ambientLight)

// gui.add(directionalLight.position, 'x', -5, 5, 0.01)
// gui.add(directionalLight.position, 'y', -5, 5, 0.01)
// gui.add(directionalLight.position, 'z', -5, 5, 0.01)



//Plane
const planeG = new THREE.PlaneGeometry(4, 4, 10, 10)
const planeM = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    // wireframe: true,
})
const plane = new THREE.Mesh(planeG, planeM)
plane.rotation.x = -0.5 * Math.PI
plane.receiveShadow = true
scene.add(plane)

const plane2 = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 4),
    new THREE.MeshBasicMaterial()
)
plane2.rotation.x = -0.5 * Math.PI
plane2.position.y = 0.0001
scene.add(plane2)

// z-flighting

//Sphere
const sphereG = new THREE.SphereGeometry(0.5)
const sphereM = new THREE.MeshStandardMaterial({
    color: 0xffff00,
})
const sphere = new THREE.Mesh(sphereG, sphereM)
sphere.position.y = 0.5
sphere.castShadow = true
scene.add(sphere)

const orbitControls = new OrbitControls(camera, renderer.domElement)

const clock = new THREE.Clock()
tick()
function tick() {
    const time = clock.getElapsedTime()

    sphere.position.y = Math.abs(Math.sin(time)) + 0.5

    camera.updateProjectionMatrix()

    requestAnimationFrame(tick)
    renderer.render(scene, camera)
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

//mousemove
// window.addEventListener('mousemove', (e) => {
//   const mousePosX = (e.clientX / w - 0.5) * 2
//   const mousePosY = (e.clientY / h - 0.5) * 2
//   camera.position.x = -mousePosX
//   camera.position.y = mousePosY
// })


