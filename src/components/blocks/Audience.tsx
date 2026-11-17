'use client'

import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'
import { useRef, useSyncExternalStore } from 'react'

import { Icon } from '../Icon'
import { Media } from '../Media'
import { asMedia, cn, type BlockOf } from '@/lib/utils'

/**
 * "Who we serve" (client reference, three screenshots):
 * 1. The section opens on a large, clear, full-width photo.
 * 2. While it is pinned, scrolling zooms the photo in, tints it teal, and the
 *    content (centred heading, intro, icon columns, button) fades in over it.
 * 3. Solid teal continues below.
 * Pinning and scroll effects are desktop only (lg). On phones the photo sits on
 * top and the content follows. Reduced motion shows the final state.
 */
const DESKTOP = '(min-width: 64rem)'
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(DESKTOP)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const useIsDesktop = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  )

export function CardsBlock({ block }: { block: BlockOf<'cards'> }) {
  const cards = block.cards ?? []
  const hasImage = !!asMedia(block.image)
  const cta = block.cta
  const reduce = useReducedMotion()
  const isDesktop = useIsDesktop()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Timeline (as on the reference site): clear photo → green rises from the
  // bottom while the photo zooms → content slides up from the bottom edge → hold.
  const scale = useTransform(p, [0, 0.7], [1, 1.15])
  const tint = useTransform(p, [0.1, 0.5], [0, 0.3])
  const riseY = useTransform(p, [0.06, 0.48], ['100%', '0%'])
  const contentY = useTransform(p, [0.3, 0.68], ['100svh', '0svh'])
  // Scroll effects only while pinned (desktop); phones and reduced motion get the static classes.
  const animate = hasImage && !reduce && isDesktop

  return (
    <section
      ref={ref}
      id={block.anchor ?? undefined}
      className={cn('relative bg-primary text-white', hasImage && 'lg:h-[230svh]')}
    >
      <div
        className={cn(
          'relative',
          hasImage && 'lg:sticky lg:top-18 lg:h-[calc(100svh-4.5rem)] lg:overflow-hidden',
        )}
      >
        {hasImage && (
          <div
            aria-hidden
            className="relative h-[22rem] overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)] sm:h-[30rem] lg:absolute lg:inset-0 lg:h-auto lg:[mask-image:none]"
          >
            <motion.div
              className="absolute inset-0 lg:will-change-transform"
              style={animate ? { scale } : undefined}
            >
              <Media resource={block.image} fill sizes="100vw" />
            </motion.div>
            {/* Even tint (phones: static) */}
            <motion.div
              className="absolute inset-0 bg-primary opacity-40 lg:opacity-30"
              style={animate ? { opacity: tint } : undefined}
            />
            {/* Desktop: green that rises from the bottom; solid at the bottom, see-through at the top */}
            <motion.div
              className="absolute inset-0 hidden bg-[linear-gradient(to_bottom,rgb(2_88_100/0)_0%,rgb(2_88_100/0.6)_28%,rgb(2_88_100/0.9)_52%,rgb(2_88_100)_74%)] lg:block"
              style={animate ? { y: riseY } : undefined}
            />
          </div>
        )}

        <motion.div
          className={cn(
            'wrap relative pb-20 text-center',
            hasImage
              ? '-mt-16 sm:-mt-24 lg:mt-0 lg:flex lg:h-full lg:flex-col lg:items-center lg:justify-center lg:pb-[12vh]'
              : 'pt-20 lg:py-28',
          )}
          style={animate ? { y: contentY } : undefined}
        >
          {block.heading && (
            <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl xl:text-6xl">
              {block.heading}
            </h2>
          )}
          {block.intro && (
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
              {block.intro}
            </p>
          )}

          {cards.length > 0 && (
            <ul
              className={cn(
                'mx-auto mt-12 grid max-w-6xl gap-10 text-left sm:grid-cols-2 lg:mt-16 lg:gap-0',
                cards.length >= 3 && 'lg:grid-cols-3',
                cards.length === 4 && 'xl:grid-cols-4',
              )}
            >
              {cards.map((card, i) => (
                <li
                  key={card.id ?? card.title}
                  className={cn('lg:px-10', i > 0 && 'lg:border-l lg:border-white/25')}
                >
                  {card.icon && <Icon name={card.icon} className="size-9 text-mint" />}
                  <h3 className={cn('text-xl font-semibold text-white', card.icon && 'mt-6')}>
                    {card.title}
                  </h3>
                  {card.text && <p className="mt-3 leading-relaxed text-white/70">{card.text}</p>}
                </li>
              ))}
            </ul>
          )}

          {cta?.label && cta.url && (
            <Link
              href={cta.url}
              className="mt-14 inline-flex items-center gap-4 rounded-lg bg-accent py-1.5 pl-6 pr-1.5 font-semibold text-ink transition-colors hover:bg-white lg:mt-16"
            >
              {cta.label}
              <span className="inline-flex size-10 items-center justify-center rounded-md bg-primary-strong text-white">
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  )
}
