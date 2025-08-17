"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

// Extend Window interface for WebGL support check
declare global {
  interface Window {
    WebGLRenderingContext: typeof WebGLRenderingContext
  }
}

export function Reliable3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const [webglError, setWebglError] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    // Check if WebGL is supported
    if (!window.WebGLRenderingContext) {
      console.warn("WebGL not supported, falling back to static background")
      setWebglError(true)
      return
    }

    let animationFrameId: number
    let isDisposed = false

    try {
      const scene = new THREE.Scene()
      sceneRef.current = scene
      
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current, 
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      })
      rendererRef.current = renderer

      // Check if WebGL context was created successfully
      if (!renderer.getContext()) {
        console.warn("Failed to create WebGL context")
        setWebglError(true)
        return
      }

      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // Create animated particles with nebula effect
      const particlesGeometry = new THREE.BufferGeometry()
      const particlesCount = 1500 // Reduced for better performance
      const posArray = new Float32Array(particlesCount * 3)
      const colorArray = new Float32Array(particlesCount * 3)

      for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position particles in a spherical distribution
        const radius = Math.random() * 8 + 2
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI

        posArray[i] = radius * Math.sin(phi) * Math.cos(theta)
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
        posArray[i + 2] = radius * Math.cos(phi)

        // Assign colors (purple, blue, cyan, pink)
        const colorChoice = Math.random()
        if (colorChoice < 0.25) {
          colorArray[i] = 0.6
          colorArray[i + 1] = 0.2
          colorArray[i + 2] = 0.8 // Purple
        } else if (colorChoice < 0.5) {
          colorArray[i] = 0.2
          colorArray[i + 1] = 0.6
          colorArray[i + 2] = 1.0 // Blue
        } else if (colorChoice < 0.75) {
          colorArray[i] = 0.0
          colorArray[i + 1] = 0.8
          colorArray[i + 2] = 1.0 // Cyan
        } else {
          colorArray[i] = 1.0
          colorArray[i + 1] = 0.4
          colorArray[i + 2] = 0.8 // Pink
        }
      }

      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
      particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3))

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.008,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      })

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
      scene.add(particlesMesh)

      const orbs: THREE.Mesh[] = []
      const orbColors = [0xff0080, 0x00ff80, 0x8000ff, 0xff8000, 0x0080ff]

      for (let i = 0; i < 6; i++) { // Reduced number of orbs
        const orbGeometry = new THREE.SphereGeometry(0.1, 16, 16)
        const orbMaterial = new THREE.MeshBasicMaterial({
          color: orbColors[i % orbColors.length],
          transparent: true,
          opacity: 0.7,
        })

        const orb = new THREE.Mesh(orbGeometry, orbMaterial)
        orb.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10)

        orbs.push(orb)
        scene.add(orb)
      }

      camera.position.z = 5

      // Animation loop
      const animate = () => {
        if (isDisposed) return

        animationFrameId = requestAnimationFrame(animate)

        try {
          const time = Date.now() * 0.001

          particlesMesh.rotation.x = time * 0.1
          particlesMesh.rotation.y = time * 0.15

          // Animate orbs
          orbs.forEach((orb, index) => {
            orb.rotation.x += 0.02
            orb.rotation.y += 0.02
            orb.position.y += Math.sin(time + index) * 0.002

            // Pulsing effect
            const scale = 1 + Math.sin(time * 2 + index) * 0.2
            orb.scale.setScalar(scale)
          })

          if (renderer && scene && camera) {
            renderer.render(scene, camera)
          }
        } catch (error) {
          console.warn("Error in animation loop:", error)
          isDisposed = true
          setWebglError(true)
        }
      }

      animate()

      // Handle resize
      const handleResize = () => {
        if (isDisposed) return
        
        try {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        } catch (error) {
          console.warn("Error in resize handler:", error)
        }
      }

      window.addEventListener("resize", handleResize)

      return () => {
        isDisposed = true
        window.removeEventListener("resize", handleResize)
        
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
        }
        
        if (rendererRef.current) {
          rendererRef.current.dispose()
          rendererRef.current = null
        }
        
        if (sceneRef.current) {
          sceneRef.current.clear()
          sceneRef.current = null
        }
      }
    } catch (error) {
      console.warn("Error setting up 3D background:", error)
      setWebglError(true)
      return () => {}
    }
  }, [])

  // Fallback background when WebGL fails
  if (webglError) {
    return (
      <div className="fixed inset-0 w-full h-full -z-5 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      </div>
    )
  }

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-5" style={{ background: "transparent" }} />
}
