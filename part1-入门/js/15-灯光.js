import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'

const w = window.innerWidth
const h = window.innerHeight
const stat = new Stat()
const gui = new dat.GUI()

//Scene
const scene = new THREE.Scene()

//Plane 
const planeM = new THREE.MeshPhongMaterial({ color: 0xcccccc })
const planeG = new THREE.PlaneGeometry(4, 4)
const plane = new THREE.Mesh(planeG, planeM)
plane.rotation.x = -0.5 * Math.PI
scene.add(plane)

//Material 
const material = new THREE.MeshStandardMaterial({ color: 0xff00ff })

//Sphere
const sphereG = new THREE.SphereGeometry(0.5)
const sphere = new THREE.Mesh(sphereG, material)
sphere.position.y = 0.5
scene.add(sphere)

//Cube
const cubeG = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const cube = new THREE.Mesh(cubeG, material)
cube.position.set(1, 0.8, 0)
scene.add(cube)

//Torus
const torusG = new THREE.TorusGeometry(0.3, 0.1, 10, 20)
const torus = new THREE.Mesh(torusG, material)
torus.position.set(-1, 0.8, 0)
torus.rotation.x = -0.5 * Math.PI
scene.add(torus)

const colors = {
    dLight: 0xffffff,
    sLight: 0xffffff,
    pLight: 0xffffff,
}

//light
//AmbientLight 环境光
const aLight = new THREE.AmbientLight(0xffffff, 0.2)
// aLight.intensity = 0.2
scene.add(aLight)

//DirectionalLight
const dLight = new THREE.DirectionalLight(0xffffff)
// dLight.intensity = 1
dLight.position.set(1, 1, 1)
// scene.add(dLight)
const dFol = gui.addFolder('DirectionalLight')
dFol.addColor(colors, 'dLight').onChange(() => {
    dLight.color.set(colors.dLight)
})
dFol.add(dLight, 'intensity', 0, 1, 0.01)
dFol.add(dLight.position, 'x', -5, 5)
dFol.add(dLight.position, 'y', -5, 5)
dFol.add(dLight.position, 'z', -5, 5)

const dLightHelper = new THREE.DirectionalLightHelper(dLight)
// scene.add(dLightHelper)

//SpotLight
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(1, 1, 1)
spotLight.angle = 60 / 180 * Math.PI
// spotLight.distance = 2
// scene.add(spotLight)

const sFol = gui.addFolder('spotLight')
sFol.addColor(colors, 'sLight').onChange(() => {
    spotLight.color.set(colors.sLight)
})
sFol.add(spotLight, 'intensity', 0, 1, 0.01)
sFol.add(spotLight.position, 'x', -5, 5)
sFol.add(spotLight.position, 'y', -5, 5)
sFol.add(spotLight.position, 'z', -5, 5)
sFol.add(spotLight, 'distance', 0.1, 10)
sFol.add(spotLight, 'angle', 0.01, 3.14)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
// scene.add(spotLightHelper)

//PointLight
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.y = 2
pointLight.intensity = 1
pointLight.distance = 2
// scene.add(pointLight)

const PFol = gui.addFolder('pointLight')
PFol.addColor(colors, 'pLight').onChange(() => {
    pointLight.color.set(colors.pLight)
})
PFol.add(pointLight, 'intensity', 0, 1, 0.01)
PFol.add(pointLight.position, 'x', -5, 5)
PFol.add(pointLight.position, 'y', -5, 5)
PFol.add(pointLight.position, 'z', -5, 5)
PFol.add(pointLight, 'distance', 0.1, 10)


const pointLightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(pointLightHelper)

//RectAreaLight - MeshStanardMaterial / MeshPhysicalMaterial
const rectAreaLight = new THREE.RectAreaLight(0xffffff, 1, 1, 1)
rectAreaLight.position.set(0, 1, 0)
rectAreaLight.rotation.x = -0.5 * Math.PI
// scene.add(rectAreaLight)

const helper = new RectAreaLightHelper(rectAreaLight)
// scene.add(helper)

//HemisphereLight  -skyColor, -backgroundColor
const hLight = new THREE.HemisphereLight(0xff0000, 0x0000ff)
scene.add(hLight)



//Camera 
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 10)
camera.lookAt(0, 0, 0)
camera.position.set(0, 2, 3)

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

    cube.rotation.x = time * 0.4
    cube.rotation.y = time * 0.4
    torus.rotation.y = time * 0.4
    torus.rotation.y = time * 0.4

    requestAnimationFrame(tick)
    renderer.render(scene, camera)
    stat.update()
    orbitControls.update()
    // spotLightHelper.update()
}



