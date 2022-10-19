import * as THREE from 'three'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { GammaCorrectionShader} from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

import displacementVertex from '/shaders/displacement/vertex.glsl'
import displacementFragment from '/shaders/displacement/fragment.glsl'

import Experience from './Experience.js'

export default class Renderer {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.sizes = this.experience.sizes
    this.time = this.experience.time
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera

    this.setRenderer()
    this.setRenderTarget()
    this.setEffectComposer()
    this.setRenderPass()
    this.setDotScreenPass()
    this.setDisplacementPass()
    this.setGammaCorrectionPass()
    this.setAntialiasPass()
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })

    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.toneMapping = THREE.CineonToneMapping
    this.renderer.toneMappingExposure = 1.75
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    // this.renderer.setClearColor('#222222')
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(this.sizes.pixelRatio)
  }

  setRenderTarget() {
    this.renderTarget = new THREE.WebGLRenderTarget(
      800,
      600,
      {
        samples: this.renderer.getPixelRatio() === 1 ? 2 : 0
      }
    )
  }

  setEffectComposer() {
    this.effectComposer = new EffectComposer(this.renderer, this.renderTarget)
    this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.effectComposer.setSize(this.sizes.width, this.sizes.height)
  }

  setRenderPass() {
    this.renderPass = new RenderPass(this.scene, this.camera.mainCamera)
    this.effectComposer.addPass(this.renderPass)
  }

  setDotScreenPass() {
    this.dotScreenPass = new DotScreenPass()
    this.dotScreenPass.enabled = true
    this.dotScreenPass.uniforms[ 'scale' ].value = 0.5;
    this.effectComposer.addPass(this.dotScreenPass)
  }

  setDisplacementPass() {
    const DisplacementShader = {
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: null }
      },
      vertexShader: displacementVertex,
      fragmentShader: displacementFragment
    }

    this.displacementPass = new ShaderPass(DisplacementShader)
    this.displacementPass.enabled = false
    this.displacementPass.material.uniforms.uTime.value = 0
    this.effectComposer.addPass(this.displacementPass)
  }

  setGammaCorrectionPass() {
    this.gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
    this.effectComposer.addPass(this.gammaCorrectionPass)
  }

  setAntialiasPass() {
    if(this.renderer.getPixelRatio() === 1 && !this.renderer.capabilities.isWebGL2) {
      this.smaaPass = new SMAAPass()
      this.effectComposer.addPass(this.smaaPass)
      console.log('using smaa');
    }
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    // Update Passes
    this.displacementPass.material.uniforms.uTime.value = this.time.elapsedTime

    // this.renderer.render(this.scene, this.camera.mainCamera)
    this.effectComposer.render()
  }
}
