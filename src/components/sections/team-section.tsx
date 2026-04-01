"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStore } from "@/lib/store";
import { useMemo } from "react";
import { motion } from "framer-motion";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((part) => part.length > 0)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function TeamSection() {
  const { teamMembers } = useStore();

  const executives = useMemo(() => {
    return teamMembers
      .filter((m) => m.category === "executive" && m.status === "active")
      .sort((a, b) => a.order - b.order)
      .slice(0, 4);
  }, [teamMembers]);

  return (
    <section
      id="team"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        backgroundImage:
          "radial-gradient(circle, hsl(var(--muted-foreground) / 0.06) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
            Our Team
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Meet the Executive Panel
          </h2>
          <p className="mt-2 text-base text-muted-foreground">2025-2026</p>
        </motion.div>

        {/* Team grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {executives.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex flex-col items-center rounded-2xl border border-border bg-white p-6 text-center"
            >
              <Avatar className="size-20 text-lg">
                {member.avatar ? (
                  <AvatarImage src={member.avatar} alt={member.name} />
                ) : null}
                <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>

              {/* Accent line */}
              <div className="mx-auto mt-4 h-0.5 w-8 rounded-full bg-primary" />

              <h3 className="mt-3 font-heading text-base font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-primary">
                {member.position}
              </p>
              {member.department && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {member.department}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Link */}
        <div className="mt-10 text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Meet Full Team
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
