"use client";

import { motion } from "framer-motion";
import { Lightbulb, Users, TrendingUp, Target, Rocket, Sparkles } from "lucide-react";

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

const highlights = [
  { icon: Target, title: "Goal Oriented", description: "Clear vision and structured approach" },
  { icon: Rocket, title: "Action Driven", description: "Transform ideas into reality" },
  { icon: Sparkles, title: "Quality Focused", description: "Excellence in every initiative" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-muted/30 py-16 sm:py-24">
      {/* Background patterns */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-serif">
            About <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">BUP EIC</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg md:text-xl">
            BUP Entrepreneurship & Innovation Club is a student-led organization at Bangladesh University of 
            Professionals dedicated to nurturing the next generation of entrepreneurial leaders. Through events, 
            workshops, and mentorship, we transform ideas into actionable ventures.
          </p>
        </motion.div>

        {/* Main features */}
        <div className="mb-16 grid gap-8 sm:mb-20 sm:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40, rotateY: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
              className="group relative"
            >
              {/* Glowing background */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-20"
                style={{
                  background: `linear-gradient(135deg, hsl(var(--primary)), transparent)`,
                }}
              />

              <div className="relative h-full rounded-3xl border border-border/50 bg-card/80 p-8 backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                {/* Animated icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))`,
                  }}
                >
                  <feature.icon className="size-8 text-primary-foreground" />
                </motion.div>

                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors sm:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {feature.description}
                </p>

                {/* Decorative line */}
                <motion.div
                  className="mt-6 h-1 w-12 rounded-full bg-primary/30 group-hover:w-full group-hover:bg-primary"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional highlights */}
        <div className="grid gap-6 sm:grid-cols-3">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex items-center gap-4 rounded-2xl border border-border/30 bg-gradient-to-r from-card/50 to-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10"
              >
                <item.icon className="size-6 text-primary" />
              </motion.div>
              <div>
                <h4 className="text-base font-semibold text-foreground sm:text-lg">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
