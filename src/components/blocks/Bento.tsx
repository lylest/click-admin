import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { Media } from '../Media'
import { Reveal, RevealImage, Stagger, StaggerItem } from '../motion'
import { SectionHeading } from '../SectionHeading'
import { SolutionsCarousel } from './SolutionsCarousel'
import { getProducts } from '@/lib/payload'
import { solutionSlides } from '@/lib/solutions'
import { asMedia, cn, type BlockOf } from '@/lib/utils'

type Card = NonNullable<BlockOf<'bento'>['cards']>[number]

function BentoCard({ card }: { card: Card }) {
  if (card.type === 'photo') {
    if (!asMedia(card.image)) return null
    return (
      <RevealImage className="relative aspect-square w-full overflow-hidden rounded-3xl bg-tint sm:aspect-auto sm:min-h-[19rem]">
        <Media resource={card.image} fill sizes="(min-width: 1024px) 22vw, 50vw" />
      </RevealImage>
    )
  }

  if (card.type === 'feature') {
    return (
      <div className="flex w-full flex-col rounded-3xl bg-cream p-7 sm:p-10">
        {asMedia(card.image) && (
          <div className="relative aspect-[4/3] w-28 overflow-hidden rounded-2xl sm:w-32">
            <Media resource={card.image} fill sizes="128px" />
          </div>
        )}
        {card.label && (
          <p className={cn('text-sm font-medium text-muted', asMedia(card.image) && 'mt-8')}>
            {card.label}
          </p>
        )}
        {card.value && (
          <h3
            className={cn(
              'max-w-md text-3xl font-medium leading-tight text-ink sm:text-4xl',
              card.label ? 'mt-2' : 'mt-8',
            )}
          >
            {card.value}
          </h3>
        )}
        {card.text && <p className="mt-4 max-w-md leading-relaxed text-muted">{card.text}</p>}
        {card.link?.label && card.link.url && (
          <Link
            href={card.link.url}
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-ink px-5 py-3 font-semibold text-white transition-colors hover:bg-primary"
          >
            {card.link.label}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        )}
      </div>
    )
  }

  // Fact card
  return (
    <div className="flex w-full flex-col rounded-3xl bg-cream p-7 sm:min-h-[19rem] sm:p-9">
      {card.label && <p className="font-medium text-ink">{card.label}</p>}
      {card.value && (
        <p className="mt-auto pt-6 text-3xl font-medium sm:pt-10 leading-tight text-ink sm:text-4xl">
          {card.value}
        </p>
      )}
      {card.text && <p className="mt-4 leading-relaxed text-muted">{card.text}</p>}
    </div>
  )
}

export async function BentoBlock({ block }: { block: BlockOf<'bento'> }) {
  const slides = solutionSlides(block.slides ?? [], await getProducts()).filter((s) => asMedia(s.image))
  const cards = block.cards ?? []

  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="wrap">
        <SectionHeading heading={block.heading} intro={block.intro} />
        <div className={cn('grid gap-5', slides.length && cards.length && 'lg:grid-cols-2')}>
          {slides.length > 0 && (
            <Reveal className="h-full" y={40}>
              <SolutionsCarousel slides={slides} />
            </Reveal>
          )}
          {cards.length > 0 && (
            <Stagger className="grid gap-5 sm:grid-cols-2" delay={0.15} stagger={0.12}>
              {cards.map((card, i) => (
                <StaggerItem
                  key={card.id ?? i}
                  className={cn('flex', card.type === 'feature' && 'sm:col-span-2')}
                >
                  <BentoCard card={card} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </div>
    </section>
  )
}
