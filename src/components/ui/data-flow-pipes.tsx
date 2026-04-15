"use client"

import { useCurrentFrame } from "remotion"

export interface DataFlowNode {
  id: string
  x: number
  y: number
  label?: string
}

export interface DataFlowEdge {
  from: string
  to: string
  /** Phase offset (frames) so edges don’t pulse in perfect lockstep. */
  startFrame?: number
}

export interface DataFlowPipesProps {
  nodes?: DataFlowNode[]
  edges?: DataFlowEdge[]
  pipeColor?: string
  pulseColor?: string
  pulseLength?: number
  pulseDuration?: number
  background?: string
  nodeColor?: string
  textColor?: string
  speed?: number
  className?: string
}

const FONT_FAMILY = "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif"

/** Club networking diagram — campus ↔ stack ↔ partners (viewBox 1280×720). */
export const CLUB_NETWORK_NODES: DataFlowNode[] = [
  { id: "campus", x: 110, y: 380, label: "Campus" },
  { id: "events", x: 360, y: 210, label: "Events" },
  { id: "members", x: 360, y: 550, label: "Members" },
  { id: "stack", x: 640, y: 380, label: "Club stack" },
  { id: "partners", x: 920, y: 210, label: "Partners" },
  { id: "alumni", x: 920, y: 550, label: "Alumni" },
]

export const CLUB_NETWORK_EDGES: DataFlowEdge[] = [
  { from: "campus", to: "events", startFrame: 0 },
  { from: "campus", to: "members", startFrame: 8 },
  { from: "events", to: "stack", startFrame: 16 },
  { from: "members", to: "stack", startFrame: 24 },
  { from: "stack", to: "partners", startFrame: 32 },
  { from: "stack", to: "alumni", startFrame: 40 },
]

function bezierPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = b.x - a.x
  const handle = Math.max(60, Math.abs(dx) * 0.5)
  const c1x = a.x + handle
  const c1y = a.y
  const c2x = b.x - handle
  const c2y = b.y
  return `M ${a.x} ${a.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`
}

function bezierLength(a: { x: number; y: number }, b: { x: number; y: number }) {
  const handle = Math.max(60, Math.abs(b.x - a.x) * 0.5)
  const c1 = { x: a.x + handle, y: a.y }
  const c2 = { x: b.x - handle, y: b.y }
  let len = 0
  let prev = a
  const steps = 48
  for (let i = 1; i <= steps; i++) {
    const t = i / steps
    const u = 1 - t
    const p = {
      x:
        u * u * u * a.x +
        3 * u * u * t * c1.x +
        3 * u * t * t * c2.x +
        t * t * t * b.x,
      y:
        u * u * u * a.y +
        3 * u * u * t * c1.y +
        3 * u * t * t * c2.y +
        t * t * t * b.y,
    }
    len += Math.hypot(p.x - prev.x, p.y - prev.y)
    prev = p
  }
  return len
}

export function DataFlowPipes({
  nodes = CLUB_NETWORK_NODES,
  edges = CLUB_NETWORK_EDGES,
  pipeColor = "rgba(255,255,255,0.12)",
  pulseColor = "#e8c45a",
  pulseLength = 56,
  pulseDuration = 42,
  background = "transparent",
  nodeColor = "#121110",
  textColor = "#fafafa",
  speed = 1,
  className,
}: DataFlowPipesProps) {
  const frame = useCurrentFrame() * speed
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background,
        fontFamily: FONT_FAMILY,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 1280 720" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id="pulse-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {edges.map((edge, i) => {
          const a = nodeMap.get(edge.from)
          const b = nodeMap.get(edge.to)
          if (!a || !b) return null
          const path = bezierPath(a, b)
          return (
            <path
              key={`pipe-${edge.from}-${edge.to}-${i}`}
              d={path}
              fill="none"
              stroke={pipeColor}
              strokeWidth={2.5}
              strokeLinecap="round"
              opacity={0.95}
            />
          )
        })}

        {edges.map((edge, i) => {
          const a = nodeMap.get(edge.from)
          const b = nodeMap.get(edge.to)
          if (!a || !b) return null
          const path = bezierPath(a, b)
          const len = bezierLength(a, b)
          const phase = (edge.startFrame ?? 0) + i * 19
          /** Gap ≥ path length so only one pulse is on the wire; cycle = D + gap for seamless loop. */
          const gap = len + 12
          const cycle = pulseLength + gap
          const pxPerFrame = (2.35 * speed * 42) / Math.max(pulseDuration, 12)
          const dashOffset = -(((frame + phase) * pxPerFrame) % cycle)
          const dashPattern = `${pulseLength} ${gap}`

          return (
            <g key={`pulse-${edge.from}-${edge.to}-${i}`}>
              <path
                d={path}
                fill="none"
                stroke={pulseColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray={dashPattern}
                strokeDashoffset={dashOffset + 6}
                opacity={0.22}
              />
              <path
                d={path}
                fill="none"
                stroke={pulseColor}
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={dashPattern}
                strokeDashoffset={dashOffset}
                opacity={0.55}
                filter="url(#pulse-glow)"
              />
              <path
                d={path}
                fill="none"
                stroke={pulseColor}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeDasharray={dashPattern}
                strokeDashoffset={dashOffset}
                opacity={0.95}
              />
            </g>
          )
        })}
      </svg>

      {nodes.map((node) => {
        const isCore = node.id === "stack"
        return (
          <div
            key={node.id}
            style={{
              position: "absolute",
              left: node.x - (isCore ? 72 : 62),
              top: node.y - (isCore ? 28 : 24),
              width: isCore ? 144 : 124,
              height: isCore ? 56 : 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 12px",
              textAlign: "center" as const,
              background: isCore
                ? `linear-gradient(165deg, rgba(200,155,42,0.18) 0%, ${nodeColor} 55%, #0d0c0b 100%)`
                : `linear-gradient(180deg, rgba(255,255,255,0.07) 0%, ${nodeColor} 42%, #10100e 100%)`,
              color: textColor,
              border: isCore
                ? "1px solid rgba(232,196,96,0.45)"
                : "1px solid rgba(255,255,255,0.12)",
              borderRadius: isCore ? 16 : 14,
              fontSize: isCore ? 14 : 13,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              boxShadow: isCore
                ? "0 0 0 1px rgba(200,155,42,0.12), 0 18px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)"
                : "0 14px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {node.label ?? node.id}
          </div>
        )
      })}
    </div>
  )
}
