/*
  DESIGN: Bold Authority + Modern Sophistication
  Home Page: High-converting landing page with strong CTAs
  Features: Hero with actual photo, social proof, credentials, email capture
*/

import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Globe, BookOpen, Users, Mic, Award, GraduationCap, Building, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { toast } from "sonner";

const stats = [
  { number: "60+", label: "Countries Visited", icon: Globe },
  { number: "1000s", label: "Audience Members", icon: Users },
  { number: "5", label: "Published Works", icon: BookOpen },
  { number: "200+", label: "Speaking Events", icon: Mic },
];

const credentials = [
  { 
    institution: "Harvard University", 
    role: "Business School Graduate & Alumni Researcher",
    icon: GraduationCap 
  },
  { 
    institution: "University of Oxford", 
    role: "Jeremy Bentham Scholar 2025",
    icon: Award 
  },
  { 
    institution: "MIT", 
    role: "AI Ethics Certification",
    icon: Award 
  },
  { 
    institution: "Wharton School", 
    role: "Aresty Institute Certification",
    icon: Award 
  },
];

const services = [
  {
    title: "Keynote Speaking",
    description: "Transformative talks on AI ethics, innovation, and leadership for audiences worldwide.",
    href: "/speaking",
  },
  {
    title: "Strategic Consulting",
    description: "Full-stack consulting for brands seeking millennial insights and ethical growth strategies.",
    href: "/consulting",
  },
  {
    title: "Published Author",
    description: "Books exploring the intersection of philosophy, technology, and human flourishing.",
    href: "/books",
  },
];

