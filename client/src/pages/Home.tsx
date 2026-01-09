/*
  DESIGN: Bold Authority + Modern Sophistication
  Home Page: High-converting landing page with strong CTAs
  Features: Hero with blended image, interactive elements, smooth animations
*/

import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe, Award, Building, CheckCircle, Sparkles, Brain, Shield, Zap, ChevronDown, Play, ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";
import { toast } from "sonner";

const stats = [
  { number: "50+", label: "Enterprise Clients", icon: Building },
  { number: "$2B+", label: "AI Value Delivered", icon: Award },
  { number: "60+", label: "Countries Served", icon: Globe },
  { number: "200+", label: "AI Implementations", icon: CheckCircle },
];

const credentials = [
  { 
    institution: "Harvard University", 
    role: "Business School Graduate & Alumni Researcher",
    color: "oklch(0.55 0.15 15)"
  },
  { 
    institution: "University of Oxford", 
    role: "Jeremy Bentham Scholar 2025",
    color: "oklch(0.45 0.12 250)"
  },
  { 
    institution: "MIT", 
    role: "AI Ethics Certification",
    color: "oklch(0.55 0.18 30)"
  },
  { 
    institution: "Wharton School", 
    role: "Aresty Institute Certification",
    color: "oklch(0.50 0.15 250)"
  },
];

const services = [
  {
    title: "AI Strategy Consulting",
    description: "Enterprise AI strategy development, GenAI implementation roadmaps, and digital transformation advisory.",
    href: "/consulting",
    icon: Brain,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "AI Ethics & Governance",
    description: "Responsible AI frameworks, bias auditing, and ethical AI governance for compliant systems.",
    href: "/consulting",
    icon: Shield,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "AI Product Development",
    description: "End-to-end AI product strategy, LLM integration, agentic AI systems, and custom solutions.",
    href: "/consulting",
    icon: Zap,
    gradient: "from-emerald-500 to-teal-600",
  },
];

const testimonials = [
  {
    quote: "Dakota's AI strategy transformed our entire approach to digital transformation. His insights are invaluable.",
    author: "Sarah Chen",
    role: "CTO, Fortune 500 Tech Company",
    image: null,
  },
  {
    quote: "When it comes to understanding AI ethics and implementation, Dakota Rea is in a league of ONE.",
    author: "Mike Lewis",
    role: "VP Innovation, Global Consulting Firm",
    image: null,
  },
  {
    quote: "Dakota is a highly-motivated, trust-worthy entrepreneur. He's very knowledgeable and skilled in AI strategy.",
    author: "Holly Mann",
    role: "Chief Digital Officer",
    image: null,
  },
];

