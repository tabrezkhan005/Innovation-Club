import Image from "next/image"
import { cn } from "@/lib/utils"

interface ClubLogoProps {
  size?: "navbar" | "footer"
}

const logoSizeMap = {
  navbar: "h-10 w-10 shrink-0 md:h-11 md:w-11",
  footer: "h-16 w-16 shrink-0 md:h-[4.5rem] md:w-[4.5rem]",
}

export function ClubLogo({ size = "navbar" }: ClubLogoProps) {
  const sizeClassName = logoSizeMap[size]

  return (
    <div
      className={cn(
        "club-logo-hover relative overflow-hidden rounded-lg border border-accent-primary/40 bg-white shadow-[0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-black/5",
        sizeClassName
      )}
    >
      <Image
        src="/Ic-logobg.png"
        alt="KITS Innovation Club logo"
        fill
        sizes={size === "navbar" ? "44px" : "72px"}
        className="object-contain p-0.5"
        priority={size === "navbar"}
      />
    </div>
  )
}
