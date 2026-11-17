import type { Metadata } from 'next'

import { asMedia } from './utils'

type Seo = { metaTitle?: string | null; metaDescription?: string | null; ogImage?: unknown } | null | undefined

export function seoMetadata(seo: Seo, fallback: { title: string; description?: string | null }): Metadata {
  const title = seo?.metaTitle || fallback.title
  const description = seo?.metaDescription || fallback.description || undefined
  const image = asMedia(seo?.ogImage)?.url
  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, images: image ? [image] : undefined },
  }
}
