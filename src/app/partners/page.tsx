import type { Metadata } from "next"
import { PartnerLeadForm } from "@/components/sections/partner-lead-form"
import { ShineBorder } from "@/components/ui/shine-border"

export const metadata: Metadata = {
  title: "Partners | Innovation Club",
  description: "Collaborate with Innovation Club to engage future engineers.",
}

export default function PartnersPage() {
  const partnerStats = [
    { label: "Student Reach", value: "200+" },
    { label: "Annual Events", value: "30+" },
    { label: "Hiring-Ready Talent", value: "Top 10%" },
  ]

  const tiers = [
    { name: "Gold", perks: "Branding + keynote + premium hiring access" },
    { name: "Silver", perks: "Workshops + branding + curated engagement" },
    { name: "Bronze", perks: "Community presence + talent connect" },
  ]

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="font-display text-5xl font-bold text-text-primary">
          Partner With <span className="headline-accent">Innovation Club</span>
        </h1>
        <p className="mt-4 max-w-3xl text-text-secondary">
          Reach 200+ future engineers at KITS through co-branded events, hiring initiatives, and technical programs.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {partnerStats.map((item) => (
            <article key={item.label} className="rounded-2xl border border-border-default bg-bg-surface p-6">
              <p className="font-display text-3xl font-bold text-text-primary">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-text-secondary">{item.label}</p>
            </article>
          ))}
        </div>

        <h2 className="mt-12 font-heading text-2xl font-semibold text-text-primary">Sponsor Tiers</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <ShineBorder key={tier.name} className="p-6">
              <p className="font-display text-2xl font-bold text-text-primary">{tier.name}</p>
              <p className="mt-3 text-sm text-text-secondary">{tier.perks}</p>
            </ShineBorder>
          ))}
        </div>

        <PartnerLeadForm />
      </div>
    </section>
  )
}
