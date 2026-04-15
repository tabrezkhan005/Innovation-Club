"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLayoutEffect, useRef, useState, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const pillars = [
  {
    id: "build",
    tag: "Build",
    title: "Build in public",
    body: "Ship real projects, demos, and portfolios — not slides for the sake of slides.",
  },
  {
    id: "bridge",
    tag: "Bridge",
    title: "Bridge to industry",
    body: "Curated pathways from classroom fundamentals to how elite teams ship in production.",
  },
  {
    id: "belong",
    tag: "Belong",
    title: "Belong to builders",
    body: "Cross-batch mentorship, accountability, and a culture that rewards initiative.",
  },
] as const

type PillarId = (typeof pillars)[number]["id"]

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const handler = () => setReduced(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return reduced
}

export function HomePillars() {
  const [activeId, setActiveId] = useState<PillarId>("build")
  const reducedMotion = usePrefersReducedMotion()

  const sectionRef = useRef<HTMLElement>(null)
  const introElsRef = useRef<(HTMLElement | null)[]>([])
  const titleLine1Ref = useRef<HTMLSpanElement>(null)
  const titleLine2Ref = useRef<HTMLSpanElement>(null)
  const cardRef = useRef<HTMLElement>(null)
  const cardTagRef = useRef<HTMLParagraphElement>(null)
  const cardTitleRef = useRef<HTMLHeadingElement>(null)
  const cardBodyRef = useRef<HTMLParagraphElement>(null)
  const cardIndexRef = useRef<HTMLSpanElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const active = pillars.find((p) => p.id === activeId) ?? pillars[0]
  const activeIndex = pillars.findIndex((p) => p.id === activeId)

  /** Section intro + headline — once on scroll */
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const tabs = tabRefs.current.filter(Boolean)

      if (reducedMotion) {
        gsap.set([titleLine1Ref.current, titleLine2Ref.current].filter(Boolean), { yPercent: 0 })
        gsap.set(introElsRef.current.filter(Boolean), { opacity: 1, y: 0 })
        return
      }

      const introTargets = introElsRef.current.filter(Boolean)
      gsap.set(introTargets, { opacity: 0, y: 28 })
      gsap.set([titleLine1Ref.current, titleLine2Ref.current].filter(Boolean), {
        yPercent: 110,
      })
      gsap.set(tabs, { opacity: 0, x: -18 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 55%",
          toggleActions: "play none none none",
        },
      })

      tl.to(introTargets, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
      })
        .to(
          titleLine1Ref.current,
          { yPercent: 0, duration: 0.75, ease: "power4.out" },
          "-=0.35",
        )
        .to(
          titleLine2Ref.current,
          { yPercent: 0, duration: 0.75, ease: "power4.out" },
          "-=0.55",
        )
        .to(
          tabs,
          { opacity: 1, x: 0, duration: 0.48, stagger: 0.09, ease: "power3.out" },
          "-=0.45",
        )
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  /** Card copy when tab changes */
  useLayoutEffect(() => {
    const card = cardRef.current
    if (!card) return

    const ctx = gsap.context(() => {
      const targets = [
        cardTagRef.current,
        cardTitleRef.current,
        cardBodyRef.current,
        cardIndexRef.current,
      ].filter(Boolean)

      if (reducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0, filter: "none" })
        return
      }

      gsap.set(targets, { opacity: 0, y: 20, filter: "blur(6px)" })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
      })

      const words = card.querySelectorAll<HTMLElement>(".pillar-card-title-word")
      if (words.length) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: "power3.out",
            delay: 0.1,
          },
        )
      }
    }, card)

    return () => ctx.revert()
  }, [activeId, reducedMotion])

  const handleKeyNav = useCallback(
    (e: KeyboardEvent) => {
      const root = sectionRef.current
      if (!root?.contains(document.activeElement)) return
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
      e.preventDefault()
      const next =
        e.key === "ArrowDown"
          ? Math.min(activeIndex + 1, pillars.length - 1)
          : Math.max(activeIndex - 1, 0)
      setActiveId(pillars[next].id)
      tabRefs.current[next]?.focus()
    },
    [activeIndex],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyNav)
    return () => window.removeEventListener("keydown", handleKeyNav)
  }, [handleKeyNav])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/10 py-20 md:py-32"
      aria-labelledby="pillars-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 0% 30%, rgba(200,155,42,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 100% 70%, rgba(255,255,255,0.04) 0%, transparent 45%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <p
          ref={(el) => {
            introElsRef.current[0] = el
          }}
          className="font-mono text-xs uppercase tracking-[0.28em] text-accent-bright"
        >
          What we stand for
        </p>

        <h2
          id="pillars-heading"
          className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-text-primary md:text-5xl lg:text-[3.15rem]"
        >
          <span className="block overflow-hidden pb-1">
            <span ref={titleLine1Ref} className="inline-block will-change-transform">
              Three
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              ref={titleLine2Ref}
              className="headline-accent inline-block will-change-transform"
            >
              pillars
            </span>
          </span>
        </h2>

        <p
          ref={(el) => {
            introElsRef.current[1] = el
          }}
          className="mt-5 max-w-md text-sm leading-relaxed text-text-secondary md:text-base"
        >
          One club, three non-negotiables — switch the lens to see how each pillar shows up in the room.
        </p>

        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <div className="relative lg:col-span-5">
            <div
              className="pointer-events-none absolute left-[1.15rem] top-8 bottom-8 hidden w-px bg-linear-to-b from-accent-primary/50 via-white/10 to-accent-primary/30 lg:block"
              aria-hidden
            />

            <div
              className="flex flex-col gap-3"
              role="tablist"
              aria-label="Pillars"
            >
              {pillars.map((pillar, index) => {
                const isActive = pillar.id === activeId
                return (
                  <button
                    key={pillar.id}
                    ref={(el) => {
                      tabRefs.current[index] = el
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`pillar-panel-${pillar.id}`}
                    id={`pillar-tab-${pillar.id}`}
                    onClick={() => setActiveId(pillar.id)}
                    className={cn(
                      "gold-focus-ring group relative flex w-full items-start gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-300 md:px-6 md:py-5",
                      isActive
                        ? "border-accent-primary/50 bg-bg-surface/90 text-text-primary shadow-[inset_3px_0_0_0_rgba(232,196,96,0.85)]"
                        : "border-white/10 bg-bg-base/40 text-text-secondary hover:border-accent-primary/25 hover:bg-bg-surface/50 hover:text-text-primary",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-[0.65rem] font-bold tabular-nums transition-colors duration-300",
                        isActive
                          ? "border-accent-bright/60 bg-accent-primary/10 text-accent-bright"
                          : "border-white/15 text-text-tertiary group-hover:border-accent-primary/35 group-hover:text-text-secondary",
                      )}
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-lg font-semibold tracking-tight md:text-xl">
                        {pillar.title}
                      </span>
                      <span className="mt-1 block font-mono text-[0.58rem] uppercase tracking-[0.16em] text-text-tertiary">
                        {pillar.tag}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
            <p className="mt-4 hidden font-mono text-[0.58rem] uppercase tracking-[0.2em] text-text-tertiary lg:block">
              ↑↓ Arrow keys to switch
            </p>
          </div>

          <article
            ref={cardRef}
            id={`pillar-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`pillar-tab-${active.id}`}
            className="relative overflow-hidden rounded-2xl border border-white/12 bg-bg-surface/55 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md md:p-10 lg:col-span-7"
          >
            <div
              className="pointer-events-none absolute -right-8 -top-6 font-display text-[7rem] font-extrabold leading-none tracking-tighter text-white/4 md:text-[8.5rem]"
              aria-hidden
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </div>

            <p
              ref={cardTagRef}
              className="inline-flex rounded-full border border-accent-primary/35 bg-accent-primary/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-bright"
            >
              {active.tag}
            </p>

            <h3 ref={cardTitleRef} className="mt-5 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              {active.title.split(" ").map((word, wi) => (
                <span
                  key={`${active.id}-w-${wi}`}
                  className="pillar-card-title-word mr-[0.2em] inline-block last:mr-0"
                >
                  {word}
                </span>
              ))}
            </h3>

            <p
              ref={cardBodyRef}
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-text-secondary md:text-lg"
            >
              {active.body}
            </p>

            <span
              ref={cardIndexRef}
              className="mt-10 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-text-tertiary"
            >
              <span className="h-px w-10 bg-linear-to-r from-accent-primary/60 to-transparent" aria-hidden />
              Pillar {activeIndex + 1} of {pillars.length}
            </span>
          </article>
        </div>
      </div>
    </section>
  )
}
