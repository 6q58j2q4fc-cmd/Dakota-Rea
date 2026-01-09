/*
  DESIGN: Bold Authority + Modern Sophistication
  Contact Page: High-converting with clear CTAs
*/

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Calendar, MessageSquare, Linkedin, Twitter } from "lucide-react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const inquiryTypes = [
  "Speaking Engagement",
  "Consulting Inquiry",
  "Media/Press",
  "Partnership Opportunity",
  "Book Order/Bulk Purchase",
  "Tudor Foundation",
  "General Inquiry",
];

const faqs = [
  {
    question: "What is your typical response time?",
    answer: "I aim to respond to all inquiries within 24-48 business hours. For urgent matters, please indicate this in your message.",
  },
  {
    question: "Do you offer virtual speaking engagements?",
    answer: "Yes, I offer both in-person and virtual keynotes, workshops, and webinars. Virtual events can be customized for global audiences across time zones.",
  },
  {
    question: "What are your consulting rates?",
    answer: "Consulting engagements are customized based on scope, duration, and complexity. I offer everything from single strategy sessions to ongoing advisory relationships. Let's discuss your needs to determine the best approach.",
  },
  {
    question: "Can I book you for international events?",
    answer: "Absolutely. With experience speaking in 60+ countries, I'm comfortable with international engagements and can accommodate various time zones and cultural contexts.",
  },
  {
    question: "Do you offer bulk book discounts?",
    answer: "Yes, volume discounts are available for orders of 25+ copies. Bulk orders can include custom bookplates and optional Q&A sessions. Contact me for details.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Thank you for your message! I'll be in touch within 24-48 hours.");
    setFormData({ name: "", email: "", inquiryType: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="section-label mb-4">Get in Touch</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6" style={{ color: "oklch(0.15 0.03 250)" }}>
                Let's Start a <span className="gradient-text">Conversation</span>
              </h1>
              <p className="font-body text-lg md:text-xl leading-relaxed" style={{ color: "oklch(0.35 0.02 250)" }}>
                Whether you're interested in speaking engagements, consulting, 
                or collaboration opportunities, I'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-white text-center card-hover"
              style={{ border: "1px solid oklch(0.90 0.01 90)" }}
            >
              <Mail size={32} className="mx-auto mb-4" style={{ color: "oklch(0.72 0.14 85)" }} />
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                Email
              </h3>
              <p className="font-body text-base" style={{ color: "oklch(0.45 0.02 250)" }}>
                contact@dakotarea.com
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-white text-center card-hover"
              style={{ border: "1px solid oklch(0.90 0.01 90)" }}
            >
              <MapPin size={32} className="mx-auto mb-4" style={{ color: "oklch(0.72 0.14 85)" }} />
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                Location
              </h3>
              <p className="font-body text-base" style={{ color: "oklch(0.45 0.02 250)" }}>
                London, United Kingdom
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-white text-center card-hover"
              style={{ border: "1px solid oklch(0.90 0.01 90)" }}
            >
              <Calendar size={32} className="mx-auto mb-4" style={{ color: "oklch(0.72 0.14 85)" }} />
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                Response Time
              </h3>
              <p className="font-body text-base" style={{ color: "oklch(0.45 0.02 250)" }}>
                Within 24-48 hours
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-label mb-4">Send a Message</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: "oklch(0.15 0.03 250)" }}>
                How Can I Help?
              </h2>
              <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "oklch(0.45 0.02 250)" }}>
                Fill out the form below with details about your inquiry. The more 
                information you provide, the better I can prepare a thoughtful response.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-heading text-sm font-medium mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                      Your Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-sm font-medium mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-heading text-sm font-medium mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                    Inquiry Type *
                  </label>
                  <Select
                    value={formData.inquiryType}
                    onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      {inquiryTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block font-heading text-sm font-medium mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                    Subject *
                  </label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block font-heading text-sm font-medium mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                    Message *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowRight size={16} />
                </Button>
              </form>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-label mb-4">FAQ</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8" style={{ color: "oklch(0.15 0.03 250)" }}>
                Common Questions
              </h2>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-white px-6"
                    style={{ border: "1px solid oklch(0.90 0.01 90)" }}
                  >
                    <AccordionTrigger className="font-display text-lg font-semibold text-left py-6" style={{ color: "oklch(0.15 0.03 250)" }}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-base pb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Social Links */}
              <div className="mt-12 p-8" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
                <h3 className="font-display text-xl font-bold mb-4" style={{ color: "oklch(0.15 0.03 250)" }}>
                  Connect on Social
                </h3>
                <div className="flex gap-4">
                  <a 
                    href="https://linkedin.com/in/dakotarea" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center transition-colors"
                    style={{ backgroundColor: "oklch(0.15 0.03 250)" }}
                  >
                    <Linkedin size={20} style={{ color: "oklch(0.97 0.01 90)" }} />
                  </a>
                  <a 
                    href="https://twitter.com/dakotarea" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center transition-colors"
                    style={{ backgroundColor: "oklch(0.15 0.03 250)" }}
                  >
                    <Twitter size={20} style={{ color: "oklch(0.97 0.01 90)" }} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MessageSquare size={48} className="mx-auto mb-6" style={{ color: "oklch(0.72 0.14 85)" }} />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "oklch(0.97 0.01 90)" }}>
                Prefer a Direct Conversation?
              </h2>
              <p className="font-body text-lg mb-8" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                For speaking and consulting inquiries, you can also schedule a 
                complimentary discovery call to discuss your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/speaking#booking">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary"
                  >
                    Book Speaking
                    <ArrowRight size={16} />
                  </motion.span>
                </a>
                <a href="/consulting#contact">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-white"
                  >
                    Schedule Consulting Call
                  </motion.span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
