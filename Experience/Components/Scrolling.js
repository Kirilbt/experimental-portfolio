import { clamp, lerp } from '../Utils/math.js'

export default class Scrolling {
  constructor({ element }) {
    this.element = element
    this.wrapper = element.children[0]

    this.current = 0
    this.target = 0
    this.easing = 0.05
    this.limit = 0

    this.addObserver()
    this.addEventListeners()
    this.update()
  }

  onWheel ({ deltaY }) {
    this.target += deltaY
  }

  onTouchStart (event) {
    // console.log(event)
  }

  onTouchMove (event) {
    // console.log(event)
  }

  onTouchEnd (event) {
    // console.log(event)
  }

  update () {
    this.target = clamp(this.target, 0, this.limit)
    this.current = lerp(this.current, this.target, this.easing)

    this.element.style.transform = `translate3d(0, -${this.current}px, 0)`
  }

  resize() {
    this.limit = this.wrapper.clientHeight - this.element.clientHeight
  }

  addObserver() {
    this.observer = new window.ResizeObserver(entries => {
      for (const entry of entries) {
        this.resize()
      }
    })

    this.observer.observe(this.wrapper)
  }

  addEventListeners () {
    window.addEventListener('wheel', this.onWheel.bind(this))

    window.addEventListener('touchstart', this.onTouchStart.bind(this))
    window.addEventListener('touchmove', this.onTouchMove.bind(this))
    window.addEventListener('touchend', this.onTouchEnd.bind(this))

    window.addEventListener('mousedown', this.onTouchStart.bind(this))
    window.addEventListener('mousemove', this.onTouchMove.bind(this))
    window.addEventListener('mouseup', this.onTouchEnd.bind(this))
  }
}
