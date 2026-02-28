/**
 * Blog Page - Auto-generated AI & Business Insights
 * SEO-optimized content hub for Dakota Rea
 */

import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Search,
  TrendingUp,
  Brain,
  Users,
  Globe,
  Loader2,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";

const categories = [
  { id: "all", name: "All Articles", icon: BookOpen },
  { id: "AI Strategy", name: "AI Strategy", icon: Brain },
  { id: "AI Ethics", name: "AI Ethics", icon: Users },
  { id: "Leadership", name: "Leadership", icon: TrendingUp },
  { id: "Industry Insights", name: "Industry Insights", icon: Globe },
];

const POSTS_PER_PAGE = 9;

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch blog posts
  const { data: posts, isLoading, refetch, isRefetching } = trpc.blog.list.useQuery({
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  // Generate new post mutation
  const generateMutation = trpc.blog.generate.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  // Get single post
  const { data: postDetail } = trpc.blog.get.useQuery(
    { id: selectedPost! },
    { enabled: !!selectedPost }
  );

  const filteredPosts = posts?.filter(post => 
    searchQuery === "" || 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPosts = filteredPosts?.length || 0;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts?.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (selectedPost && postDetail) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
        <Navigation />
        
        {/* Article View */}
        <article className="pt-32 pb-20">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Back Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 mb-8 text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: "oklch(0.72 0.14 85)" }}
              >
                <ArrowRight size={16} className="rotate-180" />
                Back to Articles
              </button>

              {/* Article Header */}
              <div className="mb-8">
                <span 
                  className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full mb-4"
                  style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.1)", color: "oklch(0.72 0.14 85)" }}
                >
                  {postDetail.category}
                </span>
                <h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}
                >
                  {postDetail.title}
                </h1>
                <div className="flex items-center gap-4 text-sm" style={{ color: "oklch(0.45 0.02 250)" }}>
                  <span>By {postDetail.author}</span>
                  <span>•</span>
                  <span>{new Date(postDetail.publishedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {postDetail.readTime} min read
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none mb-12"
                style={{ color: "oklch(0.25 0.02 250)" }}
              >
                <Streamdown>{postDetail.content}</Streamdown>
              </div>

              {/* Sources */}
              {postDetail.sources && postDetail.sources.length > 0 && (
                <div className="border-t pt-8 mb-12" style={{ borderColor: "oklch(0.90 0.01 90)" }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "oklch(0.15 0.03 250)" }}>
                    Sources & References
                  </h3>
                  <ul className="space-y-2">
                    {postDetail.sources.map((source, index) => (
                      <li key={index}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm transition-colors hover:opacity-70"
                          style={{ color: "oklch(0.72 0.14 85)" }}
                        >
                          <ExternalLink size={14} />
                          {source.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Keywords */}
              <div className="flex flex-wrap gap-2 mb-12">
                {postDetail.keywords.map((keyword: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full"
                    style={{ backgroundColor: "oklch(0.95 0.01 90)", color: "oklch(0.45 0.02 250)" }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div 
                className="p-8 rounded-xl text-center"
                style={{ backgroundColor: "oklch(0.15 0.03 250)" }}
              >
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}
                >
                  Ready to Transform Your AI Strategy?
                </h3>
                <p className="mb-6" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                  Book a strategy call with Dakota to discuss how these insights apply to your organization.
                </p>
                <Link href="/consulting">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm tracking-wide uppercase"
                    style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}
                  >
                    Book a Strategy Call
                    <ArrowRight size={16} />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </article>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "oklch(0.72 0.14 85)" }}>
                Insights & Analysis
              </p>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}
              >
                AI Strategy <span style={{ color: "oklch(0.72 0.14 85)" }}>Insights</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: "oklch(0.35 0.02 250)" }}>
                Expert perspectives on AI ethics, enterprise implementation, and the future of technology leadership.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="pb-8">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.45 0.02 250)" }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-4 py-3 rounded-lg border text-sm"
                style={{ 
                  borderColor: "oklch(0.90 0.01 90)",
                  backgroundColor: "white",
                  color: "oklch(0.15 0.03 250)"
                }}
              />
            </div>

            {/* Auto-generated articles - no manual generation button */}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => { setSelectedCategory(category.id); setCurrentPage(1); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id ? "" : "hover:opacity-80"
                }`}
                style={{
                  backgroundColor: selectedCategory === category.id 
                    ? "oklch(0.15 0.03 250)" 
                    : "oklch(0.95 0.01 90)",
                  color: selectedCategory === category.id 
                    ? "oklch(0.97 0.01 90)" 
                    : "oklch(0.45 0.02 250)",
                }}
              >
                <category.icon size={16} />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container">
          {isLoading || isRefetching ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin" size={32} style={{ color: "oklch(0.72 0.14 85)" }} />
            </div>
          ) : paginatedPosts && paginatedPosts.length > 0 ? (
            <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post: { id: string; title: string; slug: string; excerpt: string; category: string; author: string; readTime: number; publishedAt: Date; keywords: string[] }, index: number) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedPost(post.id)}
                  className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg"
                  style={{ border: "1px solid oklch(0.90 0.01 90)" }}
                >
                  <div className="p-6">
                    <span 
                      className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full mb-4"
                      style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.1)", color: "oklch(0.72 0.14 85)" }}
                    >
                      {post.category}
                    </span>
                    <h3 
                      className="text-xl font-bold mb-3 line-clamp-2"
                      style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}
                    >
                      {post.title}
                    </h3>
                    <p 
                      className="text-sm mb-4 line-clamp-3"
                      style={{ color: "oklch(0.45 0.02 250)" }}
                    >
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs" style={{ color: "oklch(0.55 0.02 250)" }}>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime} min
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
                  style={{ backgroundColor: "oklch(0.95 0.01 90)", color: "oklch(0.35 0.02 250)" }}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="w-10 h-10 rounded-lg text-sm font-medium transition-all"
                    style={{
                      backgroundColor: currentPage === page ? "oklch(0.15 0.03 250)" : "oklch(0.95 0.01 90)",
                      color: currentPage === page ? "oklch(0.97 0.01 90)" : "oklch(0.35 0.02 250)",
                    }}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
                  style={{ backgroundColor: "oklch(0.95 0.01 90)", color: "oklch(0.35 0.02 250)" }}
                >
                  Next
                </button>
              </div>
            )}
            </>
          ) : (
            <div className="text-center py-20">
              <BookOpen size={48} className="mx-auto mb-4" style={{ color: "oklch(0.72 0.14 85 / 0.5)" }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                {searchQuery ? "No articles match your search" : "Articles coming soon"}
              </h3>
              <p className="mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                {searchQuery ? "Try a different search term." : "New articles are published daily. Check back soon!"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SEO Keywords Section */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}
            >
              Topics We Cover
            </h2>
            <p style={{ color: "oklch(0.45 0.02 250)" }}>
              Expert insights on the most in-demand AI consulting topics
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "AI Strategy Consulting",
              "Enterprise AI Implementation",
              "GenAI for Business",
              "AI Ethics Governance",
              "Responsible AI Framework",
              "AI Transformation Roadmap",
              "Machine Learning Consulting",
              "AI ROI Optimization",
              "Digital Transformation AI",
              "AI Leadership",
            ].map((keyword, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full text-sm"
                style={{ backgroundColor: "white", color: "oklch(0.35 0.02 250)", border: "1px solid oklch(0.90 0.01 90)" }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
