/**
 * Custom Booking Calendar Component
 * Allows visitors to request meetings with Dakota Rea
 * Sends email notifications to both Dakota and the requester
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Check,
  Loader2,
  User,
  Mail,
  MessageSquare
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface BookingCalendarProps {
  meetingType?: "strategy" | "speaking" | "consulting";
  buttonText?: string;
  buttonClassName?: string;
  buttonStyle?: React.CSSProperties;
}

const MEETING_TYPES = {
  strategy: {
    title: "AI Strategy Call",
    duration: 30,
    description: "Discuss your AI strategy and implementation challenges",
  },
  speaking: {
    title: "Speaking Inquiry",
    duration: 30,
    description: "Explore speaking engagement opportunities",
  },
  consulting: {
    title: "Consulting Discovery",
    duration: 45,
    description: "Deep dive into your consulting needs",
  },
};

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00"
];

export default function BookingCalendar({ 
  meetingType = "strategy",
  buttonText = "Book a Strategy Call",
  buttonClassName = "",
  buttonStyle = {}
}: BookingCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"date" | "time" | "details" | "confirm">("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const meeting = MEETING_TYPES[meetingType];

  // Booking mutation
  const bookingMutation = trpc.booking.request.useMutation({
    onSuccess: () => {
      setStep("confirm");
      toast.success("Booking request sent! Check your email for confirmation.");
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "Failed to send booking request");
    },
  });

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days: (Date | null)[] = [];
    
    // Add empty slots for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = date.getDay();
    // Available Monday-Friday, not in the past
    return date >= today && day !== 0 && day !== 6;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    bookingMutation.mutate({
      meetingType,
      date: selectedDate.toISOString(),
      time: selectedTime,
      name: formData.name,
      email: formData.email,
      company: formData.company,
      message: formData.message,
    });
  };

  const resetAndClose = () => {
    setIsOpen(false);
    setStep("date");
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-2 ${buttonClassName}`}
        style={buttonStyle}
      >
        <Calendar size={16} />
        {buttonText}
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetAndClose}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl z-50"
              style={{ backgroundColor: "oklch(0.99 0.005 90)" }}
            >
              {/* Header */}
              <div 
                className="sticky top-0 flex items-center justify-between p-6 border-b"
                style={{ 
                  backgroundColor: "oklch(0.15 0.03 250)",
                  borderColor: "oklch(0.25 0.03 250)"
                }}
              >
                <div>
                  <h2 className="text-xl font-bold" style={{ color: "oklch(0.97 0.01 90)" }}>
                    {meeting.title}
                  </h2>
                  <p className="text-sm flex items-center gap-2 mt-1" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                    <Clock size={14} />
                    {meeting.duration} minutes
                  </p>
                </div>
                <button
                  onClick={resetAndClose}
                  className="p-2 rounded-lg transition-colors hover:bg-white/10"
                >
                  <X size={20} style={{ color: "oklch(0.97 0.01 90 / 0.7)" }} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Step: Date Selection */}
                {step === "date" && (
                  <div>
                    <p className="text-sm mb-4" style={{ color: "oklch(0.45 0.02 250)" }}>
                      Select a date for your {meeting.title.toLowerCase()}
                    </p>

                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                        className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                      >
                        <ChevronLeft size={20} style={{ color: "oklch(0.45 0.02 250)" }} />
                      </button>
                      <h3 className="font-semibold" style={{ color: "oklch(0.15 0.03 250)" }}>
                        {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </h3>
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                        className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                      >
                        <ChevronRight size={20} style={{ color: "oklch(0.45 0.02 250)" }} />
                      </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                        <div 
                          key={day} 
                          className="text-center text-xs font-medium py-2"
                          style={{ color: "oklch(0.45 0.02 250)" }}
                        >
                          {day}
                        </div>
                      ))}
                      {days.map((date, index) => (
                        <div key={index} className="aspect-square">
                          {date && (
                            <button
                              onClick={() => {
                                if (isDateAvailable(date)) {
                                  setSelectedDate(date);
                                  setStep("time");
                                }
                              }}
                              disabled={!isDateAvailable(date)}
                              className={`w-full h-full rounded-lg text-sm font-medium transition-all ${
                                selectedDate?.toDateString() === date.toDateString()
                                  ? ""
                                  : isDateAvailable(date)
                                  ? "hover:bg-gray-100"
                                  : "opacity-30 cursor-not-allowed"
                              }`}
                              style={{
                                backgroundColor: selectedDate?.toDateString() === date.toDateString()
                                  ? "oklch(0.72 0.14 85)"
                                  : "transparent",
                                color: selectedDate?.toDateString() === date.toDateString()
                                  ? "oklch(0.15 0.03 250)"
                                  : "oklch(0.25 0.02 250)",
                              }}
                            >
                              {date.getDate()}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step: Time Selection */}
                {step === "time" && selectedDate && (
                  <div>
                    <button
                      onClick={() => setStep("date")}
                      className="flex items-center gap-2 text-sm mb-4 transition-colors hover:opacity-70"
                      style={{ color: "oklch(0.72 0.14 85)" }}
                    >
                      <ChevronLeft size={16} />
                      Back to calendar
                    </button>

                    <p className="font-medium mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                      {formatDate(selectedDate)}
                    </p>
                    <p className="text-sm mb-4" style={{ color: "oklch(0.45 0.02 250)" }}>
                      Select a time (GMT timezone)
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map(time => (
                        <button
                          key={time}
                          onClick={() => {
                            setSelectedTime(time);
                            setStep("details");
                          }}
                          className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                            selectedTime === time ? "" : "hover:bg-gray-100"
                          }`}
                          style={{
                            backgroundColor: selectedTime === time
                              ? "oklch(0.72 0.14 85)"
                              : "oklch(0.95 0.01 90)",
                            color: selectedTime === time
                              ? "oklch(0.15 0.03 250)"
                              : "oklch(0.35 0.02 250)",
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step: Details Form */}
                {step === "details" && (
                  <div>
                    <button
                      onClick={() => setStep("time")}
                      className="flex items-center gap-2 text-sm mb-4 transition-colors hover:opacity-70"
                      style={{ color: "oklch(0.72 0.14 85)" }}
                    >
                      <ChevronLeft size={16} />
                      Back to time selection
                    </button>

                    <div 
                      className="p-4 rounded-lg mb-6"
                      style={{ backgroundColor: "oklch(0.95 0.01 90)" }}
                    >
                      <p className="font-medium" style={{ color: "oklch(0.15 0.03 250)" }}>
                        {meeting.title}
                      </p>
                      <p className="text-sm" style={{ color: "oklch(0.45 0.02 250)" }}>
                        {selectedDate && formatDate(selectedDate)} at {selectedTime}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "oklch(0.25 0.02 250)" }}>
                          Your Name *
                        </label>
                        <div className="relative">
                          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.45 0.02 250)" }} />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm"
                            style={{ borderColor: "oklch(0.90 0.01 90)", color: "oklch(0.15 0.03 250)" }}
                            placeholder="John Smith"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "oklch(0.25 0.02 250)" }}>
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.45 0.02 250)" }} />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm"
                            style={{ borderColor: "oklch(0.90 0.01 90)", color: "oklch(0.15 0.03 250)" }}
                            placeholder="john@company.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "oklch(0.25 0.02 250)" }}>
                          Company (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border text-sm"
                          style={{ borderColor: "oklch(0.90 0.01 90)", color: "oklch(0.15 0.03 250)" }}
                          placeholder="Acme Inc."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "oklch(0.25 0.02 250)" }}>
                          What would you like to discuss?
                        </label>
                        <div className="relative">
                          <MessageSquare size={16} className="absolute left-3 top-3" style={{ color: "oklch(0.45 0.02 250)" }} />
                          <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm min-h-[100px] resize-none"
                            style={{ borderColor: "oklch(0.90 0.01 90)", color: "oklch(0.15 0.03 250)" }}
                            placeholder="Tell us about your AI challenges or goals..."
                          />
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={bookingMutation.isPending || !formData.name || !formData.email}
                        className="w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
                        style={{ 
                          backgroundColor: "oklch(0.72 0.14 85)",
                          color: "oklch(0.15 0.03 250)",
                          opacity: bookingMutation.isPending || !formData.name || !formData.email ? 0.7 : 1
                        }}
                      >
                        {bookingMutation.isPending ? (
                          <>
                            <Loader2 className="animate-spin" size={16} />
                            Sending Request...
                          </>
                        ) : (
                          <>
                            <Calendar size={16} />
                            Request Meeting
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Step: Confirmation */}
                {step === "confirm" && (
                  <div className="text-center py-8">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: "oklch(0.72 0.14 85)" }}
                    >
                      <Check size={32} style={{ color: "oklch(0.15 0.03 250)" }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                      Request Sent!
                    </h3>
                    <p className="text-sm mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                      You'll receive a confirmation email shortly. Dakota will review your request and send a calendar invite.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={resetAndClose}
                      className="px-6 py-3 rounded-lg font-semibold text-sm"
                      style={{ 
                        backgroundColor: "oklch(0.15 0.03 250)",
                        color: "oklch(0.97 0.01 90)"
                      }}
                    >
                      Close
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
