import Image from 'next/image'

import { asMedia, cn } from '@/lib/utils'

export function Media({
  resource,
  className,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority,
  fill,
}: {
  resource: unknown
  className?: string
  sizes?: string
  priority?: boolean
  fill?: boolean
}) {
  const media = asMedia(resource)
  if (!media?.url) return null
  // Editors set the focal point in the admin; cropped (object-cover) images keep it in view.
  const style =
    media.focalX != null && media.focalY != null
      ? { objectPosition: `${media.focalX}% ${media.focalY}%` }
      : undefined
  return fill ? (
    <Image
      src={media.url}
      alt={media.alt ?? ''}
      fill
      sizes={sizes}
      priority={priority}
      style={style}
      className={cn('object-cover', className)}
    />
  ) : (
    <Image
      src={media.url}
      alt={media.alt ?? ''}
      width={media.width ?? 1200}
      height={media.height ?? 800}
      sizes={sizes}
      priority={priority}
      style={style}
      className={className}
    />
  )
}
