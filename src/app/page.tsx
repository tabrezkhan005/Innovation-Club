import type { Metadata } from "next"
import { HomeLanding } from "@/components/sections/home/home-landing"

export const metadata: Metadata = {
  title: "Innovation Club | KITS Guntur",
  description:
    "KITS Guntur Innovation Club is a high-impact student community building future engineers through events, projects, and collaborations.",
  openGraph: {
    title: "Innovation Club | KITS Guntur",
    description:
      "A prestige technical community at KITS Guntur — cinematic craft, generational legacy, startup-level execution.",
    type: "website",
  },
}

export default function LandingPage() {
  return <HomeLanding />
}
