/*
  DESIGN: Bold Authority + Modern Sophistication
  About Page: Comprehensive biography with timeline and expertise
*/

import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Award, Building, GraduationCap, Globe, BookOpen, Users, Heart, Lightbulb } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const timeline = [
  {
    year: "2025",
    title: "Jeremy Bentham Scholar",
    description: "Selected as Jeremy Bentham Scholar at University of Oxford, conducting research on utilitarian philosophy and AI ethics.",
    icon: Award,
  },
  {
    year: "2024",
    title: "UK Solicitor Trainee at Slaughter and May",
    description: "Joined one of the world's most prestigious law firms as a trainee, tutored by a member of the Oxford Faculty of Law.",
    icon: Building,
  },
  {
    year: "2023",
    title: "AI Ethics Research at Harvard",
    description: "Conducted groundbreaking research on responsible AI development and ethical frameworks.",
    icon: GraduationCap,
  },
  {
    year: "2022",
    title: "MIT & Wharton Certifications",
    description: "Completed advanced certifications in AI ethics from MIT and Aresty Institute at Wharton.",
    icon: Award,
  },
  {
    year: "2020",
    title: "Founded Tudor Foundation",
    description: "Established the Tudor Foundation to preserve England's Tudor heritage and support historical research.",
    icon: Building,
  },
  {
    year: "2018",
    title: "Harvard Business School",
    description: "Graduated from Harvard Business School, focusing on entrepreneurship and innovation.",
    icon: GraduationCap,
  },
];

const expertise = [
  {
    title: "AI Ethics & Responsible Innovation",
    description: "Leading research on ethical frameworks for artificial intelligence, ensuring technology serves humanity's best interests.",
    icon: Lightbulb,
  },
  {
    title: "Generation Y Insights",
    description: "Recognized expert on millennial behavior, preferences, and market dynamics. Author of influential works on Gen Y.",
    icon: Users,
  },
  {
    title: "Corporate Law & Strategy",
    description: "UK Solicitor Trainee at Slaughter and May, tutored by a member of the Oxford Faculty of Law, with expertise in corporate transactions and commercial strategy.",
    icon: Building,
  },
  {
    title: "Global Leadership",
    description: "Traveled to 60+ countries, speaking to audiences of thousands on innovation, ethics, and leadership.",
    icon: Globe,
  },
  {
    title: "Scholarly Research",
    description: "Published works bridging philosophy, technology, and practical wisdom for leaders and changemakers.",
    icon: BookOpen,
  },
  {
    title: "Philanthropy",
    description: "Dedicated to creating positive global impact through the Tudor Foundation's heritage preservation initiatives.",
    icon: Heart,
  },
];

