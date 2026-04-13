"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowUpRight, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";

const socialIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  facebook: (props) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: (props) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.354 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
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
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const activeSocials = Object.entries(settings.social).filter(
    ([, url]) => url && url.trim() !== ""
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 lg:pb-20">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 500px at 85% 0%, hsl(var(--primary) / 0.12), transparent 60%)",
          }}
        />
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              00 — Contact
            </div>
            <h1 className="mt-4 max-w-4xl font-heading text-[clamp(2.5rem,6.5vw,5.5rem)] font-black leading-[0.95] tracking-[-0.035em] text-foreground">
              Let&apos;s make{" "}
              <span className="italic font-semibold text-primary">
                something.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Got a question, a sponsorship, or a wild idea? Drop it in the
              form below — or reach us directly. We reply fast.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-16 border-t border-border/60 pt-16 lg:grid-cols-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                01 — Send a message
              </div>
              <h2 className="mt-3 max-w-lg font-heading text-4xl font-black leading-[1.02] tracking-[-0.025em] text-foreground sm:text-5xl">
                Write us a{" "}
                <span className="italic font-semibold text-primary">line.</span>
              </h2>

              <div className="mt-10">
                {submitted ? (
                  <div className="border-y border-primary/30 bg-primary/[0.04] py-10 pl-8">
                    <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle className="size-7" />
                    </div>
                    <h3 className="mt-6 font-heading text-3xl font-black tracking-[-0.02em] text-foreground">
                      Message sent.
                    </h3>
                    <p className="mt-2 max-w-md text-base text-muted-foreground">
                      Thanks for reaching out — we&apos;ll get back to you
                      shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-sm font-bold uppercase tracking-wider text-foreground underline decoration-primary decoration-2 underline-offset-[6px]"
                    >
                      Send another →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid gap-8 sm:grid-cols-2">
                      <div className="space-y-2 border-b border-border/60 pb-2">
                        <Label
                          htmlFor="name"
                          className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground"
                        >
                          Your name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Jane Doe"
                          required
                          className="h-10 border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0"
                        />
                      </div>
                      <div className="space-y-2 border-b border-border/60 pb-2">
                        <Label
                          htmlFor="email"
                          className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                          className="h-10 border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 border-b border-border/60 pb-2">
                      <Label
                        htmlFor="subject"
                        className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground"
                      >
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        placeholder="What is this about?"
                        required
                        className="h-10 border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0"
                      />
                    </div>

                    <div className="space-y-2 border-b border-border/60 pb-2">
                      <Label
                        htmlFor="message"
                        className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground"
                      >
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us everything."
                        rows={5}
                        required
                        className="resize-none border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 text-sm font-bold uppercase tracking-wider text-background transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                    >
                      {submitting ? "Sending…" : "Send message"}
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-10 lg:col-span-5"
            >
              <div>
                <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                  02 — Find us
                </div>
                <h2 className="mt-3 font-heading text-4xl font-black leading-[1.02] tracking-[-0.025em] text-foreground sm:text-5xl">
                  On the{" "}
                  <span className="italic font-semibold text-primary">
                    ground.
                  </span>
                </h2>
              </div>

              <ul className="divide-y divide-border/60 border-y border-border/60">
                <li className="grid grid-cols-[auto_1fr] items-start gap-4 py-5">
                  <MapPin className="mt-1 size-5 text-primary" />
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      Address
                    </p>
                    <p className="mt-1 text-base leading-relaxed text-foreground">
                      {settings.address}
                    </p>
                  </div>
                </li>
                <li className="grid grid-cols-[auto_1fr] items-start gap-4 py-5">
                  <Phone className="mt-1 size-5 text-primary" />
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      Phone
                    </p>
                    <a
                      href={`tel:+88${settings.phone.replace(/[^0-9]/g, "")}`}
                      className="mt-1 block text-base text-foreground hover:text-primary"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </li>
                <li className="grid grid-cols-[auto_1fr] items-start gap-4 py-5">
                  <Mail className="mt-1 size-5 text-primary" />
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      Email
                    </p>
                    <a
                      href={`mailto:${settings.email}`}
                      className="mt-1 block text-base text-foreground hover:text-primary"
                    >
                      {settings.email}
                    </a>
                  </div>
                </li>
              </ul>

              {activeSocials.length > 0 && (
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                    Follow us
                  </p>
                  <div className="mt-4 flex flex-wrap gap-5">
                    {activeSocials.map(([platform, url]) => {
                      const Icon = socialIcons[platform];
                      if (!Icon) return null;
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-colors hover:text-primary"
                          aria-label={socialLabels[platform] ?? platform}
                        >
                          <Icon className="size-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="border border-border/60"
          >
            <iframe
              title="Bangladesh University of Professionals Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3783845280424!2d90.34988287609367!3d23.80376798672766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c12497614b2d%3A0x2793eb2d76dfd0b5!2sBangladesh%20University%20of%20Professionals%20(BUP)!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              className="h-72 grayscale sm:h-96 lg:h-[450px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
