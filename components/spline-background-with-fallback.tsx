"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import Spline from "@splinetool/react-spline"
import * as THREE from "three"

export function SplineBackgroundWithFallback() {
  const [splineError, setSplineError] = useState(false)
  const [splineLoaded, setSplineLoaded] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Fallback Three.js setup
  useEffect(() => {
    if (splineError && canvasRef.current) {
      // Three.js setup
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })

      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // Create animated particles
      const particlesGeometry = new THREE.BufferGeometry()
      const particlesCount = 1000
      const posArray = new Float32Array(particlesCount * 3)

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10
      }

      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x00bcd4,
        transparent: true,
        opacity: 0.8,
      })

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
      scene.add(particlesMesh)

      // Create floating geometric shapes
      const geometries = [
        new THREE.OctahedronGeometry(0.3),
        new THREE.TetrahedronGeometry(0.3),
        new THREE.IcosahedronGeometry(0.3),
      ]

      const materials = [
        new THREE.MeshBasicMaterial({ color: 0x00bcd4, wireframe: true, transparent: true, opacity: 0.6 }),
        new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.6 }),
      ]

      const shapes: THREE.Mesh[] = []
      for (let i = 0; i < 8; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)]
        const material = materials[Math.floor(Math.random() * materials.length)]
        const shape = new THREE.Mesh(geometry, material)

        shape.position.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8)

        shapes.push(shape)
        scene.add(shape)
      }

      camera.position.z = 5

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate)

        // Rotate particles
        particlesMesh.rotation.x += 0.001
        particlesMesh.rotation.y += 0.002

        // Animate geometric shapes
        shapes.forEach((shape, index) => {
          shape.rotation.x += 0.01 + index * 0.001
          shape.rotation.y += 0.01 + index * 0.001
          shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001
        })

        renderer.render(scene, camera)
      }

      animate()

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
        renderer.dispose()
      }
    }
  }, [splineError])

  const handleSplineLoad = () => {
    console.log("[v0] Spline model loaded successfully")
    setSplineLoaded(true)
    setSplineError(false)
  }

  const handleSplineError = (error: any) => {
    console.log("[v0] Spline model failed to load, falling back to Three.js:", error)
    setSplineError(true)
    setSplineLoaded(false)
  }

  return (
    <>
      {!splineError && (
        <div className="fixed inset-0 w-full h-full -z-10">
          <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
            <Spline
              scene="https://my.spline.design/particlenebula-EWKtYZYoTyO0qwcn4uHhsUSy/"
              onLoad={handleSplineLoad}
              onError={handleSplineError}
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
            />
          </Suspense>
        </div>
      )}

      {splineError && (
        <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" style={{ background: "transparent" }} />
      )}
    </>
  )
}
