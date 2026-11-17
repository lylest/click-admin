import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { resolveSiteText } from './siteText'

export const getPayloadClient = () => getPayload({ config })

export const getSettings = cache(async () =>
  (await getPayloadClient()).findGlobal({ slug: 'settings', depth: 1 }),
)
export const getHeader = cache(async () =>
  (await getPayloadClient()).findGlobal({ slug: 'header', depth: 0 }),
)
export const getFooter = cache(async () =>
  (await getPayloadClient()).findGlobal({ slug: 'footer', depth: 0 }),
)

/** All fixed labels, CMS values over defaults. */
export const getSiteText = cache(async () =>
  resolveSiteText(
    (await (
      await getPayloadClient()
    ).findGlobal({ slug: 'siteText', depth: 0 })) as unknown as Record<string, unknown>,
  ),
)

const findBySlug = async <C extends 'pages' | 'products' | 'posts'>(
  collection: C,
  slug: string,
) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return docs[0] ?? null
}

export const getPage = cache((slug: string) => findBySlug('pages', slug))
export const getProduct = cache((slug: string) => findBySlug('products', slug))
export const getPost = cache((slug: string) => findBySlug('posts', slug))

export const getProducts = cache(async () =>
  (await getPayloadClient())
    .find({ collection: 'products', sort: 'order', depth: 1, limit: 50 })
    .then((r) => r.docs),
)

export const getPosts = cache(async (limit = 50) =>
  (await getPayloadClient())
    .find({ collection: 'posts', sort: '-publishedAt', depth: 1, limit })
    .then((r) => r.docs),
)

export const getPostsByCategory = cache(async (category: string, limit = 3) =>
  (await getPayloadClient())
    .find({
      collection: 'posts',
      where: { category: { equals: category } },
      sort: '-publishedAt',
      depth: 1,
      limit,
    })
    .then((r) => r.docs),
)
