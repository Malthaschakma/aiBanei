import { Check, FileCheck, Minus, ShieldCheck } from "lucide-react";
import type { ComponentType } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { VerificationSignal } from "@/types/opportunity";
import {
  verificationKindLabels,
  verificationStatusLabels,
  type VerificationStatus,
} from "@/types/taxonomy";

const statusIcon: Record<VerificationStatus, ComponentType<{ className?: string }>> = {
  self_reported: Minus,
  identity_verified: Check,
  profile_reviewed: ShieldCheck,
  evidence_verified: FileCheck,
};

const statusTone: Record<VerificationStatus, string> = {
  self_reported: "text-muted-foreground",
  identity_verified: "text-foreground",
  profile_reviewed: "text-info",
  evidence_verified: "text-success",
};

/**
 * A verification signal always renders alongside what was checked. There is
 * deliberately no generic "verified" tick — a single mark would imply the whole
 * opportunity had been vouched for, which is never what happened.
 */
function VerificationBadge({
  signal,
  className,
}: {
  signal: VerificationSignal;
  className?: string;
}) {
  const Icon = statusIcon[signal.status];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            "inline-flex cursor-help items-center gap-1.5 text-xs",
            className,
          )}
        >
          <Icon className={cn("size-3.5 shrink-0", statusTone[signal.status])} />
          <span className="text-muted-foreground">
            {verificationKindLabels[signal.kind]}
          </span>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <span className="block font-medium">
          {verificationStatusLabels[signal.status]}
        </span>
        <span className="mt-1 block opacity-80">{signal.statement}</span>
      </TooltipContent>
    </Tooltip>
  );
}

/** Row of signals for card use. Truncates and reports the remainder. */
function VerificationSignals({
  signals,
  max = 3,
  className,
}: {
  signals: VerificationSignal[];
  max?: number;
  className?: string;
}) {
  if (signals.length === 0) {
    return (
      <span className={cn("text-muted-foreground text-xs", className)}>
        No verification yet
      </span>
    );
  }

  const visible = signals.slice(0, max);
  const remaining = signals.length - visible.length;

  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1", className)}>
      {visible.map((signal) => (
        <VerificationBadge key={signal.kind} signal={signal} />
      ))}
      {remaining > 0 ? (
        <span className="text-muted-foreground text-xs">+{remaining} more</span>
      ) : null}
    </div>
  );
}

export { VerificationBadge, VerificationSignals };
