'use client'

import { CheckCircle2 } from 'lucide-react'
import { useActionState } from 'react'

import { submitTicket, type TicketState } from '@/app/(frontend)/actions'
import { fill } from '@/lib/siteText'
import type { SiteText } from '@/lib/siteText'
import { Field, inputClass } from './ContactForm'

export function TicketForm({
  products,
  form,
  labels,
}: {
  products: string[]
  form: SiteText['form']
  labels: SiteText['ticket']
}) {
  const [state, action, pending] = useActionState<TicketState, FormData>(submitTicket, {
    ok: false,
  })
  const errors = state.fieldErrors ?? {}

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-line bg-tint p-10" role="status">
        <CheckCircle2 className="size-12 text-primary" aria-hidden />
        <p className="mt-4 text-xl font-semibold text-ink">
          {fill(labels.success, { ticket: state.ticket ?? '' })}
        </p>
        {state.copiedTo && (
          <p className="mt-2 text-muted">{fill(labels.successCopy, { email: state.copiedTo })}</p>
        )}
      </div>
    )
  }

  const options = [...products, labels.otherProduct]

  return (
    <form
      action={action}
      className="grid gap-5 rounded-3xl border border-line bg-white p-6 sm:grid-cols-2 sm:p-10"
      noValidate
    >
      <Field label={`${form.name} *`} name="t-name" error={errors.name}>
        <input id="t-name" name="name" autoComplete="name" required className={inputClass} />
      </Field>
      <Field label={form.phone} name="t-phone" error={errors.phone}>
        <input
          id="t-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+255"
          className={inputClass}
        />
      </Field>
      <Field label={form.email} name="t-email" error={errors.email}>
        <input id="t-email" name="email" type="email" autoComplete="email" className={inputClass} />
      </Field>
      <Field label={labels.product} name="t-product">
        <select id="t-product" name="product" defaultValue={options[0]} className={inputClass}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>
      <Field label={labels.account} name="t-account">
        <input id="t-account" name="account" className={inputClass} />
      </Field>
      <Field label={`${labels.subject} *`} name="t-subject" error={errors.subject}>
        <input id="t-subject" name="subject" required maxLength={150} className={inputClass} />
      </Field>
      <Field
        label={`${labels.description} *`}
        name="t-description"
        error={errors.description}
        className="sm:col-span-2"
      >
        <textarea
          id="t-description"
          name="description"
          rows={5}
          required
          className={inputClass}
        />
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
