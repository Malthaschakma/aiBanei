import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A single figure with its label. Values render in tabular monospace so
 * adjacent metrics align on the decimal.
 */
function Metric({
  label,
  value,
  hint,
  tone = "default",
  size = "md",
  className,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  tone?: "default" | "success" | "warning" | "danger" | "muted";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      data-slot="metric"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      <span className="text-muted-foreground text-xs font-medium">{label}</span>
      <span
        className={cn(
          "tabular leading-none font-medium",
          size === "sm" && "text-sm",
          size === "md" && "text-lg",
          size === "lg" && "text-display-xs",
          tone === "default" && "text-foreground",
          tone === "muted" && "text-muted-foreground",
          tone === "success" && "text-success",
          tone === "warning" && "text-warning",
          tone === "danger" && "text-danger",
        )}
      >
        {value}
      </span>
      {hint ? (
        <span className="text-muted-foreground text-xs">{hint}</span>
      ) : null}
    </div>
  );
}

/**
 * Metrics laid out on a shared baseline with hairline dividers. Prefer this
 * over wrapping each metric in its own card.
 */
function MetricGroup({
  className,
  columns = 3,
  divided = true,
  ...props
}: ComponentProps<"dl"> & { columns?: 2 | 3 | 4; divided?: boolean }) {
  return (
    <dl
      data-slot="metric-group"
      className={cn(
        "grid gap-x-6 gap-y-6",
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-2 sm:grid-cols-3",
        columns === 4 && "grid-cols-2 sm:grid-cols-4",
        divided &&
          "[&>*]:border-border [&>*]:pl-4 [&>*]:not-first:border-l [&>*:first-child]:pl-0",
        className,
      )}
      {...props}
    />
  );
}

export { Metric, MetricGroup };
