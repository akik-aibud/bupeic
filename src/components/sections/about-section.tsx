"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lightbulb, Users, TrendingUp, ArrowRight } from "lucide-react";

const pillars = [
  {
    icon: Lightbulb,
    title: "Innovate",
    description:
      "We foster creative thinking and encourage students to develop groundbreaking ideas that solve real-world problems.",
  },
  {
    icon: Users,
    title: "Collaborate",
    description:
      "Through teamwork and networking, we connect aspiring entrepreneurs with mentors, peers, and industry leaders.",
  },
  {
    icon: TrendingUp,
    title: "Elevate",
    description:
      "We provide platforms, competitions, and workshops that help students grow their skills and launch their ventures.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-20 lg:py-28">
      {/* Dot pattern on right half */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
              About Us
            </span>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Empowering Future{" "}
              <span className="text-primary">Changemakers</span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              BUP Entrepreneurship & Innovation Club is a student-led
              organization at Bangladesh University of Professionals dedicated to
              nurturing the next generation of entrepreneurial leaders. We
              believe every student has the potential to create meaningful change.
            </p>

            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Learn More
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>

          {/* Right: Stacked horizontal cards */}
          <div className="space-y-4">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
                className="flex gap-4 rounded-xl border border-border border-l-4 border-l-primary bg-white p-5"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <pillar.icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
