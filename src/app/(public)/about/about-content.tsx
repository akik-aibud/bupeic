"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";

const fadeInView = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const activities = [
  {
    number: "01",
    title: "Workshops & Seminars",
    description:
      "Hands-on sessions on business planning, design thinking, pitching, and emerging technologies.",
  },
  {
    number: "02",
    title: "Competitions",
    description:
      "Startup pitch contests, case competitions, and hackathons that challenge you to think big.",
  },
  {
    number: "03",
    title: "Networking Events",
    description:
      "Connect with entrepreneurs, industry leaders, and alumni who can guide your journey.",
  },
  {
    number: "04",
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
      "Recognised as one of the most active entrepreneurship clubs at the national university level.",
  },
  {
    year: "2024",
    title: "100+ Members",
    description:
      "Crossed 100 active members and expanded to 6 dedicated committees for specialised operations.",
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
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 lg:pb-24">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 500px at 85% 0%, hsl(var(--primary) / 0.12), transparent 60%)",
          }}
        />
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeInView}>
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              00 — About the club
            </div>
            <h1 className="mt-4 max-w-4xl font-heading text-[clamp(2.5rem,6.5vw,5.5rem)] font-black leading-[0.95] tracking-[-0.035em] text-foreground">
              A student-led home for{" "}
              <span className="italic font-semibold text-primary">
                bold ideas.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              BUP Entrepreneurship &amp; Innovation Club is where dreamers,
              doers and builders at Bangladesh University of Professionals
              turn classroom ideas into real ventures — through events,
              workshops, mentorship, and a national stage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are + stats */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-16 lg:grid-cols-12">
            <motion.div {...fadeInView} className="lg:col-span-7">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                01 — Who we are
              </div>
              <h2 className="mt-3 font-heading text-4xl font-black leading-[1.02] tracking-[-0.025em] text-foreground sm:text-5xl">
                Building the next generation of{" "}
                <span className="italic font-semibold text-primary">
                  entrepreneurs.
                </span>
              </h2>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  {settings.description} We are a community of dreamers, doers,
                  and innovators committed to building the next generation of
                  entrepreneurs.
                </p>
                <p>
                  We believe entrepreneurship is not just about starting
                  businesses — it&apos;s about solving problems, creating
                  value, and making a positive difference in the world.
                  Through events, workshops, and mentorship, we equip members
                  with the skills and mindset to thrive.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeInView}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="grid grid-cols-2 gap-px bg-border/60">
                {keyStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-background p-6 sm:p-7"
                  >
                    <p className="font-heading text-5xl font-black tracking-[-0.03em] text-foreground sm:text-6xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="border-y border-border/60 bg-muted/30 py-20 lg:py-28">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeInView}>
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              02 — Our purpose
            </div>
          </motion.div>

          <div className="mt-10 grid gap-px bg-border/60 md:grid-cols-2">
            <motion.div
              {...fadeInView}
              className="bg-background p-8 sm:p-10"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                Vision
              </p>
              <h3 className="mt-3 font-heading text-3xl font-black tracking-[-0.025em] text-foreground sm:text-4xl">
                Lead student entrepreneurship in{" "}
                <span className="italic font-semibold text-primary">
                  Bangladesh.
                </span>
              </h3>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Be the leading platform for student entrepreneurship in
                Bangladesh, inspiring a culture of innovation and
                self-reliance among university students nationwide.
              </p>
            </motion.div>

            <motion.div
              {...fadeInView}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-background p-8 sm:p-10"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                Mission
              </p>
              <h3 className="mt-3 font-heading text-3xl font-black tracking-[-0.025em] text-foreground sm:text-4xl">
                Test ideas. Launch{" "}
                <span className="italic font-semibold text-primary">
                  with confidence.
                </span>
              </h3>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Foster entrepreneurial thinking, provide practical learning
                opportunities, and build a supportive community where
                students can develop, test, and launch ideas with confidence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What we do — editorial list */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeInView} className="mb-14">
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              03 — What we do
            </div>
            <h2 className="mt-3 max-w-2xl font-heading text-4xl font-black leading-[1.02] tracking-[-0.025em] text-foreground sm:text-5xl">
              Programs that{" "}
              <span className="italic font-semibold text-primary">
                nurture talent.
              </span>
            </h2>
          </motion.div>

          <ul className="divide-y divide-border/60 border-y border-border/60">
            {activities.map((a, i) => (
              <motion.li
                key={a.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group grid grid-cols-[auto_1fr] items-baseline gap-6 py-7 transition-colors hover:bg-primary/[0.03] sm:py-8"
              >
                <span className="font-heading text-lg font-bold text-primary/70">
                  {a.number}
                </span>
                <div>
                  <h3 className="font-heading text-2xl font-black tracking-[-0.02em] text-foreground sm:text-3xl">
                    {a.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {a.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey / Timeline */}
      <section className="bg-muted/30 py-20 lg:py-28">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeInView} className="mb-14">
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              04 — The journey
            </div>
            <h2 className="mt-3 max-w-2xl font-heading text-4xl font-black leading-[1.02] tracking-[-0.025em] text-foreground sm:text-5xl">
              Milestones we&apos;ve{" "}
              <span className="italic font-semibold text-primary">
                built.
              </span>
            </h2>
          </motion.div>

          <ol className="relative grid gap-px bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
            {milestones.map((m, i) => (
              <motion.li
                key={`${m.year}-${m.title}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group bg-muted/30 p-7 transition-colors hover:bg-background sm:p-8"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-4xl font-black tracking-[-0.03em] text-primary">
                    {m.year}
                  </span>
                  <span className="h-px flex-1 bg-border transition-all group-hover:bg-primary" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-black tracking-[-0.02em] text-foreground">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {m.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 sm:py-32">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(800px 400px at 50% 100%, hsl(var(--primary) / 0.14), transparent 70%)",
          }}
        />
        <div className="container mx-auto max-w-5xl px-4 text-center sm:px-6">
          <motion.div {...fadeInView}>
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              05 — Want in?
            </div>
            <h2 className="mx-auto mt-4 max-w-3xl font-heading text-5xl font-black leading-[0.98] tracking-[-0.035em] text-foreground sm:text-6xl">
              Be part of BUP&apos;s most{" "}
              <span className="italic font-semibold text-primary">
                vibrant community.
              </span>
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 text-sm font-bold uppercase tracking-wider text-background transition-transform hover:-translate-y-0.5"
              >
                Get in touch
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/innoventure"
                className="text-sm font-bold uppercase tracking-wider text-foreground underline decoration-primary decoration-2 underline-offset-[6px] hover:decoration-4"
              >
                See Innoventure 1.0 →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
