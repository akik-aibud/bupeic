"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Trophy,
  GraduationCap,
  Target,
  Eye,
  Handshake,
  Sparkles,
  Rocket,
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
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Trophy,
    title: "Competitions",
    description:
      "Startup pitch contests, case competitions, and hackathons that challenge you to think big.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Handshake,
    title: "Networking Events",
    description:
      "Connect with entrepreneurs, industry leaders, and alumni who can guide your journey.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: GraduationCap,
    title: "Mentorship Programs",
    description:
      "One-on-one mentoring with experienced founders and professionals to refine your ideas.",
    color: "from-emerald-500 to-teal-600",
  },
];

const milestones = [
  {
    year: "2021",
    title: "Club Founded",
    description:
      "BUP EIC was officially established by a group of passionate students at Bangladesh University of Professionals.",
    icon: "🚀",
  },
  {
    year: "2022",
    title: "First Startup Pitch",
    description:
      "Organized the inaugural Startup Pitch Competition with 50+ participating teams from across BUP.",
    icon: "🎯",
  },
  {
    year: "2022",
    title: "Innovation Summit 1.0",
    description:
      "Hosted the first Innovation Summit featuring guest speakers from leading startups in Bangladesh.",
    icon: "💡",
  },
  {
    year: "2023",
    title: "National Recognition",
    description:
      "BUP EIC was recognized as one of the most active entrepreneurship clubs at the national university level.",
    icon: "🏆",
  },
  {
    year: "2024",
    title: "100+ Members Milestone",
    description:
      "Crossed 100 active members and expanded to 6 dedicated committees for specialized operations.",
    icon: "📈",
  },
  {
    year: "2025",
    title: "Business Fest 2025",
    description:
      "Launched the flagship BUP Business Fest with inter-university participation and corporate sponsors.",
    icon: "🎉",
  },
];

export function AboutContent() {
  const { settings } = useStore();

  return (
    <main className="flex-1">
      {/* Premium Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-20 text-primary-foreground sm:py-28">
        {/* Animated background elements */}
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-white/5 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -left-40 -bottom-40 h-80 w-80 rounded-full bg-white/5 blur-3xl"
        />

        <div className="container relative mx-auto px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm sm:text-base"
          >
            <Sparkles className="size-4" />
            <span>Our Story</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-serif"
          >
            About <span className="text-white/90">BUP EIC</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/90 sm:mt-8 sm:text-xl md:text-2xl"
          >
            Innovate, Collaborate, and Elevate
          </motion.p>
        </div>
      </section>

      {/* Mission & History */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl font-serif"
            >
              Who We Are
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-8 text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            >
              {settings.description} Founded at Bangladesh University of Professionals, we are a community of dreamers, doers, and innovators committed to building the next generation of entrepreneurs.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            >
              We believe that entrepreneurship is not just about starting businesses — it's about solving problems, creating value, and making a positive difference in the world. Through events, workshops, and mentorship, we equip our members with the skills and mindset to thrive.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="relative overflow-hidden bg-muted/30 py-16 sm:py-24">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="container relative mx-auto px-4 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full border-2 border-primary/10 bg-card/80 shadow-xl backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-2xl">
                <CardContent className="p-8 sm:p-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg"
                  >
                    <Eye className="size-8 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                    Our Vision
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    To be the leading platform for student entrepreneurship in Bangladesh, inspiring a culture of innovation and self-reliance among university students nationwide.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full border-2 border-primary/10 bg-card/80 shadow-xl backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-2xl">
                <CardContent className="p-8 sm:p-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg"
                  >
                    <Target className="size-8 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                    Our Mission
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    To foster entrepreneurial thinking, provide practical learning opportunities, and build a supportive community where students can develop, test, and launch their ideas with confidence.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl font-serif">
              What We Do
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
              We run a variety of programs designed to nurture entrepreneurial talent and build real-world skills
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card className="group h-full border-2 border-transparent bg-card shadow-lg transition-all hover:border-primary/30 hover:shadow-2xl">
                  <CardContent className="p-6 sm:p-8">
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={{ type: "spring", duration: 0.3 }}
                      className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg sm:size-16"
                      style={{
                        background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))`,
                      }}
                    >
                      <activity.icon className="size-7 text-primary-foreground sm:size-8" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors sm:text-2xl">
                      {activity.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {activity.description}
                    </p>
                    
                    {/* Decorative line */}
                    <motion.div
                      className="mt-6 h-1 w-12 rounded-full bg-primary/30 group-hover:w-full group-hover:bg-primary"
                      transition={{ duration: 0.3 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 to-primary/5 py-16 sm:py-24">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl font-serif">
              Our Journey
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
              Key milestones in BUP EIC&apos;s growth and achievements
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <div className="relative border-l-4 border-primary/20 pl-8 sm:pl-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={`${milestone.year}-${milestone.title}`}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative mb-12 last:mb-0"
                >
                  {/* Dot */}
                  <motion.div
                    className="absolute -left-[calc(2rem+8px)] top-2 flex size-10 items-center justify-center rounded-full border-4 border-primary bg-background shadow-lg sm:-left-[calc(3rem+8px)]"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring" }}
                  >
                    <span className="text-lg">{milestone.icon}</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="rounded-3xl border-2 border-primary/10 bg-card/80 p-6 backdrop-blur-sm shadow-xl hover:border-primary/30 transition-all sm:p-8"
                  >
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
                      {milestone.year}
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-foreground sm:text-2xl">
                      {milestone.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {milestone.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
