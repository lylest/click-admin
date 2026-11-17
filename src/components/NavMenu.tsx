'use client'

import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import type { Header } from '@/payload-types'
import { cn } from '@/lib/utils'

type Item = NonNullable<Header['items']>[number]

export function NavMenu({ items, cta }: { items: Item[]; cta?: Header['ctaButton'] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (url?: string | null) =>
    !!url && !url.includes('#') && (url === '/' ? pathname === '/' : pathname.startsWith(url))

  return (
    <>
      {/* Desktop */}
      <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
        {items.map((item) =>
          item.children?.length ? (
            <div key={item.id ?? item.label} className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-muted transition-colors hover:text-ink group-focus-within:text-ink"
              >
                {item.label}
                <ChevronDown
                  className="size-4 transition-transform group-hover:rotate-180"
                  aria-hidden
                />
              </button>
              <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="rounded-2xl border border-line bg-white p-2 shadow-xl shadow-ink/5">
                  {item.children.map((child) => (
                    <Link
                      key={child.id ?? child.url}
                      href={child.url}
                      className="block rounded-xl px-4 py-3 transition-colors hover:bg-tint"
                    >
                      <span className="block font-semibold text-ink">{child.label}</span>
                      {child.description && (
                        <span className="mt-0.5 block text-sm text-muted">{child.description}</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={item.id ?? item.label}
              href={item.url ?? '/'}
              className={cn(
                'rounded-lg px-3 py-2 font-medium transition-colors hover:text-ink',
                isActive(item.url) ? 'text-ink' : 'text-muted',
              )}
            >
              {item.label}
            </Link>
          ),
        )}
      </nav>

      <div className="flex items-center gap-2">
        {cta?.label && cta.url && (
          <Link
            href={cta.url}
            className="hidden rounded-lg bg-ink px-5 py-2.5 font-semibold text-white transition-colors hover:bg-primary sm:inline-flex"
          >
            {cta.label}
          </Link>
        )}
        <button
          type="button"
          className="rounded-lg p-2 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-line bg-white lg:hidden"
        >
          <ul className="wrap flex flex-col py-4">
            {items.map((item) => (
              <li key={item.id ?? item.label}>
                {item.url ? (
                  <Link
                    href={item.url}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-lg font-medium text-ink"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <p className="pt-3 text-sm font-semibold uppercase tracking-widest text-muted">
                    {item.label}
                  </p>
                )}
                {item.children?.map((child) => (
                  <Link
                    key={child.id ?? child.url}
                    href={child.url}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 pl-4 text-lg font-medium text-ink"
                  >
                    {child.label}
                  </Link>
                ))}
              </li>
            ))}
            {cta?.label && cta.url && (
              <li className="pt-4">
                <Link
                  href={cta.url}
                  onClick={() => setOpen(false)}
                  className="flex justify-center rounded-lg bg-ink px-5 py-3 font-semibold text-white"
                >
                  {cta.label}
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  )
}
