import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact - BUP Entrepreneurship & Innovation Club",
  description:
    "Get in touch with BUP EIC. Send us a message, find our location at Bangladesh University of Professionals, or reach out via phone and email.",
  keywords: [
    "Contact BUP EIC",
    "Bangladesh University of Professionals",
    "BUP Club Contact",
    "Dhaka 1216",
  ],
};

export default function ContactPage() {
  return <ContactContent />;
}
