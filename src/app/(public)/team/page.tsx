import type { Metadata } from "next";
import { TeamContent } from "./team-content";

export const metadata: Metadata = {
  title: "Team - BUP Entrepreneurship & Innovation Club",
  description:
    "Meet the executive panel and committee heads driving BUP EIC's mission to foster entrepreneurship and innovation at Bangladesh University of Professionals.",
  keywords: [
    "BUP EIC Team",
    "Executive Panel",
    "Committee Heads",
    "Student Leadership",
    "BUP Club Members",
  ],
  openGraph: {
    title: "Our Team - BUP Entrepreneurship & Innovation Club",
    description:
      "Meet the dedicated leaders and committee heads behind BUP EIC's entrepreneurship initiatives.",
  },
};

export default function TeamPage() {
  return <TeamContent />;
}
