"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import { Users, CalendarDays, Heart, Handshake } from "lucide-react";

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
  { key: "followers" as const, icon: Heart, label: "Followers" },
  { key: "events" as const, icon: CalendarDays, label: "Events" },
  { key: "members" as const, icon: Users, label: "Members" },
  { key: "partners" as const, icon: Handshake, label: "Partners" },
];

export function StatsSection() {
  const { stats } = useStore();

  return (
    <section className="bg-white py-14 dark:bg-background sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {statIcons.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="size-5 text-primary sm:size-6" />
              </div>
              <div className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                <AnimatedCounter target={stats[item.key]} suffix="+" />
              </div>
              <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm md:text-base">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
