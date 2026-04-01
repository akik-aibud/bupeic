"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Users, Clock, Sparkles } from "lucide-react";
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

const categoryColors: Record<string, string> = {
  competition: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
  workshop: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  seminar: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  networking: "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20",
  fest: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
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
            <Sparkles className="size-4" />
            <span>Our Events</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-serif"
          >
            Discover Our
            <span className="text-white/90"> Events</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/90 sm:text-xl md:text-2xl"
          >
            Discover our upcoming activities and relive our past experiences
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs + Grid */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4 sm:px-6">
          {/* Tabs */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Tabs
                defaultValue="all"
                onValueChange={(val) => setFilter(val as FilterValue)}
              >
                <TabsList className="bg-muted/50 border-2 border-border/20">
                  <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All Events</TabsTrigger>
                  <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Upcoming</TabsTrigger>
                  <TabsTrigger value="past" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Past Events</TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>
          </div>

          {/* Events Grid */}
          <div className="mx-auto mt-12 grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {sorted.map((event, index) => {
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
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="group h-full overflow-hidden border-2 border-transparent bg-card shadow-lg transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:-translate-y-1">
                      {/* Category Banner */}
                      <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 sm:h-52">
                        <motion.span
                          className="text-5xl font-bold text-primary/15 sm:text-6xl"
                          whileHover={{ scale: 1.1 }}
                        >
                          {categoryLabels[event.category] ?? event.category}
                        </motion.span>
                        <div className="absolute right-4 top-4">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring" }}
                          >
                            {event.status === "ongoing" && (
                              <motion.div
                                animate={{ opacity: [1, 0.6, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-lg"
                              >
                                <Clock className="size-3" />
                                <span>Ongoing</span>
                              </motion.div>
                            )}
                            {event.status !== "ongoing" && (
                              <Badge
                                variant={isUpcoming ? "default" : "secondary"}
                                className={`border-2 backdrop-blur-sm ${
                                  isUpcoming
                                    ? "bg-primary/90 text-primary-foreground border-primary/30"
                                    : "bg-background text-muted-foreground border-border/30"
                                }`}
                              >
                                {isUpcoming ? "Upcoming" : "Completed"}
                              </Badge>
                            )}
                          </motion.div>
                        </div>
                      </div>

                      <CardContent className="p-6 sm:p-8">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors sm:text-xl line-clamp-2">
                            {event.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className={`border backdrop-blur-sm ${
                              categoryColors[event.category] || "bg-primary/10 text-primary border-primary/20"
                            }`}
                          >
                            {categoryLabels[event.category] ?? event.category}
                          </Badge>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="size-4 shrink-0 text-primary" />
                            <span>
                              {formatDate(event.date)} &middot; {event.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="size-4 shrink-0 text-primary" />
                            <span className="line-clamp-1">{event.location}</span>
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

                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {event.description}
                        </p>

                        {isUpcoming && event.registrationLink && (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring" }}
                            className="mt-6"
                          >
                            <Button
                              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
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
                              <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {sorted.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-20 rounded-3xl border-2 border-dashed border-border/50 bg-muted/30 py-16 text-center backdrop-blur-sm"
            >
              <Calendar className="mx-auto size-16 text-muted-foreground/50" />
              <p className="mt-4 text-lg text-muted-foreground">
                No events found for this filter
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Check back later for exciting opportunities!
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
