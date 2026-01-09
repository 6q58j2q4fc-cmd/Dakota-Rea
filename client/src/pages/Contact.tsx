/*
  DESIGN: Timeless Editorial Luxury
  Contact Page: Clean contact form with multiple inquiry types
*/

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
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

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@dakotarea.com",
    href: "mailto:contact@dakotarea.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Boston, Massachusetts",
    href: null,
  },
];

const inquiryTypes = [
  { value: "speaking", label: "Speaking Engagement" },
  { value: "consulting", label: "Consulting Inquiry" },
  { value: "media", label: "Media / Press" },
  { value: "foundation", label: "Tudor Foundation" },
  { value: "books", label: "Books / Publishing" },
  { value: "other", label: "Other" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Thank you for your message! We'll respond within 48 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      subject: "",
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
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                Get in Touch
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: "oklch(0.25 0.01 50)" }}>
                Let's Start a Conversation
              </h1>
              <p className="font-body text-xl leading-relaxed" style={{ color: "oklch(0.35 0.01 50)" }}>
                Whether you're interested in speaking engagements, consulting services, 
                or exploring collaboration opportunities, I'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24 md:pb-32">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h2 className="font-display text-2xl font-bold mb-8" style={{ color: "oklch(0.25 0.01 50)" }}>
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div 
                      className="p-3 rounded-full"
                      style={{ backgroundColor: "oklch(0.94 0.01 90)" }}
                    >
                      <info.icon size={20} style={{ color: "oklch(0.62 0.12 45)" }} />
                    </div>
                    <div>
                      <p className="font-sans text-sm font-medium tracking-wide uppercase mb-1" style={{ color: "oklch(0.55 0.01 50)" }}>
                        {info.title}
                      </p>
                      {info.href ? (
                        <a 
                          href={info.href}
                          className="font-body text-base transition-colors hover:text-terracotta"
                          style={{ color: "oklch(0.25 0.01 50)" }}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-body text-base" style={{ color: "oklch(0.25 0.01 50)" }}>
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6" style={{ backgroundColor: "oklch(0.94 0.01 90)" }}>
                <h3 className="font-display text-lg font-bold mb-3" style={{ color: "oklch(0.25 0.01 50)" }}>
                  Response Time
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "oklch(0.45 0.01 50)" }}>
                  We typically respond to all inquiries within 48 business hours. 
                  For urgent speaking requests, please indicate the date in your message.
                </p>
              </div>

              <div className="mt-6 p-6" style={{ backgroundColor: "oklch(0.94 0.01 90)" }}>
                <h3 className="font-display text-lg font-bold mb-3" style={{ color: "oklch(0.25 0.01 50)" }}>
                  Press & Media
                </h3>
                <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "oklch(0.45 0.01 50)" }}>
                  For press inquiries, interview requests, or media kit access, 
                  please select "Media / Press" in the form or email directly.
                </p>
                <a 
                  href="mailto:press@dakotarea.com"
                  className="font-sans text-sm font-medium transition-colors hover:text-terracotta"
                  style={{ color: "oklch(0.62 0.12 45)" }}
                >
                  press@dakotarea.com
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <form
                onSubmit={handleSubmit}
                className="p-8 border"
                style={{ borderColor: "oklch(0.88 0.01 90)", backgroundColor: "oklch(0.99 0.005 90)" }}
              >
                <h2 className="font-display text-2xl font-bold mb-8" style={{ color: "oklch(0.25 0.01 50)" }}>
                  Send a Message
                </h2>

                <div className="space-y-6">
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

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-sans text-sm font-medium mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="font-body"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-sm font-medium mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                        Inquiry Type *
                      </label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                      >
                        <SelectTrigger className="font-body">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-sm font-medium mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                      Subject *
                    </label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="font-body"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-sm font-medium mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                      Message *
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="font-body min-h-[180px]"
                      placeholder="Please provide details about your inquiry, including any relevant dates, context, or specific questions..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-sans text-sm font-semibold tracking-wide uppercase py-6"
                    style={{ backgroundColor: "oklch(0.25 0.01 50)", color: "oklch(0.97 0.01 90)" }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.94 0.01 90)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
              Common Questions
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: "oklch(0.25 0.01 50)" }}>
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is Dakota's speaking fee?",
                answer: "Speaking fees vary based on event type, duration, and location. Please submit an inquiry with your event details for a customized quote.",
              },
              {
                question: "How far in advance should I book?",
                answer: "We recommend reaching out at least 3-6 months in advance for keynote engagements. However, we do our best to accommodate shorter timelines when possible.",
              },
              {
                question: "Does Dakota speak at virtual events?",
                answer: "Yes, Dakota regularly delivers virtual keynotes and webinars. Virtual engagements can be customized to include live Q&A, breakout sessions, and interactive elements.",
              },
              {
                question: "What consulting engagements does Dakota accept?",
                answer: "Dakota works with organizations on AI ethics, strategic advisory, leadership development, and organizational transformation. Initial consultations help determine fit and scope.",
              },
              {
                question: "How can I support the Tudor Foundation?",
                answer: "Visit the Tudor Foundation page to learn about donation opportunities, partnership possibilities, and volunteer programs.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6"
                style={{ backgroundColor: "oklch(0.99 0.005 90)" }}
              >
                <h3 className="font-display text-lg font-bold mb-3" style={{ color: "oklch(0.25 0.01 50)" }}>
                  {faq.question}
                </h3>
                <p className="font-body text-base leading-relaxed" style={{ color: "oklch(0.45 0.01 50)" }}>
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
