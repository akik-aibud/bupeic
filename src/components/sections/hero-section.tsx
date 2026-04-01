"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Lightbulb, Users, Target, Rocket } from "lucide-react";
import { useStore } from "@/lib/store";

export function HeroSection() {
  const { settings } = useStore();
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  const stats = [
    { label: "Members", value: "100+", icon: Users },
    { label: "Events", value: "50+", icon: Target },
    { label: "Years Active", value: "5", icon: Rocket },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-background to-background dark:from-background dark:via-background dark:to-background">
      {/* Premium multi-layer background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/50 to-primary/5" />
          <div className="absolute inset-0 bg-gradient-to-tl from-secondary/5 via-background/80 to-background" />
        </div>
        
        {/* Animated gradient orbs with unique movements */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
            scale: [1, 0.9, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/5 blur-3xl"
        />
        
        {/* Premium geometric patterns */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 right-1/4 hidden lg:block"
        >
          <div className="relative size-64">
            <div className="absolute inset-0 border border-primary/10 rounded-full" />
            <div className="absolute inset-4 border border-primary/10 rounded-full" />
            <div className="absolute inset-8 border border-primary/10 rounded-full" />
          </div>
        </motion.div>

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 left-1/4 hidden lg:block"
        >
          <div className="relative size-48">
            <div className="absolute inset-0 border border-primary/10 rounded-2xl" />
            <div className="absolute inset-4 border border-primary/10 rounded-2xl" />
          </div>
        </motion.div>

        {/* Creative floating elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            className="absolute size-3 rounded-full bg-primary/20 blur-sm"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}

        {/* Modern grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:min-h-[90vh] sm:px-6 md:min-h-[95vh] md:py-32"
      >
        {/* Premium badge with animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="mb-8"
        >
          <div className="group relative inline-flex items-center gap-2 rounded-full border-2 border-primary/30 bg-white/80 px-5 py-2.5 shadow-lg backdrop-blur-md transition-all hover:border-primary/50 hover:shadow-xl dark:bg-gray-900/80">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-white"
            >
              <Sparkles className="size-2.5" />
            </motion.div>
            <span className="text-sm font-semibold text-primary dark:text-primary-foreground">
              BUP Entrepreneurship & Innovation Club
            </span>
          </div>
        </motion.div>

        {/* Main headline with premium typography */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          className="relative"
        >
          <div className="absolute -left-16 -top-8 hidden lg:block opacity-10">
            <Target className="size-24 text-primary" />
          </div>
          <div className="absolute -right-16 bottom-0 hidden lg:block opacity-10">
            <Rocket className="size-24 text-primary" />
          </div>
          
          <span className="relative z-10 bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-5xl font-bold tracking-tight dark:from-white dark:via-white/90 dark:to-white/70 sm:text-6xl md:text-7xl lg:text-8xl font-sans">
            {settings.heroTitle}
          </span>
        </motion.h1>

        {/* Enhanced description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-10 mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl"
        >
          {settings.heroDescription}
        </motion.p>

        {/* Premium CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative z-10 mt-10 flex flex-col items-center gap-4 sm:mt-12 sm:flex-row sm:gap-6"
        >
          <Button
            size="lg"
            className="h-14 px-8 bg-gradient-to-r from-primary to-primary/90 text-base font-semibold shadow-2xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-3xl hover:shadow-primary/40 sm:h-16 sm:px-10 sm:text-lg"
            render={<Link href="/contact" />}
          >
            Join Our Community
            <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 border-2 bg-white/80 text-base font-semibold shadow-xl backdrop-blur-md transition-all hover:border-primary hover:bg-white hover:scale-105 dark:bg-gray-900/80 sm:h-16 sm:px-10 sm:text-lg"
            render={<Link href="/events" />}
          >
            View Upcoming Events
            <Zap className="ml-2 size-5" />
          </Button>
        </motion.div>

        {/* Animated stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative z-10 mt-16 grid grid-cols-3 gap-6 sm:mt-20 sm:gap-10"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl border-2 border-primary/10 bg-gradient-to-br from-white/90 to-white/70 p-6 backdrop-blur-sm transition-all group-hover:border-primary/30 group-hover:shadow-2xl dark:from-gray-900/90 dark:to-gray-900/70 sm:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 transition-colors group-hover:from-primary/5 group-hover:to-primary/0" />
                
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring" }}
                  className="relative mb-3 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg sm:mb-4 sm:size-14"
                >
                  <stat.icon className="size-6 text-primary sm:size-7" />
                </motion.div>
                
                <div className="relative">
                  <div className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground sm:text-base">
                    {stat.label}
                  </div>
                </div>

                <motion.div
                  className="absolute -right-2 -bottom-2 size-8 rounded-full bg-gradient-to-br from-primary to-primary/70 text-white shadow-lg sm:size-10"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring" }}
                >
                  <stat.icon className="size-4 sm:size-5" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="relative z-10 mt-20 sm:mt-24"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex size-10 items-center justify-center rounded-full border-2 border-primary/30 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-gray-900/80"
          >
            <ArrowRight className="size-5 rotate-90 text-primary" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
