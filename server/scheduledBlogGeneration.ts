/**
 * Scheduled Blog Generation
 * Automatically generates and posts articles daily for each category
 */

import { generateBlogPost, BLOG_TOPICS, getRandomKeywords } from "./blog";
import { createBlogPost, getBlogPosts } from "./db";

// Categories to generate articles for
const CATEGORIES = BLOG_TOPICS.map(t => t.category);

/**
 * Generate articles for all categories
 * Called by scheduled task
 */
export async function generateDailyArticles(): Promise<void> {
  console.log("[Blog Scheduler] Starting daily article generation...");
  
  for (const category of CATEGORIES) {
    try {
      // Get a random topic from this category
      const categoryTopics = BLOG_TOPICS.find(t => t.category === category)?.topics || [];
      const randomTopic = categoryTopics[Math.floor(Math.random() * categoryTopics.length)];
      
      if (!randomTopic) {
        console.log(`[Blog Scheduler] No topics found for category: ${category}`);
        continue;
      }
      
      // Check if we already have a recent article on this topic
      const existingPosts = await getBlogPosts(category);
      const recentPost = existingPosts.find(p => {
        const postDate = new Date(p.publishedAt);
        const now = new Date();
        const hoursDiff = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60);
        return hoursDiff < 24; // Don't generate if we have a post from last 24 hours
      });
      
      if (recentPost) {
        console.log(`[Blog Scheduler] Skipping ${category} - recent article exists`);
        continue;
      }
      
      // Generate the article
      const keywords = getRandomKeywords(5);
      console.log(`[Blog Scheduler] Generating article for ${category}: "${randomTopic}"`);
      
      const post = await generateBlogPost(randomTopic, category, keywords);
      
      // Save to database
      await createBlogPost({
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
      
      console.log(`[Blog Scheduler] Successfully generated: "${post.title}"`);
      
      // Add a small delay between generations to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 5000));
      
    } catch (error) {
      console.error(`[Blog Scheduler] Error generating article for ${category}:`, error);
    }
  }
  
  console.log("[Blog Scheduler] Daily article generation complete");
}

/**
 * Generate a single article for a specific category
 */
export async function generateArticleForCategory(category: string): Promise<void> {
  const categoryTopics = BLOG_TOPICS.find(t => t.category === category)?.topics || [];
  const randomTopic = categoryTopics[Math.floor(Math.random() * categoryTopics.length)];
  
  if (!randomTopic) {
    throw new Error(`No topics found for category: ${category}`);
  }
  
  const keywords = getRandomKeywords(5);
  const post = await generateBlogPost(randomTopic, category, keywords);
  
  await createBlogPost({
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
  
  console.log(`[Blog Scheduler] Generated article: "${post.title}"`);
}
