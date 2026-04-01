"use client";

import { motion, useInView } from "framer-motion";
import { Users, Calendar, Trophy, TrendingUp, Zap, Target } from "lucide-react";
import { useStore } from "@/lib/store";

export function StatsSection() {
  const { stats } = useStore();

  const statsData = [
    {
      value: stats.members || 100,
      label: "Total Members",
      icon: Users,
      color: "from-rose-500 to-pink-600",
      bg: "bg-rose-500/10",
      growth: "+15%",
    },
    {
      value: stats.events || 50,
      label: "Events Hosted",
      icon: Calendar,
      color: "from-blue-500 to-cyan-600",
      bg: "bg-blue-500/10",
      growth: "+25%",
    },
    {
      value: stats.partners || 20,
      label: "Partner Organizations",
      icon: Trophy,
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-500/10",
      growth: "+40%",
    },
    {
      value: stats.alumni || 500,
      label: "Alumni Network",
      icon: TrendingUp,
      color: "from-violet-500 to-purple-600",
      bg: "bg-violet-500/10",
      growth: "+60%",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background py-24 sm:py-32">
      {/* Creative background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        
        {/* Animated gradient paths */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-20 hidden lg:block"
        >
          <div className="relative size-64">
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary/10" />
            <div className="absolute inset-8 rounded-full border-2 border-dashed border-primary/10" />
            <div className="absolute inset-16 rounded-full border border-primary/10" />
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
          className="absolute bottom-20 left-20 hidden lg:block"
        >
          <div className="relative size-48">
            <div className="absolute inset-0 rounded-2xl border-4 border-dashed border-primary/10" />
            <div className="absolute inset-6 rounded-2xl border-2 border-dashed border-primary/10" />
          </div>
        </motion.div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-3 rounded-full bg-primary/10"
            animate={{
              y: [0, -30, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              scale: [1, 0.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border-2 border-primary/20 bg-white/80 px-5 py-2.5 shadow-lg backdrop-blur-sm dark:bg-gray-900/80">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-white"
            >
              <TrendingUp className="size-2.5" />
            </motion.div>
            <span className="text-sm font-semibold text-primary dark:text-primary-foreground">
              Our Impact
            </span>
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-serif">
            Making a <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Difference</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
            Numbers that reflect our commitment to excellence and innovation
          </p>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
            >
              <div className="group relative overflow-hidden rounded-[2rem] border-2 border-primary/10 bg-gradient-to-br from-white/90 to-white/70 p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-3xl hover:shadow-primary/20 dark:from-gray-900/90 dark:to-gray-900/70">
                {/* Animated gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
                />

                {/* Decorative corner */}
                <div className="absolute right-4 top-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}
                  >
                    <stat.icon className="size-6 text-white" />
                  </motion.div>
                </div>

                {/* Growth indicator */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  className="absolute left-6 top-6 rounded-full border-2 border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400"
                >
                  {stat.growth}
                </motion.div>

                <div className="relative mt-8 sm:mt-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
                    className="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl"
                  >
                    {stat.value}+
                  </motion.div>
                  
                  <div className="mt-2 flex items-center gap-2">
                    <p className="text-base font-semibold text-foreground sm:text-lg">
                      {stat.label}
                    </p>
                    <motion.div
                      whileHover={{ x: 3 }}
                      className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary"
                    >
                      <Target className="size-3.5" />
                    </motion.div>
                  </div>
                </div>

                {/* Animated line */}
                <motion.div
                  className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
                  style={{ originX: 0 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 flex justify-center sm:mt-20"
        >
          <div className="relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-3 rounded-full border-2 border-primary/20 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm dark:bg-gray-900/80"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-white"
              >
                <Zap className="size-4" />
              </motion.div>
              <span className="text-sm font-medium text-muted-foreground">
                Join our growing community
              </span>
            </motion.div>
            
            {/* Decorative circles */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-12 -top-12 size-4 rounded-full bg-primary/30"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -left-16 -bottom-8 size-6 rounded-full bg-primary/20"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
