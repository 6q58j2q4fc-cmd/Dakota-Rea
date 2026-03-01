/**
 * Member Portal - Custom subscriber sign-in/register
 * Does NOT require a Manus account - uses email/password
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle, ArrowRight, BookOpen, Zap, Globe, Calendar, ChevronLeft, ChevronRight, Crown, Clock, MessageSquare, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type View = "login" | "register" | "forgot" | "success";

const benefits = [
  { icon: BookOpen, text: "Exclusive AI strategy articles and research" },
  { icon: Zap, text: "Daily insights delivered to your inbox" },
  { icon: Globe, text: "Access to member-only content and resources" },
];

export default function MemberPortal() {
  const [view, setView] = useState<View>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [, navigate] = useLocation();

  // Check if already logged in as subscriber
  const { data: currentSubscriber, refetch } = trpc.subscriber.me.useQuery();

  // Login mutation
  const loginMutation = trpc.subscriber.login.useMutation({
    onSuccess: () => {
      toast.success("Welcome back!");
      refetch();
    },
    onError: (err) => {
      toast.error(err.message || "Login failed. Please check your credentials.");
    },
  });

  // Register mutation
  const registerMutation = trpc.subscriber.register.useMutation({
    onSuccess: () => {
      setView("success");
    },
    onError: (err) => {
      toast.error(err.message || "Registration failed. Please try again.");
    },
  });

  // Forgot password mutation
  const forgotMutation = trpc.subscriber.forgotPassword.useMutation({
    onSuccess: () => {
      toast.success("If that email exists, a reset link has been sent.");
      setView("login");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to send reset email.");
    },
  });

  // Logout mutation
  const logoutMutation = trpc.subscriber.logout.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Logged out successfully");
    },
  });

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email: loginEmail, password: loginPassword });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({
      email: regEmail,
      password: regPassword,
      firstName: regFirstName || undefined,
      lastName: regLastName || undefined,
    });
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    forgotMutation.mutate({ email: forgotEmail });
  };

  // If already logged in, show member dashboard
  if (currentSubscriber) {
    return <MemberDashboard subscriber={{ ...currentSubscriber, isVerified: !!currentSubscriber.isVerified }} onLogout={() => { logoutMutation.mutate(); }} loggingOut={logoutMutation.isPending} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            {/* Left: Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "oklch(0.72 0.14 85)" }}>
                Member Portal
              </p>
              <h1
                className="text-4xl md:text-5xl font-bold leading-[1.1] mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}
              >
                Join Dakota's <span style={{ color: "oklch(0.72 0.14 85)" }}>Inner Circle</span>
              </h1>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "oklch(0.35 0.02 250)" }}>
                Get exclusive access to AI strategy insights, research, and resources from Harvard and Oxford-educated AI strategist Dakota Rea.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="flex items-center gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.1)" }}
                    >
                      <benefit.icon size={18} style={{ color: "oklch(0.72 0.14 85)" }} />
                    </div>
                    <p style={{ color: "oklch(0.35 0.02 250)" }}>{benefit.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Auth Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div
                className="p-8 rounded-2xl shadow-lg"
                style={{ backgroundColor: "white", border: "1px solid oklch(0.90 0.01 90)" }}
              >
                <AnimatePresence mode="wait">
                  {/* Login Form */}
                  {view === "login" && (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                        Sign In
                      </h2>
                      <p className="text-sm mb-6" style={{ color: "oklch(0.55 0.02 250)" }}>
                        Don't have an account?{" "}
                        <button onClick={() => setView("register")} className="font-semibold hover:opacity-70" style={{ color: "oklch(0.72 0.14 85)" }}>
                          Create one
                        </button>
                      </p>

                      <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: "oklch(0.35 0.02 250)" }}>
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.55 0.02 250)" }} />
                            <input
                              type="email"
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                              required
                              placeholder="you@example.com"
                              className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                              style={{ borderColor: "oklch(0.85 0.01 90)", color: "oklch(0.15 0.03 250)" }}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: "oklch(0.35 0.02 250)" }}>
                            Password
                          </label>
                          <div className="relative">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.55 0.02 250)" }} />
                            <input
                              type={showPassword ? "text" : "password"}
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              required
                              placeholder="••••••••"
                              className="w-full pl-10 pr-10 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                              style={{ borderColor: "oklch(0.85 0.01 90)", color: "oklch(0.15 0.03 250)" }}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                              style={{ color: "oklch(0.55 0.02 250)" }}
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => setView("forgot")}
                            className="text-sm hover:opacity-70"
                            style={{ color: "oklch(0.72 0.14 85)" }}
                          >
                            Forgot password?
                          </button>
                        </div>

                        <button
                          type="submit"
                          disabled={loginMutation.isPending}
                          className="w-full flex items-center justify-center gap-2 py-3 font-semibold text-sm tracking-wide uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
                          style={{ backgroundColor: "oklch(0.15 0.03 250)", color: "oklch(0.97 0.01 90)" }}
                        >
                          {loginMutation.isPending ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <>Sign In <ArrowRight size={16} /></>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* Register Form */}
                  {view === "register" && (
                    <motion.div
                      key="register"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                        Create Account
                      </h2>
                      <p className="text-sm mb-6" style={{ color: "oklch(0.55 0.02 250)" }}>
                        Already have an account?{" "}
                        <button onClick={() => setView("login")} className="font-semibold hover:opacity-70" style={{ color: "oklch(0.72 0.14 85)" }}>
                          Sign in
                        </button>
                      </p>

                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: "oklch(0.35 0.02 250)" }}>
                              First Name
                            </label>
                            <div className="relative">
                              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.55 0.02 250)" }} />
                              <input
                                type="text"
                                value={regFirstName}
                                onChange={(e) => setRegFirstName(e.target.value)}
                                placeholder="John"
                                className="w-full pl-10 pr-3 py-3 rounded-lg border text-sm focus:outline-none"
                                style={{ borderColor: "oklch(0.85 0.01 90)", color: "oklch(0.15 0.03 250)" }}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: "oklch(0.35 0.02 250)" }}>
                              Last Name
                            </label>
                            <input
                              type="text"
                              value={regLastName}
                              onChange={(e) => setRegLastName(e.target.value)}
                              placeholder="Doe"
                              className="w-full px-3 py-3 rounded-lg border text-sm focus:outline-none"
                              style={{ borderColor: "oklch(0.85 0.01 90)", color: "oklch(0.15 0.03 250)" }}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: "oklch(0.35 0.02 250)" }}>
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.55 0.02 250)" }} />
                            <input
                              type="email"
                              value={regEmail}
                              onChange={(e) => setRegEmail(e.target.value)}
                              required
                              placeholder="you@example.com"
                              className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm focus:outline-none"
                              style={{ borderColor: "oklch(0.85 0.01 90)", color: "oklch(0.15 0.03 250)" }}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: "oklch(0.35 0.02 250)" }}>
                            Password * (min 8 characters)
                          </label>
                          <div className="relative">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.55 0.02 250)" }} />
                            <input
                              type={showPassword ? "text" : "password"}
                              value={regPassword}
                              onChange={(e) => setRegPassword(e.target.value)}
                              required
                              minLength={8}
                              placeholder="••••••••"
                              className="w-full pl-10 pr-10 py-3 rounded-lg border text-sm focus:outline-none"
                              style={{ borderColor: "oklch(0.85 0.01 90)", color: "oklch(0.15 0.03 250)" }}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                              style={{ color: "oklch(0.55 0.02 250)" }}
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={registerMutation.isPending}
                          className="w-full flex items-center justify-center gap-2 py-3 font-semibold text-sm tracking-wide uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
                          style={{ backgroundColor: "oklch(0.15 0.03 250)", color: "oklch(0.97 0.01 90)" }}
                        >
                          {registerMutation.isPending ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <>Create Account <ArrowRight size={16} /></>
                          )}
                        </button>

                        <p className="text-xs text-center" style={{ color: "oklch(0.65 0.02 250)" }}>
                          By creating an account, you agree to receive insights and updates from Dakota Rea.
                        </p>
                      </form>
                    </motion.div>
                  )}

                  {/* Forgot Password Form */}
                  {view === "forgot" && (
                    <motion.div
                      key="forgot"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                        Reset Password
                      </h2>
                      <p className="text-sm mb-6" style={{ color: "oklch(0.55 0.02 250)" }}>
                        Enter your email and we'll send a reset link.
                      </p>

                      <form onSubmit={handleForgot} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: "oklch(0.35 0.02 250)" }}>
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.55 0.02 250)" }} />
                            <input
                              type="email"
                              value={forgotEmail}
                              onChange={(e) => setForgotEmail(e.target.value)}
                              required
                              placeholder="you@example.com"
                              className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm focus:outline-none"
                              style={{ borderColor: "oklch(0.85 0.01 90)", color: "oklch(0.15 0.03 250)" }}
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={forgotMutation.isPending}
                          className="w-full flex items-center justify-center gap-2 py-3 font-semibold text-sm tracking-wide uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
                          style={{ backgroundColor: "oklch(0.15 0.03 250)", color: "oklch(0.97 0.01 90)" }}
                        >
                          {forgotMutation.isPending ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <>Send Reset Link <ArrowRight size={16} /></>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setView("login")}
                          className="w-full text-sm text-center hover:opacity-70"
                          style={{ color: "oklch(0.55 0.02 250)" }}
                        >
                          Back to sign in
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* Success State */}
                  {view === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-4"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: "oklch(0.95 0.05 145)" }}
                      >
                        <CheckCircle size={32} style={{ color: "oklch(0.45 0.14 145)" }} />
                      </div>
                      <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                        Account Created!
                      </h2>
                      <p className="mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                        Please check your email to verify your account. Once verified, you'll have full access to Dakota's exclusive insights.
                      </p>
                      <button
                        onClick={() => setView("login")}
                        className="flex items-center gap-2 mx-auto font-semibold text-sm tracking-wide uppercase hover:opacity-70"
                        style={{ color: "oklch(0.72 0.14 85)" }}
                      >
                        Sign In <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ==================== MEMBER DASHBOARD ====================

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

function QABookingCalendar({ onClose }: { onClose: () => void }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState("");

  const utils = trpc.useUtils();
  const bookMutation = trpc.qa.book.useMutation({
    onSuccess: () => {
      toast.success("Q&A session booked! Check your email for confirmation.");
      utils.qa.mySessions.invalidate();
      utils.qa.creditStatus.invalidate();
      onClose();
    },
    onError: (err) => toast.error(err.message || "Booking failed. Please try again."),
  });

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const monthName = new Date(viewYear, viewMonth).toLocaleString("default", { month: "long" });

  const isDateAvailable = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    const dayOfWeek = date.getDay();
    // Only Mon-Fri, not in the past, not today
    return dayOfWeek !== 0 && dayOfWeek !== 6 && date > today;
  };

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [viewMonth, viewYear, daysInMonth, firstDayOfMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) { toast.error("Please select a date and time."); return; }
    if (!topic.trim()) { toast.error("Please describe the topic you'd like to discuss."); return; }
    bookMutation.mutate({ date: selectedDate, time: selectedTime, topic, questions: questions || undefined });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b" style={{ borderColor: "oklch(0.90 0.01 90)" }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                Book Your Monthly Q&A Session
              </h2>
              <p className="text-sm mt-1" style={{ color: "oklch(0.55 0.02 250)" }}>
                30-minute 1:1 call with Dakota — included with your Strategist membership
              </p>
            </div>
            <button onClick={onClose} className="text-2xl leading-none hover:opacity-60" style={{ color: "oklch(0.55 0.02 250)" }}>×</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Calendar */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <button type="button" onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-100">
                <ChevronLeft size={18} />
              </button>
              <h3 className="font-semibold" style={{ color: "oklch(0.15 0.03 250)" }}>{monthName} {viewYear}</h3>
              <button type="button" onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100">
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold mb-2" style={{ color: "oklch(0.55 0.02 250)" }}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} />;
                const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const available = isDateAvailable(day);
                const selected = selectedDate === dateStr;
                return (
                  <button
                    key={dateStr}
                    type="button"
                    disabled={!available}
                    onClick={() => { setSelectedDate(dateStr); setSelectedTime(null); }}
                    className="aspect-square rounded-lg text-sm font-medium transition-all"
                    style={{
                      backgroundColor: selected ? "oklch(0.72 0.14 85)" : available ? "oklch(0.97 0.01 90)" : "transparent",
                      color: selected ? "oklch(0.15 0.03 250)" : available ? "oklch(0.25 0.03 250)" : "oklch(0.80 0.01 90)",
                      cursor: available ? "pointer" : "not-allowed",
                      fontWeight: selected ? 700 : 400,
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: "oklch(0.35 0.02 250)" }}>
                Available Times — {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className="py-2 px-3 rounded-lg text-sm font-medium border transition-all"
                    style={{
                      backgroundColor: selectedTime === slot ? "oklch(0.15 0.03 250)" : "white",
                      color: selectedTime === slot ? "oklch(0.97 0.01 90)" : "oklch(0.35 0.02 250)",
                      borderColor: selectedTime === slot ? "oklch(0.15 0.03 250)" : "oklch(0.85 0.01 90)",
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Topic */}
          {selectedDate && selectedTime && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "oklch(0.35 0.02 250)" }}>
                  Session Topic <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  required
                  placeholder="e.g., AI strategy for my enterprise, ethics framework review..."
                  className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none"
                  style={{ borderColor: "oklch(0.85 0.01 90)", color: "oklch(0.15 0.03 250)" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "oklch(0.35 0.02 250)" }}>
                  Specific Questions (optional)
                </label>
                <textarea
                  value={questions}
                  onChange={e => setQuestions(e.target.value)}
                  rows={3}
                  placeholder="List any specific questions you'd like to cover..."
                  className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none resize-none"
                  style={{ borderColor: "oklch(0.85 0.01 90)", color: "oklch(0.15 0.03 250)" }}
                />
              </div>
              <button
                type="submit"
                disabled={bookMutation.isPending}
                className="w-full flex items-center justify-center gap-2 py-3 font-semibold text-sm tracking-wide uppercase transition-opacity hover:opacity-90 disabled:opacity-60 rounded-lg"
                style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}
              >
                {bookMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <><Calendar size={16} /> Book Session</>}
              </button>
            </div>
          )}
        </form>
      </div>
    </motion.div>
  );
}

