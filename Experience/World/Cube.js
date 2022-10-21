import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Cube {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time

    this.setModel()
  }

  setModel() {
    this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    this.material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
    this.cube = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.cube );

    this.cube.traverse((child) => {
      if(child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })
  }

  resize() {}

  update() {
    this.cube.rotation.x += this.time.delta * 0.001;
		this.cube.rotation.y += this.time.delta * 0.001;
  }
}
