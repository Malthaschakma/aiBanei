import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { DevDataBanner } from "@/components/dev-data-banner";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { IntentCards } from "@/components/marketing/intent-cards";
import { NetworkVisual } from "@/components/marketing/network-visual";
import { OpportunityCard } from "@/components/opportunities/opportunity-card";
import { PersonCard } from "@/components/people/person-card";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import {
  listFeaturedOpportunities,
  listPeople,
} from "@/lib/opportunities/queries";

export const metadata: Metadata = {
  title: `${siteConfig.displayName} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [{ items: featured, usingDevData }, { items: people }] =
    await Promise.all([listFeaturedOpportunities(3), listPeople(3)]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.displayName,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/explore?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Static, developer-authored object. No user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero — scoped to the dark palette rather than switching the theme. */}
      <div className="dark bg-background text-foreground -mt-16 pt-16">
        <Container className="pt-20 pb-8 md:pt-28">
          <div className="max-w-3xl">
            <p className="eyebrow">{siteConfig.etymology}</p>
            <h1 className="font-display text-display-lg md:text-display-xl mt-6 font-semibold text-balance">
              {siteConfig.tagline}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed text-pretty md:text-xl">
              {siteConfig.description}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg">
                <Link href="/signup">I have an idea</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/explore">
                  I&rsquo;m looking for opportunities
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </Container>

        <Container className="pb-20 md:pb-28">
          <NetworkVisual className="mx-auto max-w-4xl" />
          <p className="text-muted-foreground mx-auto mt-2 max-w-xl text-center text-sm leading-relaxed text-pretty">
            An idea only becomes a company when the right people find their way
            to it.
          </p>
        </Container>
      </div>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Start here"
            title="What are you looking for?"
            description="Most people arrive with one of these. Pick the closest and we will take you to the right place."
          />
          <IntentCards className="mt-10" />
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <SectionHeader
            eyebrow="Opportunities"
            title="Worth exploring"
            description="Businesses and ideas currently looking for capital, co-founders, partners or expertise."
            action={
              <Button asChild variant="outline">
                <Link href="/explore">
                  Explore all
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            }
          />
          {usingDevData ? <DevDataBanner className="mt-8" /> : null}
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {featured.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <SectionHeader
            eyebrow="People"
            title="Find your people"
            description="Founders, investors, operators and specialists who are open to something new."
            action={
              <Button asChild variant="outline">
                <Link href="/people">
                  See everyone
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            }
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {people.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-border bg-surface-sunken border-y">
        <Container>
          <SectionHeader
            eyebrow="How it works"
            title="From an idea to something real"
            description="Four steps, and a product built to move you through them rather than to keep you posting."
          />
          <HowItWorks className="mt-12" />
        </Container>
      </Section>

      <Section className="dark bg-background text-foreground">
        <Container>
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-display-sm md:text-display-md font-semibold text-balance">
                Something worth building?
              </h2>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed text-pretty">
                {siteConfig.messages.bringAnIdea}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg">
                <Link href="/signup">Start with Aibanei</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/how-it-works">How it works</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
