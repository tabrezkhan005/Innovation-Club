import type { Metadata } from "next"
import { listMembers } from "@/lib/data-access"

export const metadata: Metadata = {
  title: "Profile | Innovation Club",
  description: "Manage member profile and club identity details.",
}

export default async function ProfilePage() {
  const { data: members } = await listMembers()
  const currentMember = members[0]

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-border-default bg-bg-surface p-8">
        <h1 className="font-display text-4xl font-bold text-text-primary">
          My <span className="headline-accent">Profile</span>
        </h1>
        <p className="mt-4 text-text-secondary">
          Keep your club profile updated for events, collaborations, and discoverability.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <ProfileField label="Full Name" value={currentMember?.fullName ?? ""} />
          <ProfileField label="Position" value={currentMember?.position ?? ""} />
          <ProfileField label="Branch" value={currentMember?.branch ?? ""} />
          <ProfileField label="Batch Year" value={String(currentMember?.batchYear ?? "")} />
        </div>

        <div className="mt-8">
          <p className="text-sm text-text-tertiary">Skills</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {currentMember?.skills.map((skill: string) => (
              <span key={skill} className="rounded-full border border-border-accent px-3 py-1 text-xs text-accent-primary">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface ProfileFieldProps {
  label: string
  value: string
}

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <article className="rounded-xl border border-border-default bg-bg-base px-4 py-3">
      <p className="text-xs text-text-tertiary">{label}</p>
      <p className="mt-1 text-sm font-medium text-text-primary">{value}</p>
    </article>
  )
}
