/*
  DESIGN: Timeless Editorial Luxury
  Press Page: Media kit and press resources
*/

import { motion } from "framer-motion";
import { Download, FileText, Image, Mail, Video } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const pressAssets = [
  {
    icon: Image,
    title: "High-Resolution Photos",
    description: "Professional headshots and action photos for publication use.",
    format: "ZIP (JPG, 300dpi)",
    size: "45 MB",
  },
  {
    icon: FileText,
    title: "Biography & Fact Sheet",
    description: "Official bio in multiple lengths plus key facts and achievements.",
    format: "PDF",
    size: "2 MB",
  },
  {
    icon: FileText,
    title: "Speaking Topics Overview",
    description: "Detailed descriptions of keynote topics and presentation formats.",
    format: "PDF",
    size: "1.5 MB",
  },
  {
    icon: Video,
    title: "Speaking Reel",
    description: "Highlights from recent keynote presentations and interviews.",
    format: "MP4 (1080p)",
    size: "150 MB",
  },
];

const recentCoverage = [
  {
    outlet: "Harvard Business Review",
    title: "The Ethics of AI: A Framework for Responsible Innovation",
    date: "December 2025",
    type: "Feature Article",
  },
  {
    outlet: "TED Talks",
    title: "What Classical Philosophy Teaches Us About AI",
    date: "October 2025",
    type: "Talk",
  },
  {
    outlet: "The Economist",
    title: "Interview: Building Technology That Serves Humanity",
    date: "September 2025",
    type: "Interview",
  },
  {
    outlet: "MIT Technology Review",
    title: "The Tudor Foundation's Approach to Ethical Tech",
    date: "August 2025",
    type: "Profile",
  },
];

const speakingTopics = [
  "AI Ethics & Responsible Innovation",
  "Leadership in Uncertain Times",
  "The Future of Work & Human Flourishing",
  "Global Perspectives on Innovation",
  "Philanthropy & Purpose-Driven Leadership",
];

