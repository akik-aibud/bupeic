"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "Innovate",
    description:
      "Foster creative thinking. Build groundbreaking ideas. Solve problems that matter.",
  },
  {
    number: "02",
    title: "Collaborate",
    description:
      "Teamwork, networking, and mentorship — connecting students with peers and industry leaders.",
  },
  {
    number: "03",
    title: "Elevate",
    description:
      "Platforms, competitions, workshops — the runway to grow skills and launch ventures.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Left label + headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              01 — About the club
            </div>
            <h2 className="mt-4 font-heading text-4xl font-black leading-[1.02] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-6xl">
              A movement for
              <br />
              <span className="italic font-semibold text-primary">
                future builders.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              BUP Entrepreneurship &amp; Innovation Club is a student-led
              organisation at Bangladesh University of Professionals. We exist
              because every student has the potential to make something the
              world has never seen.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground underline decoration-primary decoration-2 underline-offset-[6px] hover:decoration-4"
            >
              Read our story
              <ArrowUpRight className="size-4" />
            </Link>
          </motion.div>

          {/* Right pillars — editorial list */}
          <div className="lg:col-span-7">
            <ul className="divide-y divide-border/60 border-y border-border/60">
              {pillars.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-6 py-6 transition-colors hover:bg-primary/[0.03] sm:py-8"
                >
                  <span className="font-heading text-lg font-bold text-primary/70">
                    {p.number}
                  </span>
                  <div>
                    <h3 className="font-heading text-2xl font-black tracking-[-0.02em] text-foreground sm:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                  </div>
                  <span className="hidden h-px w-12 translate-y-4 bg-primary transition-all group-hover:w-20 sm:block" />
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
