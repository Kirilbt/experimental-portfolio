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
  }

  onWheel ({ deltaY }) {
    this.target += deltaY
  }

  onTouchStart (event) {
    this.isDown = true

    this.y = event.touches ? event.touches[0].clientY : event.clientY
    this.position = this.current
  }

  onTouchMove (event) {
    if (!this.isDown) return

    const y = event.touches ? event.touches[0].clientY : event.clientY
    const distance = this.y - y

    this.target = this.position + (distance * 3)
  }

  onTouchEnd (event) {
    this.isDown = false
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

  update () {
    this.target = clamp(this.target, 0, this.limit)
    this.current = lerp(this.current, this.target, this.easing)

    this.element.style.transform = `translate3d(0, -${this.current}px, 0)`
  }

  resize() {
    this.limit = this.wrapper.clientHeight - this.element.clientHeight
  }
}
