"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Trophy,
  GraduationCap,
  Target,
  Eye,
  Handshake,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/lib/store";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

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
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-primary py-14 text-primary-foreground sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />
        <div className="container relative mx-auto px-4 text-center sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            About BUP EIC
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-3 max-w-2xl text-base text-primary-foreground/80 sm:mt-4 sm:text-lg"
          >
            Innovate, Collaborate, and Elevate
          </motion.p>
        </div>
      </section>

      {/* Mission & History */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-foreground sm:text-3xl"
            >
              Who We Are
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base md:text-lg"
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
              transition={{ delay: 0.2 }}
              className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base md:text-lg"
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

      {/* Vision & Mission Cards */}
      <section className="bg-muted/50 py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto grid max-w-4xl gap-6 sm:gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-none bg-card shadow-md">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                    <Eye className="size-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground sm:text-xl">
                    Our Vision
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                    To be the leading platform for student entrepreneurship in
                    Bangladesh, inspiring a culture of innovation and
                    self-reliance among university students nationwide.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-none bg-card shadow-md">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="size-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground sm:text-xl">
                    Our Mission
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                    To foster entrepreneurial thinking, provide practical
                    learning opportunities, and build a supportive community
                    where students can develop, test, and launch their ideas with
                    confidence.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-2xl font-bold text-foreground sm:text-3xl"
          >
            What We Do
          </motion.h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground sm:mt-4 sm:text-base">
            We run a variety of programs designed to nurture entrepreneurial
            talent and build real-world skills.
          </p>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card className="h-full border-none bg-card shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="p-5 sm:p-6">
                    <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <activity.icon className="size-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground sm:text-lg">
                      {activity.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-muted/50 py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-2xl font-bold text-foreground sm:text-3xl"
          >
            Our Journey
          </motion.h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground sm:mt-4 sm:text-base">
            Key milestones in BUP EIC&apos;s growth and achievements.
          </p>

          <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
            <div className="relative border-l-2 border-primary/30 pl-6 sm:pl-8">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={`${milestone.year}-${milestone.title}`}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative mb-8 last:mb-0 sm:mb-10"
                >
                  {/* Dot */}
                  <div className="absolute -left-[calc(1.5rem+5px)] top-1 size-3 rounded-full border-2 border-primary bg-background sm:-left-[calc(2rem+5px)]" />
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {milestone.year}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-foreground sm:text-lg">
                    {milestone.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
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
