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
    this.randomInt = Math.floor(Math.random() * (5 - 1) + 1);

    console.log(this.randomInt);

    this.resources.on('ready', () => {
      this.environment = new Environment()
      this.controls = new Controls()

      if(this.randomInt === 1) {
        this.face = new Face()
      } else if (this.randomInt === 2) {
        this.text = new Text()
      } else {
        this.cube = new Cube()
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
