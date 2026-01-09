/*
  DESIGN: Bold Authority + Modern Sophistication
  Speaking Page: High-converting with booking form
*/

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle, Globe, Mic, Users, Play } from "lucide-react";
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
    description: "Navigating the moral landscape of artificial intelligence. Drawing on utilitarian philosophy and practical frameworks for ethical decision-making.",
    duration: "45-90 min",
  },
  {
    title: "Leadership in Uncertain Times",
    description: "How to lead with clarity and purpose when the path forward is unclear. Lessons from global experience and classical philosophy.",
    duration: "45-60 min",
  },
  {
    title: "The Future of Work & Human Flourishing",
    description: "Exploring how technology can enhance rather than diminish human potential. Creating organizations where people thrive.",
    duration: "45-90 min",
  },
  {
    title: "Global Perspectives on Innovation",
    description: "Insights from 60+ countries on creativity, problem-solving, and progress. What the world can teach us about building better futures.",
    duration: "45-60 min",
  },
  {
    title: "Generation Y & Market Dynamics",
    description: "Deep expertise on millennial behavior, preferences, and market dynamics. Understanding the largest generation in history.",
    duration: "45-60 min",
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
  {
    quote: "Dakota's global perspective and scholarly depth set him apart. Our audience was captivated from start to finish.",
    author: "Conference Director",
    role: "Global Innovation Summit",
  },
];

const stats = [
  { icon: Mic, number: "200+", label: "Speaking Events" },
  { icon: Users, number: "1000s", label: "Audience Members" },
  { icon: Globe, number: "60+", label: "Countries" },
  { icon: Calendar, number: "15+", label: "Years Experience" },
];

const eventTypes = [
  "Corporate Conference",
  "Industry Summit",
  "Executive Retreat",
  "University/Academic",
  "Workshop/Training",
  "Virtual Event",
  "Other",
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
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/speaking-stage.png"
            alt="Dakota Rea speaking at global conference"
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
                Keynote Speaking
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: "oklch(0.97 0.01 90)" }}>
                Ideas That Inspire{" "}
                <span style={{ color: "oklch(0.72 0.14 85)" }}>Action</span>
              </h1>
              <p className="font-body text-xl leading-relaxed mb-8" style={{ color: "oklch(0.97 0.01 90 / 0.85)" }}>
                From intimate executive retreats to stages of thousands, Dakota delivers 
                transformative talks that challenge assumptions and catalyze change.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#booking">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary"
                  >
                    Book Dakota Now
                    <ArrowRight size={16} />
                  </motion.span>
                </a>
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-white flex items-center gap-2"
                >
                  <Play size={16} />
                  Watch Speaking Reel
                </motion.span>
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
                <stat.icon className="mx-auto mb-3" size={28} style={{ color: "oklch(0.72 0.14 85)" }} />
                <p className="stat-number mb-1">{stat.number}</p>
                <p className="font-heading text-sm tracking-wide uppercase" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Signature Topics</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "oklch(0.15 0.03 250)" }}>
              What Dakota Speaks About
            </h2>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "oklch(0.45 0.02 250)" }}>
              Each presentation is customized to your audience and objectives. 
              These signature topics can be adapted or combined as needed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {speakingTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white card-hover"
                style={{ border: "1px solid oklch(0.90 0.01 90)" }}
              >
                <div className="flex justify-between items-start mb-4">
                  <Mic size={24} style={{ color: "oklch(0.72 0.14 85)" }} />
                  <span className="font-heading text-xs px-3 py-1" style={{ backgroundColor: "oklch(0.97 0.01 90)", color: "oklch(0.45 0.02 250)" }}>
                    {topic.duration}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: "oklch(0.15 0.03 250)" }}>
                  {topic.title}
                </h3>
                <p className="font-body text-base" style={{ color: "oklch(0.45 0.02 250)" }}>
                  {topic.description}
                </p>
              </motion.div>
            ))}
          </div>
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
            <p className="section-label mb-4">Testimonials</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>
              What People Say
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
                className="testimonial-card"
              >
                <p className="font-body text-lg leading-relaxed mb-6 relative z-10" style={{ color: "oklch(0.25 0.02 250)" }}>
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-display text-lg font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>
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

      {/* What You Get */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-label mb-4">What's Included</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8" style={{ color: "oklch(0.15 0.03 250)" }}>
                More Than Just a Speech
              </h2>
              
              <div className="space-y-4">
                {[
                  "Pre-event consultation to customize content",
                  "Professional presentation materials",
                  "Q&A session with audience",
                  "Post-event follow-up resources",
                  "Social media promotion support",
                  "Recording rights (upon request)",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <CheckCircle size={20} style={{ color: "oklch(0.72 0.14 85)", flexShrink: 0 }} />
                    <p className="font-body text-lg" style={{ color: "oklch(0.35 0.02 250)" }}>
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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

      {/* Booking Form */}
      <section id="booking" className="py-24" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="section-label mb-4" style={{ color: "oklch(0.72 0.14 85)" }}>Book Dakota</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "oklch(0.97 0.01 90)" }}>
                Request a Speaking Engagement
              </h2>
              <p className="font-body text-lg" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                Fill out the form below and we'll get back to you within 48 hours.
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
                    className="form-input"
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
                    className="form-input"
                    style={{ backgroundColor: "oklch(0.22 0.03 250)", borderColor: "oklch(0.30 0.02 250)", color: "oklch(0.97 0.01 90)" }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-heading text-sm font-medium mb-2" style={{ color: "oklch(0.97 0.01 90)" }}>
                    Organization *
                  </label>
                  <Input
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    required
                    className="form-input"
                    style={{ backgroundColor: "oklch(0.22 0.03 250)", borderColor: "oklch(0.30 0.02 250)", color: "oklch(0.97 0.01 90)" }}
                  />
                </div>
                <div>
                  <label className="block font-heading text-sm font-medium mb-2" style={{ color: "oklch(0.97 0.01 90)" }}>
                    Event Type *
                  </label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                  >
                    <SelectTrigger style={{ backgroundColor: "oklch(0.22 0.03 250)", borderColor: "oklch(0.30 0.02 250)", color: "oklch(0.97 0.01 90)" }}>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-heading text-sm font-medium mb-2" style={{ color: "oklch(0.97 0.01 90)" }}>
                    Event Date
                  </label>
                  <Input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="form-input"
                    style={{ backgroundColor: "oklch(0.22 0.03 250)", borderColor: "oklch(0.30 0.02 250)", color: "oklch(0.97 0.01 90)" }}
                  />
                </div>
                <div>
                  <label className="block font-heading text-sm font-medium mb-2" style={{ color: "oklch(0.97 0.01 90)" }}>
                    Expected Audience Size
                  </label>
                  <Input
                    value={formData.audienceSize}
                    onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })}
                    placeholder="e.g., 100-500"
                    className="form-input"
                    style={{ backgroundColor: "oklch(0.22 0.03 250)", borderColor: "oklch(0.30 0.02 250)", color: "oklch(0.97 0.01 90)" }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-heading text-sm font-medium mb-2" style={{ color: "oklch(0.97 0.01 90)" }}>
                  Message
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  placeholder="Tell us about your event and what you're looking for..."
                  className="form-input"
                  style={{ backgroundColor: "oklch(0.22 0.03 250)", borderColor: "oklch(0.30 0.02 250)", color: "oklch(0.97 0.01 90)" }}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary"
              >
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
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
