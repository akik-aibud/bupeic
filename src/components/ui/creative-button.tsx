"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CreativeButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "creative";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function CreativeButton({
  variant = "primary",
  size = "md",
  children,
  className,
  delay = 0,
  ...props
}: CreativeButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary/90 text-white shadow-2xl shadow-primary/30 hover:shadow-3xl hover:shadow-primary/40",
    secondary: "bg-gradient-to-r from-secondary to-secondary/90 text-white shadow-2xl shadow-secondary/30 hover:shadow-3xl hover:shadow-secondary/40",
    outline: "border-2 border-primary/30 bg-white/80 hover:border-primary hover:bg-white shadow-lg backdrop-blur-sm dark:bg-gray-900/80",
    ghost: "bg-transparent hover:bg-primary/10 text-primary",
    creative: "bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-white border-2 border-white/20 shadow-3xl shadow-primary/30 hover:shadow-4xl hover:shadow-primary/40 hover:border-white/40",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
    xl: "h-16 px-10 text-xl",
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, type: "spring" }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 2,
        transition: { type: "spring", stiffness: 400 }
      }}
      whileTap={{ 
        scale: 0.95, 
        rotate: -2,
        transition: { type: "spring", stiffness: 600 }
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl font-semibold transition-all duration-300",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {/* Animated shine effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 3,
        }}
      />

      {/* Decorative corner */}
      {variant === "creative" && (
        <div className="absolute right-0 top-0 size-3 border-t-2 border-r-2 border-white/50" />
      )}

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
