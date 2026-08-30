import Link from "next/link";

import { Logo } from "@/components/marketing/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Container className="flex min-h-dvh flex-col py-8">
      <Logo />
      <div className="flex flex-1 flex-col items-start justify-center">
        <p className="eyebrow">404</p>
        <h1 className="font-display text-display-sm text-foreground mt-4 font-semibold tracking-tight text-balance">
          There&rsquo;s nothing at this address
        </h1>
        <p className="text-muted-foreground mt-3 max-w-md text-base leading-relaxed text-pretty">
          The page may have moved, or the opportunity may have been unpublished
          by the team behind it.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/explore">Explore opportunities</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
