import { Compass, Target } from 'lucide-react'

import { IconTile } from '../Icon'
import { Media } from '../Media'
import { RichText } from '../RichText'
import { SectionHeading } from '../SectionHeading'
import { asMedia, type BlockOf, isPlaceholder } from '@/lib/utils'

export function TimelineBlock({ block }: { block: BlockOf<'timeline'> }) {
  return (
    <section className="section">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          {block.heading && (
            <h2 className="text-3xl text-ink md:text-4xl lg:text-5xl">{block.heading}</h2>
          )}
          <RichText data={block.body} className="mt-6" />
        </div>
        <ol className="relative border-l-2 border-tint-strong lg:col-span-7">
          {block.events?.map((event) => (
            <li key={event.id ?? event.title} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute -left-[9px] top-1.5 size-4 rounded-full border-4 border-white bg-primary ring-2 ring-tint-strong" />
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                {event.year}
              </p>
              <h3 className="mt-1 text-xl text-ink">{event.title}</h3>
              {event.text && <p className="mt-1.5 text-muted">{event.text}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function MissionBlock({ block }: { block: BlockOf<'mission'> }) {
  return (
    <section className="section bg-tint">
      <div className="wrap">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { label: 'Our mission', text: block.mission, Icon: Target },
            { label: 'Our vision', text: block.vision, Icon: Compass },
          ]
            .filter((item) => item.text)
            .map(({ label, text, Icon }) => (
              <div key={label} className="rounded-3xl bg-white p-8 lg:p-10">
                <Icon className="size-8 text-primary" strokeWidth={1.75} aria-hidden />
                <h2 className="mt-5 text-sm font-semibold uppercase tracking-widest text-primary">
                  {label}
                </h2>
                <p className="mt-3 text-2xl font-semibold leading-snug text-ink">{text}</p>
              </div>
            ))}
        </div>
        {!!block.values?.length && (
          <div className="mt-20">
            <SectionHeading heading={block.valuesHeading} />
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {block.values.map((v) => (
                <li key={v.id ?? v.title} className="rounded-2xl bg-white p-7">
                  <IconTile name={v.icon} />
                  <h3 className="mt-5 text-lg text-ink">{v.title}</h3>
                  {v.text && <p className="mt-1.5 text-muted">{v.text}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export function TeamBlock({ block }: { block: BlockOf<'team'> }) {
  // Placeholder members ("[Name]") are never shown; with none real, the section is hidden.
  const members = (block.members ?? []).filter((m) => !isPlaceholder(m.name))
  if (!members.length) return null
  return (
    <section className="section">
      <div className="wrap">
        <SectionHeading heading={block.heading} intro={block.intro} />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m) => (
            <li key={m.id ?? m.name}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-tint">
                {asMedia(m.photo) ? (
                  <Media resource={m.photo} fill sizes="(min-width: 1024px) 25vw, 50vw" />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-primary/30">
                    {m.name.replace(/[^A-Za-z]/g, '').charAt(0) || '•'}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-lg text-ink">
                {m.linkedin ? (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    {m.name}
                  </a>
                ) : (
                  m.name
                )}
              </h3>
              {m.role && <p className="text-muted">{m.role}</p>}
              {m.bio && <p className="mt-2 text-sm text-muted">{m.bio}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
