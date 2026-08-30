import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-border-strong bg-surface text-foreground field-sizing-content min-h-24 w-full rounded-md border px-3 py-2 text-sm transition-colors duration-150",
        "placeholder:text-muted-foreground",
        "hover:border-foreground/25",
        "focus-visible:border-foreground focus-visible:outline-none",
        "disabled:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-60",
        "aria-invalid:border-danger",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
