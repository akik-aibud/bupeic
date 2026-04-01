"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Lightbulb, Users } from "lucide-react";
import { useStore } from "@/lib/store";

export function HeroSection() {
  const { settings } = useStore();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-background">
      {/* Premium background gradients and patterns */}
      <div className="pointer-events-none absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 blur-3xl"
        />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[80vh] sm:px-6 md:min-h-[90vh] md:py-24">
        {/* Announcement Badge */}
        {settings.announcement && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm sm:text-sm"
          >
            <Sparkles className="size-3.5 sm:size-4" />
            {settings.announcement}
          </motion.div>
        )}

        {!settings.announcement && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm sm:text-sm"
          >
            <Sparkles className="size-3.5 sm:size-4" />
            Executive Panel 2025-2026 Announced
          </motion.div>
        )}

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", delay: 0.1 }}
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-serif"
        >
          BUP Entrepreneurship
          <br />
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            & Innovation Club
          </span>
        </motion.h1>

        {/* Motto */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg font-medium italic text-muted-foreground sm:mt-8 sm:text-xl md:text-2xl"
        >
          &ldquo;Innovate, Collaborate, and Elevate&rdquo;
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg md:text-xl"
        >
          {settings.description}
        </motion.p>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex flex-wrap justify-center gap-6 sm:mt-10"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground sm:text-base">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
              <Lightbulb className="size-4 text-primary" />
            </div>
            <span>Innovation</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground sm:text-base">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
              <Users className="size-4 text-primary" />
            </div>
            <span>Collaboration</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground sm:text-base">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
              <Zap className="size-4 text-primary" />
            </div>
            <span>Impact</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:gap-5"
        >
          <Button
            size="lg"
            className="h-14 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
            render={<Link href="/events" />}
          >
            Explore Events
            <ArrowRight className="ml-2 size-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-8 text-base border-2 transition-all hover:bg-primary hover:text-primary-foreground hover:scale-105"
            render={<Link href="/contact" />}
          >
            Join Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
