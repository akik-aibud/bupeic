"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Users } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-16 sm:py-24">
      {/* Animated background patterns */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      {/* Floating elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-20 top-10 hidden size-24 rounded-full bg-white/5 blur-xl sm:block"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-20 bottom-10 hidden size-32 rounded-full bg-white/5 blur-xl sm:block"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm sm:text-base"
        >
          <Sparkles className="size-4" />
          <span>Shape the Future with Us</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl font-serif"
        >
          Ready to Innovate?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/90 sm:mt-8 sm:text-lg md:text-xl"
        >
          Join BUP EIC and be part of a community that turns bold ideas into
          real-world impact. Whether you're a budding entrepreneur or a
          creative thinker, there's a place for you here.
        </motion.p>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-6 sm:mt-12"
        >
          <div className="flex items-center gap-2 text-white/90">
            <div className="flex size-8 items-center justify-center rounded-full bg-white/20">
              <Zap className="size-4" />
            </div>
            <span className="text-sm font-medium sm:text-base">Innovation</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <div className="flex size-8 items-center justify-center rounded-full bg-white/20">
              <Users className="size-4" />
            </div>
            <span className="text-sm font-medium sm:text-base">Community</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <div className="flex size-8 items-center justify-center rounded-full bg-white/20">
              <Sparkles className="size-4" />
            </div>
            <span className="text-sm font-medium sm:text-base">Growth</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-14"
        >
          <Button
            size="lg"
            className="h-14 bg-white px-8 text-base font-semibold text-primary shadow-2xl transition-all hover:scale-105 hover:bg-white/90 hover:shadow-3xl sm:h-16 sm:px-10 sm:text-lg"
            render={<Link href="/contact" />}
          >
            Get Involved
            <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
