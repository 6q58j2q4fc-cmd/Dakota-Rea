/**
 * Subscriber Authentication Service
 * Custom member sign-in system that does NOT require Manus accounts
 * Uses email/password with bcrypt hashing and JWT session tokens
 */

import { getDb } from "./db";
import crypto from "crypto";

// Simple password hashing using Node's built-in crypto (no bcrypt dependency needed)
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(":");
  const verifyHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return hash === verifyHash;
}

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// ==================== SUBSCRIBER OPERATIONS ====================

/**
 * Register a new subscriber with email/password
 */
export async function registerSubscriber(data: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { subscribers } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");

  // Check if email already exists
  const existing = await db.select()
    .from(subscribers)
    .where(eq(subscribers.email, data.email.toLowerCase()))
    .limit(1);

  if (existing.length > 0) {
    throw new Error("Email already registered");
  }

  const passwordHash = hashPassword(data.password);
  const verificationToken = generateToken();

  const result = await db.insert(subscribers).values({
    email: data.email.toLowerCase(),
    passwordHash,
    firstName: data.firstName || null,
    lastName: data.lastName || null,
    verificationToken,
    isVerified: 0,
    isActive: 1,
    tags: data.tags || [],
  });

  return {
    id: result[0].insertId,
    email: data.email.toLowerCase(),
    firstName: data.firstName,
    verificationToken,
  };
}

/**
 * Login subscriber with email/password
 */
export async function loginSubscriber(email: string, password: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { subscribers } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");

  const result = await db.select()
    .from(subscribers)
    .where(eq(subscribers.email, email.toLowerCase()))
    .limit(1);

  if (result.length === 0) {
    throw new Error("Invalid email or password");
  }

  const subscriber = result[0];

  if (!subscriber.isActive) {
    throw new Error("Account is deactivated");
  }

  if (!subscriber.passwordHash) {
    throw new Error("No password set. Please use the password reset flow.");
  }

  const isValid = verifyPassword(password, subscriber.passwordHash);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  // Generate session token
  const sessionToken = generateToken();
  const sessionExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  await db.update(subscribers)
    .set({
      sessionToken,
      sessionExpiresAt,
      lastLoginAt: new Date(),
    })
    .where(eq(subscribers.id, subscriber.id));

  return {
    id: subscriber.id,
    email: subscriber.email,
    firstName: subscriber.firstName,
    lastName: subscriber.lastName,
    isVerified: subscriber.isVerified,
    sessionToken,
    sessionExpiresAt,
  };
}

/**
 * Verify subscriber session token
 */
export async function verifySubscriberSession(sessionToken: string) {
  const db = await getDb();
  if (!db) return null;

  const { subscribers } = await import("../drizzle/schema");
  const { eq, and, gt } = await import("drizzle-orm");

  const result = await db.select()
    .from(subscribers)
    .where(and(
      eq(subscribers.sessionToken, sessionToken),
      gt(subscribers.sessionExpiresAt, new Date())
    ))
    .limit(1);

  if (result.length === 0) return null;
  
  const sub = result[0];
  return {
    id: sub.id,
    email: sub.email,
    firstName: sub.firstName,
    lastName: sub.lastName,
    isVerified: sub.isVerified,
    tags: sub.tags,
  };
}

/**
 * Logout subscriber
 */
export async function logoutSubscriber(sessionToken: string) {
  const db = await getDb();
  if (!db) return;

  const { subscribers } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");

  await db.update(subscribers)
    .set({ sessionToken: null, sessionExpiresAt: null })
    .where(eq(subscribers.sessionToken, sessionToken));
}

/**
 * Verify email with token
 */
export async function verifySubscriberEmail(token: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { subscribers } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");

  const result = await db.select()
    .from(subscribers)
    .where(eq(subscribers.verificationToken, token))
    .limit(1);

  if (result.length === 0) {
    throw new Error("Invalid or expired verification token");
  }

  const subscriber = result[0];

  await db.update(subscribers)
    .set({ isVerified: 1, verificationToken: null })
    .where(eq(subscribers.id, subscriber.id));

  return {
    id: subscriber.id,
    email: subscriber.email,
    firstName: subscriber.firstName,
  };
}

/**
 * Generate password reset token
 */
export async function generatePasswordResetToken(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { subscribers } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");

  const result = await db.select()
    .from(subscribers)
    .where(eq(subscribers.email, email.toLowerCase()))
    .limit(1);

  if (result.length === 0) {
    // Don't reveal if email exists
    return null;
  }

  const resetToken = generateToken();

  // Store reset token in verificationToken field temporarily
  await db.update(subscribers)
    .set({ verificationToken: `reset:${resetToken}` })
    .where(eq(subscribers.id, result[0].id));

  return {
    email: result[0].email,
    firstName: result[0].firstName || undefined,
    resetToken,
  };
}

/**
 * Reset password with token
 */
export async function resetSubscriberPassword(token: string, newPassword: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { subscribers } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");

  const result = await db.select()
    .from(subscribers)
    .where(eq(subscribers.verificationToken, `reset:${token}`))
    .limit(1);

  if (result.length === 0) {
    throw new Error("Invalid or expired reset token");
  }

  const passwordHash = hashPassword(newPassword);

  await db.update(subscribers)
    .set({ passwordHash, verificationToken: null })
    .where(eq(subscribers.id, result[0].id));

  return { success: true };
}

/**
 * Subscribe email without password (newsletter only)
 */
export async function subscribeEmail(data: {
  email: string;
  firstName?: string;
  tags?: string[];
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { subscribers } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");

  // Check if already subscribed
  const existing = await db.select()
    .from(subscribers)
    .where(eq(subscribers.email, data.email.toLowerCase()))
    .limit(1);

  if (existing.length > 0) {
    // Update tags if provided
    if (data.tags && data.tags.length > 0) {
      const currentTags = (existing[0].tags as string[]) || [];
      const combined = [...currentTags, ...data.tags];
      const newTags = combined.filter((tag, index) => combined.indexOf(tag) === index);
      await db.update(subscribers)
        .set({ tags: newTags, isActive: 1 })
        .where(eq(subscribers.id, existing[0].id));
    }
    return { id: existing[0].id, email: existing[0].email, alreadySubscribed: true };
  }

  const result = await db.insert(subscribers).values({
    email: data.email.toLowerCase(),
    firstName: data.firstName || null,
    isVerified: 1, // Auto-verify newsletter-only subscribers
    isActive: 1,
    tags: data.tags || ["newsletter"],
  });

  return {
    id: result[0].insertId,
    email: data.email.toLowerCase(),
    alreadySubscribed: false,
  };
}

/**
 * Get subscriber by ID
 */
export async function getSubscriberById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const { subscribers } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");

  const result = await db.select()
    .from(subscribers)
    .where(eq(subscribers.id, id))
    .limit(1);

  return result[0] || null;
}
