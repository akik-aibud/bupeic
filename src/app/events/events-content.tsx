"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Presentation,
  BrainCircuit,
  Rocket,
  Wrench,
  Code,
  Store,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type EventStatus = "upcoming" | "past";

interface ClubEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  status: EventStatus;
  icon: React.ComponentType<{ className?: string }>;
}

const events: ClubEvent[] = [
  {
    id: 1,
    title: "Startup Pitch 3.0",
    date: "May 15, 2026",
    location: "BUP Auditorium",
    description:
      "Present your startup idea to a panel of investors and industry experts. Top 3 teams win seed funding and mentorship opportunities.",
    status: "upcoming",
    icon: Presentation,
  },
  {
    id: 2,
    title: "Case Competition",
    date: "June 8, 2026",
    location: "BUP Seminar Hall",
    description:
      "Solve real-world business challenges presented by leading companies. Test your analytical and strategic thinking skills.",
    status: "upcoming",
    icon: BrainCircuit,
  },
  {
    id: 3,
    title: "Innovation Summit 3.0",
    date: "July 20, 2026",
    location: "BUP Convention Center",
    description:
      "A full-day summit with keynote speakers, panel discussions, and networking sessions featuring top entrepreneurs from Bangladesh.",
    status: "upcoming",
    icon: Rocket,
  },
  {
    id: 4,
    title: "Workshop Series: Business Model Canvas",
    date: "January 25, 2026",
    location: "BUP Room 302",
    description:
      "A hands-on workshop series teaching you how to structure your business idea using the Business Model Canvas framework.",
    status: "past",
    icon: Wrench,
  },
  {
    id: 5,
    title: "Hackathon: Code for Impact",
    date: "November 12, 2025",
    location: "BUP CS Lab",
    description:
      "A 24-hour hackathon where teams build technology solutions for social impact. Open to all BUP students.",
    status: "past",
    icon: Code,
  },
  {
    id: 6,
    title: "Business Fest 2025",
    date: "September 5, 2025",
    location: "BUP Campus Ground",
    description:
      "BUP EIC's flagship event featuring stalls, competitions, guest talks, and product showcases from student entrepreneurs.",
    status: "past",
    icon: Store,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export function EventsContent() {
  const [filter, setFilter] = useState<"all" | EventStatus>("all");

  const filtered =
    filter === "all" ? events : events.filter((e) => e.status === filter);

  return (
    <main className="flex-1">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Our Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80"
          >
            Discover our upcoming activities and relive our past experiences.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs + Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex justify-center">
            <Tabs
              defaultValue="all"
              onValueChange={(val) =>
                setFilter(val as "all" | EventStatus)
              }
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Events Grid */}
          <div className="mx-auto mt-12 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Card className="group h-full overflow-hidden border-none bg-card shadow-sm transition-shadow hover:shadow-md">
                    {/* Image Placeholder */}
                    <div className="relative flex h-48 items-center justify-center bg-primary/5">
                      <event.icon className="size-16 text-primary/30" />
                      <div className="absolute right-3 top-3">
                        <Badge
                          variant={
                            event.status === "upcoming"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            event.status === "upcoming"
                              ? "bg-primary text-primary-foreground"
                              : ""
                          }
                        >
                          {event.status === "upcoming" ? "Upcoming" : "Past"}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground">
                        {event.title}
                      </h3>

                      <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-4 shrink-0 text-primary" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 shrink-0 text-primary" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {event.description}
                      </p>

                      {event.status === "upcoming" && (
                        <Button className="mt-4 w-full" size="sm">
                          Register Now
                          <ArrowRight className="ml-2 size-4" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
