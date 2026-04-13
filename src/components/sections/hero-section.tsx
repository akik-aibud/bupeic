"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";

export function HeroSection() {
  const { settings, stats } = useStore();

  return (
    <section className="relative overflow-hidden bg-background">
      {settings.announcement && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border-b border-primary/15 bg-primary/5 px-4 py-2 text-center text-sm text-primary"
        >
          <span className="mr-2 inline-block size-1.5 rounded-full bg-primary" />
          {settings.announcement}
        </motion.div>
      )}

      {/* Ambient emerald wash */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 500px at 85% 10%, hsl(var(--primary) / 0.12), transparent 60%), radial-gradient(700px 600px at 10% 100%, hsl(var(--primary) / 0.06), transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 pt-16 pb-24 sm:px-6 lg:pt-24 lg:pb-32">
        {/* Meta ribbon */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 grid grid-cols-2 gap-6 border-y border-border/60 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:grid-cols-4"
        >
          <span>
            Est. <strong className="ml-1 text-foreground">BUP · Dhaka</strong>
          </span>
          <span>
            Panel <strong className="ml-1 text-foreground">2025 — 2026</strong>
          </span>
          <span>
            Members{" "}
            <strong className="ml-1 text-foreground">
              {stats.members > 0 ? `${stats.members}+` : "100+"}
            </strong>
          </span>
          <span>
            Events{" "}
            <strong className="ml-1 text-foreground">
              {stats.events > 0 ? `${stats.events}+` : "50+"}
            </strong>
          </span>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left: editorial headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <h1 className="font-heading text-[clamp(2.75rem,7vw,6rem)] font-black leading-[0.95] tracking-[-0.035em] text-foreground">
              Innovate.
              <br />
              <span className="text-primary italic font-semibold">
                Collaborate.
              </span>
              <br />
              Elevate.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {settings.heroDescription ||
                "BUP Entrepreneurship & Innovation Club turns student ideas into real-world ventures through competitions, mentorship, and a national stage."}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/innoventure"
                className="group inline-flex items-center gap-3 rounded-none bg-foreground px-7 py-4 text-sm font-bold uppercase tracking-wider text-background transition-transform hover:-translate-y-0.5"
              >
                <Sparkles className="size-4 text-primary" />
                Innoventure 1.0
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/events"
                className="text-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[6px] hover:decoration-4"
              >
                All events →
              </Link>
            </div>
          </motion.div>

          {/* Right: Innoventure marquee card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative lg:col-span-5"
          >
            <Link
              href="/innoventure"
              className="group relative block overflow-hidden rounded-2xl border border-primary/20 bg-[#05110d] p-8 text-white shadow-[0_24px_60px_-24px_rgba(16,185,129,0.5)] transition-transform hover:-translate-y-1"
              style={{
                backgroundImage:
                  "radial-gradient(600px 400px at 80% 0%, rgba(16,185,129,0.35), transparent 60%), radial-gradient(500px 300px at 10% 100%, rgba(4,120,87,0.4), transparent 70%)",
              }}
            >
              <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.22em] text-white/60">
                <span>Flagship Competition</span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                  Registration open
                </span>
              </div>

              <div className="mt-8 font-heading text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.9] tracking-[-0.04em]">
                INNO
                <span className="block italic font-semibold text-primary">
                  venture
                </span>
                <span className="mt-1 block text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.6)]">
                  01.0
                </span>
              </div>

              <div className="mt-8 space-y-1 border-t border-white/10 pt-4 text-xs text-white/70">
                <p>
                  <strong className="text-white">Innovation Track</strong> ·
                  Case challenge → SBU Launch
                </p>
                <p>
                  <strong className="text-white">Venture Track</strong> · Pitch
                  deck → Final showcase
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                Enter the arena
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
