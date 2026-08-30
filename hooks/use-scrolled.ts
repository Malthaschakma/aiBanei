"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * Whether the page has scrolled past `threshold`.
 *
 * Uses useSyncExternalStore rather than an effect so the value is correct on
 * the very first client render — including a reload part-way down the page —
 * without a second render pass.
 */
export function useScrolled(threshold = 8): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  );
}
