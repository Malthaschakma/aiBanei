import {
  capitalBandSchema,
  needSchema,
  sectorSchema,
  stageSchema,
  type CapitalBand,
  type Need,
  type Sector,
  type Stage,
} from "@/types/taxonomy";

export type SortKey = "relevance" | "recent" | "capital" | "traction";

export type OpportunityFilters = {
  q: string | null;
  seeking: Need[];
  stages: Stage[];
  sectors: Sector[];
  capital: CapitalBand[];
  countries: string[];
  verifiedOnly: boolean;
  activeOnly: boolean;
  sort: SortKey;
};

export const emptyFilters: OpportunityFilters = {
  q: null,
  seeking: [],
  stages: [],
  sectors: [],
  capital: [],
  countries: [],
  verifiedOnly: false,
  activeOnly: false,
  sort: "relevance",
};

/** Next passes repeated params as arrays and single params as strings. */
type RawParams = Record<string, string | string[] | undefined>;

function toArray(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  const parts = Array.isArray(value) ? value : [value];
  return parts.flatMap((part) => part.split(",")).filter(Boolean);
}

/**
 * Parses URL search params into filter state, silently discarding values that
 * are not in the taxonomy. A hand-edited URL should never throw.
 */
export function parseFilters(params: RawParams): OpportunityFilters {
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const sortRaw = typeof params.sort === "string" ? params.sort : "";
  const sort: SortKey = (
    ["relevance", "recent", "capital", "traction"] as const
  ).includes(sortRaw as SortKey)
    ? (sortRaw as SortKey)
    : "relevance";

  return {
    q: q.length > 0 ? q : null,
    seeking: toArray(params.looking_for).filter(
      (v): v is Need => needSchema.safeParse(v).success,
    ),
    stages: toArray(params.stage).filter(
      (v): v is Stage => stageSchema.safeParse(v).success,
    ),
    sectors: toArray(params.sector).filter(
      (v): v is Sector => sectorSchema.safeParse(v).success,
    ),
    capital: toArray(params.capital).filter(
      (v): v is CapitalBand => capitalBandSchema.safeParse(v).success,
    ),
    countries: toArray(params.country),
    verifiedOnly: params.verified === "1",
    activeOnly: params.active === "1",
    sort,
  };
}

export function countActiveFilters(filters: OpportunityFilters): number {
  return (
    filters.seeking.length +
    filters.stages.length +
    filters.sectors.length +
    filters.capital.length +
    filters.countries.length +
    (filters.verifiedOnly ? 1 : 0) +
    (filters.activeOnly ? 1 : 0) +
    (filters.q ? 1 : 0)
  );
}

const paramKeys = {
  seeking: "looking_for",
  stages: "stage",
  sectors: "sector",
  capital: "capital",
  countries: "country",
} as const;

/**
 * Rebuilds the query string with one facet value toggled. Filter links are
 * plain hrefs so the page stays a Server Component and results stay shareable.
 */
export function toggleFilterHref(
  filters: OpportunityFilters,
  facet: keyof typeof paramKeys,
  value: string,
): string {
  const current = filters[facet] as string[];
  const next = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];

  return buildHref({ ...filters, [facet]: next } as OpportunityFilters);
}

export function toggleBooleanHref(
  filters: OpportunityFilters,
  key: "verifiedOnly" | "activeOnly",
): string {
  return buildHref({ ...filters, [key]: !filters[key] });
}

export function setSortHref(
  filters: OpportunityFilters,
  sort: SortKey,
): string {
  return buildHref({ ...filters, sort });
}

export function buildHref(filters: OpportunityFilters): string {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  for (const [facet, key] of Object.entries(paramKeys)) {
    const values = filters[facet as keyof typeof paramKeys] as string[];
    for (const value of values) params.append(key, value);
  }
  if (filters.verifiedOnly) params.set("verified", "1");
  if (filters.activeOnly) params.set("active", "1");
  if (filters.sort !== "relevance") params.set("sort", filters.sort);

  const query = params.toString();
  return query ? `/explore?${query}` : "/explore";
}
