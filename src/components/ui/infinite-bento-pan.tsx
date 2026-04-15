"use client"

import type { CSSProperties } from "react"
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion"
import {
  CLUB_BENTO_CARDS,
  SUPER_CANVAS_H,
  SUPER_CANVAS_W,
  type CardDef,
} from "@/components/ui/infinite-bento-pan-data"

export interface InfiniteBentoPanProps {
  panSpeed?: number
  accentColor?: string
  speed?: number
  className?: string
}

const FONT_FAMILY = 'var(--font-inter), ui-sans-serif, system-ui, sans-serif'

const CARDS = CLUB_BENTO_CARDS
const SUPER_W = SUPER_CANVAS_W
const SUPER_H = SUPER_CANVAS_H

function noise(i: number, frame: number) {
  return Math.sin(frame / 30 + i) * 0.5 + 0.5
}

function ChartCard({ accent, t }: { accent: string; t: number }) {
  const points: string[] = []
  for (let i = 0; i < 12; i++) {
    const x = (i / 11) * 100
    const y = 50 - (Math.sin(i * 0.7 + t) * 18 + Math.cos(i * 0.4 + t * 0.6) * 8)
    points.push(`${x},${y}`)
  }
  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={accent}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline points={`${points.join(" ")} 100,60 0,60`} fill={`${accent}22`} stroke="none" />
    </svg>
  )
}

function BarsCard({ accent, t }: { accent: string; t: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        height: "100%",
        width: "100%",
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => {
        const h = 25 + (Math.sin(i * 0.8 + t) * 0.5 + 0.5) * 70
        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              background: `linear-gradient(180deg, ${accent} 0%, ${accent}55 100%)`,
              borderRadius: 4,
            }}
          />
        )
      })}
    </div>
  )
}

function CodeCard() {
  const lines = [
    { indent: 0, w: 60, c: "#c89b2a" },
    { indent: 1, w: 80, c: "rgba(255,255,255,0.85)" },
    { indent: 1, w: 50, c: "#e8c45a" },
    { indent: 2, w: 70, c: "rgba(255,255,255,0.8)" },
    { indent: 2, w: 40, c: "#f5f5f5" },
    { indent: 1, w: 30, c: "rgba(255,255,255,0.55)" },
    { indent: 0, w: 20, c: "rgba(255,255,255,0.45)" },
  ]
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      }}
    >
      {lines.map((l, i) => (
        <div
          key={i}
          style={{
            marginLeft: l.indent * 14,
            width: `${l.w}%`,
            height: 8,
            borderRadius: 3,
            background: l.c,
            opacity: 0.75,
          }}
        />
      ))}
    </div>
  )
}

function LogoCard({ accent, hue }: { accent: string; hue: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: `linear-gradient(135deg, ${accent} 0%, hsl(${hue}, 70%, 48%) 100%)`,
          boxShadow: `0 10px 30px ${accent}44`,
        }}
      />
    </div>
  )
}

function GradientCard({ hue }: { hue: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `radial-gradient(circle at 30% 30%, hsl(${hue}, 65%, 42%) 0%, hsl(${(hue + 40) % 360}, 55%, 22%) 55%, #0a0908 100%)`,
      }}
    />
  )
}

function Card({
  card,
  accent,
  index,
  frame,
}: {
  card: CardDef
  accent: string
  index: number
  frame: number
}) {
  const t = noise(index, frame) * 6.28
  const baseStyle: CSSProperties = {
    position: "absolute",
    left: card.x,
    top: card.y,
    width: card.w,
    height: card.h,
    borderRadius: 18,
    background: "linear-gradient(180deg, #181716 0%, #0a0908 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    overflow: "hidden",
    padding: 18,
    color: "white",
    display: "flex",
    flexDirection: "column",
  }

  const labelEl = card.label ? (
    <div
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: "rgba(255,255,255,0.55)",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        marginBottom: 8,
      }}
    >
      {card.label}
    </div>
  ) : null

  if (card.kind === "chart") {
    return (
      <div style={baseStyle}>
        {labelEl}
        <div style={{ flex: 1 }}>
          <ChartCard accent={accent} t={t} />
        </div>
      </div>
    )
  }
  if (card.kind === "bars") {
    return (
      <div style={baseStyle}>
        {labelEl}
        <div style={{ flex: 1 }}>
          <BarsCard accent={accent} t={t} />
        </div>
      </div>
    )
  }
  if (card.kind === "counter") {
    const v = Math.floor(120 + noise(index, frame) * 220)
    return (
      <div style={baseStyle}>
        {labelEl}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "white",
          }}
        >
          {v.toLocaleString()}
        </div>
        <div style={{ fontSize: 12, color: accent, fontWeight: 600 }}>
          +{(noise(index + 1, frame) * 18).toFixed(1)}%
        </div>
      </div>
    )
  }
  if (card.kind === "stat") {
    const v = (92 + noise(index, frame) * 8).toFixed(1)
    return (
      <div style={baseStyle}>
        {labelEl}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          {v}
          <span style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", marginLeft: 4 }}>%</span>
        </div>
      </div>
    )
  }
  if (card.kind === "code") {
    return (
      <div style={baseStyle}>
        {labelEl}
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{ width: "100%" }}>
            <CodeCard />
          </div>
        </div>
      </div>
    )
  }
  if (card.kind === "logo") {
    return (
      <div style={{ ...baseStyle, padding: 0 }}>
        <LogoCard accent={accent} hue={card.hue} />
      </div>
    )
  }
  return (
    <div style={{ ...baseStyle, padding: 0 }}>
      <GradientCard hue={card.hue} />
    </div>
  )
}

export function InfiniteBentoPan({
  panSpeed = 1,
  accentColor = "#c89b2a",
  speed = 1,
  className,
}: InfiniteBentoPanProps) {
  const frame = useCurrentFrame() * speed
  const { durationInFrames, width, height } = useVideoConfig()

  const maxX = Math.max(0, SUPER_W - width)
  const maxY = Math.max(0, SUPER_H - height)

  const t = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })

  const px = t * maxX * Math.min(1, panSpeed)
  const py = t * maxY * Math.min(1, panSpeed)

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background: "#0a0908",
        overflow: "hidden",
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: SUPER_W,
          height: SUPER_H,
          transform: `translate(${-px}px, ${-py}px)`,
          willChange: "transform",
        }}
      >
        {CARDS.map((c, i) => (
          <Card key={`${c.x}-${c.y}-${i}`} card={c} accent={accentColor} index={i} frame={frame} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 28%, rgba(10,9,8,0.88) 78%, #0a0908 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}
