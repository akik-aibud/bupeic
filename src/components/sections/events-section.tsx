"use client";

import Link from "next/link";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { useMemo } from "react";
import { motion } from "framer-motion";

const categoryLabels: Record<string, string> = {
  competition: "Competition",
  workshop: "Workshop",
  seminar: "Seminar",
  networking: "Networking",
  fest: "Fest",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: date.getDate().toString(),
    full: date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };
}

export function EventsSection() {
  const { events } = useStore();

  const upcomingEvents = useMemo(() => {
    return events
      .filter((e) => e.status === "upcoming" || e.status === "ongoing")
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 4);
  }, [events]);

  return (
    <section id="events" className="py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              03 — What&apos;s next
            </div>
            <h2 className="mt-3 max-w-xl font-heading text-4xl font-black leading-[1.02] tracking-[-0.025em] text-foreground sm:text-5xl">
              Upcoming on the{" "}
              <span className="italic font-semibold text-primary">calendar.</span>
            </h2>
          </div>
          <Link
            href="/events"
            className="hidden text-sm font-bold uppercase tracking-wider text-foreground underline decoration-primary decoration-2 underline-offset-[6px] hover:decoration-4 sm:inline-flex"
          >
            View all →
          </Link>
        </motion.div>

        {upcomingEvents.length > 0 ? (
          <ul className="divide-y divide-border/60 border-y border-border/60">
            {upcomingEvents.map((event, i) => {
              const d = formatDate(event.date);
              const href = event.registrationLink || "/events";
              const external = !!event.registrationLink?.startsWith("http");
              return (
                <motion.li
                  key={event.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group grid grid-cols-[72px_1fr_auto] items-center gap-6 py-7 transition-colors hover:bg-primary/[0.03] sm:grid-cols-[96px_1fr_auto] sm:py-9"
                  >
                    {/* Date block */}
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                        {d.month}
                      </span>
                      <span className="font-heading text-4xl font-black leading-none tracking-[-0.03em] text-foreground sm:text-5xl">
                        {d.day}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
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

                    {/* Arrow */}
                    <ArrowUpRight className="size-6 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary sm:size-8" />
                  </a>
                </motion.li>
              );
            })}
          </ul>
        ) : (
          <div className="border border-dashed border-border py-20 text-center">
            <Calendar className="mx-auto size-10 text-muted-foreground/40" />
            <p className="mt-4 text-base text-muted-foreground">
              No upcoming events at the moment
            </p>
          </div>
        )}

        <div className="mt-10 sm:hidden">
          <Link
            href="/events"
            className="text-sm font-bold uppercase tracking-wider text-foreground underline decoration-primary decoration-2 underline-offset-[6px]"
          >
            View all events →
          </Link>
        </div>
      </div>
    </section>
  );
}
