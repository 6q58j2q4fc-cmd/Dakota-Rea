/*
  DESIGN: Bold Authority + Modern Sophistication
  Foundation Page: Tudor Foundation with mission and initiatives
*/

import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Building, BookOpen, Users, Globe, Award, GraduationCap, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const pillars = [
  {
    icon: Building,
    title: "Heritage Preservation",
    description: "Conserving and restoring Tudor architectural landmarks across England, ensuring these treasures endure for future generations.",
    stats: "12 Sites Protected",
  },
  {
    icon: BookOpen,
    title: "Academic Research",
    description: "Funding scholarly research into Tudor history, supporting historians, archaeologists, and researchers worldwide.",
    stats: "50+ Grants Awarded",
  },
  {
    icon: Users,
    title: "Public Education",
    description: "Making Tudor history accessible through educational programs, exhibitions, and digital resources.",
    stats: "100K+ People Reached",
  },
];

const initiatives = [
  {
    title: "Tudor Heritage Trail",
    description: "A nationwide initiative connecting Tudor sites across England with interactive experiences and educational content.",
    image: "/images/global-travel.png",
  },
  {
    title: "Young Historians Program",
    description: "Inspiring the next generation of historians through school partnerships, internships, and scholarship opportunities.",
    image: "/images/speaking-stage.png",
  },
  {
    title: "Digital Archive Project",
    description: "Creating a comprehensive digital archive of Tudor documents, artifacts, and research for global access.",
    image: "/images/consulting-office.png",
  },
];

const stats = [
  { number: "£2M+", label: "Funds Raised" },
  { number: "12", label: "Sites Protected" },
  { number: "50+", label: "Research Grants" },
  { number: "100K+", label: "People Reached" },
];

