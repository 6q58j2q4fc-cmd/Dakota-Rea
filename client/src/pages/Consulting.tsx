/*
  DESIGN: Bold Authority + Modern Sophistication
  Consulting Page: High-converting with clear service offerings
*/

import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Zap, Target, Users, TrendingUp, Lightbulb, Shield, Brain, Building, Compass } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const services = [
  {
    icon: Brain,
    title: "AI Ethics & Governance",
    description: "Develop comprehensive AI ethics frameworks, governance structures, and responsible innovation practices.",
    features: ["AI ethics policy development", "Algorithmic bias assessment", "Governance framework design", "Stakeholder engagement"],
  },
  {
    icon: Compass,
    title: "Strategic Advisory",
    description: "Navigate complex business challenges with strategic guidance informed by global experience.",
    features: ["Executive strategy sessions", "Market entry analysis", "Innovation roadmapping", "Risk assessment"],
  },
  {
    icon: Users,
    title: "Generation Y Insights",
    description: "Deep expertise on millennial market dynamics, consumer behavior, and engagement strategies.",
    features: ["Market research", "Brand positioning", "Consumer insights", "Marketing strategy"],
  },
  {
    icon: Building,
    title: "Organizational Transformation",
    description: "Guide your organization through meaningful change that enhances performance and human flourishing.",
    features: ["Change management", "Digital transformation", "Operational excellence", "Culture transformation"],
  },
];

const process = [
  {
    step: "01",
    title: "Discovery Call",
    description: "We start with a complimentary 30-minute call to understand your challenges and goals.",
  },
  {
    step: "02",
    title: "Custom Proposal",
    description: "Based on our discussion, I'll create a tailored proposal outlining scope, timeline, and investment.",
  },
  {
    step: "03",
    title: "Deep Dive",
    description: "We conduct thorough research and analysis to understand your unique situation.",
  },
  {
    step: "04",
    title: "Strategic Delivery",
    description: "You receive actionable recommendations and ongoing support for implementation.",
  },
];

const results = [
  { metric: "95%", label: "Client Satisfaction" },
  { metric: "60+", label: "Countries Served" },
  { metric: "200+", label: "Projects Completed" },
  { metric: "15+", label: "Years Experience" },
];

