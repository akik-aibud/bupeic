"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section
      className="relative bg-primary py-20 sm:py-24"
      style={{
        clipPath: "polygon(0 8%, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      {/* Dot pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container relative mx-auto max-w-4xl px-4 pt-8 text-center sm:px-6">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready to Make an Impact?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85">
          Join BUP EIC and be part of a community that turns bold ideas into
          real-world impact. Whether you are a budding entrepreneur or a creative
          thinker, there is a place for you here.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            className="h-11 rounded-full bg-white px-8 font-semibold text-primary shadow-md hover:bg-white/90"
            render={<Link href="/contact" />}
          >
            Join the Club
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-full border-white/40 px-8 text-white hover:bg-white/10 hover:text-white"
            render={<Link href="/contact" />}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
