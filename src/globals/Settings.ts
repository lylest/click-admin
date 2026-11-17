import type { GlobalConfig } from 'payload'

import { revalidateSite } from '../hooks/revalidate'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site settings',
  access: { read: () => true },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Click Group' },
    { name: 'tagline', type: 'text' },
    { name: 'defaultDescription', type: 'textarea', admin: { description: 'Fallback meta description.' } },
    { name: 'logo', type: 'upload', relationTo: 'media', admin: { description: 'Optional. The name is shown as text when empty.' } },
    { name: 'logoDark', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        { name: 'contactEmail', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'whatsapp', type: 'text', admin: { description: 'Number in international format, e.g. 2557…' } },
      ],
    },
    { name: 'address', type: 'textarea' },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: ['facebook', 'instagram', 'linkedin', 'x', 'youtube', 'tiktok'].map((v) => ({ label: v, value: v })),
            },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'announcementBar',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'text', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
  ],
}
