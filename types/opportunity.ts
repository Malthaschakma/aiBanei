import { z } from "zod";

import {
  activityStatusSchema,
  needSchema,
  roleSchema,
  sectorSchema,
  stageSchema,
  verificationKindSchema,
  verificationStatusSchema,
} from "./taxonomy";

/**
 * Every verification record names what was actually checked and by what means.
 * Rendering a bare tick without this context is not permitted.
 */
export const verificationSignalSchema = z.object({
  kind: verificationKindSchema,
  status: verificationStatusSchema,
  /** Plain-language statement of what was checked, shown to the user. */
  statement: z.string().min(1),
  verifiedAt: z.string().datetime().nullable(),
});

export const locationSchema = z.object({
  city: z.string().min(1),
  region: z.string().nullable(),
  country: z.string().min(1),
});

export const opportunityMetricsSchema = z.object({
  monthlyRevenueBdt: z.number().nonnegative().nullable(),
  monthlyGrowthPct: z.number().nullable(),
  customers: z.number().int().nonnegative().nullable(),
  teamSize: z.number().int().positive(),
  /** Capital the founding team has already put in, in BDT. */
  founderContributionBdt: z.number().nonnegative().nullable(),
  operatingSince: z.string().nullable(),
});

export const teamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  avatarUrl: z.string().nullable(),
  identityVerified: z.boolean(),
});

/**
 * Compatibility between a viewer's stated preferences and an opportunity.
 * Explicitly not a prediction of success — see `disclaimers.fitScore`.
 */
export const fitScoreSchema = z.object({
  overall: z.number().min(0).max(100),
  dimensions: z.object({
    sector: z.number().min(0).max(100),
    capital: z.number().min(0).max(100),
    stage: z.number().min(0).max(100),
    geography: z.number().min(0).max(100),
    strategic: z.number().min(0).max(100),
  }),
  /** Written in second person, describing the viewer's own preferences. */
  explanation: z.string().min(1),
});

export const readinessSignalSchema = z.object({
  label: z.string().min(1),
  /** 0-100 for how much evidence exists for this signal. */
  score: z.number().min(0).max(100),
  note: z.string().min(1),
});

/**
 * How prepared an opportunity is, measured by evidence assembled. Kept
 * structurally separate from Fit Score so the two can never be conflated.
 */
export const readinessSchema = z.object({
  score: z.number().min(0).max(100),
  label: z.enum([
    "Idea",
    "Validating",
    "Prototype",
    "MVP",
    "Revenue",
    "Investor Ready",
    "Growth",
  ]),
  signals: z.array(readinessSignalSchema),
});

export const useOfFundsSchema = z.object({
  label: z.string().min(1),
  percentage: z.number().min(0).max(100),
  detail: z.string().min(1),
});

export const opportunityUpdateSchema = z.object({
  date: z.string(),
  title: z.string().min(1),
  body: z.string().min(1),
});

export const opportunityQuestionSchema = z.object({
  question: z.string().min(1),
  answer: z.string().nullable(),
  askedBy: z.string().min(1),
  answeredAt: z.string().nullable(),
});

export const opportunitySchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  name: z.string().min(1),
  /** One line, sentence case, no buzzwords. Shown on the card and detail header. */
  summary: z.string().min(1).max(200),
  sector: sectorSchema,
  location: locationSchema,
  stage: stageSchema,
  needs: z.array(needSchema).min(1),
  activityStatus: activityStatusSchema,

  capitalSeekingBdt: z.number().nonnegative().nullable(),
  metrics: opportunityMetricsSchema,
  verification: z.array(verificationSignalSchema),
  readiness: readinessSchema,
  /** Null until a viewer with stated preferences is signed in. */
  fitScore: fitScoreSchema.nullable(),

  narrative: z.object({
    opportunity: z.string().min(1),
    whyNow: z.string().min(1),
    problem: z.string().min(1),
    solution: z.string().min(1),
    traction: z.string().min(1),
    businessModel: z.string().min(1),
    market: z.string().min(1),
    capital: z.string().min(1),
    whatWeNeed: z.string().min(1),
  }),
  useOfFunds: z.array(useOfFundsSchema),
  team: z.array(teamMemberSchema),
  updates: z.array(opportunityUpdateSchema),
  questions: z.array(opportunityQuestionSchema),

  publishedAt: z.string(),
  lastActiveAt: z.string(),

  /**
   * True for fixtures shipped with the repo. Drives the development-data
   * banner so demo records are never mistaken for real listings.
   */
  isDevData: z.boolean(),
});

export const personSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  name: z.string().min(1),
  headline: z.string().min(1),
  roles: z.array(roleSchema).min(1),
  location: locationSchema,
  avatarUrl: z.string().nullable(),
  activityStatus: activityStatusSchema,
  lookingFor: z.array(needSchema),
  canOffer: z.array(z.string()),
  verification: z.array(verificationSignalSchema),
  isDevData: z.boolean(),
});

export type VerificationSignal = z.infer<typeof verificationSignalSchema>;
export type OpportunityLocation = z.infer<typeof locationSchema>;
export type OpportunityMetrics = z.infer<typeof opportunityMetricsSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type FitScore = z.infer<typeof fitScoreSchema>;
export type ReadinessSignal = z.infer<typeof readinessSignalSchema>;
export type Readiness = z.infer<typeof readinessSchema>;
export type UseOfFunds = z.infer<typeof useOfFundsSchema>;
export type OpportunityUpdate = z.infer<typeof opportunityUpdateSchema>;
export type OpportunityQuestion = z.infer<typeof opportunityQuestionSchema>;
export type Opportunity = z.infer<typeof opportunitySchema>;
export type Person = z.infer<typeof personSchema>;

/** Card-sized projection. Keeps list payloads small. */
export type OpportunitySummary = Pick<
  Opportunity,
  | "id"
  | "slug"
  | "name"
  | "summary"
  | "sector"
  | "location"
  | "stage"
  | "needs"
  | "activityStatus"
  | "capitalSeekingBdt"
  | "metrics"
  | "verification"
  | "fitScore"
  | "lastActiveAt"
  | "isDevData"
>;
