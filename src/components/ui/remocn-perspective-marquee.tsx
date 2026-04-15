"use client"

import { useCurrentFrame } from "remotion"

export interface PerspectiveMarqueeProps {
  items?: string[]
  fontSize?: number
  color?: string
  fontWeight?: number
  pixelsPerFrame?: number
  rotateY?: number
  rotateX?: number
  perspective?: number
  fadeColor?: string
  background?: string
  speed?: number
  className?: string
  glowColor?: string
}

const FONT_FAMILY = "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif"

const DEFAULT_ITEMS = [
  "KITS Innovation Club",
  "Build Nights",
  "Hackathons",
  "Workshops",
  "Partner Mentors",
  "Open Source",
  "Product Thinking",
  "Career Launchpad",
]

export function PerspectiveMarquee({
  items = DEFAULT_ITEMS,
  fontSize = 84,
  color = "#fafafa",
  fontWeight = 700,
  pixelsPerFrame = 2,
  rotateY = -28,
  rotateX = 8,
  perspective = 1200,
  fadeColor = "#0a0908",
  background = "#0a0908",
  speed = 1,
  className,
  glowColor = "#c89b2a",
}: PerspectiveMarqueeProps) {
  const frame = useCurrentFrame() * speed

  const itemPadding = fontSize * 0.9
  const approxItemWidth = items.reduce(
    (acc, item) => acc + item.length * fontSize * 0.6 + itemPadding,
    0,
  )

  const offset = -((frame * pixelsPerFrame) % approxItemWidth)
  const rendered = [...items, ...items, ...items]

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        perspective: `${perspective}px`,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            transform: `translateX(${offset}px)`,
          }}
        >
          {rendered.map((item, i) => {
            const itemCenter = i * (approxItemWidth / items.length) + approxItemWidth / items.length / 2 + offset
            const norm = (itemCenter - 640) / 640
            const distance = Math.min(1, Math.abs(norm))
            const blurPx = distance * 3
            const opacity = 1 - distance * 0.3
            const scale = 1 - distance * 0.06
            const glowOpacity = Math.max(0.08, 0.32 - distance * 0.22)

            return (
              <span
                key={`${item}-${i}`}
                style={{
                  display: "inline-block",
                  fontFamily: FONT_FAMILY,
                  fontSize,
                  fontWeight,
                  color,
                  letterSpacing: "-0.03em",
                  paddingRight: itemPadding,
                  filter: `blur(${blurPx}px)`,
                  opacity,
                  transform: `translateZ(${(1 - distance) * 55}px) scale(${scale})`,
                  textShadow: `0 0 22px color-mix(in srgb, ${glowColor} ${Math.round(glowOpacity * 100)}%, transparent), 0 0 2px rgba(255,255,255,0.25)`,
                }}
              >
                {item}
              </span>
            )
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `linear-gradient(90deg, ${fadeColor} 0%, transparent 18%, transparent 82%, ${fadeColor} 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `linear-gradient(180deg, ${fadeColor} 0%, transparent 25%, transparent 75%, ${fadeColor} 100%)`,
        }}
      />
    </div>
  )
}
