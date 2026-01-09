/*
  DESIGN: AI Research Expert + High-Demand Consultant
  Home Page: Premium consultant branding with research credibility
  Features: Clean hero, research credentials, AI expertise showcase
*/

import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Award, Building, CheckCircle, Brain, Shield, Zap, ChevronDown, ExternalLink, Newspaper, BookOpen, Microscope, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { toast } from "sonner";

const stats = [
  { number: "50+", label: "Enterprise Clients", icon: Building },
  { number: "$2B+", label: "AI Value Delivered", icon: TrendingUp },
  { number: "60+", label: "Countries", icon: Globe },
  { number: "200+", label: "AI Projects", icon: CheckCircle },
];

const credentials = [
  { 
    institution: "Harvard University", 
    role: "Business School Graduate & AI Research Fellow",
    type: "Education"
  },
  { 
    institution: "University of Oxford", 
    role: "Jeremy Bentham Scholar 2025",
    type: "Research"
  },
  { 
    institution: "MIT", 
    role: "AI Ethics & Governance Certification",
    type: "Certification"
  },
  { 
    institution: "Wharton School", 
    role: "Aresty Institute Executive Program",
    type: "Certification"
  },
];

const expertise = [
  {
    title: "AI Strategy & Transformation",
    description: "Enterprise AI roadmaps, GenAI implementation strategies, and digital transformation leadership for Fortune 500 organizations.",
    icon: Brain,
    tags: ["GenAI", "LLMs", "Enterprise AI"],
  },
  {
    title: "AI Ethics & Governance",
    description: "Responsible AI frameworks, algorithmic auditing, bias mitigation, and regulatory compliance consulting.",
    icon: Shield,
    tags: ["Responsible AI", "Compliance", "Risk"],
  },
  {
    title: "AI Product Development",
    description: "End-to-end AI product strategy, from ideation to deployment. Custom LLM solutions and agentic AI systems.",
    icon: Zap,
    tags: ["Product Strategy", "LLM Apps", "Agents"],
  },
];

const researchAreas = [
  "Large Language Model Alignment",
  "AI Safety & Robustness",
  "Ethical AI Frameworks",
  "Human-AI Collaboration",
  "AI Governance Policy",
  "Algorithmic Fairness",
];

const testimonials = [
  {
    quote: "Dakota's AI strategy transformed our entire approach to digital transformation. His research background gives him insights that pure consultants simply don't have.",
    author: "Sarah Chen",
    role: "CTO, Fortune 500 Tech Company",
  },
  {
    quote: "A rare combination of academic rigor and practical business acumen. Dakota helped us navigate AI implementation with confidence.",
    author: "Michael Torres",
    role: "VP Innovation, Global Financial Services",
  },
  {
    quote: "Dakota's ethical AI framework became the foundation of our responsible AI program. His work is genuinely world-class.",
    author: "Dr. Emily Watson",
    role: "Chief AI Officer, Healthcare Enterprise",
  },
];

