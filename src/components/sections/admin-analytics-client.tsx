"use client"

import { useEffect, useState } from "react"
import { AdminAnalyticsCharts } from "@/components/sections/admin-analytics-charts"

interface AdminAnalyticsClientProps {
  eventsByType: Array<{ name: string; count: number }>
  generationCounts: Array<{ name: string; count: number }>
}

export function AdminAnalyticsClient({
  eventsByType,
  generationCounts,
}: AdminAnalyticsClientProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted)
    return (
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="h-80 rounded-2xl border border-border-default bg-bg-surface" />
        <div className="h-80 rounded-2xl border border-border-default bg-bg-surface" />
      </div>
    )

  return (
    <AdminAnalyticsCharts
      eventsByType={eventsByType}
      generationCounts={generationCounts}
    />
  )
}
