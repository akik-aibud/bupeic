"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  ShieldAlert,
  Eye,
  EyeOff,
  CalendarDays,
  Users,
  BarChart3,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/admin");
    }
  }, [authLoading, isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        router.replace("/admin");
      } else {
        setError(result.error ?? "Login failed. Please try again.");
        setIsSubmitting(false);
      }
    }, 300);
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="flex items-center gap-3 px-6 py-4 lg:px-10">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
          E
        </div>
        <span className="text-base font-semibold text-foreground">BUP EIC</span>
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left side - Login form */}
        <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-16 xl:px-24">
          <div className="w-full max-w-md">
            {/* Heading */}
            <div className="mb-8">
              <h1 className="font-heading text-2xl font-bold text-foreground">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to manage BUP EIC
              </p>
            </div>

            {/* Error alert */}
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-r-lg border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
                <ShieldAlert className="size-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                  autoFocus
                  disabled={isSubmitting}
                  className="h-12 px-4 py-3 rounded-lg"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="current-password"
                    disabled={isSubmitting}
                    className="h-12 px-4 py-3 pr-12 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-4 rounded border-border text-primary accent-primary"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Remember me
                </Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="h-12 w-full rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-5 animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
              <span className="font-medium">Demo:</span>{" "}
              superadmin@bupeic.org / admin123
            </div>
          </div>
        </div>

        {/* Right side - Branding (hidden on mobile/tablet) */}
        <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center bg-primary/5 overflow-hidden">
          {/* Decorative circle accent */}
          <div className="absolute -bottom-20 -right-20 size-80 rounded-full bg-primary/10" />
          <div className="absolute -top-16 -left-16 size-48 rounded-full bg-primary/5" />

          <div className="relative z-10 text-center px-12 max-w-lg">
            {/* Large branding icon */}
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-3xl font-bold">
              E
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              BUP Entrepreneurship &amp; Innovation Club
            </h2>
            <p className="mt-2 text-base text-muted-foreground">Admin Panel</p>

            {/* Feature highlights */}
            <div className="mt-10 space-y-4">
              {[
                { icon: CalendarDays, label: "Manage Events" },
                { icon: Users, label: "Track Members" },
                { icon: BarChart3, label: "View Analytics" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-lg bg-background/60 px-4 py-3 text-sm text-foreground backdrop-blur-sm"
                >
                  <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
