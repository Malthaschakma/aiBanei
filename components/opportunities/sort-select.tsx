"use client";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId } from "react";

import type { SortKey } from "@/lib/opportunities/filters";

const sortLabels: Record<SortKey, string> = {
  relevance: "Most relevant",
  recent: "Recently active",
  capital: "Capital sought",
  traction: "Traction",
};

/**
 * A native select rather than a custom menu.
 *
 * Explore's other controls are plain links so the page can render on the
 * server and stay shareable; a native select keeps sort in the same spirit,
 * gets the platform picker on mobile, and is keyboard-operable for free.
 * Hrefs are computed on the server, so this only navigates.
 */
function SortSelect({
  current,
  hrefs,
}: {
  current: SortKey;
  hrefs: Record<SortKey, string>;
}) {
  const router = useRouter();
  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor={id}
        className="text-muted-foreground hidden text-xs sm:inline"
      >
        Sort
      </label>
      <div className="relative">
        <select
          id={id}
          value={current}
          onChange={(event) => router.push(hrefs[event.target.value as SortKey])}
          className="border-border-strong bg-surface text-foreground hover:border-foreground/25 focus-visible:border-foreground h-8 appearance-none rounded-md border py-0 pr-8 pl-2.5 text-[0.8125rem] transition-colors duration-150 focus-visible:outline-none"
        >
          {(Object.keys(sortLabels) as SortKey[]).map((key) => (
            <option key={key} value={key}>
              {sortLabels[key]}
            </option>
          ))}
        </select>
        <ChevronDown
          className="text-muted-foreground pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2"
          aria-hidden
        />
      </div>
    </div>
  );
}

export { SortSelect };
