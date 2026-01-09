/*
  DESIGN: Timeless Editorial Luxury
  Speaking Page: Showcase speaking topics, testimonials, and booking form
*/

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle, Globe, Mic, Users } from "lucide-react";
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

const speakingTopics = [
  {
    title: "AI Ethics & Responsible Innovation",
    description: "Navigating the moral landscape of artificial intelligence, from algorithmic bias to autonomous systems. Drawing on utilitarian philosophy and practical frameworks for ethical decision-making.",
    duration: "45-90 minutes",
  },
  {
    title: "Leadership in Uncertain Times",
    description: "How to lead with clarity and purpose when the path forward is unclear. Lessons from global experience and classical philosophy for modern leaders.",
    duration: "45-60 minutes",
  },
  {
    title: "The Future of Work & Human Flourishing",
    description: "Exploring how technology can enhance rather than diminish human potential. Creating organizations where people thrive alongside intelligent systems.",
    duration: "45-90 minutes",
  },
  {
    title: "Global Perspectives on Innovation",
    description: "Insights from 60+ countries on how different cultures approach creativity, problem-solving, and progress. What the world can teach us about building better futures.",
    duration: "45-60 minutes",
  },
  {
    title: "Philanthropy & Purpose-Driven Leadership",
    description: "Building organizations and initiatives that create lasting positive impact. The intersection of business success and social responsibility.",
    duration: "30-45 minutes",
  },
];

const testimonials = [
  {
    quote: "Dakota's presentation on AI ethics was transformative for our leadership team. He has a rare ability to make complex philosophical concepts accessible and actionable.",
    author: "Sarah Chen",
    role: "CEO, TechForward Inc.",
  },
  {
    quote: "One of the most thought-provoking speakers we've ever hosted. Dakota challenged our assumptions while providing practical frameworks we could implement immediately.",
    author: "Michael Rodriguez",
    role: "Conference Director, Global Innovation Summit",
  },
  {
    quote: "Dakota's global perspective and scholarly depth set him apart. Our audience of 3,000+ was captivated from start to finish.",
    author: "Dr. Emma Thompson",
    role: "Dean, Oxford Business School",
  },
];

const stats = [
  { icon: Mic, number: "200+", label: "Speaking Events" },
  { icon: Users, number: "100,000+", label: "Audience Members" },
  { icon: Globe, number: "40+", label: "Countries" },
  { icon: Calendar, number: "15+", label: "Years Experience" },
];

