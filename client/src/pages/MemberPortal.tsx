/**
 * Member Portal - Custom subscriber sign-in/register
 * Does NOT require a Manus account - uses email/password
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle, ArrowRight, BookOpen, Zap, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";

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
    return (
      <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.15)" }}
              >
                <User size={36} style={{ color: "oklch(0.72 0.14 85)" }} />
              </div>
              <h1
                className="text-3xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}
              >
                Welcome back, {currentSubscriber.firstName || currentSubscriber.email.split("@")[0]}!
              </h1>
              <p className="mb-2" style={{ color: "oklch(0.45 0.02 250)" }}>
                {currentSubscriber.email}
              </p>
              {!currentSubscriber.isVerified && (
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
                  style={{ backgroundColor: "oklch(0.95 0.05 85)", color: "oklch(0.55 0.14 85)" }}
                >
                  <Mail size={14} />
                  Please verify your email address
                </div>
              )}
              {currentSubscriber.isVerified && (
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
                  style={{ backgroundColor: "oklch(0.95 0.05 145)", color: "oklch(0.45 0.14 145)" }}
                >
                  <CheckCircle size={14} />
                  Verified Member
                </div>
              )}

              <div className="grid gap-4 mb-8">
                <a
                  href="/blog"
                  className="flex items-center justify-between p-4 rounded-xl transition-all hover:shadow-md"
                  style={{ backgroundColor: "white", border: "1px solid oklch(0.90 0.01 90)" }}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen size={20} style={{ color: "oklch(0.72 0.14 85)" }} />
                    <span style={{ color: "oklch(0.15 0.03 250)", fontWeight: 600 }}>Read Latest Articles</span>
                  </div>
                  <ArrowRight size={16} style={{ color: "oklch(0.72 0.14 85)" }} />
                </a>
                <a
                  href="/ai-news"
                  className="flex items-center justify-between p-4 rounded-xl transition-all hover:shadow-md"
                  style={{ backgroundColor: "white", border: "1px solid oklch(0.90 0.01 90)" }}
                >
                  <div className="flex items-center gap-3">
                    <Zap size={20} style={{ color: "oklch(0.72 0.14 85)" }} />
                    <span style={{ color: "oklch(0.15 0.03 250)", fontWeight: 600 }}>Live AI News Feed</span>
                  </div>
                  <ArrowRight size={16} style={{ color: "oklch(0.72 0.14 85)" }} />
                </a>
              </div>

              <button
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="text-sm transition-colors hover:opacity-70"
                style={{ color: "oklch(0.55 0.02 250)" }}
              >
                {logoutMutation.isPending ? "Signing out..." : "Sign out"}
              </button>
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    );
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
