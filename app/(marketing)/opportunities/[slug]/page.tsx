import { ArrowLeft, MessageCircleQuestion } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DevDataBanner } from "@/components/dev-data-banner";
import {
  FitScorePanel,
  FitScorePlaceholder,
} from "@/components/matching/match-score";
import {
  ExpressInterestPanel,
  GatedSection,
} from "@/components/opportunities/express-interest";
import { ReadinessPanel } from "@/components/opportunities/readiness-panel";
import { SectionNav } from "@/components/opportunities/section-nav";
import { StageBadge } from "@/components/opportunities/stage-badge";
import { StatusBadge } from "@/components/opportunities/status-badge";
import { VerificationBadge } from "@/components/opportunities/verification-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Metric, MetricGroup } from "@/components/ui/metric";
import { Container } from "@/components/ui/section";
import { disclaimers, siteConfig } from "@/config/site";
import {
  formatBdt,
  formatDate,
  formatLocation,
  formatNumber,
  formatPercent,
  formatRelativeTime,
} from "@/lib/format";
import {
  getOpportunityBySlug,
  listOpportunitySlugs,
} from "@/lib/opportunities/queries";
import { needLabels, sectorLabels } from "@/types/taxonomy";

export async function generateStaticParams() {
  const slugs = await listOpportunitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/opportunities/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const opportunity = await getOpportunityBySlug(slug);

  if (!opportunity) return { title: "Opportunity not found" };

  const title = `${opportunity.name} — ${sectorLabels[opportunity.sector]} in ${formatLocation(opportunity.location)}`;

  return {
    title: opportunity.name,
    description: opportunity.summary,
    alternates: { canonical: `/opportunities/${opportunity.slug}` },
    openGraph: {
      type: "article",
      title,
      description: opportunity.summary,
      url: `${siteConfig.url}/opportunities/${opportunity.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: opportunity.summary,
    },
  };
}

const sections = [
  { id: "opportunity", label: "The opportunity" },
  { id: "why-now", label: "Why now" },
  { id: "problem", label: "The problem" },
  { id: "solution", label: "The solution" },
  { id: "traction", label: "Traction" },
  { id: "business-model", label: "Business model" },
  { id: "market", label: "Market" },
  { id: "team", label: "Team" },
  { id: "capital", label: "Capital" },
  { id: "use-of-funds", label: "Use of funds" },
  { id: "what-we-need", label: "What we need" },
  { id: "verification", label: "Verification" },
  { id: "updates", label: "Updates" },
  { id: "questions", label: "Questions" },
];

function Prose({ id, title, body }: { id: string; title: string; body: string }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="eyebrow">{title}</h2>
      <p className="text-foreground mt-3 text-base leading-relaxed text-pretty">
        {body}
      </p>
    </section>
  );
}

export default async function OpportunityPage({
  params,
}: PageProps<"/opportunities/[slug]">) {
  const { slug } = await params;
  const opportunity = await getOpportunityBySlug(slug);

  if (!opportunity) notFound();

  const { metrics, narrative } = opportunity;

  return (
    <Container className="py-10">
      <Button asChild variant="ghost" size="sm" className="-ml-3">
        <Link href="/explore">
          <ArrowLeft aria-hidden />
          All opportunities
        </Link>
      </Button>

      {opportunity.isDevData ? <DevDataBanner className="mt-4" /> : null}

      <header className="border-border mt-6 border-b pb-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Badge variant="muted">{sectorLabels[opportunity.sector]}</Badge>
          <span className="text-muted-foreground text-sm">
            {formatLocation(opportunity.location)}
          </span>
          <StageBadge stage={opportunity.stage} />
          <StatusBadge
            status={opportunity.activityStatus}
            className="ml-auto"
          />
        </div>

        <h1 className="font-display text-display-sm md:text-display-md text-foreground mt-5 font-semibold tracking-tight text-balance">
          {opportunity.name}
        </h1>
        <p className="text-muted-foreground mt-3 max-w-3xl text-lg leading-relaxed text-pretty">
          {opportunity.summary}
        </p>

        <p className="text-muted-foreground mt-5 text-xs">
          Published {formatDate(opportunity.publishedAt)} &middot;{" "}
          {formatRelativeTime(opportunity.lastActiveAt)}
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] xl:grid-cols-[13rem_minmax(0,1fr)_20rem]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8">
            <SectionNav sections={sections} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-10">
          <MetricGroup columns={4} className="border-border border-b pb-8">
            <Metric
              label="Seeking"
              value={formatBdt(opportunity.capitalSeekingBdt)}
              size="lg"
            />
            <Metric
              label="Monthly revenue"
              value={formatBdt(metrics.monthlyRevenueBdt)}
              hint={
                metrics.monthlyGrowthPct !== null
                  ? `${formatPercent(metrics.monthlyGrowthPct, { signed: true })} month over month`
                  : undefined
              }
              size="lg"
            />
            <Metric
              label="Customers"
              value={formatNumber(metrics.customers)}
              size="lg"
            />
            <Metric
              label="Team"
              value={formatNumber(metrics.teamSize)}
              hint={
                metrics.operatingSince
                  ? `Operating since ${metrics.operatingSince}`
                  : "Pre-operational"
              }
              size="lg"
            />
          </MetricGroup>

          <Prose id="opportunity" title="The opportunity" body={narrative.opportunity} />
          <Prose id="why-now" title="Why now" body={narrative.whyNow} />
          <Prose id="problem" title="The problem" body={narrative.problem} />
          <Prose id="solution" title="The solution" body={narrative.solution} />
          <Prose id="traction" title="Traction" body={narrative.traction} />
          <Prose
            id="business-model"
            title="Business model"
            body={narrative.businessModel}
          />
          <Prose id="market" title="Market" body={narrative.market} />

          <section id="team" className="scroll-mt-24">
            <h2 className="eyebrow">Team</h2>
            <ul className="mt-4 flex flex-col divide-y divide-(--border)">
              {opportunity.team.map((member) => (
                <li key={member.name} className="flex gap-4 py-4 first:pt-0">
                  <Avatar size="md">
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-foreground text-sm font-medium">
                        {member.name}
                      </span>
                      {member.identityVerified ? (
                        <Badge variant="muted" size="sm">
                          Identity verified
                        </Badge>
                      ) : null}
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {member.role}
                    </p>
                    <p className="text-foreground mt-2 text-sm leading-relaxed text-pretty">
                      {member.bio}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <Prose id="capital" title="Capital" body={narrative.capital} />

          <section id="use-of-funds" className="scroll-mt-24">
            <h2 className="eyebrow">Use of funds</h2>
            <ul className="mt-4 flex flex-col divide-y divide-(--border)">
              {opportunity.useOfFunds.map((item) => (
                <li
                  key={item.label}
                  className="grid grid-cols-[1fr_3rem] items-baseline gap-4 py-3 first:pt-0"
                >
                  <div>
                    <span className="text-foreground text-sm font-medium">
                      {item.label}
                    </span>
                    <p className="text-muted-foreground mt-0.5 text-sm leading-relaxed">
                      {item.detail}
                    </p>
                    <span
                      className="bg-border mt-2 block h-1 overflow-hidden rounded-full"
                      aria-hidden
                    >
                      <span
                        className="bg-foreground/70 block h-full rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </span>
                  </div>
                  <span className="tabular text-foreground text-right text-sm font-medium">
                    {item.percentage}%
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section id="what-we-need" className="scroll-mt-24">
            <h2 className="eyebrow">What we need</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {opportunity.needs.map((need) => (
                <Badge key={need} variant="outline">
                  {needLabels[need]}
                </Badge>
              ))}
            </div>
            <p className="text-foreground mt-4 text-base leading-relaxed text-pretty">
              {narrative.whatWeNeed}
            </p>
          </section>

          <section id="verification" className="scroll-mt-24">
            <h2 className="eyebrow">Verification</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {disclaimers.verification}
            </p>
            <ul className="mt-4 flex flex-col divide-y divide-(--border)">
              {opportunity.verification.map((signal) => (
                <li
                  key={signal.kind}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3 first:pt-0"
                >
                  <div className="min-w-0 flex-1">
                    <VerificationBadge signal={signal} />
                    <p className="text-foreground mt-1 text-sm leading-relaxed text-pretty">
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

            <GatedSection
              className="mt-6"
              items={[
                "Financial model and detailed unit economics",
                "Bank statements and revenue evidence",
                "Cap table and shareholder agreements",
                "Customer contracts and references",
              ]}
            />
          </section>

          <section id="updates" className="scroll-mt-24">
            <h2 className="eyebrow">Updates</h2>
            {opportunity.updates.length > 0 ? (
              <ol className="mt-4 flex flex-col gap-6">
                {opportunity.updates.map((update) => (
                  <li
                    key={update.date}
                    className="border-border relative border-l pl-5"
                  >
                    <span
                      className="bg-border absolute top-1.5 -left-[3px] size-1.5 rounded-full"
                      aria-hidden
                    />
                    <time
                      dateTime={update.date}
                      className="text-muted-foreground text-xs"
                    >
                      {formatDate(update.date)}
                    </time>
                    <h3 className="text-foreground mt-1 text-sm font-medium">
                      {update.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed text-pretty">
                      {update.body}
                    </p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                No updates posted yet. Teams usually start posting once they
                have something concrete to report.
              </p>
            )}
          </section>

          <section id="questions" className="scroll-mt-24">
            <h2 className="eyebrow">Questions</h2>
            {opportunity.questions.length > 0 ? (
              <ul className="mt-4 flex flex-col divide-y divide-(--border)">
                {opportunity.questions.map((entry) => (
                  <li key={entry.question} className="py-5 first:pt-0">
                    <p className="text-foreground flex gap-2.5 text-sm font-medium">
                      <MessageCircleQuestion
                        className="text-muted-foreground mt-0.5 size-4 shrink-0"
                        aria-hidden
                      />
                      {entry.question}
                    </p>
                    {entry.answer ? (
                      <p className="text-muted-foreground mt-2 pl-[1.625rem] text-sm leading-relaxed text-pretty">
                        {entry.answer}
                      </p>
                    ) : (
                      <p className="text-muted-foreground mt-2 pl-[1.625rem] text-sm italic">
                        Awaiting a response from the team.
                      </p>
                    )}
                    <p className="text-muted-foreground mt-2 pl-[1.625rem] text-xs">
                      {entry.askedBy}
                      {entry.answeredAt
                        ? ` \u00b7 answered ${formatDate(entry.answeredAt)}`
                        : null}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                No questions have been asked publicly yet.
              </p>
            )}
          </section>
        </div>

        <aside className="flex flex-col gap-6 xl:sticky xl:top-24 xl:self-start">
          {opportunity.fitScore ? (
            <FitScorePanel fitScore={opportunity.fitScore} />
          ) : (
            <FitScorePlaceholder />
          )}
          <ExpressInterestPanel opportunityName={opportunity.name} />
          <ReadinessPanel readiness={opportunity.readiness} />
          <p className="text-muted-foreground text-xs leading-relaxed">
            {disclaimers.scores}
          </p>
        </aside>
      </div>
    </Container>
  );
}
