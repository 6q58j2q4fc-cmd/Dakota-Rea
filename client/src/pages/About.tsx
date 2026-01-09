/*
  DESIGN: Timeless Editorial Luxury
  About Page: Long-form editorial biography with magazine-style layouts
*/

import { motion } from "framer-motion";
import { Award, BookOpen, Globe, GraduationCap, Heart, Lightbulb } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const timeline = [
  {
    year: "Education",
    title: "Harvard University",
    description: "Graduated with honors, later returning as an alumni researcher focusing on AI ethics and utilitarian philosophy.",
  },
  {
    year: "Scholarship",
    title: "Oxford University",
    description: "Jeremy Bentham Scholar, conducting groundbreaking research on the application of classical utilitarian principles to modern technology governance.",
  },
  {
    year: "Certification",
    title: "MIT & Wharton",
    description: "Advanced certifications in AI ethics from MIT and executive leadership from the Wharton School of Business.",
  },
  {
    year: "Foundation",
    title: "Tudor Foundation",
    description: "Founded the Tudor Foundation to advance education, ethical technology, and community empowerment globally.",
  },
];

const expertise = [
  {
    icon: Lightbulb,
    title: "AI Ethics & Governance",
    description: "Leading research on responsible AI development, drawing from classical philosophy to create modern ethical frameworks.",
  },
  {
    icon: Globe,
    title: "Global Leadership",
    description: "Experience across 60+ countries, understanding diverse perspectives on technology, culture, and human progress.",
  },
  {
    icon: BookOpen,
    title: "Scholarly Research",
    description: "Published works bridging philosophy, technology, and practical wisdom for leaders and changemakers.",
  },
  {
    icon: Heart,
    title: "Philanthropy",
    description: "Dedicated to creating positive global impact through the Tudor Foundation's education and empowerment initiatives.",
  },
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    description: "Harvard and Oxford educated with certifications from MIT and Wharton, bringing rigorous analytical thinking to every challenge.",
  },
  {
    icon: Award,
    title: "Thought Leadership",
    description: "Recognized speaker and consultant helping organizations navigate the intersection of innovation and ethics.",
  },
];

export default function About() {
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
                About Dakota Rea
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: "oklch(0.25 0.01 50)" }}>
                A Life Dedicated to Ideas That Matter
              </h1>
              <p className="font-body text-xl leading-relaxed" style={{ color: "oklch(0.35 0.01 50)" }}>
                Entrepreneur, inventor, philanthropist, and scholar—Dakota Rea has spent 
                decades exploring the questions that define our future.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portrait & Introduction */}
      <section className="pb-24 md:pb-32">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="/images/hero-portrait.png"
                    alt="Dakota Rea portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div 
                  className="absolute -bottom-4 -right-4 w-full h-full border pointer-events-none"
                  style={{ borderColor: "oklch(0.62 0.12 45 / 0.3)" }}
                />
              </div>
            </motion.div>

            {/* Bio Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3 flex flex-col justify-center"
            >
              <div className="prose prose-lg max-w-none">
                <p className="font-body text-lg leading-relaxed mb-6" style={{ color: "oklch(0.35 0.01 50)" }}>
                  Dakota Rea's journey began with a simple question: How can we ensure that 
                  progress serves humanity? This inquiry has guided a career spanning 
                  entrepreneurship, academic research, and global philanthropy.
                </p>
                <p className="font-body text-lg leading-relaxed mb-6" style={{ color: "oklch(0.35 0.01 50)" }}>
                  As a graduate of Harvard University and a Jeremy Bentham Scholar at Oxford, 
                  Dakota brings rigorous philosophical training to contemporary challenges. 
                  His research on AI ethics—further refined through certifications at MIT 
                  and the Wharton School—has influenced how organizations worldwide approach 
                  responsible innovation.
                </p>
                <p className="font-body text-lg leading-relaxed mb-6" style={{ color: "oklch(0.35 0.01 50)" }}>
                  Having traveled to more than 60 countries and addressed audiences numbering 
                  in the thousands, Dakota understands that wisdom emerges from diverse 
                  perspectives. Each conversation, each culture, each challenge has shaped 
                  his approach to leadership and change.
                </p>
                <p className="font-body text-lg leading-relaxed" style={{ color: "oklch(0.35 0.01 50)" }}>
                  Through the Tudor Foundation, Dakota channels his expertise into tangible 
                  impact—supporting education initiatives, ethical technology development, 
                  and community empowerment programs that create lasting change.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.25 0.01 50)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <blockquote>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed italic mb-8" style={{ color: "oklch(0.97 0.01 90)" }}>
                "The measure of our progress is not the technology we create, 
                but the humanity we preserve in creating it."
              </p>
              <cite className="font-sans text-sm tracking-widest uppercase not-italic" style={{ color: "oklch(0.62 0.12 45)" }}>
                — Dakota Rea
              </cite>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
              The Journey
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.25 0.01 50)" }}>
              Milestones & Achievements
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-12 border-l last:pb-0"
                style={{ borderColor: "oklch(0.88 0.01 90)" }}
              >
                {/* Timeline dot */}
                <div 
                  className="absolute left-0 top-0 w-3 h-3 rounded-full -translate-x-1/2"
                  style={{ backgroundColor: "oklch(0.62 0.12 45)" }}
                />
                <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "oklch(0.62 0.12 45)" }}>
                  {item.year}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                  {item.title}
                </h3>
                <p className="font-body text-base leading-relaxed" style={{ color: "oklch(0.45 0.01 50)" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.94 0.01 90)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
              Areas of Expertise
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.25 0.01 50)" }}>
              What I Bring to the Table
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: "oklch(0.99 0.005 90)" }}
              >
                <item.icon className="mb-4" size={32} style={{ color: "oklch(0.62 0.12 45)" }} />
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: "oklch(0.25 0.01 50)" }}>
                  {item.title}
                </h3>
                <p className="font-body text-base leading-relaxed" style={{ color: "oklch(0.45 0.01 50)" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Image Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="aspect-[4/3] overflow-hidden"
            >
              <img
                src="/images/hero-global.png"
                alt="Dakota Rea's global travels"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="aspect-[4/3] overflow-hidden"
            >
              <img
                src="/images/hero-speaking.png"
                alt="Dakota Rea speaking"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
