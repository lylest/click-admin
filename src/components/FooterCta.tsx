'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * The big call to action at the top of the footer. Hidden on the contact page
 * (the form is already there); on a product page a /contact link preselects
 * that product in the form.
 */
export function FooterCta({
  heading,
  label,
  url,
}: {
  heading: string
  label?: string | null
  url?: string | null
}) {
  const pathname = usePathname()
  if (pathname === '/contact') return null

  const product = pathname.match(/^\/solutions\/([^/]+)/)?.[1]
  const href = url === '/contact' && product ? `/contact?product=${product}` : url

  return (
    <div className="wrap grid gap-10 py-20 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16 lg:py-28">
      <h2 className="max-w-5xl whitespace-pre-line text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
        {heading}
      </h2>
      {label && href && (
        <Link
          href={href}
          className="inline-flex w-fit items-center gap-4 rounded-lg bg-accent py-1.5 pl-5 pr-1.5 font-semibold text-ink transition-colors hover:bg-white lg:mb-2"
        >
          {label}
          <span className="inline-flex size-9 items-center justify-center rounded-md bg-white text-ink">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </Link>
      )}
    </div>
  )
}
