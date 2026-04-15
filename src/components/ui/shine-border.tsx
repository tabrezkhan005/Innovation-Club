import { cn } from "@/lib/utils"

interface ShineBorderProps {
  className?: string
  children: React.ReactNode
}

export function ShineBorder({ className, children }: ShineBorderProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border-accent bg-bg-surface",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:border before:border-transparent",
        "before:bg-[linear-gradient(120deg,transparent,rgba(200,155,42,0.24),transparent)] before:opacity-0 before:transition-opacity hover:before:opacity-100",
        className
      )}
    >
      {children}
    </div>
  )
}
