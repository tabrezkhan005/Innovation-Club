"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useMemo } from "react"
import { DataFlowPipes } from "@/components/ui/data-flow-pipes"
import type { DataFlowPipesProps } from "@/components/ui/data-flow-pipes"

const RemotionPlayer = dynamic(
  () => import("@remotion/player").then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full animate-pulse rounded-3xl bg-transparent"
        style={{ aspectRatio: "16 / 9" }}
        aria-hidden
      />
    ),
  },
)

export function HomeNetworkingDataFlow() {
  const inputProps = useMemo(
    () =>
      ({
        pipeColor: "rgba(255,255,255,0.11)",
        pulseColor: "#e8c45a",
        pulseLength: 76,
        pulseDuration: 44,
        background: "transparent",
        nodeColor: "#121110",
        textColor: "#f5f5f5",
        speed: 1,
      }) satisfies DataFlowPipesProps,
    [],
  )

  return (
    <section
      id="network"
      className="relative scroll-mt-24 overflow-hidden border-y border-white/10 py-20 md:py-28"
      aria-labelledby="home-networking-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,155,42,0.09) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 40%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-accent-bright">
            <span className="h-px w-8 bg-linear-to-r from-accent-primary to-transparent" aria-hidden />
            Networking
          </p>
          <h2
            id="home-networking-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl"
          >
            One flow from <span className="headline-accent">campus</span> to industry
          </h2>
          <p className="mt-5 text-pretty text-sm leading-relaxed text-text-secondary md:text-base">
            Talks and workshops pull people in; the club stack keeps cohorts aligned; partners and alumni close the
            loop — continuous signal on the wire, not disconnected pulses.
          </p>
        </div>

        <div className="relative mx-auto mt-12 w-full max-w-5xl">
          <RemotionPlayer
            component={DataFlowPipes}
            inputProps={inputProps}
            durationInFrames={150}
            fps={30}
            compositionWidth={1280}
            compositionHeight={720}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "16 / 9",
              display: "block",
              background: "transparent",
            }}
            controls={false}
            autoPlay
            loop
            clickToPlay={false}
          />
        </div>

        <ul className="mx-auto mt-12 grid max-w-4xl gap-4 text-left sm:grid-cols-3">
          <li className="group rounded-2xl border border-white/10 bg-bg-surface/50 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-colors duration-300 hover:border-accent-primary/35">
            <div className="h-0.5 w-10 rounded-full bg-linear-to-r from-accent-primary to-accent-bright" />
            <span className="mt-4 block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent-bright">
              Signals in
            </span>
            <p className="mt-2 text-sm font-medium leading-relaxed text-text-primary md:text-[0.95rem]">
              RSVPs, memberships, and event energy
            </p>
          </li>
          <li className="group rounded-2xl border border-accent-primary/25 bg-bg-surface/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(200,155,42,0.08)] backdrop-blur-sm transition-colors duration-300 hover:border-accent-primary/45">
            <div className="h-0.5 w-10 rounded-full bg-linear-to-r from-accent-bright to-accent-primary" />
            <span className="mt-4 block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent-bright">
              Core
            </span>
            <p className="mt-2 text-sm font-medium leading-relaxed text-text-primary md:text-[0.95rem]">
              The stack that runs this site and ops
            </p>
          </li>
          <li className="group rounded-2xl border border-white/10 bg-bg-surface/50 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-colors duration-300 hover:border-accent-primary/35">
            <div className="h-0.5 w-10 rounded-full bg-linear-to-r from-accent-primary to-accent-bright" />
            <span className="mt-4 block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent-bright">
              Signals out
            </span>
            <p className="mt-2 text-sm font-medium leading-relaxed text-text-primary md:text-[0.95rem]">
              Partner rooms and alumni gravity
            </p>
          </li>
        </ul>

        <p className="mt-8 text-center text-xs text-text-tertiary">
          Want the real graph?{" "}
          <Link href="/partners" className="text-accent-primary underline-offset-4 hover:underline">
            Partner with us
          </Link>{" "}
          or{" "}
          <Link href="/events" className="text-accent-primary underline-offset-4 hover:underline">
            join the next event
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
