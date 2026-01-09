/*
  DESIGN: Timeless Editorial Luxury
  Books Page: Book catalog with pre-order and order functionality
*/

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, ShoppingCart, Star } from "lucide-react";
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
}

const books: Book[] = [
  {
    id: "1",
    title: "The Ethics of Intelligence",
    subtitle: "A Framework for Responsible AI Development",
    description: "Drawing on classical utilitarian philosophy and contemporary research, this groundbreaking work provides practical frameworks for developing AI systems that serve humanity's greatest good. Essential reading for technologists, policymakers, and leaders navigating the AI revolution.",
    price: 29.99,
    image: "/images/hero-books.png",
    status: "available",
    pages: 342,
    isbn: "978-1-234567-89-0",
    reviews: { rating: 4.8, count: 127 },
  },
  {
    id: "2",
    title: "Sixty Countries, One World",
    subtitle: "Lessons in Leadership from Global Travels",
    description: "A deeply personal exploration of what different cultures can teach us about leadership, innovation, and human connection. Each chapter draws from Dakota's experiences across continents to illuminate universal truths about effective leadership.",
    price: 27.99,
    image: "/images/hero-global.png",
    status: "available",
    pages: 298,
    isbn: "978-1-234567-90-6",
    reviews: { rating: 4.9, count: 89 },
  },
  {
    id: "3",
    title: "The Bentham Principle",
    subtitle: "Classical Philosophy for Modern Challenges",
    description: "A fresh examination of Jeremy Bentham's utilitarian philosophy and its surprising relevance to contemporary ethical dilemmas. Accessible yet rigorous, this book bridges academic scholarship and practical wisdom.",
    price: 32.99,
    image: "/images/EC4bVFar7U9c.jpg",
    status: "available",
    pages: 412,
    isbn: "978-1-234567-91-3",
    reviews: { rating: 4.7, count: 64 },
  },
  {
    id: "4",
    title: "The Future We Choose",
    subtitle: "Technology, Ethics, and Human Flourishing",
    description: "A visionary exploration of how we can shape technology to enhance rather than diminish human potential. Combining philosophical depth with practical recommendations, this book charts a course toward a more thoughtful future.",
    price: 34.99,
    image: "/images/kyARmzu3bAlx.png",
    status: "preorder",
    releaseDate: "March 2026",
    pages: 380,
    isbn: "978-1-234567-92-0",
  },
  {
    id: "5",
    title: "Leading with Purpose",
    subtitle: "A Guide for Ethical Leadership",
    description: "Practical wisdom for leaders who want to create organizations where people thrive. Drawing from research, case studies, and personal experience, this guide provides actionable frameworks for purpose-driven leadership.",
    price: 28.99,
    image: "/images/hero-philanthropy.png",
    status: "preorder",
    releaseDate: "June 2026",
    pages: 256,
    isbn: "978-1-234567-93-7",
  },
];

const otherItems = [
  {
    id: "item-1",
    title: "Signed Book Bundle",
    description: "All three available books, personally signed by Dakota Rea.",
    price: 79.99,
    originalPrice: 90.97,
    image: "/images/hero-books.png",
  },
  {
    id: "item-2",
    title: "Ethics Framework Poster",
    description: "Beautiful 24x36 poster featuring the AI Ethics Framework from 'The Ethics of Intelligence'.",
    price: 24.99,
    image: "/images/Wpzvvvy3Lrw1.jpg",
  },
  {
    id: "item-3",
    title: "Leadership Journal",
    description: "Premium leather-bound journal with prompts and exercises from 'Leading with Purpose'.",
    price: 39.99,
    image: "/images/0KGeBi7iJ3Dr.jpg",
  },
];

