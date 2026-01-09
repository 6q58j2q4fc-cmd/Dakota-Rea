/*
  AI News Page - Dynamic news feed with SEO-boosting content
  Features: Auto-updating AI news, clickable links, category filters
*/

import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ExternalLink, Clock, TrendingUp, Brain, Shield, Zap, RefreshCw, Newspaper, Filter, Search, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  category: string;
  imageUrl?: string;
}

const categories = [
  { id: "all", label: "All News", icon: Newspaper },
  { id: "llm", label: "LLMs & GenAI", icon: Brain },
  { id: "ethics", label: "AI Ethics", icon: Shield },
  { id: "business", label: "AI Business", icon: TrendingUp },
  { id: "research", label: "Research", icon: Zap },
];

export default function AINews() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch news from backend
  const { data: newsData, isLoading, refetch, isRefetching } = trpc.news.getLatest.useQuery(
    { category: activeCategory === "all" ? undefined : activeCategory },
    { 
      refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
      staleTime: 2 * 60 * 1000, // Consider data stale after 2 minutes
    }
  );

  const news = newsData?.articles || [];
  const lastUpdated = newsData?.lastUpdated;

  // Filter by search query
  const filteredNews = news.filter(article => 
    searchQuery === "" || 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Newspaper size={20} style={{ color: "oklch(0.72 0.14 85)" }} />
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "oklch(0.72 0.14 85)" }}>
                AI News Hub
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}>
              Latest AI News & Insights
            </h1>
            <p className="text-lg mb-8" style={{ color: "oklch(0.97 0.01 90 / 0.8)" }}>
              Stay ahead of the curve with curated AI news, research breakthroughs, and industry analysis. 
              Updated automatically to keep you informed on what matters in artificial intelligence.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.45 0.02 250)" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI news..."
                className="w-full pl-12 pr-4 py-3 text-base focus:outline-none"
                style={{ backgroundColor: "white", color: "oklch(0.15 0.03 250)" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filters & Content */}
      <section className="py-12">
        <div className="container">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b" style={{ borderColor: "oklch(0.90 0.01 90)" }}>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={{ 
                    backgroundColor: activeCategory === cat.id ? "oklch(0.15 0.03 250)" : "oklch(0.97 0.01 90)",
                    color: activeCategory === cat.id ? "oklch(0.97 0.01 90)" : "oklch(0.35 0.02 250)"
                  }}
                >
                  <cat.icon size={16} />
                  {cat.label}
                </motion.button>
              ))}
            </div>
            
            {/* Refresh & Last Updated */}
            <div className="flex items-center gap-4">
              {lastUpdated && (
                <span className="text-sm" style={{ color: "oklch(0.45 0.02 250)" }}>
                  Updated: {formatDate(lastUpdated)}
                </span>
              )}
              <motion.button
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => refetch()}
                disabled={isRefetching}
                className="p-2 cursor-pointer transition-colors"
                style={{ color: isRefetching ? "oklch(0.72 0.14 85)" : "oklch(0.45 0.02 250)" }}
              >
                <RefreshCw size={18} className={isRefetching ? "animate-spin" : ""} />
              </motion.button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 mb-4" style={{ backgroundColor: "oklch(0.95 0.01 90)" }} />
                  <div className="h-4 w-3/4 mb-2" style={{ backgroundColor: "oklch(0.95 0.01 90)" }} />
                  <div className="h-4 w-1/2" style={{ backgroundColor: "oklch(0.95 0.01 90)" }} />
                </div>
              ))}
            </div>
          )}

          {/* News Grid */}
          {!isLoading && filteredNews.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="h-full border transition-all duration-300 overflow-hidden"
                      style={{ borderColor: "oklch(0.90 0.01 90)", backgroundColor: "white" }}
                    >
                      {/* Image */}
                      {article.imageUrl && (
                        <div className="relative h-48 overflow-hidden" style={{ backgroundColor: "oklch(0.95 0.01 90)" }}>
                          <img 
                            src={article.imageUrl} 
                            alt={article.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 text-xs font-semibold uppercase" style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}>
                              {article.category}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-medium" style={{ color: "oklch(0.72 0.14 85)" }}>
                            {article.source}
                          </span>
                          <span style={{ color: "oklch(0.75 0.01 90)" }}>•</span>
                          <span className="text-xs flex items-center gap-1" style={{ color: "oklch(0.55 0.02 250)" }}>
                            <Clock size={12} />
                            {formatDate(article.publishedAt)}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold mb-2 line-clamp-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                          {article.title}
                        </h3>
                        
                        <p className="text-sm mb-4 line-clamp-3" style={{ color: "oklch(0.45 0.02 250)" }}>
                          {article.description}
                        </p>
                        
                        <span className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: "oklch(0.72 0.14 85)" }}>
                          Read Article
                          <ExternalLink size={14} />
                        </span>
                      </div>
                    </motion.div>
                  </a>
                </motion.article>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredNews.length === 0 && (
            <div className="text-center py-16">
              <Newspaper size={48} className="mx-auto mb-4" style={{ color: "oklch(0.75 0.01 90)" }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                No articles found
              </h3>
              <p style={{ color: "oklch(0.45 0.02 250)" }}>
                {searchQuery ? "Try a different search term" : "Check back soon for the latest AI news"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
              Why Stay Updated on AI News?
            </h2>
            <div className="prose prose-lg" style={{ color: "oklch(0.35 0.02 250)" }}>
              <p className="mb-4">
                The artificial intelligence landscape evolves rapidly, with new breakthroughs in large language models (LLMs), 
                generative AI, and machine learning emerging weekly. Staying informed about AI developments is crucial for 
                business leaders, researchers, and technology professionals navigating this transformative era.
              </p>
              <p className="mb-4">
                From OpenAI's latest GPT models to Google's Gemini, from AI ethics regulations to enterprise AI adoption trends, 
                this curated news feed covers the most impactful stories in artificial intelligence. Whether you're interested 
                in AI strategy, responsible AI governance, or cutting-edge research, you'll find relevant insights here.
              </p>
              <p>
                As an AI researcher and strategy consultant, I curate these articles to help leaders make informed decisions 
                about AI implementation, ethics, and innovation.
              </p>
            </div>
            
            <div className="mt-8 pt-8 border-t" style={{ borderColor: "oklch(0.90 0.01 90)" }}>
              <Link href="/consulting">
                <motion.span
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 font-semibold cursor-pointer"
                  style={{ color: "oklch(0.72 0.14 85)" }}
                >
                  Need help with AI strategy? Let's talk
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.72 0.14 85)" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
              Get AI Insights Delivered Weekly
            </h2>
            <p className="mb-6" style={{ color: "oklch(0.15 0.03 250 / 0.8)" }}>
              Join 8,000+ executives receiving curated AI news and strategic analysis every week.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 text-base focus:outline-none"
                style={{ backgroundColor: "white", color: "oklch(0.15 0.03 250)" }}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 font-semibold cursor-pointer"
                style={{ backgroundColor: "oklch(0.15 0.03 250)", color: "oklch(0.97 0.01 90)" }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