const testimonials = [
  {
    quote: "Dakota is a highly-motivated, enthusiastic, trust-worthy entrepreneur. He's very knowledgeable and skilled in what he does.",
    author: "Holly Mann",
    role: "Marketing Executive",
  },
  {
    quote: "When it comes to understanding Generation Y, their presence, their power and their influence, Dakota Rea is in a league of ONE.",
    author: "Mike Lewis",
    role: "Business Consultant",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Welcome! Check your inbox for exclusive insights.");
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="credential-badge">Harvard Alumni</span>
                <span className="credential-badge">Oxford Scholar</span>
                <span className="credential-badge">AI Ethics Expert</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6" style={{ color: "oklch(0.15 0.03 250)" }}>
                Shaping the Future of{" "}
                <span className="gradient-text">Ethical Innovation</span>
              </h1>
              
              <p className="font-body text-lg md:text-xl leading-relaxed mb-8 max-w-xl" style={{ color: "oklch(0.35 0.02 250)" }}>
                Entrepreneur, inventor, and philanthropist. Harvard and Oxford educated, 
                dedicated to advancing AI ethics and creating positive global impact 
                through research, speaking, and the Tudor Foundation.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/consulting">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary"
                  >
                    Work With Me
                    <ArrowRight size={16} />
                  </motion.span>
                </Link>
                <Link href="/speaking">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-secondary"
                  >
                    Book a Speaking Event
                  </motion.span>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 pt-4 border-t" style={{ borderColor: "oklch(0.90 0.01 90)" }}>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white"
                      style={{ backgroundColor: `oklch(0.${60 + i * 5} 0.14 85)` }}
                    />
                  ))}
                </div>
                <p className="font-body text-sm" style={{ color: "oklch(0.45 0.02 250)" }}>
                  <strong style={{ color: "oklch(0.15 0.03 250)" }}>8,000+</strong> professionals follow Dakota's insights
                </p>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative">
                {/* Decorative element */}
                <div 
                  className="absolute -top-4 -right-4 w-full h-full"
                  style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.1)" }}
                />
                <img
                  src="/images/dakota-rea-portrait.jpg"
                  alt="Dakota Rea - Entrepreneur, Scholar, and AI Ethics Expert"
                  className="relative z-10 w-full h-auto object-cover shadow-2xl"
                  style={{ maxHeight: "600px" }}
                />
                {/* Floating credential card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-6 -left-6 z-20 p-4 shadow-xl"
                  style={{ backgroundColor: "oklch(0.15 0.03 250)" }}
                >
                  <p className="font-heading text-xs font-semibold tracking-wider uppercase mb-1" style={{ color: "oklch(0.72 0.14 85)" }}>
                    Currently at
                  </p>
                  <p className="font-display text-lg font-bold" style={{ color: "oklch(0.97 0.01 90)" }}>
                    Slaughter and May
                  </p>
                  <p className="font-body text-sm" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                    UK Solicitor
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
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
                <stat.icon className="mx-auto mb-4" size={28} style={{ color: "oklch(0.72 0.14 85)" }} />
                <p className="stat-number mb-2">{stat.number}</p>
                <p className="font-heading text-sm tracking-wide uppercase" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Academic Excellence</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>
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
                className="p-6 bg-white card-hover text-center"
                style={{ border: "1px solid oklch(0.90 0.01 90)" }}
              >
                <cred.icon className="mx-auto mb-4" size={32} style={{ color: "oklch(0.72 0.14 85)" }} />
                <h3 className="font-display text-xl font-bold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                  {cred.institution}
                </h3>
                <p className="font-body text-sm" style={{ color: "oklch(0.45 0.02 250)" }}>
                  {cred.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-label mb-4">How I Can Help</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "oklch(0.15 0.03 250)" }}>
                Transform Your Vision Into Reality
              </h2>
              <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "oklch(0.35 0.02 250)" }}>
                With experience spanning 60+ countries and audiences of thousands, 
                I bring a unique global perspective to every engagement. Whether you need 
                a keynote speaker, strategic consultant, or thought partner, I'm here to help.
              </p>
              
              <div className="space-y-4">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={service.href}>
                      <div className="p-6 bg-white card-hover flex items-start gap-4" style={{ border: "1px solid oklch(0.90 0.01 90)" }}>
                        <CheckCircle size={24} style={{ color: "oklch(0.72 0.14 85)", flexShrink: 0 }} />
                        <div>
                          <h3 className="font-display text-xl font-bold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                            {service.title}
                          </h3>
                          <p className="font-body text-base" style={{ color: "oklch(0.45 0.02 250)" }}>
                            {service.description}
                          </p>
                        </div>
                        <ArrowRight size={20} style={{ color: "oklch(0.72 0.14 85)", flexShrink: 0 }} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/images/speaking-stage.png"
                alt="Dakota Rea speaking at global conference"
                className="w-full h-auto shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">What People Say</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.97 0.01 90)" }}>
              Trusted by Leaders Worldwide
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="testimonial-card"
                style={{ backgroundColor: "oklch(0.18 0.03 250)" }}
              >
                <p className="font-body text-lg leading-relaxed mb-6 relative z-10" style={{ color: "oklch(0.97 0.01 90 / 0.9)" }}>
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-display text-lg font-bold" style={{ color: "oklch(0.97 0.01 90)" }}>
                    {testimonial.author}
                  </p>
                  <p className="font-body text-sm" style={{ color: "oklch(0.72 0.14 85)" }}>
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tudor Foundation Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/consulting-office.png"
                alt="Tudor Foundation - Preserving Heritage"
                className="w-full h-auto shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-label mb-4">Philanthropy</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "oklch(0.15 0.03 250)" }}>
                The Tudor Foundation
              </h2>
              <p className="font-body text-lg leading-relaxed mb-6" style={{ color: "oklch(0.35 0.02 250)" }}>
                Founded on the belief that heritage should serve humanity, the Tudor 
                Foundation is dedicated to preserving and promoting England's rich Tudor 
                heritage and historical legacy.
              </p>
              <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "oklch(0.35 0.02 250)" }}>
                Through conservation of Tudor architectural landmarks, support of academic 
                research, and educational outreach, we're building bridges between the past 
                and future.
              </p>
              <Link href="/foundation">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                >
                  Learn About Our Mission
                  <ArrowRight size={16} />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Email Capture CTA */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.72 0.14 85)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "oklch(0.15 0.03 250)" }}>
                Get Weekly Insights on AI Ethics & Innovation
              </h2>
              <p className="font-body text-lg md:text-xl leading-relaxed mb-8" style={{ color: "oklch(0.15 0.03 250 / 0.8)" }}>
                Join thousands of leaders and innovators receiving exclusive insights 
                on building ethical, impactful businesses.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 font-body text-base"
                  style={{ 
                    backgroundColor: "oklch(1 0 0)",
                    border: "none",
                    color: "oklch(0.15 0.03 250)"
                  }}
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-4 font-heading text-sm font-semibold tracking-wide uppercase transition-all duration-300"
                  style={{ 
                    backgroundColor: "oklch(0.15 0.03 250)",
                    color: "oklch(0.97 0.01 90)"
                  }}
                >
                  Subscribe
                  <ArrowRight size={16} className="inline ml-2" />
                </motion.button>
              </form>
              <p className="font-body text-sm mt-4" style={{ color: "oklch(0.15 0.03 250 / 0.6)" }}>
                No spam. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
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
              <p className="font-body text-lg md:text-xl leading-relaxed mb-8" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                Whether you're seeking a keynote speaker, strategic consultant, 
                or collaborative partner, I'd love to hear from you.
              </p>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-white"
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
