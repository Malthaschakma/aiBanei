import Link from "next/link";

import { StatusBadge } from "@/components/opportunities/status-badge";
import { VerificationSignals } from "@/components/opportunities/verification-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatLocation } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Person } from "@/types/opportunity";
import { needLabels, roleLabels } from "@/types/taxonomy";

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/**
 * People are shown with what they are looking for and what they can offer,
 * because both sides of that exchange are what makes a connection worth making.
 */
function PersonCard({
  person,
  className,
}: {
  person: Person;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group border-border bg-surface relative rounded-lg border p-6 transition-colors duration-150",
        "hover:border-border-strong focus-within:border-foreground",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <Avatar size="md">
          {person.avatarUrl ? (
            <AvatarImage src={person.avatarUrl} alt="" />
          ) : null}
          <AvatarFallback>{initials(person.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-foreground text-base leading-tight font-semibold tracking-tight">
            <Link
              href={`/people/${person.slug}`}
              className="before:absolute before:inset-0 focus-visible:outline-none"
            >
              {person.name}
            </Link>
          </h3>
          <p className="text-muted-foreground mt-1 text-xs">
            {person.roles.map((role) => roleLabels[role]).join(" \u00b7 ")}{" "}
            &middot; {formatLocation(person.location)}
          </p>
        </div>
      </div>

      <p className="text-foreground mt-4 text-sm leading-relaxed text-pretty">
        {person.headline}
      </p>

      {person.canOffer.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {person.canOffer.slice(0, 3).map((offer) => (
            <Badge key={offer} variant="muted" size="sm">
              {offer}
            </Badge>
          ))}
        </div>
      ) : null}

      <div className="border-border mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4">
        {person.lookingFor.length > 0 ? (
          <span className="text-muted-foreground text-xs">
            Looking for{" "}
            <span className="text-foreground font-medium">
              {person.lookingFor.map((need) => needLabels[need]).join(" \u00b7 ")}
            </span>
          </span>
        ) : null}
        <StatusBadge
          status={person.activityStatus}
          className="ml-auto shrink-0"
        />
      </div>

      <VerificationSignals
        signals={person.verification}
        max={2}
        className="relative z-10 mt-3"
      />
    </article>
  );
}

export { PersonCard };
