# Click Group — Website Sections & Default Content

> **Purpose.** This file defines every section of the Click Group website, the
> fields each section exposes in the headless CMS, and the **default content**
> that ships with the site. Editors can change all of it later from the CMS.
>
> **Conventions**
> - `[BRACKETS]` = placeholder that needs a real value before launch (numbers,
>   names, phone, photos). Don't publish invented figures.
> - Each section lists its **CMS fields** first, then **Default content**.
> - "Repeatable" = a list the editor can add / remove / reorder.
> - Every page also has an **SEO** group: `metaTitle`, `metaDescription`, `ogImage`.

---

## 0. Company background (reference, not a page section)

| | |
|---|---|
| Current name | **Click Group** |
| Headquarters | Goba, Dar es Salaam, Tanzania |
| Domain | clickgroup.co.tz |
| Status | Private, accelerator/incubator backed |
| Industries | Machinery (B2B), Medical supplies, Utility technology |

**Product lines**

1. **Mortuary Lift System** (our first product) — remote-controlled
   hydraulic lift for moving bodies in morgues. Corrosion-resistant,
   sanitizable materials; precise vertical and horizontal movement. Removes
   manual lifting, reducing musculoskeletal injuries among hospital and
   mortuary staff.
2. **Click Meter** — prepaid smart-metering platform for **electricity, water
   and gas**. Landlords and property managers install sub-meters per tenant;
   tenants buy tokens via mobile money (LipaPay), receive STS tokens by SMS, and
   landlords track usage, sales and debts from a web dashboard.

---

## 1. Global settings (single type)

**CMS fields:** `siteName`, `tagline`, `logo`, `logoDark`, `favicon`,
`contactEmail`, `phone`, `whatsapp`, `address`, `mapEmbedUrl`, `socialLinks`
(repeatable: `platform`, `url`), `announcementBar` (`enabled`, `text`, `link`).

**Default content**

- **Site name:** Click Group
- **Tagline:** Engineering practical solutions for Africa's hospitals and homes.
- **Email:** info@clickgroup.co.tz
- **Phone / WhatsApp:** [+255 XXX XXX XXX]
- **Address:** Goba, Dar es Salaam, Tanzania
- **Announcement bar:** *off* — sample text: "Click Meter now supports water
  and gas meters → Learn more"

---

## 2. Navigation (single type)

**CMS fields:** `items` (repeatable: `label`, `url`, `children` repeatable),
`ctaButton` (`label`, `url`).

**Default content**

- Home → `/`
- About → `/about`
- Solutions ▾
  - Click Meter → `/solutions/click-meter`
  - Mortuary Lift System → `/solutions/mortuary-lift`
- News → `/news`
- Contact → `/contact`
- **CTA button:** "Get a Quote" → `/contact`

---

## 3. Home page

The home page is a **dynamic zone**: editors can reorder, hide or add any of the
sections below.

### 3.1 Hero

**CMS fields:** `eyebrow`, `heading`, `subheading`, `primaryCta` (label, url),
`secondaryCta` (label, url), `highlights` (repeatable), `image` (main photo),
`secondaryImage`, `inset` (image, title, text), `tags` (up to 3 floating
labels), `stat` (value, label).

**Default content**

- **Eyebrow:** *(none)*
- **Heading:** Prepaid meters for landlords. Lifting equipment for hospitals.
- **Subheading:** Click Group is an engineering company in Ifakara, Tanzania.
  We build two products: one that makes utility billing fair for property
  owners and tenants, and one that keeps hospital staff from injuring
  themselves at work.
- **Primary CTA:** See our products → `#solutions` (no secondary button)
- **Points under the button:**
  - Click Meter → `/solutions/click-meter`: Tenants buy electricity, water and
    gas tokens with mobile money.
  - Mortuary Lift System → `/solutions/mortuary-lift`: Staff move bodies by
    remote control instead of lifting by hand.
- **Photo labels:** *(none)*
- **Main photo** (back, tilted +4°): health worker in teal scrubs
  (`src/seed/images/hero-doctor.jpg`)
- **Second photo** (front, tilted −5°): woman at home using her phone
  (`hero-woman-phone.jpg`)
- **Quote card** (overlaps both photos): "No health worker should injure
  themselves lifting a body by hand." / Our mission"
