"use client"

import Image from "next/image"
import { useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { NumberTicker } from "@/components/ui/number-ticker"
import { landingGalleryItems } from "@/lib/site-data"

interface HomeMetricsStorySectionProps {
  membersCount: number
  eventsCount: number
  partnerOrgs: number
}

const metrics = [
  {
    key: "members",
    label: "Members",
    valueKey: "membersCount" as const,
    blurb: "Active builders on the roster",
  },
  {
    key: "events",
    label: "Events",
    valueKey: "eventsCount" as const,
    blurb: "Talks, workshops & build sprints",
  },
  {
    key: "partners",
    label: "Partner orgs",
    valueKey: "partnerOrgs" as const,
    blurb: "Sustained industry relationships",
  },
] as const

export function HomeMetricsStorySection({
  membersCount,
  eventsCount,
  partnerOrgs,
}: HomeMetricsStorySectionProps) {
  const values = { membersCount, eventsCount, partnerOrgs }
  const railRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback((direction: -1 | 1) => {
    const el = railRef.current
    if (!el) return
    const step = Math.min(el.clientWidth * 0.72, 360)
    el.scrollBy({ left: direction * step, behavior: "smooth" })
  }, [])

  return (
    <>
      <section
        id="discover"
        className="relative scroll-mt-24 border-b border-white/10 pb-20 pt-16 md:pb-24 md:pt-20"
      >
        <div className="relative mx-auto max-w-6xl px-4 md:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-accent-bright">
                <span className="h-px w-8 bg-linear-to-r from-accent-primary to-transparent" aria-hidden />
                By the numbers
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.35rem] lg:leading-tight">
                Momentum you can measure
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-secondary md:text-base">
                Proof in people, programmes, and partners — the same bar we hold in the room and on the
                calendar.
              </p>
            </div>
            <p className="max-w-xs font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.2em] text-text-tertiary lg:text-right">
              Updated from live club data
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-bg-surface/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm md:rounded-3xl">
            <div
              className="h-1 w-full bg-linear-to-r from-accent-primary via-accent-bright/85 to-accent-deep/90"
              aria-hidden
            />
            <div className="grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
              {metrics.map((m) => (
                <article key={m.key} className="relative px-6 py-8 md:px-8 md:py-10">
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-text-tertiary">
                    {m.label}
                  </p>
                  <div className="mt-3">
                    <NumberTicker value={values[m.valueKey]} suffix="+" />
                  </div>
                  <p className="mt-4 max-w-56 text-sm leading-relaxed text-text-secondary">{m.blurb}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 py-20 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 70% 80% at 100% 30%, black 0%, transparent 55%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 md:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-accent-bright">
                <span className="h-px w-8 bg-linear-to-r from-accent-primary to-transparent" aria-hidden />
                Visual story
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.35rem]">
                Inside the room
              </h2>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:justify-end lg:gap-6">
              <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
                Every frame is real energy from our programmes — scroll the rail or use the controls.
              </p>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => handleScroll(-1)}
                  className="gold-focus-ring flex size-11 items-center justify-center border border-white/15 bg-bg-surface/80 text-text-primary transition-colors hover:border-accent-primary/45 hover:text-accent-bright"
                  aria-label="Scroll gallery left"
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll(1)}
                  className="gold-focus-ring flex size-11 items-center justify-center border border-white/15 bg-bg-surface/80 text-text-primary transition-colors hover:border-accent-primary/45 hover:text-accent-bright"
                  aria-label="Scroll gallery right"
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </div>
            </div>
          </div>

          <div className="relative mt-12">
            <div
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-linear-to-r from-bg-base via-bg-base/90 to-transparent md:w-16"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-linear-to-l from-bg-base via-bg-base/90 to-transparent md:w-16"
              aria-hidden
            />

            <div
              ref={railRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pl-1 pr-1 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-5 md:pl-2 md:pr-2 [&::-webkit-scrollbar]:hidden"
            >
              {landingGalleryItems.map((item, index) => (
                <figure
                  key={item.label}
                  className="group relative w-[min(78vw,300px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-bg-surface/40 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.75)] sm:w-[min(72vw,280px)] md:w-[min(32vw,320px)]"
                >
                  <div className="relative aspect-3/4">
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className="object-cover transition-[filter,transform] duration-500 ease-out group-hover:brightness-105 md:group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 78vw, 320px"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-bg-base via-bg-base/35 to-transparent" />
                    <span
                      className="absolute right-4 top-4 font-mono text-[0.65rem] font-semibold tabular-nums text-white/25 transition-colors duration-300 group-hover:text-accent-primary/40"
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <p className="font-heading text-lg font-semibold tracking-tight text-text-primary md:text-xl">
                        {item.label}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-text-secondary md:text-sm">
                        {item.caption}
                      </p>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
