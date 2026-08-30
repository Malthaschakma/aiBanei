import { Info } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { disclaimers } from "@/config/site";
import { cn } from "@/lib/utils";
import type { FitScore } from "@/types/opportunity";

/**
 * Compact Fit Score for cards and list rows.
 *
 * Called "Fit" everywhere in the UI, never "match probability" or anything
 * resembling an investment score. The tooltip restates what it measures
 * because the number is otherwise easy to over-read.
 */
function MatchScore({
  score,
  className,
}: {
  score: number;
  className?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            "inline-flex cursor-help items-baseline gap-1 whitespace-nowrap",
            className,
          )}
        >
          <span className="tabular text-foreground text-sm font-medium">
            {Math.round(score)}%
          </span>
          <span className="text-muted-foreground text-xs">fit</span>
        </span>
      </TooltipTrigger>
      <TooltipContent>{disclaimers.fitScore}</TooltipContent>
    </Tooltip>
  );
}

const dimensionLabels: Record<keyof FitScore["dimensions"], string> = {
  sector: "Sector",
  capital: "Capital",
  stage: "Stage",
  geography: "Geography",
  strategic: "Strategic fit",
};

/**
 * Full breakdown for the opportunity detail page. Every dimension is shown
 * with its own bar so a high headline number cannot hide a weak component.
 */
function FitScorePanel({
  fitScore,
  className,
}: {
  fitScore: FitScore;
  className?: string;
}) {
  const entries = Object.entries(fitScore.dimensions) as Array<
    [keyof FitScore["dimensions"], number]
  >;

  return (
    <div
      className={cn(
        "border-border bg-surface rounded-lg border p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-foreground text-sm font-medium">Fit Score</h3>
            <Tooltip>
              <TooltipTrigger
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="What Fit Score measures"
              >
                <Info className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent>{disclaimers.fitScore}</TooltipContent>
            </Tooltip>
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            Compatibility with your stated preferences
          </p>
        </div>
        <span className="tabular text-display-xs text-foreground leading-none font-semibold">
          {Math.round(fitScore.overall)}%
        </span>
      </div>

      <dl className="mt-6 flex flex-col gap-3">
        {entries.map(([key, value]) => (
          <div key={key} className="grid grid-cols-[7rem_1fr_2.5rem] items-center gap-3">
            <dt className="text-muted-foreground text-xs">
              {dimensionLabels[key]}
            </dt>
            <dd className="bg-border/60 h-1 overflow-hidden rounded-full">
              <span
                className="bg-foreground block h-full rounded-full"
                style={{ width: `${value}%` }}
              />
            </dd>
            <dd className="tabular text-foreground text-right text-xs">
              {Math.round(value)}%
            </dd>
          </div>
        ))}
      </dl>

      <p className="text-muted-foreground border-border mt-6 border-t pt-4 text-sm leading-relaxed">
        {fitScore.explanation}
      </p>
    </div>
  );
}

/** Shown in place of the panel when nobody is signed in. */
function FitScorePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-border bg-surface rounded-lg border border-dashed p-6",
        className,
      )}
    >
      <h3 className="text-foreground text-sm font-medium">Fit Score</h3>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        Sign in and tell us what you are looking for to see how this opportunity
        compares against your sector, stage, capital and geography preferences.
      </p>
    </div>
  );
}

export { MatchScore, FitScorePanel, FitScorePlaceholder };
