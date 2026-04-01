import type { Metadata } from "next";
import { EventsContent } from "./events-content";

export const metadata: Metadata = {
  title: "Events - BUP Entrepreneurship & Innovation Club",
  description:
    "Explore upcoming and past events by BUP EIC including startup pitches, case competitions, hackathons, innovation summits, and workshops.",
  keywords: [
    "BUP EIC Events",
    "Startup Pitch",
    "Hackathon",
    "Innovation Summit",
    "Business Competition",
    "BUP",
  ],
};

export default function EventsPage() {
  return <EventsContent />;
}
