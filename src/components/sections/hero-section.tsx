"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle gradient accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
        >
          <Sparkles className="size-4" />
          Executive Panel 2025-2026 Announced
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          BUP Entrepreneurship
          <br />
          <span className="text-primary">&amp; Innovation Club</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg font-medium italic text-muted-foreground sm:text-xl"
        >
          &ldquo;Innovate, Collaborate, and Elevate&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          BUP EIC empowers students to turn ideas into impact through creativity
          and teamwork. We cultivate future changemakers and entrepreneurial
          leaders at Bangladesh University of Professionals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button size="lg" className="h-11 px-6 text-base">
            Explore Events
            <ArrowRight className="ml-1 size-4" />
          </Button>
          <Button variant="outline" size="lg" className="h-11 px-6 text-base">
            Join Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