- **Stat:** hidden until a real figure is entered
- **Background:** warm cream `#FAF7F2`

### 3.2 Trust strip / Partners

**CMS fields:** `heading`, `logos` (repeatable: `name`, `image`, `url`).

**Default content**

- **Heading:** Backed and trusted by
- **Logos:** [Accelerator/incubator name], [Partner hospital], [LipaPay],
  [Other partners]

### 3.3 About intro (Text + accordion block)

**CMS fields:** `headingMuted` (grey part), `heading` (dark part), `body`,
`linkCard` (lead, title, url, image), `items` (repeatable: icon, title, text;
the first starts open, one open at a time).

**Default content**

- **Heading:** *(grey)* We started with one problem in hospitals. *(dark)* Now
  we solve two.
- **Body:** Our first product came from one problem: mortuary staff injuring
  their backs lifting bodies by hand. We then applied the same approach to
  utility billing, where landlords chase payments and tenants dispute their
  bills.
- **Link card:** "Learn more about our story" / How Click Group started →
  `/about` (thumbnail: hero doctor photo until a team photo exists)
- **Accordion**
  1. **Mortuary Lift System:** A remote-controlled hydraulic lift that moves
     bodies up, down and across, so staff no longer lift by hand. Built from
     corrosion-resistant materials that are easy to clean.
  2. **Click Meter:** Prepaid meters for electricity, water and gas, one per
     rental unit. Tenants pay with mobile money and get their token by SMS.
     Landlords see every payment online.
  3. **Based in Dar es Salaam:** Our head office is in Goba, Dar es Salaam, Tanzania.
     Get in touch to arrange a demo or a quote for your property or hospital.

### 3.4 Our products (Photo grid + slideshow block)

**CMS fields:** `heading`, `intro`, `slides` (image, title, text, button;
rotates every 6 s, pauses on hover), `cards` (type fact / photo / feature,
label, value, text, image, button).

**Default content**

- **Heading:** Our products
- **Intro:** Click Meter for property owners and tenants. The Mortuary Lift
  System for hospitals.
- **Slide 1:** tenant at home photo (`solutions-tenant-home.jpg`). Click Meter:
  Prepaid electricity, water and gas for rental homes. Tenants top up with
  mobile money and get their token by SMS. → Explore Click Meter
- **Slide 2:** *(placeholder: hero doctor photo, needs a real healthcare or
  lift photo)* Mortuary Lift System: A remote-controlled hydraulic lift, so
  hospital staff never have to lift a body by hand. → Explore the lift
- **Fact card:** One meter platform / Electricity, water and gas / Each rental
  unit gets its own prepaid meter, topped up with mobile money.
- **Photo card:** apartment building (`solutions-apartments.jpg`)
- **Feature card:** landlord photo (`solutions-landlord-dashboard.jpg`). For
  landlords / See every payment without chasing tenants. / Sales, usage and
  debts for each property in one web dashboard. → How Click Meter works
- **Click Meter product image** (solution page): prepaid meter with keypad
  (`click-meter-prepaid-meter.jpg`)

### 3.5 Product spotlight — Click Meter

Selectable feature list on a vertical rail (shadcn Tabs); the selected feature
opens its description and crossfades the photo. On desktop the section pins while
scrolling and each scroll step advances one feature (70vh per step). The photo sits
smaller on an angular light-tinted panel whose colour and shape change per step. **CMS fields:** `heading`,
`body`, `image` (fallback), `features` (title, text, image), `cta`.

- **Heading:** Prepaid utilities without the disputes
- **Body:** Stop chasing tenants for bills. Every unit gets its own prepaid
  meter, every payment is recorded, and every token is delivered in seconds.
- **Features → photo**
  - Electricity, water and gas: One platform for all your meters. → prepaid meter
  - Pay with mobile money: Tenants pay via LipaPay using a control number. →
    hands with phone
  - Instant tokens by SMS: STS tokens are generated automatically and sent by
    SMS. → women in kitchen (`click-meter-tenant-kitchen.jpg`)
  - Landlord dashboard: See sales, usage, debts and reports for each
    property. → man on laptop (`click-meter-landlord-laptop.jpg`)
  - Debt recovery: Recover outstanding balances gradually from token sales. →
    landlord with tablet
