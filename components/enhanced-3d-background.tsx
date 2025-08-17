"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function Enhanced3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Three.js setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Enhanced particle system with multiple layers
    const createParticleSystem = (count: number, size: number, color: number, speed: number) => {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(count * 3)
      const velocities = new Float32Array(count * 3)

      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20
        positions[i + 1] = (Math.random() - 0.5) * 20
        positions[i + 2] = (Math.random() - 0.5) * 20

        velocities[i] = (Math.random() - 0.5) * speed
        velocities[i + 1] = (Math.random() - 0.5) * speed
        velocities[i + 2] = (Math.random() - 0.5) * speed
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3))

      const material = new THREE.PointsMaterial({
        size,
        color,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      })

      return new THREE.Points(geometry, material)
    }

    // Create multiple particle layers
    const particleSystems = [
      createParticleSystem(800, 0.008, 0x00bcd4, 0.002), // Cyan particles
      createParticleSystem(600, 0.006, 0x6366f1, 0.001), // Purple particles
      createParticleSystem(400, 0.004, 0x8b5cf6, 0.0015), // Light purple particles
    ]

    particleSystems.forEach((system) => scene.add(system))

    const geometries = [
      new THREE.OctahedronGeometry(0.4),
      new THREE.TetrahedronGeometry(0.3),
      new THREE.IcosahedronGeometry(0.35),
      new THREE.DodecahedronGeometry(0.3),
      new THREE.TorusGeometry(0.3, 0.1, 8, 16),
      new THREE.ConeGeometry(0.2, 0.6, 8),
    ]

    const materials = [
      new THREE.MeshBasicMaterial({
        color: 0x00bcd4,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    ]

    const shapes: Array<{ mesh: THREE.Mesh; rotationSpeed: THREE.Vector3; floatSpeed: number }> = []

    for (let i = 0; i < 12; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = materials[Math.floor(Math.random() * materials.length)]
      const mesh = new THREE.Mesh(geometry, material)

      mesh.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15)

      const rotationSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
      )

      const floatSpeed = Math.random() * 0.002 + 0.001

      shapes.push({ mesh, rotationSpeed, floatSpeed })
      scene.add(mesh)
    }

    const revolvingObjects: Array<{
      mesh: THREE.Mesh
      orbitRadius: number
      orbitSpeed: number
      rotationSpeed: THREE.Vector3
      orbitAxis: THREE.Vector3
      orbitCenter: THREE.Vector3
    }> = []

    // New visible geometries with larger sizes
    const visibleGeometries = [
      new THREE.SphereGeometry(0.8, 16, 16), // Glowing spheres
      new THREE.BoxGeometry(1.0, 1.0, 1.0), // Solid cubes
      new THREE.CylinderGeometry(0.5, 0.5, 1.2, 8), // Cylinders
      new THREE.TorusGeometry(0.6, 0.2, 8, 16), // Torus rings
      new THREE.OctahedronGeometry(0.7), // Octahedrons
      new THREE.TetrahedronGeometry(0.8), // Tetrahedrons
      new THREE.DodecahedronGeometry(0.6), // Dodecahedrons
      new THREE.IcosahedronGeometry(0.7), // Icosahedrons
    ]

    // Bright solid materials for maximum visibility
    const visibleMaterials = [
      // Solid bright materials
      new THREE.MeshBasicMaterial({
        color: 0xff0080, // Hot pink
        transparent: true,
        opacity: 0.9,
        emissive: 0xff0080,
        emissiveIntensity: 0.3,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x00ff80, // Bright green
        transparent: true,
        opacity: 0.9,
        emissive: 0x00ff80,
        emissiveIntensity: 0.3,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x8000ff, // Electric purple
        transparent: true,
        opacity: 0.9,
        emissive: 0x8000ff,
        emissiveIntensity: 0.3,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xff8000, // Bright orange
        transparent: true,
        opacity: 0.9,
        emissive: 0xff8000,
        emissiveIntensity: 0.3,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x0080ff, // Electric blue
        transparent: true,
        opacity: 0.9,
        emissive: 0x0080ff,
        emissiveIntensity: 0.3,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xffff00, // Bright yellow
        transparent: true,
        opacity: 0.9,
        emissive: 0xffff00,
        emissiveIntensity: 0.3,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xff0040, // Red-pink
        transparent: true,
        opacity: 0.9,
        emissive: 0xff0040,
        emissiveIntensity: 0.3,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x40ff00, // Lime green
        transparent: true,
        opacity: 0.9,
        emissive: 0x40ff00,
        emissiveIntensity: 0.3,
      }),
    ]

    // Create highly visible revolving objects
    for (let i = 0; i < 20; i++) {
      const geometry = visibleGeometries[Math.floor(Math.random() * visibleGeometries.length)]
      const material = visibleMaterials[Math.floor(Math.random() * visibleMaterials.length)]
      const mesh = new THREE.Mesh(geometry, material)

      const orbitRadius = 4 + Math.random() * 10
      const orbitSpeed = (Math.random() - 0.5) * 0.015
      const rotationSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.04,
      )

      // Random orbit axis for varied movement patterns
      const orbitAxis = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()

      // Random orbit center for complex paths
      const orbitCenter = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
      )

      revolvingObjects.push({
        mesh,
        orbitRadius,
        orbitSpeed,
        rotationSpeed,
        orbitAxis,
        orbitCenter,
      })
      scene.add(mesh)
    }

    const glowingOrbs: Array<{ mesh: THREE.Mesh; floatSpeed: number; initialY: number }> = []

    for (let i = 0; i < 8; i++) {
      const orbGeometry = new THREE.SphereGeometry(0.3, 16, 16)
      const orbMaterial = new THREE.MeshBasicMaterial({
        color: [0xff0080, 0x00ff80, 0x8000ff, 0xff8000, 0x0080ff][i % 5],
        transparent: true,
        opacity: 0.8,
        emissive: [0xff0080, 0x00ff80, 0x8000ff, 0xff8000, 0x0080ff][i % 5],
        emissiveIntensity: 0.5,
      })

      const orb = new THREE.Mesh(orbGeometry, orbMaterial)
      orb.position.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 16, (Math.random() - 0.5) * 16)

      glowingOrbs.push({
        mesh: orb,
        floatSpeed: Math.random() * 0.01 + 0.005,
        initialY: orb.position.y,
      })
      scene.add(orb)
    }

    // Add ambient lighting for better depth perception
    const ambientLight = new THREE.AmbientLight(0x404040, 0.1)
    scene.add(ambientLight)

    camera.position.z = 8

    // Enhanced animation loop with more dynamic movement
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.01

      // Animate particle systems with wave motion
      particleSystems.forEach((system, index) => {
        const positions = system.geometry.attributes.position.array as Float32Array
        const velocities = system.geometry.attributes.velocity.array as Float32Array

        for (let i = 0; i < positions.length; i += 3) {
          // Add wave motion
          positions[i] += velocities[i] + Math.sin(time + i * 0.01) * 0.001
          positions[i + 1] += velocities[i + 1] + Math.cos(time + i * 0.01) * 0.001
          positions[i + 2] += velocities[i + 2]

          // Boundary wrapping
          if (Math.abs(positions[i]) > 10) positions[i] *= -0.8
          if (Math.abs(positions[i + 1]) > 10) positions[i + 1] *= -0.8
          if (Math.abs(positions[i + 2]) > 10) positions[i + 2] *= -0.8
        }

        system.geometry.attributes.position.needsUpdate = true

        // Rotate entire particle system
        system.rotation.x += 0.0005 * (index + 1)
        system.rotation.y += 0.001 * (index + 1)
      })

      // Enhanced geometric shape animations
      shapes.forEach((shape, index) => {
        const { mesh, rotationSpeed, floatSpeed } = shape

        // Complex rotation
        mesh.rotation.x += rotationSpeed.x
        mesh.rotation.y += rotationSpeed.y
        mesh.rotation.z += rotationSpeed.z

        // Floating motion with different patterns
        mesh.position.y += Math.sin(time * floatSpeed + index) * 0.002
        mesh.position.x += Math.cos(time * floatSpeed * 0.7 + index) * 0.001
        mesh.position.z += Math.sin(time * floatSpeed * 1.3 + index) * 0.0015

        // Pulsing scale effect
        const scale = 1 + Math.sin(time * 2 + index) * 0.1
        mesh.scale.setScalar(scale)

        // Orbital motion for some shapes
        if (index % 3 === 0) {
          const radius = 3 + Math.sin(time * 0.5) * 0.5
          mesh.position.x = Math.cos(time * 0.3 + index) * radius
          mesh.position.z = Math.sin(time * 0.3 + index) * radius
        }
      })

      revolvingObjects.forEach((obj, index) => {
        const { mesh, orbitRadius, orbitSpeed, rotationSpeed, orbitAxis, orbitCenter } = obj

        // Self rotation
        mesh.rotation.x += rotationSpeed.x
        mesh.rotation.y += rotationSpeed.y
        mesh.rotation.z += rotationSpeed.z

        // Complex orbital motion around orbit center
        const orbitTime = time * orbitSpeed + index * 0.5

        // Create orbital position using quaternion rotation
        const position = new THREE.Vector3(orbitRadius, 0, 0)
        const quaternion = new THREE.Quaternion()
        quaternion.setFromAxisAngle(orbitAxis, orbitTime)
        position.applyQuaternion(quaternion)
        position.add(orbitCenter)

        // Add secondary orbital motion for more complexity
        const secondaryRadius = orbitRadius * 0.3
        const secondaryOrbitTime = time * orbitSpeed * 2 + index
        position.x += Math.cos(secondaryOrbitTime) * secondaryRadius * 0.5
        position.y += Math.sin(secondaryOrbitTime * 1.3) * secondaryRadius * 0.3
        position.z += Math.cos(secondaryOrbitTime * 0.7) * secondaryRadius * 0.4

        mesh.position.copy(position)

        // Dynamic scaling based on distance from center
        const distanceFromCenter = mesh.position.distanceTo(new THREE.Vector3(0, 0, 0))
        const scale = 0.8 + Math.sin(time + index) * 0.3 + (1 / (distanceFromCenter * 0.1 + 1)) * 0.4
        mesh.scale.setScalar(scale)

        // Maintain high opacity for visibility
        if (mesh.material instanceof THREE.MeshBasicMaterial) {
          mesh.material.opacity = Math.max(0.7, 1.0 - distanceFromCenter * 0.01)
        }
      })

      glowingOrbs.forEach((orb, index) => {
        orb.mesh.position.y = orb.initialY + Math.sin(time * orb.floatSpeed + index) * 2
        orb.mesh.rotation.x += 0.01
        orb.mesh.rotation.y += 0.015

        // Pulsing glow effect
        const pulse = 0.5 + Math.sin(time * 3 + index) * 0.3
        if (orb.mesh.material instanceof THREE.MeshBasicMaterial) {
          orb.mesh.material.emissiveIntensity = pulse
        }
      })

      // Camera subtle movement for depth
      camera.position.x = Math.sin(time * 0.1) * 0.5
      camera.position.y = Math.cos(time * 0.15) * 0.3
      camera.lookAt(0, 0, 0)

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

      // Clean up geometries and materials
      particleSystems.forEach((system) => {
        system.geometry.dispose()
        if (Array.isArray(system.material)) {
          system.material.forEach((mat) => mat.dispose())
        } else {
          system.material.dispose()
        }
      })

      shapes.forEach((shape) => {
        shape.mesh.geometry.dispose()
        if (Array.isArray(shape.mesh.material)) {
          shape.mesh.material.forEach((mat) => mat.dispose())
        } else {
          shape.mesh.material.dispose()
        }
      })

      revolvingObjects.forEach((obj) => {
        obj.mesh.geometry.dispose()
        if (Array.isArray(obj.mesh.material)) {
          obj.mesh.material.forEach((mat) => mat.dispose())
        } else {
          obj.mesh.material.dispose()
        }
      })

      glowingOrbs.forEach((orb) => {
        orb.mesh.geometry.dispose()
        if (Array.isArray(orb.mesh.material)) {
          orb.mesh.material.forEach((mat) => mat.dispose())
        } else {
          orb.mesh.material.dispose()
        }
      })
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
}
