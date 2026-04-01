"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20">
      {/* Gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl"
        >
          Ready to Innovate?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg"
        >
          Join BUP EIC and be part of a community that turns bold ideas into
          real-world impact. Whether you are a budding entrepreneur or a
          creative thinker, there is a place for you here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Button
            size="lg"
            className="h-11 bg-white px-6 text-base font-semibold text-primary hover:bg-white/90"
          >
            Get Involved
            <ArrowRight className="ml-1 size-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
