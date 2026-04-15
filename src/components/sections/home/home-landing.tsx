import Image from "next/image"
import Link from "next/link"
import { CinematicHero } from "@/components/sections/home/cinematic-hero"
import { HomeInfiniteBentoExperience } from "@/components/sections/home/home-infinite-bento-experience"
import { HomeFaq } from "@/components/sections/home/home-faq"
import { HomePillars } from "@/components/sections/home/home-pillars"
import { HomeBlogSection } from "@/components/sections/home/home-blog-section"
import { HomeGenerationsSection } from "@/components/sections/home/home-generations-section"
import { HomeMetricsStorySection } from "@/components/sections/home/home-metrics-story-section"
import { HomeNetworkingDataFlow } from "@/components/sections/home/home-networking-data-flow"
import { HomeTrustedEnergyMarquee } from "@/components/sections/home/home-trusted-energy-marquee"
import { BentoGrid } from "@/components/ui/bento-grid"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { events, landingImages, landingTestimonials, members } from "@/lib/site-data"

export function HomeLanding() {
  const upcomingEvent = events.find((event) => !event.isPast)
  const secondaryEvents = events.filter((event) => event.id !== upcomingEvent?.id).slice(0, 2)
  const totalMembers = members.length
  const totalEvents = events.length
  const companyCount = 18

  return (
    <div className="page-home min-h-screen text-text-primary">
      <CinematicHero />

      <HomeMetricsStorySection
        membersCount={totalMembers}
        eventsCount={totalEvents}
        partnerOrgs={companyCount}
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-primary">Featured</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">On the calendar</h2>
          {upcomingEvent ? (
            <div className="mt-8">
              <BentoGrid
                featured={upcomingEvent}
                secondary={secondaryEvents}
                images={{
                  featured: landingImages.heroWide,
                  secondary: [landingImages.workshop, landingImages.collaboration],
                }}
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
          <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] border border-border-accent">
            <Image
              src={landingImages.collaboration}
              alt="Students collaborating"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-tr from-bg-base/90 via-transparent to-transparent" />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-primary">Mission</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight">
              We exist to turn <span className="headline-accent">ambition</span> into shipped outcomes.
            </h2>
            <p className="mt-6 text-lg text-text-secondary">
              Innovation Club is the flagship technical community at KITS Guntur — where discipline meets
              creativity, and every cohort raises the bar for the next.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-text-secondary">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary" />
                Curated learning tracks aligned with how modern teams build.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary" />
                Direct lines to engineers and leaders from partner companies.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary" />
                A generational legacy page that honors every batch that built this house.
              </li>
            </ul>
            <Link
              href="/partners"
              className="gold-focus-ring mt-8 inline-flex rounded-full border border-border-default px-5 py-2 text-sm text-text-primary hover:border-accent-primary hover:text-accent-primary"
            >
              Partner with us →
            </Link>
          </div>
        </div>
      </section>

      <HomePillars />
      <HomeInfiniteBentoExperience />
      <HomeNetworkingDataFlow />

      <HomeGenerationsSection />

      <section className="border-y border-border-default py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-primary">Voices</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">What partners remember</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {landingTestimonials.map((t) => (
              <blockquote
                key={t.name}
                className="flex flex-col rounded-2xl border border-border-default bg-bg-surface p-6 transition hover:border-accent-primary"
              >
                <span className="font-display text-4xl leading-none text-accent-primary/40" aria-hidden>
                  &ldquo;
                </span>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">{t.quote}</p>
                <footer className="mt-6 flex items-center gap-3 border-t border-border-default pt-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border-accent">
                    <Image src={t.imageUrl} alt={t.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-semibold text-text-primary">{t.name}</p>
                    <p className="text-xs text-text-tertiary">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <HomeBlogSection />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <p className="mb-3 text-center font-mono text-xs uppercase tracking-[0.28em] text-accent-bright">
            Trusted energy
          </p>
          <h3 className="mx-auto max-w-4xl text-center font-display text-2xl font-semibold tracking-tight text-text-primary md:text-4xl">
            The room carries <span className="headline-accent">real momentum</span>
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-text-secondary md:text-base">
            Reputation is built in public: partner rooms, hard deadlines, and teams that keep shipping.
          </p>
          <HomeTrustedEnergyMarquee />
        </div>
      </section>

      <HomeFaq />

      <section
        id="closing-frame"
        className="flex min-h-[min(88dvh,920px)] scroll-mt-28 flex-col justify-center border-t border-border-default py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-primary">Closing frame</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
            Ready for a year that feels like a <span className="headline-accent">reel</span>, not a routine?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-text-secondary">
            Walk into the next talk, workshop, or build sprint — the room is already warm.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ShimmerButton href="/events" label="Reserve your seat" />
            <Link
              href="/team"
              className="gold-focus-ring rounded-full border border-border-default px-6 py-3 text-sm font-medium text-text-primary hover:border-accent-primary hover:text-accent-primary"
            >
              Meet leadership
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
