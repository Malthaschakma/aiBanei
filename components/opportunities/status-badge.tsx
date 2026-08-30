import { cn } from "@/lib/utils";
import { activityStatusLabels, type ActivityStatus } from "@/types/taxonomy";

const dotClass: Record<ActivityStatus, string> = {
  actively_looking: "bg-success",
  exploring: "bg-warning",
  not_looking: "bg-muted-foreground/50",
};

/**
 * Availability signal. The label always accompanies the dot, so the state is
 * never carried by colour alone.
 */
function StatusBadge({
  status,
  className,
}: {
  status: ActivityStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-muted-foreground inline-flex items-center gap-1.5 text-xs font-medium",
        className,
      )}
    >
      <span
        className={cn("size-1.5 shrink-0 rounded-full", dotClass[status])}
        aria-hidden
      />
      {activityStatusLabels[status]}
    </span>
  );
}

export { StatusBadge };
