import { useEffect, useRef } from "react"
import "./StarfieldBackground.css"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleOffset: number
}

interface Comet {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  trail: { x: number; y: number; opacity: number }[]
}

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.2 + 0.3, // Smaller: 0.3 to 1.5px
      opacity: Math.random() * 0.2 + 0.8, // Range: 0.8 to 1.0
      twinkleSpeed: Math.random() * 0.003 + 0.001,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))

    const comets: Comet[] = []
    const maxComets = 5

    const createComet = () => {
      const startFromTop = Math.random() > 0.5
      return {
        x: startFromTop ? Math.random() * canvas.width : canvas.width,
        y: startFromTop ? 0 : Math.random() * canvas.height * 0.5,
        // Faster horizontal, gentler vertical drift for a flatter angle
        vx: -(Math.random() * 3 + 3),
        vy: Math.random() * 0.8 + 0.4,
        size: Math.random() * 1 + 0.5, // Smaller comets
        opacity: 1,
        trail: [],
      }
    }

    const targetFPS = 60
    const frameInterval = 1000 / targetFPS
    let lastFrameTime = performance.now()
    let time = 0

    const drawStar = (x: number, y: number, size: number, opacity: number) => {
      // Subtle glow - pure white/gray only
      const glowSize = size * 3
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize)
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.8})`)
      gradient.addColorStop(0.4, `rgba(255, 255, 255, ${opacity * 0.15})`)
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, glowSize, 0, Math.PI * 2)
      ctx.fill()

      // Draw subtle diffraction spikes for larger stars
      if (size > 0.8) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`
        ctx.lineWidth = 0.5
        const spikeLength = size * 2.5

        // Vertical spike
        ctx.beginPath()
        ctx.moveTo(x, y - spikeLength)
        ctx.lineTo(x, y + spikeLength)
        ctx.stroke()

        // Horizontal spike
        ctx.beginPath()
        ctx.moveTo(x - spikeLength, y)
        ctx.lineTo(x + spikeLength, y)
        ctx.stroke()
      }

      // Tiny bright core - single pixel effect
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.fillRect(x - size / 2, y - size / 2, size, size)
    }

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTime

      // Only update if enough time has passed for target FPS
      if (deltaTime >= frameInterval) {
        lastFrameTime = currentTime - (deltaTime % frameInterval)
        time += deltaTime / 1000

        ctx.fillStyle = "#06060a"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw stars
        stars.forEach((star) => {
          const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.1 + 0.9
          const currentOpacity = Math.min(star.opacity * twinkle, 1.0)
          drawStar(star.x, star.y, star.size, currentOpacity)
        })

        // Spawn comets randomly
        if (comets.length < maxComets && Math.random() < 0.02) {
          comets.push(createComet())
        }

        // Update and draw comets
        for (let i = comets.length - 1; i >= 0; i--) {
          const comet = comets[i]

          comet.trail.unshift({ x: comet.x, y: comet.y, opacity: comet.opacity })
          if (comet.trail.length > 30) {
            comet.trail.pop()
          }

          comet.x += comet.vx
          comet.y += comet.vy

          if (comet.x < canvas.width * 0.2 || comet.y > canvas.height * 0.8) {
            comet.opacity -= 0.015
          }

          comet.trail.forEach((point, j) => {
            const trailOpacity = point.opacity * (1 - j / comet.trail.length) * 0.5
            const trailSize = comet.size * (1 - j / comet.trail.length)

            const trailGradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, trailSize * 2)
            trailGradient.addColorStop(0, `rgba(255, 255, 255, ${trailOpacity})`)
            trailGradient.addColorStop(0.5, `rgba(200, 200, 200, ${trailOpacity * 0.3})`)
            trailGradient.addColorStop(1, "rgba(150, 150, 150, 0)")

            ctx.fillStyle = trailGradient
            ctx.beginPath()
            ctx.arc(point.x, point.y, trailSize * 2, 0, Math.PI * 2)
            ctx.fill()
          })

          const cometGradient = ctx.createRadialGradient(comet.x, comet.y, 0, comet.x, comet.y, comet.size * 4)
          cometGradient.addColorStop(0, `rgba(255, 255, 255, ${comet.opacity})`)
          cometGradient.addColorStop(0.3, `rgba(220, 220, 220, ${comet.opacity * 0.5})`)
          cometGradient.addColorStop(1, "rgba(180, 180, 180, 0)")

          ctx.fillStyle = cometGradient
          ctx.beginPath()
          ctx.arc(comet.x, comet.y, comet.size * 4, 0, Math.PI * 2)
          ctx.fill()

          // Bright core
          ctx.fillStyle = `rgba(255, 255, 255, ${comet.opacity})`
          ctx.fillRect(comet.x - comet.size / 2, comet.y - comet.size / 2, comet.size, comet.size)

          if (comet.x < -50 || comet.y > canvas.height + 50 || comet.opacity <= 0) {
            comets.splice(i, 1)
          }
        }
      }

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="starfield-canvas"
    />
  )
}

