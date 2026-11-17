import type { CollectionConfig } from 'payload'

/** Contact-form submissions. Created by the site's server action; only admins can read them. */
export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'interest', 'phone', 'email', 'createdAt'],
  },
  access: {
    create: () => false, // only via the server action (Local API)
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'organization', type: 'text' },
    { name: 'interest', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: ['new', 'contacted', 'closed'].map((v) => ({ label: v, value: v })),
      admin: { position: 'sidebar' },
    },
  ],
}
