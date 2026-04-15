"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

const sponsorLeadSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  contactEmail: z.string().email("Enter a valid email"),
  websiteUrl: z.string().url("Enter a valid URL").or(z.literal("")),
  message: z.string().min(10, "Please add at least 10 characters"),
})

type SponsorLeadFormValues = z.infer<typeof sponsorLeadSchema>

export function PartnerLeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SponsorLeadFormValues>({
    resolver: zodResolver(sponsorLeadSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      contactEmail: "",
      websiteUrl: "",
      message: "",
    },
  })

  async function handleFormSubmit(values: SponsorLeadFormValues) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/sponsors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string }
        throw new Error(payload.error ?? "Unable to submit lead")
      }

      toast.success("Partner lead submitted", {
        description: `${values.companyName} has been queued for outreach.`,
      })
      reset()
    } catch (error) {
      toast.error("Submission failed", {
        description: getErrorMessage(error),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-10 rounded-2xl border border-border-default bg-bg-surface p-6 md:p-8">
      <h3 className="font-heading text-2xl font-semibold text-text-primary">Start a Partnership</h3>
      <p className="mt-2 text-sm text-text-secondary">
        Share your details and our partnerships team will contact you.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <FormField
          label="Company Name"
          error={errors.companyName?.message}
          input={<input {...register("companyName")} className={getInputClassName()} />}
        />
        <FormField
          label="Contact Name"
          error={errors.contactName?.message}
          input={<input {...register("contactName")} className={getInputClassName()} />}
        />
        <FormField
          label="Contact Email"
          error={errors.contactEmail?.message}
          input={<input {...register("contactEmail")} className={getInputClassName()} />}
        />
        <FormField
          label="Website URL"
          error={errors.websiteUrl?.message}
          input={<input {...register("websiteUrl")} className={getInputClassName()} />}
        />
      </div>

      <FormField
        label="Message"
        error={errors.message?.message}
        input={<textarea {...register("message")} rows={4} className={getInputClassName()} />}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="gold-focus-ring mt-5 rounded-full bg-accent-primary px-6 py-3 text-sm font-semibold text-bg-base disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit Partnership Lead"}
      </button>
    </form>
  )
}

interface FormFieldProps {
  label: string
  error?: string
  input: React.ReactNode
}

function FormField({ label, error, input }: FormFieldProps) {
  return (
    <label className="mt-4 block text-sm text-text-secondary">
      <span className="mb-2 block">{label}</span>
      {input}
      {error ? <span className="mt-1 block text-xs text-red-300">{error}</span> : null}
    </label>
  )
}

function getInputClassName() {
  return "gold-focus-ring w-full rounded-xl border border-border-default bg-bg-base px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary"
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message

  return "Unknown error"
}
