import type { CollectionConfig } from 'payload'

import { seoField, slugField } from '../fields/shared'
import { revalidateSite } from '../hooks/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'News post', plural: 'News' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'publishedAt'] },
  defaultSort: '-publishedAt',
  access: { read: () => true },
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'company',
      options: [
        { label: 'Company', value: 'company' },
        { label: 'Click Meter', value: 'click-meter' },
        { label: 'Healthcare', value: 'healthcare' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'author', type: 'text', admin: { position: 'sidebar' } },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'body', type: 'richText' },
    seoField,
  ],
}
