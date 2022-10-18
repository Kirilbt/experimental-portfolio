import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setMainlight()
  }

  setMainlight() {
    this.mainLight = new THREE.DirectionalLight('#ffffff', 3)
    this.mainLight.castShadow = true
    this.mainLight.shadow.camera.far = 20
    this.mainLight.shadow.mapSize.set(1024, 1024)
    this.mainLight.shadow.normalBias = 0.05
    this.mainLight.position.set(1.5, 7, 3)

    this.scene.add(this.mainLight)
  }

  resize() {
  }

  update() {
  }
}
