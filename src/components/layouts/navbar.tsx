"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ClubLogo } from "@/components/ui/club-logo"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/members", label: "Members" },
  { href: "/team", label: "Team" },
  { href: "/partners", label: "Partners" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:px-8">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-border-default bg-[rgba(10,9,8,0.82)] px-4 py-2.5 backdrop-blur-xl">
        <Link href="/" className="gold-focus-ring rounded-lg">
          <ClubLogo size="navbar" />
        </Link>

        <ul className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "gold-focus-ring rounded-full px-3 py-2 text-sm font-medium font-heading text-text-secondary hover:text-accent-primary",
                    isActive && "text-accent-bright"
                  )}
                >
                  <span
                    className={cn(
                      "border-b-2 border-transparent pb-1",
                      isActive && "border-accent-bright"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        <Link
          href="/sign-in"
          className="gold-focus-ring rounded-full border border-border-default bg-bg-surface px-4 py-2 text-sm font-medium text-text-primary hover:border-accent-primary hover:text-accent-primary"
        >
          Sign In
        </Link>
      </nav>
    </header>
  )
}
