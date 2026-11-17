import { ArrowRight, ArrowUpRight, Check, FileDown } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Button } from '@/components/Button'
import { Media } from '@/components/Media'
import { Reveal, RevealImage, Stagger, StaggerItem } from '@/components/motion'
import { RichText } from '@/components/RichText'
import { PostCard } from '@/components/blocks/News'
import { FaqList } from '@/components/blocks/Sections'
import { getPostsByCategory, getProduct, getSiteText } from '@/lib/payload'
import { fill, type SiteText } from '@/lib/siteText'
import { seoMetadata } from '@/lib/seo'
import { asMedia, cn, isPlaceholder } from '@/lib/utils'
import type { Product } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).slug)
  return product
    ? seoMetadata(product.seo, { title: product.name, description: product.shortDescription })
    : {}
}

/** Hero inside a large rounded panel (LearnBuddy reference): text left, big photo right. */
function ProductHero({
  product,
  contactUrl,
  t,
}: {
  product: Product
  contactUrl: string
  t: SiteText
}) {
  const brochure = asMedia(product.brochure)
  const hasPhoto = !!asMedia(product.heroImage)
  const hasSecond = !!asMedia(product.heroSecondaryImage)
  const hasJourneys = !!product.journeys?.length

  return (
    <section className="pt-4 lg:pt-6">
      <div className="wrap">
        <div
          className={cn(
            'grid items-center gap-12 overflow-hidden rounded-[2rem] bg-cream px-6 py-12 sm:px-10 lg:gap-16 lg:px-16 lg:py-20',
            hasPhoto && 'lg:grid-cols-2',
          )}
        >
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href="/#solutions" className="hover:text-ink">
                {t.product.breadcrumb}
              </Link>
              <span aria-hidden className="mx-2">
                /
              </span>
              <span className="text-ink">{product.name}</span>
            </nav>
            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.06] tracking-tight text-ink sm:text-6xl xl:text-7xl">
              {product.tagline || product.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70 xl:text-xl">
              {product.shortDescription}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={contactUrl}
                className="inline-flex items-center gap-4 rounded-lg bg-ink py-1.5 pl-5 pr-1.5 font-semibold text-white transition-colors hover:bg-primary"
              >
                {product.ctaLabel ?? 'Request a quote'}
                <span className="inline-flex size-9 items-center justify-center rounded-md bg-accent text-ink">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </Link>
              {hasJourneys && (
                <Button href="#how-it-works" size="lg" variant="outline">
                  {t.product.howItWorksButton}
                </Button>
              )}
              {brochure?.url && (
                <Button href={brochure.url} size="lg" variant="outline">
                  <FileDown className="size-4" aria-hidden /> {t.product.brochure}
                </Button>
              )}
            </div>
          </div>

          {hasPhoto && (
            <div className={cn('relative', hasSecond && 'pb-10 pl-10 sm:pb-14 sm:pl-14')}>
              <div className="relative aspect-[4/3.4] overflow-hidden rounded-3xl bg-tint shadow-xl shadow-ink/10">
                <Media
                  resource={product.heroImage}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
              {hasSecond && (
                <div className="absolute bottom-0 left-0 aspect-square w-[38%] overflow-hidden rounded-2xl border-[6px] border-cream bg-white shadow-xl shadow-ink/15">
                  <Media
                    resource={product.heroSecondaryImage}
                    fill
                    sizes="(min-width: 1024px) 18vw, 38vw"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/** Features as photo cards (LearnBuddy "Built for how you actually study"); 3 + 2 on desktop. */
function Features({ product, t }: { product: Product; t: SiteText }) {
  const features = product.features ?? []
  if (!features.length) return null
  const fiveUp = features.length === 5

  return (
    <section className="section">
      <div className="wrap">
        <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="text-3xl font-semibold leading-tight text-ink md:text-4xl xl:text-5xl">
              {fill(t.product.whatItDoes, { name: product.name })}
            </h2>
          </Reveal>
          {product.overview && (
            <Reveal delay={0.1} className="lg:col-span-7">
              <RichText data={product.overview} className="text-lg" />
            </Reveal>
          )}
        </div>
        <Stagger
          as="ul"
          className={cn('grid gap-5 sm:grid-cols-2', fiveUp ? 'lg:grid-cols-6' : 'lg:grid-cols-3')}
          stagger={0.08}
        >
          {features.map((f, i) => (
            <StaggerItem
              as="li"
              key={f.id ?? f.title}
              className={cn(
                'flex flex-col rounded-3xl bg-cream p-2.5',
                fiveUp && (i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'),
                fiveUp && i === 4 && 'sm:col-span-2 lg:col-span-3',
              )}
            >
              {asMedia(f.image) && (
                <div
                  className={cn(
                    'relative overflow-hidden rounded-2xl bg-tint',
                    fiveUp && i >= 3 ? 'aspect-[16/9]' : 'aspect-[4/3]',
                  )}
                >
                  <Media
                    resource={f.image}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              )}
              <div className="px-4 pb-5 pt-6 sm:px-5">
                <h3 className="text-xl font-semibold text-ink">{f.title}</h3>
                {f.text && <p className="mt-2 leading-relaxed text-muted">{f.text}</p>}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/** Big photo with a white card of numbered steps on top (LearnBuddy "Everything you need in one place"). */
function Journeys({ product, t }: { product: Product; t: SiteText }) {
  const journeys = product.journeys ?? []
  if (!journeys.length) return null

  return (
    <section id="how-it-works" className="section scroll-mt-24 pt-0 lg:pt-0">
      <div className="wrap space-y-6 lg:space-y-8">
        <Reveal>
          <h2 className="mb-6 text-3xl font-semibold leading-tight text-ink md:text-4xl lg:mb-10 xl:text-5xl">
            {t.product.howItWorks}
          </h2>
        </Reveal>
        {journeys.map((j) => {
          const steps = j.steps ?? []
          return (
            <div
              key={j.id ?? j.title}
              className="relative overflow-hidden rounded-[2rem] bg-tint lg:min-h-[40rem]"
            >
              {asMedia(j.image) && (
                <RevealImage
                  radius="0"
                  className="relative aspect-[16/10] w-full sm:aspect-[16/8] lg:absolute lg:inset-0 lg:aspect-auto"
                >
                  <Media resource={j.image} fill sizes="(min-width: 1600px) 1500px, 100vw" />
                </RevealImage>
              )}
              <div
                className={cn(
                  'relative p-3 sm:p-5 lg:absolute lg:inset-y-0 lg:flex lg:items-center lg:p-10',
                  j.cardOnRight ? 'lg:right-0' : 'lg:left-0',
                )}
              >
                <Reveal
                  delay={0.2}
                  className="rounded-3xl bg-white p-7 shadow-xl shadow-ink/10 sm:p-9 lg:w-[30rem] xl:w-[34rem]"
                >
                  <h3 className="text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                    {j.title}
                  </h3>
                  {j.intro && <p className="mt-3 leading-relaxed text-muted">{j.intro}</p>}
                  {steps.length > 0 && (
                    <ol className="mt-8 space-y-5">
                      {steps.map((s, i) => (
                        <li key={s.id ?? s.title} className="flex gap-4">
                          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-tint-strong text-sm font-semibold text-primary">
                            {i + 1}
                          </span>
                          <span>
                            <span className="block font-semibold text-ink">{s.title}</span>
                            {s.text && (
                              <span className="mt-0.5 block text-sm leading-relaxed text-muted">
                                {s.text}
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                </Reveal>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function SpecsAndUseCases({ product, t }: { product: Product; t: SiteText }) {
  const specs = (product.specs ?? []).filter((s) => !isPlaceholder(s.value))
  const useCases = product.useCases ?? []
  if (!specs.length && !useCases.length) return null

  return (
    <section className="section bg-cream">
      <div className="wrap grid gap-16 lg:grid-cols-2">
        {specs.length > 0 && (
          <Reveal>
            <h2 className="text-3xl font-semibold text-ink md:text-4xl">
              {t.product.specifications}
            </h2>
            <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {specs.map((s) => (
                <div key={s.id ?? s.label} className="grid grid-cols-5 gap-4 py-4">
                  <dt className="col-span-2 font-semibold text-ink">{s.label}</dt>
                  <dd className="col-span-3 text-muted">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
        {useCases.length > 0 && (
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-semibold text-ink md:text-4xl">{t.product.whoItsFor}</h2>
            <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {useCases.map((u) => (
                <li key={u.id ?? u.text} className="flex items-center gap-3 py-4 text-lg text-ink">
                  <Check className="size-5 shrink-0 text-primary" aria-hidden />
                  {u.text}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  )
}

async function ProductNews({ product, t }: { product: Product; t: SiteText }) {
  if (!product.newsCategory) return null
  const posts = await getPostsByCategory(product.newsCategory, 3)
  if (!posts.length) return null

  return (
    <section className="section">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-tight text-ink md:text-4xl xl:text-5xl">
              {fill(t.product.news, { name: product.name })}
            </h2>
          </Reveal>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-semibold text-ink hover:text-primary"
          >
            {t.news.allNews} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

export default async function SolutionPage({ params }: Props) {
  const [product, t] = await Promise.all([getProduct((await params).slug), getSiteText()])
  if (!product) notFound()

  const contactUrl = `/contact?product=${product.slug}`
  const gallery = (product.gallery ?? []).filter((m) => asMedia(m))

  return (
    <>
      <ProductHero product={product} contactUrl={contactUrl} t={t} />
      <Features product={product} t={t} />
      <Journeys product={product} t={t} />
      <SpecsAndUseCases product={product} t={t} />

      {gallery.length > 0 && (
        <section className="section">
          <div className="wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((m, i) => (
              <Media
                key={i}
                resource={m}
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </section>
      )}

      <ProductNews product={product} t={t} />
      <FaqList heading={fill(t.product.faq, { name: product.name })} items={product.faqs ?? []} />
    </>
  )
}
