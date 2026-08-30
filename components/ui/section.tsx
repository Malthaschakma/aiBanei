import type { ComponentProps, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Page gutter. Every full-width surface uses this so columns line up. */
function Container({
  className,
  size = "default",
  ...props
}: ComponentProps<"div"> & { size?: "default" | "wide" | "narrow" }) {
  return (
    <div
      data-slot="container"
      className={cn(
        "mx-auto w-full px-6 md:px-8",
        size === "default" && "max-w-[1280px]",
        size === "wide" && "max-w-[1600px]",
        size === "narrow" && "max-w-[768px]",
        className,
      )}
      {...props}
    />
  );
}

function Section({
  className,
  as: Comp = "section",
  ...props
}: ComponentProps<"section"> & { as?: ElementType }) {
  return (
    <Comp
      data-slot="section"
      className={cn("py-16 md:py-24", className)}
      {...props}
    />
  );
}

/**
 * Eyebrow + heading + optional description and trailing action.
 * Keeps section openings typographically identical across the site.
 */
function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "start",
  className,
  headingLevel: Heading = "h2",
  ...props
}: Omit<ComponentProps<"div">, "title"> & {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: "start" | "center";
  headingLevel?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      data-slot="section-header"
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex max-w-2xl flex-col gap-3",
          align === "center" && "items-center text-center",
        )}
      >
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <Heading className="font-display text-display-xs md:text-display-sm text-foreground font-semibold text-balance">
          {title}
        </Heading>
        {description ? (
          <p className="text-muted-foreground text-base leading-relaxed text-pretty">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="flex shrink-0 gap-3">{action}</div> : null}
    </div>
  );
}

export { Container, Section, SectionHeader };