export default function About() {
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
              <p className="section-label mb-4">About Dakota</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6" style={{ color: "oklch(0.15 0.03 250)" }}>
                Scholar. Entrepreneur.{" "}
                <span className="gradient-text">Visionary.</span>
              </h1>
              <p className="font-body text-lg md:text-xl leading-relaxed mb-6" style={{ color: "oklch(0.35 0.02 250)" }}>
                Dakota Rea is a multifaceted professional whose career spans law, academia, 
                entrepreneurship, and philanthropy. With degrees from Harvard and Oxford, 
                certifications from MIT and Wharton, and experience across 60+ countries, 
                Dakota brings a truly global perspective to every endeavor.
              </p>
              <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "oklch(0.35 0.02 250)" }}>
                Currently serving as a UK Solicitor Trainee at Slaughter and May—one of the world's 
                most prestigious law firms—and tutored by a member of the Oxford Faculty of Law, Dakota continues to bridge the worlds of law, 
                technology, and ethics while advancing research on AI's impact on society.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/consulting">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary"
                  >
                    Work With Dakota
                    <ArrowRight size={16} />
                  </motion.span>
                </Link>
                <Link href="/speaking">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-secondary"
                  >
                    Book Speaking
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div 
                  className="absolute -top-4 -left-4 w-full h-full"
                  style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.1)" }}
                />
                <img
                  src="/images/dakota-rea-portrait.jpg"
                  alt="Dakota Rea - Portrait"
                  className="relative z-10 w-full h-auto object-cover shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <MapPin className="mx-auto mb-3" size={24} style={{ color: "oklch(0.72 0.14 85)" }} />
              <p className="font-display text-2xl font-bold mb-1" style={{ color: "oklch(0.97 0.01 90)" }}>London</p>
              <p className="font-body text-sm" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>Based in UK</p>
            </div>
            <div className="text-center">
              <Globe className="mx-auto mb-3" size={24} style={{ color: "oklch(0.72 0.14 85)" }} />
              <p className="font-display text-2xl font-bold mb-1" style={{ color: "oklch(0.97 0.01 90)" }}>60+</p>
              <p className="font-body text-sm" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>Countries Visited</p>
            </div>
            <div className="text-center">
              <GraduationCap className="mx-auto mb-3" size={24} style={{ color: "oklch(0.72 0.14 85)" }} />
              <p className="font-display text-2xl font-bold mb-1" style={{ color: "oklch(0.97 0.01 90)" }}>4</p>
              <p className="font-body text-sm" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>Elite Institutions</p>
            </div>
            <div className="text-center">
              <Users className="mx-auto mb-3" size={24} style={{ color: "oklch(0.72 0.14 85)" }} />
              <p className="font-display text-2xl font-bold mb-1" style={{ color: "oklch(0.97 0.01 90)" }}>1000s</p>
              <p className="font-body text-sm" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>Audience Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-label mb-4">Biography</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8" style={{ color: "oklch(0.15 0.03 250)" }}>
                A Journey of Purpose
              </h2>
              
              <div className="prose prose-lg max-w-none space-y-6">
                <p className="font-body text-lg leading-relaxed" style={{ color: "oklch(0.35 0.02 250)" }}>
                  Dakota Rea's journey began with an insatiable curiosity about how technology 
                  and ethics intersect in shaping human society. This curiosity led to an 
                  academic path that would take him through some of the world's most prestigious 
                  institutions—Harvard Business School, the University of Oxford, MIT, and the 
                  Wharton School.
                </p>
                
                <p className="font-body text-lg leading-relaxed" style={{ color: "oklch(0.35 0.02 250)" }}>
                  At Oxford, Dakota's research focuses on the philosophy of Jeremy Bentham, 
                  particularly as it applies to modern ethical dilemmas in artificial intelligence. 
                  As a Jeremy Bentham Scholar, he explores how utilitarian principles can guide 
                  the development of AI systems that maximize benefit while minimizing harm.
                </p>
                
                <p className="font-body text-lg leading-relaxed" style={{ color: "oklch(0.35 0.02 250)" }}>
                  Beyond academia, Dakota has built a reputation as a leading voice on Generation Y 
                  and millennial market dynamics. His insights have been sought by Fortune 500 
                  companies and startups alike, helping organizations understand and engage with 
                  the largest generation in history.
                </p>
                
                <p className="font-body text-lg leading-relaxed" style={{ color: "oklch(0.35 0.02 250)" }}>
                  As founder of the Tudor Foundation, Dakota channels his passion for history 
                  and heritage preservation into meaningful action. The foundation works to 
                  conserve Tudor architectural landmarks, support academic research, and make 
                  England's rich Tudor history accessible to future generations.
                </p>
                
                <p className="font-body text-lg leading-relaxed" style={{ color: "oklch(0.35 0.02 250)" }}>
                  Today, Dakota serves as a UK Solicitor Trainee at Slaughter and May, one of the world's 
                  most prestigious law firms, where he is tutored by a member of the Oxford Faculty of Law. This role allows him to combine his legal expertise 
                  with his passion for ethical business practices, advising clients on complex 
                  corporate matters while maintaining the highest standards of integrity.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.72 0.14 85)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <blockquote>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed italic mb-8" style={{ color: "oklch(0.15 0.03 250)" }}>
                "The measure of our progress is not the technology we create, 
                but the humanity we preserve in creating it."
              </p>
              <cite className="font-heading text-sm tracking-widest uppercase not-italic" style={{ color: "oklch(0.15 0.03 250 / 0.8)" }}>
                — Dakota Rea
              </cite>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Career Journey</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>
              Milestones & Achievements
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year + item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 mb-12 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "oklch(0.72 0.14 85)" }}
                  >
                    <item.icon size={20} style={{ color: "oklch(0.15 0.03 250)" }} />
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 mt-4" style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.3)" }} />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="font-heading text-sm font-semibold tracking-wider uppercase mb-2" style={{ color: "oklch(0.72 0.14 85)" }}>
                    {item.year}
                  </p>
                  <h3 className="font-display text-xl font-bold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                    {item.title}
                  </h3>
                  <p className="font-body text-base" style={{ color: "oklch(0.45 0.02 250)" }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Areas of Expertise</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>
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
                className="p-8 bg-white card-hover"
                style={{ border: "1px solid oklch(0.90 0.01 90)" }}
              >
                <item.icon size={32} className="mb-4" style={{ color: "oklch(0.72 0.14 85)" }} />
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: "oklch(0.15 0.03 250)" }}>
                  {item.title}
                </h3>
                <p className="font-body text-base" style={{ color: "oklch(0.45 0.02 250)" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Image Section */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="aspect-[4/3] overflow-hidden"
            >
              <img
                src="/images/global-travel.png"
                alt="Dakota Rea's global travels across 60+ countries"
                className="w-full h-full object-cover shadow-xl"
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
                src="/images/speaking-stage.png"
                alt="Dakota Rea speaking at global conference"
                className="w-full h-full object-cover shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "oklch(0.97 0.01 90)" }}>
                Ready to Connect?
              </h2>
              <p className="font-body text-lg md:text-xl leading-relaxed mb-8" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                Whether you're interested in speaking engagements, consulting, 
                or collaboration opportunities, I'd love to hear from you.
              </p>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                >
                  Get in Touch
                  <ArrowRight size={16} />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
