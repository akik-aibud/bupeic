"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
    <section id="team" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Executive Panel
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Meet the leaders driving BUP EIC forward
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {executives.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:border-border dark:bg-card"
            >
              <Avatar className="size-20 text-lg">
                <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>

              <h3 className="mt-4 text-base font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {member.position}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Meet the Team
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