export default function Home() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Welcome! Check your inbox for exclusive insights.");
      setEmail("");
    }
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
      <Navigation />

      {/* Hero Section - Full Bleed with Image Integration */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background gradient that blends with image */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent z-10 lg:w-3/5" />
        
        {/* Hero Image - Full bleed on right */}
        <motion.div 
          style={{ y: imageY }}
          className="absolute right-0 top-0 w-full lg:w-3/5 h-full"
        >
          <div className="relative w-full h-full">
            <img
              src="/images/dakota-rea-portrait.jpg"
              alt="Dakota Rea - AI Strategy Consultant"
              className="w-full h-full object-cover object-top"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:from-transparent" />
            {/* Subtle color overlay for brand consistency */}
            <div className="absolute inset-0 mix-blend-multiply opacity-10" style={{ backgroundColor: "oklch(0.72 0.14 85)" }} />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          style={{ y: textY, opacity }}
          className="container relative z-20 pt-32 pb-20"
        >
          <div className="max-w-2xl">
            {/* Animated badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {["AI Strategy", "GenAI Expert", "Harvard & Oxford"].map((badge, i) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 text-sm font-medium tracking-wide uppercase cursor-default"
                  style={{ 
                    backgroundColor: "oklch(0.15 0.03 250)",
                    color: "oklch(0.97 0.01 90)"
                  }}
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
              style={{ color: "oklch(0.15 0.03 250)" }}
            >
              Transform Your Business with{" "}
              <span className="relative inline-block">
                <span className="gradient-text">Ethical AI</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-2 left-0 h-3 -z-10 opacity-30"
                  style={{ backgroundColor: "oklch(0.72 0.14 85)" }}
                />
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-body text-xl leading-relaxed mb-10"
              style={{ color: "oklch(0.35 0.02 250)" }}
            >
              I help Fortune 500 companies and ambitious startups implement AI strategies 
              that are powerful, responsible, and built to last. From GenAI roadmaps to 
              ethical governance frameworks.
            </motion.p>
            
            {/* Interactive CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link href="/consulting">
                <motion.span
                  whileHover={{ scale: 1.03, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-lg transition-all duration-300 cursor-pointer"
                  style={{ 
                    backgroundColor: "oklch(0.72 0.14 85)",
                    color: "oklch(0.15 0.03 250)"
                  }}
                >
                  Start Your AI Journey
                  <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
                </motion.span>
              </Link>
              <Link href="/speaking">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-lg border-2 transition-all duration-300 cursor-pointer"
                  style={{ 
                    borderColor: "oklch(0.15 0.03 250)",
                    color: "oklch(0.15 0.03 250)",
                    backgroundColor: "transparent"
                  }}
                >
                  <Play size={18} />
                  Watch My Talks
                </motion.span>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: `oklch(0.${55 + i * 8} 0.12 ${50 + i * 30})` }}
                    />
                  ))}
                </div>
                <p className="font-body text-sm" style={{ color: "oklch(0.45 0.02 250)" }}>
                  <strong style={{ color: "oklch(0.15 0.03 250)" }}>50+</strong> enterprise clients
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToServices}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="text-sm font-medium tracking-wide uppercase" style={{ color: "oklch(0.45 0.02 250)" }}>
            Explore Services
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={24} style={{ color: "oklch(0.72 0.14 85)" }} />
          </motion.div>
        </motion.button>
      </section>

      {/* Stats Section - Interactive Cards */}
      <section className="py-20 relative" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-6 text-center cursor-default transition-all duration-300"
                style={{ backgroundColor: "oklch(0.18 0.03 250)" }}
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="mx-auto mb-4" size={32} style={{ color: "oklch(0.72 0.14 85)" }} />
                </motion.div>
                <p className="font-display text-4xl font-bold mb-2" style={{ color: "oklch(0.97 0.01 90)" }}>
                  {stat.number}
                </p>
                <p className="font-body text-sm tracking-wide uppercase" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Section - Interactive Cards */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Academic Excellence</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>
              World-Class Credentials
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((cred, index) => (
              <motion.div
                key={cred.institution}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group p-6 bg-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden"
                style={{ border: "1px solid oklch(0.90 0.01 90)" }}
              >
                {/* Hover accent */}
                <motion.div
                  initial={{ height: 0 }}
                  whileHover={{ height: 4 }}
                  className="absolute top-0 left-0 right-0"
                  style={{ backgroundColor: cred.color }}
                />
                <Award className="mx-auto mb-4 transition-colors duration-300" size={36} style={{ color: cred.color }} />
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

      {/* Services Section - Interactive Cards */}
      <section id="services" className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">AI Consulting Services</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6" style={{ color: "oklch(0.15 0.03 250)" }}>
              Enterprise AI Solutions
            </h2>
            <p className="font-body text-xl max-w-2xl mx-auto" style={{ color: "oklch(0.35 0.02 250)" }}>
              From strategy to implementation, I help organizations harness AI responsibly and effectively.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link href={service.href}>
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group h-full p-8 bg-white cursor-pointer transition-all duration-300 relative overflow-hidden"
                    style={{ border: "1px solid oklch(0.90 0.01 90)" }}
                  >
                    {/* Animated gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-14 h-14 flex items-center justify-center mb-6"
                        style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.1)" }}
                      >
                        <service.icon size={28} style={{ color: "oklch(0.72 0.14 85)" }} />
                      </motion.div>
                      
                      <h3 className="font-display text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                        {service.title}
                        <ArrowUpRight 
                          size={20} 
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                          style={{ color: "oklch(0.72 0.14 85)" }}
                        />
                      </h3>
                      
                      <p className="font-body text-base leading-relaxed" style={{ color: "oklch(0.45 0.02 250)" }}>
                        {service.description}
                      </p>
                      
                      <motion.div
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        className="h-0.5 mt-6"
                        style={{ backgroundColor: "oklch(0.72 0.14 85)" }}
                      />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View all services CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/consulting">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 font-semibold text-lg cursor-pointer"
                style={{ color: "oklch(0.72 0.14 85)" }}
              >
                View All Services
                <ArrowRight size={20} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - Interactive Carousel */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Client Success</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: "oklch(0.97 0.01 90)" }}>
              Trusted by Industry Leaders
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Main testimonial */}
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-12"
            >
              <Sparkles className="mx-auto mb-6" size={40} style={{ color: "oklch(0.72 0.14 85)" }} />
              <p className="font-display text-2xl md:text-3xl leading-relaxed mb-8" style={{ color: "oklch(0.97 0.01 90)" }}>
                "{testimonials[activeTestimonial].quote}"
              </p>
              <p className="font-display text-xl font-bold" style={{ color: "oklch(0.97 0.01 90)" }}>
                {testimonials[activeTestimonial].author}
              </p>
              <p className="font-body text-base" style={{ color: "oklch(0.72 0.14 85)" }}>
                {testimonials[activeTestimonial].role}
              </p>
            </motion.div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-3 h-3 rounded-full transition-all duration-300 cursor-pointer"
                  style={{ 
                    backgroundColor: index === activeTestimonial 
                      ? "oklch(0.72 0.14 85)" 
                      : "oklch(0.97 0.01 90 / 0.3)"
                  }}
                />
              ))}
            </div>
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
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden cursor-pointer"
              >
                <img
                  src="/images/consulting-office.png"
                  alt="Tudor Foundation - Preserving Heritage"
                  className="w-full h-auto shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <Link href="/foundation">
                    <span className="text-white font-semibold flex items-center gap-2">
                      Learn More <ArrowRight size={18} />
                    </span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-label mb-4">Philanthropy</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6" style={{ color: "oklch(0.15 0.03 250)" }}>
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
                  whileHover={{ scale: 1.03, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-lg cursor-pointer"
                  style={{ 
                    backgroundColor: "oklch(0.15 0.03 250)",
                    color: "oklch(0.97 0.01 90)"
                  }}
                >
                  Explore Our Mission
                  <ArrowRight size={20} />
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
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6" style={{ color: "oklch(0.15 0.03 250)" }}>
                Get Weekly AI Strategy Insights
              </h2>
              <p className="font-body text-xl leading-relaxed mb-8" style={{ color: "oklch(0.15 0.03 250 / 0.8)" }}>
                Join 8,000+ leaders receiving exclusive insights on implementing 
                ethical, impactful AI strategies.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 font-body text-base focus:outline-none focus:ring-2 transition-all duration-300"
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
                  className="px-8 py-4 font-semibold text-base tracking-wide uppercase transition-all duration-300 cursor-pointer"
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
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6" style={{ color: "oklch(0.97 0.01 90)" }}>
                Ready to Transform Your AI Strategy?
              </h2>
              <p className="font-body text-xl leading-relaxed mb-8" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                Let's discuss how I can help your organization implement AI 
                responsibly and effectively.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/consulting">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-lg cursor-pointer"
                    style={{ 
                      backgroundColor: "oklch(0.72 0.14 85)",
                      color: "oklch(0.15 0.03 250)"
                    }}
                  >
                    Schedule a Consultation
                    <ArrowRight size={20} />
                  </motion.span>
                </Link>
                <Link href="/contact">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-lg border-2 cursor-pointer"
                    style={{ 
                      borderColor: "oklch(0.97 0.01 90)",
                      color: "oklch(0.97 0.01 90)",
                      backgroundColor: "transparent"
                    }}
                  >
                    Get in Touch
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
