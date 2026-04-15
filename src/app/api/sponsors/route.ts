import { NextResponse } from "next/server"
import { z } from "zod"
import { listSponsors } from "@/lib/data-access"
import { getSupabaseServerClient } from "@/lib/supabase/server"

const sponsorLeadSchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  websiteUrl: z.string().url().optional(),
  message: z.string().min(10),
})

export async function GET() {
  try {
    const { data, source } = await listSponsors()
    return NextResponse.json({ data, source })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch sponsors", details: getErrorMessage(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const payload = sponsorLeadSchema.parse(json)
    const supabase = getSupabaseServerClient()
    const source = supabase ? "supabase-ready" : "mock"

    return NextResponse.json(
      {
        data: payload,
        source,
        message:
          "Lead accepted. Wire this endpoint to a Server Action or Supabase Edge Function for durable persistence.",
      },
      { status: 202 }
    )
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        { error: "Invalid sponsor lead payload", issues: error.issues },
        { status: 400 }
      )

    return NextResponse.json(
      { error: "Failed to save sponsor lead", details: getErrorMessage(error) },
      { status: 500 }
    )
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message

  return "Unknown error"
}
