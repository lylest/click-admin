import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Suspense } from 'react'

import { ContactForm } from './ContactForm'
import { getSiteText } from '@/lib/payload'
import { isPlaceholder, realLines, type BlockOf } from '@/lib/utils'

export async function ContactBlock({ block }: { block: BlockOf<'contact'> }) {
  const t = await getSiteText()
  const interests = (block.interests ?? []).map((i) => i.label)
  const successMessage = block.successMessage ?? "Thank you! We'll be in touch soon."

  return (
    <section className="bg-gradient-to-b from-tint to-white">
      <div className="wrap grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-5">
          {block.heading && (
            <h1 className="text-4xl text-ink md:text-5xl lg:text-6xl">{block.heading}</h1>
          )}
          {block.text && <p className="mt-5 text-lg text-muted">{block.text}</p>}

          <div className="mt-10 space-y-8">
            {block.offices?.map((office) => (
              <div key={office.id ?? office.name}>
                <h2 className="text-lg text-ink">{office.name}</h2>
                <ul className="mt-3 space-y-2.5 text-muted">
                  {realLines(office.address).length > 0 && (
                    <li className="flex gap-3">
                      <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                      <span className="whitespace-pre-line">{realLines(office.address).join('\n')}</span>
                    </li>
                  )}
                  {office.phone && !isPlaceholder(office.phone) && (
                    <li className="flex gap-3">
                      <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                      <a
                        href={`tel:${office.phone.replace(/[^+\d]/g, '')}`}
                        className="hover:text-ink"
                      >
                        {office.phone}
                      </a>
                    </li>
                  )}
                  {office.email && !isPlaceholder(office.email) && (
                    <li className="flex gap-3">
                      <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                      <a href={`mailto:${office.email}`} className="hover:text-ink">
                        {office.email}
                      </a>
                    </li>
                  )}
                  {office.hours && !isPlaceholder(office.hours) && (
                    <li className="flex gap-3">
                      <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                      {office.hours}
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <Suspense>
            <ContactForm interests={interests} successMessage={successMessage} labels={t.form} />
          </Suspense>
          {block.mapEmbedUrl && (
            <iframe
              src={block.mapEmbedUrl}
              title="Map"
              loading="lazy"
              className="mt-8 aspect-video w-full rounded-3xl border border-line"
            />
          )}
        </div>
      </div>
    </section>
  )
}