- **CTA:** Request a demo → `/contact?product=click-meter`

### 3.6 Product spotlight — Mortuary Lift System

Same scroll-step design as Click Meter (3.5), mirrored: photo on the left on the
coloured panel (its colours start at a different point so the two sections do
not match), heading, text and the five benefits on the right.

- **Heading:** No more lifting by hand
- **Body:** Moving bodies manually is one of the leading causes of back injury
  among mortuary and nursing staff. Our hydraulic lift does the heavy work while
  staff guide it by remote control.
- **Benefits:** Remote-controlled; Hygienic by design; Fewer injuries; Lower
  long-term cost; Dignified handling (texts from the product).
- **Photo:** stand-in (health worker). Wanted: one photo per benefit, ideally
  of the real lift; add them per feature in the CMS.
- **CTA:** Request a quote → `/contact?product=mortuary-lift`

### 3.7 How it works (removed)

Removed from the home page at the client's request (2026-11-17). The `steps`
block still exists in the CMS if it is ever needed again.

### 3.8 Impact

Photo with a torn-paper edge on the left; heading, text, button and up to
three numbers on the right (client reference). **CMS fields:** `heading`,
`intro`, `image`, `cta`, `stats` (value, label). A value in [brackets] is a
placeholder and is hidden on the site; if no numbers are real, the row is hidden.

- **Heading:** Built around the people who use it
- **Text:** Tenants who want to pay only for what they use. Landlords who want
  every payment recorded. Mortuary staff who should never have to lift a body
  by hand. We design, install and support every system ourselves, from our base
  in Ifakara.
- **Button:** More about us → `/about`
- **Photo:** man in an office (`impact-team-office.jpg`); swap for a real team photo.
- **Numbers (to provide):** meters installed, tokens delivered, healthcare
  facilities equipped.

### 3.9 Who we serve

Follows the "Powered by People" section on kindact.webflow.io. Desktop: the
section pins on a large, clear, full-width photo; scrolling raises a teal layer
from the bottom while the photo zooms in slightly, then the centred content
(heading, intro, icon columns with thin dividers, button) slides up from the
bottom edge and holds before the page moves on. Solid teal below. Phones: photo on top, content
below, no scroll effects. **CMS fields:** `heading`, `intro`, `image` (wide,
2000px+), `cards` (icon, title, text; three reads best), `cta`.

- **Heading:** Who we serve
- **Intro:** Two products, built for the people who use them every day.
- **Columns**
  - Landlords and property managers (building icon): Every unit on its own
    prepaid meter. See each payment online and recover debts without collecting cash.
  - Tenants (home icon): Pay only for what you use. Top up electricity, water or
    gas from your phone whenever you need to.
  - Hospitals and health centres (hospital icon): A remote-controlled lift for
    the mortuary, so staff no longer move bodies by hand.
- **Button:** Talk to us → `/contact`
- **Photo:** wide crop of the kitchen photo (`serve-kitchen-wide.jpg`), a stand-in.
  Replace with a wide group photo.

### 3.10 Testimonials

**CMS fields:** `heading`, `items` (repeatable: `quote`, `name`, `role`,
`organization`, `photo`).

**Default content** — ⚠ sample only; replace with real, approved quotes

- "[Quote from a landlord using Click Meter.]" — [Name], Landlord, [Town]
- "[Quote from mortuary/nursing staff using the lift.]" — [Name], [Role],
  [Hospital]

### 3.11 Latest news

Featured post (large card, photo on top, "Read article" button) on the left,
the next three posts as compact cards (square photo left) on the right.
Cards show author and date only. **CMS fields:** `heading`, `intro`, `count`
(default 4). Posts need a cover image and an author.

- **Heading:** News and updates
- **Intro:** Product news and guides from the Click Group team.
- **Default posts** (author "Click Group team"):
  - Introducing Click Meter: prepaid utilities for rental properties (apartment tower)
  - How tenants buy a token with mobile money (hands with phone)
  - What landlords see on the Click Meter dashboard (man with laptop)
  - Why manual lifting in mortuaries has to end (health worker; swap for a real
    mortuary or lift photo when available)

### 3.11b FAQ

