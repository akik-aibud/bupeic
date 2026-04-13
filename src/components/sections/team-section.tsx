"use client";

import Link from "next/link";
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
      className="relative overflow-hidden bg-muted/30 py-24 lg:py-32"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              04 — The panel
            </div>
            <h2 className="mt-3 font-heading text-4xl font-black leading-[1.02] tracking-[-0.025em] text-foreground sm:text-5xl">
              Executives{" "}
              <span className="italic font-semibold text-primary">
                2025 — 2026
              </span>
            </h2>
          </div>
          <Link
            href="/team"
            className="text-sm font-bold uppercase tracking-wider text-foreground underline decoration-primary decoration-2 underline-offset-[6px] hover:decoration-4"
          >
            Full team →
          </Link>
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

      </div>
    </section>
  );
}
