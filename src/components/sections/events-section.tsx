"use client";

import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { useMemo } from "react";
import { motion } from "framer-motion";

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

  return (
    <section id="events" className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Upcoming Events
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Stay connected with our latest events, workshops, and competitions
          </p>
        </motion.div>

        {upcomingEvents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:border-border dark:bg-card">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-primary/20 bg-primary/5 text-primary"
                    >
                      {categoryLabels[event.category] ?? event.category}
                    </Badge>
                    {event.status === "ongoing" && (
                      <span className="flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                        <span className="size-1.5 rounded-full bg-primary-foreground animate-pulse" />
                        Ongoing
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-foreground line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-primary/70" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-primary/70" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border">
                    {event.registrationLink ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        render={
                          <a
                            href={event.registrationLink}
                            target={event.registrationLink.startsWith("http") ? "_blank" : undefined}
                            rel={event.registrationLink.startsWith("http") ? "noopener noreferrer" : undefined}
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
                </div>
              </motion.div>
            ))}
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

        <div className="mt-10 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View All Events
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
