/*
  DESIGN: Timeless Editorial Luxury
  Consulting Page: Full-stack consulting services with clear offerings
*/

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Building, CheckCircle, Compass, Shield, Users } from "lucide-react";
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
    description: "Develop comprehensive AI ethics frameworks, governance structures, and responsible innovation practices tailored to your organization.",
    features: [
      "AI ethics policy development",
      "Algorithmic bias assessment",
      "Governance framework design",
      "Stakeholder engagement strategies",
    ],
  },
  {
    icon: Compass,
    title: "Strategic Advisory",
    description: "Navigate complex business challenges with strategic guidance informed by global experience and rigorous analytical thinking.",
    features: [
      "Executive strategy sessions",
      "Market entry analysis",
      "Innovation roadmapping",
      "Risk assessment & mitigation",
    ],
  },
  {
    icon: Shield,
    title: "Leadership Development",
    description: "Build leaders who can guide organizations through uncertainty with clarity, ethics, and purpose.",
    features: [
      "Executive coaching",
      "Leadership team alignment",
      "Succession planning",
      "Culture transformation",
    ],
  },
  {
    icon: Building,
    title: "Organizational Transformation",
    description: "Guide your organization through meaningful change that enhances both performance and human flourishing.",
    features: [
      "Change management",
      "Digital transformation",
      "Operational excellence",
      "Stakeholder alignment",
    ],
  },
  {
    icon: Users,
    title: "Board Advisory",
    description: "Provide strategic counsel to boards navigating technology, ethics, and governance challenges.",
    features: [
      "Board presentations",
      "Strategic planning support",
      "Risk oversight guidance",
      "Stakeholder communication",
    ],
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description: "Deep dive into your organization's challenges, goals, and context through stakeholder interviews and analysis.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Develop tailored recommendations and actionable frameworks based on research, experience, and best practices.",
  },
  {
    step: "03",
    title: "Implementation",
    description: "Work alongside your team to execute strategies, providing guidance and support throughout the process.",
  },
  {
    step: "04",
    title: "Evaluation",
    description: "Measure outcomes, refine approaches, and ensure sustainable impact that extends beyond the engagement.",
  },
];

const clients = [
  "Fortune 500 Technology Companies",
  "Global Financial Institutions",
  "Healthcare Organizations",
  "Government Agencies",
  "Non-Profit Foundations",
  "Academic Institutions",
];

export default function Consulting() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Thank you for your inquiry! We'll schedule a discovery call within 48 hours.");
    setFormData({
      name: "",
      email: "",
      organization: "",
      service: "",
      budget: "",
      timeline: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                Full-Stack Consulting
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: "oklch(0.25 0.01 50)" }}>
                Strategic Guidance for Complex Challenges
              </h1>
              <p className="font-body text-xl leading-relaxed" style={{ color: "oklch(0.35 0.01 50)" }}>
                Drawing on decades of experience across industries and continents, 
                Dakota provides consulting services that bridge strategy, ethics, 
                and practical implementation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 md:pb-32">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 border transition-all duration-300 hover:shadow-lg group"
                style={{ borderColor: "oklch(0.88 0.01 90)", backgroundColor: "oklch(0.99 0.005 90)" }}
              >
                <service.icon 
                  className="mb-6 transition-colors duration-300 group-hover:text-terracotta" 
                  size={36} 
                  style={{ color: "oklch(0.62 0.12 45)" }} 
                />
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: "oklch(0.25 0.01 50)" }}>
                  {service.title}
                </h3>
                <p className="font-body text-base leading-relaxed mb-6" style={{ color: "oklch(0.45 0.01 50)" }}>
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="flex-shrink-0 mt-1" size={14} style={{ color: "oklch(0.65 0.05 145)" }} />
                      <span className="font-body text-sm" style={{ color: "oklch(0.45 0.01 50)" }}>
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
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.25 0.01 50)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
              The Process
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.97 0.01 90)" }}>
              How We Work Together
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-5xl font-bold mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                  {item.step}
                </p>
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: "oklch(0.97 0.01 90)" }}>
                  {item.title}
                </h3>
                <p className="font-body text-base leading-relaxed" style={{ color: "oklch(0.97 0.01 90 / 0.75)" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                Client Experience
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: "oklch(0.25 0.01 50)" }}>
                Trusted by Leaders Across Industries
              </h2>
              <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "oklch(0.35 0.01 50)" }}>
                Dakota has advised organizations ranging from early-stage startups to 
                Fortune 500 companies, bringing the same rigor and care to every engagement.
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {clients.map((client) => (
                  <li key={client} className="flex items-center gap-2">
                    <CheckCircle size={16} style={{ color: "oklch(0.65 0.05 145)" }} />
                    <span className="font-body text-sm" style={{ color: "oklch(0.35 0.01 50)" }}>
                      {client}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8"
              style={{ backgroundColor: "oklch(0.94 0.01 90)" }}
            >
              <blockquote>
                <p className="font-body text-lg leading-relaxed italic mb-6" style={{ color: "oklch(0.35 0.01 50)" }}>
                  "Dakota's approach to AI ethics consulting transformed how we think about 
                  responsible innovation. His frameworks have become foundational to our 
                  product development process."
                </p>
                <footer>
                  <p className="font-display text-base font-bold" style={{ color: "oklch(0.25 0.01 50)" }}>
                    Chief Technology Officer
                  </p>
                  <p className="font-sans text-sm" style={{ color: "oklch(0.55 0.01 50)" }}>
                    Fortune 100 Technology Company
                  </p>
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.94 0.01 90)" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                Start the Conversation
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "oklch(0.25 0.01 50)" }}>
                Request a Consultation
              </h2>
              <p className="font-body text-lg" style={{ color: "oklch(0.45 0.01 50)" }}>
                Share your challenges and we'll schedule a discovery call to explore how we can help.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="space-y-6 p-8"
              style={{ backgroundColor: "oklch(0.99 0.005 90)" }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-sm font-medium mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                    Your Name *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="font-body"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="font-body"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                  Organization *
                </label>
                <Input
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="font-body"
                  placeholder="Company or Organization Name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-sm font-medium mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                    Service Interest *
                  </label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai-ethics">AI Ethics & Governance</SelectItem>
                      <SelectItem value="strategic">Strategic Advisory</SelectItem>
                      <SelectItem value="leadership">Leadership Development</SelectItem>
                      <SelectItem value="transformation">Organizational Transformation</SelectItem>
                      <SelectItem value="board">Board Advisory</SelectItem>
                      <SelectItem value="multiple">Multiple Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                    Timeline
                  </label>
                  <Select
                    value={formData.timeline}
                    onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                  >
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (within 1 month)</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="6months">Within 6 Months</SelectItem>
                      <SelectItem value="planning">Planning Phase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                  Tell Us About Your Challenge *
                </label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="font-body min-h-[150px]"
                  placeholder="Describe the challenges you're facing and what you hope to achieve..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-sans text-sm font-semibold tracking-wide uppercase py-6"
                style={{ backgroundColor: "oklch(0.25 0.01 50)", color: "oklch(0.97 0.01 90)" }}
              >
                {isSubmitting ? "Sending..." : "Request Consultation"}
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
