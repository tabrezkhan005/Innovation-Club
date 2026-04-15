"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface AdminAnalyticsChartsProps {
  eventsByType: Array<{ name: string; count: number }>
  generationCounts: Array<{ name: string; count: number }>
}

export function AdminAnalyticsCharts({ eventsByType, generationCounts }: AdminAnalyticsChartsProps) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      <article className="h-80 rounded-2xl border border-border-default bg-bg-surface p-4">
        <h2 className="font-heading text-lg font-semibold text-text-primary">Events by Type</h2>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={eventsByType}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(200,155,42,0.1)" />
              <XAxis dataKey="name" stroke="#B0A070" />
              <YAxis stroke="#B0A070" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#C89B2A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="h-80 rounded-2xl border border-border-default bg-bg-surface p-4">
        <h2 className="font-heading text-lg font-semibold text-text-primary">Members by Generation</h2>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={generationCounts}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(200,155,42,0.1)" />
              <XAxis dataKey="name" stroke="#B0A070" />
              <YAxis stroke="#B0A070" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#E8C45A" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>
    </div>
  )
}