export default function Consulting() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Thank you! I'll be in touch within 24 hours to schedule our discovery call.");
    setFormData({ name: "", email: "", company: "", service: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="section-label mb-4">Full-Stack Consulting</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6" style={{ color: "oklch(0.15 0.03 250)" }}>
                Strategic Guidance for{" "}
                <span className="gradient-text">Ambitious Leaders</span>
              </h1>
              <p className="font-body text-lg md:text-xl leading-relaxed mb-8" style={{ color: "oklch(0.35 0.02 250)" }}>
                Leverage world-class expertise from Harvard, Oxford, MIT, and Wharton. 
                I help organizations navigate complex challenges at the intersection of 
                strategy, ethics, and innovation.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <a href="#contact">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary"
                  >
                    Schedule Discovery Call
                    <ArrowRight size={16} />
                  </motion.span>
                </a>
                <Link href="/about">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-secondary"
                  >
                    Learn More About Dakota
                  </motion.span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                <span className="credential-badge">Harvard Alumni</span>
                <span className="credential-badge">Oxford Scholar</span>
                <span className="credential-badge">MIT Certified</span>
                <span className="credential-badge">Wharton Certified</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="/images/consulting-office.png"
                alt="Professional consulting environment"
                className="w-full h-auto shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((result, index) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="stat-number mb-2">{result.metric}</p>
                <p className="font-heading text-sm tracking-wide uppercase" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                  {result.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Services</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "oklch(0.15 0.03 250)" }}>
              How I Can Help
            </h2>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "oklch(0.45 0.02 250)" }}>
              Every engagement is tailored to your specific needs. Here are the core areas 
              where I provide the most value.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white card-hover"
                style={{ border: "1px solid oklch(0.90 0.01 90)" }}
              >
                <service.icon size={36} className="mb-4" style={{ color: "oklch(0.72 0.14 85)" }} />
                <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "oklch(0.15 0.03 250)" }}>
                  {service.title}
                </h3>
                <p className="font-body text-base mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle size={16} style={{ color: "oklch(0.72 0.14 85)" }} />
                      <span className="font-body text-sm" style={{ color: "oklch(0.35 0.02 250)" }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">The Process</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "oklch(0.15 0.03 250)" }}>
              How We Work Together
            </h2>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "oklch(0.45 0.02 250)" }}>
              A structured approach that delivers results while respecting your time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: "oklch(0.72 0.14 85)" }}
                >
                  <span className="font-display text-2xl font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                  {step.title}
                </h3>
                <p className="font-body text-base" style={{ color: "oklch(0.45 0.02 250)" }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Me */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/global-travel.png"
                alt="Global business experience across 60+ countries"
                className="w-full h-auto shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-label mb-4">Why Work With Me</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8" style={{ color: "oklch(0.15 0.03 250)" }}>
                A Unique Perspective
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: "World-Class Credentials",
                    description: "Harvard, Oxford, MIT, and Wharton education combined with real-world experience.",
                  },
                  {
                    icon: Zap,
                    title: "Global Experience",
                    description: "Insights from 60+ countries and diverse industries across the globe.",
                  },
                  {
                    icon: Target,
                    title: "Results-Focused",
                    description: "Every engagement is designed to deliver measurable, actionable outcomes.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div 
                      className="w-12 h-12 flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.1)" }}
                    >
                      <item.icon size={24} style={{ color: "oklch(0.72 0.14 85)" }} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold mb-1" style={{ color: "oklch(0.15 0.03 250)" }}>
                        {item.title}
                      </h3>
                      <p className="font-body text-base" style={{ color: "oklch(0.45 0.02 250)" }}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="section-label mb-4" style={{ color: "oklch(0.72 0.14 85)" }}>Get Started</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "oklch(0.97 0.01 90)" }}>
                Schedule Your Discovery Call
              </h2>
              <p className="font-body text-lg" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                Let's discuss how I can help you achieve your goals. The first call is complimentary.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="p-8 md:p-12"
              style={{ backgroundColor: "oklch(0.18 0.03 250)" }}
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-heading text-sm font-medium mb-2" style={{ color: "oklch(0.97 0.01 90)" }}>
                    Your Name *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{ backgroundColor: "oklch(0.22 0.03 250)", borderColor: "oklch(0.30 0.02 250)", color: "oklch(0.97 0.01 90)" }}
                  />
                </div>
                <div>
                  <label className="block font-heading text-sm font-medium mb-2" style={{ color: "oklch(0.97 0.01 90)" }}>
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{ backgroundColor: "oklch(0.22 0.03 250)", borderColor: "oklch(0.30 0.02 250)", color: "oklch(0.97 0.01 90)" }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-heading text-sm font-medium mb-2" style={{ color: "oklch(0.97 0.01 90)" }}>
                    Company/Organization
                  </label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={{ backgroundColor: "oklch(0.22 0.03 250)", borderColor: "oklch(0.30 0.02 250)", color: "oklch(0.97 0.01 90)" }}
                  />
                </div>
                <div>
                  <label className="block font-heading text-sm font-medium mb-2" style={{ color: "oklch(0.97 0.01 90)" }}>
                    Service Interest
                  </label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger style={{ backgroundColor: "oklch(0.22 0.03 250)", borderColor: "oklch(0.30 0.02 250)", color: "oklch(0.97 0.01 90)" }}>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai-ethics">AI Ethics & Governance</SelectItem>
                      <SelectItem value="strategic">Strategic Advisory</SelectItem>
                      <SelectItem value="gen-y">Generation Y Insights</SelectItem>
                      <SelectItem value="transformation">Organizational Transformation</SelectItem>
                      <SelectItem value="multiple">Multiple Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-heading text-sm font-medium mb-2" style={{ color: "oklch(0.97 0.01 90)" }}>
                  How can I help? *
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  required
                  placeholder="Tell me about your challenges and what you're hoping to achieve..."
                  style={{ backgroundColor: "oklch(0.22 0.03 250)", borderColor: "oklch(0.30 0.02 250)", color: "oklch(0.97 0.01 90)" }}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary"
              >
                {isSubmitting ? "Submitting..." : "Request Discovery Call"}
                <ArrowRight size={16} />
              </Button>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
