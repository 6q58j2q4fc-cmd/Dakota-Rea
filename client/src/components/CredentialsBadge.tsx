/**
 * CredentialsBadge - Auto-rotating credentials display
 * Cycles through Dakota Rea's credentials automatically
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, GraduationCap, Building, BookOpen, Globe } from "lucide-react";

interface Credential {
  label: string;
  title: string;
  icon: typeof Award;
}

const credentials: Credential[] = [
  {
    label: "Oxford Scholar",
    title: "Jeremy Bentham 2025",
    icon: Award,
  },
  {
    label: "Harvard Graduate",
    title: "Business School & AI Research",
    icon: GraduationCap,
  },
  {
    label: "MIT Certified",
    title: "AI Ethics & Governance",
    icon: BookOpen,
  },
  {
    label: "Wharton Executive",
    title: "Aresty Institute Program",
    icon: Building,
  },
  {
    label: "UK Solicitor Trainee",
    title: "Slaughter and May",
    icon: Building,
  },
  {
    label: "Global Speaker",
    title: "60+ Countries",
    icon: Globe,
  },
];

export default function CredentialsBadge() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % credentials.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentCredential = credentials[currentIndex];
  const Icon = currentCredential.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="absolute -bottom-4 -left-4 p-4 shadow-xl overflow-hidden"
      style={{ backgroundColor: "oklch(0.15 0.03 250)", minWidth: "200px" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <div 
            className="w-10 h-10 flex items-center justify-center flex-shrink-0" 
            style={{ backgroundColor: "oklch(0.72 0.14 85)" }}
          >
            <Icon size={20} style={{ color: "oklch(0.15 0.03 250)" }} />
          </div>
          <div>
            <p 
              className="text-xs font-semibold tracking-wide uppercase" 
              style={{ color: "oklch(0.72 0.14 85)" }}
            >
              {currentCredential.label}
            </p>
            <p 
              className="text-sm font-medium" 
              style={{ color: "oklch(0.97 0.01 90)" }}
            >
              {currentCredential.title}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Progress dots */}
      <div className="flex gap-1 mt-3 justify-center">
        {credentials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ 
              backgroundColor: index === currentIndex 
                ? "oklch(0.72 0.14 85)" 
                : "oklch(0.72 0.14 85 / 0.3)",
              transform: index === currentIndex ? "scale(1.2)" : "scale(1)"
            }}
            aria-label={`View credential ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
