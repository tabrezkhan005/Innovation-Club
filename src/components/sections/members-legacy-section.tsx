"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { generationMeta, legacyTimeline, members, type MemberItem } from "@/lib/site-data"

type GenerationFilter = 1 | 2 | 3 | 4

export function MembersLegacySection() {
  const [activeGeneration, setActiveGeneration] = useState<GenerationFilter>(4)
  const [searchValue, setSearchValue] = useState("")
  const [selectedBranch, setSelectedBranch] = useState<string>("All")
  const [selectedSkill, setSelectedSkill] = useState<string>("All")

  const branches = useMemo(() => ["All", ...new Set(members.map((member) => member.branch))], [])
  const skills = useMemo(() => ["All", ...new Set(members.flatMap((member) => member.skills))], [])

  const activeMeta = generationMeta.find((generation) => generation.id === activeGeneration)
  const filteredMembers = members.filter((member) => {
    if (member.generation !== activeGeneration) return false

    const doesSearchMatch =
      member.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      member.position.toLowerCase().includes(searchValue.toLowerCase())

    if (!doesSearchMatch) return false
    if (selectedBranch !== "All" && member.branch !== selectedBranch) return false
    if (selectedSkill !== "All" && !member.skills.includes(selectedSkill)) return false

    return true
  })

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm font-medium text-accent-primary">{members.length}+ Members</p>
        <h1 className="mt-2 font-display text-5xl font-bold text-text-primary">
          Our <span className="headline-accent">Legacy</span>
        </h1>
        <p className="mt-4 max-w-3xl text-text-secondary">
          200+ innovators across 4 generations, building the future at KITS through high-impact execution.
        </p>

        <div className="mt-8 flex flex-wrap gap-2 rounded-2xl border border-border-default bg-bg-surface p-2">
          {generationMeta.map((generation) => {
            const isActive = generation.id === activeGeneration

            return (
              <button
                key={generation.id}
                onClick={() => setActiveGeneration(generation.id)}
                className="relative rounded-xl px-4 py-2 text-sm font-medium text-text-secondary hover:text-accent-primary"
              >
                <span className={isActive ? "text-accent-primary" : ""}>
                  Gen {generation.id} · {generation.label.replace(" Batch", "")}
                </span>
                {generation.id === 4 ? (
                  <span className="ml-2 inline-block h-2 w-2 rounded-full bg-accent-primary align-middle animate-pulse" />
                ) : null}
                {isActive ? (
                  <motion.div
                    layoutId="generation-tab-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent-primary"
                  />
                ) : null}
              </button>
            )
          })}
        </div>

        {activeMeta ? (
          <article className="mt-6 rounded-2xl border border-border-default bg-bg-surface p-6">
            <p className="text-xs uppercase tracking-wide text-accent-primary">{activeMeta.yearRange}</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-text-primary">{activeMeta.label}</h2>
            <p className="mt-2 text-text-secondary">{activeMeta.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeMeta.milestones.map((milestone) => (
                <span key={milestone} className="rounded-full border border-border-accent px-3 py-1 text-xs text-accent-bright">
                  {milestone}
                </span>
              ))}
            </div>
          </article>
        ) : null}

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search members"
            className="gold-focus-ring rounded-xl border border-border-default bg-bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary"
          />
          <FilterSelect
            value={selectedBranch}
            onChange={setSelectedBranch}
            options={branches}
            label="Branch"
          />
          <FilterSelect value={selectedSkill} onChange={setSelectedSkill} options={skills} label="Skill" />
        </div>

        <motion.div layout className="mt-8 grid gap-4 md:grid-cols-2">
          {filteredMembers.map((member) => (
            <motion.article
              key={member.id}
              layout
              className={getMemberCardClassName({ member })}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`relative h-16 w-16 rounded-full border border-border-accent bg-bg-subtle ${
                      member.generation === 4 ? "before:absolute before:inset-0 before:rounded-full before:animate-[gold-pulse_2s_infinite]" : ""
                    }`}
                  />
                  <div>
                    <p className="font-display text-xl font-semibold text-text-primary">{member.fullName}</p>
                    <p className="text-sm text-text-secondary">{member.position}</p>
                  </div>
                </div>
                <span className="rounded-full border border-border-accent px-3 py-1 text-xs text-accent-bright">
                  Gen {member.generation}
                </span>
              </div>

              <p className="mt-3 text-sm text-text-tertiary">
                {member.branch} · Batch {member.batchYear}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-bg-subtle px-3 py-1 text-xs text-text-secondary">
                    {skill}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-xs uppercase tracking-wide text-accent-primary">
                {member.isActive ? "Active Member" : "Alumni"}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <section className="mt-14">
          <h3 className="font-heading text-2xl font-semibold text-text-primary">Legacy Timeline</h3>
          <div className="mt-5 overflow-x-auto pb-2">
            <div className="flex min-w-max items-center gap-5">
              {legacyTimeline.map((item, index) => (
                <div key={item.title} className="flex items-center gap-5">
                  <article className="min-w-44 rounded-xl border border-border-default bg-bg-surface px-4 py-3">
                    <p className="text-xs text-accent-primary">{item.year}</p>
                    <p className="mt-1 text-sm text-text-primary">{item.title}</p>
                  </article>
                  {index < legacyTimeline.length - 1 ? (
                    <div className="h-px w-12 bg-accent-primary/60" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

interface FilterSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}

function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  return (
    <label className="flex flex-col gap-1 text-xs text-text-tertiary">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="gold-focus-ring rounded-xl border border-border-default bg-bg-surface px-4 py-3 text-sm text-text-primary"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function getMemberCardClassName({ member }: { member: MemberItem }) {
  if (member.generation === 1)
    return "rounded-2xl border border-border-default bg-[linear-gradient(135deg,rgba(200,155,42,0.08),rgba(21,16,5,1))] p-5 transition hover:scale-[1.02] hover:border-accent-primary"

  if (member.generation === 4)
    return "group relative rounded-2xl border border-border-default bg-bg-surface p-5 transition hover:scale-[1.02] hover:border-accent-primary"

  return "rounded-2xl border border-border-default bg-bg-surface p-5 transition hover:scale-[1.02] hover:border-accent-primary"
}
