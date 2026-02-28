/**
 * Membership page - Premium subscription tiers for Dakota Rea's content
 * Insider ($9/mo) and Strategist ($29/mo) plans via Stripe
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Crown, Zap, Star, ArrowRight, Lock } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Membership() {
  const [, setLocation] = useLocation();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const { data: plans, isLoading: plansLoading } = trpc.membership.plans.useQuery();
  const { data: membershipStatus } = trpc.membership.status.useQuery();
  const { data: subscriberMe } = trpc.subscriber.me.useQuery();

  const subscribeMutation = trpc.membership.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        toast.success("Redirecting to secure checkout...");
        window.open(data.url, "_blank");
      }
      setLoadingPlan(null);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to start checkout");
      setLoadingPlan(null);
    },
  });

  const handleSubscribe = (planId: string) => {
    if (!subscriberMe) {
      toast.error("Please sign in to your member account first");
      setLocation("/members");
      return;
    }
    setLoadingPlan(planId);
    subscribeMutation.mutate({ planId: planId as "insider" | "strategist" });
  };

  const isPremium = membershipStatus?.isPremium;
  const currentPlan = membershipStatus?.plan;

  const planIcons: Record<string, React.ReactNode> = {
    insider: <Zap className="w-8 h-8" />,
    strategist: <Crown className="w-8 h-8" />,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 text-center">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
            style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.15)", color: "oklch(0.55 0.14 85)" }}>
            <Star className="w-4 h-4" />
            Premium Membership
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: "oklch(0.15 0.03 250)" }}>
            Unlock Exclusive<br />
            <span style={{ color: "oklch(0.72 0.14 85)" }}>Insights & Access</span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "oklch(0.35 0.02 250)" }}>
            Join Dakota Rea's inner circle. Get member-only articles, AI strategy resources,
            and direct access to one of the world's leading voices on AI ethics and enterprise transformation.
          </p>

          {isPremium && (
            <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full"
              style={{ backgroundColor: "oklch(0.15 0.03 250)", color: "oklch(0.97 0.01 90)" }}>
              <CheckCircle className="w-5 h-5" style={{ color: "oklch(0.72 0.14 85)" }} />
              <span className="font-medium">
                You're a {currentPlan === "strategist" ? "Strategist" : "Insider"} member — enjoy your benefits!
              </span>
              <Link href="/members">
                <span className="underline text-sm cursor-pointer">View dashboard →</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Plans */}
      <section className="pb-24">
        <div className="container max-w-5xl mx-auto px-4">
          {plansLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <div key={i} className="h-96 rounded-2xl animate-pulse"
                  style={{ backgroundColor: "oklch(0.93 0.01 90)" }} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {plans?.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl p-8 flex flex-col ${plan.highlighted ? "ring-2" : "border"}`}
                  style={{
                    backgroundColor: plan.highlighted ? "oklch(0.15 0.03 250)" : "white",
                    borderColor: plan.highlighted ? "oklch(0.72 0.14 85)" : "oklch(0.90 0.01 90)",
                  }}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full text-sm font-bold"
                        style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="mb-4" style={{ color: plan.highlighted ? "oklch(0.72 0.14 85)" : "oklch(0.72 0.14 85)" }}>
                      {planIcons[plan.id]}
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2"
                      style={{ color: plan.highlighted ? "oklch(0.97 0.01 90)" : "oklch(0.15 0.03 250)" }}>
                      {plan.name}
                    </h3>
                    <p className="text-sm mb-4"
                      style={{ color: plan.highlighted ? "oklch(0.97 0.01 90 / 0.7)" : "oklch(0.45 0.02 250)" }}>
                      {plan.description}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold"
                        style={{ color: plan.highlighted ? "oklch(0.97 0.01 90)" : "oklch(0.15 0.03 250)" }}>
                        {plan.formattedPrice}
                      </span>
                      <span className="text-sm"
                        style={{ color: plan.highlighted ? "oklch(0.97 0.01 90 / 0.6)" : "oklch(0.55 0.02 250)" }}>
                        /month
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0"
                          style={{ color: "oklch(0.72 0.14 85)" }} />
                        <span className="text-sm"
                          style={{ color: plan.highlighted ? "oklch(0.97 0.01 90 / 0.85)" : "oklch(0.35 0.02 250)" }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {currentPlan === plan.id && isPremium ? (
                    <div className="w-full py-3 text-center rounded-lg font-medium text-sm"
                      style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.2)", color: "oklch(0.72 0.14 85)" }}>
                      ✓ Your Current Plan
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={loadingPlan === plan.id || isPremium}
                      className="w-full font-semibold"
                      style={{
                        backgroundColor: plan.highlighted ? "oklch(0.72 0.14 85)" : "oklch(0.15 0.03 250)",
                        color: plan.highlighted ? "oklch(0.15 0.03 250)" : "oklch(0.97 0.01 90)",
                      }}
                    >
                      {loadingPlan === plan.id ? "Processing..." : (
                        <>
                          Get {plan.name} Access
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Sign in prompt */}
          {!subscriberMe && (
            <div className="mt-12 text-center p-8 rounded-2xl border"
              style={{ borderColor: "oklch(0.90 0.01 90)", backgroundColor: "oklch(0.97 0.01 90)" }}>
              <Lock className="w-8 h-8 mx-auto mb-4" style={{ color: "oklch(0.72 0.14 85)" }} />
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                Member Account Required
              </h3>
              <p className="text-sm mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                Create a free member account or sign in to subscribe to a premium plan.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/members">
                  <Button style={{ backgroundColor: "oklch(0.15 0.03 250)", color: "oklch(0.97 0.01 90)" }}>
                    Sign In / Register
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-12"
            style={{ color: "oklch(0.97 0.01 90)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes. You can cancel your subscription at any time from your member dashboard. You'll retain access until the end of your billing period.",
              },
              {
                q: "What payment methods are accepted?",
                a: "All major credit and debit cards are accepted through our secure Stripe checkout. No PayPal or crypto at this time.",
              },
              {
                q: "What's the difference between Insider and Strategist?",
                a: "Insider gives you full access to all premium articles and the weekly digest. Strategist adds a monthly 1:1 Q&A session, priority booking, the AI strategy template library, and direct email access to Dakota.",
              },
              {
                q: "Is there a free trial?",
                a: "There is no free trial at this time, but you can access a selection of free articles on the blog before subscribing.",
              },
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-xl"
                style={{ backgroundColor: "oklch(0.18 0.03 250)" }}>
                <h4 className="font-display font-bold mb-2" style={{ color: "oklch(0.97 0.01 90)" }}>
                  {faq.q}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
