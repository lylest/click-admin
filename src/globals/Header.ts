import type { GlobalConfig } from 'payload'

import { linkField } from '../fields/shared'
import { revalidateSite } from '../hooks/revalidate'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Navigation',
  access: { read: () => true },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', admin: { description: 'Leave empty for a dropdown-only item.' } },
          ],
        },
        {
          name: 'children',
          type: 'array',
          admin: {
            description:
              'If this list has a link to a solution (/solutions/...), every solution is listed automatically, in the Solutions order. Add one here only to change its label or description.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
              ],
            },
            { name: 'description', type: 'text' },
          ],
        },
      ],
    },
    linkField('ctaButton', 'Call-to-action button'),
  ],
}
