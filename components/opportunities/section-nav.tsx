"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Sticky in-page navigation for the opportunity narrative.
 *
 * Highlights the section currently in view via IntersectionObserver rather
 * than scroll maths, and degrades to plain anchor links if the observer never
 * fires.
 */
function SectionNav({
  sections,
  className,
}: {
  sections: Array<{ id: string; label: string }>;
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(
    sections[0]?.id ?? null,
  );

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Top offset clears the sticky header; the tall bottom margin means only
      // sections near the top of the viewport are considered current.
      { rootMargin: "-88px 0px -65% 0px", threshold: 0 },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page" className={className}>
      <ul className="flex flex-col gap-0.5">
        {sections.map((section) => {
          const active = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "border-border block rounded-r-sm border-l-2 py-1.5 pl-3 text-xs transition-colors duration-150",
                  active
                    ? "border-l-foreground text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:border-l-border-strong",
                )}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { SectionNav };
