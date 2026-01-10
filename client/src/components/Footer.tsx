/*
  DESIGN: Bold Authority + Modern Sophistication
  Footer: Clean, professional with email capture
*/

import { Link } from "wouter";
import { Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/speaking", label: "Speaking" },
  { href: "/consulting", label: "Consulting" },
  { href: "/books", label: "Books" },
  { href: "/foundation", label: "Foundation" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://linkedin.com/in/dakotarea", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/dakotarea", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com/dakotarea", icon: Instagram, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
      {/* Newsletter Section */}
      <div className="border-b" style={{ borderColor: "oklch(0.25 0.02 250)" }}>
        <div className="container py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "oklch(0.97 0.01 90)" }}>
                Get Exclusive Insights
              </h3>
              <p className="font-body text-lg" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                Join thousands of leaders receiving weekly insights on AI ethics, 
                innovation, and building a meaningful legacy.
              </p>
            </div>
            <NewsletterForm 
              variant="footer" 
              title=""
              description=""
              tags={["footer", "newsletter"]}
            />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/">
              <span className="font-display text-2xl font-bold" style={{ color: "oklch(0.97 0.01 90)" }}>
                Dakota Rea
              </span>
            </Link>
            <p className="mt-4 font-body text-base max-w-md" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
              Entrepreneur, scholar, and visionary dedicated to shaping a more thoughtful 
              future through research, speaking, and the Tudor Foundation.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 transition-all duration-300 hover:scale-110"
                  style={{ 
                    backgroundColor: "oklch(0.20 0.03 250)",
                    color: "oklch(0.97 0.01 90)"
                  }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: "oklch(0.72 0.14 85)" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="font-body text-base transition-colors duration-200 hover:text-gold" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: "oklch(0.72 0.14 85)" }}>
              Get in Touch
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:contact@dakotarea.com"
                className="flex items-center gap-3 font-body text-base transition-colors duration-200 hover:text-gold"
                style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}
              >
                <Mail size={18} />
                contact@dakotarea.com
              </a>
              <p className="font-body text-base" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                London, United Kingdom
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t" style={{ borderColor: "oklch(0.25 0.02 250)" }}>
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-sm" style={{ color: "oklch(0.97 0.01 90 / 0.5)" }}>
              © {new Date().getFullYear()} Dakota Rea. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/press">
                <span className="font-body text-sm transition-colors duration-200 hover:text-gold" style={{ color: "oklch(0.97 0.01 90 / 0.5)" }}>
                  Press Kit
                </span>
              </Link>
              <span className="font-body text-sm" style={{ color: "oklch(0.97 0.01 90 / 0.5)" }}>
                Privacy Policy
              </span>
              <span className="font-body text-sm" style={{ color: "oklch(0.97 0.01 90 / 0.5)" }}>
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
