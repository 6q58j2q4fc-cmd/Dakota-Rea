/**
 * Product definitions for Dakota Rea's books and merchandise
 * Centralized product catalog for consistency across the application
 */

export interface ProductDefinition {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  imageUrl: string;
  category: "book" | "preorder" | "merchandise";
  stripePriceId?: string; // Will be set when products are created in Stripe
}

export const PRODUCTS: ProductDefinition[] = [
  // Current Books
  {
    id: "book-ai-ethics-enterprise",
    name: "AI Ethics for the Enterprise",
    description: "A comprehensive guide to implementing ethical AI systems in Fortune 500 companies. Learn frameworks for responsible AI governance, bias mitigation, and stakeholder alignment.",
    price: 3999, // $39.99
    imageUrl: "/images/books-collection.png",
    category: "book",
  },
  {
    id: "book-bentham-modern-age",
    name: "Bentham in the Modern Age",
    description: "Exploring Jeremy Bentham's utilitarian philosophy through the lens of artificial intelligence and modern technology. A scholarly work bridging 18th-century ethics with 21st-century challenges.",
    price: 2999, // $29.99
    imageUrl: "/images/books-collection.png",
    category: "book",
  },
  {
    id: "book-global-innovator",
    name: "The Global Innovator",
    description: "Insights from traveling to 60+ countries and speaking to thousands of leaders. Discover how diverse perspectives fuel breakthrough innovation and ethical leadership.",
    price: 2499, // $24.99
    imageUrl: "/images/books-collection.png",
    category: "book",
  },
  
  // Pre-order Books
  {
    id: "preorder-genai-playbook",
    name: "The GenAI Playbook (Pre-order)",
    description: "Coming Spring 2026. The definitive guide to implementing generative AI in enterprise settings. Pre-order now to receive exclusive early access content and a signed copy.",
    price: 4499, // $44.99
    imageUrl: "/images/books-collection.png",
    category: "preorder",
  },
  {
    id: "preorder-ai-strategy-2030",
    name: "AI Strategy 2030 (Pre-order)",
    description: "Coming Fall 2026. A forward-looking analysis of AI trends and strategic frameworks for the next decade. Pre-order includes access to quarterly strategy updates.",
    price: 3999, // $39.99
    imageUrl: "/images/books-collection.png",
    category: "preorder",
  },
  
  // Merchandise
  {
    id: "merch-ai-ethics-course",
    name: "AI Ethics Masterclass (Digital)",
    description: "6-hour comprehensive video course on implementing ethical AI frameworks. Includes downloadable templates, case studies, and certificate of completion.",
    price: 29900, // $299.00
    imageUrl: "/images/consulting-office.png",
    category: "merchandise",
  },
  {
    id: "merch-strategy-templates",
    name: "AI Strategy Template Bundle",
    description: "Complete collection of AI strategy templates used with Fortune 500 clients. Includes roadmap templates, governance frameworks, and ROI calculators.",
    price: 9900, // $99.00
    imageUrl: "/images/consulting-office.png",
    category: "merchandise",
  },
];

/**
 * Get product by ID
 */
export function getProductById(id: string): ProductDefinition | undefined {
  return PRODUCTS.find(p => p.id === id);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: ProductDefinition["category"]): ProductDefinition[] {
  return PRODUCTS.filter(p => p.category === category);
}

/**
 * Format price for display
 */
export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceInCents / 100);
}
