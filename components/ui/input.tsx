import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  type = "text",
  ...props
}: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-border-strong bg-surface text-foreground h-10 w-full rounded-md border px-3 text-sm transition-colors duration-150",
        "placeholder:text-muted-foreground",
        "hover:border-foreground/25",
        "focus-visible:border-foreground focus-visible:outline-none",
        "disabled:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-60",
        "aria-invalid:border-danger aria-invalid:focus-visible:border-danger",
        "file:text-foreground file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
