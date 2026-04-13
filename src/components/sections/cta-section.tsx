"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(800px 400px at 50% 100%, hsl(var(--primary) / 0.14), transparent 70%)",
        }}
      />

      <div className="container mx-auto max-w-5xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
            05 — Your move
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-5xl font-black leading-[0.98] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-7xl">
            Turn ideas into{" "}
            <span className="italic font-semibold text-primary">
              impact.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Whether you&apos;re a builder, a thinker, or just curious — there
            is a place for you here. Join the club, join a competition, or
            just drop us a line.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/innoventure"
              className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 text-sm font-bold uppercase tracking-wider text-background transition-transform hover:-translate-y-0.5"
            >
              Join Innoventure 1.0
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/contact"
              className="text-sm font-bold uppercase tracking-wider text-foreground underline decoration-primary decoration-2 underline-offset-[6px] hover:decoration-4"
            >
              Say hello →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
