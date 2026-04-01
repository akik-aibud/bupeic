"use client";

import { motion } from "framer-motion";
import { Users, Calendar, Handshake, GraduationCap, Heart } from "lucide-react";
import { useStore } from "@/lib/store";

export function StatsSection() {
  const { stats } = useStore();

  const statsData = [
    { value: stats.members || 100, label: "Members", icon: Users },
    { value: stats.events || 50, label: "Events Hosted", icon: Calendar },
    { value: stats.partners || 20, label: "Partners", icon: Handshake },
    { value: stats.alumni || 500, label: "Alumni Network", icon: GraduationCap },
    { value: stats.followers || 0, label: "Followers", icon: Heart },
  ].filter((s) => s.value > 0);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-muted/50">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Impact
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Numbers that reflect our commitment to excellence and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="text-center"
            >
              <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="size-5 text-primary" />
              </div>
              <div className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                {stat.value}+
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
