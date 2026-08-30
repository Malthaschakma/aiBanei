import { ArrowRight, Landmark } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Container } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Capital",
  description:
    "Investors, their stated preferences and how they say they like to work with founders.",
  alternates: { canonical: "/capital" },
};

export default function CapitalPage() {
  return (
    <Container className="py-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-display-xs text-foreground font-semibold tracking-tight">
          Capital
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Investors, their stated ticket range and sectors, and how they say
          they like to work with founders.
        </p>
      </header>

      <EmptyState
        className="mt-10"
        icon={<Landmark />}
        title="Investor profiles open with matching"
        description="We would rather show you investors whose stated preferences actually line up with what you are building than a directory you have to read end to end. That needs the matching engine, which is next."
        action={
          <>
            <Button asChild>
              <Link href="/explore">
                Explore opportunities
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/signup">Tell us what you invest in</Link>
            </Button>
          </>
        }
      />

      <div className="border-border mt-10 border-t pt-8">
        <h2 className="eyebrow">What an investor profile will show</h2>
        <ul className="text-muted-foreground mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Stated investment range",
            "Preferred sectors",
            "Preferred stages",
            "Geography",
            "Investment style",
            "Strategic expertise",
            "Current intent",
            "Response rate",
            "Verification records",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="bg-border size-1 shrink-0 rounded-full" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground mt-6 max-w-2xl text-xs leading-relaxed">
          Every figure on an investor profile will be either self-declared and
          labelled as such, or measured by the platform. Aibanei does not
          publish investment performance and does not rank investors.
        </p>
      </div>
    </Container>
  );
}
