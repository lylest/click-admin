import type { CollectionConfig } from 'payload'

/**
 * Customer-care tickets from the form on the Contact page. Created by the
 * site's server action, which also emails them to the customer care address;
 * only signed-in staff can read or update them.
 */
export const Tickets: CollectionConfig = {
  slug: 'tickets',
  admin: {
    useAsTitle: 'ticket',
    defaultColumns: ['ticket', 'subject', 'name', 'product', 'status', 'createdAt'],
    description: 'Support requests from the customer care form. Each one is also emailed to customer care.',
  },
  defaultSort: '-createdAt',
  access: {
    create: () => false, // only via the server action (Local API)
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'ticket',
      label: 'Ticket number',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { readOnly: true },
    },
    { name: 'subject', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'product', type: 'text' },
        { name: 'account', label: 'Meter or account number', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'email' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'open',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'emailed',
      label: 'Emailed to customer care',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Unticked means the email failed: handle this ticket from here.',
      },
    },
  ],
}
