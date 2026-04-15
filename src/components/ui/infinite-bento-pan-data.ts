export type CardKind =
  | "chart"
  | "counter"
  | "gradient"
  | "code"
  | "logo"
  | "stat"
  | "bars"

export interface CardDef {
  x: number
  y: number
  w: number
  h: number
  kind: CardKind
  hue: number
  label?: string
}

const KIND_CYCLE: CardKind[] = [
  "chart",
  "counter",
  "gradient",
  "code",
  "logo",
  "stat",
  "bars",
]

const CLUB_LABELS = [
  "Event Reach",
  "Members",
  "Gen 4 Core",
  "Workshops",
  "Hackathons",
  "Industry Talks",
  "Partner Orgs",
  "Registrations",
  "Open Source",
  "Mentor Hours",
  "Demo Days",
  "Career Wins",
  "Campus Impact",
  "Sprint Velocity",
  "Clerk + Supabase",
  "Next.js 15",
  "RLS Policies",
  "Realtime",
  "Build Nights",
  "Portfolio Reviews",
  "Internship Pipelines",
  "Alumni Network",
  "Innovation Index",
  "Club Uptime",
  "Stage Latency",
  "Waitlist",
  "API Routes",
  "sync-members.ts",
  "events/route.ts",
  "Sponsor CRM",
  "Analytics",
  "Media Kit",
  "KITS Guntur",
  "Innovation Club",
  "4 Generations",
  "Since 2021",
  "Gold Partners",
  "Community NPS",
  "Ship Rate",
  "Bytes Shipped",
  "Live Cohort",
  "Leadership",
  "Core Team",
  "Founding Batch",
  "Builders Batch",
  "Innovators",
  "Current Batch",
  "Workshop RSVPs",
  "Company Visits",
  "Tech Stack",
  "Engineering Depth",
  "Execution",
  "Prestige",
]

/** Bento tile sizes for organic rhythm */
const TILE_SPECS = [
  { w: 460, h: 260 },
  { w: 300, h: 260 },
  { w: 340, h: 220 },
  { w: 380, h: 280 },
  { w: 280, h: 240 },
  { w: 520, h: 240 },
] as const

const GAP_X = 32
const GAP_Y = 36

/** Non-overlapping grid filling SUPER canvas; club-themed labels */
export function buildClubBentoCards(): CardDef[] {
  const cards: CardDef[] = []
  const SUPER_W = 3400
  const SUPER_H = 2400
  let y = 80
  let labelIndex = 0
  let globalIndex = 0

  while (y < SUPER_H - 120) {
    let x = 80
    let rowMaxH = 0

    while (x < SUPER_W - 120) {
      const spec = TILE_SPECS[globalIndex % TILE_SPECS.length]!
      if (x + spec.w > SUPER_W - 40) break

      const kind = KIND_CYCLE[globalIndex % KIND_CYCLE.length]!
      const hue = (38 + (globalIndex * 47) % 360) as number
      const skipLabel = kind === "gradient" || kind === "logo"
      const label = skipLabel ? undefined : CLUB_LABELS[labelIndex % CLUB_LABELS.length]

      if (!skipLabel) labelIndex += 1

      cards.push({
        x,
        y,
        w: spec.w,
        h: spec.h,
        kind,
        hue,
        label,
      })

      rowMaxH = Math.max(rowMaxH, spec.h)
      x += spec.w + GAP_X
      globalIndex += 1
    }

    y += rowMaxH + GAP_Y
  }

  return cards
}

export const CLUB_BENTO_CARDS = buildClubBentoCards()

export const SUPER_CANVAS_W =
  Math.max(...CLUB_BENTO_CARDS.map((card) => card.x + card.w), 0) + 120
export const SUPER_CANVAS_H =
  Math.max(...CLUB_BENTO_CARDS.map((card) => card.y + card.h), 0) + 120