export default function Books() {
  const [email, setEmail] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handlePreorder = (book: Book) => {
    toast.success(`Pre-order confirmed for "${book.title}"! You'll receive an email when it ships.`);
    setSelectedBook(null);
  };

  const handleOrder = (book: Book) => {
    toast.success(`"${book.title}" added to cart!`);
  };

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("You'll be notified when new books are available!");
    setEmail("");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                Published Works
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: "oklch(0.25 0.01 50)" }}>
                Books & Resources
              </h1>
              <p className="font-body text-xl leading-relaxed mb-8" style={{ color: "oklch(0.35 0.01 50)" }}>
                Explore Dakota's published works on AI ethics, leadership, and philosophy. 
                Each book offers practical wisdom drawn from years of research and global experience.
              </p>
              <div className="flex items-center gap-4">
                <BookOpen size={24} style={{ color: "oklch(0.62 0.12 45)" }} />
                <span className="font-body text-lg" style={{ color: "oklch(0.45 0.01 50)" }}>
                  5 Books · 3 Available · 2 Coming Soon
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/hero-books.png"
                  alt="Dakota Rea's books"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Available Books */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.94 0.01 90)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
              Available Now
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.25 0.01 50)" }}>
              Current Titles
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
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="aspect-[3/2] overflow-hidden shadow-lg">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                    {book.title}
                  </h3>
                  <p className="font-body text-lg italic mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                    {book.subtitle}
                  </p>
                  <p className="font-body text-base leading-relaxed mb-6" style={{ color: "oklch(0.45 0.01 50)" }}>
                    {book.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    {book.reviews && (
                      <div className="flex items-center gap-1">
                        <Star size={16} fill="oklch(0.62 0.12 45)" style={{ color: "oklch(0.62 0.12 45)" }} />
                        <span className="font-sans text-sm font-medium" style={{ color: "oklch(0.25 0.01 50)" }}>
                          {book.reviews.rating}
                        </span>
                        <span className="font-sans text-sm" style={{ color: "oklch(0.55 0.01 50)" }}>
                          ({book.reviews.count} reviews)
                        </span>
                      </div>
                    )}
                    <span className="font-sans text-sm" style={{ color: "oklch(0.55 0.01 50)" }}>
                      {book.pages} pages
                    </span>
                    <span className="font-sans text-sm" style={{ color: "oklch(0.55 0.01 50)" }}>
                      ISBN: {book.isbn}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-2xl font-bold" style={{ color: "oklch(0.25 0.01 50)" }}>
                      ${book.price}
                    </span>
                    <Button
                      onClick={() => handleOrder(book)}
                      className="font-sans text-sm font-semibold tracking-wide uppercase"
                      style={{ backgroundColor: "oklch(0.25 0.01 50)", color: "oklch(0.97 0.01 90)" }}
                    >
                      <ShoppingCart size={16} className="mr-2" />
                      Order Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-order Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
              Coming Soon
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "oklch(0.25 0.01 50)" }}>
              Pre-Order Upcoming Titles
            </h2>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "oklch(0.45 0.01 50)" }}>
              Be among the first to receive Dakota's newest works. Pre-order now and 
              get exclusive early access and signed copies.
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
                className="border overflow-hidden"
                style={{ borderColor: "oklch(0.88 0.01 90)", backgroundColor: "oklch(0.99 0.005 90)" }}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={14} style={{ color: "oklch(0.62 0.12 45)" }} />
                    <span className="font-sans text-xs font-medium tracking-wide uppercase" style={{ color: "oklch(0.62 0.12 45)" }}>
                      {book.releaseDate}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                    {book.title}
                  </h3>
                  <p className="font-body text-sm italic mb-3" style={{ color: "oklch(0.55 0.01 50)" }}>
                    {book.subtitle}
                  </p>
                  <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "oklch(0.45 0.01 50)" }}>
                    {book.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-bold" style={{ color: "oklch(0.25 0.01 50)" }}>
                      ${book.price}
                    </span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="font-sans text-sm font-semibold tracking-wide uppercase"
                          style={{ backgroundColor: "oklch(0.62 0.12 45)", color: "oklch(0.99 0.005 90)" }}
                        >
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
                          <p className="font-body text-sm" style={{ color: "oklch(0.45 0.01 50)" }}>
                            Pre-order includes:
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2 font-body text-sm">
                              <span style={{ color: "oklch(0.65 0.05 145)" }}>✓</span>
                              Signed first edition
                            </li>
                            <li className="flex items-center gap-2 font-body text-sm">
                              <span style={{ color: "oklch(0.65 0.05 145)" }}>✓</span>
                              Early access to digital chapters
                            </li>
                            <li className="flex items-center gap-2 font-body text-sm">
                              <span style={{ color: "oklch(0.65 0.05 145)" }}>✓</span>
                              Exclusive author Q&A invitation
                            </li>
                          </ul>
                          <div className="flex justify-between items-center pt-4 border-t">
                            <span className="font-display text-xl font-bold">${book.price}</span>
                            <Button
                              onClick={() => handlePreorder(book)}
                              className="font-sans text-sm font-semibold"
                              style={{ backgroundColor: "oklch(0.25 0.01 50)", color: "oklch(0.97 0.01 90)" }}
                            >
                              Confirm Pre-Order
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Items */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "oklch(0.25 0.01 50)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
              Shop
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "oklch(0.97 0.01 90)" }}>
              Bundles & Merchandise
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {otherItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden"
                style={{ backgroundColor: "oklch(0.97 0.01 90)" }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold mb-2" style={{ color: "oklch(0.25 0.01 50)" }}>
                    {item.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "oklch(0.45 0.01 50)" }}>
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-lg font-bold" style={{ color: "oklch(0.25 0.01 50)" }}>
                        ${item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="font-body text-sm line-through" style={{ color: "oklch(0.55 0.01 50)" }}>
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => toast.success(`${item.title} added to cart!`)}
                      size="sm"
                      className="font-sans text-xs font-semibold tracking-wide uppercase"
                      style={{ backgroundColor: "oklch(0.25 0.01 50)", color: "oklch(0.97 0.01 90)" }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-sans text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "oklch(0.62 0.12 45)" }}>
                Stay Updated
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "oklch(0.25 0.01 50)" }}>
                Get Notified About New Releases
              </h2>
              <p className="font-body text-lg mb-8" style={{ color: "oklch(0.45 0.01 50)" }}>
                Join the mailing list to receive updates on new books, exclusive content, 
                and early access opportunities.
              </p>
              <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="font-body flex-1"
                />
                <Button
                  type="submit"
                  className="font-sans text-sm font-semibold tracking-wide uppercase"
                  style={{ backgroundColor: "oklch(0.25 0.01 50)", color: "oklch(0.97 0.01 90)" }}
                >
                  Subscribe
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
