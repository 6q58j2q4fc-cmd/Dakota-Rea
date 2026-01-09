/*
  DESIGN: Timeless Editorial Luxury
  Footer: Elegant, minimal footer with editorial typography
*/

import { Link } from "wouter";
import { Mail, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  explore: [
    { href: "/about", label: "About" },
    { href: "/speaking", label: "Speaking" },
    { href: "/consulting", label: "Consulting" },
    { href: "/books", label: "Books" },
  ],
  connect: [
    { href: "/foundation", label: "Tudor Foundation" },
    { href: "/contact", label: "Contact" },
    { href: "/press", label: "Press Kit" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "oklch(0.88 0.01 90)", backgroundColor: "oklch(0.99 0.005 90)" }}>
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/">
              <span className="font-display text-2xl font-bold tracking-tight" style={{ color: "oklch(0.25 0.01 50)" }}>
                Dakota Rea
              </span>
            </Link>
            <p className="mt-4 font-body text-base leading-relaxed max-w-md" style={{ color: "oklch(0.45 0.01 50)" }}>
              Entrepreneur, inventor, and philanthropist dedicated to advancing AI ethics 
              and creating positive global impact through the Tudor Foundation.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: "oklch(0.94 0.01 90)", color: "oklch(0.25 0.01 50)" }}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: "oklch(0.94 0.01 90)", color: "oklch(0.25 0.01 50)" }}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:contact@dakotarea.com"
                className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: "oklch(0.94 0.01 90)", color: "oklch(0.25 0.01 50)" }}
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-sans text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: "oklch(0.45 0.01 50)" }}>
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="font-body text-base transition-colors duration-300 hover:text-terracotta" style={{ color: "oklch(0.35 0.01 50)" }}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="font-sans text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: "oklch(0.45 0.01 50)" }}>
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="font-body text-base transition-colors duration-300 hover:text-terracotta" style={{ color: "oklch(0.35 0.01 50)" }}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "oklch(0.88 0.01 90)" }}>
          <p className="font-sans text-sm" style={{ color: "oklch(0.55 0.01 50)" }}>
            © {new Date().getFullYear()} Dakota Rea. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy">
              <span className="font-sans text-sm transition-colors hover:text-terracotta" style={{ color: "oklch(0.55 0.01 50)" }}>
                Privacy Policy
              </span>
            </Link>
            <Link href="/terms">
              <span className="font-sans text-sm transition-colors hover:text-terracotta" style={{ color: "oklch(0.55 0.01 50)" }}>
                Terms of Service
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
