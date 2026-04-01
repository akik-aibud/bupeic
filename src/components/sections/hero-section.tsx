"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Users, Rocket, TrendingUp } from "lucide-react";
import { useStore } from "@/lib/store";

export function HeroSection() {
  const { settings } = useStore();

  return (
    <section className="relative bg-background py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Announcement bar */}
        {settings.announcement && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex justify-center lg:justify-start"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              {settings.announcement}
            </div>
          </motion.div>
        )}

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
              BUP Entrepreneurship & Innovation Club
            </p>

            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {settings.heroTitle || "Empowering Future Innovators"}
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {settings.heroDescription ||
                "We empower students to turn ideas into impact through creativity, collaboration, and entrepreneurship."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-12 px-6 bg-primary text-primary-foreground shadow-md"
                render={<Link href="/events" />}
              >
                Explore Events
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-6 border-border text-foreground"
                render={<Link href="/contact" />}
              >
                Get Involved
              </Button>
            </div>
          </motion.div>

          {/* Right: Clean icon grid placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Lightbulb, label: "Innovate", color: "bg-primary/8" },
                { icon: Users, label: "Collaborate", color: "bg-blue-500/8" },
                { icon: Rocket, label: "Launch", color: "bg-amber-500/8" },
                { icon: TrendingUp, label: "Grow", color: "bg-emerald-500/8" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex flex-col items-center justify-center rounded-2xl border border-gray-200 ${item.color} p-8`}
                >
                  <item.icon className="size-8 text-foreground/70" />
                  <span className="mt-3 text-sm font-medium text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
