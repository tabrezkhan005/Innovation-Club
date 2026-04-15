"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"
import { InfiniteBentoPan } from "@/components/ui/infinite-bento-pan"
import type { InfiniteBentoPanProps } from "@/components/ui/infinite-bento-pan"

const RemotionPlayer = dynamic(
  () => import("@remotion/player").then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full animate-pulse bg-bg-base"
        style={{ aspectRatio: "16 / 9" }}
        aria-hidden
      />
    ),
  },
)

export function HomeInfiniteBentoExperience() {
  const inputProps = useMemo(
    () =>
      ({
        speed: 0.85,
        panSpeed: 0.9,
        accentColor: "#c89b2a",
      }) satisfies InfiniteBentoPanProps,
    [],
  )

  return (
    <section
      className="relative overflow-hidden border-y border-border-default py-20 md:py-28"
      aria-labelledby="home-bento-cinematic-heading"
    >
      <div className="pointer-events-none absolute inset-0 page-home__vignette opacity-70" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-primary">Cinematic board</p>
          <h2
            id="home-bento-cinematic-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            One canvas for <span className="headline-accent">everything we ship</span>
          </h2>
          <p className="mt-5 text-pretty text-sm leading-relaxed text-text-secondary md:text-base">
            Events, generations, partners, and the stack behind this site — drifting like a title sequence so you
            feel the scale of the club before you scroll the rest of the story.
          </p>
        </div>

        <div className="relative mx-auto mt-12 w-full max-w-[1100px]">
          <div
            className="pointer-events-none absolute -inset-2 rounded-3xl bg-linear-to-b from-accent-primary/[0.07] to-transparent blur-2xl"
            aria-hidden
          />
          <RemotionPlayer
            component={InfiniteBentoPan}
            inputProps={inputProps}
            durationInFrames={300}
            fps={30}
            compositionWidth={1920}
            compositionHeight={1080}
            autoPlay
            loop
            controls={false}
            clickToPlay={false}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "16 / 9",
              borderRadius: "1rem",
              overflow: "hidden",
              background: "#0a0908",
              boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
            }}
          />
        </div>
      </div>
    </section>
  )
}
