import type { Metadata } from "next"
import { AdminNewEventForm } from "@/components/sections/admin-new-event-form"

export const metadata: Metadata = {
  title: "New Event | Admin",
  description: "Create a new club event with publishing metadata.",
}

export default function AdminNewEventPage() {
  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-border-default bg-bg-surface p-8">
        <h1 className="font-display text-4xl font-bold text-text-primary">
          Create <span className="headline-accent">Event</span>
        </h1>
        <p className="mt-3 text-sm text-text-secondary">Create and publish new event entries for club operations.</p>
        <AdminNewEventForm />
      </div>
    </section>
  )
}
