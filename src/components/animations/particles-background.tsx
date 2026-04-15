"use client"

import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { ISourceOptions } from "@tsparticles/engine"

export function ParticlesBackground() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setIsReady(true))
  }, [])

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: false,
      background: { color: "transparent" },
      fpsLimit: 60,
      particles: {
        color: { value: "#C89B2A" },
        links: {
          color: "#C89B2A",
          distance: 120,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: { enable: true, speed: 0.7 },
        number: { value: 45 },
        opacity: { value: 0.3 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    []
  )

  if (!isReady) return null

  return <Particles id="hero-particles" options={options} className="absolute inset-0" />
}
