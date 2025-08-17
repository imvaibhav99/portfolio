"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function ParticleNebula() {
  const ref = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(5000 * 3)
    const colors = new Float32Array(5000 * 3)

    for (let i = 0; i < 5000; i++) {
      // Create spherical distribution
      const radius = Math.random() * 25 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Nebula colors - purple, blue, cyan, pink
      const colorChoice = Math.random()
      if (colorChoice < 0.25) {
        colors[i * 3] = 0.5 + Math.random() * 0.5 // R
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.3 // G
        colors[i * 3 + 2] = 1 // B (blue)
      } else if (colorChoice < 0.5) {
        colors[i * 3] = 0.8 + Math.random() * 0.2 // R
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.3 // G
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2 // B (purple)
      } else if (colorChoice < 0.75) {
        colors[i * 3] = 0.2 + Math.random() * 0.3 // R
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2 // G
        colors[i * 3 + 2] = 1 // B (cyan)
      } else {
        colors[i * 3] = 1 // R
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.4 // G
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2 // B (pink)
      }
    }

    return [positions, colors]
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    })
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      ref.current.rotation.y += 0.002
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.05

      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      ref.current.scale.setScalar(scale)
    }
  })

  return <points ref={ref} geometry={geometry} material={material} />
}

function FloatingOrbs() {
  const orbsRef = useRef<THREE.Group>(null)

  const orbs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40] as [
        number,
        number,
        number,
      ],
      color: ["#00ffff", "#ff00ff", "#ffff00", "#ff6600", "#00ff66", "#6600ff", "#ff0066", "#66ff00"][i],
      speed: 0.5 + Math.random() * 0.5,
    }))
  }, [])

  useFrame((state) => {
    if (orbsRef.current && orbsRef.current.children && orbsRef.current.children.length > 0) {
      orbsRef.current.children.forEach((orb, i) => {
        if (orb && orb.position && orbs[i]) {
          const time = state.clock.elapsedTime * orbs[i].speed
          orb.position.y += Math.sin(time + i) * 0.01
          orb.position.x += Math.cos(time + i) * 0.005
        }
      })
    }
  })

  return (
    <group ref={orbsRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.6} emissive={orb.color} emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

export function ParticleNebulaBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.2} />
        <ParticleNebula />
        <FloatingOrbs />
      </Canvas>
    </div>
  )
}
