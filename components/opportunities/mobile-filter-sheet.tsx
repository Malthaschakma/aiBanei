"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState, type MouseEvent } from "react";

import { FilterPanel } from "@/components/opportunities/filter-panel";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { OpportunityFilters } from "@/lib/opportunities/filters";

/**
 * Below the filter rail's breakpoint, the same panel is rendered inside a sheet.
 *
 * `FilterPanel` is imported rather than passed in as `children` on purpose.
 * Handing a server-rendered subtree to a client component that mounts a Radix
 * dialog makes Radix's Slot receive an RSC lazy reference and throw during
 * server rendering (radix-ui/primitives#3776). Passing the plain, serializable
 * filter state instead keeps one implementation of the facets and renders
 * cleanly on the server.
 */
function MobileFilterSheet({
  filters,
  countries,
  activeCount,
}: {
  filters: OpportunityFilters;
  countries: string[];
  activeCount: number;
}) {
  const [open, setOpen] = useState(false);

  // Facets are plain links, so one delegated handler covers every control in
  // the panel without the panel needing to know it is inside a sheet.
  function closeOnFacetActivation(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <SlidersHorizontal aria-hidden />
          Filters
          {activeCount > 0 ? (
            <span className="bg-foreground text-background tabular ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.625rem]">
              {activeCount}
            </span>
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div
          className="flex-1 overflow-y-auto p-6"
          onClick={closeOnFacetActivation}
        >
          <FilterPanel filters={filters} countries={countries} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { MobileFilterSheet };
