import type { CollectionConfig } from 'payload'

import { revalidateSite } from '../hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  fields: [{ name: 'alt', type: 'text', required: true }],
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'card', width: 768 },
      { name: 'large', width: 1600 },
    ],
  },
}
