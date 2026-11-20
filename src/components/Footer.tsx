import Link from 'next/link'
import { TopLink } from './TopLink'
import {
  siFacebook,
  siInstagram,
  siTiktok,
  siWhatsapp,
  siX,
  siYoutube,
  type SimpleIcon,
} from 'simple-icons'

import { getFooter, getSettings, getSiteText } from '@/lib/payload'
import { isPlaceholder, realLines } from '@/lib/utils'
import { FooterCta } from './FooterCta'
import { Logo } from './Logo'

const socialIcons: Record<string, SimpleIcon> = {
  facebook: siFacebook,
  instagram: siInstagram,
  x: siX,
  youtube: siYoutube,
  tiktok: siTiktok,
}
const socialLabel: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  x: 'X',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  whatsapp: 'WhatsApp',
}

function SocialIcon({ icon, label }: { icon?: SimpleIcon; label: string }) {
  if (!icon) return <span className="text-xs font-bold">{label.slice(0, 2)}</span>
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
      <path d={icon.path} />
    </svg>
  )
}

/**
 * Footer after the client reference: a large call to action, a full-width rule,
 * then brand + about + social on the left and link columns on the right,
 * separated by a vertical rule. Placeholder contact details are never shown.
 */
export async function Footer() {
  const [footer, settings, t] = await Promise.all([getFooter(), getSettings(), getSiteText()])
  const year = new Date().getFullYear()

  const phone = isPlaceholder(settings.phone) ? null : settings.phone
  const email = isPlaceholder(settings.contactEmail) ? null : settings.contactEmail
  const address = realLines(settings.address)
  const whatsapp = isPlaceholder(settings.whatsapp) ? null : settings.whatsapp
  const socials = [
    ...(settings.socialLinks ?? []).map((s) => ({
      key: s.id ?? s.url,
      platform: s.platform,
      url: s.url,
    })),
    ...(whatsapp
      ? [
          {
            key: 'whatsapp',
            platform: 'whatsapp',
            url: `https://wa.me/${whatsapp.replace(/\D/g, '')}`,
          },
        ]
      : []),
  ].filter((s) => s.url && !isPlaceholder(s.url))
  const legal = (footer.legalLinks ?? []).filter((l) => l.url && !isPlaceholder(l.url))
  const hasContact = !!(phone || email || address.length)

  return (
    <footer className="bg-night text-white">
      {footer.cta?.heading && (
        <FooterCta heading={footer.cta.heading} label={footer.cta.label} url={footer.cta.url} />
      )}

      <div className="border-t border-white/15">
        <div className="wrap grid lg:grid-cols-12">
          <div className="py-14 lg:col-span-5 lg:border-r lg:border-white/15 lg:py-20 lg:pr-16">
            <TopLink href="/" aria-label={`${settings.siteName} home`} className="inline-block">
              <Logo name={settings.siteName} logo={settings.logoDark} dark />
            </TopLink>
            {footer.about && (
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/80">{footer.about}</p>
            )}
            {socials.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {socials.map((s) => {
                  const label = socialLabel[s.platform] ?? s.platform
                  return (
                    <li key={s.key}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex size-10 items-center justify-center rounded-full bg-white text-night transition-colors hover:bg-accent"
                      >
                        <SocialIcon
                          icon={s.platform === 'whatsapp' ? siWhatsapp : socialIcons[s.platform]}
                          label={label}
                        />
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-white/15 py-14 sm:grid-cols-3 lg:col-span-7 lg:border-t-0 lg:py-20 lg:pl-16 xl:pl-24">
            {footer.columns?.map((column) => {
              const links = (column.links ?? []).filter(
                (l) => l.url && !isPlaceholder(l.url) && l.url !== '#',
              )
              if (!links.length) return null
              return (
                <div key={column.id ?? column.title}>
                  <h3 className="text-2xl font-medium text-white">{column.title}</h3>
                  <ul className="mt-6 space-y-4">
                    {links.map((link) => (
                      <li key={link.id ?? link.url}>
                        <TopLink
                          href={link.url}
                          className="text-lg text-white/80 transition-colors hover:text-white"
                        >
                          {link.label}
                        </TopLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
            {hasContact && (
              <div className="col-span-2 sm:col-span-1">
                <h3 className="text-2xl font-medium text-white">{t.footer.contactHeading}</h3>
                <ul className="mt-6 space-y-4 text-lg text-white/80">
                  {address.length > 0 && (
                    <li>
                      {address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </li>
                  )}
                  {email && (
                    <li>
                      <a
                        href={`mailto:${email}`}
                        className="break-all transition-colors hover:text-white"
                      >
                        {email}
                      </a>
                    </li>
                  )}
                  {phone && (
                    <li>
                      <a
                        href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                        className="transition-colors hover:text-white"
                      >
                        {phone}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="wrap flex flex-col gap-3 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {(footer.copyright ?? `© {year} ${settings.siteName}`).replace('{year}', String(year))}
          </p>
          {legal.length > 0 && (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legal.map((link) => (
                <li key={link.id ?? link.url}>
                  <Link href={link.url} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
