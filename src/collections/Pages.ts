import type { CollectionConfig } from 'payload'

import { pageBlocks } from '../blocks'
import { seoField, slugField } from '../fields/shared'
import { revalidateSite } from '../hooks/revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'The page with slug "home" is the home page (/). Other pages live at /<slug>.',
  },
  access: { read: () => true },
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    { name: 'layout', type: 'blocks', blocks: pageBlocks },
    seoField,
  ],
}
