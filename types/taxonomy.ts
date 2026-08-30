import { z } from "zod";

/**
 * Controlled vocabularies shared by the database enums, the Zod schemas and the
 * filter UI. Adding a value here is the only place it needs to change.
 */

export const sectors = [
  "technology",
  "agriculture",
  "hospitality",
  "healthcare",
  "education",
  "manufacturing",
  "climate",
  "media",
  "creative",
  "other",
] as const;

export const stages = [
  "idea",
  "validation",
  "prototype",
  "mvp",
  "revenue",
  "growth",
] as const;

export const needs = [
  "capital",
  "co_founder",
  "partner",
  "talent",
  "expertise",
  "customers",
  "distribution",
  "technology",
  "operations",
  "acquisition",
] as const;

export const capitalBands = [
  "under_5l",
  "5l_25l",
  "25l_1cr",
  "1cr_plus",
] as const;

export const verificationKinds = [
  "identity",
  "company_registration",
  "revenue",
  "customers",
  "legal",
] as const;

/**
 * Deliberately granular. A single "verified" tick would imply the whole
 * opportunity is trustworthy, which is never what was actually checked.
 */
export const verificationStatuses = [
  "self_reported",
  "identity_verified",
  "profile_reviewed",
  "evidence_verified",
] as const;

export const activityStatuses = [
  "actively_looking",
  "exploring",
  "not_looking",
] as const;

export const roles = [
  "idea_owner",
  "founder",
  "investor",
  "partner",
  "talent",
  "advisor",
  "operator",
  "organization",
] as const;

export const sectorSchema = z.enum(sectors);
export const stageSchema = z.enum(stages);
export const needSchema = z.enum(needs);
export const capitalBandSchema = z.enum(capitalBands);
export const verificationKindSchema = z.enum(verificationKinds);
export const verificationStatusSchema = z.enum(verificationStatuses);
export const activityStatusSchema = z.enum(activityStatuses);
export const roleSchema = z.enum(roles);

export type Sector = z.infer<typeof sectorSchema>;
export type Stage = z.infer<typeof stageSchema>;
export type Need = z.infer<typeof needSchema>;
export type CapitalBand = z.infer<typeof capitalBandSchema>;
export type VerificationKind = z.infer<typeof verificationKindSchema>;
export type VerificationStatus = z.infer<typeof verificationStatusSchema>;
export type ActivityStatus = z.infer<typeof activityStatusSchema>;
export type Role = z.infer<typeof roleSchema>;

export const sectorLabels: Record<Sector, string> = {
  technology: "Technology",
  agriculture: "Agriculture",
  hospitality: "Hospitality",
  healthcare: "Healthcare",
  education: "Education",
  manufacturing: "Manufacturing",
  climate: "Climate",
  media: "Media",
  creative: "Creative",
  other: "Other",
};

export const stageLabels: Record<Stage, string> = {
  idea: "Idea",
  validation: "Validation",
  prototype: "Prototype",
  mvp: "MVP",
  revenue: "Revenue",
  growth: "Growth",
};

/** Ordinal position of each stage, for progress rendering. */
export const stageOrder: Record<Stage, number> = {
  idea: 0,
  validation: 1,
  prototype: 2,
  mvp: 3,
  revenue: 4,
  growth: 5,
};

export const needLabels: Record<Need, string> = {
  capital: "Capital",
  co_founder: "Co-founder",
  partner: "Partner",
  talent: "Talent",
  expertise: "Expertise",
  customers: "Customers",
  distribution: "Distribution",
  technology: "Technology",
  operations: "Operations",
  acquisition: "Acquisition",
};

export const capitalBandLabels: Record<CapitalBand, string> = {
  under_5l: "Under \u09f35L",
  "5l_25l": "\u09f35L\u2013\u09f325L",
  "25l_1cr": "\u09f325L\u2013\u09f31Cr",
  "1cr_plus": "\u09f31Cr+",
};

/** Inclusive lower bound, exclusive upper bound, in BDT. */
export const capitalBandRanges: Record<
  CapitalBand,
  { min: number; max: number | null }
> = {
  under_5l: { min: 0, max: 500_000 },
  "5l_25l": { min: 500_000, max: 2_500_000 },
  "25l_1cr": { min: 2_500_000, max: 10_000_000 },
  "1cr_plus": { min: 10_000_000, max: null },
};

export const verificationKindLabels: Record<VerificationKind, string> = {
  identity: "Identity",
  company_registration: "Company registration",
  revenue: "Revenue",
  customers: "Customers",
  legal: "Legal documents",
};

export const verificationStatusLabels: Record<VerificationStatus, string> = {
  self_reported: "Self-reported",
  identity_verified: "Identity verified",
  profile_reviewed: "Profile reviewed",
  evidence_verified: "Evidence verified",
};

export const activityStatusLabels: Record<ActivityStatus, string> = {
  actively_looking: "Actively looking",
  exploring: "Exploring",
  not_looking: "Not currently looking",
};

export const roleLabels: Record<Role, string> = {
  idea_owner: "Idea owner",
  founder: "Founder",
  investor: "Investor",
  partner: "Partner",
  talent: "Talent",
  advisor: "Advisor",
  operator: "Operator",
  organization: "Organization",
};

/**
 * The Explore "I'm looking for" facet is a coarser set than the full need
 * vocabulary, so it maps onto it rather than duplicating it.
 */
export const seekingFacets = [
  { value: "capital", label: "Investment" },
  { value: "co_founder", label: "Co-founder" },
  { value: "partner", label: "Partner" },
  { value: "talent", label: "Talent" },
  { value: "expertise", label: "Expertise" },
  { value: "acquisition", label: "Acquisition" },
] as const satisfies ReadonlyArray<{ value: Need; label: string }>;
