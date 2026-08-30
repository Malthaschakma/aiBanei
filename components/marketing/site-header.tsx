"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/marketing/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, siteConfig } from "@/config/site";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

/**
 * Public navigation.
 *
 * Transparent until scrolled, then it picks up a surface and a hairline border.
 * On routes that open with a dark hero it adopts the dark palette while
 * transparent, so the wordmark and links stay legible against it.
 */
const darkHeroRoutes = new Set(["/", "/how-it-works"]);

function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const overDarkHero = darkHeroRoutes.has(pathname) && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-200",
        overDarkHero && "dark",
        scrolled
          ? "bg-background/85 border-border border-b backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center gap-8 px-6 md:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-sm text-sm transition-colors duration-150",
                      active
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/signup">
              {siteConfig.messages.joinCta} <span aria-hidden>&rarr;</span>
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Logo href={null} />
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col p-2">
                {mainNav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="text-foreground hover:bg-surface-sunken rounded-md px-4 py-3 text-base font-medium transition-colors"
                    >
                      {item.title}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              {/* SheetClose dismisses on activation, so the panel closes as
                  navigation starts without an effect watching the pathname. */}
              <div className="mt-auto flex flex-col gap-2 p-6">
                <SheetClose asChild>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/login">Log in</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild size="lg">
                    <Link href="/signup">Create account</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };
