'use server'

import { randomInt } from 'node:crypto'
import { headers } from 'next/headers'

import { mailEnabled, sendMail } from '@/lib/mail'
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

export type TicketState = ContactState & { ticket?: string; copiedTo?: string }

// Ticket numbers like CG-261120-K7Q4: date plus 4 characters without look-alikes.
const TICKET_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const newTicketNumber = () => {
  const d = new Date()
  const ymd = [d.getUTCFullYear() % 100, d.getUTCMonth() + 1, d.getUTCDate()]
    .map((n) => String(n).padStart(2, '0'))
    .join('')
  const tail = Array.from({ length: 4 }, () => TICKET_CHARS[randomInt(TICKET_CHARS.length)]).join('')
  return `CG-${ymd}-${tail}`
}

// At most 5 tickets per visitor per hour. In memory: the site runs as one process.
const recent = new Map<string, number[]>()
const tooMany = (ip: string) => {
  const now = Date.now()
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 3_600_000)
  if (recent.size > 5000) recent.clear()
  if (hits.length >= 5) return true
  recent.set(ip, [...hits, now])
  return false
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const oneLine = (v: string) => v.replace(/[\r\n]+/g, ' ')

export async function submitTicket(_prev: TicketState, form: FormData): Promise<TicketState> {
  if (text(form, 'website')) return { ok: true, ticket: newTicketNumber() }

  const data = {
    name: oneLine(text(form, 'name')),
    phone: oneLine(text(form, 'phone', 40)),
    email: text(form, 'email'),
    product: oneLine(text(form, 'product')),
    account: oneLine(text(form, 'account', 80)),
    subject: oneLine(text(form, 'subject', 150)),
    description: text(form, 'description', 5000),
  }

  const { form: f, ticket: t } = await getSiteText()
  const fieldErrors: Record<string, string> = {}
  if (!data.name) fieldErrors.name = f.errorName
  if (!data.phone && !data.email) fieldErrors.phone = f.errorContact
  if (data.email && !isEmail(data.email)) fieldErrors.email = f.errorEmail
  if (!data.subject) fieldErrors.subject = t.errorSubject
  if (!data.description) fieldErrors.description = t.errorDescription
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors }

  const h = await headers()
  const ip =
    h.get('cf-connecting-ip') || h.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (tooMany(ip)) return { ok: false, error: t.errorBusy }

  const payload = await getPayloadClient()
  const ticket = newTicketNumber()
  let id: number | string
  try {
    const doc = await payload.create({
      collection: 'tickets',
      data: { ...data, email: data.email || undefined, ticket, status: 'open', emailed: false },
    })
    id = doc.id
  } catch (err) {
    console.error('Failed to save ticket', err)
    return { ok: false, error: f.errorServer }
  }

  // The ticket is saved; email problems are logged and shown in the CMS
  // ("Emailed to customer care" stays unticked) but do not fail the form.
  const careEmail = isEmail(t.email) ? t.email : 'support@clickgroup.co.tz'
  const rows: [string, string][] = [
    ['Ticket', ticket],
    ['Name', data.name],
    ['Phone', data.phone],
    ['Email', data.email],
    ['Product', data.product],
    ['Meter/account', data.account],
    ['Subject', data.subject],
  ]
  const details = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')

  let copiedTo: string | undefined
  if (mailEnabled()) {
    try {
      await sendMail({
        to: careEmail,
        replyTo: data.email || undefined,
        subject: `[${ticket}] ${data.subject}`,
        text: `New customer care ticket from the website.\n\n${details}\n\n${data.description}\n`,
      })
      await payload.update({ collection: 'tickets', id, data: { emailed: true } })
    } catch (err) {
      console.error(`Failed to email ticket ${ticket}`, err)
    }
    if (data.email) {
      try {
        await sendMail({
          to: data.email,
          replyTo: careEmail,
          subject: `[${ticket}] We received your request: ${data.subject}`,
          text:
            `Hello ${data.name},\n\n` +
            `Thank you for contacting Click Group customer care. Your ticket number is ${ticket}. ` +
            `Please quote it if you call or write to us. You can reply to this email to add details.\n\n` +
            `${details}\n\n${data.description}\n\n` +
            `Click Group Customer Care\n${careEmail}${t.phone ? `\n${t.phone}` : ''}\n`,
        })
        copiedTo = data.email
      } catch (err) {
        console.error(`Failed to send ticket copy ${ticket}`, err)
      }
    }
  } else {
    console.warn(`Ticket ${ticket} saved, but SMTP_HOST is not set so no email was sent`)
  }

  return { ok: true, ticket, copiedTo }
}
