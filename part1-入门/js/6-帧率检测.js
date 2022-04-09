import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'

const w = window.innerWidth
const h = window.innerHeight
const stat = new Stat()

//Scene
const scene = new THREE.Scene()


//Objects
const axes = new THREE.AxesHelper(2, 2, 2)
scene.add(axes)

let cubes = []

function createCube() {
    let d = Math.random()
    const geometry = new THREE.BoxGeometry(d, d, d)
    const material = new THREE.MeshBasicMaterial({
        // color: 'rgb(255,0,0)'
        color: 0xffffff * Math.random()
    })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.x = (Math.random() - 0.5) * 4
    cube.position.y = (Math.random() - 0.5) * 4
    cube.position.z = (Math.random() - 0.5) * 4
    // scene.add(cube)
    cubes.push(cube)
}
let n = 2000
for (let i = 0; i < n; i++) {
    createCube()
}
cubes.forEach(cube => {
    scene.add(cube)
})

//Camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
camera.position.set(0, 0, 5)
camera.lookAt(0, 0, 0)

//Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
document.body.append(renderer.domElement)
document.body.append(stat.dom)



const clock = new THREE.Clock()
tick()
function tick() {
    const time = clock.getElapsedTime()

    cubes.forEach((cube, index) => {
        cube.rotation.x = time * 0.4 + index
        cube.rotation.y = time * 0.4 + index
    })

    requestAnimationFrame(tick)
    renderer.render(scene, camera)
    stat.update()
}



