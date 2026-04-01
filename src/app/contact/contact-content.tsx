"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle, MessageSquare, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: (props) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: (props) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741.014 9.479.072 4.354.2 6.782 2.618 6.98 6.98.059 1.28.07 1.689.07 4.948 0 3.259-.014 3.668-.072 4.948-.2 4.354-2.618 6.78-6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  linkedin: (props) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  youtube: (props) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  twitter: (props) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

const socialLabels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  twitter: "Twitter",
};

export function ContactContent() {
  const { settings } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const resetForm = () => {
    setSubmitted(false);
  };

  const activeSocials = Object.entries(settings.social).filter(
    ([, url]) => url && url.trim() !== ""
  );

  return (
    <main className="flex-1">
      {/* Premium Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-20 text-primary-foreground sm:py-28">
        {/* Animated background */}
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-80 -top-80 h-96 w-96 rounded-full bg-gradient-to-br from-white/10 to-white/5 blur-3xl"
        />

        <div className="container relative mx-auto px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm sm:text-base"
          >
            <MessageSquare className="size-4" />
            <span>Get in Touch</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-serif"
          >
            Contact <span className="text-white/90">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/90 sm:text-xl md:text-2xl"
          >
            Have questions or want to collaborate? We'd love to hear from you
          </motion.p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl font-serif">
                  Contact Information
                </h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                  Reach out through any of the following channels
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring" }}
                  className="flex gap-4"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-lg">
                    <MapPin className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground sm:text-base">
                      Address
                    </p>
                    <p className="text-sm text-muted-foreground sm:text-base">
                      {settings.address}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring" }}
                  className="flex gap-4"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-lg">
                    <Phone className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground sm:text-base">
                      Phone
                    </p>
                    <a
                      href={`tel:+88${settings.phone.replace(/[^0-9]/g, "")}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary sm:text-base"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring" }}
                  className="flex gap-4"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-lg">
                    <Mail className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground sm:text-base">
                      Email
                    </p>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary sm:text-base"
                    >
                      {settings.email}
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              {activeSocials.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm font-medium text-foreground sm:text-base">
                    Follow Us
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {activeSocials.map(([platform, url]) => {
                      const Icon = socialIcons[platform];
                      if (!Icon) return null;
                      return (
                        <motion.a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -5, scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex size-12 items-center justify-center rounded-2xl border-2 border-primary/20 bg-primary/10 text-primary transition-colors hover:border-primary/50 hover:bg-primary hover:text-primary-foreground shadow-lg"
                          aria-label={socialLabels[platform] ?? platform}
                        >
                          <Icon className="size-5.5" />
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="border-2 border-border/30 bg-card/80 shadow-2xl backdrop-blur-sm">
                <CardContent className="p-6 sm:p-8">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mb-4 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-2xl"
                      >
                        <CheckCircle className="size-10" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                        Message Sent!
                      </h3>
                      <p className="mt-2 text-base text-muted-foreground sm:text-lg">
                        Thank you for reaching out. We'll get back to you soon.
                      </p>
                      <Button
                        onClick={resetForm}
                        className="mt-6"
                        size="lg"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      onSubmit={handleSubmit}
                      className="space-y-5 sm:space-y-6"
                    >
                      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            placeholder="Your full name"
                            required
                            className="h-12 border-2 focus:border-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            className="h-12 border-2 focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="What is this about?"
                          required
                          className="h-12 border-2 focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Write your message here..."
                          rows={5}
                          required
                          className="border-2 focus:border-primary resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="h-14 w-full bg-gradient-to-r from-primary to-primary/90 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="mr-2 size-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 size-5" />
                          </>
                        )}
                      </Button>
                    </motion.form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Embed */}
      <section className="relative overflow-hidden bg-muted/30 py-16 sm:py-24">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <MapPin className="size-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Location</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl font-serif">
              Find Us Here
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:mt-6 sm:text-lg">
              {settings.address}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-5xl overflow-hidden rounded-3xl border-2 border-border/30 shadow-2xl"
          >
            <iframe
              title="Bangladesh University of Professionals Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3783845280424!2d90.34988287609367!3d23.80376798672766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c12497614b2d%3A0x2793eb2d76dfd0b5!2sBangladesh%20University%20of%20Professionals%20(BUP)!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              height="350"
              className="sm:h-[450px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
