import {
  Building,
  Flame,
  Droplet,
  Gauge,
  HeartPulse,
  Hospital,
  House,
  Joystick,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Move,
  School,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingDown,
  Users,
  Wallet,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'

import type { IconName } from '@/fields/shared'

const icons: Record<IconName, LucideIcon> = {
  zap: Zap,
  droplet: Droplet,
  flame: Flame,
  smartphone: Smartphone,
  'message-square': MessageSquare,
  'layout-dashboard': LayoutDashboard,
  wallet: Wallet,
  'shield-check': ShieldCheck,
  sparkles: Sparkles,
  'heart-pulse': HeartPulse,
  'trending-down': TrendingDown,
  move: Move,
  hospital: Hospital,
  building: Building,
  home: House,
  users: Users,
  school: School,
  wrench: Wrench,
  gauge: Gauge,
  remote: Joystick,
  'map-pin': MapPin,
}

export function Icon({ name, className }: { name?: string | null; className?: string }) {
  const Component = icons[(name ?? '') as IconName] ?? Sparkles
  return <Component aria-hidden className={className} strokeWidth={1.75} />
}

/** Icon in a soft teal tile, used on feature and card grids. */
export function IconTile({ name, dark = false }: { name?: string | null; dark?: boolean }) {
  return (
    <span
      className={
        dark
          ? 'inline-flex size-11 items-center justify-center rounded-xl bg-white/10 text-accent'
          : 'inline-flex size-11 items-center justify-center rounded-xl bg-tint-strong text-primary'
      }
    >
      <Icon name={name} className="size-5" />
    </span>
  )
}
