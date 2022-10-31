import * as THREE from 'three'

import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import assets from './Utils/assets.js'

import Scrolling from './Components/Scrolling.js'

import Camera from './Camera.js'
import Renderer from './Renderer.js'

import World from './World/World.js'
import Preloader from './Preloader.js'

export default class Experience {
  static instance
  constructor(canvas) {
    if(Experience.instance) {
      return Experience.instance
    }
    Experience.instance = this
    this.canvas = canvas
    this.scene = new THREE.Scene()
    this.sizes = new Sizes()
    this.time = new Time()
    this.camera = new Camera()

    this.resources = new Resources(assets)
    this.renderer = new Renderer()
    this.world = new World()
    this.preloader = new Preloader()

    // this.preloader.on('enableControls', () => {
    //   this.controls = new Controls()
    // })

    this.scrolling = new Scrolling({
      element: document.querySelector('.right')
    })

    this.sizes.on('resize', () => {
      this.resize()
    })
    this.time.on('update', () => {
      this.update()
    })

  }

  resize() {
    this.camera.resize()
    this.world.resize()
    this.renderer.resize()
    this.scrolling.resize()
    document.documentElement.style.setProperty('--100vh', `${window.innerHeight}px`)
  }
  update() {
    this.camera.update()
    this.world.update()
    this.renderer.update()
    this.scrolling.update()
  }
}
