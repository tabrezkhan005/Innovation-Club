"use client"

import Link from "next/link"
import { useRef } from "react"
import { motion, useInView, useReducedMotion, type MotionProps } from "motion/react"
import { AvatarCircles } from "@/components/ui/avatar-circles"
import { cn } from "@/lib/utils"
import {
  generationMeta,
  members,
  type GenerationMetaItem,
  type MemberItem,
} from "@/lib/site-data"

const headerLine: MotionProps["variants"] = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 },
  },
}

const ROMAN = ["I", "II", "III", "IV"] as const

interface GenerationColumnProps {
  gen: GenerationMetaItem
  genMembers: MemberItem[]
  names: string[]
  isCurrent: boolean
  index: number
}

function GenerationColumn({ gen, genMembers, names, isCurrent, index }: GenerationColumnProps) {
  const roman = ROMAN[index]

  return (
    <div className="flex min-w-[min(88vw,300px)] shrink-0 snap-center flex-col px-4 py-1 sm:min-w-[min(82vw,280px)] lg:min-w-0 lg:px-5 lg:py-2 first:pl-3 last:pr-3 lg:first:pl-4 lg:last:pr-4">
      {/* Pedigree node — reads as a timeline step, not a floating card */}
      <div className="relative flex flex-col items-center pb-4 lg:pb-5">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.26em] text-text-tertiary">
          Generation {roman}
        </span>
        <div
          className={cn(
            "mt-3 flex h-11 w-11 items-center justify-center rounded-full border-2 bg-bg-base font-mono text-sm font-bold tabular-nums",
            isCurrent
              ? "border-accent-bright text-accent-bright"
              : "border-white/25 text-text-secondary",
          )}
          aria-hidden
        >
          {roman}
        </div>
        <p className="mt-2 text-center font-mono text-xs text-accent-bright">{gen.yearRange}</p>
        <div
          className={cn(
            "mt-3 h-8 w-px bg-linear-to-b from-accent-primary/55 to-white/8",
            isCurrent && "from-accent-bright/80",
          )}
          aria-hidden
        />
      </div>

      <Link
        href="/members"
        className={cn(
          "gold-focus-ring flex min-h-[280px] flex-1 flex-col rounded-2xl border p-5 transition-colors duration-200 lg:min-h-[300px] lg:rounded-2xl lg:p-6",
          "border-white/10 bg-bg-surface/90",
          "hover:border-accent-primary/35 hover:bg-bg-elevated/95",
          isCurrent &&
            "border-accent-primary/45 bg-bg-elevated shadow-[inset_4px_0_0_0_rgba(232,196,96,0.9)]",
        )}
        aria-label={`${gen.label}, ${gen.yearRange}. ${gen.tagline}. View members.`}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent-bright">
            Gen {gen.id}
          </span>
          {isCurrent ? (
            <span className="flex items-center gap-1.5 rounded-full border border-accent-primary/45 bg-accent-primary/10 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent-bright">
              <span className="size-1.5 rounded-full bg-accent-bright" aria-hidden />
              Live
            </span>
          ) : null}
        </div>

        <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight text-text-primary md:text-xl">
          {gen.label}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{gen.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {gen.milestones.slice(0, 2).map((m) => (
            <span
              key={m}
              className="rounded-full border border-white/10 bg-bg-base/80 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.06em] text-text-tertiary"
            >
              {m}
            </span>
          ))}
        </div>

        <div className="mt-auto border-t border-white/10 pt-4">
          <AvatarCircles names={names.length ? names : ["IC"]} />
          <p className="mt-2.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-text-tertiary">
            {genMembers.length}+ faces
          </p>
        </div>
      </Link>
    </div>
  )
}

export function HomeGenerationsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })
  const reduceMotion = useReducedMotion() ?? false

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
      aria-labelledby="home-generations-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-bg-base" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 25%, black 15%, transparent 68%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 50% at 50% -5%, rgba(200,155,42,0.08) 0%, transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,0.95fr)] lg:items-end lg:gap-14">
          <div>
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
              }}
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const },
                  },
                }}
                className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent-bright"
              >
                <span className="h-px w-8 bg-linear-to-r from-accent-primary to-transparent" aria-hidden />
                Generations
              </motion.p>

              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
                  },
                }}
                id="home-generations-heading"
                className="mt-3 font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-[3.1rem] lg:leading-[1.06]"
              >
                Four cohorts,{" "}
                <span className="relative inline-block">
                  <span className="headline-accent relative z-1">one lineage</span>
                  {!reduceMotion ? (
                    <motion.span
                      className="absolute -inset-x-1 -bottom-1 z-0 h-2.5 rounded-sm bg-accent-primary/12 blur-md"
                      initial={{ opacity: 0, scaleX: 0.35 }}
                      animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                      transition={{ delay: 0.38, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                </span>
              </motion.h2>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
                  },
                }}
                className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-text-secondary md:text-base"
              >
                Each cohort inherits the last: same club, new leaders, compounding reputation — from
                founding batch to the builders shipping today.
              </motion.p>
            </motion.div>

            <div className="relative mt-8 max-w-md">
              <motion.div
                className="h-1 overflow-hidden rounded-full bg-white/6"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={headerLine}
              >
                <motion.div
                  className="h-full w-full rounded-full bg-linear-to-r from-accent-deep via-accent-primary to-accent-bright"
                  style={{ transformOrigin: "left" }}
                />
              </motion.div>
              <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-text-tertiary">
                2021 → 2022 → 2023 → 2024+
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="hidden rounded-2xl border border-white/8 bg-bg-surface/40 p-5 font-mono text-[0.7rem] leading-relaxed text-text-tertiary lg:block"
          >
            <span className="text-accent-bright">Pedigree</span> — not semesters alone: each generation
            is a named cohort with its own chapter, then hands responsibilities forward.
          </motion.div>
        </div>

        {/* Static cohort grid: succession dividers + timeline caps above each card */}
        <div
          className={cn(
            "mt-10 flex divide-x divide-white/10 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-12 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden",
            "rounded-2xl border border-white/10 bg-bg-surface/30 p-3 lg:rounded-3xl lg:p-4",
          )}
        >
          {generationMeta.map((gen, index) => {
            const genMembers = members.filter((m) => m.generation === gen.id)
            const names = genMembers.map((m) => m.fullName).slice(0, 4)
            const isCurrent = gen.id === 4
            return (
              <GenerationColumn
                key={gen.id}
                gen={gen}
                genMembers={genMembers}
                names={names}
                isCurrent={isCurrent}
                index={index}
              />
            )
          })}
        </div>

        <p className="mt-8 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-text-tertiary lg:text-left">
          <span className="text-accent-primary/80">↳</span> Open a cohort — full member roster on the
          next screen
        </p>
      </div>
    </section>
  )
}
