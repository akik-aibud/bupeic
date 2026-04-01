"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
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

const events = [
  {
    title: "Startup Pitch Competition",
    date: "May 15, 2026",
    badge: "Competition",
    description:
      "Present your startup idea to a panel of judges and investors. Win funding and mentorship to bring your vision to life.",
  },
  {
    title: "Business Case Challenge",
    date: "June 8, 2026",
    badge: "Challenge",
    description:
      "Solve real business problems from top companies. Collaborate in teams and showcase your analytical and strategic skills.",
  },
  {
    title: "Innovation Workshop",
    date: "July 20, 2026",
    badge: "Workshop",
    description:
      "Hands-on workshop on design thinking and lean startup methodology. Learn to validate ideas and build MVPs.",
  },
];

export function EventsSection() {
  return (
    <section id="events" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Upcoming <span className="text-primary">Events</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Stay connected with our latest events, workshops, and competitions.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{event.badge}</Badge>
                  </div>
                  <CardTitle className="mt-2 text-lg">{event.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    {event.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
