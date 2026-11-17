import type { Block } from 'payload'

import { iconField, linkField } from '../fields/shared'

/*
 * Page-builder sections. Editors add, remove and reorder these on any page.
 * Each block's slug matches a component in components/blocks/RenderBlocks.tsx.
 */

const heading = { name: 'heading', type: 'text' } as const
const intro = { name: 'intro', type: 'textarea' } as const
const anchor = {
  name: 'anchor',
  type: 'text',
  admin: { description: 'Optional id for in-page links, e.g. "solutions" for /#solutions' },
} as const

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    linkField('primaryCta', 'Primary button'),
    linkField('secondaryCta', 'Secondary button'),
    {
      name: 'highlights',
      label: 'Points under the button',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'url', type: 'text', admin: { description: 'Optional link, e.g. /solutions/click-meter' } },
          ],
        },
        { name: 'text', type: 'text', required: true },
      ],
    },
    {
      type: 'collapsible',
      label: 'Photos',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'image',
              label: 'Main photo',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Portrait works best. Set the focal point on the face.' },
            },
            {
              name: 'secondaryImage',
              label: 'Second photo',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Optional. Overlaps the main photo.' },
            },
          ],
        },
        {
          name: 'inset',
          label: 'Quote card',
          type: 'group',
          admin: { description: 'Card overlapping the photos. Use a real quote or statement only.' },
          fields: [
            { name: 'title', label: 'Quote', type: 'textarea' },
            { name: 'text', label: 'Attribution', type: 'text', admin: { description: 'e.g. Our mission' } },
            {
              name: 'image',
              label: 'Image (optional)',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Optional small photo at the top of the card.' },
            },
          ],
        },
        {
          name: 'tags',
          label: 'Photo labels',
          type: 'array',
          maxRows: 3,
          admin: { description: 'Optional short labels on the main photo, e.g. "Healthcare".' },
          fields: [{ name: 'label', type: 'text', required: true }],
        },
      ],
    },
    {
      name: 'stat',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', admin: { description: 'e.g. 500+' } },
            { name: 'label', type: 'text' },
          ],
        },
      ],
    },
  ],
}

export const PageHeaderBlock: Block = {
  slug: 'pageHeader',
  labels: { singular: 'Page header', plural: 'Page headers' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
  ],
}

export const LogosBlock: Block = {
  slug: 'logos',
  labels: { singular: 'Partner logos', plural: 'Partner logos' },
  fields: [
    heading,
    {
      name: 'logos',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'url', type: 'text' },
      ],
    },
  ],
}

