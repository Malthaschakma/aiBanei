import { Lock } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * The connection flow lands in Phase 2. Until then the affordance is present
 * but honest about being unavailable, rather than hidden or fake-functional.
 */
function ExpressInterestPanel({
  opportunityName,
  className,
}: {
  opportunityName: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-border bg-surface rounded-lg border p-6",
        className,
      )}
    >
      <h2 className="font-display text-foreground text-base font-semibold tracking-tight">
        Interested in {opportunityName}?
      </h2>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        Tell the team what you are interested in and why. They decide whether to
        open a conversation, so a short, specific note goes a long way.
      </p>

      <div className="mt-5 flex flex-col gap-2">
        <Button disabled className="w-full">
          Express interest
        </Button>
        <Button variant="outline" disabled className="w-full">
          Save for later
        </Button>
      </div>

      <p className="text-muted-foreground mt-4 flex items-start gap-2 text-xs leading-relaxed">
        <Lock className="mt-px size-3 shrink-0" aria-hidden />
        <span>
          Connections open in the next release.{" "}
          <Link
            href="/signup"
            className="text-foreground underline underline-offset-2"
          >
            Create an account
          </Link>{" "}
          and we will let you know when they do.
        </span>
      </p>
    </div>
  );
}

/**
 * Detail figures, financial models and documents stay behind an accepted
 * connection. This states what exists without revealing any of it.
 */
function GatedSection({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-border rounded-lg border border-dashed p-6",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Lock className="text-muted-foreground size-3.5" aria-hidden />
        <h3 className="text-foreground text-sm font-medium">
          Shared after a connection is accepted
        </h3>
      </div>
      <ul className="mt-3 flex flex-col gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="text-muted-foreground flex items-center gap-2 text-sm"
          >
            <span className="bg-border size-1 rounded-full" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
      <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
        The team chooses who sees these. Nothing here is public, and every view
        is recorded for them.
      </p>
    </div>
  );
}

export { ExpressInterestPanel, GatedSection };
