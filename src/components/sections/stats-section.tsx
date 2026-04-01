"use client";

import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

export function StatsSection() {
  const { stats } = useStore();

  const statsData = [
    { value: stats.members || 100, label: "Members" },
    { value: stats.events || 50, label: "Events Hosted" },
    { value: stats.partners || 20, label: "Partners" },
    { value: stats.alumni || 500, label: "Alumni Network" },
    ...(stats.followers > 0
      ? [{ value: stats.followers, label: "Followers" }]
      : []),
  ];

  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-y-10"
        >
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-1 basis-1/2 flex-col items-center text-center sm:basis-auto ${
                index !== statsData.length - 1
                  ? "sm:border-r sm:border-white/20"
                  : ""
              } px-6 sm:px-8`}
            >
              <div className="font-heading text-4xl font-bold text-white sm:text-5xl">
                {stat.value}+
              </div>
              <div className="mt-2 text-sm font-medium text-white/80">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
