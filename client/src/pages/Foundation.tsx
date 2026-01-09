/*
  DESIGN: Timeless Editorial Luxury
  Tudor Foundation Page: Philanthropy and mission-focused content
*/

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Globe, GraduationCap, Heart, Lightbulb, Users } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const pillars = [
  {
    icon: GraduationCap,
    title: "Education Access",
    description: "Expanding educational opportunities for underserved communities worldwide through scholarships, learning resources, and mentorship programs.",
    impact: "10,000+ students supported",
  },
  {
    icon: Lightbulb,
    title: "Ethical Technology",
    description: "Funding research and initiatives that ensure technology development serves humanity's best interests and promotes responsible innovation.",
    impact: "25+ research grants awarded",
  },
  {
    icon: Users,
    title: "Community Empowerment",
    description: "Supporting grassroots organizations that build sustainable, resilient communities through local leadership and collaborative action.",
    impact: "50+ communities reached",
  },
];

const initiatives = [
  {
    title: "Global Scholars Program",
    description: "Full scholarships for exceptional students from developing nations to attend world-class universities.",
    image: "/images/shc5ykBMbLUc.png",
  },
  {
    title: "AI Ethics Research Fund",
    description: "Grants supporting academic research on responsible AI development and governance frameworks.",
    image: "/images/kyARmzu3bAlx.png",
  },
  {
    title: "Community Leaders Initiative",
    description: "Training and resources for local leaders driving positive change in their communities.",
    image: "/images/hero-philanthropy.png",
  },
];

const stats = [
  { number: "$5M+", label: "Grants Awarded" },
  { number: "30+", label: "Countries Reached" },
  { number: "100+", label: "Partner Organizations" },
  { number: "50,000+", label: "Lives Impacted" },
];

