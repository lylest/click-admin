import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { Media } from '../Media'
import { RevealImage, Stagger, StaggerItem } from '../motion'
import { SectionHeading } from '../SectionHeading'
import { getPosts, getSiteText } from '@/lib/payload'
import type { Post } from '@/payload-types'
import { asMedia, cn, formatDate, type BlockOf } from '@/lib/utils'

/** "Author · date" line. A thin rule separates them (no em dash in copy). */
function PostMeta({ post }: { post: Post }) {
  return (
    <p className="flex flex-col gap-0.5 text-sm text-muted sm:flex-row sm:items-center sm:gap-3">
      {post.author && (
        <>
          <span>{post.author}</span>
          <span aria-hidden className="hidden h-px w-4 bg-ink/30 sm:block" />
        </>
      )}
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
    </p>
  )
}

function Cover({ post, sizes, className }: { post: Post; sizes: string; className?: string }) {
  return (
    <div className={cn('relative overflow-hidden rounded-2xl bg-tint-strong', className)}>
      {asMedia(post.coverImage) && <Media resource={post.coverImage} fill sizes={sizes} />}
    </div>
  )
}

/** Large card: photo on top, meta, title, button. */
export function FeaturedPostCard({
  post,
  readLabel = 'Read article',
}: {
  post: Post
  readLabel?: string
}) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex h-full flex-col rounded-3xl bg-cream p-2.5 transition-colors hover:bg-[#f4efe6]"
    >
      <RevealImage className="relative aspect-[3/2] w-full lg:aspect-auto lg:min-h-[22rem] lg:flex-1">
        <Cover post={post} sizes="(min-width: 1024px) 45vw, 100vw" className="absolute inset-0" />
      </RevealImage>
      <div className="px-5 pb-6 pt-7 sm:px-7 sm:pb-8">
        <PostMeta post={post} />
        <h3 className="mt-4 text-2xl font-medium leading-snug text-ink transition-colors group-hover:text-primary sm:text-3xl">
          {post.title}
        </h3>
        {post.excerpt && <p className="mt-3 max-w-xl leading-relaxed text-muted">{post.excerpt}</p>}
        <span className="mt-8 inline-flex items-center gap-4 rounded-lg bg-ink py-1.5 pl-5 pr-1.5 font-semibold text-white transition-colors group-hover:bg-primary">
          {readLabel}
          <span className="inline-flex size-9 items-center justify-center rounded-md bg-accent text-ink">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </span>
      </div>
    </Link>
  )
}

/** Compact card: square photo on the left, meta and title on the right. */
export function PostRowCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex h-full items-center gap-5 rounded-3xl bg-cream p-2.5 pr-5 transition-colors hover:bg-[#f4efe6] sm:gap-8 sm:pr-8"
    >
      <Cover
        post={post}
        sizes="(min-width: 640px) 200px, 112px"
        className="aspect-square w-28 shrink-0 self-stretch sm:aspect-auto sm:min-h-48 sm:w-48"
      />
      <div className="py-3">
        <PostMeta post={post} />
        <h3 className="mt-3 text-lg font-medium leading-snug text-ink transition-colors group-hover:text-primary sm:text-2xl">
          {post.title}
        </h3>
      </div>
    </Link>
  )
}

/** Grid card used on the /news listing page. */
export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex h-full flex-col rounded-3xl bg-cream p-2.5"
    >
      <Cover post={post} sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-[3/2]" />
      <div className="px-4 pb-5 pt-6">
        <PostMeta post={post} />
        <h3 className="mt-3 text-xl font-medium leading-snug text-ink transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        {post.excerpt && <p className="mt-2 line-clamp-2 text-muted">{post.excerpt}</p>}
      </div>
    </Link>
  )
}

export async function LatestNewsBlock({ block }: { block: BlockOf<'latestNews'> }) {
  const [posts, t] = await Promise.all([getPosts(block.count ?? 4), getSiteText()])
  if (!posts.length) return null
  const [featured, ...rest] = posts

  return (
    <section className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-x-6">
          <SectionHeading heading={block.heading} intro={block.intro} />
          <Link
            href="/news"
            className="mb-12 inline-flex items-center gap-2 font-semibold text-ink hover:text-primary lg:mb-16"
          >
            {t.news.allNews} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className={cn('grid gap-5', rest.length > 0 && 'lg:grid-cols-2')}>
          <FeaturedPostCard post={featured} readLabel={t.news.readArticle} />
          {rest.length > 0 && (
            <Stagger className="grid gap-5" stagger={0.1}>
              {rest.map((post) => (
                <StaggerItem key={post.id}>
                  <PostRowCard post={post} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </div>
    </section>
  )
}
