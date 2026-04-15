import { NextResponse } from "next/server"
import { listMembers } from "@/lib/data-access"

export async function GET() {
  try {
    const { data, source } = await listMembers()
    return NextResponse.json({ data, source })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch members", details: getErrorMessage(error) },
      { status: 500 }
    )
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message

  return "Unknown error"
}
