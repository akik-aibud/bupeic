"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Target,
  Lightbulb,
  Trophy,
  Handshake,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

const fadeInView = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const activities = [
  {
    number: "01",
    title: "Workshops & Seminars",
    description:
      "Hands-on sessions on business planning, design thinking, pitching, and emerging technologies.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Competitions",
    description:
      "Startup pitch contests, case competitions, and hackathons that challenge you to think big.",
    icon: Trophy,
  },
  {
    number: "03",
    title: "Networking Events",
    description:
      "Connect with entrepreneurs, industry leaders, and alumni who can guide your journey.",
    icon: Handshake,
  },
  {
    number: "04",
    title: "Mentorship Programs",
    description:
      "One-on-one mentoring with experienced founders and professionals to refine your ideas.",
    icon: GraduationCap,
  },
];

const milestones = [
  {
    year: "2021",
    title: "Club Founded",
    description:
      "BUP EIC was officially established by a group of passionate students at Bangladesh University of Professionals.",
  },
  {
    year: "2022",
    title: "First Startup Pitch",
    description:
      "Organized the inaugural Startup Pitch Competition with 50+ participating teams from across BUP.",
  },
  {
    year: "2022",
    title: "Innovation Summit 1.0",
    description:
      "Hosted the first Innovation Summit featuring guest speakers from leading startups in Bangladesh.",
  },
  {
    year: "2023",
    title: "National Recognition",
    description:
      "BUP EIC was recognized as one of the most active entrepreneurship clubs at the national university level.",
  },
  {
    year: "2024",
    title: "100+ Members Milestone",
    description:
      "Crossed 100 active members and expanded to 6 dedicated committees for specialized operations.",
  },
  {
    year: "2025",
    title: "Business Fest 2025",
    description:
      "Launched the flagship BUP Business Fest with inter-university participation and corporate sponsors.",
  },
];

const keyStats = [
  { label: "Founded", value: "2021" },
  { label: "Members", value: "500+" },
  { label: "Events", value: "50+" },
  { label: "Committees", value: "6" },
];

export function AboutContent() {
  const { settings } = useStore();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeIn}>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              About Us
            </span>
            <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              About BUP EIC
            </h1>
            <div className="mt-4 h-1 w-16 rounded-full bg-primary" />
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Innovate, Collaborate, and Elevate
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are — two-column */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Text — left */}
            <motion.div {...fadeInView} className="lg:col-span-3">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Who We Are
              </span>
              <h2 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                Building the next generation of entrepreneurs
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {settings.description} Founded at Bangladesh University of
                Professionals, we are a community of dreamers, doers, and
                innovators committed to building the next generation of
                entrepreneurs.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                We believe that entrepreneurship is not just about starting
                businesses &mdash; it&apos;s about solving problems, creating
                value, and making a positive difference in the world. Through
                events, workshops, and mentorship, we equip our members with the
                skills and mindset to thrive.
              </p>
            </motion.div>

            {/* Stats — right */}
            <motion.div
              {...fadeInView}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-2 gap-4">
                {keyStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  >
                    <p className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission — side by side with border-l accent */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeInView} className="mb-10">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Our Purpose
            </span>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              {...fadeInView}
              className="rounded-xl border border-border border-l-4 border-l-primary bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Eye className="size-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                  Our Vision
                </h3>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                To be the leading platform for student entrepreneurship in
                Bangladesh, inspiring a culture of innovation and self-reliance
                among university students nationwide.
              </p>
            </motion.div>

            <motion.div
              {...fadeInView}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl border border-border border-l-4 border-l-primary bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="size-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                  Our Mission
                </h3>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                To foster entrepreneurial thinking, provide practical learning
                opportunities, and build a supportive community where students
                can develop, test, and launch their ideas with confidence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do — numbered 2x2 grid */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeInView} className="mb-12">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              What We Do
            </span>
            <h2 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Programs that nurture entrepreneurial talent
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group rounded-xl border border-border bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <span className="font-heading text-3xl font-bold text-primary/20">
                    {activity.number}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {activity.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline — vertical with year circles */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeInView} className="mb-12">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Our Journey
            </span>
            <h2 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Key milestones in our growth
            </h2>
          </motion.div>

          <div className="relative ml-6 border-l-2 border-primary/20 pl-10 sm:ml-8 sm:pl-12">
            {milestones.map((milestone, i) => (
              <motion.div
                key={`${milestone.year}-${milestone.title}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative mb-10 last:mb-0"
              >
                {/* Year circle on the line */}
                <div className="absolute -left-[calc(2.5rem+1.25rem+1px)] flex size-10 items-center justify-center rounded-full border-2 border-primary bg-white text-xs font-bold text-primary sm:-left-[calc(3rem+1.25rem+1px)] sm:size-10">
                  {milestone.year}
                </div>

                <h3 className="text-lg font-semibold text-foreground">
                  {milestone.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            {...fadeInView}
            className="rounded-2xl border border-border bg-gradient-to-r from-primary/5 to-transparent p-8 sm:p-12"
          >
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  Want to join us?
                </h2>
                <p className="mt-2 text-base text-muted-foreground">
                  Be part of BUP&apos;s most vibrant entrepreneurship community.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get in Touch
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
