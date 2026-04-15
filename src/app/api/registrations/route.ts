import { NextResponse } from "next/server"
import { z } from "zod"
import { createRegistration } from "@/lib/data-access"

const createRegistrationSchema = z.object({
  eventId: z.string().uuid(),
  memberId: z.string().uuid(),
})

export async function GET() {
  return NextResponse.json({
    message: "Use POST to create a registration. Add list endpoint with auth context in next iteration.",
  })
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const payload = createRegistrationSchema.parse(json)

    const registration = await createRegistration({
      event_id: payload.eventId,
      member_id: payload.memberId,
    })

    return NextResponse.json({ data: registration }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        { error: "Invalid registration payload", issues: error.issues },
        { status: 400 }
      )

    return NextResponse.json(
      { error: "Failed to create registration", details: getErrorMessage(error) },
      { status: 500 }
    )
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message

  return "Unknown error"
}
