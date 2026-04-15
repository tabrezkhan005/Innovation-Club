interface MarqueeProps {
  items: string[]
}

export function Marquee({ items }: MarqueeProps) {
  const repeatedItems = [...items, ...items]

  return (
    <div className="relative overflow-hidden">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-4">
        {repeatedItems.map((item, index) => (
          <article
            key={`${item}-${index}`}
            className="min-w-72 rounded-xl border border-border-default bg-bg-surface px-4 py-3"
          >
            <p className="text-sm text-text-secondary">{item}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
