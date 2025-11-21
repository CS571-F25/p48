import { useEffect, useRef } from "react"
import "./StarfieldBackground.css"

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

interface Constellation {
  stars: number[]
  edges: [number, number][] // Array of [starIndex1, starIndex2] pairs representing connections
  opacity: number
  glowIntensity: number
  createdAt: number
}

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create stars
    const stars: Star[] = []
    const numStars = 60

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
      })
    }

    // Constellation management
    const constellations: Constellation[] = []
    let lastConstellationTime = Date.now()
    let nextConstellationInterval = 0 // Will be set dynamically
    const constellationDuration = 2000 // Constellation blinks for 2.5 seconds
    const fadeInDuration = 200 // Fade in over 1 second
    const fadeOutDuration = 600 // Fade out over 1 second

    // Generate a random interval between 0 and 5 seconds, skewed towards longer times
    const getNextConstellationInterval = () => {
      // Using power function to skew towards longer times (closer to 5 seconds)
      // Math.pow(1 - Math.random(), 0.5) gives values skewed towards 1
      // Multiplying by 5000 gives values between 0 and 5000ms, skewed towards 5000ms
      return Math.pow(1 - Math.random(), 0.5) * 6000
    }

    // Initialize the first interval
    nextConstellationInterval = getNextConstellationInterval()

    // Build a tree structure (like a constellation) from a set of stars
    const buildConstellationTree = (starIndices: number[]): [number, number][] => {
      if (starIndices.length < 2) return []

      const edges: [number, number][] = []
      const connected = new Set<number>([starIndices[0]]) // Start with the first star
      const unconnected = new Set(starIndices.slice(1))

      // Build a tree by connecting each unconnected star to its nearest connected star
      while (unconnected.size > 0) {
        let minDistance = Infinity
        let bestConnection: [number, number] | null = null

        // Find the shortest connection between connected and unconnected stars
        for (const connectedStar of connected) {
          for (const unconnectedStar of unconnected) {
            const dx = stars[connectedStar].x - stars[unconnectedStar].x
            const dy = stars[connectedStar].y - stars[unconnectedStar].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < minDistance) {
              minDistance = distance
              bestConnection = [connectedStar, unconnectedStar]
            }
          }
        }

        if (bestConnection) {
          edges.push(bestConnection)
          connected.add(bestConnection[1])
          unconnected.delete(bestConnection[1])
        } else {
          break // Safety break
        }
      }

      // Add occasional forks: connect some additional stars to create branches
      // This creates a more natural constellation look with forks
      const forkProbability = 0.3 // 30% chance to add a fork

      // First, connect any remaining unconnected stars
      for (const connectedStar of Array.from(connected)) {
        if (Math.random() > forkProbability) continue

        // Find the nearest unconnected star to create a fork
        let minDist = Infinity
        let nearestUnconnected: number | null = null

        for (const candidate of starIndices) {
          if (connected.has(candidate) || candidate === connectedStar) continue

          const dx = stars[connectedStar].x - stars[candidate].x
          const dy = stars[connectedStar].y - stars[candidate].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < minDist && dist < 150) { // Only fork to nearby stars
            minDist = dist
            nearestUnconnected = candidate
          }
        }

        if (nearestUnconnected) {
          edges.push([connectedStar, nearestUnconnected])
          connected.add(nearestUnconnected)
        }
      }

      // Add some branches between already-connected stars to create forks
      // This makes the constellation look more like a real constellation with branches
      const connectedArray = Array.from(connected)
      for (let i = 0; i < connectedArray.length; i++) {
        if (Math.random() > forkProbability) continue

        const star1 = connectedArray[i]
        let minDist = Infinity
        let nearestOther: number | null = null

        for (let j = 0; j < connectedArray.length; j++) {
          if (i === j) continue
          const star2 = connectedArray[j]

          // Check if they're already directly connected
          const alreadyConnected = edges.some(
            ([a, b]) => (a === star1 && b === star2) || (a === star2 && b === star1)
          )
          if (alreadyConnected) continue

          const dx = stars[star1].x - stars[star2].x
          const dy = stars[star1].y - stars[star2].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < minDist && dist < 120) { // Only fork to nearby stars
            minDist = dist
            nearestOther = star2
          }
        }

        if (nearestOther !== null) {
          edges.push([star1, nearestOther])
        }
      }

      return edges
    }

    const createConstellation = () => {
      // Pick 4-7 random stars that are relatively close
      const numStarsInConstellation = Math.floor(Math.random() * 7) + 4
      const centerStar = Math.floor(Math.random() * stars.length)
      const constellationStars = [centerStar]

      // Find nearby stars
      const centerX = stars[centerStar].x
      const centerY = stars[centerStar].y
      const maxDistance = 200

      for (let i = 0; i < stars.length && constellationStars.length < numStarsInConstellation; i++) {
        if (i === centerStar) continue

        const dx = stars[i].x - centerX
        const dy = stars[i].y - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          constellationStars.push(i)
        }
      }

      if (constellationStars.length >= 2) {
        const edges = buildConstellationTree(constellationStars)
        constellations.push({
          stars: constellationStars,
          edges: edges,
          opacity: 0,
          glowIntensity: 0,
          createdAt: Date.now(),
        })
      }
    }

    // Fixed update rate: 30 updates per second
    const updatesPerSecond = 30
    const updateInterval = 1000 / updatesPerSecond // ~33.33ms per update

    // Animation loop with fixed update rate
    const animate = () => {
      const now = Date.now()

      // Clear canvas
      ctx.fillStyle = "rgba(10, 10, 25, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create new constellation if needed
      if (now - lastConstellationTime > nextConstellationInterval) {
        createConstellation()
        lastConstellationTime = now
        nextConstellationInterval = getNextConstellationInterval()
      }

      // Update and draw constellations
      for (let i = constellations.length - 1; i >= 0; i--) {
        const constellation = constellations[i]
        const age = now - constellation.createdAt

        // Single blink: fade in and out slowly
        if (age < fadeInDuration) {
          // Fade in
          constellation.opacity = age / fadeInDuration
          constellation.glowIntensity = age / fadeInDuration
        } else if (age > constellationDuration - fadeOutDuration) {
          // Fade out
          const fadeOutProgress = (constellationDuration - age) / fadeOutDuration
          constellation.opacity = fadeOutProgress
          constellation.glowIntensity = fadeOutProgress
        } else {
          // Fully visible at peak
          constellation.opacity = 1
          constellation.glowIntensity = 1
        }

        // Remove old constellations
        if (age > constellationDuration) {
          constellations.splice(i, 1)
          continue
        }

        // Draw constellation lines with white glow (tree structure with forks)
        ctx.strokeStyle = `rgba(255, 255, 255, ${constellation.opacity * 0.8})`
        ctx.lineWidth = 1.5
        ctx.shadowBlur = 15 * constellation.glowIntensity
        ctx.shadowColor = "rgba(255, 255, 255, 0.9)"

        // Draw each edge as a line segment
        constellation.edges.forEach(([starIndex1, starIndex2]) => {
          const star1 = stars[starIndex1]
          const star2 = stars[starIndex2]

          ctx.beginPath()
          ctx.moveTo(star1.x, star1.y)
          ctx.lineTo(star2.x, star2.y)
          ctx.stroke()
        })

        // Draw white glow circles at constellation stars
        constellation.stars.forEach((starIndex) => {
          const star = stars[starIndex]
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 15)
          gradient.addColorStop(0, `rgba(255, 255, 255, ${constellation.opacity * constellation.glowIntensity * 0.3})`)
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

          ctx.fillStyle = gradient
          ctx.shadowBlur = 0
          ctx.beginPath()
          ctx.arc(star.x, star.y, 25, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      ctx.shadowBlur = 0

      // Get all stars that are part of active constellations
      const activeConstellationStars = new Set<number>()
      constellations.forEach((constellation) => {
        constellation.stars.forEach((starIndex) => {
          activeConstellationStars.add(starIndex)
        })
      })

      // Update and draw stars
      stars.forEach((star, index) => {
        // Only update position if star is not in an active constellation
        if (!activeConstellationStars.has(index)) {
          // Update position
          star.x += star.vx
          star.y += star.vy

          // Wrap around edges
          if (star.x < 0) star.x = canvas.width
          if (star.x > canvas.width) star.x = 0
          if (star.y < 0) star.y = canvas.height
          if (star.y > canvas.height) star.y = 0
        }

        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Start animation loop at exactly 30 updates per second
    const intervalId = setInterval(animate, updateInterval)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="starfield-canvas"
    />
  )
}