Heading, intro and a two-part button (arrow tile + label) on the left; the
questions in a white card on the right (shadcn Accordion, first open, plus turns
into minus). Same layout on product pages. Answers in [brackets] are hidden.
**CMS fields:** `heading`, `intro`, `cta`, `items` (question, answer).

- **Heading:** Frequently asked questions
- **Intro:** Short answers about Click Meter and the Mortuary Lift System. If
  your question is not here, ask us directly.
- **Button:** Ask a question → `/contact`
- **Questions:** how tenants buy tokens; several properties in one account;
  tenant debts; what the Mortuary Lift System is; where Click Group is based;
  how to get a quote (full answers in `src/seed/content.ts`).

### 3.12 Call to action band

Now part of the footer (section 8), so it appears on every page except Contact.
The `cta` page block still exists but is no longer used in the defaults.

## 4. About page

Rebuilt (2026-11-18) from section styles already approved on the home page. No
eyebrow labels, icon boxes or placeholders on the live page.

1. **Hero** (same block as the home hero): "Engineering for hospitals and homes,
   from Ifakara." Text on the two products; button "See our products" →
   `/#solutions`; points "Our story" → `#story` and "How we work" →
   `#how-we-work`; photos: man in office + prepaid meter; quote card "Safe work
   for hospital staff. Fair bills for tenants." (What we believe).
2. **How Click Group started** (`stats` block, torn-edge photo, anchor `story`):
   the mortuary problem, the lift, accelerator backing, then Click Meter.
   Button: See the Mortuary Lift System. No numbers until real ones exist.
