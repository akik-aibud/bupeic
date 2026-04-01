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
    <section id="about" className="bg-muted/30 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            About <span className="text-primary">BUP EIC</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base md:text-lg">
            BUP Entrepreneurship &amp; Innovation Club is a student-led
            organization at Bangladesh University of Professionals dedicated to
            nurturing the next generation of entrepreneurial leaders. Through
            events, workshops, and mentorship, we transform ideas into
            actionable ventures.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-xl border border-border bg-card p-5 text-center shadow-sm transition-shadow hover:shadow-md sm:p-6"
            >
              <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="size-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
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
