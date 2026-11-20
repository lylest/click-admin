'use client'

import { useMotionValueEvent, useScroll } from 'motion/react'
import { useCallback, useRef, useState, type CSSProperties } from 'react'

import { CmsButton } from '../Button'
import { Media } from '../Media'
import { Reveal, RevealImage, SplitHeading } from '../motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { asMedia, cn, type BlockOf } from '@/lib/utils'

/**
 * Backdrop behind the photo: an angular panel that changes colour and shape on
 * each step (requested by the client, after their reference). Light tints that
 * sit with the blue palette. Every shape has the same number of points so
 * clip-path can morph between them; the last three points form the speech tail.
 */
const BACKDROPS = [
  {
    color: '#d6e7f5',
    shape: 'polygon(4% 8%, 96% 0%, 100% 88%, 34% 92%, 28% 100%, 22% 92%, 0% 94%)',
  },
  {
    color: '#e3eef8',
    shape: 'polygon(0% 4%, 92% 8%, 98% 94%, 60% 90%, 54% 100%, 48% 90%, 6% 100%)',
  },
  {
    color: '#f3eadb',
    shape: 'polygon(6% 0%, 100% 6%, 94% 96%, 78% 92%, 72% 100%, 66% 92%, 0% 88%)',
  },
  {
    color: '#dde9f0',
    shape: 'polygon(0% 10%, 98% 2%, 96% 100%, 40% 94%, 34% 100%, 28% 94%, 4% 90%)',
  },
  {
    color: '#e8eef6',
    shape: 'polygon(2% 2%, 94% 10%, 100% 90%, 70% 96%, 64% 100%, 58% 96%, 0% 98%)',
  },
]

/** Scroll distance per step while the section is pinned (in viewport heights). */
const STEP_VH = 70
const DESKTOP = '(min-width: 64rem)'

/**
 * Product spotlight: heading, then a feature list on a vertical rail (shadcn Tabs,
 * vertical). The selected feature shows its description and crossfades the photo.
 * Without any photos the list moves to the right-hand column.
 *
 * Scrollytelling on desktop: the section is STEP_VH tall per step and its content
 * is sticky, so scrolling advances through the steps before the page moves on.
 * Clicking a step scrolls to that step's position, keeping scroll and state in sync.
 * Pinning is CSS-only (lg:), so there is no layout shift on hydration; phones
 * keep the normal tap-to-switch behaviour.
 */
