"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TeamMember {
  name: string;
  position: string;
  initials: string;
  socials: {
    facebook?: string;
    linkedin?: string;
    email?: string;
  };
}

const executives: TeamMember[] = [
  {
    name: "Arif Rahman",
    position: "President",
    initials: "AR",
    socials: {
      facebook: "#",
      linkedin: "#",
      email: "president@bupeic.org",
    },
  },
  {
    name: "Nusrat Jahan",
    position: "Vice President",
    initials: "NJ",
    socials: {
      facebook: "#",
      linkedin: "#",
      email: "vp@bupeic.org",
    },
  },
  {
    name: "Tanvir Ahmed",
    position: "General Secretary",
    initials: "TA",
    socials: {
      facebook: "#",
      linkedin: "#",
      email: "secretary@bupeic.org",
    },
  },
  {
    name: "Fariha Tasnim",
    position: "Treasurer",
    initials: "FT",
    socials: {
      facebook: "#",
      linkedin: "#",
      email: "treasurer@bupeic.org",
    },
  },
];

const committeeHeads: TeamMember[] = [
  {
    name: "Rahat Hossain",
    position: "Head of Marketing",
    initials: "RH",
    socials: { facebook: "#", linkedin: "#" },
  },
  {
    name: "Sadia Islam",
    position: "Head of Events",
    initials: "SI",
    socials: { facebook: "#", linkedin: "#" },
  },
  {
    name: "Mahir Khan",
    position: "Head of Finance",
    initials: "MK",
    socials: { facebook: "#", linkedin: "#" },
  },
  {
    name: "Anika Roy",
    position: "Head of HR",
    initials: "ARo",
    socials: { facebook: "#", linkedin: "#" },
  },
  {
    name: "Fahim Shahriar",
    position: "Head of Tech",
    initials: "FS",
    socials: { facebook: "#", linkedin: "#" },
  },
  {
    name: "Lamia Akter",
    position: "Head of Creative",
    initials: "LA",
    socials: { facebook: "#", linkedin: "#" },
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SocialLinks({ socials }: { socials: TeamMember["socials"] }) {
  return (
    <div className="mt-4 flex items-center justify-center gap-3">
      {socials.facebook && (
        <a
          href={socials.facebook}
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="Facebook"
        >
          <FacebookIcon className="size-4" />
        </a>
      )}
      {socials.linkedin && (
        <a
          href={socials.linkedin}
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="LinkedIn"
        >
          <LinkedInIcon className="size-4" />
        </a>
      )}
      {socials.email && (
        <a
          href={`mailto:${socials.email}`}
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="Email"
        >
          <Mail className="size-4" />
        </a>
      )}
    </div>
  );
}

function MemberCard({
  member,
  index,
  large = false,
}: {
  member: TeamMember;
  index: number;
  large?: boolean;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <Card className="h-full border-none bg-card shadow-sm transition-shadow hover:shadow-md">
        <CardContent className={`flex flex-col items-center ${large ? "p-8" : "p-6"}`}>
          <Avatar className={large ? "size-24" : "size-16"}>
            <AvatarFallback
              className={`bg-primary/10 font-semibold text-primary ${large ? "text-xl" : "text-sm"}`}
            >
              {member.initials}
            </AvatarFallback>
          </Avatar>
          <h3
            className={`mt-4 font-semibold text-foreground ${large ? "text-lg" : "text-base"}`}
          >
            {member.name}
          </h3>
          <p className="mt-1 text-sm text-primary">{member.position}</p>
          <SocialLinks socials={member.socials} />
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function TeamContent() {
  return (
    <main className="flex-1">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80"
          >
            Meet the people driving innovation and impact at BUP EIC.
          </motion.p>
        </div>
      </section>

      {/* Executive Panel */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-3xl font-bold text-foreground"
          >
            Executive Panel
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            The leadership team guiding BUP EIC&apos;s vision and strategy.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {executives.map((member, i) => (
              <MemberCard
                key={member.name}
                member={member}
                index={i}
                large
              />
            ))}
          </div>
        </div>
      </section>

      {/* Committee Heads */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-3xl font-bold text-foreground"
          >
            Committee Heads
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Dedicated leaders managing each department of the club.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {committeeHeads.map((member, i) => (
              <MemberCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
