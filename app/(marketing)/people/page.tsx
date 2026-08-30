import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { DevDataBanner } from "@/components/dev-data-banner";
import { PersonCard } from "@/components/people/person-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Container } from "@/components/ui/section";
import { listPeople } from "@/lib/opportunities/queries";

export const metadata: Metadata = {
  title: "People",
  description:
    "Founders, investors, operators, advisors and specialists open to building something new.",
  alternates: { canonical: "/people" },
};

export default async function PeoplePage() {
  const { items, usingDevData } = await listPeople();

  return (
    <Container className="py-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-display-xs text-foreground font-semibold tracking-tight">
          People
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Founders, investors, operators, advisors and specialists. Everyone
          here says what they are looking for and what they can offer.
        </p>
      </header>

      {usingDevData ? <DevDataBanner className="mt-6" /> : null}

      {/* Filtering by role, skills, availability and intent lands with the
          matching engine in Phase 2, alongside individual profile pages. */}
      <div className="border-border mt-8 flex flex-wrap items-center justify-between gap-3 border-y py-3">
        <p className="text-muted-foreground text-sm">
          <span className="tabular text-foreground font-medium">
            {items.length}
          </span>{" "}
          {items.length === 1 ? "person" : "people"}
        </p>
        <p className="text-muted-foreground text-xs">
          Filtering by role, skills and availability arrives with matching.
        </p>
      </div>

      {items.length > 0 ? (
        <section className="mt-6">
          <h2 className="sr-only">Profiles</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </section>
      ) : (
        <EmptyState
          className="mt-8"
          title="The network is still forming"
          description="Nobody has published a profile yet. Create yours and you will be among the first people others can find."
          action={
            <Button asChild>
              <Link href="/signup">
                Create your profile
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          }
        />
      )}
    </Container>
  );
}
