import * as THREE from 'three'

import Experience from './Experience.js'

export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    this.createPerspectiveCamera()
    // this.setHelpers()
  }

  createPerspectiveCamera() {
    this.mainCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      20
    )
    this.mainCamera.position.z = 5

    this.scene.add(this.mainCamera)
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

  update() {}
}
