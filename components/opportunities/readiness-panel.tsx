import { Info } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { disclaimers } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Readiness } from "@/types/opportunity";

/**
 * Readiness is deliberately styled unlike the Fit Score panel: a sunken
 * surface, a /100 denominator and per-signal notes. Conflating the two would
 * let a viewer read preparedness as personal compatibility.
 */
function ReadinessPanel({
  readiness,
  className,
}: {
  readiness: Readiness;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-border bg-surface-sunken rounded-lg border p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-foreground text-sm font-medium">Readiness</h3>
            <Tooltip>
              <TooltipTrigger
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="What Readiness measures"
              >
                <Info className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent>{disclaimers.readiness}</TooltipContent>
            </Tooltip>
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            How much evidence has been assembled so far
          </p>
        </div>
        <div className="text-right">
          <span className="tabular text-foreground text-2xl leading-none font-semibold">
            {readiness.score}
            <span className="text-muted-foreground text-base font-normal">
              /100
            </span>
          </span>
          <span className="text-muted-foreground mt-1 block text-xs">
            {readiness.label}
          </span>
        </div>
      </div>

      <dl className="mt-6 flex flex-col divide-y divide-(--border)">
        {readiness.signals.map((signal) => (
          <div
            key={signal.label}
            className="grid grid-cols-[1fr_4rem_2.5rem] items-center gap-3 py-2.5"
          >
            <div>
              <dt className="text-foreground text-xs font-medium">
                {signal.label}
              </dt>
              <dd className="text-muted-foreground mt-0.5 text-xs">
                {signal.note}
              </dd>
            </div>
            <dd className="bg-border h-1 self-center overflow-hidden rounded-full">
              <span
                className={cn(
                  "block h-full rounded-full",
                  signal.score >= 70
                    ? "bg-success"
                    : signal.score >= 40
                      ? "bg-warning"
                      : "bg-danger",
                )}
                style={{ width: `${signal.score}%` }}
              />
            </dd>
            <dd className="tabular text-muted-foreground self-center text-right text-xs">
              {signal.score}
            </dd>
          </div>
        ))}
      </dl>

      <p className="text-muted-foreground border-border mt-4 border-t pt-4 text-xs leading-relaxed">
        {disclaimers.readiness}
      </p>
    </div>
  );
}

export { ReadinessPanel };
