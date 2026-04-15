import type { Metadata } from "next"
import { TeamShowcaseSection } from "@/components/sections/team-showcase-section"

export const metadata: Metadata = {
  title: "Team | Innovation Club",
  description: "Meet the current leadership team of Innovation Club, KITS Guntur.",
}

export default function TeamPage() {
  return <TeamShowcaseSection />
}
