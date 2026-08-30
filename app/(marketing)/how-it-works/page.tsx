import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { HowItWorks } from "@/components/marketing/how-it-works";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { disclaimers, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How Aibanei helps ideas, founders, talent, partners and capital find each other and move opportunities forward.",
  alternates: { canonical: "/how-it-works" },
};

const principles = [
  {
    title: "Advance, don't post",
    body: "Plenty of places let you announce that you are raising. Aibanei is built to move an opportunity from where it is to where it needs to be next, which is a different problem.",
  },
  {
    title: "Every score explains itself",
    body: "Fit Score tells you why it is what it is, dimension by dimension. Readiness names the evidence that is missing. Neither is a prediction, and neither is investment advice.",
  },
  {
    title: "Verification says what was checked",
    body: "There is no single blue tick. Each record states the specific thing that was verified, when, and on what basis, because 'verified' on its own means nothing.",
  },
  {
    title: "Private stays private",
    body: "Financial models, documents and evidence are shared only after a connection is accepted. Access is recorded, and nothing sensitive is ever publicly readable.",
  },
  {
    title: "Roles are not permanent",
    body: "A founder is often also an investor, an advisor, or both. You are never locked into one identity, and what you see adapts to the role you are acting in.",
  },
  {
    title: "Inactive accounts are visible as such",
    body: "Activity status and last-active signals are shown throughout, so you do not spend a carefully written message on someone who stopped looking six months ago.",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <>
      <div className="dark bg-background text-foreground -mt-16 pt-16">
        <Container className="py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow">How it works</p>
            <h1 className="font-display text-display-md md:text-display-lg mt-6 font-semibold text-balance">
              {siteConfig.messages.ideasNeedMore}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed text-pretty">
              Ideas need people. People need capital. Capital needs
              opportunities. Aibanei is where they find each other, and the tools
              to keep going once they have.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="The journey"
            title="Four steps, then the real work"
            description="Everything in the product exists to move you from one of these to the next."
          />
          <HowItWorks className="mt-12" />
        </Container>
      </Section>

      <Section className="border-border bg-surface-sunken border-y">
        <Container>
          <SectionHeader
            eyebrow="Principles"
            title="How we decide what to build"
            description="These are the rules we hold features against. If something fails one of them, it does not ship."
          />
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => (
              <div key={principle.title} className="border-border border-t pt-5">
                <h3 className="font-display text-foreground text-base font-semibold tracking-tight">
                  {principle.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <h2 className="eyebrow">What Aibanei is not</h2>
          <div className="mt-4 flex flex-col gap-4">
            <p className="text-foreground text-base leading-relaxed text-pretty">
              Aibanei is a place to discover, assess and connect. It is not a
              crowdfunding platform, a broker, or a route to executing an
              investment. We do not handle transactions, hold funds, or take a
              position in anything listed here.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed text-pretty">
              {disclaimers.scores}
            </p>
            <p className="text-muted-foreground text-base leading-relaxed text-pretty">
              Nothing on this site is an offer or solicitation to buy or sell
              securities. Decisions about capital are yours, and you should take
              your own professional advice before making them.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/signup">
                Start with Aibanei
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/explore">Explore opportunities</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
