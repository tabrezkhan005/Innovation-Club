"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { blogPosts } from "@/lib/site-data"

export function BlogListSection() {
  const [searchValue, setSearchValue] = useState("")
  const [activeTag, setActiveTag] = useState<string>("all")

  const tags = useMemo(() => ["all", ...new Set(blogPosts.flatMap((post) => post.tags))], [])

  const visiblePosts = useMemo(
    () =>
      blogPosts.filter((post) => {
        const doesSearchMatch =
          post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchValue.toLowerCase())

        if (!doesSearchMatch) return false
        if (activeTag !== "all" && !post.tags.includes(activeTag)) return false

        return true
      }),
    [activeTag, searchValue]
  )

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="font-display text-5xl font-bold text-text-primary">
          Club <span className="headline-accent">Blog</span>
        </h1>
        <p className="mt-4 max-w-3xl text-text-secondary">
          Stories, execution playbooks, and technical lessons from the Innovation Club ecosystem.
        </p>

        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search posts"
          className="gold-focus-ring mt-6 w-full max-w-md rounded-xl border border-border-default bg-bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isActive = tag === activeTag

            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wide ${
                  isActive ? "border-accent-primary text-accent-primary" : "border-border-default text-text-secondary"
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>

        <motion.div layout className="mt-8 grid gap-4 md:grid-cols-3">
          {visiblePosts.map((post) => (
            <motion.div layout key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-2xl border border-border-default bg-bg-surface p-6 hover:border-accent-primary"
              >
                <p className="text-xs uppercase tracking-wide text-accent-primary">{post.readTime}</p>
                <h2 className="mt-2 font-heading text-xl font-semibold text-text-primary">{post.title}</h2>
                <p className="mt-3 text-sm text-text-secondary">{post.excerpt}</p>
                <p className="mt-4 text-xs text-text-tertiary">{new Date(post.publishedAt).toLocaleDateString()}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
