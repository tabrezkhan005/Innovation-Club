"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"

interface LenisProviderProps {
  children: React.ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const isReducedMotionPreferred = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (isReducedMotionPreferred) return

    const lenis = new Lenis({
      lerp: 0.08,
    })

    const update = (timeInSeconds: number) => {
      lenis.raf(timeInSeconds * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