export default function Foundation() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your interest! You'll receive updates about the Tudor Foundation.");
    setEmail("");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/global-travel.png"
            alt="Tudor architecture and heritage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.15 0.03 250 / 0.9) 0%, oklch(0.15 0.03 250 / 0.7) 100%)" }} />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="section-label mb-4" style={{ color: "oklch(0.72 0.14 85)" }}>
                The Tudor Foundation
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: "oklch(0.97 0.01 90)" }}>
                Preserving England's{" "}
                <span style={{ color: "oklch(0.72 0.14 85)" }}>Tudor Heritage</span>
              </h1>
              <p className="font-body text-xl leading-relaxed mb-8" style={{ color: "oklch(0.97 0.01 90 / 0.85)" }}>
                Founded by Dakota Rea, the Tudor Foundation is dedicated to preserving, 
                researching, and sharing England's rich Tudor history for future generations.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#support">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary"
                  >
                    Support Our Mission
                    <Heart size={16} />
                  </motion.span>
                </a>
                <a href="#initiatives">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-white"
                  >
                    View Initiatives
                  </motion.span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="stat-number mb-2">{stat.number}</p>
                <p className="font-heading text-sm tracking-wide uppercase" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-label mb-4">Our Mission</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: "oklch(0.15 0.03 250)" }}>
                Why Tudor History Matters
              </h2>
              <p className="font-body text-lg leading-relaxed mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                The Tudor period (1485-1603) represents one of the most transformative eras 
                in English history. From the religious reformation to the flourishing of arts 
                and exploration, the Tudor legacy continues to shape our world today.
              </p>
              <p className="font-body text-lg leading-relaxed mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                The Tudor Foundation was established to ensure this remarkable heritage is 
                preserved, studied, and shared. Through our work in conservation, research, 
                and education, we're building bridges between past and present.
              </p>
              <blockquote 
                className="pl-6 py-4 italic"
                style={{ borderLeft: "4px solid oklch(0.72 0.14 85)" }}
              >
                <p className="font-body text-lg mb-2" style={{ color: "oklch(0.35 0.02 250)" }}>
                  "Understanding our history is essential to navigating our future. The Tudor 
                  period offers timeless lessons in leadership, innovation, and resilience."
                </p>
                <cite className="font-heading text-sm not-italic" style={{ color: "oklch(0.72 0.14 85)" }}>
                  — Dakota Rea, Founder
                </cite>
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/consulting-office.png"
                alt="Tudor heritage preservation"
                className="w-full h-auto shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Our Focus</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>
              Three Pillars of Impact
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white card-hover text-center"
                style={{ border: "1px solid oklch(0.90 0.01 90)" }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.1)" }}
                >
                  <pillar.icon size={32} style={{ color: "oklch(0.72 0.14 85)" }} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: "oklch(0.15 0.03 250)" }}>
                  {pillar.title}
                </h3>
                <p className="font-body text-base mb-4" style={{ color: "oklch(0.45 0.02 250)" }}>
                  {pillar.description}
                </p>
                <p className="font-heading text-sm font-semibold" style={{ color: "oklch(0.72 0.14 85)" }}>
                  {pillar.stats}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section id="initiatives" className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Current Work</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>
              Featured Initiatives
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/3] overflow-hidden mb-6 shadow-lg">
                  <img
                    src={initiative.image}
                    alt={initiative.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: "oklch(0.15 0.03 250)" }}>
                  {initiative.title}
                </h3>
                <p className="font-body text-base" style={{ color: "oklch(0.45 0.02 250)" }}>
                  {initiative.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section id="support" className="py-24" style={{ backgroundColor: "oklch(0.72 0.14 85)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Heart size={48} className="mx-auto mb-6" style={{ color: "oklch(0.15 0.03 250)" }} />
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "oklch(0.15 0.03 250)" }}>
                Support Our Mission
              </h2>
              <p className="font-body text-lg mb-8" style={{ color: "oklch(0.15 0.03 250 / 0.8)" }}>
                Your contribution helps preserve Tudor heritage, fund vital research, 
                and educate future generations. Every donation makes a difference.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-4 font-heading text-sm font-semibold tracking-wider uppercase transition-all"
                  style={{ backgroundColor: "oklch(0.15 0.03 250)", color: "oklch(0.97 0.01 90)" }}
                >
                  Make a Donation
                  <ArrowRight size={16} />
                </motion.button>
                <Link href="/contact">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 py-4 font-heading text-sm font-semibold tracking-wider uppercase transition-all"
                    style={{ backgroundColor: "transparent", color: "oklch(0.15 0.03 250)", border: "2px solid oklch(0.15 0.03 250)" }}
                  >
                    Partner With Us
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 text-center"
              style={{ backgroundColor: "oklch(0.97 0.01 90)" }}
            >
              <h3 className="font-display text-2xl font-bold mb-4" style={{ color: "oklch(0.15 0.03 250)" }}>
                Stay Connected
              </h3>
              <p className="font-body text-base mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                Subscribe to receive updates on our initiatives, impact stories, 
                and opportunities to get involved.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button type="submit" className="btn-primary">
                  Subscribe
                  <ArrowRight size={16} />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Board Section */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Leadership</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "oklch(0.15 0.03 250)" }}>
              Foundation Board
            </h2>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "oklch(0.45 0.02 250)" }}>
              The Tudor Foundation is guided by a dedicated board of historians, 
              preservationists, and philanthropists committed to our mission.
            </p>
          </motion.div>

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-white text-center"
              style={{ border: "1px solid oklch(0.90 0.01 90)" }}
            >
              <img
                src="/images/dakota-rea-portrait.jpg"
                alt="Dakota Rea - Founder"
                className="w-32 h-32 mx-auto mb-6 object-cover shadow-lg"
              />
              <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                Dakota Rea
              </h3>
              <p className="font-heading text-sm mb-4" style={{ color: "oklch(0.72 0.14 85)" }}>
                Founder & Chairman
              </p>
              <p className="font-body text-base" style={{ color: "oklch(0.45 0.02 250)" }}>
                Dakota founded the Tudor Foundation to combine his passion for history 
                with his commitment to education and preservation. His vision guides 
                all of the foundation's initiatives.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
