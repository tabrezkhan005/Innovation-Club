import Link from "next/link"
import { notFound } from "next/navigation"
import { events } from "@/lib/site-data"

interface EventDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params
  const event = events.find((item) => item.slug === slug)

  if (!event) notFound()

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-border-default bg-bg-surface p-8">
        <p className="text-xs uppercase tracking-wide text-accent-primary">{event.eventType}</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-text-primary">{event.title}</h1>
        <p className="mt-4 text-text-secondary">{event.description}</p>

        <dl className="mt-8 grid gap-4 text-sm md:grid-cols-2">
          <div>
            <dt className="text-text-tertiary">Speaker</dt>
            <dd className="font-medium text-text-primary">
              {event.speakerName} · {event.speakerCompany}
            </dd>
          </div>
          <div>
            <dt className="text-text-tertiary">Venue</dt>
            <dd className="font-medium text-text-primary">{event.venue}</dd>
          </div>
          <div>
            <dt className="text-text-tertiary">Date</dt>
            <dd className="font-medium text-text-primary">{new Date(event.date).toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-text-tertiary">Registration Limit</dt>
            <dd className="font-medium text-text-primary">{event.registrationLimit}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border-accent px-3 py-1 text-xs text-accent-bright">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/events"
            className="gold-focus-ring rounded-full border border-border-accent px-5 py-2 text-sm text-accent-primary"
          >
            Back to Events
          </Link>
          {!event.isPast ? (
            <button className="rounded-full bg-accent-primary px-5 py-2 text-sm font-medium text-bg-base">
              Register Now
            </button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
