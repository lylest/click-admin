# Click Group website — rules

Next.js 16 + Payload CMS 3 (embedded), Tailwind 4, SQLite. See README.md for setup
and CONTENT.md for the agreed sections and default copy.

## Brand facts

- The company is **Click Group**. Never mention the old company name ("MBC",
  "MBC Landbrug", "formerly…", "rebranded") anywhere: copy, alt text, seeds, docs.
- Products: **Click Meter** (prepaid electricity, water and gas metering for
  landlords) and the **Mortuary Lift System**.
- English only. No public "check my meter" tool.
- Fonts: Bricolage Grotesque, Inter as fallback. Brand blue `#0070C0` (from the letterhead; see globals.css).

## Design rules: it must not look vibe-coded

The user has explicitly rejected these patterns. Do not add them, in any section,
even if a reference screenshot shows something similar.

**Never**
- Badge or eyebrow pill above a headline (e.g. "Engineered in Ifakara · Made in
  Tanzania"). Small uppercase labels above section headings count too.
- Floating pill labels or tags over photos (e.g. "Healthcare",
  "Electricity · Water · Gas").
- Decorative squiggles, blobs, sparkles, blurred glow circles, doodles.
  Exception the user asked for: the spotlight's flat, angular, light-tinted
  backdrop panel behind the photo (one per step). Keep it angular and flat.
  Also requested: the torn-paper edge on the Impact photo.
  And: "Who we serve" follows the client's screenshots exactly, so it is centred
  and has icons above its columns. A reference the client sends wins over these
  rules, except eyebrow pills and pill buttons, which they removed explicitly.
  Copy the reference closely; do not reinterpret it.
- Gradients: purple/blue, gradient hero text, gradient boxes as image stand-ins.
- Glassmorphism, coloured-border cards, low-contrast dark mode.
- Pill-shaped (rounded-full) buttons, arrows that spin or animate on hover,
  buttons that fade on hover. Buttons are rectangles with `rounded-lg`.
- Rows of 3–4 identical icon boxes; Lucide icon tiles as decoration. Use icons
  only where they carry meaning (phone, email, menu).
- Emoji in UI or headings.
- Ad-hoc animation: cursor effects, hover-lift cards, bouncing or looping motion.
  Scroll animation IS wanted (user request), but only through the shared Motion
  components below, with the same easing everywhere.
- Em dashes (—) in copy. Use full stops, commas or colons.
- Vague or buzzword copy ("smart technology that powers communities",
  "seamless", "cutting-edge", "locally engineered"). Say concretely what the
  product does and for whom.
- Fake or placeholder content on the live page: invented counters, metrics,
  reviews, partner logos, team members. If a real value is missing, hide the
  element (the CMS field stays) instead of showing `[XXX]`.
- AI-generated images or illustrated mock-ups standing in for photos. Use real
  photos only. The client loves photos.
- "Made with AI" tags or similar.
- Centred layouts. Section headings, intros, stats, CTA bands, page headers,
  empty states and the 404 page are left-aligned. Centre only tiny elements
  where it is functionally needed (e.g. an icon inside a button).
- A narrow, boxed-in container. "Too centred" from the user means too much empty
  space left and right. The `wrap` utility is max 1600px with 64px side padding
  (≈210px margins on a 1890px screen). 1280px was too narrow; 1920px with 80px
  padding was too wide. Do not change it without asking.

**Always**
- No horizontal scroll or mobile overflow; check at 390px and 1440px.
- Working links only: footer, nav, buttons. Every nav item points to real content.
- Clickable logo (home), clickable phone (`tel:`) and email (`mailto:`).
- Favicon, page titles, meta descriptions, custom 404, current copyright year.
- Privacy Policy and Terms pages exist before launch.
- Compressed images (seed images ≤ 2000px wide; served via next/image).
- Form success and error messages.
- Consistent spacing: sections use the `section` and `wrap` utilities.

## Components

- Interactive UI (accordion, dialog, tabs, dropdowns…) uses **shadcn/ui** in
  `src/components/ui/`, styled with the brand tokens. The user found plain native
  elements "too static": interactions should animate smoothly (open/close,
  state changes). This is not the banned decorative animation.
- Add shadcn components with `npx shadcn@latest add <name>` (components.json is
  set up) or by copying the source. Never run `shadcn init`: it overwrites the
  theme in globals.css. shadcn tokens (foreground, muted-foreground, border,
  ring…) are aliased to the brand palette in globals.css.
- `cn()` in `src/lib/utils.ts` is clsx + tailwind-merge.

## Motion (scroll animation)

- Library: Motion for React (`motion/react`, https://motion.dev/docs).
- Reusable components live in `src/components/motion/index.tsx`; use them, do not
  write one-off `motion.*` code in sections:
  - `<Reveal>` fade + slide up on enter (headings, text columns, CTA bands)
  - `<Stagger>` + `<StaggerItem>` grids and lists, one item after another
  - `<RevealImage>` photo frames (frame unclips, photo settles from slight zoom,
    then drifts inside the frame on scroll; `parallax={false}` for layered frames)
  - `<Parallax>` the scroll drift alone (inside masks, hero photos)
  - `<SplitHeading text>` inside every section `<h2>`: words rise with a slight tilt
  - `<ScrollFillText>` large statement text that darkens word by word on scroll
  - `<CountUp value>` stat numbers count up on view
  (Style from the client's MindBlossom reference, built with Motion, not GSAP.)
  - `<MotionProvider>` (in the frontend layout) honours OS reduced-motion.
- All reveal once on first view. `SectionHeading` already reveals itself.
- Never animate the hero on load: it hides the first paint until JS runs.
- Scroll-driven steps (spotlight): pin with CSS `sticky` + `useScroll`, never
  block or hijack the wheel. Desktop only (`lg:`); phones tap to switch.
  Clicking a step scrolls to its position so state and scroll stay in sync.

## Working on this repo

- Node is not on PATH: `export PATH=~/tools/node-v24.22.3-linux-x64/bin:$PATH`.
- Dev server: `npm run dev -- --port 3200`.
- Verify UI with headless Chrome screenshots at 1440px and 390px wide before
  saying a section is done.
- After schema changes: `npm run generate:types`, then `npx tsc --noEmit` and
  `npm run lint`.
- Default content lives in `src/seed/content.ts` (keep CONTENT.md in sync).
  `npm run seed:reset` overwrites pages, solutions, news and globals. Before
  running it, check via `/api/pages` that `updatedAt` matches the last seed,
  so editors' changes are not lost.
- Refine the site one section at a time, in page order, with the user.
