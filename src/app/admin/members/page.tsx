import type { Metadata } from "next"
import { listMembers } from "@/lib/data-access"

export const metadata: Metadata = {
  title: "Admin Members | Innovation Club",
  description: "Manage members across generations and roles.",
}

export default async function AdminMembersPage() {
  const { data: members } = await listMembers()

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="font-display text-4xl font-bold text-text-primary">
          Admin <span className="headline-accent">Members</span>
        </h1>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border-default">
          <table className="w-full">
            <thead className="bg-bg-surface">
              <tr className="text-left text-xs uppercase tracking-wide text-text-tertiary">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Generation</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="bg-bg-base">
              {members.map((member) => (
                <tr key={member.id} className="border-t border-border-default text-sm text-text-secondary">
                  <td className="px-4 py-3">{member.fullName}</td>
                  <td className="px-4 py-3">{member.position}</td>
                  <td className="px-4 py-3">Gen {member.generation}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-border-accent px-3 py-1 text-xs text-accent-primary">
                      {member.isActive ? "Active" : "Alumni"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
