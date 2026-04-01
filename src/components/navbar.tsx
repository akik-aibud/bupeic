"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
        scrolled 
          ? "border-primary/20 bg-background/95 backdrop-blur-md shadow-xl shadow-primary/5" 
          : "border-transparent bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className="flex items-center gap-1.5 group">
            <motion.div
              className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-lg font-bold text-white shadow-lg sm:size-12"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <Zap className="size-5 sm:size-6" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground sm:text-2xl group-hover:text-primary transition-colors">BUP</span>
              <span className="text-xs font-medium text-muted-foreground sm:text-sm">EIC</span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-x-1 -bottom-[13px] h-0.5 bg-gradient-to-r from-primary to-primary/70"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger
              render={
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden hover:bg-primary/10"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              }
            >
              <SheetContent side="right" className="w-80 border-border/50 bg-gradient-to-b from-background to-background/50 backdrop-blur-xl">
                <SheetHeader className="border-b border-border/50 pb-4">
                  <SheetTitle className="text-left">
                    <div className="flex items-center gap-2">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white">
                        <Zap className="size-5" />
                      </div>
                      <div>
                        <span className="text-primary">BUP</span>
                        <span className="text-foreground"> EIC</span>
                      </div>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <SheetClose
                      key={link.href}
                      render={
                        <Link
                          href={link.href}
                          className={`relative overflow-hidden rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${
                            isActive(link.href)
                              ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                          }`}
                        >
                          {link.label}
                          {isActive(link.href) && (
                            <motion.div
                              layoutId="mobile-indicator"
                              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"
                              initial={false}
                            />
                          )}
                        </Link>
                      }
                    >
                      {link.label}
                    </SheetClose>
                  ))}
                </nav>
                
                {/* Bottom decoration */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 backdrop-blur-sm">
                    <p className="text-xs text-muted-foreground">
                      Innovate, Collaborate, and Elevate
                    </p>
                  </div>
                </div>
              </SheetContent>
            </SheetTrigger>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
