import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { getPost, getSiteText } from '@/lib/payload'
import { seoMetadata } from '@/lib/seo'
import { asMedia, categoryLabel, formatDate } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug)
  return post ? seoMetadata(post.seo, { title: post.title, description: post.excerpt }) : {}
}

export default async function PostPage({ params }: Props) {
  const [post, t] = await Promise.all([getPost((await params).slug), getSiteText()])
  if (!post) notFound()

  return (
    <article className="pb-24">
      <header className="bg-gradient-to-b from-tint to-white">
        <div className="wrap max-w-4xl py-16 lg:py-24">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden /> {t.news.allNews}
          </Link>
          <p className="mt-8 text-sm text-muted">
            <span className="font-semibold text-primary">
              {categoryLabel[post.category] ?? post.category}
            </span>
            {' · '}
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.author && <> · {post.author}</>}
          </p>
          <h1 className="mt-3 text-4xl text-ink md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-xl text-muted">{post.excerpt}</p>
        </div>
      </header>
      {asMedia(post.coverImage) && (
        <div className="wrap max-w-5xl">
          <Media
            resource={post.coverImage}
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="w-full rounded-3xl"
          />
        </div>
      )}
      <div className="wrap mt-12 max-w-3xl">
        <RichText data={post.body} />
      </div>
    </article>
  )
}
