"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useRef } from "react"
import {
  motion,
  useInView,
  useReducedMotion,
  type MotionProps,
} from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { blogPosts, landingImages, type BlogItem } from "@/lib/site-data"

const COVER_IMAGES = [
  landingImages.workshop,
  landingImages.codeAbstract,
  landingImages.campusNight,
] as const

const listParent: MotionProps["variants"] = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const listItem: MotionProps["variants"] = {
  hidden: { opacity: 0, y: 32, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const listItemReduced: MotionProps["variants"] = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function formatPublishedLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

interface BlogHighlightCardProps {
  post: BlogItem
  coverSrc: string
  index: number
  isFeatured: boolean
  reduceMotion: boolean
}

function BlogHighlightCard({
  post,
  coverSrc,
  index,
  isFeatured,
  reduceMotion,
}: BlogHighlightCardProps) {
  const revealVariants = reduceMotion ? listItemReduced : listItem

  return (
    <motion.div variants={revealVariants} className={cn("min-w-0", isFeatured && "lg:z-1")}>
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "gold-focus-ring group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-white/6 via-bg-elevated/85 to-bg-base/95 backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-500 lg:rounded-3xl",
          isFeatured &&
            "border-accent-primary/40 shadow-[inset_3px_0_0_0_rgba(232,196,96,0.75),0_0_0_1px_rgba(200,155,42,0.12),0_24px_70px_-28px_rgba(200,155,42,0.22)]",
        )}
        aria-label={`${post.title}. ${post.readTime}. ${post.excerpt}`}
      >
        {/* One-pass 2D sheen (no perspective / tilt) */}
        {!reduceMotion ? (
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl lg:rounded-3xl"
            aria-hidden
          >
            <div className="absolute inset-y-[-20%] left-0 w-[45%] -translate-x-full skew-x-[-14deg] bg-linear-to-r from-transparent via-accent-bright/25 to-transparent opacity-0 blur-[0.5px] transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[260%] group-hover:opacity-100" />
          </div>
        ) : null}

        <span
          className="pointer-events-none absolute right-4 top-4 z-2 select-none font-display text-5xl font-extrabold leading-none tracking-tighter text-white/5 transition-colors duration-500 group-hover:text-accent-primary/12 md:text-6xl"
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative aspect-16/10 w-full overflow-hidden md:aspect-5/3">
          <Image
            src={coverSrc}
            alt=""
            fill
            className="object-cover transition-[filter] duration-700 ease-out group-hover:brightness-[1.08] group-hover:contrast-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg-base via-bg-base/40 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-br from-accent-primary/10 via-transparent to-transparent opacity-60 mix-blend-overlay" />

          {isFeatured ? (
            <span className="absolute left-4 top-4 z-2 rounded-full border border-accent-primary/45 bg-bg-base/80 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent-bright backdrop-blur-sm">
              Latest
            </span>
          ) : null}

          <div className="absolute bottom-3 left-4 right-4 z-2 flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-bg-base/55 px-2.5 py-0.5 text-[0.62rem] font-medium uppercase tracking-wide text-text-secondary backdrop-blur-sm transition-colors duration-300 group-hover:border-accent-primary/35 group-hover:text-text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex flex-1 flex-col p-5 md:p-6">
          <span
            className="pointer-events-none absolute left-4 top-0 h-5 w-5 border-l border-t border-accent-primary/0 transition-colors duration-500 group-hover:border-accent-primary/35 md:left-5"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-accent-primary/0 transition-colors duration-500 group-hover:border-accent-primary/35 md:bottom-5 md:right-5"
            aria-hidden
          />

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent-bright">
            <span>{post.readTime}</span>
            <span className="text-text-tertiary/90" aria-hidden>
              —
            </span>
            <time dateTime={post.publishedAt} className="text-text-tertiary">
              {formatPublishedLabel(post.publishedAt)}
            </time>
          </div>

          <h3 className="relative mt-3 pb-1 font-heading text-lg font-semibold leading-snug tracking-tight text-text-primary transition-colors duration-300 group-hover:text-accent-white md:text-xl">
            {post.title}
            <span
              className="absolute bottom-0 left-0 h-px w-0 bg-linear-to-r from-accent-primary to-accent-bright transition-[width] duration-500 ease-out group-hover:w-full"
              aria-hidden
            />
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-text-secondary">{post.excerpt}</p>

          <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent-primary transition-[color,gap] duration-300 group-hover:gap-2.5 group-hover:text-accent-bright">
            Read
            <ArrowUpRight
              className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/6 transition-all duration-500 group-hover:ring-accent-primary/25 lg:rounded-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent-primary/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Link>
    </motion.div>
  )
}

export function HomeBlogSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })
  const reduceMotion = useReducedMotion() ?? false

  const featuredIndex = useMemo(() => {
    let best = 0
    let bestTime = 0
    blogPosts.forEach((p, i) => {
      const t = new Date(p.publishedAt).getTime()
      if (t >= bestTime) {
        bestTime = t
        best = i
      }
    })
    return best
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
      aria-labelledby="home-blog-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-bg-base" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 80% 60% at 70% 20%, black 10%, transparent 65%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 10% 0%, rgba(200,155,42,0.08) 0%, transparent 45%), radial-gradient(circle at 90% 60%, rgba(255,255,255,0.03) 0%, transparent 40%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
            }}
            className="max-w-2xl"
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
              Field notes
            </motion.p>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const },
                },
              }}
              id="home-blog-heading"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.65rem] lg:leading-tight"
            >
              From the{" "}
              <span className="relative inline-block">
                <span className="headline-accent relative z-1">blog</span>
                {!reduceMotion ? (
                  <motion.span
                    className="absolute -inset-x-1 -bottom-1 z-0 h-2.5 rounded-sm bg-accent-primary/12 blur-md"
                    initial={{ opacity: 0, scaleX: 0.35 }}
                    animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ delay: 0.4, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
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
                  transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const },
                },
              }}
              className="mt-4 max-w-lg text-sm leading-relaxed text-text-secondary md:text-base"
            >
              Long-form notes on culture, craft, and partnerships — written for builders who care about
              how the room feels, not just the slide deck.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="gold-focus-ring inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/4 px-5 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-text-primary transition-colors duration-300 hover:border-accent-primary/45 hover:bg-accent-primary/8 hover:text-accent-bright"
            >
              View library
              <ArrowUpRight className="size-4 text-accent-primary" aria-hidden />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6 lg:mt-14 lg:items-stretch"
          variants={listParent}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {blogPosts.map((post, index) => (
            <BlogHighlightCard
              key={post.id}
              post={post}
              coverSrc={COVER_IMAGES[index % COVER_IMAGES.length]!}
              index={index}
              isFeatured={index === featuredIndex}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