3. **What drives us** (`cards` block, pinned photo section like "Who we
   serve", anchor `values`): mission line, then Safety first, Built for here,
   Transparency, Dignity. Photo: wide crop of the apartment building.
4. **How we work** (`steps` block, numbered list with rules, anchor
   `how-we-work`): Understand the site; Design and build; Install; Support.
5. **Team**: hidden until members have real names (and ideally photos).

Removed: the timeline (every year was "[Year]"; add it back once the founding
and launch years are known) and the mission/vision cards.

## 5. Products collection (one entry per product → its own page)

**Page layout** (2026-11-18, after the LearnBuddy template the client shared):
1. Hero in a large rounded cream panel: breadcrumb, tagline as the heading,
   short description, "Request a demo" + "How it works"; large photo
   (`heroImage`) with a smaller overlapping photo (`heroSecondaryImage`).
2. "What <product> does": overview text, then the features as photo cards
   (each feature has an optional `image`; five = three, then two).
3. "How it works" (`journeys`, max 2): a wide photo with a white card of
   numbered steps on top. Click Meter: one for tenants (card right), one for
   landlords (card left).
4. Specifications (placeholder values hidden) and "Who it's for".
5. "<product> news and guides": latest 3 posts in `newsCategory`.
6. FAQs (placeholder answers hidden). The footer carries the call to action.

Click Meter photos: woman with phone (hero) + meter; features: meter, phone,
kitchen, man on laptop, apartment building; panels: wide kitchen crop, wide
crop of the man with glasses. The lift has no photos yet, so its page shows
text-only cards and no panels.


**CMS fields:** `name`, `slug`, `shortDescription`, `heroImage`, `gallery`,
`overview` (rich text), `features` (repeatable), `specs` (repeatable:
`label`, `value`), `useCases` (repeatable), `faqs` (repeatable: `question`,
`answer`), `brochure` (file), `ctaLabel`, `order`.

### 5.1 Click Meter — `/solutions/click-meter`

- **Short description:** Prepaid smart metering for electricity, water and gas.
- **Specs** (sample)
  - Utilities: Electricity, water, gas
  - Token standard: STS
  - Payment: Mobile money via LipaPay control number
  - Token delivery: SMS
  - Management: Web dashboard (landlords, meters, sales, debts, reports)
- **FAQs**
  - *How do tenants buy tokens?* Through mobile money using the control number
    provided, and the token is sent by SMS automatically.
  - *Can I manage several properties?* Yes, all properties and meters are
    managed from one dashboard.
  - *What if a tenant owes money?* Debts can be recorded and recovered
    automatically from future token purchases.
  - *Do you install the meters?* [Yes — confirm installation coverage area.]

### 5.2 Mortuary Lift System — `/solutions/mortuary-lift`

- **Short description:** Remote-controlled hydraulic lifting for safe,
  dignified mortuary handling.
- **Specs** (sample — ⚠ fill with real values)
  - Load capacity: [XXX kg]
  - Lift range: [XXX – XXX mm]
  - Control: Wireless remote
  - Materials: Corrosion-resistant, sanitizable [stainless steel?]
  - Power: [Voltage / battery]
- **FAQs**
  - *Does it fit existing mortuary cabinets?* [Answer.]
  - *Is training included?* [Answer.]
  - *What maintenance is required?* [Answer.]
  - *Is there a warranty?* [Answer.]

---

## 6. News collection — `/news`, `/news/[slug]`

**CMS fields:** `title`, `slug`, `excerpt`, `coverImage`, `body` (rich text),
`category` (Company, Click Meter, Healthcare), `publishedAt`, `author`.

**Default sample posts**

1. **Safer mortuaries, healthier staff** — How our lift system is changing
   daily work at [hospital name].
2. **Introducing Click Meter** — Prepaid electricity, water and gas billing for
   landlords, with mobile-money payments and instant SMS tokens.
3. **Why manual lifting in mortuaries has to end** — The hidden cost of
   musculoskeletal injuries for healthcare workers.

---

## 7. Contact page — `/contact`

**CMS fields:** `heading`, `text`, `formInterests` (repeatable options),
`offices` (repeatable: `name`, `address`, `phone`, `email`, `hours`), `map`.

**Default content**

- **Heading:** Let's talk
- **Text:** Tell us what you need and our team will get back to you within one
  business day.
- **Form fields:** Name, Phone, Email, Organization, I'm interested in
  (Click Meter / Mortuary Lift System / Partnership / Other), Message.
- **Office:** Head Office — Goba, Dar es Salaam, Tanzania · [phone] ·
  info@clickgroup.co.tz · Mon–Fri 08:00–17:00
- **Success message:** Thank you! We've received your message and will be in
  touch soon.

Form submissions are stored in the CMS (`Inquiries` collection) and emailed to
`contactEmail`.

---

## 8. Footer (single type)

Follows the client reference: a large call to action, a full-width rule, then
logo + about + social icons on the left and link columns + contact on the
right, split by a vertical rule; copyright bar at the bottom.

- **Call to action:** "Tell us about your property or your hospital." button
  "Get a quote" → `/contact`. Hidden on `/contact`; on a product page it links
  to `/contact?product=<slug>`.
- **About:** Click Group builds prepaid utility metering for property owners and
  lifting equipment for hospital mortuaries, from Ifakara, Tanzania.
- **Columns:** Solutions (Click Meter, Mortuary Lift System); Company (Home,
  About, News, Contact).
- **Contact column:** address, email and phone from Settings. Values in
  [brackets] are placeholders and are hidden, line by line.
- **Social icons:** from Settings → social links (and WhatsApp). None yet, so hidden.
- **Legal links:** empty until the Privacy Policy and Terms pages exist.
- **Copyright:** © {year} Click Group. All rights reserved.
- **Not built:** the newsletter email box from the reference (there is no
  newsletter yet; add it when there is one).

## 9. Decisions

- **Brand:** Click Group only. The old company name is never mentioned anywhere
  on the site.
- **Language:** English only for now (no i18n setup).
- **Meter lookup:** No public "Check my meter" tool on the site.
- **Typography** (matching the Astroship reference):
  - Headings and body: **Bricolage Grotesque** (variable)
  - Fallback: **Inter** (variable), then system sans-serif
  - Both are loaded with `next/font/google`.

## 10. Still to provide

1. Real stats, partner logos, testimonials and team photos.
2. Lift specs (capacity, lift range, power, materials).
3. Timeline years for the About page.
4. Phone number, street address and the landlord dashboard URL.

## Site text (CMS global, added 2026-11-18)

Every fixed label on the site is editable under **Site text** in the admin:
product page headings and buttons, news labels and the News page header, the
footer "Contact" heading, contact form labels and error messages, the 404 page
and the default FAQ heading. Defaults live in `src/lib/siteText.ts`; an empty
field falls back to its default. `{name}` is replaced with the product name.
