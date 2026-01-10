/**
 * Newsletter Subscription Component
 * Integrates with email services (Mailchimp, ConvertKit, etc.)
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface NewsletterFormProps {
  variant?: "inline" | "card" | "footer";
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  tags?: string[];
}

export default function NewsletterForm({
  variant = "inline",
  title = "Get Weekly AI Insights",
  description = "Join 8,000+ leaders receiving exclusive AI strategy insights, research updates, and industry analysis.",
  buttonText = "Subscribe",
  className = "",
  tags = ["website"],
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Use tRPC mutation for newsletter subscription
  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setIsSubscribed(true);
      setEmail("");
      setFirstName("");
      toast.success("Welcome! Check your inbox for a confirmation email.");
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    
    subscribeMutation.mutate({
      email,
      firstName: firstName || undefined,
      tags,
    });
  };

  // Success state
  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center gap-3 p-4 ${className}`}
        style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.1)" }}
      >
        <CheckCircle size={24} style={{ color: "oklch(0.72 0.14 85)" }} />
        <div>
          <p className="font-semibold" style={{ color: "oklch(0.15 0.03 250)" }}>
            You're subscribed!
          </p>
          <p className="text-sm" style={{ color: "oklch(0.45 0.02 250)" }}>
            Check your inbox for a welcome email.
          </p>
        </div>
      </motion.div>
    );
  }

  // Inline variant - simple horizontal form
  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
        <div className="relative flex-1">
          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.45 0.02 250)" }} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-12 pr-4 py-3 text-base focus:outline-none focus:ring-2"
            style={{ 
              backgroundColor: "white",
              color: "oklch(0.15 0.03 250)",
              border: "1px solid oklch(0.90 0.01 90)",
            }}
            disabled={isSubmitting}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm transition-all duration-300 cursor-pointer disabled:opacity-50"
          style={{ 
            backgroundColor: "oklch(0.15 0.03 250)",
            color: "oklch(0.97 0.01 90)",
          }}
        >
          {isSubmitting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              {buttonText}
              <ArrowRight size={16} />
            </>
          )}
        </motion.button>
      </form>
    );
  }

  // Card variant - full featured with name field
  if (variant === "card") {
    return (
      <div className={`p-8 ${className}`} style={{ backgroundColor: "white", border: "1px solid oklch(0.90 0.01 90)" }}>
        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
          {title}
        </h3>
        <p className="text-sm mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
          {description}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name (optional)"
            className="w-full px-4 py-3 text-base focus:outline-none focus:ring-2"
            style={{ 
              backgroundColor: "oklch(0.97 0.01 90)",
              color: "oklch(0.15 0.03 250)",
              border: "1px solid oklch(0.90 0.01 90)",
            }}
            disabled={isSubmitting}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-4 py-3 text-base focus:outline-none focus:ring-2"
            style={{ 
              backgroundColor: "oklch(0.97 0.01 90)",
              color: "oklch(0.15 0.03 250)",
              border: "1px solid oklch(0.90 0.01 90)",
            }}
            required
            disabled={isSubmitting}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm transition-all duration-300 cursor-pointer disabled:opacity-50"
            style={{ 
              backgroundColor: "oklch(0.72 0.14 85)",
              color: "oklch(0.15 0.03 250)",
            }}
          >
            {isSubmitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                {buttonText}
                <ArrowRight size={16} />
              </>
            )}
          </motion.button>
        </form>
        
        <p className="text-xs mt-4 text-center" style={{ color: "oklch(0.55 0.02 250)" }}>
          No spam. Unsubscribe anytime.
        </p>
      </div>
    );
  }

  // Footer variant - compact dark theme
  return (
    <div className={className}>
      <h4 className="font-semibold mb-3" style={{ color: "oklch(0.97 0.01 90)" }}>
        {title}
      </h4>
      <p className="text-sm mb-4" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
        {description}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="flex-1 px-4 py-2 text-sm focus:outline-none"
          style={{ 
            backgroundColor: "oklch(0.20 0.03 250)",
            color: "oklch(0.97 0.01 90)",
            border: "1px solid oklch(0.30 0.03 250)",
          }}
          disabled={isSubmitting}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 font-semibold text-sm transition-all duration-300 cursor-pointer disabled:opacity-50"
          style={{ 
            backgroundColor: "oklch(0.72 0.14 85)",
            color: "oklch(0.15 0.03 250)",
          }}
        >
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
        </motion.button>
      </form>
    </div>
  );
}
