import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, json, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  /** Stripe customer ID for payment processing */
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Subscribers table for newsletter/member sign-in (no Manus account required)
 */
export const subscribers = mysqlTable("subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  firstName: varchar("firstName", { length: 255 }),
  lastName: varchar("lastName", { length: 255 }),
  /** Hashed password for member sign-in */
  passwordHash: varchar("passwordHash", { length: 255 }),
  /** Verification token for email confirmation */
  verificationToken: varchar("verificationToken", { length: 255 }),
  /** Whether email is verified */
  isVerified: int("isVerified").default(0).notNull(),
  /** Whether subscriber is active */
  isActive: int("isActive").default(1).notNull(),
  /** Subscription tags/interests */
  tags: json("tags"),
  /** Last login timestamp */
  lastLoginAt: timestamp("lastLoginAt"),
  /** Session token for subscriber auth */
  sessionToken: varchar("sessionToken", { length: 255 }),
  sessionExpiresAt: timestamp("sessionExpiresAt"),
  /** Stripe customer ID for subscription billing */
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  /** Stripe subscription ID */
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  /** Membership plan ID (insider, strategist) */
  membershipPlan: varchar("membershipPlan", { length: 50 }),
  /** Membership status */
  membershipStatus: mysqlEnum("membershipStatus", ["active", "cancelled", "past_due", "trialing"]),
  /** Membership period end */
  membershipEndsAt: timestamp("membershipEndsAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = typeof subscribers.$inferInsert;

/**
 * Email logs table for tracking sent emails and autoresponders
 */
export const emailLogs = mysqlTable("email_logs", {
  id: int("id").autoincrement().primaryKey(),
  /** Recipient email */
  toEmail: varchar("toEmail", { length: 320 }).notNull(),
  /** Sender email */
  fromEmail: varchar("fromEmail", { length: 320 }).notNull(),
  /** Email subject */
  subject: varchar("subject", { length: 500 }).notNull(),
  /** Email type/template */
  emailType: varchar("emailType", { length: 100 }).notNull(),
  /** Status of the email */
  status: mysqlEnum("status", ["pending", "sent", "failed", "bounced"]).default("pending").notNull(),
  /** Error message if failed */
  errorMessage: text("errorMessage"),
  /** Reference ID (subscriber ID, booking ID, etc.) */
  referenceId: int("referenceId"),
  /** Reference type */
  referenceType: varchar("referenceType", { length: 100 }),
  sentAt: timestamp("sentAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type EmailLog = typeof emailLogs.$inferSelect;
export type InsertEmailLog = typeof emailLogs.$inferInsert;

/**
 * Products table for books and merchandise
 */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("imageUrl"),
  category: mysqlEnum("category", ["book", "preorder", "merchandise"]).notNull(),
  /** Stripe Price ID for checkout */
  stripePriceId: varchar("stripePriceId", { length: 255 }),
  /** Stock quantity (-1 for unlimited/digital) */
  stock: int("stock").default(-1),
  isActive: int("isActive").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Cart items table for shopping cart
 */
export const cartItems = mysqlTable("cart_items", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productId: int("productId").notNull(),
  quantity: int("quantity").notNull().default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = typeof cartItems.$inferInsert;

/**
 * Orders table for completed purchases
 * Following Stripe best practices: store only essential IDs, fetch details from Stripe API
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  /** Stripe Checkout Session ID */
  stripeSessionId: varchar("stripeSessionId", { length: 255 }),
  /** Stripe Payment Intent ID for tracking */
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  /** Order status */
  status: mysqlEnum("status", ["pending", "paid", "shipped", "delivered", "cancelled"]).default("pending").notNull(),
  /** Shipping address (business-specific, not in Stripe) */
  shippingAddress: json("shippingAddress"),
  /** Order items snapshot at time of purchase */
  items: json("items"),
  /** Total amount in cents for quick reference */
  totalAmount: int("totalAmount"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Blog posts table for auto-generated SEO content
 */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  keywords: json("keywords"),
  sources: json("sources"),
  author: varchar("author", { length: 255 }).default("Dakota Rea").notNull(),
  readTime: int("readTime").default(5),
  isPublished: int("isPublished").default(1),
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * Booking requests table for meeting scheduling
 */
export const bookingRequests = mysqlTable("booking_requests", {
  id: int("id").autoincrement().primaryKey(),
  /** Type of meeting: strategy, speaking, consulting */
  meetingType: varchar("meetingType", { length: 50 }).notNull(),
  /** Requested date */
  requestedDate: timestamp("requestedDate").notNull(),
  /** Requested time slot */
  requestedTime: varchar("requestedTime", { length: 10 }).notNull(),
  /** Requester's name */
  name: varchar("name", { length: 255 }).notNull(),
  /** Requester's email */
  email: varchar("email", { length: 320 }).notNull(),
  /** Requester's company (optional) */
  company: varchar("company", { length: 255 }),
  /** Message/notes from requester */
  message: text("message"),
  /** Status of the booking request */
  status: mysqlEnum("status", ["pending", "confirmed", "declined", "cancelled"]).default("pending").notNull(),
  /** Admin notes */
  adminNotes: text("adminNotes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BookingRequest = typeof bookingRequests.$inferSelect;
export type InsertBookingRequest = typeof bookingRequests.$inferInsert;
