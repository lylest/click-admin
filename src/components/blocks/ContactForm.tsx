'use client'

import { CheckCircle2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'

import { submitInquiry, type ContactState } from '@/app/(frontend)/actions'
import type { SiteText } from '@/lib/siteText'
import { cn } from '@/lib/utils'

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

const inputClass =
  'mt-1.5 block w-full rounded-lg border border-line bg-white px-4 py-3 text-ink placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

function Field({
  label,
  name,
  error,
  className,
  children,
}: {
  label: string
  name: string
  error?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <label htmlFor={name} className={cn('block', className)}>
      <span className="text-sm font-semibold text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  )
}

export type FormLabels = SiteText['form']

export function ContactForm({
  interests,
  successMessage,
  labels,
}: {
  interests: string[]
  successMessage: string
  labels: FormLabels
}) {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitInquiry, {
    ok: false,
  })
  const product = useSearchParams().get('product')
  const preselected = product
    ? interests.find((i) => slugify(i).startsWith(slugify(product)))
    : undefined
  const errors = state.fieldErrors ?? {}

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-line bg-tint p-10" role="status">
        <CheckCircle2 className="size-12 text-primary" aria-hidden />
        <p className="mt-4 text-xl font-semibold text-ink">{successMessage}</p>
      </div>
    )
  }

  return (
    <form
      action={action}
      className="grid gap-5 rounded-3xl border border-line bg-white p-6 sm:grid-cols-2 sm:p-10"
      noValidate
    >
      <Field label={`${labels.name} *`} name="name" error={errors.name}>
        <input id="name" name="name" autoComplete="name" required className={inputClass} />
      </Field>
      <Field label={labels.phone} name="phone" error={errors.phone}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+255"
          className={inputClass}
        />
      </Field>
      <Field label={labels.email} name="email" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" className={inputClass} />
      </Field>
      <Field label={labels.organization} name="organization">
        <input
          id="organization"
          name="organization"
          autoComplete="organization"
          className={inputClass}
        />
      </Field>
      {interests.length > 0 && (
        <Field label={labels.interest} name="interest" className="sm:col-span-2">
          <select
            id="interest"
            name="interest"
            defaultValue={preselected ?? interests[0]}
            className={inputClass}
          >
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </Field>
      )}
      <Field
        label={`${labels.message} *`}
        name="message"
        error={errors.message}
        className="sm:col-span-2"
      >
        <textarea id="message" name="message" rows={5} required className={inputClass} />
      </Field>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      {state.error && <p className="text-red-600 sm:col-span-2">{state.error}</p>}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center rounded-lg bg-ink px-6 py-3.5 font-semibold text-white transition-colors hover:bg-primary disabled:opacity-60 sm:w-auto"
        >
          {pending ? labels.sending : labels.send}
        </button>
      </div>
    </form>
  )
}
