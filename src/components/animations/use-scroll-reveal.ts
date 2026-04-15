"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface UseScrollRevealProps {
  selector?: string
}

export function useScrollReveal({ selector = "[data-reveal]" }: UseScrollRevealProps = {}) {
  const containerReference = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const isReducedMotionPreferred = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (isReducedMotionPreferred) return
    if (!containerReference.current) return

    const elements = containerReference.current.querySelectorAll(selector)
    const animations = Array.from(elements).map((element) =>
      gsap.fromTo(
        element,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
        }
      )
    )

    return () => {
      animations.forEach((animation) => animation.kill())
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [selector])

  return { containerReference }
}
