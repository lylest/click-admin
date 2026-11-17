# Click Group website

Next.js 16 + Payload CMS 3 (embedded in the same app), Tailwind CSS 4, SQLite.

- Website: http://localhost:3200
- CMS admin: http://localhost:3200/admin (create the first admin user on first visit)

## Getting started

```sh
cp .env.example .env      # then set PAYLOAD_SECRET
npm install
npm run dev -- --port 3200
```

On first start with an empty database the default content from `CONTENT.md`
(pages, solutions, news, navigation, footer, site settings) is loaded
automatically.

```sh
npm run seed              # add any missing default content
npm run seed:reset        # overwrite pages/solutions/news/globals with defaults
```

## How content is structured

| In the admin | What it controls |
|---|---|
| **Pages** | Page-builder pages. Slug `home` is `/`; others are `/<slug>` (about, contact…). Sections (hero, spotlight, stats, CTA…) can be added, removed and reordered. |
| **Solutions** | One entry per product → `/solutions/<slug>` (features, specs, FAQs, gallery, brochure). |
| **News** | Posts → `/news` and `/news/<slug>`. |
| **Media** | Images and PDFs. |
| **Inquiries** | Contact-form submissions. |
| **Site settings / Navigation / Footer** | Logo, contact details, social links, announcement bar, menu, footer columns. |

Edits show on the site immediately.

## Code map

- `src/collections`, `src/globals`, `src/blocks` — CMS schema
- `src/components/blocks` — one React component per page-builder block
- `src/app/(frontend)` — website routes; `src/app/(payload)` — admin & API
- `src/seed` — default content

After changing the schema run `npm run generate:types`.

## Before production

- Replace every `[PLACEHOLDER]` in the CMS (stats, phone, specs, testimonials, team).
- Upload the real logo in **Site settings** (a placeholder mark is shown until then).
- Set up an email adapter if inquiries should also be emailed (currently stored in the CMS only).
- Database: create migrations with `npm run payload migrate:create` and run
  `npm run payload migrate` on deploy (dev mode auto-syncs the schema; production does not).
