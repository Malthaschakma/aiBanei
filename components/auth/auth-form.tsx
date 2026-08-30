import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Auth is scaffolded but not wired. When Supabase keys are absent the form
 * renders disabled with an explicit notice, rather than accepting input it
 * cannot act on.
 */
function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const configured = isSupabaseConfigured();
  const isSignup = mode === "signup";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-foreground text-2xl font-semibold tracking-tight">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {isSignup
            ? "Tell us what you are building or looking for, and we will start finding the people who can help."
            : "Sign in to pick up where you left off."}
        </p>
      </div>

      {!configured ? (
        <div
          role="status"
          className="border-info/30 bg-info-subtle flex items-start gap-2.5 rounded-md border px-3 py-2.5"
        >
          <Info className="text-info mt-0.5 size-3.5 shrink-0" aria-hidden />
          <p className="text-foreground text-xs leading-relaxed">
            Accounts are not connected yet. Add your Supabase URL and anon key
            to <code className="font-mono">.env.local</code> to enable sign-in.
          </p>
        </div>
      ) : null}

      <form className="flex flex-col gap-4">
        {isSignup ? (
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              disabled={!configured}
              required
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            disabled={!configured}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            disabled={!configured}
            required
            minLength={8}
          />
          {isSignup ? (
            <p className="text-muted-foreground text-xs">
              At least 8 characters.
            </p>
          ) : null}
        </div>

        <Button type="submit" size="lg" disabled={!configured} className="mt-2">
          {isSignup ? "Create account" : "Log in"}
        </Button>
      </form>

      <p className="text-muted-foreground text-sm">
        {isSignup ? "Already have an account? " : "New to Aibanei? "}
        <a
          href={isSignup ? "/login" : "/signup"}
          className="text-foreground font-medium underline underline-offset-4"
        >
          {isSignup ? "Log in" : "Create one"}
        </a>
      </p>
    </div>
  );
}

export { AuthForm };
