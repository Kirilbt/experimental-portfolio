import * as THREE from 'three'
import { MeshStandardMaterial } from 'three'

import Experience from '../Experience.js'

export default class Text {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.text = this.resources.items.text
    this.actualText = this.text.scene

    this.setModel()
  }

  setModel() {
    this.scene.add(this.actualText)

    this.actualText.traverse((child) => {
      if(child instanceof THREE.Mesh) {
        child.castShadow = true
        child.material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
      }
    })
    this.actualText.scale.set(0.5, 0.5, 0.5)
  }

  resize() {}

  update() {
    this.actualText.rotation.x += this.time.delta * 0.001;
		this.actualText.rotation.y += this.time.delta * 0.001;
  }
}
