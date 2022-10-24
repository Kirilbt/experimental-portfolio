import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from '../Experience.js'

export default class Controls {
  constructor() {
    this.experience = new Experience()
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.scrolling = this.experience.scrolling

    this.setOrbitControls()
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.camera.mainCamera, this.canvas)
    this.controls.enableDamping = true
  }

  resize() {
    document.documentElement.style.setProperty('--100vh', `${window.innerHeight}px`)
    this.scrolling.resize()
  }

  update() {
    this.scrolling.update()
    this.controls.update()
  }
}
