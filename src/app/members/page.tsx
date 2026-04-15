import type { Metadata } from "next"
import { MembersLegacySection } from "@/components/sections/members-legacy-section"

export const metadata: Metadata = {
  title: "Members | Innovation Club",
  description: "Our legacy of innovators across generations at KITS Guntur.",
}

export default function MembersPage() {
  return <MembersLegacySection />
}