function MemberDashboard({ subscriber, onLogout, loggingOut }: {
  subscriber: { id: number; email: string; firstName?: string | null; lastName?: string | null; isVerified: boolean; membershipPlan?: string | null; membershipStatus?: string | null };
  onLogout: () => void;
  loggingOut: boolean;
}) {
  const [showQABooking, setShowQABooking] = useState(false);
  const { data: creditStatus } = trpc.qa.creditStatus.useQuery();
  const { data: mySessions } = trpc.qa.mySessions.useQuery();
  const { data: membershipStatus } = trpc.membership.status.useQuery();

  const isStrategist = membershipStatus?.plan === "strategist" && membershipStatus?.status === "active";
  const isInsider = membershipStatus?.plan === "insider" && membershipStatus?.status === "active";
  const isPremium = isStrategist || isInsider;

  const displayName = subscriber.firstName || subscriber.email.split("@")[0];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
      <Navigation />
      {showQABooking && <QABookingCalendar onClose={() => setShowQABooking(false)} />}

      <section className="pt-32 pb-20">
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                    Welcome, {displayName}
                  </h1>
                  {isStrategist && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}>
                      <Crown size={12} /> Strategist
                    </span>
                  )}
                  {isInsider && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: "oklch(0.15 0.03 250)", color: "oklch(0.72 0.14 85)" }}>
                      <Star size={12} /> Insider
                    </span>
                  )}
                </div>
                <p className="text-sm" style={{ color: "oklch(0.55 0.02 250)" }}>{subscriber.email}</p>
              </div>
              <button onClick={onLogout} disabled={loggingOut} className="text-sm hover:opacity-70" style={{ color: "oklch(0.55 0.02 250)" }}>
                {loggingOut ? "Signing out..." : "Sign out"}
              </button>
            </div>

            {/* Verification banner */}
            {!subscriber.isVerified && (
              <div className="flex items-center gap-3 p-4 rounded-xl mb-6" style={{ backgroundColor: "oklch(0.95 0.05 85)", border: "1px solid oklch(0.85 0.10 85)" }}>
                <Mail size={18} style={{ color: "oklch(0.55 0.14 85)" }} />
                <p className="text-sm" style={{ color: "oklch(0.45 0.14 85)" }}>
                  Please verify your email address to unlock all member features.
                </p>
              </div>
            )}

            {/* Strategist Q&A Section */}
            {isStrategist && (
              <div className="rounded-2xl p-6 mb-6" style={{ background: "linear-gradient(135deg, oklch(0.15 0.03 250), oklch(0.22 0.04 260))", color: "white" }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Crown size={18} style={{ color: "oklch(0.72 0.14 85)" }} />
                      <h2 className="text-lg font-bold">Monthly Q&A Session</h2>
                    </div>
                    <p className="text-sm opacity-70">Your included 1:1 call with Dakota — 30 minutes, any topic</p>
                  </div>
                  {creditStatus?.hasCredit ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}>
                      Credit Available
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20">
                      Used This Month
                    </span>
                  )}
                </div>

                {creditStatus?.hasCredit ? (
                  <button
                    onClick={() => setShowQABooking(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}
                  >
                    <Calendar size={16} /> Schedule Your Session
                  </button>
                ) : creditStatus?.existingSession ? (
                  <div className="rounded-lg p-4 mt-2" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                    <p className="text-sm font-semibold mb-1">Session Booked</p>
                    <p className="text-xs opacity-70">
                      {new Date((creditStatus.existingSession as any).requestedDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {(creditStatus.existingSession as any).requestedTime}
                    </p>
                    <p className="text-xs opacity-70 mt-1">Status: <span className="capitalize">{(creditStatus.existingSession as any).status}</span></p>
                    {(creditStatus.existingSession as any).meetingLink && (
                      <a
                        href={(creditStatus.existingSession as any).meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-xs font-bold underline"
                        style={{ color: "oklch(0.72 0.14 85)" }}
                      >
                        Join Meeting →
                      </a>
                    )}
                  </div>
                ) : null}
              </div>
            )}

            {/* Upgrade CTA for non-Strategist members */}
            {!isStrategist && (
              <div className="rounded-2xl p-6 mb-6" style={{ border: "2px dashed oklch(0.72 0.14 85 / 0.4)", backgroundColor: "oklch(0.72 0.14 85 / 0.04)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <Crown size={20} style={{ color: "oklch(0.72 0.14 85)" }} />
                  <h2 className="font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>Monthly 1:1 Q&A with Dakota</h2>
                </div>
                <p className="text-sm mb-4" style={{ color: "oklch(0.45 0.02 250)" }}>
                  Upgrade to Strategist ($29/mo) to unlock your monthly 30-minute 1:1 session with Dakota — ask anything about AI strategy, ethics, or your specific challenges.
                </p>
                <a
                  href="/membership"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.15 0.03 250)", color: "oklch(0.97 0.01 90)" }}
                >
                  <Crown size={14} /> Upgrade to Strategist
                </a>
              </div>
            )}

            {/* Quick Links */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <a href="/blog" className="flex items-center justify-between p-4 rounded-xl bg-white transition-all hover:shadow-md" style={{ border: "1px solid oklch(0.90 0.01 90)" }}>
                <div className="flex items-center gap-3">
                  <BookOpen size={20} style={{ color: "oklch(0.72 0.14 85)" }} />
                  <span className="font-semibold text-sm" style={{ color: "oklch(0.15 0.03 250)" }}>Latest Articles</span>
                </div>
                <ArrowRight size={16} style={{ color: "oklch(0.72 0.14 85)" }} />
              </a>
              <a href="/ai-news" className="flex items-center justify-between p-4 rounded-xl bg-white transition-all hover:shadow-md" style={{ border: "1px solid oklch(0.90 0.01 90)" }}>
                <div className="flex items-center gap-3">
                  <Zap size={20} style={{ color: "oklch(0.72 0.14 85)" }} />
                  <span className="font-semibold text-sm" style={{ color: "oklch(0.15 0.03 250)" }}>Live AI News</span>
                </div>
                <ArrowRight size={16} style={{ color: "oklch(0.72 0.14 85)" }} />
              </a>
              <a href="/consulting" className="flex items-center justify-between p-4 rounded-xl bg-white transition-all hover:shadow-md" style={{ border: "1px solid oklch(0.90 0.01 90)" }}>
                <div className="flex items-center gap-3">
                  <MessageSquare size={20} style={{ color: "oklch(0.72 0.14 85)" }} />
                  <span className="font-semibold text-sm" style={{ color: "oklch(0.15 0.03 250)" }}>Book a Strategy Call</span>
                </div>
                <ArrowRight size={16} style={{ color: "oklch(0.72 0.14 85)" }} />
              </a>
              <a href="/membership" className="flex items-center justify-between p-4 rounded-xl bg-white transition-all hover:shadow-md" style={{ border: "1px solid oklch(0.90 0.01 90)" }}>
                <div className="flex items-center gap-3">
                  <Crown size={20} style={{ color: "oklch(0.72 0.14 85)" }} />
                  <span className="font-semibold text-sm" style={{ color: "oklch(0.15 0.03 250)" }}>Manage Membership</span>
                </div>
                <ArrowRight size={16} style={{ color: "oklch(0.72 0.14 85)" }} />
              </a>
            </div>

            {/* Past Q&A Sessions */}
            {mySessions && mySessions.length > 0 && (
              <div className="rounded-2xl p-6 bg-white" style={{ border: "1px solid oklch(0.90 0.01 90)" }}>
                <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                  <Clock size={18} style={{ color: "oklch(0.72 0.14 85)" }} /> Your Q&A Sessions
                </h2>
                <div className="space-y-3">
                  {mySessions.slice(0, 5).map((session: any) => (
                    <div key={session.id} className="flex items-start justify-between p-3 rounded-lg" style={{ backgroundColor: "oklch(0.98 0.005 90)" }}>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "oklch(0.15 0.03 250)" }}>{session.topic}</p>
                        <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.02 250)" }}>
                          {new Date(session.requestedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at {session.requestedTime}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full capitalize font-medium" style={{
                          backgroundColor: session.status === "confirmed" ? "oklch(0.95 0.05 145)" : session.status === "completed" ? "oklch(0.95 0.03 250)" : "oklch(0.95 0.05 85)",
                          color: session.status === "confirmed" ? "oklch(0.45 0.14 145)" : session.status === "completed" ? "oklch(0.45 0.03 250)" : "oklch(0.55 0.14 85)",
                        }}>
                          {session.status}
                        </span>
                        {session.meetingLink && (
                          <a href={session.meetingLink} target="_blank" rel="noopener noreferrer" className="text-xs font-bold underline" style={{ color: "oklch(0.72 0.14 85)" }}>
                            Join
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
