import type { Metadata } from "next"
import { AdminAnalyticsClient } from "@/components/sections/admin-analytics-client"
import { listEvents, listMembers, listSponsors } from "@/lib/data-access"

export const metadata: Metadata = {
  title: "Admin Analytics | Innovation Club",
  description: "Analytics dashboard for events, members, and sponsors.",
}

export default async function AdminAnalyticsPage() {
  const [{ data: events }, { data: members }, { data: sponsors }] = await Promise.all([
    listEvents(),
    listMembers(),
    listSponsors(),
  ])

  const eventsByType = [
    { name: "Talk", count: events.filter((event) => event.eventType === "talk").length },
    { name: "Workshop", count: events.filter((event) => event.eventType === "workshop").length },
    { name: "Hackathon", count: events.filter((event) => event.eventType === "hackathon").length },
    { name: "Panel", count: events.filter((event) => event.eventType === "panel").length },
  ]

  const generationCounts = [
    { name: "Gen 1", count: members.filter((member) => member.generation === 1).length },
    { name: "Gen 2", count: members.filter((member) => member.generation === 2).length },
    { name: "Gen 3", count: members.filter((member) => member.generation === 3).length },
    { name: "Gen 4", count: members.filter((member) => member.generation === 4).length },
  ]

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="font-display text-4xl font-bold text-text-primary">
          Admin <span className="headline-accent">Analytics</span>
        </h1>
        <p className="mt-4 text-text-secondary">
          Total Members: {members.length} · Total Events: {events.length} · Total Sponsors: {sponsors.length}
        </p>

        <AdminAnalyticsClient eventsByType={eventsByType} generationCounts={generationCounts} />
      </div>
    </section>
  )
}
