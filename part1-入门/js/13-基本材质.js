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
camera.position.set(2, 2, 3)

//辅助坐标系
scene.add(new THREE.AxesHelper(2, 2, 2))

//light
scene.add(new THREE.AmbientLight(0xffffff, 0.2))

const light = new THREE.DirectionalLight(0xffffff)
light.position.set(2, 2, 2)
scene.add(light)
gui.add(light.position, 'x', -5, 5).name('灯光位置X')
gui.add(light.position, 'y', -5, 5).name('灯光位置Y')
gui.add(light.position, 'z', -5, 5).name('灯光位置Z')

//geometry
const geometry = new THREE.SphereGeometry(0.5)


//material
// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial()
// // material.wireframe = true
// material.visible = true
// material.color = new THREE.Color(0xff0000)
// // material.color.set(0xff0000)

//MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()

//MeshLambertMaterial
const material = new THREE.MeshLambertMaterial({
    color: 0xff00ff,
})

//MeshPhongMaterial
const material2 = new THREE.MeshPhongMaterial({
    color: 0xff00ff,
    shininess: 50
})

//MeshStandardMaterial
const material3 = new THREE.MeshStandardMaterial({
    color: 0xff00ff,
    roughness: 0,
    metalness: 0.2,
})
gui.add(material3, 'roughness', 0, 1, 0.01)
gui.add(material3, 'metalness', 0, 1, 0.01)


const mesh1 = new THREE.Mesh(geometry, material)
const mesh2 = new THREE.Mesh(geometry, material2)
const mesh3 = new THREE.Mesh(geometry, material3)
mesh1.position.y = 1
mesh3.position.y = -1

scene.add(mesh1, mesh2, mesh3)


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


    requestAnimationFrame(tick)
    renderer.render(scene, camera)
    stat.update()
    orbitControls.update()
}



