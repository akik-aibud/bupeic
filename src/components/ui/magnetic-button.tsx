"use client";

import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({ children, className, strength = 20, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const moveX = (e.clientX - centerX) / strength;
    const moveY = (e.clientY - centerY) / strength;
    
    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 px-8 py-4 font-semibold text-primary shadow-2xl shadow-primary/20 transition-all hover:border-primary/40 hover:shadow-3xl hover:shadow-primary/30 dark:bg-gray-900/80",
        className
      )}
      {...props}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 transition-colors duration-300 group-hover:from-primary/10 group-hover:to-primary/5" />
      
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-primary/30 opacity-0 transition-opacity duration-300"
        whileHover={{ opacity: 1 }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
