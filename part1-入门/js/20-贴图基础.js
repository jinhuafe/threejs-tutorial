import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

import img from './asset/texture.jpg'
import t22 from './asset/t22.png'
import t6464 from './asset/t6464.png'

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
renderer.setClearColor(0x95e4e8)
renderer.shadowMap.enabled = true
document.body.append(renderer.domElement)
document.body.append(stat.dom)

//Light
const light = new THREE.DirectionalLight({ color: 0xffffff })
light.position.set(1, 1, 1)
light.castShadow = true
scene.add(light)

scene.add(new THREE.AmbientLight(0xffffff, 0.2))

//Texture
const loader = new THREE.TextureLoader()
const texture = loader.load('https://threejs.org/manual/resources/images/compressed-but-large-wood-texture.jpg')
const texture2 = loader.load('https://threejs.org/manual/resources/images/mip-low-res-enlarged.png')
const texture3 = loader.load(img)
const texture4 = loader.load(t22)
const texture5 = loader.load(t6464)

texture4.magFilter = THREE.NearestFilter
texture4.wrapS = THREE.RepeatWrapping
texture4.wrapT = THREE.RepeatWrapping
texture4.repeat.set(20, 20)

//ClampToEdgeWrapping
//RepeatWrapping
//MirroredRepeatWrapping

texture5.wrapS = THREE.RepeatWrapping
texture5.wrapT = THREE.MirroredRepeatWrapping
texture5.repeat.set(3, 3)
texture5.offset.set(0.5, 0)
//Cube
const cubeG = new THREE.BoxGeometry(1, 1, 1)
const cubeM = new THREE.MeshStandardMaterial({
    map: texture3
})
const cube = new THREE.Mesh(cubeG, cubeM)
cube.position.y = 0.5
cube.castShadow = true
scene.add(cube)

//Plane
const planeG = new THREE.PlaneGeometry(4, 4)
const planeM = new THREE.MeshStandardMaterial({
    map: texture5,
    side: THREE.DoubleSide,
})
const plane = new THREE.Mesh(planeG, planeM)
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



