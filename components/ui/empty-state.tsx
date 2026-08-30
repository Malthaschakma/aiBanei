import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Empty states explain what is missing and what to do about it. "No data
 * found" is not acceptable copy anywhere in the product.
 */
function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  headingLevel: Heading = "h2",
  ...props
}: Omit<ComponentProps<"div">, "title"> & {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  /** Set to keep the document outline correct for the surrounding page. */
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "border-border flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-16 text-center",
        className,
      )}
      {...props}
    >
      {icon ? (
        <div className="text-muted-foreground mb-4 [&_svg]:size-6">{icon}</div>
      ) : null}
      <Heading className="font-display text-foreground text-lg font-semibold text-balance">
        {title}
      </Heading>
      {description ? (
        <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed text-pretty">
          {description}
        </p>
      ) : null}
      {action ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {action}
        </div>
      ) : null}
    </div>
  );
}

/** Same shape as EmptyState, but for failures rather than absence. */
function ErrorState({
  title = "Something went wrong",
  description = "The page could not be loaded. This is usually temporary.",
  action,
  className,
  headingLevel: Heading = "h1",
  ...props
}: Omit<ComponentProps<"div">, "title"> & {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  headingLevel?: "h1" | "h2";
}) {
  return (
    <div
      data-slot="error-state"
      role="alert"
      className={cn(
        "border-danger/30 bg-danger-subtle/40 flex flex-col items-center justify-center rounded-lg border px-6 py-16 text-center",
        className,
      )}
      {...props}
    >
      <Heading className="font-display text-foreground text-lg font-semibold text-balance">
        {title}
      </Heading>
      <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed text-pretty">
        {description}
      </p>
      {action ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {action}
        </div>
      ) : null}
    </div>
  );
}

export { EmptyState, ErrorState };
