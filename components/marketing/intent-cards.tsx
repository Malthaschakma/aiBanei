import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The ways people arrive. Each is a route into the marketplace with the
 * relevant filter already applied, so the first click lands somewhere useful
 * rather than on a generic listing page.
 *
 * Keep the count a multiple of six so the hairline grid has no empty cells at
 * one, two, or three columns.
 */
const intents = [
  {
    title: "Build an idea",
    description:
      "You have something in mind and need the people and resources to make it real.",
    href: "/signup",
  },
  {
    title: "Find a co-founder",
    description:
      "You need someone to build it with, not someone to work for you.",
    href: "/explore?looking_for=co_founder",
  },
  {
    title: "Find capital",
    description:
      "You have traction and need funding to reach the next stage.",
    href: "/explore?looking_for=capital",
  },
  {
    title: "Find a partner",
    description:
      "You need distribution, manufacturing, or a commercial relationship.",
    href: "/explore?looking_for=partner",
  },
  {
    title: "Join a project",
    description:
      "You want to put your experience behind something worth building.",
    href: "/explore?looking_for=talent",
  },
  {
    title: "Offer expertise",
    description:
      "You have run this before and can advise the people doing it now.",
    href: "/explore?looking_for=expertise",
  },
] as const;

function IntentCards({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "border-border grid grid-cols-1 gap-px overflow-hidden rounded-lg border sm:grid-cols-2 lg:grid-cols-3",
        "bg-border",
        className,
      )}
    >
      {intents.map((intent) => (
        <li key={intent.title} className="bg-surface group relative">
          <Link
            href={intent.href}
            className="hover:bg-surface-sunken flex h-full flex-col gap-2 p-6 transition-colors duration-150 focus-visible:outline-none"
          >
            <span className="text-foreground flex items-center justify-between gap-3 text-sm font-medium">
              {intent.title}
              <ArrowRight
                className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
            <span className="text-muted-foreground text-sm leading-relaxed text-pretty">
              {intent.description}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export { IntentCards };