export default function Home() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Welcome! Check your inbox for exclusive AI insights.");
      setEmail("");
    }
  };

  const scrollToExpertise = () => {
    document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section - Clean Split Layout */}
      <section className="relative min-h-screen">
        <div className="container pt-32 pb-20 lg:pt-40 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content - 7 columns */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 order-2 lg:order-1"
            >
              {/* Role Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase rounded-full" style={{ backgroundColor: "oklch(0.15 0.03 250)", color: "oklch(0.97 0.01 90)" }}>
                  <Microscope size={12} />
                  AI Researcher
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase rounded-full" style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}>
                  <TrendingUp size={12} />
                  Strategy Consultant
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase rounded-full border" style={{ borderColor: "oklch(0.15 0.03 250)", color: "oklch(0.15 0.03 250)" }}>
                  <BookOpen size={12} />
                  Published Author
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                AI Researcher Turned
                <br />
                <span style={{ color: "oklch(0.72 0.14 85)" }}>Enterprise Strategist</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.35 0.02 250)" }}>
                I bridge the gap between cutting-edge AI research and real-world business impact. 
                Harvard and Oxford trained, helping Fortune 500 companies implement AI that's 
                powerful, ethical, and built to scale.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/consulting">
                  <motion.span
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-base cursor-pointer transition-all duration-300"
                    style={{ 
                      backgroundColor: "oklch(0.72 0.14 85)",
                      color: "oklch(0.15 0.03 250)",
                      boxShadow: "0 4px 14px oklch(0.72 0.14 85 / 0.3)"
                    }}
                  >
                    Book a Strategy Call
                    <ArrowRight size={18} />
                  </motion.span>
                </Link>
                <Link href="/ai-news">
                  <motion.span
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-base border-2 cursor-pointer transition-all duration-300"
                    style={{ 
                      borderColor: "oklch(0.15 0.03 250)",
                      color: "oklch(0.15 0.03 250)",
                      backgroundColor: "transparent"
                    }}
                  >
                    <Newspaper size={18} />
                    Latest AI News
                  </motion.span>
                </Link>
              </div>

              {/* Quick Stats Row */}
              <div className="flex flex-wrap gap-8 pt-6 border-t" style={{ borderColor: "oklch(0.90 0.01 90)" }}>
                <div>
                  <p className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>50+</p>
                  <p className="text-sm" style={{ color: "oklch(0.45 0.02 250)" }}>Enterprise Clients</p>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>$2B+</p>
                  <p className="text-sm" style={{ color: "oklch(0.45 0.02 250)" }}>AI Value Created</p>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>60+</p>
                  <p className="text-sm" style={{ color: "oklch(0.45 0.02 250)" }}>Countries</p>
                </div>
              </div>
            </motion.div>

            {/* Right Image - 5 columns */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 order-1 lg:order-2"
            >
              <div className="relative">
                {/* Image Container */}
                <div className="relative overflow-hidden" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
                  <img
                    src="/images/dakota-rea-portrait.jpg"
                    alt="Dakota Rea - AI Researcher and Strategy Consultant"
                    className="w-full h-auto object-cover"
                    style={{ maxHeight: "550px" }}
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
                
                {/* Credential Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-4 -left-4 p-4 shadow-xl"
                  style={{ backgroundColor: "oklch(0.15 0.03 250)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: "oklch(0.72 0.14 85)" }}>
                      <Award size={20} style={{ color: "oklch(0.15 0.03 250)" }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: "oklch(0.72 0.14 85)" }}>Oxford Scholar</p>
                      <p className="text-sm font-medium" style={{ color: "oklch(0.97 0.01 90)" }}>Jeremy Bentham 2025</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToExpertise}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        >
          <span className="text-xs font-medium tracking-wide uppercase" style={{ color: "oklch(0.45 0.02 250)" }}>
            Explore
          </span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={20} style={{ color: "oklch(0.72 0.14 85)" }} />
          </motion.div>
        </motion.button>
      </section>

      {/* Credentials Bar */}
      <section className="py-6 border-y" style={{ borderColor: "oklch(0.90 0.01 90)", backgroundColor: "oklch(0.97 0.01 90)" }}>
        <div className="container">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {credentials.map((cred, index) => (
              <motion.div
                key={cred.institution}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-sm font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>{cred.institution}</p>
                <p className="text-xs" style={{ color: "oklch(0.45 0.02 250)" }}>{cred.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "oklch(0.72 0.14 85)" }}>
              Areas of Expertise
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
              Research-Driven AI Consulting
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "oklch(0.35 0.02 250)" }}>
              Combining academic rigor with practical business experience to deliver AI solutions that work.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href="/consulting">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="h-full p-8 cursor-pointer transition-all duration-300 border"
                    style={{ borderColor: "oklch(0.90 0.01 90)", backgroundColor: "white" }}
                  >
                    <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.1)" }}>
                      <item.icon size={24} style={{ color: "oklch(0.72 0.14 85)" }} />
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                      {item.title}
                    </h3>
                    <p className="text-base mb-4" style={{ color: "oklch(0.45 0.02 250)" }}>
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs font-medium" style={{ backgroundColor: "oklch(0.97 0.01 90)", color: "oklch(0.35 0.02 250)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Focus Section */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "oklch(0.72 0.14 85)" }}>
                Research Background
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}>
                Grounded in Academic Excellence
              </h2>
              <p className="text-lg mb-8" style={{ color: "oklch(0.97 0.01 90 / 0.8)" }}>
                My consulting practice is built on a foundation of rigorous research in AI ethics, 
                safety, and governance. This academic grounding ensures that every strategy I develop 
                is not just effective, but responsible and future-proof.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {researchAreas.map((area, index) => (
                  <motion.div
                    key={area}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle size={16} style={{ color: "oklch(0.72 0.14 85)" }} />
                    <span className="text-sm" style={{ color: "oklch(0.97 0.01 90 / 0.9)" }}>{area}</span>
                  </motion.div>
                ))}
              </div>

              <Link href="/about">
                <motion.span
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 font-semibold cursor-pointer"
                  style={{ color: "oklch(0.72 0.14 85)" }}
                >
                  Read Full Bio
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4 }}
                  className="p-6 text-center"
                  style={{ backgroundColor: "oklch(0.18 0.03 250)" }}
                >
                  <stat.icon className="mx-auto mb-3" size={24} style={{ color: "oklch(0.72 0.14 85)" }} />
                  <p className="text-3xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}>
                    {stat.number}
                  </p>
                  <p className="text-xs uppercase tracking-wide" style={{ color: "oklch(0.97 0.01 90 / 0.6)" }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI News Teaser */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "oklch(0.72 0.14 85)" }}>
              Stay Informed
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
              Latest AI News & Insights
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "oklch(0.35 0.02 250)" }}>
              Curated AI news and analysis to keep you ahead of the curve. Updated daily.
            </p>
            <Link href="/ai-news">
              <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold cursor-pointer"
                style={{ 
                  backgroundColor: "oklch(0.15 0.03 250)",
                  color: "oklch(0.97 0.01 90)"
                }}
              >
                <Newspaper size={18} />
                Browse AI News
                <ExternalLink size={16} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "oklch(0.72 0.14 85)" }}>
              Client Results
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
              Trusted by Industry Leaders
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <p className="text-xl md:text-2xl leading-relaxed mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                "{testimonials[activeTestimonial].quote}"
              </p>
              <p className="font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>
                {testimonials[activeTestimonial].author}
              </p>
              <p className="text-sm" style={{ color: "oklch(0.72 0.14 85)" }}>
                {testimonials[activeTestimonial].role}
              </p>
            </motion.div>

            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer"
                  style={{ 
                    backgroundColor: index === activeTestimonial 
                      ? "oklch(0.72 0.14 85)" 
                      : "oklch(0.15 0.03 250 / 0.2)"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.72 0.14 85)" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
              Weekly AI Strategy Insights
            </h2>
            <p className="text-lg mb-8" style={{ color: "oklch(0.15 0.03 250 / 0.8)" }}>
              Join 8,000+ executives and researchers receiving actionable AI insights every week.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 text-base focus:outline-none"
                style={{ backgroundColor: "white", color: "oklch(0.15 0.03 250)" }}
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 font-semibold cursor-pointer"
                style={{ backgroundColor: "oklch(0.15 0.03 250)", color: "oklch(0.97 0.01 90)" }}
              >
                Subscribe
              </motion.button>
            </form>
            <p className="text-sm mt-4" style={{ color: "oklch(0.15 0.03 250 / 0.6)" }}>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}>
              Ready to Transform Your AI Strategy?
            </h2>
            <p className="text-lg mb-8" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
              Let's discuss how research-backed AI consulting can accelerate your organization's success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/consulting">
                <motion.span
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold cursor-pointer"
                  style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}
                >
                  Schedule a Consultation
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold border-2 cursor-pointer"
                  style={{ borderColor: "oklch(0.97 0.01 90)", color: "oklch(0.97 0.01 90)", backgroundColor: "transparent" }}
                >
                  Get in Touch
                </motion.span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
