import "server-only";

import { devOpportunities } from "@/lib/dev-data/opportunities";
import { devPeople } from "@/lib/dev-data/people";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type {
  Opportunity,
  OpportunitySummary,
  Person,
} from "@/types/opportunity";
import { capitalBandRanges, stageOrder } from "@/types/taxonomy";

import type { OpportunityFilters } from "./filters";

/**
 * The single seam between pages and the data source.
 *
 * Pages never import fixtures directly. When Supabase is configured these
 * functions will query it instead; the return types are the contract that
 * makes that swap a change to this file alone.
 */

/** Set once Supabase tables are populated. Until then fixtures are served. */
function shouldUseDevData(): boolean {
  return !isSupabaseConfigured();
}

function toSummary(opportunity: Opportunity): OpportunitySummary {
  const {
    id,
    slug,
    name,
    summary,
    sector,
    location,
    stage,
    needs,
    activityStatus,
    capitalSeekingBdt,
    metrics,
    verification,
    fitScore,
    lastActiveAt,
    isDevData,
  } = opportunity;

  return {
    id,
    slug,
    name,
    summary,
    sector,
    location,
    stage,
    needs,
    activityStatus,
    capitalSeekingBdt,
    metrics,
    verification,
    fitScore,
    lastActiveAt,
    isDevData,
  };
}

function matchesCapitalBand(
  amount: number | null,
  bands: OpportunityFilters["capital"],
): boolean {
  if (bands.length === 0) return true;
  if (amount === null) return false;

  return bands.some((band) => {
    const { min, max } = capitalBandRanges[band];
    return amount >= min && (max === null || amount < max);
  });
}

/**
 * Stand-in for PostgreSQL full-text search. When Supabase is wired up this is
 * replaced by a `websearch_to_tsquery` against the generated tsvector column.
 */
function matchesQuery(opportunity: Opportunity, query: string): boolean {
  const haystack = [
    opportunity.name,
    opportunity.summary,
    opportunity.sector,
    opportunity.location.city,
    opportunity.location.country,
    opportunity.narrative.problem,
    opportunity.narrative.solution,
  ]
    .join(" ")
    .toLowerCase();

  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

function hasEvidenceVerification(opportunity: Opportunity): boolean {
  return opportunity.verification.some(
    (signal) => signal.status === "evidence_verified",
  );
}

function sortOpportunities(
  items: Opportunity[],
  sort: OpportunityFilters["sort"],
): Opportunity[] {
  const sorted = [...items];

  switch (sort) {
    case "recent":
      return sorted.sort(
        (a, b) =>
          new Date(b.lastActiveAt).getTime() -
          new Date(a.lastActiveAt).getTime(),
      );
    case "capital":
      return sorted.sort(
        (a, b) => (b.capitalSeekingBdt ?? 0) - (a.capitalSeekingBdt ?? 0),
      );
    case "traction":
      return sorted.sort(
        (a, b) =>
          (b.metrics.monthlyRevenueBdt ?? 0) -
          (a.metrics.monthlyRevenueBdt ?? 0),
      );
    case "relevance":
    default:
      // Without a signed-in viewer there is no personal fit signal, so
      // relevance falls back to readiness and then to recency.
      return sorted.sort((a, b) => {
        const fitDelta = (b.fitScore?.overall ?? -1) - (a.fitScore?.overall ?? -1);
        if (fitDelta !== 0) return fitDelta;
        const readinessDelta = b.readiness.score - a.readiness.score;
        if (readinessDelta !== 0) return readinessDelta;
        return stageOrder[b.stage] - stageOrder[a.stage];
      });
  }
}

export async function listOpportunities(
  filters: OpportunityFilters,
): Promise<{ items: OpportunitySummary[]; total: number; usingDevData: boolean }> {
  const usingDevData = shouldUseDevData();
  const source = usingDevData ? devOpportunities : [];

  const filtered = source.filter((opportunity) => {
    if (filters.q && !matchesQuery(opportunity, filters.q)) return false;
    if (
      filters.seeking.length > 0 &&
      !filters.seeking.some((need) => opportunity.needs.includes(need))
    ) {
      return false;
    }
    if (
      filters.stages.length > 0 &&
      !filters.stages.includes(opportunity.stage)
    ) {
      return false;
    }
    if (
      filters.sectors.length > 0 &&
      !filters.sectors.includes(opportunity.sector)
    ) {
      return false;
    }
    if (!matchesCapitalBand(opportunity.capitalSeekingBdt, filters.capital)) {
      return false;
    }
    if (
      filters.countries.length > 0 &&
      !filters.countries.includes(opportunity.location.country)
    ) {
      return false;
    }
    if (filters.verifiedOnly && !hasEvidenceVerification(opportunity)) {
      return false;
    }
    if (
      filters.activeOnly &&
      opportunity.activityStatus !== "actively_looking"
    ) {
      return false;
    }
    return true;
  });

  const sorted = sortOpportunities(filtered, filters.sort);

  return {
    items: sorted.map(toSummary),
    total: sorted.length,
    usingDevData,
  };
}

export async function getOpportunityBySlug(
  slug: string,
): Promise<Opportunity | null> {
  const source = shouldUseDevData() ? devOpportunities : [];
  return source.find((opportunity) => opportunity.slug === slug) ?? null;
}

export async function listOpportunitySlugs(): Promise<string[]> {
  const source = shouldUseDevData() ? devOpportunities : [];
  return source.map((opportunity) => opportunity.slug);
}

/** Highest-readiness records with verified evidence, for the homepage. */
export async function listFeaturedOpportunities(
  limit = 3,
): Promise<{ items: OpportunitySummary[]; usingDevData: boolean }> {
  const usingDevData = shouldUseDevData();
  const source = usingDevData ? devOpportunities : [];

  const items = [...source]
    .filter(hasEvidenceVerification)
    .sort((a, b) => b.readiness.score - a.readiness.score)
    .slice(0, limit)
    .map(toSummary);

  return { items, usingDevData };
}

export async function listPeople(
  limit?: number,
): Promise<{ items: Person[]; usingDevData: boolean }> {
  const usingDevData = shouldUseDevData();
  const source = usingDevData ? devPeople : [];
  return {
    items: limit ? source.slice(0, limit) : source,
    usingDevData,
  };
}

/** Distinct countries present in the current corpus, for the geography facet. */
export async function listCountries(): Promise<string[]> {
  const source = shouldUseDevData() ? devOpportunities : [];
  return [...new Set(source.map((o) => o.location.country))].sort();
}
