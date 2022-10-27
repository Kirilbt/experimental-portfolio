import * as THREE from 'three'

import Experience from '../Experience.js'
import Face from './Face.js'
import Text from './Text.js'
import Cube from './Cube.js'
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
      this.environment = new Environment()
      this.controls = new Controls()

      if(localStorage.shownResource === '1') {
        this.text = new Text()
        localStorage.shownResource = Number(localStorage.shownResource)+1
      } else if(localStorage.shownResource === '2') {
        this.cube = new Cube()
        localStorage.clear()
      } else {
        this.face = new Face()
        localStorage.shownResource = 1
      }
    })
  }
  resize() {
  }

  update() {
    if(this.face) {
      this.face.update()
    }
    if(this.text) {
      this.text.update()
    }
    if(this.cube) {
      this.cube.update()
    }
    if(this.controls) {
      this.controls.update()
    }
  }
}
