import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from '../Experience.js'

export default class Controls {
  constructor() {
    this.experience = new Experience()
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera

    this.setOrbitControls()
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.camera.mainCamera, this.canvas)
    this.controls.enableDamping = true
  }

  resize() {}

  update() {
    this.controls.update()
  }
}
