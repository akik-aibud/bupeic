"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { useMemo, useState } from "react";

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
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const executives = useMemo(() => {
    return teamMembers
      .filter((m) => m.category === "executive" && m.status === "active")
      .sort((a, b) => a.order - b.order)
      .slice(0, 4);
  }, [teamMembers]);

  const positions: Record<string, string> = {
    "President": "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
    "Vice President": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    "General Secretary": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    "Treasurer": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  };

  return (
    <section id="team" className="relative overflow-hidden bg-white dark:bg-background py-16 sm:py-24">
      {/* Background patterns */}
      <div className="absolute inset-0 grid-pattern opacity-5" />
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -right-60 -bottom-60 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/10 to-primary/5 blur-3xl"
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
            Executive Panel{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">2025-2026</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:mt-8 sm:text-lg">
            Meet the exceptional leaders driving BUP EIC's vision forward
          </p>
        </motion.div>

        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
          {executives.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
              className="group"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <Card className="relative h-full overflow-hidden border-2 border-transparent transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-2xl">
                {/* Background gradient that appears on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 transition-colors duration-300"
                  animate={{
                    fromPrimary: hoveredMember === member.id ? "opacity-20" : "opacity-0",
                  }}
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--primary) / ${hoveredMember === member.id ? 0.1 : 0}), transparent)`,
                  }}
                />

                <CardContent className="relative flex flex-col items-center pt-8 pb-6">
                  {/* Avatar with animated ring */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="relative"
                  >
                    <motion.div
                      className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-primary/50"
                      animate={{
                        scale: hoveredMember === member.id ? [1, 1.05, 1] : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <Avatar className="relative size-24 text-lg border-4 border-white dark:border-gray-900 shadow-lg sm:size-28">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-xl font-bold text-primary sm:text-2xl">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    className="mt-6 text-center"
                  >
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors sm:text-xl">
                      {member.name}
                    </h3>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.4 }}
                    >
                      <Badge
                        variant="outline"
                        className={`mt-2 border-2 backdrop-blur-sm ${
                          positions[member.position] || "bg-primary/10 text-primary border-primary/20"
                        }`}
                      >
                        {member.position}
                      </Badge>
                    </motion.div>

                    {member.bio && (
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {member.bio}
                      </p>
                    )}

                    {/* Social links that appear on hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: hoveredMember === member.id ? 1 : 0,
                        y: hoveredMember === member.id ? 0 : 10,
                      }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 flex justify-center gap-2"
                    >
                      {member.social?.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="size-4" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                          aria-label="Email"
                        >
                          <Mail className="size-4" />
                        </a>
                      )}
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center sm:mt-20"
        >
          <Button 
            size="lg"
            className="h-14 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105"
            render={<Link href="/team" />}
          >
            View Full Team
            <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
