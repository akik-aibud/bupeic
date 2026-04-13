"use client";

import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { useMemo } from "react";
import { motion } from "framer-motion";

const categoryColors: Record<string, string> = {
  competition: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  workshop: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  seminar: "bg-purple-500/10 text-purple-700 border-purple-500/20",
  networking: "bg-primary/10 text-primary border-primary/20",
  fest: "bg-rose-500/10 text-rose-700 border-rose-500/20",
};

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
      .slice(0, 3);
  }, [events]);

  const featured = upcomingEvents[0];
  const rest = upcomingEvents.slice(1);

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
          <div className="space-y-6">
            {/* Featured event — full width, horizontal layout */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden rounded-2xl border border-border border-t-4 border-t-primary bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Date block */}
                  <div className="flex shrink-0 flex-col items-center justify-center bg-primary/5 px-8 py-6 sm:px-10 sm:py-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">
                      {formatDate(featured.date).month}
                    </div>
                    <div className="font-heading text-4xl font-bold text-foreground">
                      {formatDate(featured.date).day}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          categoryColors[featured.category] ??
                          "border-primary/20 bg-primary/5 text-primary"
                        }
                      >
                        {categoryLabels[featured.category] ?? featured.category}
                      </Badge>
                      {featured.status === "ongoing" && (
                        <span className="flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                          <span className="size-1.5 animate-pulse rounded-full bg-primary-foreground" />
                          Ongoing
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-xl font-bold text-foreground">
                      {featured.title}
                    </h3>

                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {featured.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-primary/70" />
                        {formatDate(featured.date).full}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-primary/70" />
                        {featured.location}
                      </span>
                    </div>

                    <div className="mt-4">
                      {featured.registrationLink ? (
                        <Button
                          variant="outline"
                          className="rounded-full px-6"
                          render={
                            <a
                              href={featured.registrationLink}
                              target={
                                featured.registrationLink.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                featured.registrationLink.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                            />
                          }
                        >
                          {featured.status === "ongoing"
                            ? "Join Now"
                            : "Register"}
                          <ArrowRight className="ml-1.5 size-3.5" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="rounded-full px-6"
                          render={<Link href="/events" />}
                        >
                          Learn More
                          <ArrowRight className="ml-1.5 size-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Smaller event cards — 2-col grid */}
            {rest.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {rest.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex h-full flex-col rounded-2xl border border-border border-t-4 border-t-primary bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={
                          categoryColors[event.category] ??
                          "border-primary/20 bg-primary/5 text-primary"
                        }
                      >
                        {categoryLabels[event.category] ?? event.category}
                      </Badge>
                      {event.status === "ongoing" && (
                        <span className="flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                          <span className="size-1.5 animate-pulse rounded-full bg-primary-foreground" />
                          Ongoing
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-base font-semibold text-foreground line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-3.5 text-primary/70" />
                        <span>{formatDate(event.date).full}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-3.5 text-primary/70" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>

                    <div className="mt-4 border-t border-border pt-3">
                      {event.registrationLink ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          render={
                            <a
                              href={event.registrationLink}
                              target={
                                event.registrationLink.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                event.registrationLink.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                            />
                          }
                        >
                          {event.status === "ongoing" ? "Join Now" : "Register"}
                          <ArrowRight className="ml-1.5 size-3.5" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          render={<Link href="/events" />}
                        >
                          Learn More
                          <ArrowRight className="ml-1.5 size-3.5" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 py-16 text-center">
            <Calendar className="mx-auto size-12 text-muted-foreground/40" />
            <p className="mt-4 text-base text-muted-foreground">
              No upcoming events at the moment
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Check back soon for exciting opportunities!
            </p>
          </div>
        )}

        {/* View all link — right aligned */}
        <div className="mt-10 text-right">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            View All Events
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
