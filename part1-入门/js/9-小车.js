import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const w = window.innerWidth
const h = window.innerHeight
const stat = new Stat()

//Scene
const scene = new THREE.Scene()

//材质
const material = new THREE.MeshNormalMaterial()

//Objects
//整个汽车 car - group
const car = new THREE.Group()

//车身 body - group
const body = new THREE.Group()

const bodyCube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 0.5),
    material
)

const bodyCube2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
bodyCube2.position.z = 0.5

body.add(bodyCube1)
body.add(bodyCube2)

car.add(body)

//轮子1 - group
const wheelGroup1 = new THREE.Group()
const wheel1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.7, 0.7),
    material
)
wheelGroup1.position.set(-0.7, 0.6, 0)
wheelGroup1.add(wheel1)
car.add(wheelGroup1)
//轮子2 - group
const wheelGroup2 = new THREE.Group()
const wheel2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.7, 0.7),
    material
)
wheelGroup2.position.set(0.7, 0.6, 0)
wheelGroup2.add(wheel2)
car.add(wheelGroup2)
//轮子3 - group
const wheelGroup3 = wheelGroup1.clone()
wheelGroup3.position.y = -0.6
car.add(wheelGroup3)
//轮子4 - group
const wheelGroup4 = wheelGroup2.clone()
wheelGroup4.position.y = -0.6
car.add(wheelGroup4)

//轮胎 - group
const circle = new THREE.Group()

let n = 20
for (let i = 0; i < n; i++) {
    let r = 0.5
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.2)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = r * Math.cos(Math.PI * 2 / n * i)
    mesh.position.y = r * Math.sin(Math.PI * 2 / n * i)
    circle.add(mesh)
}
circle.rotation.y = -0.5 * Math.PI

wheelGroup1.add(circle)
wheelGroup2.add(circle.clone())
wheelGroup3.add(circle.clone())
wheelGroup4.add(circle.clone())

scene.add(car)

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

    car.position.y = time % 4 - 2

    wheelGroup1.rotation.x = -time
    wheelGroup2.rotation.x = -time
    wheelGroup3.rotation.x = -time
    wheelGroup4.rotation.x = -time

    requestAnimationFrame(tick)
    renderer.render(scene, camera)
    stat.update()
    orbitControls.update()
}



