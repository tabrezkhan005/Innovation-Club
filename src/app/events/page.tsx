import type { Metadata } from "next"
import { EventsShowcaseSection } from "@/components/sections/events-showcase-section"

export const metadata: Metadata = {
  title: "Events | Innovation Club",
  description: "Explore upcoming and past Innovation Club events at KITS Guntur.",
}

export default function EventsPage() {
  return <EventsShowcaseSection />
}
