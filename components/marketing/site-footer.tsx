import Link from "next/link";

import { Logo } from "@/components/marketing/logo";
import { Container } from "@/components/ui/section";
import { disclaimers, footerNav, siteConfig } from "@/config/site";

function SiteFooter() {
  return (
    <footer className="dark bg-background text-foreground mt-auto">
      <Container className="py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              {siteConfig.messages.ideasNeedMore} {siteConfig.etymology}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-16">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="eyebrow">{group.title}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground rounded-sm text-sm transition-colors duration-150"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border mt-12 flex flex-col gap-4 border-t pt-8">
          <p className="text-muted-foreground max-w-3xl text-xs leading-relaxed">
            {disclaimers.scores} Aibanei does not broker, execute or facilitate
            investment transactions, and nothing on this site is an offer or
            solicitation to buy or sell securities.
          </p>
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} {siteConfig.displayName}
          </p>
        </div>
      </Container>
    </footer>
  );
}

export { SiteFooter };
