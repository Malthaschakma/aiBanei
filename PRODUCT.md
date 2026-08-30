# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who want to build a venture and the people a venture needs. A single
account can hold several of these identities at once, and they are not
permanent:

- **Idea owners** — have something in mind and need people and resources.
- **Founders** — are building and need capital, co-founders, partners or talent.
- **Investors** — have capital and stated preferences about where it goes.
- **Strategic partners** — offer distribution, manufacturing or commercial
  relationships.
- **Advisors** — have run this before and can advise the people doing it now.
- **Operators** — run the day-to-day of a business.
- **Talent** — want to put their experience behind something worth building.

The product must not force a person into one permanent role. Someone is often a
founder and an investor and an advisor simultaneously, and the interface should
treat that as normal rather than exceptional.

## Product Purpose

Aibanei connects ideas with the people, expertise and capital needed to turn
them into real ventures. The governing sentence: ideas need people, people need
capital, capital needs opportunities.

Success is a first-time visitor moving through four realisations in order —
"I understand what this is", then "I know what I can do here", then "I want to
see what people are building", then "I might actually find someone here". That
progression matters more than visual spectacle.

The product moves a user along a path: idea → people → conversation →
collaboration → deal → building. Progress along that path should be visible
rather than implied.

## Positioning

Aibanei matches on **stated compatibility**, not predicted outcome. Fit Score
measures how well an opportunity lines up with a user's declared interests,
capital range, sector and geography. It never expresses a probability of
success, a valuation, or investment advice, and the explanation of a score
always matters more than the number.

Readiness is a separate and deliberately distinct measure of how much evidence
an opportunity has assembled. A low Readiness means information is missing, not
that the idea is weak.

A neighbouring product could copy a percentage badge. It could not truthfully
copy the commitment that every score is explained in terms of the user's own
stated preferences, and that no score is ever a forecast.

## Operating Context

Aibanei is used at the point where someone decides whether to spend real time,
reputation or money on someone else's venture. Both sides are evaluating each
other:

- A founder publishes an opportunity, assembles evidence for it, and answers
  questions from people considering involvement.
- An investor, partner, advisor or operator scans opportunities, judges stage
  and evidence quality, and decides whether to open a conversation.
- Conversations move off the discovery surfaces into direct contact, and any
  actual deal is concluded between the parties themselves.

Sensitive material (financial detail, documents) is disclosed progressively
rather than published openly, gated behind an expression of interest.

## Capabilities and Constraints

**Terminology.** Opportunity, Fit Score, Readiness, Verification, stage
(idea, validation, prototype, MVP, revenue, growth), needs / "looking for"
(capital, co-founder, partner, talent, expertise, customers, distribution,
technology, operations, acquisition), activity status (actively looking,
exploring, inactive). Capital is expressed in BDT using lakh and crore bands.

**Built today.** Public homepage, Explore marketplace with URL-driven filters,
opportunity detail pages, a how-it-works explainer, designed empty states for
People and Capital, and a login/signup surface that is intentionally inert.

**Planned.** Onboarding, dashboard, matches, messaging, investor and founder
profiles, create-opportunity and opportunity-management flows.

**Later.** Validation, data rooms, deal rooms, pitch events.

**Aibanei never handles capital.** It does not broker, execute or facilitate
investment transactions, hold funds, or take a position in anything listed. It
makes introductions; the parties transact entirely off-platform. Nothing on the
site is an offer or solicitation to buy or sell securities.

**Technical constraints.** Next.js 16 App Router with React 19 and TypeScript
strict; Tailwind CSS v4 with CSS-first configuration and no `tailwind.config.js`;
shadcn/ui primitives; Supabase for data and auth, currently scaffolded with
migrations and client helpers but no keys, so every accessor must tolerate an
unconfigured backend; root-level `app/`, `components/`, `lib/` with no `src/`;
npm.

**Market.** Bangladesh and South Asia at launch, with global ambition. Currency,
geography and trust signals localize to Bangladesh for now; the interface should
not hard-code assumptions that make a later second market expensive.

## Brand Commitments

**Name.** `aibanei`, lowercase in the wordmark. **Display name** Aibanei.

**Tagline.** "Let's build."

**Origin.** Aibanei means "let's build" in Chakma. The cultural identity lives
in the name, the story and the philosophy. The interface itself must read as
globally contemporary. Aibanei is not a cultural organization, and ethnic
motifs must never be used as decoration.

**Personality.** Human, intelligent, ambitious, calm, trustworthy, curious,
premium, global, slightly playful, culturally grounded without being visually
folkloric.

**Voice.** Short, natural sentences addressed from intelligent humans to
intelligent humans. In register: "Find someone to build it with." "Looking for
capital?" "Something worth backing." "Who do you need?" "Tell us what you're
building." Out of register and forbidden: "unlock your entrepreneurial
potential", "revolutionary investment ecosystem", "AI-powered venture
acceleration platform", "leverage synergies", and any comparable marketing
abstraction.

**Visual authority.** The colour and type values in the original engineering
brief are explicitly **starting constraints, not binding commitments**. The user
has stated they would rather have a distinctive Aibanei visual language than a
technically correct site that follows a predetermined palette. Future visual
work may revise them where following them produces a generic result.

## Evidence on Hand

**There is no real content.** Every opportunity, person, figure, metric,
verification record and update currently in the product is invented for
demonstration. Fixtures live in `lib/dev-data/` (12 opportunities, 6 people),
each flagged `isDevData: true`, and are labelled in the interface by a
`DevDataBanner` wherever they appear.

Consequences for all future work:

- No real users, opportunities, investors or partners exist yet. Discovery
  surfaces must be designed for a cold-start marketplace, and empty states are
  primary states rather than edge cases.
- Never fabricate testimonials, customer logos, investor names, platform
  statistics, traction numbers, funding totals or investment performance.
- Any figure shown must be either self-declared and labelled as such, or
  measured by the platform. There is no third category.

Real assets that do exist: the wordmark and logo mark, the Chakma etymology,
and the product terminology above.

## Product Principles

1. **Compatibility, never prediction.** Every score describes fit against
   stated preferences or assembled evidence. Nothing forecasts success, values a
   business, or advises an investment.
2. **Verification states what was checked.** No generic "verified" badge. Each
   verification names the specific thing that was confirmed, when, and by what
   means — and verification is never an endorsement.
3. **Introductions, not transactions.** Aibanei's job ends at a good
   conversation between the right people. It never sits between them and their
   money.
4. **Roles are plural and fluid.** A person is a network member first and a
   role second. The product is a network of builders, not a set of isolated user
   types.
5. **Always answer "what can I do next?"** No passive surfaces. Every screen
   makes the next useful action available and makes progress along the
   idea-to-building path legible.

## Accessibility & Inclusion

Target WCAG 2.2 AA. Semantic HTML, full keyboard operability, visible focus,
sufficient contrast, accessible labels, honoured reduced-motion preferences, and
a logical heading hierarchy. Never rely on colour alone to carry meaning.

Mobile is not a shrunken desktop. Desktop supports serious evaluation
workflows; mobile prioritizes discovery, opportunities, matches, messages and
profiles, recomposing layouts where needed.
