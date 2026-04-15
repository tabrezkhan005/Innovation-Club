"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

const adminEventSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  eventType: z.enum(["talk", "workshop", "hackathon", "panel", "other"]),
  date: z.string().min(1, "Date is required"),
  venue: z.string().optional(),
  registrationLimit: z.string().optional(),
  tags: z.string().optional(),
})

type AdminEventFormValues = z.infer<typeof adminEventSchema>

export function AdminNewEventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminEventFormValues>({
    resolver: zodResolver(adminEventSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      eventType: "talk",
      date: "",
      venue: "",
      registrationLimit: "",
      tags: "",
    },
  })

  async function handleFormSubmit(values: AdminEventFormValues) {
    setIsSubmitting(true)
    try {
      const parsedDate = new Date(values.date)
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          slug: values.slug,
          description: values.description,
          eventType: values.eventType,
          date: parsedDate.toISOString(),
          venue: values.venue,
          registrationLimit: values.registrationLimit
            ? Number(values.registrationLimit)
            : undefined,
          tags:
            values.tags
              ?.split(",")
              .map((tag) => tag.trim())
              .filter(Boolean) ?? [],
        }),
      })

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string }
        throw new Error(payload.error ?? "Unable to create event")
      }

      toast.success("Event created", {
        description: `${values.title} has been added successfully.`,
      })
      reset()
    } catch (error) {
      toast.error("Create event failed", {
        description: getErrorMessage(error),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-8 grid gap-4">
      <AdminInput label="Title" error={errors.title?.message} input={<input {...register("title")} className={inputClassName} />} />
      <AdminInput label="Slug" error={errors.slug?.message} input={<input {...register("slug")} className={inputClassName} />} />
      <AdminInput
        label="Event Type"
        error={errors.eventType?.message}
        input={
          <select {...register("eventType")} className={inputClassName}>
            <option value="talk">Talk</option>
            <option value="workshop">Workshop</option>
            <option value="hackathon">Hackathon</option>
            <option value="panel">Panel</option>
            <option value="other">Other</option>
          </select>
        }
      />
      <AdminInput
        label="Date"
        error={errors.date?.message}
        input={<input type="datetime-local" {...register("date")} className={inputClassName} />}
      />
      <AdminInput label="Venue" error={errors.venue?.message} input={<input {...register("venue")} className={inputClassName} />} />
      <AdminInput
        label="Registration Limit"
        error={errors.registrationLimit?.message}
        input={<input type="number" {...register("registrationLimit")} className={inputClassName} />}
      />
      <AdminInput
        label="Tags (comma separated)"
        error={errors.tags?.message}
        input={<input {...register("tags")} className={inputClassName} />}
      />
      <AdminInput
        label="Description"
        error={errors.description?.message}
        input={<textarea rows={4} {...register("description")} className={inputClassName} />}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="gold-focus-ring mt-2 rounded-full bg-accent-primary px-6 py-3 text-sm font-semibold text-bg-base disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Saving..." : "Save Event"}
      </button>
    </form>
  )
}

interface AdminInputProps {
  label: string
  error?: string
  input: React.ReactNode
}

function AdminInput({ label, error, input }: AdminInputProps) {
  return (
    <label className="text-sm text-text-secondary">
      {label}
      <div className="mt-2">{input}</div>
      {error ? <span className="mt-1 block text-xs text-red-300">{error}</span> : null}
    </label>
  )
}

const inputClassName =
  "gold-focus-ring w-full rounded-xl border border-border-default bg-bg-base px-4 py-3 text-sm text-text-primary"

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message

  return "Unknown error"
}
