"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${latest}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return (
    <motion.span
      ref={ref}
      onViewportEnter={() => {
        animate(count, target, { duration: 1.5, ease: "easeOut" });
      }}
      viewport={{ once: true }}
    >
      0{suffix}
    </motion.span>
  );
}

const stats = [
  { value: 950, suffix: "+", label: "Followers" },
  { value: 50, suffix: "+", label: "Events" },
  { value: 500, suffix: "+", label: "Members" },
  { value: 20, suffix: "+", label: "Partners" },
];

export function StatsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary sm:text-4xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-sm font-medium text-muted-foreground sm:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
