/*
  DESIGN: Timeless Editorial Luxury
  Home Page: Magazine-style hero with dramatic scale contrasts
  Features: Full-bleed photography, oversized numerals, editorial layouts
*/

import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Globe, BookOpen, Users, Mic } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const stats = [
  { number: "60+", label: "Countries Visited", icon: Globe },
  { number: "1000s", label: "Audience Members", icon: Users },
  { number: "5", label: "Published Works", icon: BookOpen },
  { number: "200+", label: "Speaking Events", icon: Mic },
];

const credentials = [
  { institution: "Harvard University", role: "Graduate & Alumni Researcher" },
  { institution: "Oxford University", role: "Jeremy Bentham Scholar" },
  { institution: "MIT", role: "AI Ethics Certification" },
  { institution: "Wharton School", role: "Executive Certification" },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                Entrepreneur · Scholar · Visionary
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6" style={{ color: "oklch(0.25 0.01 50)" }}>
                Dakota Rea
              </h1>
              <p className="font-body text-lg md:text-xl leading-relaxed mb-8 max-w-xl" style={{ color: "oklch(0.35 0.01 50)" }}>
                A global thought leader at the intersection of innovation, ethics, and philanthropy. 
                Harvard and Oxford educated, dedicated to shaping a more thoughtful future through 
                research, speaking, and the Tudor Foundation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 py-4 font-sans text-sm font-semibold tracking-wide uppercase transition-all duration-300"
                    style={{ 
                      backgroundColor: "oklch(0.25 0.01 50)", 
                      color: "oklch(0.97 0.01 90)" 
                    }}
                  >
                    Discover More
                    <ArrowRight size={16} />
                  </motion.span>
                </Link>
                <Link href="/speaking">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 py-4 font-sans text-sm font-semibold tracking-wide uppercase border transition-all duration-300"
                    style={{ 
                      borderColor: "oklch(0.25 0.01 50)", 
                      color: "oklch(0.25 0.01 50)" 
                    }}
                  >
                    Book a Speaking Event
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
                <img
                  src="/images/hero-portrait.png"
                  alt="Dakota Rea - Entrepreneur, Inventor, Philanthropist, AI Ethics Expert, Harvard and Oxford Graduate"
                  className="w-full h-full object-cover"
                  title="Dakota Rea - Global Thought Leader and Keynote Speaker"
                />
                {/* Editorial frame accent */}
                <div 
                  className="absolute -bottom-4 -right-4 w-full h-full border pointer-events-none"
                  style={{ borderColor: "oklch(0.62 0.12 45 / 0.3)" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.25 0.01 50)" }}>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <stat.icon className="mx-auto mb-4" size={28} style={{ color: "oklch(0.62 0.12 45)" }} />
                <p className="stat-number mb-2" style={{ color: "oklch(0.97 0.01 90)" }}>
                  {stat.number}
                </p>
                <p className="font-sans text-sm tracking-wide uppercase" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/hero-global.png"
                  alt="Dakota Rea global travels - 60+ countries visited as keynote speaker and AI ethics consultant"
                  className="w-full h-full object-cover"
                  title="Dakota Rea's Global Speaking Experience"
                />
              </div>
              {/* Floating caption */}
              <div 
                className="absolute -bottom-6 -right-6 md:right-8 p-6 max-w-xs"
                style={{ backgroundColor: "oklch(0.99 0.005 90 / 0.95)", backdropFilter: "blur(8px)" }}
              >
                <p className="font-body text-sm italic" style={{ color: "oklch(0.35 0.01 50)" }}>
                  "The world is my classroom. Every culture, every conversation, 
                  every challenge shapes how I think about our shared future."
                </p>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                Global Perspective
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "oklch(0.25 0.01 50)" }}>
                A Life of Exploration & Purpose
              </h2>
              <p className="font-body text-lg leading-relaxed mb-6" style={{ color: "oklch(0.35 0.01 50)" }}>
                Having traveled to over 60 countries and spoken to audiences of thousands, 
                Dakota brings a truly global perspective to every endeavor. From the halls 
                of Oxford and Harvard to remote communities around the world, his journey 
                has been one of continuous learning and meaningful impact.
              </p>
              <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "oklch(0.35 0.01 50)" }}>
                As a Jeremy Bentham scholar, Dakota's work bridges classical philosophy 
                with contemporary challenges in AI ethics, creating frameworks for 
                responsible innovation that serve humanity's greatest good.
              </p>
              <Link href="/about">
                <span className="inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-wide uppercase link-underline" style={{ color: "oklch(0.25 0.01 50)" }}>
                  Read Full Biography
                  <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.94 0.01 90)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
              Academic Excellence
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.25 0.01 50)" }}>
              World-Class Credentials
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((cred, index) => (
              <motion.div
                key={cred.institution}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 text-center transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: "oklch(0.99 0.005 90)" }}
              >
                <h3 className="font-display text-xl font-bold mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                  {cred.institution}
                </h3>
                <p className="font-body text-sm" style={{ color: "oklch(0.45 0.01 50)" }}>
                  {cred.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaking Preview */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-speaking.png"
            alt="Dakota Rea keynote speaker at global innovation conference - AI ethics and leadership presentations"
            className="w-full h-full object-cover"
            title="Dakota Rea Keynote Speaking Engagements"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0.25 0.01 50 / 0.85)" }} />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                Keynote Speaking
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "oklch(0.97 0.01 90)" }}>
                Inspiring Audiences Worldwide
              </h2>
              <p className="font-body text-lg md:text-xl leading-relaxed mb-8" style={{ color: "oklch(0.97 0.01 90 / 0.85)" }}>
                From intimate boardrooms to stages of thousands, Dakota delivers 
                transformative talks on AI ethics, innovation, leadership, and 
                creating meaningful change in an uncertain world.
              </p>
              <Link href="/speaking">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-4 font-sans text-sm font-semibold tracking-wide uppercase transition-all duration-300"
                  style={{ 
                    backgroundColor: "oklch(0.62 0.12 45)", 
                    color: "oklch(0.99 0.005 90)" 
                  }}
                >
                  Book Dakota to Speak
                  <ArrowRight size={16} />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Books Preview */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                Published Works
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "oklch(0.25 0.01 50)" }}>
                Ideas That Shape Tomorrow
              </h2>
              <p className="font-body text-lg leading-relaxed mb-6" style={{ color: "oklch(0.35 0.01 50)" }}>
                Dakota's books explore the intersection of philosophy, technology, 
                and human flourishing. Each work offers practical wisdom drawn from 
                years of research, global experience, and deep reflection.
              </p>
              <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "oklch(0.35 0.01 50)" }}>
                Pre-order upcoming titles or explore the complete collection of 
                published works that have influenced leaders, educators, and 
                changemakers around the world.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/books">
                  <span className="inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-wide uppercase link-underline" style={{ color: "oklch(0.25 0.01 50)" }}>
                    Browse All Books
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/hero-books.png"
                  alt="Dakota Rea published books on AI ethics, leadership, and philosophy - available for order and pre-order"
                  className="w-full h-full object-cover"
                  title="Books by Dakota Rea"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tudor Foundation Preview */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.65 0.05 145 / 0.15)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/hero-philanthropy.png"
                  alt="Tudor Foundation philanthropy and community empowerment - education and ethical technology initiatives founded by Dakota Rea"
                  className="w-full h-full object-cover"
                  title="The Tudor Foundation - Founded by Dakota Rea"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                Philanthropy
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "oklch(0.25 0.01 50)" }}>
                The Tudor Foundation
              </h2>
              <p className="font-body text-lg leading-relaxed mb-6" style={{ color: "oklch(0.35 0.01 50)" }}>
                Founded on the belief that knowledge should serve humanity, the Tudor 
                Foundation supports education, ethical technology development, and 
                community empowerment initiatives around the globe.
              </p>
              <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "oklch(0.35 0.01 50)" }}>
                Through strategic partnerships and grassroots programs, we're building 
                a more equitable future—one community at a time.
              </p>
              <Link href="/foundation">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-4 font-sans text-sm font-semibold tracking-wide uppercase transition-all duration-300"
                  style={{ 
                    backgroundColor: "oklch(0.65 0.05 145)", 
                    color: "oklch(0.99 0.005 90)" 
                  }}
                >
                  Learn About Our Mission
                  <ArrowRight size={16} />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.25 0.01 50)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "oklch(0.97 0.01 90)" }}>
                Let's Create Something Meaningful
              </h2>
              <p className="font-body text-lg md:text-xl leading-relaxed mb-8" style={{ color: "oklch(0.97 0.01 90 / 0.85)" }}>
                Whether you're seeking a keynote speaker, strategic consultant, 
                or collaborative partner, I'd love to hear from you.
              </p>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-4 font-sans text-sm font-semibold tracking-wide uppercase transition-all duration-300"
                  style={{ 
                    backgroundColor: "oklch(0.97 0.01 90)", 
                    color: "oklch(0.25 0.01 50)" 
                  }}
                >
                  Get in Touch
                  <ArrowRight size={16} />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
