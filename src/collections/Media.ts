import type { CollectionConfig } from 'payload'

import { revalidateSite } from '../hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  admin: {
    description:
      'Each image is used in one place on the site. Replacing the file of an image changes it everywhere it is used. To change the photo in one section, open that section and upload a new image there.',
  },
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'Replacing this file changes the image in every section that uses it. To change one section only, upload a new image from that section instead.',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'card', width: 768 },
      { name: 'large', width: 1600 },
    ],
  },
}
