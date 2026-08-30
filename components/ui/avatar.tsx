"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full select-none",
  {
    variants: {
      size: {
        xs: "size-6 text-[0.625rem]",
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-14 text-base",
        xl: "size-20 text-xl",
      },
    },
    defaultVariants: { size: "md" },
  },
);

function Avatar({
  className,
  size,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-surface-sunken text-muted-foreground flex size-full items-center justify-center font-medium",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Overlapping stack. `max` truncates and renders a "+n" counter so the group
 * keeps a predictable width regardless of member count.
 */
function AvatarGroup({
  children,
  max = 4,
  size = "sm",
  className,
  ...props
}: ComponentProps<"div"> &
  VariantProps<typeof avatarVariants> & { max?: number }) {
  const items = Array.isArray(children) ? children : [children];
  const visible = items.slice(0, max);
  const overflow = items.length - visible.length;

  return (
    <div
      data-slot="avatar-group"
      className={cn("flex items-center -space-x-2", className)}
      {...props}
    >
      {visible}
      {overflow > 0 ? (
        <span
          className={cn(
            avatarVariants({ size }),
            "border-background bg-surface-sunken text-muted-foreground ring-background z-10 items-center justify-center border-2 font-medium",
          )}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
