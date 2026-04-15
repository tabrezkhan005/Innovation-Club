"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { AvatarCircles } from "@/components/ui/avatar-circles"
import { members } from "@/lib/site-data"

type TeamView = "current" | "alumni"

export function TeamShowcaseSection() {
  const [activeView, setActiveView] = useState<TeamView>("current")

  const visibleMembers = useMemo(
    () => members.filter((member) => (activeView === "current" ? member.isActive : !member.isActive)),
    [activeView]
  )

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="font-display text-5xl font-bold text-text-primary">
          Core <span className="headline-accent">Team</span>
        </h1>
        <p className="mt-4 max-w-3xl text-text-secondary">
          Leadership members driving technical programs, high-impact events, and ecosystem partnerships.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <AvatarCircles names={members.filter((member) => member.isActive).map((member) => member.fullName)} />
          <p className="text-sm text-text-secondary">Powered by 200+ innovators</p>
        </div>

        <div className="mt-8 flex w-fit gap-2 rounded-xl border border-border-default bg-bg-surface p-2">
          {(["current", "alumni"] as TeamView[]).map((view) => {
            const isActive = view === activeView

            return (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className="relative rounded-lg px-4 py-2 text-sm font-medium text-text-secondary"
              >
                <span className={isActive ? "text-accent-primary" : ""}>
                  {view === "current" ? "Current Year" : "Alumni"}
                </span>
                {isActive ? (
                  <motion.div
                    layoutId="team-view-underline"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-accent-primary"
                  />
                ) : null}
              </button>
            )
          })}
        </div>

        <motion.div layout className="mt-8 grid gap-4 md:grid-cols-3">
          {visibleMembers.map((member) => (
            <motion.article
              layout
              key={member.id}
              className="rounded-2xl border border-border-default bg-bg-surface p-5 hover:border-accent-primary"
            >
              <p className="font-display text-xl text-text-primary">{member.fullName}</p>
              <p className="mt-1 text-sm text-accent-primary">{member.position}</p>
              <p className="mt-3 text-sm text-text-secondary">
                {member.branch} · Batch {member.batchYear}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <Link
          href="/members"
          className="gold-focus-ring mt-8 inline-flex rounded-full border border-border-accent px-5 py-2 text-sm text-accent-primary hover:border-accent-primary"
        >
          View All Generations
        </Link>
      </div>
    </section>
  )
}
