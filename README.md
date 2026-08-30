# aibanei

**Let's build.**

Aibanei connects ideas with the people, expertise and capital needed to turn
them into real ventures. Ideas need people. People need capital. Capital needs
opportunities.

Aibanei means "let's build" in Chakma.

## Status

Phase 1 (foundation) is implemented: the design system, the public brand
experience, and the data and schema groundwork. Aibanei does not broker,
execute or facilitate investment transactions — it makes introductions, and any
deal happens between the parties themselves.

**All content currently in the app is fictional.** Every opportunity, person,
figure and verification record is invented for demonstration and is labelled as
such in the interface. See [Development data](#development-data).

### Built

- Homepage, `/explore` marketplace with URL-driven filters, opportunity detail
  pages, `/how-it-works`
- Designed empty states for `/people` and `/capital`
- Design tokens, component library, and Supabase schema with row-level security
- `/login` and `/signup`, intentionally inert until Supabase keys are supplied

### Not built

No dashboards, matching engine, messaging, data rooms, AI features, admin, or
payments.

## Getting started

Requires Node 20+ and npm.

```bash
npm install
npm run dev
```

The app runs fully without any environment variables. Open
[http://localhost:3000](http://localhost:3000).

### Connecting Supabase (optional)

Phase 1 needs no backend. To switch the data layer from fixtures to Supabase:

```bash
cp .env.example .env.local
```

Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, then
apply the migrations in `supabase/migrations/` in order. Every Supabase
accessor guards on missing keys and returns `null`, so a partial configuration
degrades rather than crashes.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run audit:ui` | Screenshot sweep at 360/768/1280/1440 with contrast, overflow, console-error and heading-order checks |
| `npm run audit:a11y` | Keyboard traversal, reduced-motion and no-JavaScript checks |

The audit scripts need a running server and accept `BASE_URL` (default
`http://localhost:3000`). They write to `screenshots/`, which is gitignored.

## Architecture

```
app/
  (marketing)/          public nav + footer
    page.tsx            homepage
    explore/            marketplace
    opportunities/[slug]/
    how-it-works/, people/, capital/
  (auth)/               login, signup
components/
  ui/                   primitives, styled against the design tokens
  marketing/            nav, footer, hero, network visual
  opportunities/, people/
lib/
  opportunities/        queries.ts — the single data seam
  dev-data/             clearly-marked fixtures
  supabase/             client, server and session helpers
types/, config/, hooks/, supabase/migrations/, scripts/
```

`lib/opportunities/queries.ts` is the only place that decides where data comes
from. Pages never import fixtures directly, so replacing development data with
live Supabase queries is a one-file change, and the fixtures already conform to
the same Zod schemas the database satisfies.

Design tokens live in `app/globals.css` as an `@theme inline` block. There is no
`tailwind.config.js` — Tailwind v4 is configured in CSS.

## Development data

`lib/dev-data/` contains 12 opportunities and 6 people set in Bangladesh, with
figures in BDT. They are realistic but entirely invented. Every record carries
`isDevData: true`, and a dismissible banner labels them wherever they are shown.

There are no fabricated testimonials, investors, or platform statistics
anywhere, and there must never be. Any figure the product displays is either
self-declared and labelled as such, or measured by the platform.

## Scores

Fit Score measures how well an opportunity matches a user's *stated*
preferences. Readiness measures how much evidence an opportunity has assembled.
Neither is investment advice, a valuation, or a prediction of success, and a low
Readiness means information is missing rather than that an idea is weak.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
shadcn/ui · Framer Motion · Zod · Supabase
