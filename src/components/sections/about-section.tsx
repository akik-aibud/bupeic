"use client";

import { motion } from "framer-motion";
import { Lightbulb, Users, TrendingUp } from "lucide-react";

const features = [
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
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About BUP EIC
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            BUP Entrepreneurship & Innovation Club is a student-led organization at Bangladesh University of
            Professionals dedicated to nurturing the next generation of entrepreneurial leaders.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-xl border border-border bg-white p-6 dark:bg-card"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="size-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
