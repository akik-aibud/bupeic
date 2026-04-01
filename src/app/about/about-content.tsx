"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Trophy,
  Eye,
  Target,
  Handshake,
  GraduationCap,
} from "lucide-react";
import { useStore } from "@/lib/store";

const activities = [
  {
    icon: Lightbulb,
    title: "Workshops & Seminars",
    description:
      "Hands-on sessions on business planning, design thinking, pitching, and emerging technologies.",
  },
  {
    icon: Trophy,
    title: "Competitions",
    description:
      "Startup pitch contests, case competitions, and hackathons that challenge you to think big.",
  },
  {
    icon: Handshake,
    title: "Networking Events",
    description:
      "Connect with entrepreneurs, industry leaders, and alumni who can guide your journey.",
  },
  {
    icon: GraduationCap,
    title: "Mentorship Programs",
    description:
      "One-on-one mentoring with experienced founders and professionals to refine your ideas.",
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

export function AboutContent() {
  const { settings } = useStore();

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-muted/50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            About BUP EIC
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            Innovate, Collaborate, and Elevate
          </motion.p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-heading text-2xl font-bold text-foreground sm:text-3xl"
            >
              Who We Are
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {settings.description} Founded at Bangladesh University of
              Professionals, we are a community of dreamers, doers, and
              innovators committed to building the next generation of
              entrepreneurs.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              We believe that entrepreneurship is not just about starting
              businesses &mdash; it&apos;s about solving problems, creating
              value, and making a positive difference in the world. Through
              events, workshops, and mentorship, we equip our members with the
              skills and mindset to thrive.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-border bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <Eye className="size-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                Our Vision
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                To be the leading platform for student entrepreneurship in
                Bangladesh, inspiring a culture of innovation and self-reliance
                among university students nationwide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl border border-border bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="size-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                Our Mission
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                To foster entrepreneurial thinking, provide practical learning
                opportunities, and build a supportive community where students
                can develop, test, and launch their ideas with confidence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-heading text-2xl font-bold text-foreground sm:text-3xl"
            >
              What We Do
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Programs designed to nurture entrepreneurial talent and build
              real-world skills
            </motion.p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl border border-border bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-primary/10">
                  <activity.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {activity.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {activity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-heading text-2xl font-bold text-foreground sm:text-3xl"
            >
              Our Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground"
            >
              Key milestones in BUP EIC&apos;s growth and achievements
            </motion.p>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="relative border-l-2 border-primary/20 pl-8">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={`${milestone.year}-${milestone.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="relative mb-10 last:mb-0"
                >
                  {/* Dot */}
                  <div className="absolute -left-[calc(2rem+5px)] top-1 size-3 rounded-full border-2 border-primary bg-white" />

                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {milestone.year}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">
                    {milestone.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
