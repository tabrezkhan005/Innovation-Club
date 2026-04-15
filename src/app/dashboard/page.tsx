import type { Metadata } from "next"
import Link from "next/link"
import { listEvents, listMembers, listSponsors } from "@/lib/data-access"

export const metadata: Metadata = {
  title: "Dashboard | Innovation Club",
  description: "Member dashboard for Innovation Club operations and activity.",
}

export default async function DashboardPage() {
  const [{ data: events }, { data: members }, { data: sponsors }] = await Promise.all([
    listEvents(),
    listMembers(),
    listSponsors(),
  ])

  const upcomingEventsCount = events.filter((event) => !event.isPast).length
  const activeMembersCount = members.filter((member) => member.isActive).length
  const activeSponsorsCount = sponsors.filter((sponsor) => sponsor.isActive).length

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="font-display text-5xl font-bold text-text-primary">
          Member <span className="headline-accent">Dashboard</span>
        </h1>
        <p className="mt-4 text-text-secondary">
          Track current club activity, upcoming commitments, and operations metrics.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <DashboardStatCard label="Upcoming Events" value={upcomingEventsCount} />
          <DashboardStatCard label="Active Members" value={activeMembersCount} />
          <DashboardStatCard label="Active Sponsors" value={activeSponsorsCount} />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-border-default bg-bg-surface p-6">
            <h2 className="font-heading text-xl font-semibold text-text-primary">Quick Actions</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <QuickActionLink href="/events" label="Explore Events" />
              <QuickActionLink href="/profile" label="Update Profile" />
              <QuickActionLink href="/admin/events" label="Manage Events" />
            </div>
          </article>

          <article className="rounded-2xl border border-border-default bg-bg-surface p-6">
            <h2 className="font-heading text-xl font-semibold text-text-primary">Next Event</h2>
            <p className="mt-3 text-sm text-text-secondary">{events[0]?.title ?? "No upcoming event found"}</p>
            <p className="mt-2 text-xs text-text-tertiary">
              {events[0] ? new Date(events[0].date).toLocaleString() : ""}
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

interface DashboardStatCardProps {
  label: string
  value: number
}

function DashboardStatCard({ label, value }: DashboardStatCardProps) {
  return (
    <article className="rounded-2xl border border-border-default bg-bg-surface p-6">
      <p className="font-display text-4xl font-bold text-text-primary">{value}</p>
      <p className="mt-2 text-sm text-text-secondary">{label}</p>
    </article>
  )
}

interface QuickActionLinkProps {
  href: string
  label: string
}

function QuickActionLink({ href, label }: QuickActionLinkProps) {
  return (
    <Link
      href={href}
      className="gold-focus-ring rounded-full border border-border-accent px-4 py-2 text-sm text-accent-primary hover:border-accent-primary"
    >
      {label}
    </Link>
  )
}
