import { Media } from './Media'
import { asMedia } from '@/lib/utils'

/**
 * Click Group wordmark: "CLICK" in the client's squared letterforms with a
 * top-to-bottom blue gradient, redrawn as a vector from the client's LOGO.png.
 * The dark variant uses lighter blues so it reads on the night footer.
 * An uploaded logo in Site settings replaces it.
 */
const C = 'M50 0H170V35H66.5A14 14 0 0 0 52.5 49V98A14 14 0 0 0 66.5 112H170V147H50A50 50 0 0 1 0 97V50A50 50 0 0 1 50 0Z'
const L = 'M190 0H240V112H334V147H190Z'
const I = 'M354 0H404V147H354Z'
const K = 'M614 0H664V66L730 0H794L718 70.5L800 147H728L664 86V147H614Z'

const STOPS = {
  light: ['#0084f2', '#005ad0', '#00209b'],
  dark: ['#4aa8ff', '#1f7cf0', '#0a4fd6'],
}

function Wordmark({ name, dark }: { name: string; dark?: boolean }) {
  const id = dark ? 'click-logo-dark' : 'click-logo'
  const [top, mid, bottom] = dark ? STOPS.dark : STOPS.light
  return (
    <svg viewBox="-1 -1 802 149" className="h-7 w-auto sm:h-8" role="img" aria-label={name}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset=".5" stopColor={mid} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`} stroke={dark ? '#0a4fd6' : '#0a2a8f'} strokeWidth="1.2">
        <path d={C} />
        <path d={L} />
        <path d={I} />
        <path d={C} transform="translate(426 0)" />
        <path d={K} />
      </g>
    </svg>
  )
}

export function Logo({ name, logo, dark }: { name: string; logo?: unknown; dark?: boolean }) {
  if (asMedia(logo)) return <Media resource={logo} className="h-9 w-auto" sizes="200px" priority />
  return <Wordmark name={name} dark={dark} />
}
