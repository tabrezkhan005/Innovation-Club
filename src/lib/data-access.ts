import { events as mockEvents, members as mockMembers, sponsors as mockSponsors } from "@/lib/site-data"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/supabase/types"

export async function listEvents() {
  const supabase = getSupabaseServerClient()
  if (!supabase) return { data: mockEvents, source: "mock" as const }

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true })

  if (error) throw new Error("Unable to fetch events")

  return {
    data: data.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      description: item.description,
      speakerName: item.speaker_name ?? "TBA",
      speakerCompany: item.speaker_company ?? "KITS Innovation Club",
      date: item.date,
      venue: item.venue ?? "TBA",
      tags: item.tags ?? [],
      eventType: item.event_type === "other" ? "panel" : item.event_type,
      isPast: item.is_past,
      registrationLimit: item.registration_limit ?? 0,
      recordingUrl: item.recording_url ?? undefined,
    })),
    source: "supabase" as const,
  }
}

export async function createEvent(payload: Database["public"]["Tables"]["events"]["Insert"]) {
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Supabase environment is not configured")

  const { data, error } = await supabase.from("events").insert(payload).select("*").single()
  if (error) throw new Error("Unable to create event")

  return data
}

export async function listMembers() {
  const supabase = getSupabaseServerClient()
  if (!supabase) return { data: mockMembers, source: "mock" as const }

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("generation", { ascending: false })

  if (error) throw new Error("Unable to fetch members")

  return {
    data: data.map((item) => ({
      id: item.id,
      fullName: item.full_name,
      generation: item.generation,
      generationLabel: item.generation_label ?? "Batch",
      position: item.position_in_club ?? "Member",
      branch: item.branch ?? "NA",
      batchYear: item.batch_year ?? 0,
      skills: item.skills ?? [],
      isActive: item.is_active,
    })),
    source: "supabase" as const,
  }
}

export async function listSponsors() {
  const supabase = getSupabaseServerClient()
  if (!supabase) return { data: mockSponsors, source: "mock" as const }

  const { data, error } = await supabase
    .from("sponsors")
    .select("*")
    .order("year", { ascending: false })

  if (error) throw new Error("Unable to fetch sponsors")

  return {
    data: data.map((item) => ({
      id: item.id,
      companyName: item.company_name,
      tier: item.tier,
      year: item.year ?? new Date().getFullYear(),
      pipelineStage: normalizePipelineStage(item.pipeline_stage),
      isActive: item.is_active,
    })),
    source: "supabase" as const,
  }
}

export async function createRegistration(payload: Database["public"]["Tables"]["registrations"]["Insert"]) {
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Supabase environment is not configured")

  const { data, error } = await supabase.from("registrations").insert(payload).select("*").single()
  if (error) throw new Error("Unable to create registration")

  return data
}

function normalizePipelineStage(stage: string): "lead" | "contacted" | "proposal" | "won" {
  if (stage === "contacted" || stage === "proposal" || stage === "won") return stage

  return "lead"
}
