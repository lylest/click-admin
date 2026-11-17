import type { Field } from 'payload'

/** Icons editors can pick. Keys map to lucide-react icons in components/Icon.tsx. */
export const iconOptions = [
  'zap',
  'droplet',
  'flame',
  'smartphone',
  'message-square',
  'layout-dashboard',
  'wallet',
  'shield-check',
  'sparkles',
  'heart-pulse',
  'trending-down',
  'move',
  'hospital',
  'building',
  'home',
  'users',
  'school',
  'wrench',
  'gauge',
  'remote',
  'map-pin',
] as const

export type IconName = (typeof iconOptions)[number]

export const iconField = (name = 'icon'): Field => ({
  name,
  type: 'select',
  options: iconOptions.map((value) => ({ label: value, value })),
})

/** A simple button/link: label + URL (internal path, anchor, tel:, mailto: or external). */
export const linkField = (name: string, label?: string): Field => ({
  name,
  label: label ?? name,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text' },
        {
          name: 'url',
          type: 'text',
          admin: { description: 'e.g. /contact, #solutions, tel:+255…, https://…' },
        },
      ],
    },
  ],
})

export const slugField = (from: string): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: { position: 'sidebar', description: 'Used in the URL. Lowercase, hyphens only.' },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        const source = value || data?.[from]
        return typeof source === 'string'
          ? source
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          : value
      },
    ],
  },
})

export const seoField: Field = {
  name: 'seo',
  label: 'SEO',
  type: 'group',
  fields: [
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
  ],
}
