import Link from "next/link";

import { Logo } from "@/components/marketing/logo";
import { siteConfig } from "@/config/site";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 md:px-12">
        <Logo />
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
        <p className="text-muted-foreground text-xs">
          <Link href="/" className="hover:text-foreground transition-colors">
            Back to {siteConfig.name}
          </Link>
        </p>
      </div>

      {/* Editorial panel. Decorative, so it is hidden from narrow viewports
          entirely rather than stacked above the form. */}
      <div className="dark bg-background text-foreground hidden flex-col p-12 lg:flex">
        <div className="flex flex-1 items-center">
          <blockquote className="max-w-md">
            <p className="font-display text-display-xs font-semibold text-balance">
              {siteConfig.messages.ideasNeedMore}
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed text-pretty">
              {siteConfig.description}
            </p>
          </blockquote>
        </div>
        <p className="text-muted-foreground text-xs">{siteConfig.etymology}</p>
      </div>
    </div>
  );
}
