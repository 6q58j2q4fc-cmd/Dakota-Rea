/*
  DESIGN: Timeless Editorial Luxury
  Navigation: Minimal, elegant top nav with understated hover effects
  Typography: Montserrat for nav labels (modern sans-serif accent)
*/

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/speaking", label: "Speaking" },
  { href: "/consulting", label: "Consulting" },
  { href: "/books", label: "Books" },
  { href: "/foundation", label: "Tudor Foundation" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
      style={{ backgroundColor: scrolled ? "oklch(0.97 0.01 90 / 0.95)" : "transparent" }}
    >
      <nav className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-charcoal hover:text-terracotta transition-colors duration-300" style={{ color: "oklch(0.25 0.01 50)" }}>
            Dakota Rea
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`font-sans text-sm font-medium tracking-wide uppercase link-underline transition-colors duration-300 ${
                  location === link.href
                    ? "text-terracotta"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
                style={{
                  color: location === link.href ? "oklch(0.62 0.12 45)" : undefined,
                }}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-charcoal hover:text-terracotta transition-colors"
          aria-label="Toggle menu"
          style={{ color: "oklch(0.25 0.01 50)" }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
            style={{ backgroundColor: "oklch(0.97 0.01 90)" }}
          >
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={link.href}>
                    <span
                      className={`block font-sans text-lg font-medium tracking-wide py-2 transition-colors ${
                        location === link.href
                          ? "text-terracotta"
                          : "text-charcoal/70"
                      }`}
                      style={{
                        color: location === link.href ? "oklch(0.62 0.12 45)" : "oklch(0.25 0.01 50 / 0.7)",
                      }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
