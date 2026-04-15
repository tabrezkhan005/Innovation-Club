export interface EventItem {
  id: string
  title: string
  slug: string
  description: string
  speakerName: string
  speakerCompany: string
  date: string
  venue: string
  tags: string[]
  eventType: "talk" | "workshop" | "hackathon" | "panel"
  isPast: boolean
  registrationLimit: number
  recordingUrl?: string
}

export interface MemberItem {
  id: string
  fullName: string
  generation: 1 | 2 | 3 | 4
  generationLabel: string
  position: string
  branch: string
  batchYear: number
  skills: string[]
  isActive: boolean
}

export interface BlogItem {
  id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  tags: string[]
  readTime: string
}

export interface GenerationMetaItem {
  id: 1 | 2 | 3 | 4
  label: string
  yearRange: string
  tagline: string
  milestones: string[]
}

export interface SponsorItem {
  id: string
  companyName: string
  tier: "gold" | "silver" | "bronze" | "partner"
  year: number
  pipelineStage: "lead" | "contacted" | "proposal" | "won"
  isActive: boolean
}

export const events: EventItem[] = [
  {
    id: "e1",
    title: "Scaling Ideas Into Startups",
    slug: "scaling-ideas-into-startups",
    description: "Founder-led session on converting student prototypes into venture-backed products.",
    speakerName: "Ananya Rao",
    speakerCompany: "NexOrbit Labs",
    date: "2026-05-18T16:00:00.000Z",
    venue: "KITS Main Auditorium",
    tags: ["startup", "product", "leadership"],
    eventType: "talk",
    isPast: false,
    registrationLimit: 280,
  },
  {
    id: "e2",
    title: "Full Stack AI Workshop",
    slug: "full-stack-ai-workshop",
    description: "Hands-on workshop focused on shipping AI features using modern web stacks.",
    speakerName: "Ritvik Sharma",
    speakerCompany: "CloudForge",
    date: "2026-04-25T10:00:00.000Z",
    venue: "Innovation Lab",
    tags: ["ai", "nextjs", "supabase"],
    eventType: "workshop",
    isPast: false,
    registrationLimit: 120,
  },
  {
    id: "e3",
    title: "HackSprint 2025",
    slug: "hacksprint-2025",
    description: "36-hour hackathon with real industry problem statements and mentor circles.",
    speakerName: "Industry Panel",
    speakerCompany: "Multiple Companies",
    date: "2025-12-14T09:00:00.000Z",
    venue: "KITS Tech Block",
    tags: ["hackathon", "teamwork", "career"],
    eventType: "hackathon",
    isPast: true,
    registrationLimit: 320,
    recordingUrl: "https://example.com/recording",
  },
]

export const members: MemberItem[] = [
  {
    id: "m1",
    fullName: "Sai Teja Reddy",
    generation: 4,
    generationLabel: "Current Batch",
    position: "President",
    branch: "CSE",
    batchYear: 2027,
    skills: ["Leadership", "Product", "AI"],
    isActive: true,
  },
  {
    id: "m2",
    fullName: "Nikhila Varma",
    generation: 4,
    generationLabel: "Current Batch",
    position: "Tech Lead",
    branch: "ECE",
    batchYear: 2027,
    skills: ["Full Stack", "Cloud"],
    isActive: true,
  },
  {
    id: "m3",
    fullName: "Arjun Krishna",
    generation: 3,
    generationLabel: "Innovators Batch",
    position: "Core Member",
    branch: "CSE",
    batchYear: 2026,
    skills: ["Web", "Data"],
    isActive: false,
  },
  {
    id: "m4",
    fullName: "Keerthi Naidu",
    generation: 2,
    generationLabel: "Builders Batch",
    position: "Alumni Coordinator",
    branch: "EEE",
    batchYear: 2025,
    skills: ["Operations", "Community"],
    isActive: false,
  },
  {
    id: "m5",
    fullName: "Rahul Dev",
    generation: 1,
    generationLabel: "Founding Batch",
    position: "Founding Member",
    branch: "ME",
    batchYear: 2024,
    skills: ["Events", "Mentorship"],
    isActive: false,
  },
]

export const blogPosts: BlogItem[] = [
  {
    id: "b1",
    title: "How Gen 1 Built the Club From Scratch",
    slug: "how-gen-1-built-the-club",
    excerpt: "The systems, rituals, and decisions that helped launch Innovation Club at KITS.",
    publishedAt: "2026-03-02",
    tags: ["legacy", "community"],
    readTime: "6 min read",
  },
  {
    id: "b2",
    title: "Designing High-Impact Workshops",
    slug: "designing-high-impact-workshops",
    excerpt: "Our repeatable framework for technical workshops that students actually finish.",
    publishedAt: "2026-03-18",
    tags: ["workshops", "execution"],
    readTime: "5 min read",
  },
  {
    id: "b3",
    title: "Partnership Playbook for Student Clubs",
    slug: "partnership-playbook",
    excerpt: "How to pitch, collaborate, and sustain long-term partnerships with tech companies.",
    publishedAt: "2026-04-01",
    tags: ["partnerships", "strategy"],
    readTime: "7 min read",
  },
]

