import { Check, X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  countActiveFilters,
  toggleBooleanHref,
  toggleFilterHref,
  type OpportunityFilters,
} from "@/lib/opportunities/filters";
import { cn } from "@/lib/utils";
import {
  capitalBandLabels,
  capitalBands,
  sectorLabels,
  sectors,
  seekingFacets,
  stageLabels,
  stages,
} from "@/types/taxonomy";

/**
 * Every control is a link that rewrites the query string.
 *
 * This keeps the whole panel a Server Component, makes any filtered view
 * shareable and back-button-correct, and means filtering works with JavaScript
 * disabled. Nothing here needs client state.
 */

function FacetOption({
  href,
  label,
  selected,
  count,
}: {
  href: string;
  label: string;
  selected: boolean;
  count?: number;
}) {
  return (
    <li>
      <Link
        href={href}
        aria-pressed={selected}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors duration-150",
          "hover:bg-surface-sunken",
          selected ? "text-foreground font-medium" : "text-muted-foreground",
        )}
      >
        <span
          className={cn(
            "flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors",
            selected
              ? "border-foreground bg-foreground text-background"
              : "border-border-strong group-hover:border-foreground/40",
          )}
          aria-hidden
        >
          {selected ? <Check className="size-3" strokeWidth={3} /> : null}
        </span>
        <span className="flex-1 text-left">{label}</span>
        {count !== undefined ? (
          <span className="tabular text-muted-foreground text-xs">{count}</span>
        ) : null}
      </Link>
    </li>
  );
}

function FacetGroup({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-border border-t pt-5 first:border-t-0 first:pt-0">
      {/* Floating the legend keeps the fieldset's top rule unbroken instead of
          letting the label sit in a notch cut out of it. */}
      <legend className="eyebrow mb-3 float-left w-full">{legend}</legend>
      <ul className="-mx-2 flex flex-col">{children}</ul>
    </fieldset>
  );
}

function FilterPanel({
  filters,
  countries,
  className,
}: {
  filters: OpportunityFilters;
  countries: string[];
  className?: string;
}) {
  const activeCount = countActiveFilters(filters);

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {activeCount > 0 ? (
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground text-xs">
            {activeCount} {activeCount === 1 ? "filter" : "filters"} applied
          </span>
          <Button asChild variant="ghost" size="sm" className="-mr-2">
            <Link href="/explore">
              Clear all
              <X aria-hidden />
            </Link>
          </Button>
        </div>
      ) : null}

      <FacetGroup legend="I'm looking for">
        {seekingFacets.map((facet) => (
          <FacetOption
            key={facet.value}
            label={facet.label}
            href={toggleFilterHref(filters, "seeking", facet.value)}
            selected={filters.seeking.includes(facet.value)}
          />
        ))}
      </FacetGroup>

      <FacetGroup legend="Stage">
        {stages.map((stage) => (
          <FacetOption
            key={stage}
            label={stageLabels[stage]}
            href={toggleFilterHref(filters, "stages", stage)}
            selected={filters.stages.includes(stage)}
          />
        ))}
      </FacetGroup>

      <FacetGroup legend="Sector">
        {sectors.map((sector) => (
          <FacetOption
            key={sector}
            label={sectorLabels[sector]}
            href={toggleFilterHref(filters, "sectors", sector)}
            selected={filters.sectors.includes(sector)}
          />
        ))}
      </FacetGroup>

      <FacetGroup legend="Capital sought">
        {capitalBands.map((band) => (
          <FacetOption
            key={band}
            label={capitalBandLabels[band]}
            href={toggleFilterHref(filters, "capital", band)}
            selected={filters.capital.includes(band)}
          />
        ))}
      </FacetGroup>

      {countries.length > 1 ? (
        <FacetGroup legend="Geography">
          {countries.map((country) => (
            <FacetOption
              key={country}
              label={country}
              href={toggleFilterHref(filters, "countries", country)}
              selected={filters.countries.includes(country)}
            />
          ))}
        </FacetGroup>
      ) : null}

      <FacetGroup legend="Signals">
        <FacetOption
          label="Verified evidence only"
          href={toggleBooleanHref(filters, "verifiedOnly")}
          selected={filters.verifiedOnly}
        />
        <FacetOption
          label="Actively looking"
          href={toggleBooleanHref(filters, "activeOnly")}
          selected={filters.activeOnly}
        />
      </FacetGroup>
    </div>
  );
}

export { FilterPanel };