export default function Press() {
  const handleDownload = (asset: string) => {
    toast.success(`Downloading ${asset}... (Demo - actual download would start)`);
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
                Press & Media
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: "oklch(0.25 0.01 50)" }}>
                Press Kit
              </h1>
              <p className="font-body text-xl leading-relaxed" style={{ color: "oklch(0.35 0.01 50)" }}>
                Resources for journalists, event organizers, and media professionals. 
                Download official photos, bios, and speaking materials.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Bio */}
      <section className="pb-24 md:pb-32">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="aspect-[3/4] overflow-hidden sticky top-32">
                <img
                  src="/images/dakota-rea-portrait.jpg"
                  alt="Dakota Rea official portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "oklch(0.25 0.01 50)" }}>
                Official Biography
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="p-6" style={{ backgroundColor: "oklch(0.94 0.01 90)" }}>
                  <h3 className="font-sans text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "oklch(0.62 0.12 45)" }}>
                    Short Bio (50 words)
                  </h3>
                  <p className="font-body text-base leading-relaxed" style={{ color: "oklch(0.35 0.01 50)" }}>
                    Dakota Rea is an entrepreneur, inventor, and philanthropist. A Harvard graduate 
                    and Jeremy Bentham Scholar at Oxford, he researches AI ethics and founded the 
                    Tudor Foundation. He has spoken to audiences across 60+ countries on innovation, 
                    leadership, and ethical technology.
                  </p>
                </div>

                <div className="p-6" style={{ backgroundColor: "oklch(0.94 0.01 90)" }}>
                  <h3 className="font-sans text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "oklch(0.62 0.12 45)" }}>
                    Full Bio (150 words)
                  </h3>
                  <p className="font-body text-base leading-relaxed" style={{ color: "oklch(0.35 0.01 50)" }}>
                    Dakota Rea is an entrepreneur, inventor, philanthropist, and leading voice in 
                    AI ethics. A graduate of Harvard University and Jeremy Bentham Scholar at Oxford, 
                    Dakota brings rigorous philosophical training to contemporary challenges in 
                    technology and leadership. His research on responsible AI development, further 
                    refined through certifications at MIT and the Wharton School, has influenced 
                    organizations worldwide.
                  </p>
                  <p className="font-body text-base leading-relaxed mt-4" style={{ color: "oklch(0.35 0.01 50)" }}>
                    Having traveled to more than 60 countries and addressed audiences numbering in 
                    the thousands, Dakota combines global perspective with scholarly depth. As founder 
                    of the Tudor Foundation, he advances education, ethical technology, and community 
                    empowerment initiatives. His published works explore the intersection of philosophy, 
                    technology, and human flourishing.
                  </p>
                </div>
              </div>

              <h3 className="font-display text-xl font-bold mb-4" style={{ color: "oklch(0.25 0.01 50)" }}>
                Key Facts
              </h3>
              <ul className="grid md:grid-cols-2 gap-3 mb-8">
                {[
                  "Harvard University Graduate",
                  "Oxford University Jeremy Bentham Scholar",
                  "MIT AI Ethics Certification",
                  "Wharton Executive Certification",
                  "Founder, Tudor Foundation",
                  "60+ Countries Visited",
                  "200+ Speaking Engagements",
                  "5 Published Books",
                ].map((fact) => (
                  <li key={fact} className="flex items-center gap-2">
                    <span style={{ color: "oklch(0.65 0.05 145)" }}>•</span>
                    <span className="font-body text-sm" style={{ color: "oklch(0.35 0.01 50)" }}>
                      {fact}
                    </span>
                  </li>
                ))}
              </ul>

              <h3 className="font-display text-xl font-bold mb-4" style={{ color: "oklch(0.25 0.01 50)" }}>
                Speaking Topics
              </h3>
              <ul className="space-y-2">
                {speakingTopics.map((topic) => (
                  <li key={topic} className="flex items-center gap-2">
                    <span style={{ color: "oklch(0.62 0.12 45)" }}>→</span>
                    <span className="font-body text-base" style={{ color: "oklch(0.35 0.01 50)" }}>
                      {topic}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Downloadable Assets */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.25 0.01 50)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
              Downloads
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: "oklch(0.97 0.01 90)" }}>
              Press Assets
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pressAssets.map((asset, index) => (
              <motion.div
                key={asset.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 flex items-start gap-4"
                style={{ backgroundColor: "oklch(0.97 0.01 90)" }}
              >
                <div 
                  className="p-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "oklch(0.94 0.01 90)" }}
                >
                  <asset.icon size={24} style={{ color: "oklch(0.62 0.12 45)" }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold mb-1" style={{ color: "oklch(0.25 0.01 50)" }}>
                    {asset.title}
                  </h3>
                  <p className="font-body text-sm mb-3" style={{ color: "oklch(0.45 0.01 50)" }}>
                    {asset.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs" style={{ color: "oklch(0.55 0.01 50)" }}>
                      {asset.format} · {asset.size}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleDownload(asset.title)}
                      className="font-sans text-xs font-semibold"
                      style={{ backgroundColor: "oklch(0.25 0.01 50)", color: "oklch(0.97 0.01 90)" }}
                    >
                      <Download size={14} className="mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Coverage */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
              In the News
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: "oklch(0.25 0.01 50)" }}>
              Recent Coverage
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {recentCoverage.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                style={{ borderColor: "oklch(0.88 0.01 90)", backgroundColor: "oklch(0.99 0.005 90)" }}
              >
                <div>
                  <p className="font-sans text-xs font-semibold tracking-wide uppercase mb-1" style={{ color: "oklch(0.62 0.12 45)" }}>
                    {item.outlet}
                  </p>
                  <h3 className="font-display text-lg font-bold" style={{ color: "oklch(0.25 0.01 50)" }}>
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="font-sans text-sm px-3 py-1 rounded-full" style={{ backgroundColor: "oklch(0.94 0.01 90)", color: "oklch(0.45 0.01 50)" }}>
                    {item.type}
                  </span>
                  <span className="font-sans text-sm" style={{ color: "oklch(0.55 0.01 50)" }}>
                    {item.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.94 0.01 90)" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Mail className="mx-auto mb-6" size={48} style={{ color: "oklch(0.62 0.12 45)" }} />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "oklch(0.25 0.01 50)" }}>
                Media Inquiries
              </h2>
              <p className="font-body text-lg mb-6" style={{ color: "oklch(0.45 0.01 50)" }}>
                For interview requests, speaking opportunities, or additional press materials, 
                please contact our media relations team.
              </p>
              <a
                href="mailto:press@dakotarea.com"
                className="inline-flex items-center gap-2 font-sans text-lg font-semibold transition-colors hover:text-terracotta"
                style={{ color: "oklch(0.25 0.01 50)" }}
              >
                press@dakotarea.com
              </a>
              <p className="font-body text-sm mt-4" style={{ color: "oklch(0.55 0.01 50)" }}>
                We typically respond to media inquiries within 24 hours.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