export const ContentBlock: Block = {
  slug: 'content',
  labels: { singular: 'Text + image', plural: 'Text + image' },
  fields: [
    anchor,
    { name: 'eyebrow', type: 'text' },
    heading,
    { name: 'body', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageOnLeft', type: 'checkbox', defaultValue: false },
    linkField('cta', 'Button'),
  ],
}

export const IntroAccordionBlock: Block = {
  slug: 'introAccordion',
  labels: { singular: 'Text + accordion', plural: 'Text + accordion' },
  fields: [
    anchor,
    {
      type: 'row',
      fields: [
        { name: 'headingMuted', label: 'Heading (grey part)', type: 'text' },
        { name: 'heading', label: 'Heading (dark part)', type: 'text' },
      ],
    },
    { name: 'body', type: 'textarea' },
    {
      name: 'linkCard',
      type: 'group',
      admin: { description: 'Card with a small photo linking to another page. Hidden if no URL.' },
      fields: [
        { name: 'lead', type: 'text', admin: { description: 'Small grey line above the card' } },
        {
          type: 'row',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'items',
      label: 'Accordion items',
      type: 'array',
      maxRows: 6,
      admin: { description: 'The first item starts open.' },
      fields: [
        {
          type: 'row',
          fields: [iconField(), { name: 'title', type: 'text', required: true }],
        },
        { name: 'text', type: 'textarea', required: true },
      ],
    },
  ],
}

export const BentoBlock: Block = {
  slug: 'bento',
  labels: { singular: 'Photo grid + slideshow', plural: 'Photo grids + slideshows' },
  fields: [
    anchor,
    heading,
    intro,
    {
      name: 'slides',
      label: 'Slideshow (large card)',
      type: 'array',
      minRows: 1,
      maxRows: 5,
      admin: { description: 'Rotates every 6 seconds. Use tall (portrait) photos.' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
        linkField('link', 'Button'),
      ],
    },
    {
      name: 'cards',
      label: 'Cards (right side)',
      type: 'array',
      maxRows: 4,
      admin: { description: 'Fact and photo cards sit side by side; feature cards take the full width.' },
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'fact',
          options: [
            { label: 'Fact (label + big text)', value: 'fact' },
            { label: 'Photo only', value: 'photo' },
            { label: 'Feature (photo + heading + button, full width)', value: 'feature' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', admin: { description: 'Small text at the top' } },
            { name: 'value', type: 'text', admin: { description: 'Big text (fact) or heading (feature)' } },
          ],
        },
        { name: 'text', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        linkField('link', 'Button'),
      ],
    },
  ],
}

export const ProductCardsBlock: Block = {
  slug: 'productCards',
  labels: { singular: 'Product cards', plural: 'Product cards' },
  fields: [
    anchor,
    heading,
    intro,
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: { description: 'Leave empty to show all products.' },
    },
  ],
}

export const SpotlightBlock: Block = {
  slug: 'spotlight',
  labels: { singular: 'Product spotlight', plural: 'Product spotlights' },
  fields: [
    anchor,
    { name: 'eyebrow', type: 'text' },
    heading,
    { name: 'body', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageOnLeft', type: 'checkbox', defaultValue: false },
    {
      name: 'features',
      type: 'array',
      admin: { description: 'Shown as a selectable list. Each feature can have its own photo.' },
      fields: [
        iconField(),
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional. Falls back to the main image above.' },
        },
      ],
    },
    linkField('cta', 'Button'),
  ],
}

export const StepsBlock: Block = {
  slug: 'steps',
  labels: { singular: 'How it works', plural: 'How it works' },
  fields: [
    anchor,
    heading,
    intro,
    {
      name: 'steps',
      type: 'array',
      fields: [iconField(), { name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }],
    },
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Stats', plural: 'Stats' },
  fields: [
    anchor,
    heading,
    intro,
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional. With a photo, the section shows the photo left and text + numbers right.' },
    },
    linkField('cta', 'Button'),
    {
      name: 'stats',
      type: 'array',
      admin: {
        description: 'Use real numbers only. A value in [brackets] is treated as a placeholder and hidden on the site.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 500+' } },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}

export const CardsBlock: Block = {
  slug: 'cards',
  labels: { singular: 'Cards grid', plural: 'Cards grids' },
  fields: [
    anchor,
    heading,
    intro,
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional wide background photo (landscape, at least 2000px wide). It fades into dark teal behind the text.',
      },
    },
    {
      name: 'cards',
      type: 'array',
      maxRows: 4,
      admin: { description: 'Shown as columns with a thin line between them. Three reads best.' },
      fields: [iconField(), { name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }],
    },
    linkField('cta', 'Button'),
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    heading,
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'organization', type: 'text' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

export const LatestNewsBlock: Block = {
  slug: 'latestNews',
  labels: { singular: 'Latest news', plural: 'Latest news' },
  fields: [heading, intro, { name: 'count', type: 'number', defaultValue: 3, min: 1, max: 12 }],
}

export const CtaBlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call to action', plural: 'Calls to action' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    linkField('primaryCta', 'Primary button'),
    linkField('secondaryCta', 'Secondary button'),
  ],
}

export const TimelineBlock: Block = {
  slug: 'timeline',
  labels: { singular: 'Timeline', plural: 'Timelines' },
  fields: [
    heading,
    { name: 'body', type: 'richText' },
    {
      name: 'events',
      type: 'array',
      fields: [
        { name: 'year', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
      ],
    },
  ],
}

export const MissionBlock: Block = {
  slug: 'mission',
  labels: { singular: 'Mission & values', plural: 'Mission & values' },
  fields: [
    { name: 'mission', type: 'textarea' },
    { name: 'vision', type: 'textarea' },
    { name: 'valuesHeading', type: 'text', defaultValue: 'What we stand for' },
    {
      name: 'values',
      type: 'array',
      fields: [iconField(), { name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }],
    },
  ],
}

export const TeamBlock: Block = {
  slug: 'team',
  labels: { singular: 'Team', plural: 'Teams' },
  fields: [
    heading,
    intro,
    {
      name: 'members',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'bio', type: 'textarea' },
        { name: 'linkedin', type: 'text' },
      ],
    },
  ],
}

export const FaqBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    heading,
    intro,
    linkField('cta', 'Button'),
    {
      name: 'items',
      type: 'array',
      admin: { description: 'The first question starts open. An answer in [brackets] is a placeholder and is hidden.' },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}

export const ContactBlock: Block = {
  slug: 'contact',
  labels: { singular: 'Contact form', plural: 'Contact forms' },
  fields: [
    heading,
    { name: 'text', type: 'textarea' },
    {
      name: 'interests',
      type: 'array',
      admin: { description: 'Options for the "I\'m interested in" dropdown.' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'offices',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'address', type: 'textarea' },
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'text' },
        { name: 'hours', type: 'text' },
      ],
    },
    { name: 'mapEmbedUrl', type: 'text', admin: { description: 'Google Maps "embed a map" src URL.' } },
    {
      name: 'successMessage',
      type: 'text',
      defaultValue: "Thank you! We've received your message and will be in touch soon.",
    },
  ],
}

export const pageBlocks: Block[] = [
  HeroBlock,
  PageHeaderBlock,
  LogosBlock,
  ContentBlock,
  IntroAccordionBlock,
  BentoBlock,
  ProductCardsBlock,
  SpotlightBlock,
  StepsBlock,
  StatsBlock,
  CardsBlock,
  TestimonialsBlock,
  LatestNewsBlock,
  CtaBlock,
  TimelineBlock,
  MissionBlock,
  TeamBlock,
  FaqBlock,
  ContactBlock,
]
