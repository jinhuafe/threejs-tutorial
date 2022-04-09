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
camera.position.set(0, 0.5, 3)
camera.lookAt(0, 0, 0)

//Light
scene.add(new THREE.AmbientLight(0xffffff, 0.2))
const dLight = new THREE.DirectionalLight(0xffffff)
dLight.position.set(0, 1, 1)
scene.add(dLight)

//变量
const groundW = 50
const groundH = 10

//*********************************************** */
//地面 groundGroup
const groundGroup = new THREE.Group()

//马路 roadGroup
const roadGroup = new THREE.Group()
const roadPlaneG = new THREE.PlaneGeometry(2, groundH)
const roadPlaneM = new THREE.MeshStandardMaterial({ color: 0x4c4a4b })
const roadPlane = new THREE.Mesh(roadPlaneG, roadPlaneM)


const leftLine = new THREE.Mesh(
    new THREE.PlaneGeometry(0.1, groundH),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
)
leftLine.position.z = 0.0001
leftLine.position.x = -0.8

const rightLine = leftLine.clone()
rightLine.position.x = 0.8

const dashLineGroup = new THREE.Group()
let dashNum = 24
for (let i = 0; i < dashNum; i++) {
    const m = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const g = new THREE.PlaneGeometry(0.1, 0.3)
    const mesh = new THREE.Mesh(g, m)
    mesh.position.z = 0.0001
    mesh.position.y = -groundH / 2 + 0.5 * i
    dashLineGroup.add(mesh)
}

//草坪 
const frontGrass = new THREE.Mesh(
    new THREE.PlaneGeometry(groundW, groundH / 2),
    new THREE.MeshStandardMaterial({ color: 0x61974b })
)
frontGrass.position.z = -0.001
frontGrass.position.y = -groundH / 4

const backGrass = new THREE.Mesh(
    new THREE.PlaneGeometry(groundW, groundH / 2),
    new THREE.MeshStandardMaterial({ color: 0xb1d744 })
)
backGrass.position.z = -0.001
backGrass.position.y = groundH / 4

roadGroup.add(roadPlane, leftLine, rightLine, dashLineGroup)
groundGroup.add(roadGroup, frontGrass, backGrass)
groundGroup.rotation.x = -0.5 * Math.PI

//*********************************************** */
//treesGroup
const treesGroup = new THREE.Group()
const leftTreeGroup = new THREE.Group()
const singTreeGroup = new THREE.Group()

const treeTop = new THREE.Mesh(
    new THREE.ConeGeometry(0.2, 0.2, 5),
    new THREE.MeshStandardMaterial({ color: 0x64a525 })
)
const treeMid = new THREE.Mesh(
    new THREE.ConeGeometry(0.3, 0.3, 5),
    new THREE.MeshStandardMaterial({ color: 0x64a525 })
)
const treeBottom = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.4),
    new THREE.MeshStandardMaterial({ color: 0x7a5753 })
)
const treeShadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.3, 5),
    new THREE.MeshBasicMaterial({ color: 0x3f662d })
)
treeTop.position.y = 0.55
treeMid.position.y = 0.4
treeShadow.rotation.x = -0.5 * Math.PI
treeBottom.position.y = 0.2
singTreeGroup.add(treeTop, treeMid, treeBottom, treeShadow)
singTreeGroup.scale.set(0.5, 0.5, 0.5)

const treeNum = 20
for (let i = 0; i < treeNum; i++) {
    const group = singTreeGroup.clone()
    group.position.z = -groundH / 2 + i * 0.5
    group.position.x = -1.2
    leftTreeGroup.add(group)
}

const rightTreeGroup = leftTreeGroup.clone()
rightTreeGroup.position.x = 1.2 * 2

treesGroup.add(leftTreeGroup, rightTreeGroup)

//***********************************************
//建筑物 
const buildingGroup = new THREE.Group()
const buildingNum = 20
const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0x75d1c2 })
for (let i = 0; i < buildingNum; i++) {
    const width = Math.random() + 1
    const height = Math.random() + 1
    const deep = Math.random()
    const buildingGeometry = new THREE.BoxGeometry(width, height, deep)
    const mesh = new THREE.Mesh(buildingGeometry, buildingMaterial)
    mesh.position.x = -groundW / 2 + i * 2 + (Math.random() - 0.5) * 3
    mesh.position.z = -groundH / 2
    mesh.position.y = height / 2
    buildingGroup.add(mesh)
}

//************************************************
//云朵
const cloudGroup = new THREE.Group()
const cloudMaterial = new THREE.MeshBasicMaterial(0xffffff)
const cloud1 = new THREE.Mesh(new THREE.SphereGeometry(0.6), cloudMaterial)
const cloud2 = new THREE.Mesh(new THREE.SphereGeometry(0.8), cloudMaterial)
const cloud3 = new THREE.Mesh(new THREE.SphereGeometry(1), cloudMaterial)
const cloud4 = new THREE.Mesh(new THREE.SphereGeometry(0.7), cloudMaterial)
const cloud5 = new THREE.Mesh(new THREE.SphereGeometry(0.5), cloudMaterial)
cloud1.position.x = -1.6
cloud1.position.y = -0.05
cloud2.position.x = -1
cloud2.position.y = -0.1
cloud4.position.x = 1
cloud5.position.x = 1.4
cloudGroup.add(cloud1, cloud2, cloud3, cloud4, cloud5)
cloudGroup.position.z = -groundH / 2 - 2
cloudGroup.position.y = 3
scene.add(groundGroup, treesGroup, buildingGroup, cloudGroup)


//Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
renderer.setClearColor(0x95e4e8)
renderer.shadowMap.enabled = true
document.body.append(renderer.domElement)
document.body.append(stat.dom)


const orbitControls = new OrbitControls(camera, renderer.domElement)

const clock = new THREE.Clock()
tick()
function tick() {
    const time = clock.getElapsedTime()

    dashLineGroup.position.y = -time * 0.2 % 3
    treesGroup.position.z = time * 0.2 % 3
    cloudGroup.position.x = Math.sin(time * 0.1) * 7


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



