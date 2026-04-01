"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

type FilterValue = "all" | "upcoming" | "past";

const categoryLabels: Record<string, string> = {
  competition: "Competition",
  workshop: "Workshop",
  seminar: "Seminar",
  networking: "Networking",
  fest: "Fest",
};

const categoryBadgeColors: Record<string, string> = {
  competition: "bg-primary/10 text-primary",
  workshop: "bg-blue-50 text-blue-700",
  seminar: "bg-amber-50 text-amber-700",
  networking: "bg-purple-50 text-purple-700",
  fest: "bg-rose-50 text-rose-700",
};

const categoryBorderColors: Record<string, string> = {
  competition: "border-t-primary",
  workshop: "border-t-blue-500",
  seminar: "border-t-amber-500",
  networking: "border-t-purple-500",
  fest: "border-t-rose-500",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateShort(dateStr: string) {
  const date = new Date(dateStr);
  return {
    day: date.toLocaleDateString("en-US", { day: "numeric" }),
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    year: date.toLocaleDateString("en-US", { year: "numeric" }),
  };
}

const fadeInView = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true } as const,
  transition: { duration: 0.4 },
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

  // Find the featured upcoming event (first upcoming/ongoing)
  const featuredEvent = useMemo(() => {
    return sorted.find(
      (e) => e.status === "upcoming" || e.status === "ongoing"
    );
  }, [sorted]);

  const restEvents = useMemo(() => {
    if (!featuredEvent) return sorted;
    return sorted.filter((e) => e.id !== featuredEvent.id);
  }, [sorted, featuredEvent]);

  const filters: { label: string; value: FilterValue }[] = [
    { label: "All", value: "all" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Past", value: "past" },
  ];

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
              Events
            </span>
            <div className="mt-3 flex items-center gap-4">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Our Events
              </h1>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {events.length} Events
              </span>
            </div>
            <div className="mt-4 h-1 w-16 rounded-full bg-primary" />
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Discover our upcoming activities and relive past experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Filter Buttons — simple button group */}
          <div className="mb-10 flex gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  filter === f.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-white text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Featured upcoming event */}
          {featuredEvent && filter !== "past" && (
            <motion.div {...fadeInView} className="mb-10">
              <div
                className={`overflow-hidden rounded-xl border border-border border-t-4 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
                  categoryBorderColors[featuredEvent.category] ||
                  "border-t-primary"
                }`}
              >
                <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
                  {/* Date block */}
                  <div className="flex size-24 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 sm:size-28">
                    <span className="text-xs font-semibold uppercase text-primary">
                      {formatDateShort(featuredEvent.date).month}
                    </span>
                    <span className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                      {formatDateShort(featuredEvent.date).day}
                    </span>
                    <span className="text-xs text-primary/70">
                      {formatDateShort(featuredEvent.date).year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          categoryBadgeColors[featuredEvent.category] ||
                          "bg-primary/10 text-primary"
                        }`}
                      >
                        {categoryLabels[featuredEvent.category] ??
                          featuredEvent.category}
                      </span>
                      {featuredEvent.status === "ongoing" ? (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
                          <Clock className="size-3" />
                          Ongoing
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-primary">
                          Upcoming
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2 font-heading text-xl font-bold text-foreground sm:text-2xl">
                      {featuredEvent.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-4 text-primary/70" />
                        {formatDate(featuredEvent.date)} &middot;{" "}
                        {featuredEvent.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-4 text-primary/70" />
                        {featuredEvent.location}
                      </span>
                      {featuredEvent.maxAttendees && (
                        <span className="flex items-center gap-1.5">
                          <Users className="size-4 text-primary/70" />
                          {featuredEvent.attendees}/{featuredEvent.maxAttendees}{" "}
                          attendees
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {featuredEvent.description}
                    </p>

                    {featuredEvent.registrationLink && (
                      <div className="mt-4">
                        <Button
                          size="lg"
                          className="h-11"
                          render={
                            <a
                              href={featuredEvent.registrationLink}
                              target={
                                featuredEvent.registrationLink.startsWith(
                                  "http"
                                )
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                featuredEvent.registrationLink.startsWith(
                                  "http"
                                )
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                            />
                          }
                        >
                          Register Now
                          <ArrowRight className="ml-2 size-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Events Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restEvents.map((event, i) => {
              const isUpcoming =
                event.status === "upcoming" || event.status === "ongoing";

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`flex flex-col overflow-hidden rounded-xl border border-border border-t-4 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
                    categoryBorderColors[event.category] || "border-t-primary"
                  }`}
                >
                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          categoryBadgeColors[event.category] ||
                          "bg-primary/10 text-primary"
                        }`}
                      >
                        {categoryLabels[event.category] ?? event.category}
                      </span>
                      {event.status === "ongoing" ? (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
                          <Clock className="size-3" />
                          Ongoing
                        </span>
                      ) : (
                        <span
                          className={`text-xs font-medium ${
                            isUpcoming
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {isUpcoming ? "Upcoming" : "Completed"}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 font-heading text-lg font-semibold text-foreground line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4 shrink-0 text-primary/70" />
                        <span>
                          {formatDate(event.date)} &middot; {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 shrink-0 text-primary/70" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      {event.maxAttendees && (
                        <div className="flex items-center gap-2">
                          <Users className="size-4 shrink-0 text-primary/70" />
                          <span>
                            {event.attendees}/{event.maxAttendees} attendees
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {event.description}
                    </p>

                    {isUpcoming && event.registrationLink && (
                      <div className="mt-auto pt-5">
                        <Button
                          className="w-full"
                          size="lg"
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
                          Register Now
                          <ArrowRight className="ml-2 size-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Empty state */}
          {sorted.length === 0 && (
            <div className="mt-16 rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
              <Calendar className="mx-auto size-12 text-muted-foreground/40" />
              <p className="mt-4 text-base text-muted-foreground">
                No events found for this filter.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Check back later for exciting opportunities!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
