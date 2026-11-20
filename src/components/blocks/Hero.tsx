import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { CmsButton } from '../Button'
import { Media } from '../Media'
import { asMedia, cn, type BlockOf } from '@/lib/utils'

/**
 * Layout follows the client's reference: two large, slightly tilted photos with a
 * quote card overlapping both. No doodles, badges or floating labels (see CLAUDE.md).
 */
function PhotoCollage({ block }: { block: BlockOf<'hero'> }) {
  const hasSecondary = !!asMedia(block.secondaryImage)
  const inset = block.inset
  const tags = block.tags ?? []

  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      <div className="relative aspect-[8/7]">
        {/* Main photo: back, right, tilted clockwise */}
        <div
          className={cn(
            'absolute overflow-hidden rounded-[1.75rem] bg-tint shadow-xl shadow-ink/10',
            hasSecondary
              ? 'right-[2%] top-0 h-[80%] w-[50%] rotate-[4deg]'
              : 'inset-x-[6%] top-0 bottom-[10%] rotate-2',
          )}
        >
          <Media resource={block.image} fill priority sizes="(min-width: 1024px) 26vw, 50vw" />
          {tags.length > 0 && (
            <ul className="absolute left-3 top-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag.id ?? tag.label}
                  className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-ink"
                >
                  {tag.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Second photo: front, left, lower, tilted anticlockwise */}
        {hasSecondary && (
          <div className="absolute left-0 top-[19%] h-[81%] w-[53%] -rotate-[5deg] overflow-hidden rounded-[1.75rem] bg-tint shadow-2xl shadow-ink/15">
            <Media resource={block.secondaryImage} fill sizes="(min-width: 1024px) 28vw, 53vw" />
          </div>
        )}
      </div>

      {/* Quote card: below the photos on phones (so it never covers faces), overlapping both from sm up */}
      {(inset?.title || asMedia(inset?.image)) && (
        <figure className="relative z-10 -mt-10 ml-auto w-[82%] rotate-[2deg] overflow-hidden rounded-[1.25rem] bg-tint-strong p-6 shadow-xl shadow-ink/10 sm:absolute sm:bottom-[3%] sm:left-[37%] sm:mt-0 sm:w-[44%] sm:p-7">
          {asMedia(inset?.image) && (
            <div className="relative -mx-2 -mt-2 mb-4 aspect-[16/9] overflow-hidden rounded-xl sm:-mx-4 sm:-mt-4">
              <Media resource={inset?.image} fill sizes="(min-width: 1024px) 20vw, 44vw" />
            </div>
          )}
          {inset?.title && (
            <blockquote className="relative pt-5 sm:pt-6">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-1 -top-4 font-serif text-[6rem] leading-none text-primary/20 sm:-top-6 sm:text-[7rem]"
              >
                &ldquo;
              </span>
              <p className="relative text-lg font-medium leading-snug text-ink sm:text-xl xl:text-2xl">
                &ldquo;{inset.title}&rdquo;
              </p>
            </blockquote>
          )}
          {inset?.text && (
            <figcaption className="mt-4 text-xs font-medium text-ink/70 sm:mt-8 sm:text-sm">
              {inset.text}
            </figcaption>
          )}
        </figure>
      )}
    </div>
  )
}

export function HeroBlock({ block }: { block: BlockOf<'hero'> }) {
  const hasPhotos = !!asMedia(block.image)
  const hasStat = !!block.stat?.value
  const highlights = block.highlights ?? []
  const primary = block.primaryCta

  return (
    <section className="bg-cream">
      {/* Mobile: text, photos, points. Desktop: photos left over both rows; text and points right. */}
      <div
        className={cn(
          'wrap grid gap-12 pb-16 pt-12 lg:gap-x-16 lg:gap-y-14 lg:pb-28 lg:pt-20 xl:gap-x-28',
          hasPhotos && 'lg:grid-cols-2 lg:grid-rows-[auto_auto]',
        )}
      >
        <div className={cn(hasPhotos && 'lg:col-start-2 lg:row-start-1 lg:self-end')}>
          {block.eyebrow && (
            <p className="mb-4 text-sm font-semibold text-primary">{block.eyebrow}</p>
          )}
          <h1 className="text-[2.6rem] font-semibold leading-[1.06] tracking-tight text-ink motion-safe:animate-rise sm:text-6xl xl:text-[4.25rem]">
            {block.heading}
          </h1>
          {block.subheading && (
            <p
              className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70 motion-safe:animate-rise xl:text-xl"
              style={{ animationDelay: '120ms' }}
            >
              {block.subheading}
            </p>
          )}

          <div
            className="mt-9 flex flex-wrap items-center gap-3 motion-safe:animate-rise"
            style={{ animationDelay: '240ms' }}
          >
            {primary?.label && primary.url && (
              <Link
                href={primary.url}
                className="inline-flex items-center gap-4 rounded-lg bg-ink py-1.5 pl-5 pr-1.5 font-semibold text-white transition-colors hover:bg-primary"
              >
                {primary.label}
                <span className="inline-flex size-9 items-center justify-center rounded-md bg-accent text-ink">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </Link>
            )}
            <CmsButton link={block.secondaryCta} size="lg" variant="outline" />
          </div>
        </div>

        {hasPhotos && (
          <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
            <PhotoCollage block={block} />
          </div>
        )}

        {(hasStat || highlights.length > 0) && (
          <div
            className={cn(
              'grid gap-8 motion-safe:animate-rise sm:grid-cols-2 sm:gap-10',
              hasPhotos && 'lg:col-start-2 lg:row-start-2 lg:self-start',
            )}
            style={{ animationDelay: '360ms' }}
          >
            {hasStat && (
              <div>
                <p className="text-4xl font-semibold text-ink">{block.stat?.value}</p>
                {block.stat?.label && <p className="mt-1 text-muted">{block.stat.label}</p>}
              </div>
            )}
            {highlights.map((h) => {
              const title = h.title && <h2 className="text-xl font-semibold text-ink">{h.title}</h2>
              return (
                <div key={h.id ?? h.text}>
                  {h.url && h.title ? (
                    <Link
                      href={h.url}
                      className="group inline-flex items-center gap-2 hover:text-primary"
                    >
                      {title}
                      <ArrowRight className="size-4 text-primary" aria-hidden />
                    </Link>
                  ) : (
                    title
                  )}
                  <p className={cn('leading-relaxed text-muted', h.title && 'mt-2')}>{h.text}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export function PageHeaderBlock({ block }: { block: BlockOf<'pageHeader'> }) {
  return (
    <section className="border-b border-line bg-cream">
      <div className="wrap py-16 lg:py-24">
        {block.eyebrow && <p className="text-sm font-semibold text-primary">{block.eyebrow}</p>}
        <h1
          className={cn(
            'max-w-3xl text-4xl text-ink motion-safe:animate-rise md:text-5xl lg:text-6xl',
            block.eyebrow && 'mt-3',
          )}
        >
          {block.heading}
        </h1>
        {block.subheading && (
          <p
            className="mt-5 max-w-2xl text-lg text-muted motion-safe:animate-rise lg:text-xl"
            style={{ animationDelay: '120ms' }}
          >
            {block.subheading}
          </p>
        )}
      </div>
    </section>
  )
}
