import type { Metadata } from "next"
import { listSponsors } from "@/lib/data-access"

export const metadata: Metadata = {
  title: "Admin Sponsors | Innovation Club",
  description: "Sponsor CRM board and pipeline management.",
}

export default async function AdminSponsorsPage() {
  const { data: sponsors } = await listSponsors()

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="font-display text-4xl font-bold text-text-primary">
          Admin <span className="headline-accent">Sponsors</span>
        </h1>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {(["lead", "contacted", "proposal", "won"] as const).map((stage) => (
            <article key={stage} className="rounded-2xl border border-border-default bg-bg-surface p-4">
              <h2 className="text-xs uppercase tracking-wide text-accent-primary">{stage}</h2>
              <div className="mt-3 space-y-2">
                {sponsors
                  .filter((sponsor) => sponsor.pipelineStage === stage)
                  .map((sponsor) => (
                    <div key={sponsor.id} className="rounded-lg border border-border-default bg-bg-base p-3">
                      <p className="text-sm font-medium text-text-primary">{sponsor.companyName}</p>
                      <p className="mt-1 text-xs capitalize text-text-secondary">{sponsor.tier} tier</p>
                    </div>
                  ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
