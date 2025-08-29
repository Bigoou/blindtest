<template>
  <canvas
    ref="canvas"
    class="confetti-canvas"
    :width="canvasWidth"
    :height="canvasHeight"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
const canvasWidth = ref(window.innerWidth)
const canvasHeight = ref(window.innerHeight)

let ctx = null
let confetti = []
let animationId = null

class ConfettiPiece {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * 8
    this.vy = Math.random() * -8 - 5
    this.gravity = 0.3
    this.color = color
    this.size = Math.random() * 8 + 4
    this.rotation = Math.random() * 360
    this.rotationSpeed = (Math.random() - 0.5) * 10
    this.opacity = 1
    this.decay = Math.random() * 0.02 + 0.005
  }
  
  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy += this.gravity
    this.rotation += this.rotationSpeed
    this.opacity -= this.decay
    
    if (this.y > canvasHeight.value + 50 || this.opacity <= 0) {
      return false
    }
    return true
  }
  
  draw() {
    if (!ctx) return
    
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation * Math.PI / 180)
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
    ctx.restore()
  }
}

function createConfetti(x, y, colors, count = 50) {
  for (let i = 0; i < count; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)]
    confetti.push(new ConfettiPiece(x, y, color))
  }
}

function animate() {
  if (!ctx) return
  
  ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
  
  confetti = confetti.filter(piece => {
    const alive = piece.update()
    if (alive) {
      piece.draw()
    }
    return alive
  })
  
  if (confetti.length > 0) {
    animationId = requestAnimationFrame(animate)
  }
}

function triggerConfetti(x, y, colors) {
  createConfetti(x, y, colors)
  if (!animationId) {
    animate()
  }
}

function handleResize() {
  canvasWidth.value = window.innerWidth
  canvasHeight.value = window.innerHeight
}

defineExpose({
  triggerConfetti
})

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1000;
}
</style>