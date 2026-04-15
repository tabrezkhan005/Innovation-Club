"use client"

import gsap from "gsap"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { events, generationMeta, heroSliderSlides, members } from "@/lib/site-data"
import { cn } from "@/lib/utils"

const SLIDER_INTERVAL_MS = 6000

export function CinematicHero() {
  const eventCount = events.length
  const memberCount = members.length
  const generationCount = generationMeta.length
  const slides = heroSliderSlides

  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  const thumbSrcs = useMemo(() => {
    const n = slides.length
    if (n <= 1) return []
    const out: string[] = []
    for (let k = 1; k <= Math.min(3, n - 1); k++) out.push(slides[(activeSlideIndex + k) % n].src)
    return out
  }, [slides, activeSlideIndex])

  useEffect(() => {
    if (slides.length <= 1) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setActiveSlideIndex((i) => (i + 1) % slides.length)
    }, SLIDER_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [slides.length])

  const rootRef = useRef<HTMLElement>(null)
  const imagePanelRef = useRef<HTMLDivElement>(null)
  const imageScaleRef = useRef<HTMLDivElement>(null)
  const locRef = useRef<HTMLDivElement>(null)
  const societyRef = useRef<HTMLParagraphElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const titleInnovationRef = useRef<HTMLSpanElement>(null)
  const titleClubRef = useRef<HTMLSpanElement>(null)
  const leadRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const memberNumRef = useRef<HTMLParagraphElement>(null)
  const eventNumRef = useRef<HTMLParagraphElement>(null)
  const genNumRef = useRef<HTMLParagraphElement>(null)
  const statsFootRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLAnchorElement>(null)
  const fieldNotesRef = useRef<HTMLDivElement>(null)
  const bottomCaptionRef = useRef<HTMLDivElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)

      if (reduceMotion) {
        if (memberNumRef.current) memberNumRef.current.textContent = `${memberCount}+`
        if (eventNumRef.current) eventNumRef.current.textContent = `${eventCount}+`
        if (genNumRef.current) genNumRef.current.textContent = `${generationCount}`
        return
      }

      const panel = imagePanelRef.current
      const scaleWrap = imageScaleRef.current

      const thumbEls = gsap.utils.toArray<HTMLElement>(q(".hero-thumb"))
      gsap.set(
        [
          locRef.current,
          societyRef.current,
          titleInnovationRef.current,
          titleClubRef.current,
          leadRef.current,
          statsRef.current,
          statsFootRef.current,
          ctaRef.current,
          scrollRef.current,
          fieldNotesRef.current,
          bottomCaptionRef.current,
          ...thumbEls,
        ].filter(Boolean),
        { opacity: 0, y: 28 },
      )
      if (ruleRef.current)
        gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left center" })
      if (panel)
        gsap.set(panel, {
          clipPath: "inset(7% 5% 7% 5% round 18px)",
          opacity: 0.92,
        })
      if (scaleWrap) gsap.set(scaleWrap, { scale: 1.08 })
      if (memberNumRef.current) memberNumRef.current.textContent = "0+"
      if (eventNumRef.current) eventNumRef.current.textContent = "0+"
      if (genNumRef.current) genNumRef.current.textContent = "0"

      const memberProxy = { n: 0 }
      const eventProxy = { n: 0 }
      const genProxy = { n: 0 }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      if (panel) {
        tl.to(panel, {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          opacity: 1,
          duration: 1.15,
          ease: "power2.inOut",
        })
      }
      if (scaleWrap) {
        tl.to(scaleWrap, { scale: 1, duration: 1.25, ease: "power2.out" }, "<0.15")
      }
      tl.to(locRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.75")
        .to(societyRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.45")
        .to(ruleRef.current, { scaleX: 1, duration: 0.65, ease: "power2.out" }, "-=0.35")
        .to(titleInnovationRef.current, { opacity: 1, y: 0, duration: 0.65 }, "-=0.4")
        .to(titleClubRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.45")
        .to(leadRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.35")
        .to(statsRef.current, { opacity: 1, y: 0, duration: 0.65 }, "-=0.25")
        .to(statsFootRef.current, { opacity: 1, y: 0, duration: 0.45 }, "-=0.35")
        .to(
          memberProxy,
          {
            n: memberCount,
            duration: 1.05,
            ease: "power2.out",
            onUpdate: () => {
              if (memberNumRef.current)
                memberNumRef.current.textContent = `${Math.round(memberProxy.n)}+`
            },
          },
          "-=0.55",
        )
        .to(
          eventProxy,
          {
            n: eventCount,
            duration: 1,
            ease: "power2.out",
            onUpdate: () => {
              if (eventNumRef.current)
                eventNumRef.current.textContent = `${Math.round(eventProxy.n)}+`
            },
          },
          "<0.08",
        )
        .to(
          genProxy,
          {
            n: generationCount,
            duration: 0.85,
            ease: "power2.out",
            onUpdate: () => {
              if (genNumRef.current) genNumRef.current.textContent = `${Math.round(genProxy.n)}`
            },
          },
          "<0.08",
        )
      if (thumbEls.length)
        tl.to(
          thumbEls,
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "back.out(1.2)" },
          "-=0.65",
        )
        .to(fieldNotesRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.55")
        .to(bottomCaptionRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.45")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.4")
        .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")

      if (scaleWrap) {
        gsap.to(scaleWrap, {
          scale: 1.035,
          duration: 14,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      }
    }, root)

    return () => ctx.revert()
  }, [eventCount, memberCount, generationCount])

  return (
    <section
      ref={rootRef}
      className="relative min-h-[calc(100svh-6rem)] overflow-hidden border-b border-white/10"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-bg-base" aria-hidden />
      <div className="pointer-events-none absolute inset-0 page-home__vignette opacity-80" aria-hidden />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 100% 80% at 0% 0%, black 0%, transparent 55%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,9,8,0.97) 0%, rgba(10,9,8,0.55) 42%, transparent 68%), radial-gradient(ellipse 80% 60% at 100% 0%, rgba(200,155,42,0.09) 0%, transparent 50%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 xl:left-6 xl:block"
        aria-hidden
      >
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.42em] text-white/25 [writing-mode:vertical-rl] [text-orientation:mixed]">
          KITS — Innovation Club
        </p>
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1600px] lg:grid-cols-2 lg:gap-0">
        <div className="relative z-10 flex flex-col justify-center px-5 pb-14 pt-10 sm:px-8 md:px-10 md:pb-16 md:pt-12 lg:px-14 lg:pb-20 lg:pl-16 lg:pr-12 lg:pt-16 xl:pl-24">
          <div className="absolute right-0 top-16 hidden h-32 w-px bg-linear-to-b from-accent-primary/50 via-white/10 to-transparent lg:block" aria-hidden />

          <header className="max-w-xl">
            <div
              ref={locRef}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-text-tertiary"
            >
              <span className="text-accent-bright/90">KITS Guntur</span>
              <span className="text-white/20" aria-hidden>
                ·
              </span>
              <span>Andhra Pradesh</span>
              <span className="text-white/20" aria-hidden>
                ·
              </span>
              <span>Est. 2021</span>
            </div>

            <p
              ref={societyRef}
              className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-accent-primary"
            >
              Undergraduate technical society
            </p>

            <div ref={ruleRef} className="mt-4 h-px max-w-40 bg-linear-to-r from-accent-primary to-transparent" />

            <h1
              id="hero-heading"
              className="mt-4 font-display text-[clamp(2.4rem,5.2vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.035em]"
            >
              <span ref={titleInnovationRef} className="block text-text-primary">
                Innovation
              </span>
              <span
                ref={titleClubRef}
                className="block bg-linear-to-r from-accent-bright via-accent-primary to-accent-deep bg-clip-text text-transparent [-webkit-background-clip:text]"
              >
                Club
              </span>
            </h1>

            <p
              ref={leadRef}
              className="mt-6 max-w-md text-pretty font-heading text-[1.05rem] font-medium leading-snug tracking-tight text-text-secondary md:text-lg"
            >
              The flagship builder community on campus — industry-grade workshops, hackathons, and
              partnerships that read like a serious programme, not a poster club.
            </p>
          </header>

          <div
            ref={statsRef}
            className="mt-10 max-w-lg border border-white/10 bg-bg-surface/40 backdrop-blur-sm will-change-transform"
          >
            <div className="grid grid-cols-3 divide-x divide-white/10">
              <div className="px-4 py-4 sm:px-5 sm:py-5">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-text-tertiary">Members</p>
                <p
                  ref={memberNumRef}
                  className="mt-1.5 font-display text-2xl font-bold tabular-nums tracking-tight text-text-primary sm:text-3xl"
                >
                  0+
                </p>
              </div>
              <div className="px-4 py-4 sm:px-5 sm:py-5">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-text-tertiary">Events</p>
                <p
                  ref={eventNumRef}
                  className="mt-1.5 font-display text-2xl font-bold tabular-nums tracking-tight text-text-primary sm:text-3xl"
                >
                  0+
                </p>
              </div>
              <div className="px-4 py-4 sm:px-5 sm:py-5">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-text-tertiary">Generations</p>
                <p
                  ref={genNumRef}
                  className="mt-1.5 font-display text-2xl font-bold tabular-nums tracking-tight text-text-primary sm:text-3xl"
                >
                  0
                </p>
              </div>
            </div>
            <p
              ref={statsFootRef}
              className="border-t border-white/10 px-4 py-3 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-text-tertiary sm:px-5"
            >
              Workshops · Hackathons · Partner rooms · Mentored delivery
            </p>
          </div>

          <div ref={ctaRef} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/events"
              className={cn(
                "gold-focus-ring inline-flex min-h-11 items-center justify-center px-8 py-3.5 text-center text-sm font-semibold tracking-wide",
                "bg-accent-primary text-bg-base",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]",
                "transition-[filter,box-shadow,background-color] duration-200 hover:bg-accent-bright hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
              )}
            >
              Explore events
            </Link>
            <Link
              href="/members"
              className={cn(
                "gold-focus-ring inline-flex min-h-11 items-center justify-center border border-white/18 bg-transparent px-8 py-3.5 text-center text-sm font-medium tracking-wide text-text-primary",
                "transition-colors duration-200 hover:border-accent-primary/45 hover:bg-white/4 hover:text-accent-bright",
              )}
            >
              Member roster
            </Link>
            <Link
              href="/partners"
              className="gold-focus-ring inline-flex items-center justify-center py-2 text-sm font-medium text-text-tertiary underline-offset-4 transition-colors hover:text-accent-primary sm:ml-1"
            >
              Partner with us →
            </Link>
          </div>

          <a
            ref={scrollRef}
            href="#discover"
            className="gold-focus-ring group mt-12 inline-flex max-w-xs items-center gap-4 border-t border-white/10 pt-6 text-text-tertiary transition-colors hover:border-accent-primary/25 hover:text-accent-primary sm:mt-14"
          >
            <span className="font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.26em]">
              Scroll to
              <br />
              programme overview
            </span>
            <span className="flex size-10 shrink-0 items-center justify-center border border-white/15 bg-bg-surface/60 font-mono text-accent-primary transition-colors group-hover:border-accent-primary/40 group-hover:text-accent-bright">
              ↓
            </span>
          </a>
        </div>

        <div className="relative z-10 flex min-h-[min(52vh,420px)] flex-col lg:min-h-[calc(100svh-6rem)]">
          <div className="relative flex-1 lg:pl-2 lg:pt-6 lg:pr-6 lg:pb-6">
            <div
              ref={imagePanelRef}
              className="relative h-full min-h-[min(52vh,420px)] overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.04)] ring-1 ring-inset ring-white/5 will-change-transform lg:min-h-0 lg:rounded-l-[1.75rem] lg:rounded-r-none lg:border-l lg:border-l-accent-primary/30 lg:shadow-[-20px_0_70px_-40px_rgba(200,155,42,0.12),0_40px_100px_-40px_rgba(0,0,0,0.85),inset_0_0_0_1px_rgba(255,255,255,0.04)]"
            >
              <div
                ref={imageScaleRef}
                className="absolute inset-0 will-change-transform"
                aria-roledescription="carousel"
                aria-label="Scenes from Innovation Club and campus"
              >
                {slides.map((slide, i) => (
                  <div
                    key={slide.src}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-1000 ease-out",
                      i === activeSlideIndex ? "z-1" : "z-0 pointer-events-none",
                    )}
                    style={{ opacity: i === activeSlideIndex ? 1 : 0 }}
                    aria-hidden={i !== activeSlideIndex}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      priority={i === 0}
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg-base via-transparent to-bg-base/30 lg:to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-bg-base/85 via-bg-base/20 to-transparent lg:from-bg-base/70" />

              {slides.length > 1 ? (
                <div
                  className="absolute bottom-40 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-44"
                  role="tablist"
                  aria-label="Choose hero slide"
                >
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === activeSlideIndex}
                      aria-label={`Slide ${i + 1} of ${slides.length}`}
                      onClick={() => setActiveSlideIndex(i)}
                      className={cn(
                        "gold-focus-ring h-2 min-h-2 rounded-full transition-[width,background-color] duration-300",
                        i === activeSlideIndex ? "w-7 bg-accent-bright" : "w-2 bg-white/35 hover:bg-white/55",
                      )}
                    />
                  ))}
                </div>
              ) : null}

              <div
                ref={thumbsRef}
                className="absolute bottom-30 right-4 z-10 flex gap-2 sm:bottom-33 sm:right-5 lg:bottom-34 lg:right-7"
                aria-hidden
              >
                {thumbSrcs.map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className="hero-thumb relative h-12 w-17 overflow-hidden rounded-md border border-white/20 shadow-lg shadow-black/40 sm:h-14 sm:w-24"
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="96px" />
                  </div>
                ))}
              </div>

              <div
                ref={fieldNotesRef}
                className="absolute left-4 top-4 max-w-48 rounded border border-white/10 bg-bg-base/75 px-3 py-2 backdrop-blur-md sm:left-6 sm:top-6 sm:max-w-xs sm:px-4 sm:py-3"
              >
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-accent-bright">Field notes</p>
                <p className="mt-1 text-xs leading-snug text-text-secondary sm:text-sm">
                  Every cohort inherits systems, not slogans — execution is the membership fee.
                </p>
              </div>

              <div
                ref={bottomCaptionRef}
                className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-bg-base/82 p-5 backdrop-blur-md sm:p-7 lg:rounded-bl-[1.75rem]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-accent-bright">Since 2021</p>
                    <p className="mt-2 max-w-md font-heading text-lg font-semibold leading-snug tracking-tight text-text-primary sm:text-xl">
                      Where engineers become founders of their own journey.
                    </p>
                  </div>
                  <Link
                    href="/team"
                    className="gold-focus-ring shrink-0 self-start border border-white/15 bg-white/4 px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-text-primary transition-colors hover:border-accent-primary/40 hover:text-accent-bright sm:self-end"
                  >
                    Leadership →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
