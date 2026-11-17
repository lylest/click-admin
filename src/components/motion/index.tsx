'use client'

/**
 * Reusable scroll animations (Motion for React, https://motion.dev/docs).
 * Use these everywhere instead of ad-hoc motion code so timing stays consistent.
 *
 * - <MotionProvider>  wraps the site; honours the OS "reduce motion" setting.
 * - <Reveal>          fades + slides content up when it scrolls into view.
 * - <Stagger>/<StaggerItem>  reveals children one after another (grids, lists).
 * - <RevealImage>     photo reveal: the frame opens up while the image settles from a slight zoom.
 *
 * All animate once, the first time the element enters the viewport.
 */
import { MotionConfig, motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

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
 * The frame unclips from the centre while the photo scales from 1.12 to 1.
 */
export function RevealImage({
  children,
  className,
  delay = 0,
  amount = 0.25,
  radius = '1.5rem',
}: {
  children: ReactNode
  className?: string
  delay?: number
  amount?: number
  /** Corner radius of the reveal clip; '0' for photos with their own shaped edge. */
  radius?: string
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
        {children}
      </motion.div>
    </motion.div>
  )
}
