import type { Metadata } from "next"
import Link from "next/link"
import { listEvents } from "@/lib/data-access"

export const metadata: Metadata = {
  title: "Admin Events | Innovation Club",
  description: "Manage event publishing, status, and engagement.",
}

export default async function AdminEventsPage() {
  const { data: events } = await listEvents()

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-4xl font-bold text-text-primary">
            Admin <span className="headline-accent">Events</span>
          </h1>
          <Link
            href="/admin/events/new"
            className="gold-focus-ring rounded-full bg-accent-primary px-5 py-2 text-sm font-medium text-bg-base"
          >
            Create Event
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border-default">
          <table className="w-full">
            <thead className="bg-bg-surface">
              <tr className="text-left text-xs uppercase tracking-wide text-text-tertiary">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="bg-bg-base">
              {events.map((event) => (
                <tr key={event.id} className="border-t border-border-default text-sm text-text-secondary">
                  <td className="px-4 py-3">{event.title}</td>
                  <td className="px-4 py-3 capitalize">{event.eventType}</td>
                  <td className="px-4 py-3">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-border-accent px-3 py-1 text-xs text-accent-primary">
                      {event.isPast ? "Past" : "Upcoming"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