export const generationMeta: GenerationMetaItem[] = [
  {
    id: 1,
    label: "Founding Batch",
    yearRange: "2021-22",
    tagline: "The batch that started it all",
    milestones: ["First Workshop", "First Company Talk"],
  },
  {
    id: 2,
    label: "Builders Batch",
    yearRange: "2022-23",
    tagline: "The batch that established operating systems",
    milestones: ["Structured mentoring", "Cross-branch collaboration"],
  },
  {
    id: 3,
    label: "Innovators Batch",
    yearRange: "2023-24",
    tagline: "The batch that accelerated technical depth",
    milestones: ["Hackathon expansion", "50th Event"],
  },
  {
    id: 4,
    label: "Current Batch",
    yearRange: "2024-25",
    tagline: "The batch driving present-day impact",
    milestones: ["Industry tracks", "Partner growth"],
  },
]

export const legacyTimeline = [
  { year: "2021", title: "First Workshop" },
  { year: "2022", title: "First Company Talk" },
  { year: "2023", title: "First Hackathon" },
  { year: "2024", title: "50th Event" },
  { year: "2025", title: "National Speaker Series" },
]

/** Curated Unsplash assets for cinematic landing (warm / tech / people). */
export const landingImages = {
  heroWide:
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=2000&q=80",
  workshop:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
  collaboration:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  campusNight:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  codeAbstract:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
} as const

/** Hero main + collage (Unsplash — same CDN policy as `landingImages`). */
export const heroGallery = [
  landingImages.heroWide,
  landingImages.workshop,
  landingImages.collaboration,
  landingImages.campusNight,
] as const

/** Full-bleed hero panel rotation (stock photography via Unsplash — stable for `next/image`). */
export const heroSliderSlides = [
  {
    src: landingImages.heroWide,
    alt: "Team collaborating with laptops in a focused working session",
  },
  {
    src: landingImages.workshop,
    alt: "Hands-on workshop with laptops and collaborative learning",
  },
  {
    src: landingImages.collaboration,
    alt: "Team discussion around a table solving problems together",
  },
  {
    src: landingImages.campusNight,
    alt: "Campus building interior with warm evening light",
  },
  {
    src: landingImages.codeAbstract,
    alt: "Abstract visualization of code and engineering systems",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80",
    alt: "Students presenting ideas in a bright seminar room",
  },
] as const

/** Home “Visual story” horizontal gallery. */
export const landingGalleryItems = [
  {
    src: landingImages.workshop,
    label: "Workshops",
    caption: "Hands-on, production-grade stacks",
  },
  {
    src: landingImages.collaboration,
    label: "Collaboration",
    caption: "Industry × student problem solving",
  },
  {
    src: landingImages.campusNight,
    label: "Campus nights",
    caption: "Talks that feel like premieres",
  },
  {
    src: landingImages.codeAbstract,
    label: "Deep craft",
    caption: "Systems thinking, not tutorial chasing",
  },
] as const

export interface LandingTestimonial {
  quote: string
  name: string
  role: string
  company: string
  imageUrl: string
}

export const landingTestimonials: LandingTestimonial[] = [
  {
    quote:
      "Innovation Club runs events with the polish of a funded startup — clear narrative, sharp execution, and serious engineering depth.",
    name: "Ananya Rao",
    role: "Director of Engineering",
    company: "NexOrbit Labs",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote:
      "The quality of questions from KITS students rivals what we see in top metro campuses. This is a club we want back every year.",
    name: "Ritvik Sharma",
    role: "Principal Architect",
    company: "CloudForge",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote:
      "Partnerships here feel intentional: measurable outcomes, professional comms, and a community that actually ships.",
    name: "Meera Iyer",
    role: "Head of University Relations",
    company: "DataSpring",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
]

export const sponsors: SponsorItem[] = [
  {
    id: "s1",
    companyName: "NexOrbit Labs",
    tier: "gold",
    year: 2026,
    pipelineStage: "won",
    isActive: true,
  },
  {
    id: "s2",
    companyName: "CloudForge",
    tier: "silver",
    year: 2026,
    pipelineStage: "proposal",
    isActive: true,
  },
  {
    id: "s3",
    companyName: "DataSpring",
    tier: "bronze",
    year: 2026,
    pipelineStage: "contacted",
    isActive: false,
  },
]
