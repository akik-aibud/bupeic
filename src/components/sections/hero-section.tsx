"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, Heart } from "lucide-react";
import { useStore } from "@/lib/store";
import { useMemo } from "react";

export function HeroSection() {
  const { settings, events, stats } = useStore();

  const nextEvent = useMemo(() => {
    return events
      .filter((e) => e.status === "upcoming" || e.status === "ongoing")
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      [0];
  }, [events]);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-background">
      {/* Announcement bar */}
      {settings.announcement && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border-b border-primary/10 bg-primary/5 px-4 py-2 text-center text-sm text-primary"
        >
          <span className="mr-2 inline-block size-1.5 rounded-full bg-primary" />
          {settings.announcement}
        </motion.div>
      )}

      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center px-4 py-16 sm:px-6 lg:py-0">
        <div className="grid w-full items-center gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left: Content — 60% */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            {/* Pill badge */}
            <span className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Executive Panel 2025-2026
            </span>

            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              BUP Entrepreneurship &{" "}
              <span className="text-primary">Innovation</span> Club
            </h1>

            <p className="mt-2 font-heading text-lg font-medium text-muted-foreground/80">
              {settings.heroTitle || "Innovate, Collaborate, and Elevate"}
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {settings.heroDescription ||
                "We empower students at Bangladesh University of Professionals to turn ideas into impact through creativity, collaboration, and entrepreneurship."}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                className="h-11 rounded-full bg-primary px-8 text-primary-foreground shadow-md"
                render={<Link href="/events" />}
              >
                Explore Events
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                variant="outline"
                className="h-11 rounded-full px-8"
                render={<Link href="/team" />}
              >
                Meet the Team
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="size-4 text-primary/70" />
              <span>
                <strong className="font-semibold text-foreground">
                  {stats.followers > 0
                    ? `${stats.followers.toLocaleString()}+`
                    : "950+"}
                </strong>{" "}
                followers on Facebook
              </span>
            </div>
          </motion.div>

          {/* Right: Visual composition — 40% */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:col-span-2 lg:block"
          >
            {/* Green circle accent — background */}
            <div className="absolute -right-8 -top-8 size-64 rounded-full bg-primary/8" />

            {/* Next event card */}
            <div className="relative z-10 rounded-2xl border border-border bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <CalendarDays className="size-3.5" />
                Next Event
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {nextEvent?.title || "Startup Pitch 3.0"}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {nextEvent
                  ? new Date(nextEvent.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Coming Soon"}
              </p>
              {nextEvent?.location && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {nextEvent.location}
                </p>
              )}
            </div>

            {/* Floating stat badge — offset */}
            <div className="relative z-10 -mt-4 ml-auto mr-4 w-fit rounded-xl border border-border bg-white px-5 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="font-heading text-2xl font-bold text-foreground">
                {stats.events > 0 ? `${stats.events}+` : "50+"}
              </div>
              <div className="text-xs text-muted-foreground">
                Events Organized
              </div>
            </div>

            {/* Members stat — offset other direction */}
            <div className="relative z-10 -mt-2 ml-8 w-fit rounded-xl border border-border bg-white px-5 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="font-heading text-2xl font-bold text-primary">
                {stats.members > 0 ? `${stats.members}+` : "100+"}
              </div>
              <div className="text-xs text-muted-foreground">
                Active Members
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
