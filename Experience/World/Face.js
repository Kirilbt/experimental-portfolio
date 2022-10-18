import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Face {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.face = this.resources.items.face
    this.actualFace = this.face.scene

    this.setModel()
  }

  setModel() {
    this.scene.add(this.actualFace)
  }

  resize() {
  }

  update() {
  }
}
