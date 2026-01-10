/**
 * Auto-Blog System for Dakota Rea
 * Generates SEO-optimized AI and business consulting articles
 */

import { invokeLLM, Message } from "./_core/llm";

// High-demand AI consulting keywords for SEO
export const SEO_KEYWORDS = [
  "AI strategy consulting",
  "enterprise AI implementation",
  "GenAI for business",
  "AI ethics governance",
  "responsible AI framework",
  "AI transformation roadmap",
  "machine learning consulting",
  "AI ROI optimization",
  "AI risk management",
  "digital transformation AI",
  "AI leadership",
  "AI change management",
  "enterprise ChatGPT",
  "LLM implementation",
  "AI compliance",
  "AI talent strategy",
  "AI operating model",
  "AI center of excellence",
  "AI use cases enterprise",
  "AI business value",
];

// Blog topics aligned with Dakota's expertise
export const BLOG_TOPICS = [
  {
    category: "AI Strategy",
    topics: [
      "Building an AI-First Enterprise: A Strategic Framework",
      "The ROI of Ethical AI: Why Responsible AI Pays Off",
      "From Pilot to Scale: Enterprise AI Implementation Best Practices",
      "AI Governance Frameworks for Fortune 500 Companies",
      "The C-Suite Guide to GenAI Adoption",
    ],
  },
  {
    category: "AI Ethics",
    topics: [
      "Bentham's Utilitarianism in the Age of AI",
      "Building Trust Through Transparent AI Systems",
      "AI Bias Mitigation: A Practical Guide",
      "The Ethics of Autonomous Decision-Making",
      "Responsible AI: Beyond Compliance to Competitive Advantage",
    ],
  },
  {
    category: "Leadership",
    topics: [
      "Leading Through AI Transformation",
      "Building AI-Ready Teams",
      "The Future of Work: Human-AI Collaboration",
      "Innovation Lessons from 60 Countries",
      "Global Perspectives on AI Leadership",
    ],
  },
  {
    category: "Industry Insights",
    topics: [
      "AI Trends 2026: What Enterprise Leaders Need to Know",
      "The State of Enterprise AI Adoption",
      "Comparing AI Strategies Across Industries",
      "AI Investment Priorities for the Next Decade",
      "Emerging AI Technologies for Business",
    ],
  },
];

// Credible sources for citations
export const CREDIBLE_SOURCES = [
  { name: "Harvard Business Review", url: "https://hbr.org" },
  { name: "MIT Sloan Management Review", url: "https://sloanreview.mit.edu" },
  { name: "McKinsey & Company", url: "https://www.mckinsey.com" },
  { name: "Gartner", url: "https://www.gartner.com" },
  { name: "Deloitte Insights", url: "https://www2.deloitte.com/insights" },
  { name: "World Economic Forum", url: "https://www.weforum.org" },
  { name: "Stanford HAI", url: "https://hai.stanford.edu" },
  { name: "Oxford Internet Institute", url: "https://www.oii.ox.ac.uk" },
  { name: "AI Now Institute", url: "https://ainowinstitute.org" },
  { name: "Partnership on AI", url: "https://partnershiponai.org" },
];

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  keywords: string[];
  author: string;
  publishedAt: Date;
  readTime: number;
  sources: { name: string; url: string }[];
}

const BLOG_SYSTEM_PROMPT = `You are an expert AI and business writer creating content for Dakota Rea's website. Dakota is a Harvard/Oxford-educated AI strategist, Jeremy Bentham Scholar, and founder of the Tudor Foundation.

Write authoritative, SEO-optimized articles that:
1. Demonstrate deep expertise in AI strategy, ethics, and enterprise implementation
2. Include practical insights and actionable frameworks
3. Reference credible sources (Harvard Business Review, MIT, McKinsey, etc.)
4. Naturally incorporate relevant keywords for SEO
5. Maintain a professional yet accessible tone
6. Position Dakota as a thought leader in AI consulting

Format articles with:
- Compelling introduction with a hook
- Clear section headings (use ## for H2, ### for H3)
- Bullet points for key takeaways
- A conclusion with call-to-action
- 1500-2000 words ideal length

Always write from Dakota's perspective as an AI researcher turned enterprise strategist.`;

/**
 * Generate a blog post on a given topic
 */
export async function generateBlogPost(
  topic: string,
  category: string,
  targetKeywords: string[]
): Promise<BlogPost> {
  const messages: Message[] = [
    {
      role: "system",
      content: BLOG_SYSTEM_PROMPT,
    },
    {
      role: "user",
      content: `Write a comprehensive blog article on the topic: "${topic}"

Category: ${category}
Target SEO Keywords: ${targetKeywords.join(", ")}

Include citations from credible sources like Harvard Business Review, MIT, McKinsey, Gartner, etc.

The article should:
1. Start with a compelling hook
2. Include 3-5 main sections with clear headings
3. Provide practical insights and frameworks
4. End with a call-to-action to contact Dakota for consulting
5. Be approximately 1500-2000 words

Format the output as JSON with this structure:
{
  "title": "SEO-optimized title",
  "excerpt": "150-character meta description for SEO",
  "content": "Full markdown content of the article",
  "keywords": ["array", "of", "keywords", "used"],
  "sources": [{"name": "Source Name", "url": "https://example.com"}],
  "readTime": estimated_minutes_to_read
}`,
    },
  ];

  try {
    const result = await invokeLLM({
      messages,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "blog_post",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              excerpt: { type: "string" },
              content: { type: "string" },
              keywords: { type: "array", items: { type: "string" } },
              sources: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    url: { type: "string" },
                  },
                  required: ["name", "url"],
                  additionalProperties: false,
                },
              },
              readTime: { type: "integer" },
            },
            required: ["title", "excerpt", "content", "keywords", "sources", "readTime"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = result.choices[0]?.message?.content;
    const parsed = typeof content === "string" ? JSON.parse(content) : null;

    if (!parsed) {
      throw new Error("Failed to parse blog post response");
    }

    const slug = parsed.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    return {
      id: `blog-${Date.now()}`,
      title: parsed.title,
      slug,
      excerpt: parsed.excerpt,
      content: parsed.content,
      category,
      keywords: parsed.keywords,
      author: "Dakota Rea",
      publishedAt: new Date(),
      readTime: parsed.readTime,
      sources: parsed.sources,
    };
  } catch (error) {
    console.error("[Blog] Error generating post:", error);
    throw error;
  }
}

/**
 * Get a random topic for auto-generation
 */
export function getRandomTopic(): { topic: string; category: string } {
  const categoryIndex = Math.floor(Math.random() * BLOG_TOPICS.length);
  const category = BLOG_TOPICS[categoryIndex];
  const topicIndex = Math.floor(Math.random() * category.topics.length);
  return {
    topic: category.topics[topicIndex],
    category: category.category,
  };
}

/**
 * Get random keywords for SEO targeting
 */
export function getRandomKeywords(count: number = 5): string[] {
  const shuffled = [...SEO_KEYWORDS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
