"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseEnv } from "./env";

/**
 * Returns null when Supabase is not configured. Callers must handle that case
 * rather than assuming a client exists.
 */
export function createClient() {
  const env = getSupabaseEnv();
  if (!env) return null;

  return createBrowserClient(env.url, env.anonKey);
}
