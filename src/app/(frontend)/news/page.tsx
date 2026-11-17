import type { Metadata } from 'next'

import { PageHeaderBlock } from '@/components/blocks/Hero'
import { PostCard } from '@/components/blocks/News'
import { getPosts, getSiteText } from '@/lib/payload'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getSiteText()
  return { title: t.news.pageHeading, description: t.news.metaDescription }
}

export default async function NewsPage() {
  const [posts, t] = await Promise.all([getPosts(), getSiteText()])
  return (
    <>
      <PageHeaderBlock
        block={{
          blockType: 'pageHeader',
          heading: t.news.pageHeading,
          subheading: t.news.pageIntro,
        }}
      />
      <section className="section">
        <div className="wrap">
          {posts.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-muted">{t.news.empty}</p>
          )}
        </div>
      </section>
    </>
  )
}
