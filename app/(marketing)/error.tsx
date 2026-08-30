"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/empty-state";
import { Container } from "@/components/ui/section";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replaced by the error reporter once analytics land in Phase 2.
    console.error(error);
  }, [error]);

  return (
    <Container className="py-20">
      <ErrorState
        title="This page didn't load"
        description="Something failed on our side. Trying again usually works; if it keeps happening the problem is ours, not yours."
        action={
          <>
            <Button onClick={reset}>Try again</Button>
            {error.digest ? (
              <span className="tabular text-muted-foreground self-center text-xs">
                Reference {error.digest}
              </span>
            ) : null}
          </>
        }
      />
    </Container>
  );
}
