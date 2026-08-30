import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DevDataBanner } from "@/components/dev-data-banner";
import { StatusBadge } from "@/components/opportunities/status-badge";
import { VerificationBadge } from "@/components/opportunities/verification-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { devPeople } from "@/lib/dev-data/people";
import { formatDate, formatLocation } from "@/lib/format";
import { listPeople } from "@/lib/opportunities/queries";
import { needLabels, roleLabels } from "@/types/taxonomy";

export async function generateStaticParams() {
  return devPeople.map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/people/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { items } = await listPeople();
  const person = items.find((candidate) => candidate.slug === slug);

  if (!person) return { title: "Profile not found" };

  return {
    title: person.name,
    description: person.headline,
    alternates: { canonical: `/people/${person.slug}` },
  };
}

export default async function PersonPage({
  params,
}: PageProps<"/people/[slug]">) {
  const { slug } = await params;
  const { items } = await listPeople();
  const person = items.find((candidate) => candidate.slug === slug);

  if (!person) notFound();

  return (
    <Container size="narrow" className="py-10">
      <Button asChild variant="ghost" size="sm" className="-ml-3">
        <Link href="/people">
          <ArrowLeft aria-hidden />
          All people
        </Link>
      </Button>

      {person.isDevData ? <DevDataBanner className="mt-4" /> : null}

      <header className="border-border mt-6 flex flex-col gap-5 border-b pb-8">
        <div className="flex items-start gap-5">
          <Avatar size="xl">
            <AvatarFallback>
              {person.name
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-display-xs text-foreground font-semibold tracking-tight">
              {person.name}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {person.roles.map((role) => roleLabels[role]).join(" \u00b7 ")}{" "}
              &middot; {formatLocation(person.location)}
            </p>
            <StatusBadge status={person.activityStatus} className="mt-3" />
          </div>
        </div>
        <p className="text-foreground max-w-2xl text-lg leading-relaxed text-pretty">
          {person.headline}
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-8">
        {person.lookingFor.length > 0 ? (
          <section>
            <h2 className="eyebrow">Looking for</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {person.lookingFor.map((need) => (
                <Badge key={need} variant="outline">
                  {needLabels[need]}
                </Badge>
              ))}
            </div>
          </section>
        ) : null}

        {person.canOffer.length > 0 ? (
          <section>
            <h2 className="eyebrow">Can offer</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {person.canOffer.map((offer) => (
                <li
                  key={offer}
                  className="text-foreground flex items-center gap-2.5 text-sm"
                >
                  <span
                    className="bg-border size-1 shrink-0 rounded-full"
                    aria-hidden
                  />
                  {offer}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section>
          <h2 className="eyebrow">Verification</h2>
          <ul className="mt-3 flex flex-col divide-y divide-(--border)">
            {person.verification.map((signal) => (
              <li
                key={signal.kind}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3 first:pt-0"
              >
                <div className="min-w-0 flex-1">
                  <VerificationBadge signal={signal} />
                  <p className="text-foreground mt-1 text-sm leading-relaxed">
                    {signal.statement}
                  </p>
                </div>
                <span className="text-muted-foreground shrink-0 text-xs">
                  {signal.verifiedAt
                    ? formatDate(signal.verifiedAt)
                    : "Not verified"}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-border rounded-lg border border-dashed p-6">
          <h2 className="text-foreground text-sm font-medium">
            Reaching out opens with connections
          </h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Messaging is gated behind an accepted connection request, so people
            here are not cold-contactable. That flow arrives in the next
            release.
          </p>
          <Button disabled className="mt-4">
            Express interest
          </Button>
        </section>
      </div>
    </Container>
  );
}
