import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { getPage } from '@/lib/payload'
import { seoMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage((await params).slug)
  return page ? seoMetadata(page.seo, { title: page.title }) : {}
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (slug === 'home') redirect('/')
  const page = await getPage(slug)
  if (!page) notFound()
  return <RenderBlocks blocks={page.layout} />
}
