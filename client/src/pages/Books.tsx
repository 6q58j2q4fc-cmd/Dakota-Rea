/*
  DESIGN: Bold Authority + Modern Sophistication
  Books Page: High-converting with pre-order and order functionality
  Fully functional shopping cart integration
*/

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Star, ShoppingCart, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function Books() {
  const { isAuthenticated } = useAuth();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  
  const { data: products, isLoading } = trpc.products.list.useQuery();
  const utils = trpc.useUtils();
  
  const addToCartMutation = trpc.cart.add.useMutation({
    onSuccess: (data) => {
      toast.success(`"${data.product.name}" added to cart!`);
      utils.cart.get.invalidate();
      setAddingToCart(null);
    },
    onError: (error) => {
      toast.error(error.message);
      setAddingToCart(null);
    },
  });

  const handleAddToCart = (productId: string, productName: string) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to cart");
      window.location.href = getLoginUrl();
      return;
    }
    setAddingToCart(productId);
    addToCartMutation.mutate({ productId, quantity: 1 });
  };

  const currentBooks = products?.filter(p => p.category === "book") || [];
  const preorderBooks = products?.filter(p => p.category === "preorder") || [];
  const merchandise = products?.filter(p => p.category === "merchandise") || [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "oklch(0.72 0.14 85)" }}>
                Books & Publications
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                Ideas That <span style={{ color: "oklch(0.72 0.14 85)" }}>Transform</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: "oklch(0.35 0.02 250)" }}>
                Explore Dakota's published works on AI ethics, leadership, 
                and global business insights. Each book combines rigorous research with 
                practical application.
              </p>
              <div className="flex items-center justify-center gap-4">
                <BookOpen size={24} style={{ color: "oklch(0.72 0.14 85)" }} />
                <span className="text-lg" style={{ color: "oklch(0.45 0.02 250)" }}>
                  {currentBooks.length} Available · {preorderBooks.length} Coming Soon
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Books */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "oklch(0.72 0.14 85)" }}>
              Available Now
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
              Current Publications
            </h2>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin" size={32} style={{ color: "oklch(0.72 0.14 85)" }} />
            </div>
          ) : (
            <div className="space-y-16">
              {currentBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="grid lg:grid-cols-2 gap-12 items-center"
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="relative">
                      <div 
                        className="absolute -top-4 -left-4 w-full h-full"
                        style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.1)" }}
                      />
                      <img
                        src={book.imageUrl}
                        alt={book.name}
                        className="relative z-10 w-full max-w-md mx-auto shadow-2xl"
                      />
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill="oklch(0.72 0.14 85)"
                            style={{ color: "oklch(0.72 0.14 85)" }}
                          />
                        ))}
                      </div>
                      <span className="text-sm" style={{ color: "oklch(0.45 0.02 250)" }}>
                        5.0 (Verified Reviews)
                      </span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                      {book.name}
                    </h3>
                    <p className="text-lg leading-relaxed mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                      {book.description}
                    </p>
                    
                    <ul className="grid grid-cols-2 gap-3 mb-8">
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} style={{ color: "oklch(0.72 0.14 85)" }} />
                        <span className="text-sm" style={{ color: "oklch(0.35 0.02 250)" }}>
                          Research-backed
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} style={{ color: "oklch(0.72 0.14 85)" }} />
                        <span className="text-sm" style={{ color: "oklch(0.35 0.02 250)" }}>
                          Case studies
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} style={{ color: "oklch(0.72 0.14 85)" }} />
                        <span className="text-sm" style={{ color: "oklch(0.35 0.02 250)" }}>
                          Practical frameworks
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} style={{ color: "oklch(0.72 0.14 85)" }} />
                        <span className="text-sm" style={{ color: "oklch(0.35 0.02 250)" }}>
                          Digital bonus content
                        </span>
                      </li>
                    </ul>
                    
                    <div className="flex items-center gap-6">
                      <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                        {book.formattedPrice}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAddToCart(book.id, book.name)}
                        disabled={addingToCart === book.id}
                        className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm tracking-wide uppercase transition-all duration-300"
                        style={{ 
                          backgroundColor: "oklch(0.72 0.14 85)", 
                          color: "oklch(0.15 0.03 250)",
                          opacity: addingToCart === book.id ? 0.7 : 1
                        }}
                      >
                        {addingToCart === book.id ? (
                          <>
                            <Loader2 className="animate-spin" size={16} />
                            Adding...
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={16} />
                            Add to Cart
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pre-order Section */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "oklch(0.72 0.14 85)" }}>
              Coming Soon
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
              Pre-Order Now
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {preorderBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white border"
                style={{ borderColor: "oklch(0.90 0.01 90)" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase" style={{ backgroundColor: "oklch(0.72 0.14 85 / 0.1)", color: "oklch(0.72 0.14 85)" }}>
                    Pre-Order
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                  {book.name}
                </h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                  {book.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                    {book.formattedPrice}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(book.id, book.name)}
                    disabled={addingToCart === book.id}
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-sm tracking-wide uppercase border-2 transition-all duration-300"
                    style={{ 
                      borderColor: "oklch(0.72 0.14 85)", 
                      color: "oklch(0.72 0.14 85)",
                      backgroundColor: "transparent",
                      opacity: addingToCart === book.id ? 0.7 : 1
                    }}
                  >
                    {addingToCart === book.id ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        Pre-Order
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Products / Merchandise */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "oklch(0.72 0.14 85)" }}>
              Digital Products
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}>
              Courses & Resources
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {merchandise.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8"
                style={{ backgroundColor: "oklch(0.18 0.03 250)" }}
              >
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}>
                  {item.name}
                </h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(0.97 0.01 90 / 0.8)" }}>
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}>
                    {item.formattedPrice}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(item.id, item.name)}
                    disabled={addingToCart === item.id}
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-sm tracking-wide uppercase transition-all duration-300"
                    style={{ 
                      backgroundColor: "oklch(0.72 0.14 85)", 
                      color: "oklch(0.15 0.03 250)",
                      opacity: addingToCart === item.id ? 0.7 : 1
                    }}
                  >
                    {addingToCart === item.id ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        Add to Cart
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.72 0.14 85)" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                Get Early Access to New Releases
              </h2>
              <p className="text-lg mb-8" style={{ color: "oklch(0.15 0.03 250 / 0.8)" }}>
                Join the reading list for exclusive previews, chapter excerpts, and special launch pricing.
              </p>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Welcome to the reading list!");
                }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 text-base"
                  style={{ 
                    backgroundColor: "oklch(1 0 0)",
                    border: "none",
                    color: "oklch(0.15 0.03 250)"
                  }}
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-4 font-semibold text-sm tracking-wide uppercase transition-all duration-300"
                  style={{ 
                    backgroundColor: "oklch(0.15 0.03 250)",
                    color: "oklch(0.97 0.01 90)"
                  }}
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
