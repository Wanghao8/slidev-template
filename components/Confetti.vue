<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number | null = null
let particles: Particle[] = []

const colors = ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']

class Particle {
  x: number
  y: number
  w: number
  h: number
  vx: number
  vy: number
  color: string
  angle: number
  spin: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.w = Math.random() * 10 + 5
    this.h = Math.random() * 10 + 5
    this.vx = (Math.random() - 0.5) * 20
    this.vy = (Math.random() - 1) * 20 - 5
    this.color = colors[Math.floor(Math.random() * colors.length)]
    this.angle = Math.random() * 360
    this.spin = (Math.random() - 0.5) * 10
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy += 0.5 // Gravity
    this.angle += this.spin
    this.vx *= 0.95 // Friction
    this.vy *= 0.95
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate((this.angle * Math.PI) / 180)
    ctx.fillStyle = this.color
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h)
    ctx.restore()
  }
}

const celebrate = (event: MouseEvent) => {
  if (!canvasRef.value) return
  
  // Resize canvas to full screen
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
  
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  const originX = rect.left + rect.width / 2
  const originY = rect.top + rect.height / 2
  
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(originX, originY))
  }
  
  if (!animationFrameId) {
    loop()
  }
}

const loop = () => {
  if (!canvasRef.value) return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  particles.forEach((p, index) => {
    p.update()
    p.draw(ctx)
    if (p.y > canvasRef.value!.height + 100) {
      particles.splice(index, 1)
    }
  })

  if (particles.length > 0) {
    animationFrameId = requestAnimationFrame(loop)
  } else {
    animationFrameId = null
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  }
}

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <div class="relative inline-block">
    <button 
      @click="celebrate"
      class="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold rounded-full shadow-lg transform hover:scale-110 active:scale-95 transition-all duration-200 animate-pulse hover:animate-none"
    >
      🎉 Celebrate!
    </button>
    
    <Teleport to="body">
      <canvas 
        ref="canvasRef" 
        class="fixed inset-0 pointer-events-none z-[9999]"
      ></canvas>
    </Teleport>
  </div>
</template>
