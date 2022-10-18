import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setLights()
  }

  setLights() {
    const backLight = new THREE.PointLight(0xffffff, 3, 20)
    backLight.position.set(-5, 5, -5)
    this.scene.add(backLight)

    const fillLight = new THREE.PointLight(0xffffff, 0.7, 20)
    fillLight.position.set(-5, 0, 5)
    this.scene.add(fillLight)

    const keyLight = new THREE.PointLight(0xffffff, 2, 20)
    keyLight.position.set(5, 0, 0)
    this.scene.add(keyLight)
  }

  resize() {}

  update() {}
}
