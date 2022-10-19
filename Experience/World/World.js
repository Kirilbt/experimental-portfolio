import * as THREE from 'three'

import Experience from '../Experience.js'
import Face from './Face.js'
import Environment from './Environment.js'
import Controls from './Controls.js'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.resources = this.experience.resources

    this.resources.on('ready', () => {
      this.face = new Face()
      this.environment = new Environment()
      this.controls = new Controls()
    })
  }

  resize() {
  }

  update() {
    if(this.face) {
      this.face.update()
    }
    if(this.controls) {
      this.controls.update()
    }
  }
}
