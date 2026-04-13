"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  const items: { href: string; label: string; icon: React.ReactNode }[] = [];
  if (social.facebook)
    items.push({ href: social.facebook, label: "Facebook", icon: <FacebookIcon /> });
  if (social.linkedin)
    items.push({ href: social.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> });
  if (social.instagram)
    items.push({ href: social.instagram, label: "Instagram", icon: <InstagramIcon /> });
  if (email)
    items.push({
      href: `mailto:${email}`,
      label: "Email",
      icon: <Mail className="size-3.5" />,
    });
  if (items.length === 0) return null;
  return (
    <div className="flex items-center gap-3">
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          target={it.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={it.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          aria-label={it.label}
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          {it.icon}
        </a>
      ))}
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
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 lg:pb-24">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 500px at 85% 0%, hsl(var(--primary) / 0.12), transparent 60%)",
          }}
        />
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              00 — The people
            </div>
            <h1 className="mt-4 max-w-4xl font-heading text-[clamp(2.5rem,6.5vw,5.5rem)] font-black leading-[0.95] tracking-[-0.035em] text-foreground">
              The humans behind{" "}
              <span className="italic font-semibold text-primary">BUP EIC.</span>
            </h1>
            <div className="mt-8 grid grid-cols-3 gap-6 border-y border-border/60 py-4 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span>
                Panel <strong className="ml-1 text-foreground">2025 — 2026</strong>
              </span>
              <span>
                Active <strong className="ml-1 text-foreground">{totalActive}</strong>
              </span>
              <span>
                Committees <strong className="ml-1 text-foreground">6</strong>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Executive Panel */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              01 — Leadership
            </div>
            <h2 className="mt-3 max-w-2xl font-heading text-4xl font-black leading-[1.02] tracking-[-0.025em] text-foreground sm:text-5xl">
              Executive{" "}
              <span className="italic font-semibold text-primary">panel.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-px bg-border/60 lg:grid-cols-4">
            {executives.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group relative flex flex-col items-start bg-background p-6 transition-colors hover:bg-muted/40 sm:p-8"
              >
                <span className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-primary/70">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <Avatar className="mt-4 size-28 rounded-none">
                  {member.avatar ? (
                    <AvatarImage
                      src={member.avatar}
                      alt={member.name}
                      className="rounded-none object-cover grayscale transition-all group-hover:grayscale-0"
                    />
                  ) : null}
                  <AvatarFallback className="rounded-none bg-foreground text-2xl font-black text-background">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="mt-6 h-px w-10 bg-primary transition-all group-hover:w-20" />

                <h3 className="mt-4 font-heading text-xl font-black leading-tight tracking-[-0.02em] text-foreground">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {member.position}
                </p>
                {member.department && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {member.department}
                  </p>
                )}
                <div className="mt-4">
                  <SocialLinks social={member.social} email={member.email} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Heads */}
      {committeeMembers.length > 0 && (
        <section className="border-t border-border/60 bg-muted/30 py-20 lg:py-28">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                02 — Committees
              </div>
              <h2 className="mt-3 max-w-2xl font-heading text-4xl font-black leading-[1.02] tracking-[-0.025em] text-foreground sm:text-5xl">
                Committee{" "}
                <span className="italic font-semibold text-primary">heads.</span>
              </h2>
            </motion.div>

            <ul className="divide-y divide-border/60 border-y border-border/60">
              {committeeMembers.map((member, i) => (
                <motion.li
                  key={member.id}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.25) }}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-5 transition-colors hover:bg-background sm:py-6"
                >
                  <Avatar className="size-14 rounded-none">
                    <AvatarFallback className="rounded-none bg-foreground text-sm font-black text-background">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg font-black tracking-[-0.01em] text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {member.position}
                    </p>
                    {member.department && (
                      <p className="text-xs text-muted-foreground">
                        {member.department}
                      </p>
                    )}
                  </div>
                  <SocialLinks social={member.social} email={member.email} />
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
