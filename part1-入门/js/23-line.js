import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

let w = window.innerWidth
let h = window.innerHeight
const stat = new Stat()
// const gui = new dat.GUI()

//Scene
const scene = new THREE.Scene()

//Camera
let camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
camera.position.set(0, 0, 3)
camera.lookAt(0, 0, 0)

//Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
// renderer.setClearColor(0x95e4e8)
// renderer.shadowMap.enabled = true
document.body.append(renderer.domElement)
document.body.append(stat.dom)


// const p1 = new THREE.Vector3(1, 0, 0)
// const p2 = new THREE.Vector3(0, 1, 0)
// const p3 = new THREE.Vector3(-1, 0, 0)
// const points = [p1, p2, p3]

const p = new Float32Array([
    1, 0, 0,
    0, 1, 0,
    -1, 0, 0,
    0, -1, 0
])

const n = 10
const points = new Float32Array(n)
for (let i = 0; i < 3 * n; i++) {
    let x = Math.random() * 2
    let y = Math.random() * 2
    let z = Math.random() * 2

    points[3 * i + 0] = x
    points[3 * i + 1] = y
    points[3 * i + z] = z
}

const lineGeometry = new THREE.BufferGeometry()
// lineGeometry.setFromPoints(points)

lineGeometry.setAttribute('position', new THREE.BufferAttribute(points, 3))

const lineMaterial = new THREE.LineDashedMaterial({
    color: 0xff0000,
    scale: 2,
})
const line = new THREE.Line(lineGeometry, lineMaterial)
scene.add(line)



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



