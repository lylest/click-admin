import type { Field, GlobalConfig } from 'payload'

import { revalidateSite } from '../hooks/revalidate'

const linkRow: Field = {
  type: 'row',
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'url', type: 'text', required: true },
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    {
      name: 'cta',
      label: 'Call to action band',
      type: 'group',
      admin: { description: 'Large heading and button at the top of the footer, on every page except Contact.' },
      fields: [
        { name: 'heading', type: 'textarea' },
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text', admin: { description: 'On a product page, /contact links to that product automatically.' } },
          ],
        },
      ],
    },
    { name: 'about', type: 'textarea' },
    {
      name: 'columns',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'links', type: 'array', fields: [linkRow] },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      admin: { description: '{year} is replaced with the current year.' },
    },
    { name: 'legalLinks', type: 'array', fields: [linkRow] },
  ],
}
