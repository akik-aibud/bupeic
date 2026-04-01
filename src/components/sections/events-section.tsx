"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
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

  return (
    <section id="events" className="bg-muted/30 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Upcoming <span className="text-primary">Events</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:mt-4 sm:text-base">
            Stay connected with our latest events, workshops, and competitions.
          </p>
        </motion.div>

        {upcomingEvents.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {categoryLabels[event.category] ?? event.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-primary/30 text-primary"
                      >
                        {event.status === "ongoing" ? "Ongoing" : "Upcoming"}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2 text-base sm:text-lg">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="flex flex-col gap-1">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        {formatDate(event.date)} &middot; {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3.5" />
                        {event.location}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {event.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    {event.registrationLink ? (
                      <Button
                        variant="outline"
                        size="sm"
                        render={
                          <a
                            href={event.registrationLink}
                            target={event.registrationLink.startsWith("http") ? "_blank" : undefined}
                            rel={event.registrationLink.startsWith("http") ? "noopener noreferrer" : undefined}
                          />
                        }
                      >
                        Learn More
                        <ArrowRight className="ml-1 size-3.5" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        render={<Link href="/events" />}
                      >
                        Learn More
                        <ArrowRight className="ml-1 size-3.5" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center text-muted-foreground"
          >
            No upcoming events at the moment. Check back soon!
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 text-center sm:mt-12"
        >
          <Button variant="outline" render={<Link href="/events" />}>
            View All Events
            <ArrowRight className="ml-1 size-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
