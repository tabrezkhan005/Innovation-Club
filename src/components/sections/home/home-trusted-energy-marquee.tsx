"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"
import { PerspectiveMarquee } from "@/components/ui/remocn-perspective-marquee"
import type { PerspectiveMarqueeProps } from "@/components/ui/remocn-perspective-marquee"

const RemotionPlayer = dynamic(
  () => import("@remotion/player").then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full animate-pulse"
        style={{ aspectRatio: "16 / 4.4", background: "#0a0908" }}
        aria-hidden
      />
    ),
  },
)

export function HomeTrustedEnergyMarquee() {
  const inputProps = useMemo(
    () =>
      ({
        items: [
          "KITS Innovation Club",
          "Engineering Discipline",
          "Industry Connect",
          "Hackathon Culture",
          "Mentor Sessions",
          "Product Builds",
          "Open Source Practice",
          "Leadership Pipeline",
          "Career Outcomes",
        ],
        rotateY: -15,
        rotateX: 4,
        perspective: 1180,
        pixelsPerFrame: 1.35,
        background: "#0a0908",
        fadeColor: "#0a0908",
        color: "#fafafa",
        glowColor: "#c89b2a",
        fontSize: 100,
        speed: 1,
      }) satisfies PerspectiveMarqueeProps,
    [],
  )

  return (
    <div className="relative mt-10 -mx-2 overflow-hidden md:-mx-6 lg:-mx-10">
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(200,155,42,0.14) 0%, rgba(200,155,42,0.04) 30%, transparent 65%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24"
        style={{
          background: "linear-gradient(180deg, #0a0908 0%, rgba(10,9,8,0) 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24"
        style={{
          background: "linear-gradient(0deg, #0a0908 0%, rgba(10,9,8,0) 100%)",
        }}
        aria-hidden
      />
      <RemotionPlayer
        component={PerspectiveMarquee}
        inputProps={inputProps}
        durationInFrames={280}
        fps={30}
        compositionWidth={1920}
        compositionHeight={540}
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: "16 / 4.4",
          background: "#0a0908",
          maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
        controls={false}
        autoPlay
        loop
        clickToPlay={false}
      />
    </div>
  )
}
