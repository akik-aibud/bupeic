"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Users, Clock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { useMemo } from "react";

export function EventsSection() {
  const { events } = useStore();

  const upcomingEvents = useMemo(() => {
    return events
      .filter((e) => e.status === "upcoming" || e.status === "ongoing")
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  }, [events]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
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

  return (
    <section id="events" className="relative overflow-hidden bg-muted/30 py-16 sm:py-24">
      {/* Background patterns */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-serif">
            Upcoming <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Events</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:mt-8 sm:text-lg">
            Stay connected with our latest events, workshops, and competitions
          </p>
        </motion.div>

        {upcomingEvents.length > 0 ? (
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
                className="group"
              >
                <Card className="h-full overflow-hidden border-2 border-border/30 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-2xl">
                  {/* Header with gradient */}
                  <motion.div
                    className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/5 p-4 sm:h-40"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between">
                      <Badge
                        variant="outline"
                        className={`border backdrop-blur-sm ${
                          categoryColors[event.category] || "bg-primary/10 text-primary border-primary/20"
                        }`}
                      >
                        {categoryLabels[event.category] ?? event.category}
                      </Badge>
                      {event.status === "ongoing" && (
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-lg"
                        >
                          <Clock className="size-3" />
                          <span>Ongoing</span>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Date display */}
                    <div className="absolute bottom-4 left-4">
                      <div className="rounded-lg bg-white/90 p-2 backdrop-blur-sm shadow-md dark:bg-gray-900/90">
                        <div className="text-xs font-bold text-primary sm:text-sm">
                          {new Date(event.date).toLocaleDateString("en-US", { month: "short" }).toUpperCase()}
                        </div>
                        <div className="text-lg font-bold text-foreground sm:text-xl">
                          {new Date(event.date).getDate()}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <CardHeader className="pb-3 pt-4 sm:pt-6">
                    <CardTitle className="text-base font-bold line-clamp-2 group-hover:text-primary transition-colors sm:text-lg">
                      {event.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-2 pb-3 pt-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="size-4 text-primary" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="size-4 text-primary" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    {event.maxAttendees && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="size-4 text-primary" />
                        <span>{event.attendees}/{event.maxAttendees} attending</span>
                      </div>
                    )}
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {event.description}
                    </p>
                  </CardContent>

                  <CardFooter className="pt-2">
                    {event.registrationLink ? (
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        size="sm"
                        render={
                          <a
                            href={event.registrationLink}
                            target={event.registrationLink.startsWith("http") ? "_blank" : undefined}
                            rel={event.registrationLink.startsWith("http") ? "noopener noreferrer" : undefined}
                          />
                        }
                      >
                        {event.status === "ongoing" ? "Join Now" : "Register"}
                        <ArrowRight className="ml-1 size-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        size="sm"
                        render={<Link href="/events" />}
                      >
                        Learn More
                        <ArrowRight className="ml-1 size-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl border-2 border-dashed border-border/50 bg-card/50 py-16 text-center backdrop-blur-sm"
          >
            <Calendar className="mx-auto size-16 text-muted-foreground/50" />
            <p className="mt-4 text-lg text-muted-foreground">
              No upcoming events at the moment
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Check back soon for exciting opportunities!
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center sm:mt-16"
        >
          <Button 
            size="lg"
            className="h-14 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105"
            render={<Link href="/events" />}
          >
            View All Events
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
