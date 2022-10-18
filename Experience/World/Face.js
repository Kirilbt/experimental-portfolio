import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Face {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.face = this.resources.items.face
    this.actualFace = this.face.scene

    this.setModel()
  }

  setModel() {
    this.scene.add(this.actualFace)

    this.actualFace.traverse((child) => {
      if(child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })
    this.actualFace.scale.set(4, 4, 4)
  }

  resize() {}

  update() {
    this.actualFace.rotation.x += this.time.delta * 0.001;
		this.actualFace.rotation.y += this.time.delta * 0.001;
  }
}
