"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface ShimmerButtonProps {
  href: string
  label: string
  className?: string
}

export function ShimmerButton({ href, label, className }: ShimmerButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "gold-focus-ring relative inline-flex overflow-hidden rounded-full bg-accent-primary px-6 py-3 text-sm font-semibold text-bg-base",
        "before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.55),transparent)]",
        "before:animate-[shimmer_2.2s_linear_infinite] hover:bg-accent-bright",
        className
      )}
    >
      <span className="relative">{label}</span>
    </Link>
  )
}
