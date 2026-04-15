import Image from "next/image"
import Link from "next/link"
import { type EventItem } from "@/lib/site-data"

interface BentoGridProps {
  featured: EventItem
  secondary: EventItem[]
  /** Optional hero imagery for cinematic cards */
  images?: {
    featured: string
    secondary: string[]
  }
}

export function BentoGrid({ featured, secondary, images }: BentoGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Link
        href={`/events/${featured.slug}`}
        className="group relative md:col-span-2 overflow-hidden rounded-2xl border border-border-default bg-bg-surface hover:border-accent-primary"
      >
        {images?.featured ? (
          <div className="relative aspect-[21/9] min-h-[200px] w-full">
            <Image
              src={images.featured}
              alt=""
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-xs uppercase text-accent-primary">Next Upcoming</p>
              <h3 className="mt-2 font-display text-2xl text-text-primary md:text-3xl">{featured.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-text-secondary">{featured.description}</p>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <p className="text-xs uppercase text-accent-primary">Next Upcoming</p>
            <h3 className="mt-2 font-display text-2xl text-text-primary">{featured.title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{featured.description}</p>
          </div>
        )}
      </Link>

      <div className="grid gap-4">
        {secondary.map((event, index) => (
          <Link
            key={event.id}
            href={`/events/${event.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-border-default bg-bg-surface hover:border-accent-primary"
          >
            {images?.secondary[index] ? (
              <div className="relative h-32 w-full">
                <Image
                  src={images.secondary[index]!}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs uppercase text-accent-primary">{event.eventType}</p>
                  <p className="mt-1 text-sm font-medium text-text-primary">{event.title}</p>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <p className="text-xs uppercase text-accent-primary">{event.eventType}</p>
                <p className="mt-2 text-sm text-text-primary">{event.title}</p>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
