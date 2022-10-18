import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from './Experience.js'

export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    this.createPerspectiveCamera()
    this.setOrbitControls()
    this.setHelpers()
  }

  createPerspectiveCamera() {
    this.mainCamera = new THREE.PerspectiveCamera(
      20,
      this.sizes.aspect,
      0.1,
      20
    )
    this.mainCamera.position.z = 10

    this.scene.add(this.mainCamera)
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.mainCamera, this.canvas)
    this.controls.enableDamping = true
  }

  setHelpers() {
    const gridHelper = new THREE.GridHelper(10, 10)
    this.scene.add(gridHelper)

    const axesHelper = new THREE.AxesHelper(10)
    this.scene.add(axesHelper)
  }

  resize() {
    this.mainCamera.aspect = this.sizes.aspect
    this.mainCamera.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
  }
}
