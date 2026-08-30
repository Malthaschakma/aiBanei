import { Search, SlidersHorizontal } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { DevDataBanner } from "@/components/dev-data-banner";
import { FilterPanel } from "@/components/opportunities/filter-panel";
import { MobileFilterSheet } from "@/components/opportunities/mobile-filter-sheet";
import { OpportunityCard } from "@/components/opportunities/opportunity-card";
import { SortSelect } from "@/components/opportunities/sort-select";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/ui/section";
import { disclaimers } from "@/config/site";
import {
  countActiveFilters,
  parseFilters,
  setSortHref,
  type SortKey,
} from "@/lib/opportunities/filters";
import { listCountries, listOpportunities } from "@/lib/opportunities/queries";

export const metadata: Metadata = {
  title: "Explore opportunities",
  description:
    "Businesses and ideas looking for capital, co-founders, partners, talent and expertise. Filter by stage, sector, capital and geography.",
  alternates: { canonical: "/explore" },
};

export default async function ExplorePage({
  searchParams,
}: PageProps<"/explore">) {
  const params = await searchParams;
  const filters = parseFilters(params);

  const [{ items, total, usingDevData }, countries] = await Promise.all([
    listOpportunities(filters),
    listCountries(),
  ]);

  const activeCount = countActiveFilters(filters);
  const sortHrefs = Object.fromEntries(
    (["relevance", "recent", "capital", "traction"] as SortKey[]).map((key) => [
      key,
      setSortHref(filters, key),
    ]),
  ) as Record<SortKey, string>;

  return (
    <Container size="wide" className="py-10">
      <header className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-display-xs text-foreground font-semibold tracking-tight">
            Explore opportunities
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
            Businesses and ideas currently looking for capital, co-founders,
            partners, talent or expertise.
          </p>
        </div>

        {/* Plain GET form: search works without JavaScript and the result is
            a shareable URL rather than transient client state. */}
        <form
          action="/explore"
          method="GET"
          role="search"
          className="flex max-w-xl gap-2"
        >
          <div className="relative flex-1">
            <Search
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
              aria-hidden
            />
            <Input
              type="search"
              name="q"
              defaultValue={filters.q ?? ""}
              placeholder="Search opportunities, sectors or places"
              aria-label="Search opportunities"
              className="pl-9"
            />
          </div>
          <Button type="submit" variant="outline">
            Search
          </Button>
        </form>
      </header>

      {usingDevData ? <DevDataBanner className="mt-6" /> : null}

      <div className="mt-8 grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_17rem]">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 pb-8">
            <FilterPanel filters={filters} countries={countries} />
          </div>
        </aside>

        <section className="min-w-0">
          <h2 className="sr-only">Opportunities</h2>
          <div className="border-border flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b pb-3">
            <p className="text-muted-foreground text-sm" aria-live="polite">
              <span className="tabular text-foreground font-medium">
                {total}
              </span>{" "}
              {total === 1 ? "opportunity" : "opportunities"}
            </p>
            <div className="flex min-w-0 items-center gap-2">
              <div className="lg:hidden">
                <MobileFilterSheet
                  filters={filters}
                  countries={countries}
                  activeCount={activeCount}
                />
              </div>
              <SortSelect current={filters.sort} hrefs={sortHrefs} />
            </div>
          </div>

          {items.length > 0 ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              {items.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-8"
              icon={<SlidersHorizontal />}
              title="Nothing matches all of those filters yet"
              description={
                activeCount > 0
                  ? "The marketplace is still small. Widening one or two filters usually brings back something worth reading."
                  : "There are no published opportunities to show right now. This is where they will appear."
              }
              action={
                activeCount > 0 ? (
                  <Button asChild variant="outline">
                    <Link href="/explore">Clear all filters</Link>
                  </Button>
                ) : (
                  <Button asChild>
                    <Link href="/signup">Share your opportunity</Link>
                  </Button>
                )
              }
            />
          )}
        </section>

        <aside className="hidden xl:block" aria-label="About these results">
          <div className="sticky top-24 flex flex-col gap-6">
            <div className="border-border bg-surface rounded-lg border p-5">
              <h2 className="text-foreground text-sm font-medium">
                Reading these results
              </h2>
              <dl className="mt-4 flex flex-col gap-4">
                <div>
                  <dt className="text-foreground text-xs font-medium">
                    Fit Score
                  </dt>
                  <dd className="text-muted-foreground mt-1 text-xs leading-relaxed">
                    Appears once you are signed in and have told us what you are
                    looking for. It measures compatibility with your stated
                    preferences, nothing more.
                  </dd>
                </div>
                <div>
                  <dt className="text-foreground text-xs font-medium">
                    Verification
                  </dt>
                  <dd className="text-muted-foreground mt-1 text-xs leading-relaxed">
                    Each signal names what was actually checked. Hover any of
                    them to read the specific statement.
                  </dd>
                </div>
                <div>
                  <dt className="text-foreground text-xs font-medium">
                    Activity
                  </dt>
                  <dd className="text-muted-foreground mt-1 text-xs leading-relaxed">
                    Whether the team is actively looking right now, so you do
                    not spend a message on a dormant listing.
                  </dd>
                </div>
              </dl>
            </div>

            <p className="text-muted-foreground text-xs leading-relaxed">
              {disclaimers.scores}
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
