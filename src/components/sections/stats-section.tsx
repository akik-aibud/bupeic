"use client";

import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

export function StatsSection() {
  const { stats } = useStore();

  const items = [
    { value: stats.members || 100, label: "Active members" },
    { value: stats.events || 50, label: "Events organised" },
    { value: stats.partners || 20, label: "Industry partners" },
    { value: stats.alumni || 500, label: "Alumni network" },
  ];

  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-foreground py-20 text-background sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              02 — By the numbers
            </div>
            <h2 className="mt-3 max-w-xl font-heading text-3xl font-black leading-[1.05] tracking-[-0.02em] sm:text-5xl">
              A student movement,
              <br />
              <span className="italic font-semibold text-primary">
                measured in impact.
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-background/60">
            Five cohorts. Dozens of partner brands. One of BUP&apos;s most
            active student organisations.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px bg-background/10 lg:grid-cols-4">
          {items.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-foreground p-6 sm:p-8"
            >
              <div className="font-heading text-5xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                {stat.value}
                <span className="text-primary">+</span>
              </div>
              <div className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-background/60">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
