"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Users, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((part) => part.length > 0)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface SocialLinksProps {
  social: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  email?: string;
}

function SocialLinks({ social, email }: SocialLinksProps) {
  const hasAny =
    social.facebook || social.linkedin || social.instagram || email;
  if (!hasAny) return null;

  return (
    <div className="mt-4 flex items-center justify-center gap-3">
      {social.facebook && (
        <a
          href={social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          aria-label="Facebook"
        >
          <svg className="size-4.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
      )}
      {social.linkedin && (
        <a
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          aria-label="LinkedIn"
        >
          <svg className="size-4.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      )}
      {social.instagram && (
        <a
          href={social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          aria-label="Instagram"
        >
          <svg className="size-4.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741.014 9.479.072 4.354.2 6.782 2.618 6.98 6.98.059 1.28.07 1.689.07 4.948 0 3.259-.014 3.668-.072 4.948-.2 4.354-2.618 6.78-6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </a>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          aria-label="Email"
        >
          <Mail className="size-4.5" />
        </a>
      )}
    </div>
  );
}

export function TeamContent() {
  const { teamMembers } = useStore();
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const executives = useMemo(() => {
    return teamMembers
      .filter((m) => m.category === "executive" && m.status === "active")
      .sort((a, b) => a.order - b.order);
  }, [teamMembers]);

  const committeeMembers = useMemo(() => {
    return teamMembers
      .filter((m) => m.category === "committee" && m.status === "active")
      .sort((a, b) => a.order - b.order);
  }, [teamMembers]);

  return (
    <main className="flex-1">
      {/* Premium Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-20 text-primary-foreground sm:py-28">
        {/* Animated background */}
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-80 -top-80 h-96 w-96 rounded-full bg-gradient-to-br from-white/10 to-white/5 blur-3xl"
        />

        <div className="container relative mx-auto px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm sm:text-base"
          >
            <Users className="size-4" />
            <span>Our Team</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-serif"
          >
            Meet The <span className="text-white/90">Leaders</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/90 sm:text-xl md:text-2xl"
          >
            Dedicated individuals driving innovation and impact at BUP EIC
          </motion.p>
        </div>
      </section>

      {/* Executive Panel */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Shield className="size-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Leadership</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl font-serif">
              Executive Panel
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              The leadership team guiding BUP EIC&apos;s vision and strategy
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
            {executives.map((member, i) => (
              <motion.div
                key={member.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <Card className="relative h-full overflow-hidden border-2 border-transparent bg-card shadow-xl transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:-translate-y-1">
                  {/* Hover background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br transition-colors duration-300 ${
                      hoveredMember === member.id ? "from-primary/10 to-primary/5" : "from-primary/0 to-primary/0"
                    }`}
                  />

                  <CardContent className="relative flex flex-col items-center p-8 sm:p-10">
                    {/* Avatar with animated ring */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className="relative"
                    >
                      <motion.div
                        className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/50 to-primary/20"
                        animate={{
                          scale: hoveredMember === member.id ? [1, 1.05, 1] : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <Avatar className="relative size-28 text-2xl border-4 border-white dark:border-gray-900 shadow-2xl sm:size-32">
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-2xl font-bold text-primary sm:text-3xl">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      className="mt-6 text-center"
                    >
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors sm:text-2xl">
                        {member.name}
                      </h3>
                      
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.4 }}
                      >
                        <Badge
                          variant="outline"
                          className="mt-3 border-2 bg-primary/10 text-primary border-primary/30"
                        >
                          {member.position}
                        </Badge>
                      </motion.div>

                      {member.bio && (
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base line-clamp-2">
                          {member.bio}
                        </p>
                      )}

                      <SocialLinks social={member.social} email={member.email} />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Members */}
      {committeeMembers.length > 0 && (
        <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 to-background py-16 sm:py-24">
          <div className="absolute inset-0 grid-pattern opacity-5" />
          <div className="container relative mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                <Users className="size-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Team</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl font-serif">
                Committee Heads
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
                Dedicated leaders managing each department of the club
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {committeeMembers.map((member, i) => (
                <motion.div
                  key={member.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="group"
                  onMouseEnter={() => setHoveredMember(member.id)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <Card className="relative h-full overflow-hidden border-2 border-transparent bg-card shadow-lg transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:-translate-y-1">
                    {/* Hover background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br transition-colors duration-300 ${
                        hoveredMember === member.id ? "from-primary/10 to-primary/5" : "from-primary/0 to-primary/0"
                      }`}
                    />

                    <CardContent className="relative flex flex-col items-center p-6 sm:p-8">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="relative"
                      >
                        <motion.div
                          className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/50 to-primary/20"
                          animate={{
                            scale: hoveredMember === member.id ? [1, 1.05, 1] : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        <Avatar className="relative size-24 text-xl border-4 border-white dark:border-gray-900 shadow-xl sm:size-28">
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-xl font-bold text-primary sm:text-2xl">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        className="mt-4 text-center"
                      >
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors sm:text-xl">
                          {member.name}
                        </h3>
                        
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + 0.4 }}
                        >
                          <Badge
                            variant="outline"
                            className="mt-2 border-2 bg-primary/10 text-primary border-primary/30 text-xs sm:text-sm"
                          >
                            {member.position}
                          </Badge>
                        </motion.div>

                        <p className="mt-3 text-sm font-medium text-muted-foreground sm:text-base">
                          {member.department}
                        </p>

                        {member.bio && (
                          <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                            {member.bio}
                          </p>
                        )}

                        <SocialLinks social={member.social} email={member.email} />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
