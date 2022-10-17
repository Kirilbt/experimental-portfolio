import * as THREE from 'three'

import Experience from '../Experience.js'
import Face from './Face.js'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera

    this.face = new Face()
  }

  resize() {
  }

  update() {
  }
}
