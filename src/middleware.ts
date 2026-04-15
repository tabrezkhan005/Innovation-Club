import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import type { NextFetchEvent, NextRequest } from "next/server"
import { NextResponse } from "next/server"

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/profile(.*)"])
const isAdminRoute = createRouteMatcher(["/admin(.*)"])

function isClerkConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() &&
      process.env.CLERK_SECRET_KEY?.trim(),
  )
}

const clerkAuth = clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect()
    const { sessionClaims } = await auth()
    const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role
    if (role !== "admin") return NextResponse.redirect(new URL("/", req.url))
    return
  }

  if (isProtectedRoute(req)) await auth.protect()
})

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  if (!isClerkConfigured()) return NextResponse.next()
  return clerkAuth(req, event)
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
