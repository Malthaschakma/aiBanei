import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border text-xs font-medium [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-border bg-surface text-foreground",
        muted: "border-transparent bg-surface-sunken text-muted-foreground",
        outline: "border-border-strong bg-transparent text-foreground",
        accent: "border-transparent bg-accent text-accent-foreground",
        success: "border-transparent bg-success-subtle text-success",
        warning: "border-transparent bg-warning-subtle text-warning",
        danger: "border-transparent bg-danger-subtle text-danger",
        info: "border-transparent bg-info-subtle text-info",
      },
      size: {
        sm: "h-5 px-1.5",
        md: "h-6 px-2",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
