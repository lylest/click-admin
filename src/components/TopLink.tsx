'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

/**
 * A Link that, when it points to the page you are already on, scrolls back to
 * the very top instead of doing nothing. Used for "Home" and the logo: the
 * client expects them to take you to the start of the site from anywhere.
 */
export function TopLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e)
        if (typeof href === 'string' && href.split('#')[0] === pathname && !href.includes('#')) {
          e.preventDefault()
          const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
          if (window.location.hash) history.replaceState(null, '', pathname)
        }
      }}
      {...props}
    />
  )
}
