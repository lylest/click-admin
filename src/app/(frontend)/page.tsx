import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { getPage } from '@/lib/payload'
import { seoMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('home')
  return page ? seoMetadata(page.seo, { title: page.title }) : {}
}

export default async function HomePage() {
  const page = await getPage('home')
  if (!page) notFound()
  return <RenderBlocks blocks={page.layout} />
}
