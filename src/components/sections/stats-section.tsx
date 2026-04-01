"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import { Users, CalendarDays, Heart, Handshake, TrendingUp } from "lucide-react";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${latest.toLocaleString()}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return (
    <motion.span
      ref={ref}
      onViewportEnter={() => {
        animate(count, target, { duration: 2, ease: "easeOut" });
      }}
      viewport={{ once: true }}
    >
      0{suffix}
    </motion.span>
  );
}

const statIcons = [
  { key: "followers" as const, icon: Heart, label: "Followers", gradient: "from-rose-500 to-pink-600" },
  { key: "events" as const, icon: CalendarDays, label: "Events", gradient: "from-blue-500 to-cyan-600" },
  { key: "members" as const, icon: Users, label: "Members", gradient: "from-emerald-500 to-teal-600" },
  { key: "partners" as const, icon: Handshake, label: "Partners", gradient: "from-violet-500 to-purple-600" },
];

export function StatsSection() {
  const { stats } = useStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-primary/5 dark:from-background dark:to-primary/5 py-16 sm:py-24">
      {/* Background decorations */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -right-20 -top-20 size-96 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 blur-3xl"
      />
      
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-serif">
            Our Impact
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Numbers that reflect our growth and the value we bring to the community
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 sm:gap-12 md:grid-cols-4">
          {statIcons.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
              className="group relative"
            >
              {/* Background glow effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-10"
                style={{
                  background: `linear-gradient(135deg, hsl(var(--primary)), transparent)`,
                }}
              />
              
              <div className="relative flex flex-col items-center rounded-3xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 sm:p-8">
                {/* Icon with gradient background */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", duration: 0.3 }}
                  className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))`,
                  }}
                >
                  <item.icon className="size-8 text-primary-foreground" />
                </motion.div>

                {/* Counter */}
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent sm:text-5xl md:text-6xl">
                  <AnimatedCounter target={stats[item.key]} suffix="+" />
                </div>

                {/* Label */}
                <p className="mt-2 text-sm font-medium text-muted-foreground sm:text-base md:text-lg">
                  {item.label}
                </p>

                {/* Trend indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                  className="mt-3 flex items-center gap-1 text-xs text-primary sm:text-sm"
                >
                  <TrendingUp className="size-3" />
                  <span>Growing</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
