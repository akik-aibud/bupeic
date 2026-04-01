import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Branding */}
          <div className="space-y-3">
            <div>
              <span className="text-xl font-bold text-primary">BUP</span>{" "}
              <span className="text-xl font-bold text-foreground">EIC</span>
            </div>
            <p className="text-sm font-medium text-primary">
              Innovate, Collaborate, and Elevate
            </p>
            <p className="text-sm text-muted-foreground">
              BUP Entrepreneurship &amp; Innovation Club — fostering
              entrepreneurial spirit and innovative thinking among students of
              Bangladesh University of Professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  Bangladesh University of Professionals, Mirpur Cantonment,
                  Dhaka 1216
                </span>
              </li>
              <li>
                <a
                  href="tel:+8801875814089"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="size-4 shrink-0 text-primary" />
                  01875-814089
                </a>
              </li>
              <li>
                <a
                  href="mailto:bupeic.official@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="size-4 shrink-0 text-primary" />
                  bupeic.official@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Facebook"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; 2025&ndash;2026 BUP Entrepreneurship &amp; Innovation Club. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
