import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Wordmark. Lowercase and tight-tracked; the mark is a single rising stroke
 * with a node at its apex, suggesting a connection rather than depicting one.
 */
function Logo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string | null;
}) {
  const content = (
    <>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className="size-4 shrink-0"
      >
        <path
          d="M2 13.5 8 2.5l6 11"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="square"
        />
        <circle cx="8" cy="2.5" r="1.75" fill="currentColor" />
      </svg>
      <span className="font-display text-[0.9375rem] leading-none font-semibold tracking-tight">
        {siteConfig.name}
      </span>
    </>
  );

  const classes = cn(
    "text-foreground inline-flex items-center gap-2 rounded-sm",
    className,
  );

  if (href === null) {
    return <span className={classes}>{content}</span>;
  }

  return (
    <Link href={href} className={classes} aria-label={`${siteConfig.displayName} home`}>
      {content}
    </Link>
  );
}

export { Logo };
