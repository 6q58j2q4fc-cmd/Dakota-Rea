/*
  DESIGN: Bold Authority + Modern Sophistication
  Navigation: Sticky header with clear CTAs
  High-converting with prominent booking button and cart
*/

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/speaking", label: "Speaking" },
  { href: "/consulting", label: "Consulting" },
  { href: "/books", label: "Books" },
  { href: "/ai-news", label: "AI News" },
  { href: "/blog", label: "Blog" },
  { href: "/foundation", label: "Foundation" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const { data: cart } = trpc.cart.get.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <span className="font-display text-2xl font-bold tracking-tight" style={{ color: "oklch(0.15 0.03 250)" }}>
                Dakota Rea
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`font-heading text-sm font-medium tracking-wide uppercase transition-colors duration-200 link-underline ${
                      location === link.href
                        ? "text-gold"
                        : "hover:text-gold"
                    }`}
                    style={{ color: location === link.href ? "oklch(0.72 0.14 85)" : "oklch(0.25 0.02 250)" }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* CTA Buttons & Cart */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Cart Icon */}
              <CartDrawer
                trigger={
                  <button className="relative p-2 rounded-full transition-colors hover:bg-gray-100">
                    <ShoppingCart size={22} style={{ color: "oklch(0.25 0.02 250)" }} />
                    {isAuthenticated && cart && cart.itemCount > 0 && (
                      <span 
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                        style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}
                      >
                        {cart.itemCount}
                      </span>
                    )}
                  </button>
                }
              />
              
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                >
                  Work With Me
                </motion.span>
              </Link>
            </div>

            {/* Mobile Menu Button & Cart */}
            <div className="flex items-center gap-2 lg:hidden">
              <CartDrawer
                trigger={
                  <button className="relative p-2 rounded-full">
                    <ShoppingCart size={22} style={{ color: "oklch(0.15 0.03 250)" }} />
                    {isAuthenticated && cart && cart.itemCount > 0 && (
                      <span 
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                        style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}
                      >
                        {cart.itemCount}
                      </span>
                    )}
                  </button>
                }
              />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X size={24} style={{ color: "oklch(0.15 0.03 250)" }} />
                ) : (
                  <Menu size={24} style={{ color: "oklch(0.15 0.03 250)" }} />
                )}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ backgroundColor: "oklch(0.15 0.03 250)" }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={link.href}>
                    <span
                      className={`font-display text-3xl font-bold transition-colors ${
                        location === link.href ? "text-gold" : ""
                      }`}
                      style={{ color: location === link.href ? "oklch(0.72 0.14 85)" : "oklch(0.97 0.01 90)" }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-8"
              >
                <Link href="/contact">
                  <span className="btn-primary">Work With Me</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
