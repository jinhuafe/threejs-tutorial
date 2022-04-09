import * as THREE from 'three'

const w = window.innerWidth
const h = window.innerHeight

//Scene
const scene = new THREE.Scene()


//Objects
const axes = new THREE.AxesHelper(2, 2, 2)
scene.add(axes)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial()
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

//Position
// cube.position.x = -1
// cube.position.y = -1
// cube.position.z = -1
// cube.position.set(1, 1, 1)
// console.log(cube.position)

//Rotation
// cube.rotation.z = 45 / 180 * Math.PI
// cube.rotation.x = 45 / 180 * Math.PI
// cube.rotation.y = 45 / 180 * Math.PI
// console.log(cube.rotation)

//Scale
// cube.scale.x = 2
// cube.scale.y = 2
// cube.scale.z = 2
// cube.scale.set(2, 2, 2)
// console.log(cube.scale)

//Light

//Camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
camera.position.set(0, 0, 5)
camera.lookAt(0, 0, 0)

//Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
renderer.render(scene, camera)
document.body.append(renderer.domElement)
