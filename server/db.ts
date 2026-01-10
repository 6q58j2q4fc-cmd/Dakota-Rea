import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, cartItems, orders, InsertCartItem, InsertOrder } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ==================== CART OPERATIONS ====================

/**
 * Get all cart items for a user
 */
export async function getCartItems(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get cart items: database not available");
    return [];
  }

  const result = await db.select().from(cartItems).where(eq(cartItems.userId, userId));
  return result;
}

/**
 * Add item to cart or update quantity if exists
 */
export async function addToCart(userId: number, productId: string, quantity: number = 1) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Check if item already exists in cart
  const existing = await db.select()
    .from(cartItems)
    .where(and(
      eq(cartItems.userId, userId),
      eq(cartItems.productId, parseInt(productId) || 0)
    ))
    .limit(1);

  if (existing.length > 0) {
    // Update quantity
    const newQuantity = existing[0].quantity + quantity;
    await db.update(cartItems)
      .set({ quantity: newQuantity })
      .where(eq(cartItems.id, existing[0].id));
    return { ...existing[0], quantity: newQuantity };
  } else {
    // Insert new item
    const result = await db.insert(cartItems).values({
      userId,
      productId: parseInt(productId) || 0,
      quantity,
    });
    return { id: result[0].insertId, userId, productId: parseInt(productId), quantity };
  }
}

/**
 * Update cart item quantity
 */
export async function updateCartItemQuantity(userId: number, cartItemId: number, quantity: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    await db.delete(cartItems)
      .where(and(
        eq(cartItems.id, cartItemId),
        eq(cartItems.userId, userId)
      ));
    return null;
  }

  await db.update(cartItems)
    .set({ quantity })
    .where(and(
      eq(cartItems.id, cartItemId),
      eq(cartItems.userId, userId)
    ));
  
  return { id: cartItemId, quantity };
}

/**
 * Remove item from cart
 */
export async function removeFromCart(userId: number, cartItemId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.delete(cartItems)
    .where(and(
      eq(cartItems.id, cartItemId),
      eq(cartItems.userId, userId)
    ));
  
  return true;
}

/**
 * Clear all items from user's cart
 */
export async function clearCart(userId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.delete(cartItems).where(eq(cartItems.userId, userId));
  return true;
}

// ==================== ORDER OPERATIONS ====================

/**
 * Create a new order
 */
export async function createOrder(order: InsertOrder) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(orders).values(order);
  return { id: result[0].insertId, ...order };
}

/**
 * Get orders for a user
 */
export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get orders: database not available");
    return [];
  }

  const result = await db.select().from(orders).where(eq(orders.userId, userId));
  return result;
}

/**
 * Update order status
 */
export async function updateOrderStatus(orderId: number, status: "pending" | "paid" | "shipped" | "delivered" | "cancelled") {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(orders).set({ status }).where(eq(orders.id, orderId));
  return true;
}

/**
 * Update order with Stripe payment intent
 */
export async function updateOrderPayment(sessionId: string, paymentIntentId: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(orders)
    .set({ 
      stripePaymentIntentId: paymentIntentId,
      status: "paid"
    })
    .where(eq(orders.stripeSessionId, sessionId));
  
  return true;
}

/**
 * Get order by Stripe session ID
 */
export async function getOrderBySessionId(sessionId: string) {
  const db = await getDb();
  if (!db) {
    return null;
  }

  const result = await db.select().from(orders).where(eq(orders.stripeSessionId, sessionId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

/**
 * Update user's Stripe customer ID
 */
export async function updateUserStripeCustomerId(userId: number, stripeCustomerId: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(users).set({ stripeCustomerId }).where(eq(users.id, userId));
  return true;
}

// ==================== BLOG OPERATIONS ====================

/**
 * Create a new blog post
 */
export async function createBlogPost(post: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  keywords: string[];
  sources: { name: string; url: string }[];
  author?: string;
  readTime?: number;
}) {
  const db = await getDb();
  if (!db) return null;
  
  const { blogPosts } = await import("../drizzle/schema");
  const result = await db.insert(blogPosts).values({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    keywords: post.keywords,
    sources: post.sources,
    author: post.author || "Dakota Rea",
    readTime: post.readTime || 5,
    isPublished: 1,
    publishedAt: new Date(),
  });
  return { id: result[0].insertId, ...post };
}

/**
 * Get all blog posts, optionally filtered by category
 */
export async function getBlogPosts(category?: string) {
  const db = await getDb();
  if (!db) return [];
  
  const { blogPosts } = await import("../drizzle/schema");
  const { desc } = await import("drizzle-orm");
  
  if (category) {
    return db.select().from(blogPosts)
      .where(eq(blogPosts.category, category))
      .orderBy(desc(blogPosts.publishedAt));
  }
  return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
}

/**
 * Get a single blog post by ID
 */
export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const { blogPosts } = await import("../drizzle/schema");
  
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result[0] || null;
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  
  const { blogPosts } = await import("../drizzle/schema");
  
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result[0] || null;
}


// ==================== BOOKING OPERATIONS ====================

/**
 * Create a new booking request
 */
export async function createBookingRequest(booking: {
  meetingType: string;
  requestedDate: Date;
  requestedTime: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
}) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  const { bookingRequests } = await import("../drizzle/schema");
  const result = await db.insert(bookingRequests).values({
    meetingType: booking.meetingType,
    requestedDate: booking.requestedDate,
    requestedTime: booking.requestedTime,
    name: booking.name,
    email: booking.email,
    company: booking.company || null,
    message: booking.message || null,
    status: "pending",
  });
  return { id: result[0].insertId, ...booking };
}

/**
 * Get all booking requests
 */
export async function getBookingRequests(status?: string) {
  const db = await getDb();
  if (!db) return [];
  
  const { bookingRequests } = await import("../drizzle/schema");
  const { desc } = await import("drizzle-orm");
  
  if (status) {
    return db.select().from(bookingRequests)
      .where(eq(bookingRequests.status, status as "pending" | "confirmed" | "declined" | "cancelled"))
      .orderBy(desc(bookingRequests.createdAt));
  }
  return db.select().from(bookingRequests).orderBy(desc(bookingRequests.createdAt));
}

/**
 * Update booking request status
 */
export async function updateBookingStatus(
  bookingId: number, 
  status: "pending" | "confirmed" | "declined" | "cancelled",
  adminNotes?: string
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  const { bookingRequests } = await import("../drizzle/schema");
  await db.update(bookingRequests)
    .set({ status, adminNotes: adminNotes || null })
    .where(eq(bookingRequests.id, bookingId));
  return true;
}
