"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Innovate?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/90">
            Join BUP EIC and be part of a community that turns bold ideas into
            real-world impact. Whether you are a budding entrepreneur or a
            creative thinker, there is a place for you here.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="h-12 bg-white px-6 text-primary font-semibold shadow-md hover:bg-white/90"
              render={<Link href="/contact" />}
            >
              Get Involved
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
