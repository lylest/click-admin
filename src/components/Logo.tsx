import { Media } from './Media'
import { asMedia } from '@/lib/utils'

/**
 * Click Group mark: an open ring with a tail (a "C"). From logoipsum-297, symbol only,
 * recoloured to the brand teal (accent teal on dark backgrounds). Same shape as /favicon.svg.
 * An uploaded logo in Site settings replaces the mark and name.
 */
const RING =
  'M25.5557 11.6853C23.9112 10.5865 21.9778 10 20 10V0C23.9556 0 27.8224 1.17298 31.1114 3.37061C34.4004 5.56823 36.9638 8.69181 38.4776 12.3463C39.9913 16.0008 40.3874 20.0222 39.6157 23.9018C38.844 27.7814 36.9392 31.3451 34.1421 34.1421C31.3451 36.9392 27.7814 38.844 23.9018 39.6157C20.0222 40.3874 16.0008 39.9913 12.3463 38.4776C8.6918 36.9638 5.56823 34.4004 3.37061 31.1114C1.17298 27.8224 0 23.9556 0 20H10C10 21.9778 10.5865 23.9112 11.6853 25.5557C12.7841 27.2002 14.3459 28.4819 16.1732 29.2388C18.0004 29.9957 20.0111 30.1937 21.9509 29.8078C23.8907 29.422 25.6725 28.4696 27.0711 27.0711C28.4696 25.6725 29.422 23.8907 29.8078 21.9509C30.1937 20.0111 29.9957 18.0004 29.2388 16.1732C28.4819 14.3459 27.2002 12.7841 25.5557 11.6853Z'
const TAIL =
  'M9.99999 5.28493e-06C9.99999 1.31322 9.74134 2.61358 9.23879 3.82684C8.73624 5.04009 7.99965 6.14248 7.07106 7.07107C6.14248 7.99966 5.04009 8.73625 3.82683 9.2388C2.61357 9.74134 1.31321 10 4.3711e-07 10L0 20C2.62643 20 5.22715 19.4827 7.65367 18.4776C10.0802 17.4725 12.285 15.9993 14.1421 14.1421C15.9993 12.285 17.4725 10.0802 18.4776 7.65367C19.4827 5.22715 20 2.62643 20 0L9.99999 5.28493e-06Z'

function Mark({ dark }: { dark?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className="size-8" aria-hidden>
      <g fill={dark ? '#00b4a0' : '#025864'} fillRule="evenodd" clipRule="evenodd">
        <path d={RING} />
        <path d={TAIL} />
      </g>
    </svg>
  )
}

export function Logo({ name, logo, dark }: { name: string; logo?: unknown; dark?: boolean }) {
  if (asMedia(logo)) return <Media resource={logo} className="h-9 w-auto" sizes="200px" priority />
  return (
    <span className="flex items-center gap-2.5">
      <Mark dark={dark} />
      <span className={dark ? 'text-xl font-bold text-white' : 'text-xl font-bold text-ink'}>
        {name}
      </span>
    </span>
  )
}
