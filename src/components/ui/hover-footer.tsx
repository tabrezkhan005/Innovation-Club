"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface TextHoverEffectProps {
  text: string
  duration?: number
  className?: string
}

export function TextHoverEffect({ text, duration = 0.22, className }: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" })

  useEffect(() => {
    if (!svgRef.current) return
    const svgRect = svgRef.current.getBoundingClientRect()
    const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100
    const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100
    setMaskPosition({
      cx: `${cxPercentage}%`,
      cy: `${cyPercentage}%`,
    })
  }, [cursor])

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 560 140"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("cursor-pointer select-none font-display text-[4.25rem] font-extrabold uppercase leading-none tracking-tight md:text-[5.25rem]", className)}
    >
      <defs>
        <linearGradient id="kitsIcTextGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="560" y2="140">
          {hovered ? (
            <>
              <stop offset="0%" stopColor="#e8c45a" />
              <stop offset="35%" stopColor="#f5e6a8" />
              <stop offset="55%" stopColor="#c89b2a" />
              <stop offset="100%" stopColor="#7a5c10" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#c89b2a" />
              <stop offset="100%" stopColor="#e8c45a" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="kitsIcRevealMask"
          gradientUnits="userSpaceOnUse"
          r="22%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="kitsIcTextMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#kitsIcRevealMask)" />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.35"
        className="fill-transparent stroke-white/25"
        style={{ opacity: hovered ? 0.65 : 0 }}
      >
        {text}
      </text>

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.35"
        className="fill-transparent stroke-accent-primary"
        initial={{ strokeDashoffset: 1200, strokeDasharray: 1200 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1200 }}
        transition={{ duration: 3.2, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#kitsIcTextGradient)"
        strokeWidth="0.35"
        mask="url(#kitsIcTextMask)"
        className="fill-transparent"
      >
        {text}
      </text>
    </svg>
  )
}

export function FooterBackgroundGradient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 0%, rgba(200,155,42,0.14) 0%, transparent 42%), radial-gradient(100% 90% at 50% 100%, rgba(18,17,16,0.95) 0%, #0a0908 55%)",
      }}
      aria-hidden
    />
  )
}
