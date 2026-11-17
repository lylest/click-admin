'use server'

import { getPayloadClient, getSiteText } from '@/lib/payload'

export type ContactState = { ok: boolean; error?: string; fieldErrors?: Record<string, string> }

const text = (form: FormData, key: string, max = 200) =>
  String(form.get(key) ?? '')
    .trim()
    .slice(0, max)

export async function submitInquiry(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field.
  if (text(form, 'website')) return { ok: true }

  const data = {
    name: text(form, 'name'),
    phone: text(form, 'phone', 40),
    email: text(form, 'email'),
    organization: text(form, 'organization'),
    interest: text(form, 'interest'),
    message: text(form, 'message', 5000),
  }

  const t = (await getSiteText()).form
  const fieldErrors: Record<string, string> = {}
  if (!data.name) fieldErrors.name = t.errorName
  if (!data.phone && !data.email) fieldErrors.phone = t.errorContact
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) fieldErrors.email = t.errorEmail
  if (!data.message) fieldErrors.message = t.errorMessage
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'inquiries',
      data: { ...data, email: data.email || undefined },
    })
    return { ok: true }
  } catch (err) {
    console.error('Failed to save inquiry', err)
    return { ok: false, error: t.errorServer }
  }
}
