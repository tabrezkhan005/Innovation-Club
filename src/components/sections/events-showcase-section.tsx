"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { events, type EventItem } from "@/lib/site-data"
import { ShimmerButton } from "@/components/ui/shimmer-button"

type EventTab = "upcoming" | "past"
type EventTypeFilter = "all" | EventItem["eventType"]

const eventTypeFilters: EventTypeFilter[] = ["all", "talk", "workshop", "hackathon", "panel"]

export function EventsShowcaseSection() {
  const [activeTab, setActiveTab] = useState<EventTab>("upcoming")
  const [activeType, setActiveType] = useState<EventTypeFilter>("all")

  const filteredEvents = useMemo(() => {
    const isPast = activeTab === "past"

    return events.filter((event) => {
      if (event.isPast !== isPast) return false
      if (activeType !== "all" && event.eventType !== activeType) return false

      return true
    })
  }, [activeTab, activeType])

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="font-display text-5xl font-bold text-text-primary">
          Club <span className="headline-accent">Events</span>
        </h1>
        <p className="mt-4 max-w-3xl text-text-secondary">
          Explore upcoming sessions and our past high-impact programs across talks, workshops, and hackathons.
        </p>

        <div className="mt-8 flex flex-wrap gap-2 rounded-2xl border border-border-default bg-bg-surface p-2">
          {(["upcoming", "past"] as EventTab[]).map((tab) => {
            const isActive = tab === activeTab

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative rounded-xl px-4 py-2 text-sm font-medium text-text-secondary"
              >
                <span className={isActive ? "text-accent-primary" : ""}>
                  {tab === "upcoming" ? "Upcoming" : "Past"}
                </span>
                {isActive ? (
                  <motion.div
                    layoutId="events-tab-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent-primary"
                  />
                ) : null}
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {eventTypeFilters.map((typeFilter) => {
            const isActive = typeFilter === activeType

            return (
              <button
                key={typeFilter}
                onClick={() => setActiveType(typeFilter)}
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wide ${
                  isActive
                    ? "border-accent-primary text-accent-primary"
                    : "border-border-default text-text-secondary"
                }`}
              >
                {typeFilter}
              </button>
            )
          })}
        </div>

        <motion.div layout className="mt-8 grid gap-4 md:grid-cols-2">
          {filteredEvents.map((event) => (
            <motion.article
              layout
              key={event.id}
              className="rounded-2xl border border-border-default bg-bg-surface p-6 hover:border-accent-primary"
            >
              <p className="text-xs uppercase tracking-wide text-accent-bright">{event.eventType}</p>
              <h3 className="mt-2 font-display text-2xl text-text-primary">{event.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{event.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border-accent px-3 py-1 text-xs text-accent-primary">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <p className="text-xs text-text-tertiary">{new Date(event.date).toLocaleDateString()}</p>
                {activeTab === "upcoming" ? (
                  <ShimmerButton href={`/events/${event.slug}`} label="Register" className="px-4 py-2 text-sm" />
                ) : (
                  <Link
                    href={event.recordingUrl ?? `/events/${event.slug}`}
                    className="gold-focus-ring rounded-full border border-border-accent px-4 py-2 text-sm font-medium text-accent-primary hover:border-accent-primary"
                  >
                    Watch Recording
                  </Link>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
