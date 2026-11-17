import type { CollectionConfig } from 'payload'

import { iconField, seoField, slugField } from '../fields/shared'
import { revalidateSite } from '../hooks/revalidate'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Solution', plural: 'Solutions' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order'],
    description: 'Each solution gets its own page at /solutions/<slug>.',
  },
  defaultSort: 'order',
  access: { read: () => true },
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField('name'),
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    iconField(),
    { name: 'tagline', type: 'text' },
    { name: 'shortDescription', type: 'textarea', required: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media', admin: { description: 'Large photo in the hero.' } },
    {
      name: 'heroSecondaryImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional smaller photo overlapping the corner of the hero photo.' },
    },
    { name: 'overview', type: 'richText' },
    {
      name: 'features',
      type: 'array',
      admin: { description: 'Shown as photo cards. Five fills the grid best (three, then two).' },
      fields: [
        iconField(),
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'journeys',
      label: 'How it works panels',
      type: 'array',
      maxRows: 2,
      admin: {
        description: 'Large photo with a card of numbered steps on top, e.g. one for tenants and one for landlords.',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'intro', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Wide photo, 2000px+.' } },
        {
          name: 'cardOnRight',
          type: 'checkbox',
          admin: { description: 'Put the steps card on the right (when the subject of the photo is on the left).' },
        },
        {
          name: 'steps',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'text', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'specs',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
      ],
    },
    { name: 'useCases', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    {
      name: 'faqs',
      label: 'FAQs',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
    {
      name: 'newsCategory',
      type: 'select',
      admin: { description: 'News category shown at the bottom of this page.' },
      options: [
        { label: 'Click Meter', value: 'click-meter' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Company', value: 'company' },
      ],
    },
    { name: 'brochure', type: 'upload', relationTo: 'media' },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Request a quote' },
    seoField,
  ],
}
