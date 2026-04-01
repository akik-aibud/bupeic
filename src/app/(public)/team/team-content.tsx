"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStore } from "@/lib/store";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((part) => part.length > 0)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function SocialIconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
      aria-label={label}
    >
      {children}
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.354 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
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
    <div className="flex items-center gap-1.5">
      {social.facebook && (
        <SocialIconButton href={social.facebook} label="Facebook">
          <FacebookIcon />
        </SocialIconButton>
      )}
      {social.linkedin && (
        <SocialIconButton href={social.linkedin} label="LinkedIn">
          <LinkedInIcon />
        </SocialIconButton>
      )}
      {social.instagram && (
        <SocialIconButton href={social.instagram} label="Instagram">
          <InstagramIcon />
        </SocialIconButton>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          aria-label="Email"
        >
          <Mail className="size-3.5" />
        </a>
      )}
    </div>
  );
}

export function TeamContent() {
  const { teamMembers } = useStore();

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

  const totalActive = executives.length + committeeMembers.length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Our People
            </span>
            <div className="mt-3 flex items-center gap-4">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Our Team
              </h1>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {totalActive} Members
              </span>
            </div>
            <div className="mt-4 h-1 w-16 rounded-full bg-primary" />
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Dedicated individuals driving innovation and impact at BUP EIC
            </p>
          </motion.div>
        </div>
      </section>

      {/* Executive Panel */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Leadership
            </span>
            <h2 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Executive Panel 2025-2026
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              The leadership team guiding BUP EIC&apos;s vision and strategy
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {executives.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl border border-border bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                <div className="flex flex-col items-center text-center">
                  <Avatar className="size-24 text-xl sm:size-28">
                    <AvatarFallback className="bg-primary/10 text-xl font-bold text-primary sm:text-2xl">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Accent divider */}
                  <div className="mx-auto mt-4 h-0.5 w-8 rounded-full bg-primary/30" />

                  <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
                    {member.name}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-primary">
                    {member.position}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {member.department}
                  </p>

                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="mt-2 text-xs text-muted-foreground transition-colors hover:text-primary"
                    >
                      {member.email}
                    </a>
                  )}

                  <div className="mt-4">
                    <SocialLinks social={member.social} email={member.email} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Heads */}
      {committeeMembers.length > 0 && (
        <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Departments
              </span>
              <h2 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                Committee Heads
              </h2>
              <p className="mt-2 text-base text-muted-foreground">
                Dedicated leaders managing each department of the club
              </p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {committeeMembers.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-center gap-4 rounded-xl border border-border bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                >
                  <Avatar className="size-14 shrink-0 text-sm">
                    <AvatarFallback className="bg-primary/10 text-sm font-bold text-primary">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-base font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-primary">
                      {member.position}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {member.department}
                    </p>
                    <div className="mt-2">
                      <SocialLinks
                        social={member.social}
                        email={member.email}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
