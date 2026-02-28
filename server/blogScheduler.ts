/**
 * Blog Scheduler - Automatic Daily Article Generation
 * Generates one article per category every day at 7:00 AM UTC
 * Categories: AI Strategy, AI Ethics, Leadership, Industry Insights
 */

import { generateBlogPost, getRandomKeywords, BLOG_TOPICS } from "./blog";
import { createBlogPost } from "./db";
import { sendNewsletterToSubscribers } from "./emailService";

const CATEGORIES = [
  "AI Strategy",
  "AI Ethics",
  "Leadership",
  "Industry Insights",
];

let schedulerInterval: ReturnType<typeof setInterval> | null = null;
let lastRunDate: string | null = null;

/**
 * Generate one article for a specific category
 */
async function generateArticleForCategory(category: string): Promise<{ success: boolean; postId?: number; title?: string; error?: string }> {
  try {
    console.log(`[BlogScheduler] Generating article for category: ${category}`);
    
    const categoryData = BLOG_TOPICS.find(c => c.category === category);
    const topics = categoryData?.topics || [category + " Best Practices"];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const keywords = getRandomKeywords(6);
    
    const post = await generateBlogPost(topic, category, keywords);
    
    const saved = await createBlogPost({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      keywords: post.keywords,
      sources: post.sources,
      author: post.author,
      readTime: post.readTime,
    });
    
    console.log(`[BlogScheduler] ✓ Published: "${post.title}" (${category})`);
    
    return {
      success: true,
      postId: saved?.id,
      title: post.title,
    };
  } catch (error: any) {
    console.error(`[BlogScheduler] ✗ Failed to generate article for ${category}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Run the daily blog generation job
 * Generates one article per category and optionally sends newsletter
 */
export async function runDailyBlogGeneration(): Promise<void> {
  const today = new Date().toISOString().split("T")[0];
  
  // Prevent duplicate runs on the same day
  if (lastRunDate === today) {
    console.log(`[BlogScheduler] Already ran today (${today}), skipping`);
    return;
  }
  
  console.log(`[BlogScheduler] Starting daily blog generation for ${today}`);
  lastRunDate = today;
  
  const results: { category: string; success: boolean; title?: string; error?: string }[] = [];
  
  // Generate one article per category sequentially to avoid rate limits
  for (const category of CATEGORIES) {
    const result = await generateArticleForCategory(category);
    results.push({ category, ...result });
    
    // Wait 3 seconds between generations to avoid LLM rate limits
    if (CATEGORIES.indexOf(category) < CATEGORIES.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  
  console.log(`[BlogScheduler] Daily generation complete: ${successCount} published, ${failCount} failed`);
  
  // Send newsletter with the first successful article
  const firstSuccess = results.find(r => r.success && r.title);
  if (firstSuccess && successCount > 0) {
    try {
      const articleUrl = `https://dakotarea.com/blog`;
      const newsletterContent = `
<p>Here's your daily digest of AI strategy insights from Dakota Rea:</p>
<ul>
${results.filter(r => r.success).map(r => `<li><strong>${r.category}:</strong> ${r.title}</li>`).join("\n")}
</ul>
<p>Click below to read the full articles and stay ahead of the AI curve.</p>
      `.trim();
      
      const { sent, failed } = await sendNewsletterToSubscribers({
        subject: `Daily AI Insights: ${firstSuccess.title}`,
        content: newsletterContent,
        articleTitle: firstSuccess.title,
        articleUrl,
      });
      
      console.log(`[BlogScheduler] Newsletter sent: ${sent} delivered, ${failed} failed`);
    } catch (err) {
      console.warn("[BlogScheduler] Newsletter sending failed:", err);
    }
  }
}

/**
 * Check if it's time to run the daily job (7:00 AM UTC)
 */
function shouldRunNow(): boolean {
  const now = new Date();
  const hour = now.getUTCHours();
  const minute = now.getUTCMinutes();
  const today = now.toISOString().split("T")[0];
  
  // Run at 7:00 AM UTC (±5 minute window)
  return hour === 7 && minute < 5 && lastRunDate !== today;
}

/**
 * Start the blog scheduler
 * Checks every 5 minutes if it's time to run
 */
export function startBlogScheduler(): void {
  if (schedulerInterval) {
    console.log("[BlogScheduler] Already running");
    return;
  }
  
  console.log("[BlogScheduler] Starting daily blog scheduler (runs at 7:00 AM UTC)");
  
  // Check immediately on startup (in case server restarted after 7 AM)
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const hour = now.getUTCHours();
  
  // If it's between 7 AM and 8 AM UTC and we haven't run today, run now
  if (hour >= 7 && hour < 8 && lastRunDate !== today) {
    console.log("[BlogScheduler] Missed today's run, executing now...");
    runDailyBlogGeneration().catch(console.error);
  }
  
  // Check every 5 minutes
  schedulerInterval = setInterval(() => {
    if (shouldRunNow()) {
      runDailyBlogGeneration().catch(console.error);
    }
  }, 5 * 60 * 1000);
}

/**
 * Stop the blog scheduler
 */
export function stopBlogScheduler(): void {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
    console.log("[BlogScheduler] Stopped");
  }
}
