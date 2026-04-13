"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";

type FilterValue = "all" | "upcoming" | "past";

const categoryLabels: Record<string, string> = {
  competition: "Competition",
  workshop: "Workshop",
  seminar: "Seminar",
  networking: "Networking",
  fest: "Fest",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.getDate().toString(),
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    year: d.getFullYear().toString(),
    full: d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };
}

const fadeInView = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.5 },
};

export function EventsContent() {
  const { events } = useStore();
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return events;
    if (filter === "upcoming") {
      return events.filter(
        (e) => e.status === "upcoming" || e.status === "ongoing"
      );
    }
    return events.filter((e) => e.status === "completed");
  }, [events, filter]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      if (
        (a.status === "upcoming" || a.status === "ongoing") &&
        (b.status === "upcoming" || b.status === "ongoing")
      ) {
        return aDate - bDate;
      }
      if (a.status === "completed" && b.status === "completed") {
        return bDate - aDate;
      }
      if (a.status === "completed") return 1;
      return -1;
    });
  }, [filtered]);

  const filters: { label: string; value: FilterValue }[] = [
    { label: "All", value: "all" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Past", value: "past" },
  ];

  const upcomingCount = events.filter(
    (e) => e.status === "upcoming" || e.status === "ongoing"
  ).length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 lg:pb-20">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 500px at 85% 0%, hsl(var(--primary) / 0.12), transparent 60%)",
          }}
        />
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeInView}>
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              00 — Events
            </div>
            <h1 className="mt-4 max-w-4xl font-heading text-[clamp(2.5rem,6.5vw,5.5rem)] font-black leading-[0.95] tracking-[-0.035em] text-foreground">
              Every event, every{" "}
              <span className="italic font-semibold text-primary">
                cohort.
              </span>
            </h1>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-y border-border/60 py-4 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span>
                Total <strong className="ml-1 text-foreground">{events.length}</strong>
              </span>
              <span>
                Upcoming{" "}
                <strong className="ml-1 text-foreground">{upcomingCount}</strong>
              </span>
              <span>
                Categories <strong className="ml-1 text-foreground">5</strong>
              </span>
              <span>
                Registration{" "}
                <strong className="ml-1 text-primary">Open</strong>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="container mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-6 text-sm font-bold uppercase tracking-wider">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`transition-colors ${
                filter === f.value
                  ? "text-foreground underline decoration-primary decoration-2 underline-offset-[6px]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured: Innoventure */}
      {(filter === "all" || filter === "upcoming") && (
        <section className="pb-10 pt-4">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
            >
              <Link
                href="/innoventure"
                className="group relative block overflow-hidden border border-primary/25 bg-[#05110d] p-8 text-white shadow-[0_40px_80px_-30px_rgba(16,185,129,0.55)] transition-transform hover:-translate-y-1 sm:p-12"
                style={{
                  backgroundImage:
                    "radial-gradient(900px 500px at 85% 0%, rgba(16,185,129,0.4), transparent 60%), radial-gradient(600px 400px at 10% 100%, rgba(4,120,87,0.5), transparent 70%)",
                }}
              >
                <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.22em] text-white/60">
                  <span className="flex items-center gap-2">
                    <Sparkles className="size-3.5 text-primary" />
                    Featured · Flagship Competition
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                    Registration open
                  </span>
                </div>

                <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
                  <div className="font-heading text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.85] tracking-[-0.04em]">
                    INNO
                    <span className="block italic font-semibold text-primary">
                      venture
                    </span>
                    <span className="mt-2 block text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.6)]">
                      01.0
                    </span>
                  </div>
                  <div className="space-y-4 text-sm text-white/80">
                    <p className="max-w-md leading-relaxed">
                      BUP EIC&apos;s flagship national competition — two
                      tracks, real sponsor challenges, and a runway from idea
                      to final showcase.
                    </p>
                    <ul className="space-y-1.5 border-t border-white/10 pt-4 text-xs">
                      <li>
                        <strong className="text-white">Innovation Track</strong>
                        {" "}· Case challenge → SBU Launch
                      </li>
                      <li>
                        <strong className="text-white">Venture Track</strong>
                        {" "}· Pitch deck → Final Showcase
                      </li>
                    </ul>
                    <div className="flex items-center gap-2 pt-2 text-sm font-bold uppercase tracking-wider text-primary">
                      Enter the arena
                      <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Event list */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          {sorted.length === 0 ? (
            <div className="border border-dashed border-border py-20 text-center">
              <Calendar className="mx-auto size-10 text-muted-foreground/40" />
              <p className="mt-4 text-base text-muted-foreground">
                No events in this category yet
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border/60 border-y border-border/60">
              {sorted.map((event, i) => {
                const d = formatDate(event.date);
                const href = event.registrationLink || "#";
                const external = !!event.registrationLink?.startsWith("http");
                const isPast = event.status === "completed";
                return (
                  <motion.li
                    key={event.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.3) }}
                  >
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className={`group grid grid-cols-[80px_1fr_auto] items-center gap-6 py-8 transition-colors sm:grid-cols-[110px_1fr_auto] sm:py-10 ${
                        isPast
                          ? "opacity-60 hover:opacity-80"
                          : "hover:bg-primary/[0.03]"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                          {d.month}
                        </span>
                        <span className="font-heading text-5xl font-black leading-none tracking-[-0.03em] text-foreground sm:text-6xl">
                          {d.day}
                        </span>
                        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                          {d.year}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                          <span>
                            {categoryLabels[event.category] ?? event.category}
                          </span>
                          {event.status === "ongoing" && (
                            <>
                              <span>·</span>
                              <span className="flex items-center gap-1.5 text-primary">
                                <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                                Live now
                              </span>
                            </>
                          )}
                          {event.status === "completed" && (
                            <>
                              <span>·</span>
                              <span>Past</span>
                            </>
                          )}
                        </div>
                        <h3 className="mt-2 font-heading text-2xl font-black tracking-[-0.02em] text-foreground sm:text-3xl">
                          {event.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground line-clamp-2">
                          {event.description}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="size-3.5 text-primary" />
                            {d.full}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-primary" />
                            {event.location}
                          </span>
                        </div>
                      </div>

                      <ArrowUpRight className="size-6 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary sm:size-9" />
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
