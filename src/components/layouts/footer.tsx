"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { Mail, MapPin } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer"
import { ClubLogo } from "@/components/ui/club-logo"
import { cn } from "@/lib/utils"

const footerColumns = {
  explore: [
    { href: "/events", label: "Events" },
    { href: "/members", label: "Members" },
    { href: "/team", label: "Team" },
    { href: "/blog", label: "Blog" },
  ],
  connect: [
    { href: "/partners", label: "Partners" },
    { href: "/partners", label: "Sponsorships" },
    {
      href: "mailto:innovationclub@kitsguntur.ac.in",
      label: "Email the club",
      external: true,
    },
  ],
} as const

const socialLinks = [
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://github.com", label: "GitHub" },
  { href: "https://twitter.com", label: "Twitter" },
] as const

function isScrolledToBottom(thresholdPx: number) {
  const el = document.documentElement
  return el.scrollTop + el.clientHeight >= el.scrollHeight - thresholdPx
}

/** Home `#closing-frame` must have been on-screen enough before the footer cover can open. */
function updateClosingFrameSeen(closingSeenRef: { current: boolean }) {
  const closing = document.getElementById("closing-frame")
  if (!closing) {
    closingSeenRef.current = true
    return
  }
  const r = closing.getBoundingClientRect()
  const vh = window.innerHeight
  const navPad = 96
  const usable = vh - navPad - 12
  if (r.height <= usable) {
    if (r.top >= navPad && r.bottom <= vh - 8) closingSeenRef.current = true
  } else {
    const visible = Math.min(r.bottom, vh) - Math.max(r.top, navPad)
    const ratio = visible / Math.min(r.height, usable)
    if (ratio >= 0.72 && r.top < vh * 0.55 && r.bottom > vh * 0.45) closingSeenRef.current = true
  }
}