export default function Foundation() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your interest! You'll receive updates about the Tudor Foundation.");
    setEmail("");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-philanthropy.png"
            alt="Tudor Foundation community work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0.65 0.05 145 / 0.85)" }} />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.99 0.005 90)" }}>
                The Tudor Foundation
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: "oklch(0.99 0.005 90)" }}>
                Knowledge in Service of Humanity
              </h1>
              <p className="font-body text-xl leading-relaxed" style={{ color: "oklch(0.99 0.005 90 / 0.9)" }}>
                Founded by Dakota Rea, the Tudor Foundation advances education, 
                ethical technology, and community empowerment to create lasting 
                positive change around the world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                Our Mission
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: "oklch(0.25 0.01 50)" }}>
                Building a More Equitable Future
              </h2>
              <p className="font-body text-lg leading-relaxed mb-6" style={{ color: "oklch(0.35 0.01 50)" }}>
                The Tudor Foundation was established on a simple premise: that knowledge, 
                when shared freely and applied thoughtfully, has the power to transform 
                lives and communities.
              </p>
              <p className="font-body text-lg leading-relaxed mb-6" style={{ color: "oklch(0.35 0.01 50)" }}>
                We believe that access to education should not be determined by geography 
                or circumstance, that technology should serve humanity's highest aspirations, 
                and that lasting change comes from empowering local leaders to solve local challenges.
              </p>
              <p className="font-body text-lg leading-relaxed" style={{ color: "oklch(0.35 0.01 50)" }}>
                Through strategic partnerships and carefully designed programs, we work to 
                make these beliefs a reality—one community, one student, one breakthrough at a time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <blockquote className="p-8" style={{ backgroundColor: "oklch(0.94 0.01 90)" }}>
                <p className="font-display text-xl md:text-2xl font-bold italic leading-relaxed mb-6" style={{ color: "oklch(0.25 0.01 50)" }}>
                  "True philanthropy is not about giving—it's about enabling. 
                  Our role is to provide the tools, resources, and opportunities 
                  that allow people to build their own futures."
                </p>
                <footer>
                  <p className="font-display text-base font-bold" style={{ color: "oklch(0.25 0.01 50)" }}>
                    Dakota Rea
                  </p>
                  <p className="font-sans text-sm" style={{ color: "oklch(0.55 0.01 50)" }}>
                    Founder, Tudor Foundation
                  </p>
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.25 0.01 50)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
              Our Focus
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.97 0.01 90)" }}>
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
                className="p-8 text-center"
                style={{ backgroundColor: "oklch(0.97 0.01 90)" }}
              >
                <pillar.icon className="mx-auto mb-6" size={48} style={{ color: "oklch(0.65 0.05 145)" }} />
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: "oklch(0.25 0.01 50)" }}>
                  {pillar.title}
                </h3>
                <p className="font-body text-base leading-relaxed mb-6" style={{ color: "oklch(0.45 0.01 50)" }}>
                  {pillar.description}
                </p>
                <p className="font-sans text-sm font-semibold tracking-wide uppercase" style={{ color: "oklch(0.62 0.12 45)" }}>
                  {pillar.impact}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.65 0.05 145)" }}>
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
                <p className="font-display text-3xl md:text-4xl font-bold mb-1" style={{ color: "oklch(0.99 0.005 90)" }}>
                  {stat.number}
                </p>
                <p className="font-sans text-xs tracking-wide uppercase" style={{ color: "oklch(0.99 0.005 90 / 0.8)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
              Our Work
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.25 0.01 50)" }}>
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
                <div className="aspect-[4/3] overflow-hidden mb-6">
                  <img
                    src={initiative.image}
                    alt={initiative.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: "oklch(0.25 0.01 50)" }}>
                  {initiative.title}
                </h3>
                <p className="font-body text-base leading-relaxed" style={{ color: "oklch(0.45 0.01 50)" }}>
                  {initiative.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.94 0.01 90)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                Get Involved
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: "oklch(0.25 0.01 50)" }}>
                Join Our Mission
              </h2>
              <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "oklch(0.35 0.01 50)" }}>
                There are many ways to support the Tudor Foundation's work. Whether 
                through financial contributions, volunteer expertise, or partnership 
                opportunities, your involvement helps us extend our reach and deepen our impact.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
                  <Heart className="flex-shrink-0 mt-1" size={24} style={{ color: "oklch(0.62 0.12 45)" }} />
                  <div>
                    <h4 className="font-display text-lg font-bold mb-1" style={{ color: "oklch(0.25 0.01 50)" }}>
                      Make a Donation
                    </h4>
                    <p className="font-body text-sm" style={{ color: "oklch(0.45 0.01 50)" }}>
                      100% of donations go directly to program funding.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
                  <Globe className="flex-shrink-0 mt-1" size={24} style={{ color: "oklch(0.62 0.12 45)" }} />
                  <div>
                    <h4 className="font-display text-lg font-bold mb-1" style={{ color: "oklch(0.25 0.01 50)" }}>
                      Partner With Us
                    </h4>
                    <p className="font-body text-sm" style={{ color: "oklch(0.45 0.01 50)" }}>
                      Organizations can amplify impact through strategic partnerships.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
                  <BookOpen className="flex-shrink-0 mt-1" size={24} style={{ color: "oklch(0.62 0.12 45)" }} />
                  <div>
                    <h4 className="font-display text-lg font-bold mb-1" style={{ color: "oklch(0.25 0.01 50)" }}>
                      Share Expertise
                    </h4>
                    <p className="font-body text-sm" style={{ color: "oklch(0.45 0.01 50)" }}>
                      Volunteer your skills to support our programs and scholars.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8"
              style={{ backgroundColor: "oklch(0.99 0.005 90)" }}
            >
              <h3 className="font-display text-xl font-bold mb-4" style={{ color: "oklch(0.25 0.01 50)" }}>
                Stay Connected
              </h3>
              <p className="font-body text-base mb-6" style={{ color: "oklch(0.45 0.01 50)" }}>
                Subscribe to receive updates on our initiatives, impact stories, 
                and opportunities to get involved.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="font-body"
                />
                <Button
                  type="submit"
                  className="w-full font-sans text-sm font-semibold tracking-wide uppercase"
                  style={{ backgroundColor: "oklch(0.65 0.05 145)", color: "oklch(0.99 0.005 90)" }}
                >
                  Subscribe to Updates
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </form>
              <p className="font-sans text-xs mt-4" style={{ color: "oklch(0.55 0.01 50)" }}>
                For partnership or donation inquiries, please contact us at{" "}
                <a href="mailto:foundation@dakotarea.com" className="underline">
                  foundation@dakotarea.com
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
