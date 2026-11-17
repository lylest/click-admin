'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'

import { Media } from '../Media'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '../ui/carousel'
import type { BlockOf } from '@/lib/utils'

type Slide = NonNullable<BlockOf<'bento'>['slides']>[number]

const DELAY = 6000

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'
const subscribeReducedMotion = (cb: () => void) => {
  const mq = window.matchMedia(reducedMotionQuery)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  )

/**
 * Large photo card that cycles through slides. Progress bars show the time left on
 * the current slide and jump to a slide when clicked. Pauses on hover/focus and
 * does not auto-advance when the visitor prefers reduced motion.
 */
export function SolutionsCarousel({ slides }: { slides: Slide[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)
  const [paused, setPaused] = useState(false)
  // Bumped on every slide change or resume, restarting both the timer and the bar animation.
  const [cycle, setCycle] = useState(0)
  const reducedMotion = useReducedMotion()
  const autoplay = slides.length > 1 && !reducedMotion

  useEffect(() => {
    if (!api) return
    const onSelect = () => {
      setSelected(api.selectedScrollSnap())
      setCycle((c) => c + 1)
    }
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  useEffect(() => {
    if (!api || !autoplay || paused) return
    const timer = setTimeout(() => api.scrollNext(), DELAY)
    return () => clearTimeout(timer)
  }, [api, autoplay, paused, cycle])

  const pause = useCallback(() => setPaused(true), [])
  const resume = useCallback(() => {
    setPaused(false)
    setCycle((c) => c + 1)
  }, [])

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: slides.length > 1 }}
      className="h-full min-h-[30rem] overflow-hidden rounded-3xl bg-night sm:min-h-[34rem] lg:min-h-[40rem]"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <CarouselContent className="h-full">
        {slides.map((slide, i) => (
          <CarouselItem
            key={slide.id ?? i}
            className="relative h-full min-h-[30rem] sm:min-h-[34rem] lg:min-h-[40rem]"
          >
            <div className="absolute inset-0 left-4">
              <Media
                resource={slide.image}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
              {/* Scrim so white text stays readable on any photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/0 sm:from-black/80 sm:via-black/25" />
            </div>
            <div className="absolute inset-x-0 bottom-0 left-4 p-7 pb-20 sm:p-10 sm:pb-24">
              <h3 className="text-3xl font-semibold text-white sm:text-4xl">{slide.title}</h3>
              {slide.text && (
                <p className="mt-3 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
                  {slide.text}
                </p>
              )}
              {slide.link?.label && slide.link.url && (
                <Link
                  href={slide.link.url}
                  tabIndex={i === selected ? 0 : -1}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-ink transition-colors hover:bg-tint-strong"
                >
                  {slide.link.label}
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {slides.length > 1 && (
        <div className="absolute inset-x-7 bottom-8 flex gap-3 sm:inset-x-10 sm:bottom-10">
          {slides.map((slide, i) => (
            <button
              key={slide.id ?? i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Show ${slide.title}`}
              aria-current={i === selected}
              className="group h-6 flex-1 cursor-pointer"
            >
              <span className="block h-1.5 overflow-hidden rounded-full bg-white/30 transition-colors group-hover:bg-white/50">
                {i === selected && (
                  <span
                    key={cycle}
                    className={
                      autoplay && !paused
                        ? 'block h-full origin-left animate-[slide-progress_6s_linear_forwards] rounded-full bg-accent'
                        : 'block h-full rounded-full bg-accent'
                    }
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </Carousel>
  )
}
