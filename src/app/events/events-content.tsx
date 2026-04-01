"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/store";

type FilterValue = "all" | "upcoming" | "past";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
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
    return events.filter(
      (e) => e.status === "completed"
    );
  }, [events, filter]);

  // Sort: upcoming/ongoing first by date ascending, completed by date descending
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
      // upcoming before completed
      if (a.status === "completed") return 1;
      return -1;
    });
  }, [filtered]);

  return (
    <main className="flex-1">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-primary py-14 text-primary-foreground sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />
        <div className="container relative mx-auto px-4 text-center sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Our Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-3 max-w-2xl text-base text-primary-foreground/80 sm:mt-4 sm:text-lg"
          >
            Discover our upcoming activities and relive our past experiences.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs + Grid */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Tabs */}
          <div className="flex justify-center">
            <Tabs
              defaultValue="all"
              onValueChange={(val) => setFilter(val as FilterValue)}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Events Grid */}
          <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {sorted.map((event) => {
                const isUpcoming =
                  event.status === "upcoming" || event.status === "ongoing";

                return (
                  <motion.div
                    key={event.id}
                    layout
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Card className="group h-full overflow-hidden border-none bg-card shadow-sm transition-shadow hover:shadow-md">
                      {/* Category Banner */}
                      <div className="relative flex h-40 items-center justify-center bg-primary/5 sm:h-48">
                        <span className="text-3xl font-bold text-primary/15 sm:text-4xl">
                          {categoryLabels[event.category] ?? event.category}
                        </span>
                        <div className="absolute right-3 top-3">
                          <Badge
                            variant={isUpcoming ? "default" : "secondary"}
                            className={
                              isUpcoming
                                ? "bg-primary text-primary-foreground"
                                : ""
                            }
                          >
                            {event.status === "ongoing"
                              ? "Ongoing"
                              : isUpcoming
                              ? "Upcoming"
                              : "Completed"}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-5 sm:p-6">
                        <h3 className="text-base font-semibold text-foreground sm:text-lg">
                          {event.title}
                        </h3>

                        <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="size-4 shrink-0 text-primary" />
                            <span>
                              {formatDate(event.date)} &middot; {event.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="size-4 shrink-0 text-primary" />
                            <span>{event.location}</span>
                          </div>
                          {event.maxAttendees && (
                            <div className="flex items-center gap-2">
                              <Users className="size-4 shrink-0 text-primary" />
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
                          <Button
                            className="mt-4 w-full"
                            size="sm"
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
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {sorted.length === 0 && (
            <p className="mt-12 text-center text-muted-foreground">
              No events found for this filter.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
