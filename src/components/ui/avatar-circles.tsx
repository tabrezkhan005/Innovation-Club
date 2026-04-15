interface AvatarCirclesProps {
  names: string[]
}

export function AvatarCircles({ names }: AvatarCirclesProps) {
  return (
    <div className="flex items-center">
      {names.map((name, index) => (
        <div
          key={name}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border-accent bg-bg-surface text-xs text-accent-primary"
          style={{ marginLeft: index === 0 ? 0 : -12 }}
          aria-label={name}
        >
          {name.slice(0, 1)}
        </div>
      ))}
    </div>
  )
}
