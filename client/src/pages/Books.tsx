/*
  DESIGN: Bold Authority + Modern Sophistication
  Books Page: High-converting with pre-order and order functionality
*/

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Star, ShoppingCart, Bell, CheckCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  status: "available" | "preorder";
  releaseDate?: string;
  pages?: number;
  isbn?: string;
  reviews?: { rating: number; count: number };
  features?: string[];
}

const books: Book[] = [
  {
    id: "1",
    title: "Generation Y: The Complete Guide",
    subtitle: "Understanding the Millennial Market",
    description: "The definitive guide to understanding Generation Y - their values, behaviors, and impact on the global marketplace. Based on years of research and real-world consulting experience.",
    price: 29.99,
    image: "/images/books-collection.png",
    status: "available",
    pages: 342,
    isbn: "978-1-234567-89-0",
    reviews: { rating: 4.8, count: 127 },
    features: ["300+ pages of insights", "Case studies from Fortune 500", "Actionable frameworks", "Digital bonus content"],
  },
  {
    id: "2",
    title: "The Ethics of AI",
    subtitle: "A Practical Framework for Leaders",
    description: "Navigate the complex ethical landscape of artificial intelligence with practical frameworks developed at Harvard and MIT. Essential reading for technology leaders.",
    price: 34.99,
    image: "/images/books-collection.png",
    status: "available",
    pages: 298,
    isbn: "978-1-234567-90-6",
    reviews: { rating: 4.9, count: 89 },
    features: ["Harvard research-backed", "Real-world case studies", "Implementation guides", "Policy templates"],
  },
  {
    id: "3",
    title: "Sixty Countries, One World",
    subtitle: "Lessons in Leadership from Global Travels",
    description: "A deeply personal exploration of what different cultures can teach us about leadership, innovation, and human connection. Each chapter draws from Dakota's experiences across continents.",
    price: 27.99,
    image: "/images/global-travel.png",
    status: "available",
    pages: 412,
    isbn: "978-1-234567-91-3",
    reviews: { rating: 4.7, count: 64 },
    features: ["60+ country insights", "Leadership lessons", "Cultural wisdom", "Personal stories"],
  },
  {
    id: "4",
    title: "The Bentham Principle",
    subtitle: "Utilitarian Ethics for the AI Age",
    description: "Drawing on Jeremy Bentham's philosophy and modern AI research, this book provides a new framework for ethical decision-making in technology.",
    price: 34.99,
    image: "/images/books-collection.png",
    status: "preorder",
    releaseDate: "Fall 2026",
    pages: 380,
    isbn: "978-1-234567-92-0",
  },
  {
    id: "5",
    title: "Leading with Purpose",
    subtitle: "A Guide for Ethical Leadership",
    description: "Practical wisdom for leaders who want to create organizations where people thrive. Drawing from research, case studies, and personal experience.",
    price: 28.99,
    image: "/images/speaking-stage.png",
    status: "preorder",
    releaseDate: "Spring 2027",
    pages: 256,
    isbn: "978-1-234567-93-7",
  },
];

