import path from 'path'
import type { Payload } from 'payload'
import { fileURLToPath } from 'url'

import * as content from './content'

type Options = { overwrite?: boolean }

const imagesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'images')

/** Upload a bundled image once; reuse the existing Media doc on later runs. */
async function uploadImage(
  payload: Payload,
  image: (typeof content.images)[keyof typeof content.images],
  overwrite: boolean,
) {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: image.file } },
    limit: 1,
    depth: 0,
  })
  const doc = existing.docs[0]
  if (doc) {
    // On reset, re-apply alt text and focal point so crops follow the defaults.
    if (overwrite) {
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: { alt: image.alt, focalX: image.focalX, focalY: image.focalY },
      })
    }
    return doc.id
  }
  const created = await payload.create({
    collection: 'media',
    data: { alt: image.alt, focalX: image.focalX, focalY: image.focalY },
    filePath: path.join(imagesDir, image.file),
  })
  return created.id
}

/**
 * Loads the default content. Existing documents (matched by slug) are left
 * alone unless `overwrite` is set, so editors' changes are never lost by
 * accident.
 */
export async function seed(payload: Payload, { overwrite = false }: Options = {}) {
  const upsert = async (
    collection: 'pages' | 'products' | 'posts',
    data: Record<string, unknown>,
  ) => {
    const existing = await payload.find({
      collection,
      where: { slug: { equals: data.slug } },
      limit: 1,
      depth: 0,
    })
    const doc = existing.docs[0]
    if (doc && !overwrite) return doc
    if (doc) return payload.update({ collection, id: doc.id, data: data as never })
    return payload.create({ collection, data: data as never })
  }

  payload.logger.info(overwrite ? 'Resetting content to defaults…' : 'Seeding default content…')

  const media = {} as Record<keyof typeof content.images, number | string>
  for (const key of Object.keys(content.images) as (keyof typeof content.images)[]) {
    media[key] = await uploadImage(payload, content.images[key], overwrite)
  }

  // Photos and photo-dependent content for each solution page.
  const productMedia = content.productMedia(media)

  const products = []
  for (const product of content.products) {
    const extra = productMedia[product.slug] ?? {}
    const featureImages = extra.featureImages ?? []
    products.push(
      await upsert('products', {
        ...product,
        ...extra,
        featureImages: undefined,
        features: product.features.map((f, i) => ({ ...f, image: featureImages[i] })),
      }),
    )
  }
  for (const { cover, ...post } of content.posts) {
    await upsert('posts', { ...post, coverImage: media[cover as keyof typeof media] })
  }
  if (overwrite) {
    await payload.delete({ collection: 'posts', where: { slug: { in: content.retiredPostSlugs } } })
  }
  for (const page of content.pages(
    products.map((p) => p.id),
    media,
  ))
    await upsert('pages', page)

  await payload.updateGlobal({ slug: 'settings', data: content.settings as never })
  await payload.updateGlobal({ slug: 'header', data: content.header as never })
  await payload.updateGlobal({ slug: 'footer', data: content.footer as never })

  payload.logger.info('Default content ready.')
}

/** Seed only when the CMS is empty (first start). */
export async function seedIfEmpty(payload: Payload) {
  const { totalDocs } = await payload.count({ collection: 'pages' })
  if (totalDocs === 0) await seed(payload)
}
