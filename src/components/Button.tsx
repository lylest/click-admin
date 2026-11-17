import Link from 'next/link'
import type { ReactNode } from 'react'

import { cn, isExternal } from '@/lib/utils'

type Variant = 'primary' | 'outline' | 'light' | 'ghost-light'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-white hover:bg-primary',
  outline: 'border border-line bg-white text-ink hover:border-ink',
  light: 'bg-white text-ink hover:bg-tint-strong',
  'ghost-light': 'border border-white/25 text-white hover:bg-white/10',
}

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
}: {
  href?: string | null
  children: ReactNode
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  if (!href) return null
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors',
    size === 'sm' && 'px-4 py-2 text-sm',
    size === 'md' && 'px-5 py-2.5',
    size === 'lg' && 'px-6 py-3.5',
    variants[variant],
    className,
  )
  return isExternal(href) ? (
    <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

/** Render a CMS link group ({ label, url }) as a button, or nothing if incomplete. */
export function CmsButton({
  link,
  ...rest
}: { link?: { label?: string | null; url?: string | null } | null } & Omit<
  Parameters<typeof Button>[0],
  'href' | 'children'
>) {
  if (!link?.label || !link.url) return null
  return (
    <Button href={link.url} {...rest}>
      {link.label}
    </Button>
  )
}
