import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About - BUP Entrepreneurship & Innovation Club",
  description:
    "Learn about BUP EIC's mission, vision, history, and the activities that empower students to innovate, collaborate, and elevate at Bangladesh University of Professionals.",
  keywords: [
    "BUP EIC",
    "About",
    "Entrepreneurship Club",
    "Bangladesh University of Professionals",
    "Innovation",
    "Student Club",
  ],
};

export default function AboutPage() {
  return <AboutContent />;
}