export default function Books() {
  const [preorderEmail, setPreorderEmail] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handlePreorder = (book: Book) => {
    toast.success(`Pre-order confirmed for "${book.title}"! You'll receive an email when it ships.`);
  };

  const handleOrder = (book: Book) => {
    toast.success(`"${book.title}" added to cart!`);
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Welcome to the reading list!");
    setNewsletterEmail("");
  };

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
              <p className="section-label mb-4">Books & Publications</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6" style={{ color: "oklch(0.15 0.03 250)" }}>
                Ideas That <span className="gradient-text">Transform</span>
              </h1>
              <p className="font-body text-lg md:text-xl leading-relaxed mb-8" style={{ color: "oklch(0.35 0.02 250)" }}>
                Explore Dakota's published works on Generation Y, AI ethics, leadership, 
                and global business insights. Each book combines rigorous research with 
                practical application.
              </p>
              <div className="flex items-center justify-center gap-4">
                <BookOpen size={24} style={{ color: "oklch(0.72 0.14 85)" }} />
                <span className="font-body text-lg" style={{ color: "oklch(0.45 0.02 250)" }}>
                  5 Books · 3 Available · 2 Coming Soon
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
            <p className="section-label mb-4">Available Now</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>
              Current Publications
            </h2>
          </motion.div>

          <div className="space-y-16">
            {books.filter(b => b.status === "available").map((book, index) => (
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
                      src={book.image}
                      alt={book.title}
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
                          fill={i < Math.floor(book.reviews?.rating || 0) ? "oklch(0.72 0.14 85)" : "none"}
                          style={{ color: "oklch(0.72 0.14 85)" }}
                        />
                      ))}
                    </div>
                    <span className="font-body text-sm" style={{ color: "oklch(0.45 0.02 250)" }}>
                      {book.reviews?.rating} ({book.reviews?.count} reviews)
                    </span>
                  </div>
                  
                  <h3 className="font-display text-3xl md:text-4xl font-bold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                    {book.title}
                  </h3>
                  <p className="font-heading text-lg mb-4" style={{ color: "oklch(0.72 0.14 85)" }}>
                    {book.subtitle}
                  </p>
                  <p className="font-body text-lg leading-relaxed mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                    {book.description}
                  </p>
                  
                  {book.features && (
                    <ul className="grid grid-cols-2 gap-3 mb-8">
                      {book.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle size={16} style={{ color: "oklch(0.72 0.14 85)" }} />
                          <span className="font-body text-sm" style={{ color: "oklch(0.35 0.02 250)" }}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="font-body text-sm" style={{ color: "oklch(0.55 0.02 250)" }}>
                      {book.pages} pages
                    </span>
                    <span className="font-body text-sm" style={{ color: "oklch(0.55 0.02 250)" }}>
                      ISBN: {book.isbn}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <p className="font-display text-3xl font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>
                      ${book.price}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOrder(book)}
                      className="btn-primary"
                    >
                      <ShoppingCart size={16} />
                      Buy Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Order Section */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Coming Soon</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "oklch(0.15 0.03 250)" }}>
              Pre-Order Upcoming Books
            </h2>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "oklch(0.45 0.02 250)" }}>
              Be the first to know when these titles are available. Sign up for early access 
              and exclusive pre-order bonuses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {books.filter(b => b.status === "preorder").map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white card-hover"
                style={{ border: "1px solid oklch(0.90 0.01 90)" }}
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-24 h-32 flex-shrink-0 overflow-hidden shadow-lg">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={14} style={{ color: "oklch(0.72 0.14 85)" }} />
                      <span 
                        className="text-xs font-heading uppercase tracking-wider"
                        style={{ color: "oklch(0.72 0.14 85)" }}
                      >
                        {book.releaseDate}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold mb-1" style={{ color: "oklch(0.15 0.03 250)" }}>
                      {book.title}
                    </h3>
                    <p className="font-heading text-sm" style={{ color: "oklch(0.72 0.14 85)" }}>
                      {book.subtitle}
                    </p>
                  </div>
                </div>
                
                <p className="font-body text-sm mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                  {book.description}
                </p>
                
                <div className="flex items-center justify-between pt-6" style={{ borderTop: "1px solid oklch(0.92 0.01 90)" }}>
                  <span className="font-display text-xl font-bold" style={{ color: "oklch(0.15 0.03 250)" }}>
                    ${book.price}
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="btn-primary">
                        <Bell size={16} />
                        Pre-Order
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="font-display text-xl">Pre-Order: {book.title}</DialogTitle>
                        <DialogDescription className="font-body">
                          Reserve your copy now. You'll be charged when the book ships in {book.releaseDate}.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <p className="font-body text-sm" style={{ color: "oklch(0.45 0.02 250)" }}>
                          Pre-order includes:
                        </p>
                        <ul className="space-y-2">
                          {["Signed first edition", "Early access to digital chapters", "Exclusive author Q&A invitation"].map((item) => (
                            <li key={item} className="flex items-center gap-2 font-body text-sm">
                              <CheckCircle size={14} style={{ color: "oklch(0.72 0.14 85)" }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="flex justify-between items-center pt-4" style={{ borderTop: "1px solid oklch(0.92 0.01 90)" }}>
                          <span className="font-display text-xl font-bold">${book.price}</span>
                          <Button onClick={() => handlePreorder(book)} className="btn-primary">
                            Confirm Pre-Order
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <BookOpen size={48} className="mx-auto mb-6" style={{ color: "oklch(0.72 0.14 85)" }} />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "oklch(0.97 0.01 90)" }}>
                Get Exclusive Content
              </h2>
              <p className="font-body text-lg mb-8" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                Join Dakota's reading list for exclusive excerpts, early access to new chapters, 
                and insights that don't make it into the books.
              </p>
              <form 
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                onSubmit={handleNewsletter}
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1"
                  style={{ backgroundColor: "oklch(0.22 0.03 250)", borderColor: "oklch(0.30 0.02 250)", color: "oklch(0.97 0.01 90)" }}
                />
                <Button type="submit" className="btn-primary">
                  Subscribe
                  <ArrowRight size={16} />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bulk Orders */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-label mb-4">For Organizations</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: "oklch(0.15 0.03 250)" }}>
                Bulk Orders & Corporate Packages
              </h2>
              <p className="font-body text-lg leading-relaxed mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                Equip your team with the insights they need. Bulk orders include special 
                discounts, customized bookplates, and the option to add a live Q&A session 
                with Dakota.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Volume discounts starting at 25+ copies",
                  "Custom bookplates with your company logo",
                  "Optional live Q&A session with Dakota",
                  "Discussion guides for team book clubs",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} style={{ color: "oklch(0.72 0.14 85)" }} />
                    <span className="font-body" style={{ color: "oklch(0.35 0.02 250)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex"
              >
                Inquire About Bulk Orders
                <ArrowRight size={16} />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/consulting-office.png"
                alt="Corporate book packages"
                className="w-full h-auto shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
