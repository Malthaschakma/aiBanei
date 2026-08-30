import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { MatchScore } from "@/components/matching/match-score";
import { StageBadge } from "@/components/opportunities/stage-badge";
import { StatusBadge } from "@/components/opportunities/status-badge";
import { VerificationSignals } from "@/components/opportunities/verification-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatBdt, formatLocation, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { OpportunitySummary } from "@/types/opportunity";
import { needLabels, sectorLabels } from "@/types/taxonomy";

/**
 * The marketplace's primary unit. Restrained on purpose: name, one line,
 * three figures, what they need, and the verification signals behind them.
 * Anything more turns the feed into noise.
 */
function OpportunityCard({
  opportunity,
  className,
}: {
  opportunity: OpportunitySummary;
  className?: string;
}) {
  const { metrics } = opportunity;

  return (
    <article
      className={cn(
        "group border-border bg-surface relative rounded-lg border p-6 transition-colors duration-150",
        "hover:border-border-strong focus-within:border-foreground",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-foreground text-base leading-tight font-semibold tracking-tight">
            <Link
              href={`/opportunities/${opportunity.slug}`}
              className="before:absolute before:inset-0 focus-visible:outline-none"
            >
              {opportunity.name}
            </Link>
          </h3>
          <p className="text-muted-foreground mt-1 text-xs">
            {sectorLabels[opportunity.sector]} &middot;{" "}
            {formatLocation(opportunity.location)}
          </p>
        </div>
        {opportunity.fitScore ? (
          <MatchScore
            score={opportunity.fitScore.overall}
            className="relative z-10 shrink-0"
          />
        ) : null}
      </div>

      <p className="text-foreground mt-4 text-sm leading-relaxed text-pretty">
        {opportunity.summary}
      </p>

      <dl className="mt-5 grid grid-cols-3 gap-4">
        <div>
          <dt className="text-muted-foreground text-xs">Stage</dt>
          <dd className="mt-1">
            <StageBadge stage={opportunity.stage} showRail={false} />
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-xs">Seeking</dt>
          <dd className="tabular text-foreground mt-1 text-sm font-medium">
            {formatBdt(opportunity.capitalSeekingBdt)}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-xs">
            {metrics.monthlyRevenueBdt === null ? "Team" : "Monthly revenue"}
          </dt>
          <dd className="tabular text-foreground mt-1 text-sm font-medium">
            {metrics.monthlyRevenueBdt === null ? (
              `${metrics.teamSize} ${metrics.teamSize === 1 ? "person" : "people"}`
            ) : (
              <>
                {formatBdt(metrics.monthlyRevenueBdt)}
                {metrics.monthlyGrowthPct !== null ? (
                  <span className="text-success ml-1.5 text-xs font-normal">
                    {formatPercent(metrics.monthlyGrowthPct, { signed: true })}
                  </span>
                ) : null}
              </>
            )}
          </dd>
        </div>
      </dl>

      <div className="border-border mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4">
        <span className="text-muted-foreground text-xs">
          Looking for{" "}
          <span className="text-foreground font-medium">
            {opportunity.needs.map((need) => needLabels[need]).join(" \u00b7 ")}
          </span>
        </span>
        <StatusBadge
          status={opportunity.activityStatus}
          className="ml-auto shrink-0"
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <VerificationSignals
          signals={opportunity.verification}
          className="relative z-10"
        />
        <ArrowUpRight
          className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-colors"
          aria-hidden
        />
      </div>
    </article>
  );
}

function OpportunityCardSkeleton() {
  return (
    <div className="border-border bg-surface rounded-lg border p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="w-full">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-2 h-3 w-28" />
        </div>
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="mt-4 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-3/5" />
      <div className="mt-5 grid grid-cols-3 gap-4">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
      <Skeleton className="mt-5 h-4 w-2/3" />
    </div>
  );
}

export { OpportunityCard, OpportunityCardSkeleton };
