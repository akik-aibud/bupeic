"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CreativeCardProps {
  variant?: "default" | "gradient" | "glass" | "border" | "creative";
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function CreativeCard({
  variant = "default",
  children,
  className,
  delay = 0,
}: CreativeCardProps) {
  const variants = {
    default: "bg-card border-2 border-border/30 shadow-lg",
    gradient: "bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 shadow-2xl shadow-primary/10",
    glass: "bg-white/60 dark:bg-gray-900/60 border-2 border-border/20 backdrop-blur-xl shadow-2xl",
    border: "bg-transparent border-2 border-border/40",
    creative: "bg-gradient-to-br from-card via-primary/5 to-card border-2 border-primary/20 shadow-2xl shadow-primary/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, type: "spring" }}
      whileHover={{ 
        y: -10, 
        rotateX: 2,
        transition: { type: "spring", stiffness: 300 }
      }}
      className={cn(
        "relative overflow-hidden rounded-3xl transition-all duration-300",
        variants[variant],
        className
      )}
    >
      {/* Creative corner decorations */}
      {variant === "creative" && (
        <>
          <motion.div
            className="absolute top-0 left-0 size-8 border-t-4 border-l-4 border-primary/30"
            whileHover={{ scale: 1.2 }}
          />
          <motion.div
            className="absolute top-0 right-0 size-8 border-t-4 border-r-4 border-primary/30"
            whileHover={{ scale: 1.2 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 size-8 border-b-4 border-l-4 border-primary/30"
            whileHover={{ scale: 1.2 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 size-8 border-b-4 border-r-4 border-primary/30"
            whileHover={{ scale: 1.2 }}
          />
        </>
      )}

      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
      />

      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
