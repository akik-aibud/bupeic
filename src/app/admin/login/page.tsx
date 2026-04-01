"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LogIn,
  Loader2,
  AlertCircle,
  Info,
  Eye,
  EyeOff,
  GraduationCap,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
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
    <div className="flex min-h-screen">
      {/* Left side - Login form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Logo / Branding */}
          <div className="mb-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                E
              </div>
              <span className="text-lg font-semibold text-foreground">
                BUP EIC
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to the management panel
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border-l-4 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="you@bupeic.org"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
                autoFocus
                disabled={isSubmitting}
                className="h-12 px-4 py-3 rounded-lg border border-border bg-background text-base focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
              />
            </div>

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
                  className="h-12 px-4 py-3 pr-12 rounded-lg border border-border bg-background text-base focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

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
                <>
                  <LogIn className="size-5 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-8 flex items-start gap-3 rounded-lg border-l-4 border-blue-400 bg-blue-50 px-4 py-3">
            <Info className="size-4 mt-0.5 shrink-0 text-blue-600" />
            <div className="text-xs text-blue-700">
              <p className="font-semibold mb-1">Demo credentials</p>
              <p>
                Email:{" "}
                <code className="font-mono bg-blue-100 px-1.5 py-0.5 rounded text-blue-800">
                  superadmin@bupeic.org
                </code>
              </p>
              <p className="mt-0.5">
                Password:{" "}
                <code className="font-mono bg-blue-100 px-1.5 py-0.5 rounded text-blue-800">
                  admin123
                </code>
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            BUP Entrepreneurship &amp; Innovation Club
          </p>
        </div>
      </div>

      {/* Right side - Branding illustration (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-primary/5 border-l border-border">
        <div className="text-center px-12 max-w-lg">
          <div className="mx-auto mb-8 flex size-24 items-center justify-center rounded-3xl bg-primary/10">
            <GraduationCap className="size-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            BUP EIC Admin Panel
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Manage events, team members, messages, and site settings for
            Bangladesh University of Professionals Entrepreneurship &amp;
            Innovation Club.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-xs text-muted-foreground mt-1">Events</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">100+</div>
              <div className="text-xs text-muted-foreground mt-1">Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">5K+</div>
              <div className="text-xs text-muted-foreground mt-1">
                Followers
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
