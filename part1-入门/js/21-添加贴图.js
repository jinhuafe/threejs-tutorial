import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

import t1 from './img/t1.jpg'


let w = window.innerWidth
let h = window.innerHeight
const stat = new Stat()
// const gui = new dat.GUI()

//Scene
const scene = new THREE.Scene()

//Camera
let camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
camera.position.set(0, 1, 3)
camera.lookAt(0, 0, 0)

//Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
// renderer.setClearColor(0x95e4e8)
renderer.shadowMap.enabled = true
document.body.append(renderer.domElement)
document.body.append(stat.dom)

//light 
const light = new THREE.DirectionalLight(0xffffff)
light.position.set(1, 1, 1)
light.castShadow = true
scene.add(light)

scene.add(new THREE.AmbientLight(0xffffff, 0.2))

//贴图 texture
const loader = new THREE.TextureLoader()
const texture = loader.load('https://threejs.org/manual/examples/resources/images/wall.jpg')
const texture2 = loader.load('https://threejs.org/manual/resources/images/compressed-but-large-wood-texture.jpg')
const texture3 = loader.load(t1)

const m1 = new THREE.MeshStandardMaterial({
    map: loader.load('https://threejs.org/manual/examples/resources/images/flower-1.jpg')
})
const m2 = new THREE.MeshStandardMaterial({
    map: loader.load('https://threejs.org/manual/examples/resources/images/flower-2.jpg')
})
const m3 = new THREE.MeshStandardMaterial({
    map: loader.load('https://threejs.org/manual/examples/resources/images/flower-3.jpg')
})
const m4 = new THREE.MeshStandardMaterial({
    map: loader.load('https://threejs.org/manual/examples/resources/images/flower-4.jpg')
})
const m5 = new THREE.MeshStandardMaterial({
    map: loader.load('https://threejs.org/manual/examples/resources/images/flower-5.jpg')
})
const m6 = new THREE.MeshStandardMaterial({
    map: loader.load('https://threejs.org/manual/examples/resources/images/flower-6.jpg')
})

//Cube
const cubeG = new THREE.BoxGeometry(1, 1, 1)
const cubeM = new THREE.MeshStandardMaterial({
    // color: 0xff0000,
    map: texture3,
})
const cube = new THREE.Mesh(cubeG, [m1, m2, m3, m4, m5, m6])
cube.castShadow = true
cube.position.y = 0.5
scene.add(cube)

//Plane
const planeGeometry = new THREE.PlaneGeometry(4, 4)
const planeMaterial = new THREE.MeshStandardMaterial({
    // color: 0xff0000,
    map: texture2,
    side: THREE.DoubleSide,
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -0.5 * Math.PI
plane.receiveShadow = true
scene.add(plane)



const orbitControls = new OrbitControls(camera, renderer.domElement)

const clock = new THREE.Clock()
tick()
function tick() {
    const time = clock.getElapsedTime()

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