export function Footer() {
  const pathname = usePathname()
  const [isCoverOpen, setIsCoverOpen] = useState(false)
  const [isShortPage, setIsShortPage] = useState(false)
  const reduceMotion = useReducedMotion() ?? false
  const closingFrameSeenRef = useRef(false)

  /** Long ease-out when opening from bottom; slightly quicker ease-in when sliding away — no spring bounce. */
  const coverTransition = useMemo(
    () =>
      ({
        type: "tween" as const,
        duration: isCoverOpen ? 0.9 : 0.62,
        ease: [0.16, 1, 0.3, 1] as const,
      }),
    [isCoverOpen],
  )

  useEffect(() => {
    if (reduceMotion) {
      setIsShortPage(false)
      setIsCoverOpen(false)
      return
    }

    closingFrameSeenRef.current = false

    const closing = document.getElementById("closing-frame")
    if (!closing) closingFrameSeenRef.current = true

    let observer: IntersectionObserver | null = null
    if (closing) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.intersectionRatio >= 0.98) closingFrameSeenRef.current = true
            if (e.boundingClientRect.height > window.innerHeight * 0.85 && e.intersectionRatio >= 0.58) {
              closingFrameSeenRef.current = true
            }
          }
        },
        { root: null, rootMargin: "-88px 0px 0px 0px", threshold: [0, 0.25, 0.5, 0.65, 0.8, 0.9, 0.95, 0.98, 1] },
      )
      observer.observe(closing)
    }

    const tick = () => {
      const el = document.documentElement
      const short = el.scrollHeight <= el.clientHeight + 24
      setIsShortPage(short)
      if (short) {
        setIsCoverOpen(false)
        return
      }
      updateClosingFrameSeen(closingFrameSeenRef)
      const atEnd = isScrolledToBottom(10)
      setIsCoverOpen(atEnd && closingFrameSeenRef.current)
    }

    window.addEventListener("scroll", tick, { passive: true })
    window.addEventListener("resize", tick, { passive: true })
    tick()

    return () => {
      window.removeEventListener("scroll", tick)
      window.removeEventListener("resize", tick)
      observer?.disconnect()
    }
  }, [reduceMotion, pathname])

  if (reduceMotion || isShortPage) {
    return (
      <footer className="mt-auto border-t border-border-default bg-bg-base px-4 py-14 md:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border-default bg-bg-surface/40 px-6 py-10 md:px-10">
          <FooterBackgroundGradient />
          <div className="relative z-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <BrandBlock />
            <FooterLinkColumn title="Explore" links={footerColumns.explore} />
            <FooterLinkColumn title="Connect" links={footerColumns.connect} />
            <ContactBlock />
          </div>
          <div className="relative z-10 mt-10 border-t border-border-default pt-8">
            <FooterBottomRow />
          </div>
          <div className="relative z-10 mt-8 hidden h-52 w-full lg:block">
            <TextHoverEffect text="KITS IC" duration={0.28} className="h-full w-full opacity-90" />
          </div>
        </div>
      </footer>
    )
  }

  return (
    <>
      <motion.div
        className={cn(
          "fixed inset-0 z-45 overflow-x-hidden overflow-y-auto bg-bg-base",
          "shadow-[0_32px_120px_rgba(0,0,0,0.65)]",
        )}
        initial={false}
        animate={{ y: isCoverOpen ? "0%" : "100%" }}
        transition={coverTransition}
        style={{
          pointerEvents: isCoverOpen ? "auto" : "none",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        aria-hidden={!isCoverOpen}
      >
        <FooterBackgroundGradient />
        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-28 pt-28 md:px-10 md:pb-32 md:pt-32">
          <div className="grid grid-cols-1 gap-12 pb-14 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-14">
            <BrandBlock />
            <FooterLinkColumn title="Explore" links={footerColumns.explore} />
            <FooterLinkColumn title="Connect" links={footerColumns.connect} />
            <ContactBlock />
          </div>

          <hr className="border-border-default" />

          <div className="flex flex-col items-center justify-between gap-6 py-8 text-sm md:flex-row">
            <FooterBottomRow />
          </div>
        </div>

        <div className="pointer-events-none relative z-10 -mt-10 hidden h-[min(28rem,42vh)] w-full select-none lg:block">
          <TextHoverEffect text="KITS IC" duration={0.28} className="z-20 h-full w-full opacity-95" />
        </div>
      </motion.div>
    </>
  )
}

function BrandBlock() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <ClubLogo size="footer" />
        <span className="font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
          Innovation Club
        </span>
      </div>
      <p className="max-w-sm font-ui text-sm leading-relaxed text-text-secondary">
        KITS Guntur&apos;s flagship technical community — talks, workshops, hackathons, and collaborations that ship.
      </p>
    </div>
  )
}

interface FooterLinkColumnProps {
  title: string
  links: readonly { href: string; label: string; external?: boolean }[]
}

function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  return (
    <div>
      <h2 className="mb-5 font-heading text-base font-semibold tracking-wide text-text-primary">{title}</h2>
      <ul className="space-y-3 font-ui">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                className="gold-focus-ring text-sm text-text-secondary transition hover:text-accent-bright"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="gold-focus-ring text-sm text-text-secondary transition hover:text-accent-bright"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContactBlock() {
  return (
    <div>
      <h2 className="mb-5 font-heading text-base font-semibold tracking-wide text-text-primary">Contact</h2>
      <ul className="space-y-4 font-ui text-sm text-text-secondary">
        <li className="flex items-start gap-3">
          <Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent-primary" aria-hidden />
          <a
            href="mailto:innovationclub@kitsguntur.ac.in"
            className="gold-focus-ring hover:text-accent-bright"
          >
            innovationclub@kitsguntur.ac.in
          </a>
        </li>
        <li className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent-primary" aria-hidden />
          <span>KITS — Guntur, Andhra Pradesh</span>
        </li>
      </ul>
    </div>
  )
}

function FooterBottomRow() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-text-secondary md:justify-start">
        {socialLinks.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="gold-focus-ring rounded-sm underline-offset-4 transition hover:text-accent-bright hover:underline"
          >
            {label}
          </a>
        ))}
      </div>
      <p className="text-center font-mono text-xs text-text-tertiary md:text-right">
        © {new Date().getFullYear()} KITS Innovation Club. Crafted on campus.
      </p>
    </>
  )
}
