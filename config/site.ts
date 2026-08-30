/**
 * Single source of truth for brand strings, navigation and microcopy.
 * Copy lives here rather than inline so tone stays consistent across surfaces.
 */

export const siteConfig = {
  name: "aibanei",
  displayName: "Aibanei",
  tagline: "Let's build.",
  /** "Let's build" in Chakma. */
  etymology: "Aibanei means \u201clet\u2019s build\u201d in Chakma.",
  description:
    "Your idea needs more than an idea. Find the people, partners, expertise and capital to turn it into something real.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aibanei.com",
  messages: {
    ideasNeedMore: "Ideas need more than ideas.",
    findYourPeople: "Find your people. Build your thing.",
    bringAnIdea: "Bring an idea. Find the people who can build it.",
    joinCta: "Join Aibanei",
  },
} as const;

export const mainNav = [
  { title: "Explore", href: "/explore" },
  { title: "People", href: "/people" },
  { title: "Capital", href: "/capital" },
  { title: "How it works", href: "/how-it-works" },
] as const;

export const footerNav = [
  {
    title: "Discover",
    links: [
      { title: "Explore opportunities", href: "/explore" },
      { title: "People", href: "/people" },
      { title: "Capital", href: "/capital" },
      { title: "How it works", href: "/how-it-works" },
    ],
  },
  {
    title: "Build",
    links: [
      { title: "Share an opportunity", href: "/signup" },
      { title: "Find a co-founder", href: "/explore?looking_for=co_founder" },
      { title: "Find capital", href: "/explore?looking_for=capital" },
      { title: "Find a partner", href: "/explore?looking_for=partner" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/how-it-works" },
      { title: "Log in", href: "/login" },
      { title: "Create account", href: "/signup" },
    ],
  },
] as const;

/**
 * Shown wherever a Fit Score or Readiness Score is surfaced. Aibanei does not
 * offer investment advice and these scores must never read as a recommendation.
 */
export const disclaimers = {
  scores:
    "Fit Score and Readiness measure compatibility and preparedness. They are not investment advice, a valuation, or a prediction of success.",
  fitScore:
    "Fit Score measures how well an opportunity matches your stated preferences. It says nothing about the likelihood of success.",
  readiness:
    "Readiness reflects how much evidence an opportunity has assembled so far. A low score means information is missing, not that the idea is weak.",
  verification:
    "Each verification states exactly what was checked. Verification is not an endorsement.",
} as const;
