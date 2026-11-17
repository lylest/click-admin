import type { Field, GlobalConfig } from 'payload'

import { revalidateSite } from '../hooks/revalidate'
import { SITE_TEXT } from '../lib/siteText'

const textField = (name: string, label: string, fallback: string): Field =>
  fallback.length > 60
    ? { name, label, type: 'textarea', defaultValue: fallback }
    : { name, label, type: 'text', defaultValue: fallback }

/** "Site text": every fixed label on the site, grouped by where it appears. */
export const SiteText: GlobalConfig = {
  slug: 'siteText',
  label: 'Site text',
  admin: {
    description:
      'Labels and short texts used across the site (product page headings, form labels, error messages, 404 page). Leave a field empty to use the default. {name} is replaced with the product name.',
  },
  access: { read: () => true },
  hooks: { afterChange: [revalidateSite] },
  fields: Object.entries(SITE_TEXT).map(([group, def]): Field => ({
    name: group,
    label: def.label,
    type: 'group',
    fields: Object.entries(def.fields).map(([key, [label, fallback]]) =>
      textField(key, label, fallback),
    ),
  })),
}
