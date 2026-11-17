'use client'

/**
 * Reusable scroll animations (Motion for React, https://motion.dev/docs).
 * Use these everywhere instead of ad-hoc motion code so timing stays consistent.
 *
 * - <MotionProvider>  wraps the site; honours the OS "reduce motion" setting.
 * - <Reveal>          fades + slides content up when it scrolls into view.
 * - <Stagger>/<StaggerItem>  reveals children one after another (grids, lists).
 * - <RevealImage>     photo reveal: the frame opens up while the image settles from a slight zoom,
 *                     then the photo drifts inside its frame while scrolling (parallax).
 * - <SplitHeading>    heading words rise into place one after another, with a slight tilt.
 * - <ScrollFillText>  large text whose words darken one by one as it scrolls through the view.
 * - <CountUp>         a number ("120+", "98%") that counts up when it comes into view.
 *
 * Entrance animations play once, the first time the element enters the viewport.
 * Scroll-linked ones (parallax, fill) follow the scroll position and never block it.
 * Inspired by the MindBlossom template the client shared (GSAP there, Motion here).
 */
import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from 'motion/react'
import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const

const tags = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  span: motion.span,
  figure: motion.figure,
  dl: motion.dl,
}
type Tag = keyof typeof tags

const viewport = (amount: number) => ({ once: true, amount, margin: '0px 0px -10% 0px' })

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: EASE }}>
      {children}
    </MotionConfig>
  )
}

export function Reveal({
  children,
  className,
  as = 'div',
  delay = 0,
  y = 28,
  amount = 0.2,
}: {
  children: ReactNode
  className?: string
  as?: Tag
  delay?: number
  y?: number
  amount?: number
}) {
  const Component = tags[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport(amount)}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Component>
  )
}

const staggerParent = (stagger: number, delayChildren: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
})

const staggerChild = (y: number): Variants => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
})

export function Stagger({
  children,
  className,
  as = 'div',
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
}: {
  children: ReactNode
  className?: string
  as?: Tag
  stagger?: number
  delay?: number
  amount?: number
}) {
  const Component = tags[as]
  return (
    <Component
      className={className}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport(amount)}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({
  children,
  className,
  as = 'div',
  y = 24,
}: {
  children: ReactNode
  className?: string
  as?: Tag
  y?: number
}) {
  const Component = tags[as]
  return (
    <Component className={className} variants={staggerChild(y)}>
      {children}
    </Component>
  )
}

/**
 * Wrap a positioned photo frame (it should have its own size and rounded corners).
 * The frame unclips from the centre while the photo scales from 1.12 to 1. After
 * that, the photo drifts slowly inside the frame as the page scrolls.
 */
export function RevealImage({
  children,
  className,
  delay = 0,
  amount = 0.25,
  radius = '1.5rem',
  parallax = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  amount?: number
  /** Corner radius of the reveal clip; '0' for photos with their own shaped edge. */
  radius?: string
  /** Photo drifts inside the frame while scrolling. */
  parallax?: boolean
}) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: `inset(8% 8% 8% 8% round ${radius})`, opacity: 0 }}
      whileInView={{ clipPath: `inset(0% 0% 0% 0% round ${radius})`, opacity: 1 }}
      viewport={viewport(amount)}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={viewport(amount)}
        transition={{ duration: 1.3, ease: EASE, delay }}
      >
        {parallax ? <Parallax>{children}</Parallax> : children}
      </motion.div>
    </motion.div>
  )
}

/**
 * The photo moves up slightly slower than the page while its frame crosses the
 * view (scaled up a little so its edges never show). Wrap the contents of a frame.
 */
export function Parallax({ children, distance = 6 }: { children: ReactNode; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${distance}%`, `${distance}%`])
  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <motion.div
        className="relative h-full w-full will-change-transform"
        style={reduce ? undefined : { y, scale: 1 + (distance * 2.4) / 100 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

const wordParent: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const wordChild: Variants = {
  hidden: { opacity: 0, y: '0.55em', rotate: 5 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.75, ease: EASE } },
}

/**
 * Heading text whose words rise into place one after another, each settling from a
 * slight tilt. Put it inside the heading element: <h2><SplitHeading text={...} /></h2>.
 * Line breaks (\n) are kept. Screen readers get the plain text.
 */
export function SplitHeading({ text, delay = 0 }: { text?: string | null; delay?: number }) {
  if (!text) return null
  const lines = text.split('\n')
  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        variants={wordParent}
        initial="hidden"
        whileInView="visible"
        viewport={viewport(0.4)}
        transition={{ delayChildren: delay }}
      >
        {lines.map((line, l) => (
          <Fragment key={l}>
            {l > 0 && <br />}
            {line
              .split(/\s+/)
              .filter(Boolean)
              .map((word, i) => (
                <Fragment key={i}>
                  {i > 0 && ' '}
                  <motion.span variants={wordChild} className="inline-block origin-bottom-left">
                    {word}
                  </motion.span>
                </Fragment>
              ))}
          </Fragment>
        ))}
      </motion.span>
    </>
  )
}

type FillPart = { text?: string | null; muted?: boolean }

function FillWord({
  word,
  progress,
  range,
  to,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
  to: number
}) {
  const opacity = useTransform(progress, range, [0.15, to])
  return <motion.span style={{ opacity }}>{word}</motion.span>
}

/**
 * Large text whose words go from faint to full, one by one, as the text scrolls
 * up through the view. Parts marked `muted` end at 40% (the grey lead-in).
 */
export function ScrollFillText({ parts }: { parts: FillPart[] }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.5'] })
  const words = parts.flatMap((p) =>
    (p.text ?? '')
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => ({ w, muted: !!p.muted })),
  )
  const plain = parts.map((p) => p.text ?? '').join(' ')
  if (reduce) {
    return (
      <>
        {parts.map((p, i) => (
          <span key={i} className={p.muted ? 'opacity-40' : undefined}>
            {p.text}{' '}
          </span>
        ))}
      </>
    )
  }
  return (
    <span ref={ref}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden>
        {words.map(({ w, muted }, i) => (
          <Fragment key={i}>
            <FillWord
              word={w}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              to={muted ? 0.4 : 1}
            />{' '}
          </Fragment>
        ))}
      </span>
    </span>
  )
}

/**
 * Counts a number up from 0 when it comes into view, keeping any text around it
 * ("120+", "98%", "TZS 2,000"). Values without a number are shown as they are.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const match = value.match(/^(\D*)([\d,.]+)(.*)$/)
  const target = match ? Number(match[2].replace(/,/g, '')) : NaN
  const decimals = match?.[2].split('.')[1]?.length ?? 0
  const [shown, setShown] = useState<number | null>(null)

  useEffect(() => {
    if (!inView || reduce || Number.isNaN(target)) return
    const controls = animate(0, target, { duration: 1.6, ease: EASE, onUpdate: setShown })
    return () => controls.stop()
  }, [inView, reduce, target])

  if (!match || Number.isNaN(target)) return <span>{value}</span>
  const format = (n: number) =>
    n.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: match[2].includes(','),
    })
  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="tabular-nums">
        {match[1]}
        {format(shown ?? (inView || reduce ? target : 0))}
        {match[3]}
      </span>
    </span>
  )
}
