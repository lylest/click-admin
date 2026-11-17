import { Reveal } from './motion'
import { cn } from '@/lib/utils'

export function Eyebrow({ children, dark }: { children?: string | null; dark?: boolean }) {
  if (!children) return null
  return (
    <p
      className={cn(
        'text-sm font-semibold uppercase tracking-widest',
        dark ? 'text-accent' : 'text-primary',
      )}
    >
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  heading,
  intro,
  dark = false,
}: {
  eyebrow?: string | null
  heading?: string | null
  intro?: string | null
  dark?: boolean
}) {
  if (!heading && !intro) return null
  return (
    <Reveal className="mb-12 max-w-2xl lg:mb-16">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      {heading && (
        <h2
          className={cn('mt-2 text-3xl md:text-4xl lg:text-5xl', dark ? 'text-white' : 'text-ink')}
        >
          {heading}
        </h2>
      )}
      {intro && (
        <p className={cn('mt-4 text-lg', dark ? 'text-white/70' : 'text-muted')}>{intro}</p>
      )}
    </Reveal>
  )
}
