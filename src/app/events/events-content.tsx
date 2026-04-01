"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";

type FilterValue = "all" | "upcoming" | "past";

const categoryLabels: Record<string, string> = {
  competition: "Competition",
  workshop: "Workshop",
  seminar: "Seminar",
  networking: "Networking",
  fest: "Fest",
};

const categoryColors: Record<string, string> = {
  competition: "bg-rose-50 text-rose-700 border-rose-200",
  workshop: "bg-blue-50 text-blue-700 border-blue-200",
  seminar: "bg-emerald-50 text-emerald-700 border-emerald-200",
  networking: "bg-violet-50 text-violet-700 border-violet-200",
  fest: "bg-amber-50 text-amber-700 border-amber-200",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

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
    { label: "All Events", value: "all" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Past Events", value: "past" },
  ];

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-muted/50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Our Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            Discover our upcoming activities and relive our past experiences
          </motion.p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Filter Buttons */}
          <div className="mb-10 flex justify-center">
            <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    filter === f.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((event, i) => {
              const isUpcoming =
                event.status === "upcoming" || event.status === "ongoing";

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex flex-col rounded-xl border border-border bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-border/50 px-5 py-4">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        categoryColors[event.category] ||
                        "bg-primary/10 text-primary border-primary/20"
                      }`}
                    >
                      {categoryLabels[event.category] ?? event.category}
                    </Badge>
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

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-2">
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
    </main>
  );
}
