/**
 * Calendly Integration Component
 * Provides booking buttons that open Calendly scheduling widget
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, Clock, Video, Phone, Users } from "lucide-react";

interface CalendlyButtonProps {
  url?: string;
  text?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  meetingType?: "strategy" | "speaking" | "consulting";
}

// Default Calendly URL - user should replace with their actual Calendly link
const DEFAULT_CALENDLY_URL = "https://calendly.com/dakotarea";

const meetingTypes = {
  strategy: {
    title: "AI Strategy Call",
    duration: "30 min",
    description: "Discuss your AI transformation goals and get personalized recommendations.",
    icon: Video,
    path: "/ai-strategy-call",
  },
  speaking: {
    title: "Speaking Inquiry",
    duration: "15 min",
    description: "Explore keynote and workshop opportunities for your event.",
    icon: Users,
    path: "/speaking-inquiry",
  },
  consulting: {
    title: "Consulting Discovery",
    duration: "45 min",
    description: "Deep dive into your enterprise AI challenges and solutions.",
    icon: Phone,
    path: "/consulting-discovery",
  },
};

export default function CalendlyButton({
  url,
  text = "Book a Call",
  className = "",
  variant = "primary",
  meetingType = "strategy",
}: CalendlyButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(meetingType);
  
  const calendlyUrl = url || DEFAULT_CALENDLY_URL;
  const meeting = meetingTypes[selectedType];

  // Load Calendly widget script
  useEffect(() => {
    if (isModalOpen) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isModalOpen]);

  const openCalendly = () => {
    // Try to use Calendly popup if available
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: `${calendlyUrl}${meeting.path}`,
      });
    } else {
      // Fallback to modal with iframe
      setIsModalOpen(true);
    }
  };

  const buttonStyles = {
    primary: {
      backgroundColor: "oklch(0.72 0.14 85)",
      color: "oklch(0.15 0.03 250)",
      border: "none",
    },
    secondary: {
      backgroundColor: "oklch(0.15 0.03 250)",
      color: "oklch(0.97 0.01 90)",
      border: "none",
    },
    outline: {
      backgroundColor: "transparent",
      color: "oklch(0.15 0.03 250)",
      border: "2px solid oklch(0.15 0.03 250)",
    },
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={openCalendly}
        className={`inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer ${className}`}
        style={buttonStyles[variant]}
      >
        <Calendar size={18} />
        {text}
      </motion.button>

      {/* Calendly Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-white overflow-hidden"
              style={{ height: "80vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "oklch(0.90 0.01 90)" }}>
                <div className="flex items-center gap-3">
                  <div className="p-2" style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.1)" }}>
                    <meeting.icon size={20} style={{ color: "oklch(0.72 0.14 85)" }} />
                  </div>
                  <div>
                    <h3 className="font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>
                      {meeting.title}
                    </h3>
                    <p className="text-sm flex items-center gap-1" style={{ color: "oklch(0.45 0.02 250)" }}>
                      <Clock size={14} />
                      {meeting.duration}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 transition-colors cursor-pointer"
                  style={{ color: "oklch(0.45 0.02 250)" }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Meeting Type Selector */}
              <div className="flex gap-2 p-4 border-b" style={{ borderColor: "oklch(0.90 0.01 90)" }}>
                {Object.entries(meetingTypes).map(([key, type]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedType(key as keyof typeof meetingTypes)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all cursor-pointer"
                    style={{
                      backgroundColor: selectedType === key ? "oklch(0.15 0.03 250)" : "oklch(0.97 0.01 90)",
                      color: selectedType === key ? "oklch(0.97 0.01 90)" : "oklch(0.35 0.02 250)",
                    }}
                  >
                    <type.icon size={16} />
                    {type.title}
                  </button>
                ))}
              </div>

              {/* Calendly Embed */}
              <div className="h-full" style={{ height: "calc(80vh - 140px)" }}>
                <iframe
                  src={`${calendlyUrl}${meeting.path}?embed_domain=${window.location.host}&embed_type=Inline`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Schedule a meeting"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Inline Calendly Widget - embeds directly in page
 */
export function CalendlyInline({ url, height = "650px" }: { url?: string; height?: string }) {
  const calendlyUrl = url || DEFAULT_CALENDLY_URL;
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      className="calendly-inline-widget" 
      data-url={calendlyUrl}
      style={{ minWidth: "320px", height }}
    />
  );
}
