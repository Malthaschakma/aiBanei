"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Makes it unambiguous that the records on screen are fixtures. Required
 * anywhere development data is rendered, so a demo is never mistaken for a
 * real listing.
 */
function DevDataBanner({ className }: { className?: string }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      role="status"
      className={cn(
        "border-warning/30 bg-warning-subtle flex items-start gap-3 rounded-md border px-4 py-3",
        className,
      )}
    >
      <p className="text-foreground flex-1 text-xs leading-relaxed">
        <span className="text-warning font-semibold">Development data.</span>{" "}
        Every opportunity, person, figure and verification record shown here is
        invented for demonstration. None of these companies exist and no claim
        made on this page has been verified.
      </p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="text-muted-foreground hover:text-foreground -mr-1 shrink-0 rounded p-1 transition-colors"
        aria-label="Dismiss development data notice"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}

export { DevDataBanner };
