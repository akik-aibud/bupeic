import type { Metadata } from "next";
import { Unbounded, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./innoventure.css";

const unbounded = Unbounded({
  variable: "--iv-display",
  subsets: ["latin"],
  weight: ["300", "400", "600", "800", "900"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--iv-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "600", "900"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--iv-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Innoventure 1.0 — Turn ideas into impact",
  description:
    "BUP EIC presents Innoventure 1.0: national flagship competition with dual tracks (Innovation + Venture). Register now.",
};

export default function InnoventureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${unbounded.variable} ${fraunces.variable} ${plexMono.variable} iv-root`}
    >
      {children}
    </div>
  );
}
