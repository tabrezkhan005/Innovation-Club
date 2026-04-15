"use client"

import { useEffect, useMemo, useState } from "react"

interface NumberTickerProps {
  value: number
  suffix?: string
}

export function NumberTicker({ value, suffix = "" }: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const durationInMs = 1100
  const stepTimeInMs = 16
  const totalSteps = Math.max(1, Math.floor(durationInMs / stepTimeInMs))
  const increment = useMemo(() => value / totalSteps, [value, totalSteps])

  useEffect(() => {
    let step = 0
    const intervalId = window.setInterval(() => {
      step += 1
      const nextValue = Math.min(value, Math.round(step * increment))
      setDisplayValue(nextValue)
      if (nextValue >= value) window.clearInterval(intervalId)
    }, stepTimeInMs)

    return () => window.clearInterval(intervalId)
  }, [increment, stepTimeInMs, value])

  return (
    <span className="font-display text-4xl font-bold text-text-primary">
      {displayValue}
      <span className="text-accent-primary">{suffix}</span>
    </span>
  )
}
