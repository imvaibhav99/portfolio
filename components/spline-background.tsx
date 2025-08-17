"use client"

import { Suspense, useState, useCallback } from "react"
import Spline from "@splinetool/react-spline"
import { Enhanced3DBackground } from "./enhanced-3d-background"

export function SplineBackground() {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = useCallback(() => {
    console.log("[v0] Spline model loaded successfully")
    setIsLoading(false)
  }, [])

  const handleError = useCallback((error: any) => {
    console.log("[v0] Spline loading error:", error)
    setHasError(true)
    setIsLoading(false)
  }, [])

  if (hasError) {
    return <Enhanced3DBackground />
  }

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Suspense
        fallback={
          <div className="w-full h-full bg-gradient-to-br from-background via-background/95 to-background flex items-center justify-center">
            <div className="text-muted-foreground animate-pulse">Loading 3D Scene...</div>
          </div>
        }
      >
        <Spline
          scene="https://prod.spline.design/EWKtYZYoTyO0qwcn4uHhsUSy/scene.splinecode"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
          }}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background flex items-center justify-center">
            <div className="text-muted-foreground animate-pulse">Loading Particle Nebula...</div>
          </div>
        )}
      </Suspense>
    </div>
  )
}
