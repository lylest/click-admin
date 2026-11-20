/**
 * Every fixed label on the site, with its default wording. The "Site text" global
 * in the CMS is built from this list, and the site falls back to these defaults
 * when a field is empty. `{name}` is replaced with the product name.
 */
export const SITE_TEXT = {
  product: {
    label: 'Product pages',
    fields: {
      breadcrumb: ['Breadcrumb link', 'Solutions'],
      howItWorksButton: ['Hero button to "How it works"', 'How it works'],
      whatItDoes: ['Features heading', 'What {name} does'],
      howItWorks: ['"How it works" heading', 'How it works'],
      specifications: ['Specifications heading', 'Specifications'],
      whoItsFor: ['"Who it\'s for" heading', "Who it's for"],
      news: ['News heading', '{name} news and guides'],
      faq: ['FAQ heading', '{name} questions'],
      brochure: ['Brochure button', 'Brochure'],
    },
  },
  news: {
    label: 'News',
    fields: {
      pageHeading: ['News page heading', 'News and updates'],
      pageIntro: ['News page intro', 'Product news and guides from the Click Group team.'],
      metaDescription: [
        'News page description for search engines',
        'The latest from Click Group: Click Meter, healthcare and company news.',
      ],
      empty: ['Shown when there are no articles', 'No news yet. Check back soon.'],
      readArticle: ['Button on the featured article', 'Read article'],
      allNews: ['"All news" links', 'All news'],
    },
  },
  footer: {
    label: 'Footer',
    fields: {
      contactHeading: ['Contact column heading', 'Contact'],
    },
  },
  form: {
    label: 'Contact form',
    fields: {
      name: ['Name field', 'Name'],
      phone: ['Phone field', 'Phone'],
      email: ['Email field', 'Email'],
      organization: ['Organization field', 'Organization'],
      interest: ['Interest dropdown', "I'm interested in"],
      message: ['Message field', 'Message'],
      send: ['Send button', 'Send message'],
      sending: ['Send button while sending', 'Sending…'],
      errorName: ['Error: missing name', 'Please enter your name.'],
      errorContact: [
        'Error: no phone or email',
        'Please give a phone number or email so we can reply.',
      ],
      errorEmail: ['Error: invalid email', 'Please enter a valid email.'],
      errorMessage: ['Error: missing message', 'Please tell us a little about what you need.'],
      errorServer: [
        'Error: could not send',
        'Something went wrong. Please try again or contact us by phone or email.',
      ],
    },
  },
  ticket: {
    label: 'Customer care (ticket form)',
    fields: {
      heading: ['Section heading', 'Customer care'],
      intro: [
        'Section intro',
        'Already a customer? Report a problem with your meter, lift system or account and our support team will follow up. You get a ticket number to quote when you call or write.',
      ],
      email: ['Customer care email (shown and receives tickets)', 'support@clickgroup.co.tz'],
      phone: ['Customer care phone (hidden when empty)', ''],
      product: ['Product dropdown', 'Product'],
      otherProduct: ['Last dropdown option', 'Other'],
      account: ['Meter or account number field', 'Meter or account number'],
      subject: ['Subject field', 'Subject'],
      description: ['Description field', 'Describe the problem'],
      send: ['Submit button', 'Submit ticket'],
      sending: ['Submit button while sending', 'Submitting…'],
      success: [
        'Success message ({ticket} is the ticket number)',
        'Ticket {ticket} received. Our customer care team will contact you soon.',
      ],
      successCopy: ['Added when a copy was emailed ({email})', 'A copy has been sent to {email}.'],
      errorSubject: ['Error: missing subject', 'Please add a short subject.'],
      errorDescription: ['Error: missing description', 'Please describe the problem.'],
      errorBusy: [
        'Error: too many tickets from one visitor',
        'You have sent several tickets in a short time. Please wait a while or email us directly.',
      ],
    },
  },
  notFound: {
    label: 'Page not found (404)',
    fields: {
      heading: ['Heading', 'Page not found'],
      text: ['Text', "The page you're looking for doesn't exist or has moved."],
      button: ['Button', 'Back to home'],
    },
  },
  general: {
    label: 'General',
    fields: {
      faqHeading: ['Default FAQ heading', 'Frequently asked questions'],
    },
  },
} as const

type Groups = typeof SITE_TEXT
export type SiteText = { [G in keyof Groups]: { [F in keyof Groups[G]['fields']]: string } }

/** Defaults merged with whatever the CMS has (empty CMS fields fall back to the default). */
export function resolveSiteText(cms?: Record<string, unknown> | null): SiteText {
  const out = {} as Record<string, Record<string, string>>
  for (const [group, def] of Object.entries(SITE_TEXT)) {
    const saved = (cms?.[group] ?? {}) as Record<string, unknown>
    out[group] = {}
    for (const [key, [, fallback]] of Object.entries(def.fields)) {
      const value = saved[key]
      out[group][key] = typeof value === 'string' && value.trim() ? value : fallback
    }
  }
  return out as SiteText
}

/** Replaces {name} in a label. */
export const fill = (label: string, vars: Record<string, string>) =>
  label.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? '')
