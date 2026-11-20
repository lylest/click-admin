import Link from 'next/link'

import { getHeader, getSettings } from '@/lib/payload'
import { Logo } from './Logo'
import { NavMenu } from './NavMenu'
import { TopLink } from './TopLink'

// Sign-in page of the Click Meter portal, for landlords and staff who already
// have an account. PORTAL_URL overrides it if the portal ever moves.
const PORTAL_URL = process.env.PORTAL_URL || 'https://app.clickgroup.co.tz/login'

export async function Header() {
  const [header, settings] = await Promise.all([getHeader(), getSettings()])
  const bar = settings.announcementBar

  return (
    <>
      {bar?.enabled && bar.text && (
        <div className="bg-primary px-4 py-2 text-center text-sm font-medium text-white">
          {bar.url ? (
            <Link href={bar.url} className="hover:underline">
              {bar.text} →
            </Link>
          ) : (
            bar.text
          )}
        </div>
      )}
      <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur-md">
        <div className="wrap flex h-18 items-center justify-between gap-6">
          <TopLink href="/" aria-label={`${settings.siteName} home`}>
            <Logo name={settings.siteName} logo={settings.logo} />
          </TopLink>
          <NavMenu items={header.items ?? []} cta={header.ctaButton} portalUrl={PORTAL_URL} />
        </div>
      </header>
    </>
  )
}
