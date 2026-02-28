/**
 * Membership plan definitions for Dakota Rea's premium content tiers
 * Stripe subscriptions for recurring revenue
 */

export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number; // in cents per month
  interval: "month" | "year";
  features: string[];
  badge: string;
  highlighted?: boolean;
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "insider",
    name: "Insider",
    description: "Access all premium articles and exclusive insights",
    price: 900, // $9/month
    interval: "month",
    badge: "Most Popular",
    highlighted: true,
    features: [
      "All member-only blog articles",
      "Weekly AI strategy digest",
      "Early access to new content",
      "Exclusive research summaries",
      "Members-only newsletter",
    ],
  },
  {
    id: "strategist",
    name: "Strategist",
    description: "Full access plus priority consulting and resources",
    price: 2900, // $29/month
    interval: "month",
    badge: "Best Value",
    features: [
      "Everything in Insider",
      "Monthly 1:1 strategy Q&A session",
      "AI strategy template library",
      "Priority booking for strategy calls",
      "Exclusive case studies & frameworks",
      "Direct email access to Dakota",
    ],
  },
];

/**
 * Get plan by ID
 */
export function getPlanById(id: string): MembershipPlan | undefined {
  return MEMBERSHIP_PLANS.find(p => p.id === id);
}

/**
 * Format plan price for display
 */
export function formatPlanPrice(plan: MembershipPlan): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(plan.price / 100);
}
