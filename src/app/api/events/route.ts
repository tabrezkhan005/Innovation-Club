import { NextResponse } from "next/server"
import { z } from "zod"
import { createEvent, listEvents } from "@/lib/data-access"

const createEventSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  eventType: z.enum(["talk", "workshop", "hackathon", "panel", "other"]),
  date: z.string().datetime(),
  venue: z.string().optional(),
  registrationLimit: z.number().int().positive().optional(),
  tags: z.array(z.string()).optional(),
})

export async function GET() {
  try {
    const { data, source } = await listEvents()
    return NextResponse.json({ data, source })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events", details: getErrorMessage(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const payload = createEventSchema.parse(json)

    const createdEvent = await createEvent({
      title: payload.title,
      slug: payload.slug,
      description: payload.description,
      event_type: payload.eventType,
      date: payload.date,
      venue: payload.venue ?? null,
      registration_limit: payload.registrationLimit ?? null,
      tags: payload.tags ?? [],
      is_published: false,
      is_past: false,
    })

    return NextResponse.json({ data: createdEvent }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        { error: "Invalid event payload", issues: error.issues },
        { status: 400 }
      )

    return NextResponse.json(
      { error: "Failed to create event", details: getErrorMessage(error) },
      { status: 500 }
    )
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message

  return "Unknown error"
}