export default function Speaking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    eventType: "",
    eventDate: "",
    audienceSize: "",
    topic: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Thank you for your inquiry! We'll be in touch within 48 hours.");
    setFormData({
      name: "",
      email: "",
      organization: "",
      eventType: "",
      eventDate: "",
      audienceSize: "",
      topic: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-speaking.png"
            alt="Dakota Rea speaking at conference"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0.25 0.01 50 / 0.8)" }} />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                Keynote Speaking
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: "oklch(0.97 0.01 90)" }}>
                Ideas That Inspire Action
              </h1>
              <p className="font-body text-xl leading-relaxed" style={{ color: "oklch(0.97 0.01 90 / 0.85)" }}>
                From intimate executive retreats to stages of thousands, Dakota delivers 
                transformative talks that challenge assumptions and catalyze change.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.25 0.01 50)" }}>
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
                <stat.icon className="mx-auto mb-3" size={24} style={{ color: "oklch(0.62 0.12 45)" }} />
                <p className="font-display text-3xl md:text-4xl font-bold mb-1" style={{ color: "oklch(0.97 0.01 90)" }}>
                  {stat.number}
                </p>
                <p className="font-sans text-xs tracking-wide uppercase" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
              Signature Topics
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "oklch(0.25 0.01 50)" }}>
              What Dakota Speaks About
            </h2>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "oklch(0.45 0.01 50)" }}>
              Each presentation is customized to your audience and objectives. 
              These signature topics can be adapted or combined as needed.
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {speakingTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 border transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: "oklch(0.88 0.01 90)", backgroundColor: "oklch(0.99 0.005 90)" }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-display text-xl md:text-2xl font-bold mb-3" style={{ color: "oklch(0.25 0.01 50)" }}>
                      {topic.title}
                    </h3>
                    <p className="font-body text-base leading-relaxed" style={{ color: "oklch(0.45 0.01 50)" }}>
                      {topic.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="font-sans text-sm px-4 py-2 rounded-full" style={{ backgroundColor: "oklch(0.94 0.01 90)", color: "oklch(0.45 0.01 50)" }}>
                      {topic.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.94 0.01 90)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
              Testimonials
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.25 0.01 50)" }}>
              What Event Organizers Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8"
                style={{ backgroundColor: "oklch(0.99 0.005 90)" }}
              >
                <blockquote>
                  <p className="font-body text-base leading-relaxed italic mb-6" style={{ color: "oklch(0.35 0.01 50)" }}>
                    "{testimonial.quote}"
                  </p>
                  <footer>
                    <p className="font-display text-base font-bold" style={{ color: "oklch(0.25 0.01 50)" }}>
                      {testimonial.author}
                    </p>
                    <p className="font-sans text-sm" style={{ color: "oklch(0.55 0.01 50)" }}>
                      {testimonial.role}
                    </p>
                  </footer>
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                The Experience
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: "oklch(0.25 0.01 50)" }}>
                What's Included
              </h2>
              <ul className="space-y-4">
                {[
                  "Pre-event consultation to customize content",
                  "Professional presentation materials",
                  "Q&A session with audience",
                  "Post-event resources for attendees",
                  "Optional workshop or breakout session",
                  "Meet-and-greet with key stakeholders",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="flex-shrink-0 mt-1" size={20} style={{ color: "oklch(0.65 0.05 145)" }} />
                    <span className="font-body text-base" style={{ color: "oklch(0.35 0.01 50)" }}>
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-[4/3] overflow-hidden"
            >
              <img
                src="/images/N8chuDbjz5B8.png"
                alt="Speaking engagement"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.25 0.01 50)" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                Book Dakota
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "oklch(0.97 0.01 90)" }}>
                Request a Speaking Engagement
              </h2>
              <p className="font-body text-lg" style={{ color: "oklch(0.97 0.01 90 / 0.8)" }}>
                Fill out the form below and our team will respond within 48 hours.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="space-y-6 p-8"
              style={{ backgroundColor: "oklch(0.97 0.01 90)" }}
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
                    Event Type *
                  </label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                  >
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conference">Conference Keynote</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="virtual">Virtual Event</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                    Preferred Date
                  </label>
                  <Input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="font-body"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-sm font-medium mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                    Expected Audience Size
                  </label>
                  <Select
                    value={formData.audienceSize}
                    onValueChange={(value) => setFormData({ ...formData, audienceSize: value })}
                  >
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Under 100</SelectItem>
                      <SelectItem value="medium">100-500</SelectItem>
                      <SelectItem value="large">500-1000</SelectItem>
                      <SelectItem value="xlarge">1000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                    Topic of Interest
                  </label>
                  <Select
                    value={formData.topic}
                    onValueChange={(value) => setFormData({ ...formData, topic: value })}
                  >
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai-ethics">AI Ethics</SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                      <SelectItem value="future-work">Future of Work</SelectItem>
                      <SelectItem value="global">Global Perspectives</SelectItem>
                      <SelectItem value="philanthropy">Philanthropy</SelectItem>
                      <SelectItem value="custom">Custom Topic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                  Additional Details
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="font-body min-h-[120px]"
                  placeholder="Tell us more about your event, audience, and what you hope to achieve..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-sans text-sm font-semibold tracking-wide uppercase py-6"
                style={{ backgroundColor: "oklch(0.25 0.01 50)", color: "oklch(0.97 0.01 90)" }}
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
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
