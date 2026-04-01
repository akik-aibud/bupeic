"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";

export function HeroSection() {
  const { settings } = useStore();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-background">
      {/* Subtle background pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[70vh] sm:px-6 md:min-h-[85vh] md:py-24">
        {/* Announcement Badge */}
        {settings.announcement && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary sm:text-sm"
          >
            <Sparkles className="size-3.5 sm:size-4" />
            {settings.announcement}
          </motion.div>
        )}

        {!settings.announcement && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary sm:text-sm"
          >
            <Sparkles className="size-3.5 sm:size-4" />
            Executive Panel 2025-2026 Announced
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
        >
          BUP Entrepreneurship
          <br />
          <span className="text-primary">&amp; Innovation Club</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-base font-medium italic text-muted-foreground sm:mt-4 sm:text-lg md:text-xl"
        >
          &ldquo;Innovate, Collaborate, and Elevate&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base md:text-lg"
        >
          {settings.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
        >
          <Button
            size="lg"
            className="h-11 px-6 text-base"
            render={<Link href="/events" />}
          >
            Explore Events
            <ArrowRight className="ml-1 size-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-11 px-6 text-base"
            render={<Link href="/contact" />}
          >
            Join Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
