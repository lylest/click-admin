import { ArrowRight, ArrowUpRight, Quote } from 'lucide-react'
import Link from 'next/link'

import { CmsButton } from '../Button'
import { Icon } from '../Icon'
import { Media } from '../Media'
import { RichText } from '../RichText'
import { Eyebrow, SectionHeading } from '../SectionHeading'
import { getProducts, getSiteText } from '@/lib/payload'
import type { Product } from '@/payload-types'
import {
  CountUp,
  Parallax,
  Reveal,
  RevealImage,
  SplitHeading,
  Stagger,
  StaggerItem,
} from '../motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { asMedia, cn, isPlaceholder, type BlockOf } from '@/lib/utils'

export async function LogosBlock({ block }: { block: BlockOf<'logos'> }) {
  if (!block.logos?.length) return null
  return (
    <section className="border-y border-line bg-white">
      <div className="wrap flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:gap-12">
        {block.heading && (
          <p className="shrink-0 text-sm font-semibold uppercase tracking-widest text-muted">
            {block.heading}
          </p>
        )}
        <ul className="flex flex-1 flex-wrap items-center gap-x-12 gap-y-6">
          {block.logos.map((logo) => {
            const content = asMedia(logo.image) ? (
              <Media
                resource={logo.image}
                sizes="160px"
                className="h-9 w-auto"
              />
            ) : (
              <span className="text-lg font-bold text-muted/70">{logo.name}</span>
            )
            return (
              <li key={logo.id ?? logo.name}>
                {logo.url ? (
                  <a
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={logo.name}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function ContentBlock({ block }: { block: BlockOf<'content'> }) {
  const hasImage = !!asMedia(block.image)
  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className={cn('wrap grid items-center gap-12 lg:gap-20', hasImage && 'lg:grid-cols-2')}>
        {hasImage && (
          <div className={cn(block.imageOnLeft ? 'lg:order-first' : 'lg:order-last')}>
            <Media resource={block.image} className="w-full rounded-3xl object-cover" />
          </div>
        )}
        <div className={cn(!hasImage && 'grid gap-8 lg:grid-cols-12')}>
          <div className={cn(!hasImage && 'lg:col-span-5')}>
            <Eyebrow>{block.eyebrow}</Eyebrow>
            {block.heading && (
              <h2 className="mt-2 text-3xl text-ink md:text-4xl lg:text-5xl">
                <SplitHeading text={block.heading} />
              </h2>
            )}
          </div>
          <div className={cn(!hasImage ? 'lg:col-span-7' : 'mt-6')}>
            <RichText data={block.body} />
            <div className="mt-8">
              <CmsButton link={block.cta} variant="outline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function ProductCardsBlock({ block }: { block: BlockOf<'productCards'> }) {
  const selected = (block.products ?? []).filter((p): p is Product => typeof p === 'object')
  const products = selected.length ? selected : await getProducts()
  return (
    <section id={block.anchor ?? undefined} className="section bg-tint">
      <div className="wrap">
        <SectionHeading heading={block.heading} intro={block.intro} />
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/solutions/${product.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
            >
              {asMedia(product.heroImage) ? (
                <div className="relative aspect-[16/9]">
                  <Media resource={product.heroImage} fill sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
              ) : (
                <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-primary to-night">
                  <Icon name={product.icon} className="size-20 text-white/90" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-8">
                {product.tagline && (
                  <p className="text-sm font-semibold text-primary">{product.tagline}</p>
                )}
                <h3 className="mt-1 text-2xl text-ink">{product.name}</h3>
                <p className="mt-3 flex-1 text-muted">{product.shortDescription}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-ink">
                  Learn more
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Numbered steps: heading and intro on the left, a list of large numbers,
 * titles and text separated by thin rules on the right. No icon boxes.
 */
export function StepsBlock({ block }: { block: BlockOf<'steps'> }) {
  const steps = block.steps ?? []
  if (!steps.length) return null
  return (
    <section id={block.anchor ?? undefined} className="section bg-cream">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-32">
            {block.heading && (
              <h2 className="text-3xl font-semibold leading-tight text-ink md:text-4xl xl:text-5xl">
                <SplitHeading text={block.heading} />
              </h2>
            )}
            {block.intro && (
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{block.intro}</p>
            )}
          </div>
        </Reveal>
        <Stagger
          as="ol"
          className="border-t border-ink/15 lg:col-span-7 xl:col-start-6"
          stagger={0.1}
        >
          {steps.map((step, i) => (
            <StaggerItem
              as="li"
              key={step.id ?? step.title}
              className="grid gap-x-8 gap-y-2 border-b border-ink/15 py-8 sm:grid-cols-[6rem_1fr] lg:py-10"
            >
              <span className="text-4xl font-semibold leading-none tracking-tight text-primary lg:text-5xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-2xl font-semibold text-ink">{step.title}</h3>
                {step.text && (
                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">{step.text}</p>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/** A stat value in [brackets] is a placeholder from the defaults: never show it live. */
const isRealStat = (value?: string | null) => !!value && !/\[.*\]/.test(value)

/** Torn-paper edge for the stats photo (client reference). Jagged top and bottom, straight sides. */
const TORN_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000' preserveAspectRatio='none'><path d='M0 67 L14 63 L29 71 L43 60 L57 67 L71 63 L86 57 L100 64 L114 55 L129 61 L143 54 L157 53 L171 58 L186 65 L200 51 L214 52 L229 59 L243 63 L257 56 L271 52 L286 61 L300 44 L314 58 L329 46 L343 43 L357 42 L371 44 L386 53 L400 40 L414 47 L429 47 L443 41 L457 43 L471 34 L486 33 L500 35 L514 42 L529 37 L543 34 L557 38 L571 35 L586 31 L600 39 L614 37 L629 28 L643 33 L657 31 L671 36 L686 33 L700 24 L714 36 L729 19 L743 24 L757 29 L771 17 L786 23 L800 14 L814 24 L829 25 L843 21 L857 25 L871 14 L886 20 L900 18 L914 17 L929 13 L943 20 L957 21 L971 11 L986 14 L1000 2 L1000 948 L986 953 L971 953 L957 952 L943 950 L929 959 L914 964 L900 949 L886 956 L871 952 L857 953 L843 951 L829 952 L814 958 L800 955 L786 956 L771 954 L757 954 L743 965 L729 956 L714 962 L700 962 L686 970 L671 972 L657 970 L643 973 L629 958 L614 970 L600 969 L586 968 L571 971 L557 976 L543 970 L529 967 L514 968 L500 961 L486 966 L471 972 L457 971 L443 967 L429 967 L414 967 L400 967 L386 982 L371 981 L357 972 L343 973 L329 971 L314 982 L300 982 L286 983 L271 978 L257 976 L243 970 L229 985 L214 977 L200 974 L186 973 L171 985 L157 972 L143 974 L129 975 L114 981 L100 973 L86 985 L71 981 L57 979 L43 990 L29 993 L14 987 L0 989 Z'/></svg>`,
)}")`

export function StatsBlock({ block }: { block: BlockOf<'stats'> }) {
  const stats = (block.stats ?? []).filter((s) => isRealStat(s.value))
  const hasImage = !!asMedia(block.image)

  const statList = stats.length > 0 && (
    <Stagger as="dl" className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
      {stats.map((stat) => (
        <StaggerItem
          key={stat.id ?? stat.label}
          className="flex flex-col-reverse justify-end border-l-2 border-accent pl-5 lg:pl-6"
        >
          <dt className="mt-2 font-medium text-muted">{stat.label}</dt>
          <dd className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl xl:text-5xl">
            <CountUp value={stat.value} />
          </dd>
        </StaggerItem>
      ))}
    </Stagger>
  )

  if (!hasImage) {
    if (!stats.length) return null
    return (
      <section id={block.anchor ?? undefined} className="section">
        <div className="wrap">
          <SectionHeading heading={block.heading} intro={block.intro} />
          {statList}
        </div>
      </section>
    )
  }

  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <RevealImage radius="0" parallax={false} className="relative aspect-[5/4] w-full">
          <div
            className="absolute inset-0"
            style={{
              maskImage: TORN_MASK,
              WebkitMaskImage: TORN_MASK,
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
            }}
          >
            <Parallax>
              <Media resource={block.image} fill sizes="(min-width: 1024px) 45vw, 100vw" />
            </Parallax>
          </div>
        </RevealImage>
        <Reveal>
          {block.heading && (
            <h2 className="text-3xl font-semibold leading-tight text-ink md:text-4xl xl:text-5xl">
              <SplitHeading text={block.heading} />
            </h2>
          )}
          {block.intro && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{block.intro}</p>
          )}
          {block.cta?.label && block.cta.url && (
            <Link
              href={block.cta.url}
              className="mt-8 inline-flex items-center gap-4 rounded-lg bg-ink py-1.5 pl-5 pr-1.5 font-semibold text-white transition-colors hover:bg-primary"
            >
              {block.cta.label}
              <span className="inline-flex size-9 items-center justify-center rounded-md bg-accent text-ink">
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </Link>
          )}
          {statList && <div className="mt-12">{statList}</div>}
        </Reveal>
      </div>
    </section>
  )
}

export function TestimonialsBlock({ block }: { block: BlockOf<'testimonials'> }) {
  // Placeholder quotes from the defaults ("[Quote ...]", "[Name]") are never shown live.
  const items = (block.items ?? []).filter((t) => !isPlaceholder(t.quote) && !isPlaceholder(t.name))
  if (!items.length) return null
  return (
    <section className="section">
      <div className="wrap">
        <SectionHeading heading={block.heading} />
        <Stagger as="ul" className="grid gap-6 lg:grid-cols-2">
          {items.map((t) => (
            <StaggerItem
              as="li"
              key={t.id ?? t.name}
              className="flex flex-col rounded-3xl border border-line p-8 lg:p-10"
            >
              <Quote className="size-8 text-primary/30" aria-hidden />
              <blockquote className="mt-4 flex-1 text-xl leading-relaxed text-ink">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                {asMedia(t.photo) ? (
                  <Media
                    resource={t.photo}
                    sizes="48px"
                    className="size-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-tint-strong font-bold text-primary">
                    {t.name.replace(/[^A-Za-z]/g, '').charAt(0) || '•'}
                  </span>
                )}
                <span>
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="block text-sm text-muted">
                    {[t.role, t.organization].filter(Boolean).join(', ')}
                  </span>
                </span>
              </figcaption>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

export function CtaBlock({ block }: { block: BlockOf<'cta'> }) {
  return (
    <section className="section pt-0 lg:pt-0">
      <div className="wrap">
        <Reveal className="grid gap-8 rounded-2xl bg-primary px-8 py-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16 lg:px-14 lg:py-16">
          <div>
            <h2 className="max-w-2xl text-3xl text-white md:text-4xl lg:text-5xl">
              <SplitHeading text={block.heading} />
            </h2>
            {block.text && <p className="mt-4 max-w-xl text-lg text-white/75">{block.text}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            <CmsButton link={block.primaryCta} variant="light" size="lg" />
            <CmsButton link={block.secondaryCta} variant="ghost-light" size="lg" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export async function FaqBlock({ block }: { block: BlockOf<'faq'> }) {
  const t = await getSiteText()
  return (
    <FaqList
      heading={block.heading || t.general.faqHeading}
      intro={block.intro}
      cta={block.cta}
      items={block.items ?? []}
    />
  )
}

/**
 * Heading, intro and button on the left; questions in a card on the right
 * (shadcn Accordion, one open at a time, first open). Used on the home page and
 * on each product page. Placeholder answers in [brackets] are never shown.
 */
export function FaqList({
  heading,
  intro,
  cta,
  items,
}: {
  heading?: string | null
  intro?: string | null
  cta?: { label?: string | null; url?: string | null } | null
  items: { id?: string | null; question: string; answer: string }[]
}) {
  const real = items.filter((item) => !/\[.*\]/.test(item.answer))
  if (!real.length) return null
  const valueOf = (item: (typeof real)[number], i: number) => item.id ?? String(i)

  return (
    <section className="section bg-cream">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5 xl:col-span-4">
          <h2 className="text-3xl font-semibold leading-tight text-ink md:text-4xl xl:text-5xl">
            <SplitHeading text={heading ?? 'Frequently asked questions'} />
          </h2>
          {intro && <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{intro}</p>}
          {cta?.label && cta.url && (
            <Link href={cta.url} className="group mt-9 inline-flex items-stretch gap-1.5">
              <span className="inline-flex size-12 items-center justify-center rounded-lg bg-primary text-white transition-colors group-hover:bg-primary-strong">
                <ArrowUpRight className="size-5" aria-hidden />
              </span>
              <span className="inline-flex items-center rounded-lg bg-primary px-7 font-semibold text-white transition-colors group-hover:bg-primary-strong">
                {cta.label}
              </span>
            </Link>
          )}
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-7 xl:col-span-7 xl:col-start-6">
          <Accordion
            type="single"
            collapsible
            defaultValue={valueOf(real[0], 0)}
            className="overflow-hidden rounded-2xl border border-line bg-white"
          >
            {real.map((item, i) => (
              <AccordionItem
                key={valueOf(item, i)}
                value={valueOf(item, i)}
                className="group border-b border-line bg-ink/[0.025] transition-colors duration-300 last:border-b-0 data-[state=open]:bg-white"
              >
                <AccordionTrigger
                  className="items-center gap-6 rounded-none px-6 py-6 text-lg font-normal text-ink hover:no-underline sm:px-8 sm:text-xl"
                  indicator={
                    <span className="relative inline-flex size-6 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink text-ink">
                      <span className="absolute h-[1.5px] w-2.5 bg-current" />
                      <span className="absolute h-2.5 w-[1.5px] bg-current transition-transform duration-300 group-data-[state=open]:scale-y-0" />
                    </span>
                  }
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl px-6 pb-7 text-base leading-relaxed text-muted sm:px-8">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
