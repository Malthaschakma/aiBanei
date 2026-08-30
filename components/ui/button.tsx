import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap",
    "font-medium transition-colors duration-150 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ring)",
    "disabled:pointer-events-none disabled:opacity-45",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        /** Highest-emphasis action. Reads as near-black on light, near-white on dark. */
        primary:
          "bg-inverse text-inverse-foreground hover:bg-inverse/90 active:bg-inverse/80",
        /** Reserved for the single most consequential action on a surface. */
        accent:
          "bg-accent text-accent-foreground hover:brightness-95 active:brightness-90",
        outline:
          "border border-border-strong bg-transparent hover:bg-surface-sunken active:bg-border/60",
        secondary:
          "bg-surface-sunken text-foreground hover:bg-border/70 active:bg-border",
        ghost:
          "bg-transparent hover:bg-surface-sunken active:bg-border/60 text-foreground",
        danger: "bg-danger text-white hover:brightness-110 active:brightness-95",
        link: "bg-transparent text-foreground underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-[0.8125rem] [&_svg]:size-3.5",
        md: "h-10 rounded-md px-4 text-sm [&_svg]:size-4",
        lg: "h-12 rounded-lg px-6 text-[0.9375rem] [&_svg]:size-4",
        icon: "size-10 rounded-md [&_svg]:size-4",
        "icon-sm": "size-8 rounded-md [&_svg]:size-3.5",
      },
    },
    compoundVariants: [{ variant: "link", size: "md", class: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-loading={loading || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled ?? (asChild ? undefined : loading)}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="absolute animate-spin" aria-hidden />
          <span className="contents invisible">{children}</span>
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