export function SpotlightBlock({ block }: { block: BlockOf<'spotlight'> }) {
  const features = block.features ?? []
  const valueOf = (f: (typeof features)[number], i: number) => f.id ?? String(i)
  const imageFor = (f: (typeof features)[number]) => (asMedia(f.image) ? f.image : block.image)
  const hasPhotos = !!asMedia(block.image) || features.some((f) => asMedia(f.image))
  const pinnable = features.length > 1
  // A flipped spotlight starts on a different panel colour so two in a row do not match.
  const colourOffset = block.imageOnLeft ? 2 : 0

  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  const isPinned = () =>
    pinnable && typeof window !== 'undefined' && window.matchMedia(DESKTOP).matches

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (!isPinned()) return
    setActive(Math.min(features.length - 1, Math.max(0, Math.floor(p * features.length))))
  })

  const selectStep = useCallback(
    (value: string) => {
      const i = features.findIndex((f, idx) => valueOf(f, idx) === value)
      if (i < 0) return
      const section = sectionRef.current
      if (!section || !isPinned()) {
        setActive(i)
        return
      }
      // Scroll to the middle of step i's slice of the pinned range.
      const top = section.getBoundingClientRect().top + window.scrollY
      const range = section.offsetHeight - window.innerHeight
      window.scrollTo({ top: top + ((i + 0.5) / features.length) * range, behavior: 'smooth' })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [features],
  )

  const header = (
    <>
      {block.heading && (
        <h2 className="text-3xl font-semibold leading-tight text-ink md:text-4xl xl:text-5xl">
          <SplitHeading text={block.heading} />
        </h2>
      )}
      {block.body && (
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{block.body}</p>
      )}
    </>
  )

  const list = features.length > 0 && (
    <TabsList
      aria-label={block.heading ?? 'Features'}
      className="h-auto w-full flex-col items-stretch rounded-none border-l-2 border-line bg-transparent p-0"
    >
      {features.map((f, i) => (
        <TabsTrigger
          key={valueOf(f, i)}
          value={valueOf(f, i)}
          className="group -ml-[2px] h-auto w-full cursor-pointer flex-col items-start justify-start whitespace-normal rounded-none border-0 border-l-2 border-transparent py-4 pl-6 pr-4 text-left shadow-none outline-none transition-colors duration-300 focus-visible:bg-tint focus-visible:outline-none focus-visible:ring-0 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <span className="text-lg font-medium text-ink/55 transition-colors duration-300 group-hover:text-ink group-data-[state=active]:text-ink">
            {f.title}
          </span>
          {f.text && (
            <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-data-[state=active]:grid-rows-[1fr]">
              <span className="overflow-hidden">
                <span className="block pt-2 text-base font-normal leading-relaxed text-muted">
                  {f.text}
                </span>
              </span>
            </span>
          )}
        </TabsTrigger>
      ))}
    </TabsList>
  )

  const cta = block.cta?.label && block.cta.url && (
    <div className="mt-10">
      <CmsButton link={block.cta} size="lg" />
    </div>
  )

  return (
    <section
      ref={sectionRef}
      id={block.anchor ?? undefined}
      className={cn('relative', pinnable && 'lg:h-[calc(var(--steps)*var(--step-vh)+100svh)]')}
      style={{ '--steps': features.length, '--step-vh': `${STEP_VH}svh` } as CSSProperties}
    >
      <div
        className={cn(
          'section',
          pinnable &&
            'lg:sticky lg:top-18 lg:flex lg:h-[calc(100svh-4.5rem)] lg:items-center lg:py-0',
        )}
      >
        <Tabs
          value={features[active] ? valueOf(features[active], active) : undefined}
          onValueChange={selectStep}
          orientation="vertical"
          className="wrap grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-24"
        >
          {hasPhotos ? (
            <>
              <Reveal className={cn('lg:col-span-5', block.imageOnLeft && 'lg:order-2')}>
                {header}
                {list && <div className="mt-10">{list}</div>}
                {cta}
              </Reveal>
              <RevealImage
                delay={0.1}
                parallax={false}
                className={cn(
                  'relative order-first aspect-[4/3] lg:order-none lg:col-span-7 lg:aspect-auto lg:h-[min(40rem,calc(100svh-10rem))]',
                  block.imageOnLeft && 'lg:order-1',
                )}
              >
                {/* Coloured backdrop: colour and shape change with the active step */}
                <div
                  aria-hidden
                  className="absolute inset-0 transition-[clip-path,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    backgroundColor: BACKDROPS[(active + colourOffset) % BACKDROPS.length].color,
                    clipPath: BACKDROPS[(active + colourOffset) % BACKDROPS.length].shape,
                  }}
                />
                {/* Photo, smaller than the backdrop, sitting low and to the right */}
                <div
                  className={cn(
                    'absolute bottom-[12%] top-[12%] overflow-hidden rounded-2xl bg-white shadow-2xl shadow-ink/15 lg:bottom-[14%] lg:top-[14%]',
                    // Photo sits towards the text side of the panel
                    block.imageOnLeft
                      ? 'left-[5%] right-[10%] sm:right-[14%]'
                      : 'left-[10%] right-[5%] sm:left-[14%]',
                  )}
                >
                  {features.length > 0 ? (
                    features.map((f, i) => (
                      <TabsContent
                        key={valueOf(f, i)}
                        value={valueOf(f, i)}
                        forceMount
                        className="absolute inset-0 transition-[opacity,transform] duration-700 ease-out data-[state=active]:scale-100 data-[state=active]:opacity-100 data-[state=inactive]:scale-[1.04] data-[state=inactive]:opacity-0"
                      >
                        <Media resource={imageFor(f)} fill sizes="(min-width: 1024px) 45vw, 90vw" />
                      </TabsContent>
                    ))
                  ) : (
                    <Media resource={block.image} fill sizes="(min-width: 1024px) 45vw, 90vw" />
                  )}
                </div>
              </RevealImage>
            </>
          ) : (
            <>
              <Reveal className="lg:col-span-5 lg:self-start">
                {header}
                {cta}
              </Reveal>
              <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.15}>
                {list}
              </Reveal>
            </>
          )}
        </Tabs>
      </div>
    </section>
  )
}
