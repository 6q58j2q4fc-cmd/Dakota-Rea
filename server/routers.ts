import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { fetchAINews } from "./news";
import { chatWithAlfred, getAlfredGreeting } from "./alfred";
import { PRODUCTS, getProductById, formatPrice } from "./products";
import { 
  getCartItems, 
  addToCart, 
  updateCartItemQuantity, 
  removeFromCart, 
  clearCart,
  createOrder,
  getUserOrders,
  updateUserStripeCustomerId,
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  createBookingRequest
} from "./db";
import { sendBookingNotificationToAdmin, sendBookingConfirmationToRequester } from "./emailService";
import { generateBlogPost, getRandomTopic, getRandomKeywords } from "./blog";
import Stripe from "stripe";
import { ENV } from "./_core/env";

// Initialize Stripe
const stripe = new Stripe(ENV.stripeSecretKey || "", {
  apiVersion: "2025-12-15.clover",
});

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // AI News router for dynamic news feed
  news: router({
    getLatest: publicProcedure
      .input(z.object({
        category: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        const category = input?.category;
        const result = await fetchAINews(category);
        return result;
      }),
  }),

  // Products router
  products: router({
    list: publicProcedure.query(() => {
      return PRODUCTS.map(p => ({
        ...p,
        formattedPrice: formatPrice(p.price),
      }));
    }),
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(({ input }) => {
        const product = getProductById(input.id);
        if (!product) return null;
        return {
          ...product,
          formattedPrice: formatPrice(product.price),
        };
      }),
    getByCategory: publicProcedure
      .input(z.object({ category: z.enum(["book", "preorder", "merchandise"]) }))
      .query(({ input }) => {
        return PRODUCTS
          .filter(p => p.category === input.category)
          .map(p => ({
            ...p,
            formattedPrice: formatPrice(p.price),
          }));
      }),
  }),

  // Cart router
  cart: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      const items = await getCartItems(ctx.user.id);
      // Map cart items to include product details
      const cartWithProducts = items.map(item => {
        const product = PRODUCTS.find(p => p.id === item.productId.toString() || PRODUCTS.indexOf(p) + 1 === item.productId);
        return {
          ...item,
          product: product ? {
            ...product,
            formattedPrice: formatPrice(product.price),
          } : null,
        };
      }).filter(item => item.product !== null);
      
      // Calculate totals
      const subtotal = cartWithProducts.reduce((sum, item) => {
        return sum + (item.product?.price || 0) * item.quantity;
      }, 0);
      
      return {
        items: cartWithProducts,
        subtotal,
        formattedSubtotal: formatPrice(subtotal),
        itemCount: cartWithProducts.reduce((sum, item) => sum + item.quantity, 0),
      };
    }),

    add: protectedProcedure
      .input(z.object({
        productId: z.string(),
        quantity: z.number().min(1).default(1),
      }))
      .mutation(async ({ ctx, input }) => {
        // Verify product exists
        const product = getProductById(input.productId);
        if (!product) {
          throw new Error("Product not found");
        }
        
        // Get product index + 1 as the numeric ID
        const productIndex = PRODUCTS.findIndex(p => p.id === input.productId) + 1;
        
        const result = await addToCart(ctx.user.id, productIndex.toString(), input.quantity);
        return {
          success: true,
          item: result,
          product: {
            ...product,
            formattedPrice: formatPrice(product.price),
          },
        };
      }),

    updateQuantity: protectedProcedure
      .input(z.object({
        cartItemId: z.number(),
        quantity: z.number().min(0),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await updateCartItemQuantity(ctx.user.id, input.cartItemId, input.quantity);
        return { success: true, item: result };
      }),

    remove: protectedProcedure
      .input(z.object({ cartItemId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await removeFromCart(ctx.user.id, input.cartItemId);
        return { success: true };
      }),

    clear: protectedProcedure.mutation(async ({ ctx }) => {
      await clearCart(ctx.user.id);
      return { success: true };
    }),
  }),

  // Checkout router
  checkout: router({
    createSession: protectedProcedure
      .input(z.object({
        successUrl: z.string().optional(),
        cancelUrl: z.string().optional(),
      }).optional())
      .mutation(async ({ ctx, input }) => {
        // Get cart items
        const cartItemsData = await getCartItems(ctx.user.id);
        
        if (cartItemsData.length === 0) {
          throw new Error("Cart is empty");
        }

        // Build line items for Stripe
        const lineItems = cartItemsData.map(item => {
          const product = PRODUCTS.find(p => p.id === item.productId.toString() || PRODUCTS.indexOf(p) + 1 === item.productId);
          if (!product) {
            throw new Error(`Product not found: ${item.productId}`);
          }
          
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
                description: product.description,
                images: product.imageUrl ? [`${ctx.req.headers.origin}${product.imageUrl}`] : [],
              },
              unit_amount: product.price,
            },
            quantity: item.quantity,
          };
        });

        // Calculate total
        const totalAmount = lineItems.reduce((sum, item) => {
          return sum + (item.price_data.unit_amount * item.quantity);
        }, 0);

        // Create order in database
        const order = await createOrder({
          userId: ctx.user.id,
          status: "pending",
          items: JSON.stringify(cartItemsData.map(item => {
            const product = PRODUCTS.find(p => p.id === item.productId.toString() || PRODUCTS.indexOf(p) + 1 === item.productId);
            return {
              productId: item.productId,
              productName: product?.name,
              quantity: item.quantity,
              price: product?.price,
            };
          })),
          totalAmount,
        });

        // Create Stripe checkout session
        const origin = ctx.req.headers.origin || "http://localhost:3000";
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url: input?.successUrl || `${origin}/orders?success=true&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: input?.cancelUrl || `${origin}/cart?cancelled=true`,
          customer_email: ctx.user.email || undefined,
          client_reference_id: ctx.user.id.toString(),
          metadata: {
            user_id: ctx.user.id.toString(),
            customer_email: ctx.user.email || "",
            customer_name: ctx.user.name || "",
            order_id: order.id?.toString() || "",
          },
          allow_promotion_codes: true,
        });

        // Update order with session ID
        if (order.id) {
          const db = await import("./db").then(m => m.getDb());
          if (db) {
            const { orders } = await import("../drizzle/schema");
            const { eq } = await import("drizzle-orm");
            await db.update(orders)
              .set({ stripeSessionId: session.id })
              .where(eq(orders.id, order.id));
          }
        }

        return {
          sessionId: session.id,
          url: session.url,
        };
      }),
  }),

  // Alfred AI Chatbot router
  alfred: router({
    greeting: publicProcedure.query(() => {
      return getAlfredGreeting();
    }),
    
    chat: publicProcedure
      .input(z.object({
        message: z.string().min(1).max(2000),
        history: z.array(z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string(),
          timestamp: z.string().or(z.date()),
        })).optional(),
      }))
      .mutation(async ({ input }) => {
        const history = input.history?.map(h => ({
          role: h.role as "user" | "assistant",
          content: h.content,
          timestamp: new Date(h.timestamp),
        })) || [];
        
        const response = await chatWithAlfred(input.message, history);
        return response;
      }),
  }),

  // Blog router for auto-generated SEO content
  blog: router({
    list: publicProcedure
      .input(z.object({
        category: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        const posts = await getBlogPosts(input?.category);
        return posts.map(post => ({
          id: post.id.toString(),
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || "",
          category: post.category,
          author: post.author,
          readTime: post.readTime || 5,
          publishedAt: post.publishedAt,
          keywords: (post.keywords as string[]) || [],
        }));
      }),

    get: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        const post = await getBlogPostById(parseInt(input.id));
        if (!post) return null;
        return {
          id: post.id.toString(),
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || "",
          content: post.content,
          category: post.category,
          author: post.author,
          readTime: post.readTime || 5,
          publishedAt: post.publishedAt,
          keywords: (post.keywords as string[]) || [],
          sources: (post.sources as { name: string; url: string }[]) || [],
        };
      }),

    generate: publicProcedure.mutation(async () => {
      const { topic, category } = getRandomTopic();
      const keywords = getRandomKeywords(5);
      
      const post = await generateBlogPost(topic, category, keywords);
      
      // Save to database
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
      
      return {
        success: true,
        post: {
          id: saved?.id?.toString() || post.id,
          title: post.title,
          slug: post.slug,
        },
      };
    }),
  }),

  // Newsletter subscription router (delegates to subscriber.subscribe)
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
        firstName: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }))
      .mutation(async ({ input }) => {
        const { subscribeEmail } = await import("./subscriberAuth");
        const { sendWelcomeEmail } = await import("./emailService");
        const result = await subscribeEmail(input);
        if (!result.alreadySubscribed) {
          sendWelcomeEmail({ email: result.email, firstName: input.firstName }).catch(console.error);
        }
        return {
          success: true,
          message: result.alreadySubscribed
            ? "You're already subscribed!"
            : "Successfully subscribed! Check your email for a welcome message.",
        };
      }),
  }),

  // Booking router for meeting requests
  booking: router({
    request: publicProcedure
      .input(z.object({
        meetingType: z.enum(["strategy", "speaking", "consulting"]),
        date: z.string(),
        time: z.string(),
        name: z.string().min(1),
        email: z.string().email(),
        company: z.string().optional(),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Parse the date
        const requestedDate = new Date(input.date);
        
        // Create booking request in database
        const booking = await createBookingRequest({
          meetingType: input.meetingType,
          requestedDate,
          requestedTime: input.time,
          name: input.name,
          email: input.email,
          company: input.company,
          message: input.message,
        });
        
        // Format date for emails
        const formattedDate = requestedDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        
        // Send notification emails
        const emailData = {
          meetingType: input.meetingType,
          date: formattedDate,
          time: input.time,
          name: input.name,
          email: input.email,
          company: input.company,
          message: input.message,
        };
        
        // Send emails (non-blocking)
        sendBookingNotificationToAdmin(emailData).catch(console.error);
        sendBookingConfirmationToRequester(emailData).catch(console.error);
        
        // Also notify owner via Manus notification system
        const { notifyOwner } = await import("./_core/notification");
        notifyOwner({
          title: `📅 New Booking: ${input.name} - ${input.meetingType}`,
          content: `Name: ${input.name}\nEmail: ${input.email}\nDate: ${formattedDate}\nTime: ${input.time}${input.company ? `\nCompany: ${input.company}` : ""}${input.message ? `\nMessage: ${input.message}` : ""}`,
        }).catch(console.error);
        
        return {
          success: true,
          bookingId: booking.id,
          message: "Booking request submitted successfully",
        };
      }),
  }),

  // Subscriber router - custom member sign-in (no Manus account required)
  subscriber: router({
    register: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(8),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { registerSubscriber } = await import("./subscriberAuth");
        const { sendVerificationEmail } = await import("./emailService");
        const sub = await registerSubscriber(input);
        // Send verification email
        sendVerificationEmail({
          email: sub.email,
          firstName: sub.firstName,
          verificationToken: sub.verificationToken,
        }).catch(console.error);
        return { success: true, message: "Registration successful. Please check your email to verify your account." };
      }),

    login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { loginSubscriber } = await import("./subscriberAuth");
        const session = await loginSubscriber(input.email, input.password);
        // Set session cookie
        ctx.res.cookie("sub_session", session.sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        return {
          success: true,
          user: {
            id: session.id,
            email: session.email,
            firstName: session.firstName,
            lastName: session.lastName,
            isVerified: session.isVerified,
          },
        };
      }),

    logout: publicProcedure.mutation(async ({ ctx }) => {
      const sessionToken = ctx.req.cookies?.sub_session;
      if (sessionToken) {
        const { logoutSubscriber } = await import("./subscriberAuth");
        await logoutSubscriber(sessionToken);
        ctx.res.clearCookie("sub_session");
      }
      return { success: true };
    }),

    me: publicProcedure.query(async ({ ctx }) => {
      const sessionToken = ctx.req.cookies?.sub_session;
      if (!sessionToken) return null;
      const { verifySubscriberSession } = await import("./subscriberAuth");
      return verifySubscriberSession(sessionToken);
    }),

    verifyEmail: publicProcedure
      .input(z.object({ token: z.string() }))
      .mutation(async ({ input }) => {
        const { verifySubscriberEmail } = await import("./subscriberAuth");
        const { sendWelcomeEmail } = await import("./emailService");
        const sub = await verifySubscriberEmail(input.token);
        sendWelcomeEmail({ email: sub.email, firstName: sub.firstName || undefined }).catch(console.error);
        return { success: true, message: "Email verified successfully!" };
      }),

    forgotPassword: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        const { generatePasswordResetToken } = await import("./subscriberAuth");
        const { sendPasswordResetEmail } = await import("./emailService");
        const result = await generatePasswordResetToken(input.email);
        if (result) {
          sendPasswordResetEmail({
            email: result.email,
            firstName: result.firstName,
            resetToken: result.resetToken,
          }).catch(console.error);
        }
        // Always return success to prevent email enumeration
        return { success: true, message: "If that email exists, a reset link has been sent." };
      }),

    resetPassword: publicProcedure
      .input(z.object({ token: z.string(), password: z.string().min(8) }))
      .mutation(async ({ input }) => {
        const { resetSubscriberPassword } = await import("./subscriberAuth");
        return resetSubscriberPassword(input.token, input.password);
      }),

    // Newsletter-only subscribe (no password)
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
        firstName: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }))
      .mutation(async ({ input }) => {
        const { subscribeEmail } = await import("./subscriberAuth");
        const { sendWelcomeEmail } = await import("./emailService");
        const result = await subscribeEmail(input);
        if (!result.alreadySubscribed) {
          sendWelcomeEmail({ email: result.email, firstName: input.firstName }).catch(console.error);
        }
        return {
          success: true,
          message: result.alreadySubscribed
            ? "You're already subscribed!"
            : "Successfully subscribed! Check your email for a welcome message.",
        };
      }),
  }),

  // Admin router - protected by admin role check
  admin: router({
    // Get all subscribers with stats
    getSubscribers: protectedProcedure
      .input(z.object({
        page: z.number().default(1),
        limit: z.number().default(50),
        search: z.string().optional(),
        tag: z.string().optional(),
        isVerified: z.boolean().optional(),
        isActive: z.boolean().optional(),
      }).optional())
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') throw new Error('Forbidden');
        const { getDb } = await import('./db');
        const { subscribers } = await import('../drizzle/schema');
        const { eq, like, and, desc, count, sql } = await import('drizzle-orm');
        const database = await getDb();
        if (!database) return { subscribers: [], total: 0, stats: { total: 0, verified: 0, active: 0, withPassword: 0 } };
        
        const page = input?.page || 1;
        const limit = input?.limit || 50;
        const offset = (page - 1) * limit;
        
        const allSubs = await database.select().from(subscribers)
          .orderBy(desc(subscribers.createdAt))
          .limit(limit)
          .offset(offset);
        
        const totalResult = await database.select({ count: count() }).from(subscribers);
        const total = totalResult[0]?.count || 0;
        
        const statsResult = await database.select({
          total: count(),
          verified: sql<number>`SUM(CASE WHEN is_verified = 1 THEN 1 ELSE 0 END)`,
          active: sql<number>`SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END)`,
          withPassword: sql<number>`SUM(CASE WHEN password_hash IS NOT NULL THEN 1 ELSE 0 END)`,
        }).from(subscribers);
        
        return {
          subscribers: allSubs.map(s => ({
            id: s.id,
            email: s.email,
            firstName: s.firstName,
            lastName: s.lastName,
            isVerified: s.isVerified === 1,
            isActive: s.isActive === 1,
            isMember: !!s.passwordHash,
            tags: (s.tags as string[]) || [],
            lastLoginAt: s.lastLoginAt,
            createdAt: s.createdAt,
          })),
          total: Number(total),
          stats: {
            total: Number(statsResult[0]?.total || 0),
            verified: Number(statsResult[0]?.verified || 0),
            active: Number(statsResult[0]?.active || 0),
            withPassword: Number(statsResult[0]?.withPassword || 0),
          },
        };
      }),

    // Get all bookings
    getBookings: protectedProcedure
      .input(z.object({
        status: z.enum(['pending', 'confirmed', 'declined', 'cancelled']).optional(),
        page: z.number().default(1),
      }).optional())
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') throw new Error('Forbidden');
        const { getDb } = await import('./db');
        const { bookingRequests } = await import('../drizzle/schema');
        const { desc, eq, and } = await import('drizzle-orm');
        const database = await getDb();
        if (!database) return { bookings: [], total: 0 };
        
        const bookings = await database.select().from(bookingRequests)
          .orderBy(desc(bookingRequests.createdAt))
          .limit(50);
        
        return { bookings, total: bookings.length };
      }),

    // Update booking status
    updateBookingStatus: protectedProcedure
      .input(z.object({
        bookingId: z.number(),
        status: z.enum(['pending', 'confirmed', 'declined', 'cancelled']),
        adminNotes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') throw new Error('Forbidden');
        const { getDb } = await import('./db');
        const { bookingRequests } = await import('../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        const database = await getDb();
        if (!database) throw new Error('Database not available');
        
        await database.update(bookingRequests)
          .set({ status: input.status, adminNotes: input.adminNotes })
          .where(eq(bookingRequests.id, input.bookingId));
        
        return { success: true };
      }),

    // Export subscribers as CSV data
    exportSubscribers: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Forbidden');
      const { getDb } = await import('./db');
      const { subscribers } = await import('../drizzle/schema');
      const { desc } = await import('drizzle-orm');
      const database = await getDb();
      if (!database) return { csv: '' };
      
      const allSubs = await database.select().from(subscribers).orderBy(desc(subscribers.createdAt));
      
      const headers = ['ID', 'Email', 'First Name', 'Last Name', 'Verified', 'Active', 'Member', 'Tags', 'Joined'];
      const rows = allSubs.map(s => [
        s.id,
        s.email,
        s.firstName || '',
        s.lastName || '',
        s.isVerified ? 'Yes' : 'No',
        s.isActive ? 'Yes' : 'No',
        s.passwordHash ? 'Yes' : 'No',
        ((s.tags as string[]) || []).join('; '),
        new Date(s.createdAt).toISOString().split('T')[0],
      ]);
      
      const csv = [headers, ...rows].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
      return { csv, count: allSubs.length };
    }),

    // Deactivate a subscriber
    deactivateSubscriber: protectedProcedure
      .input(z.object({ subscriberId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') throw new Error('Forbidden');
        const { getDb } = await import('./db');
        const { subscribers } = await import('../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        const database = await getDb();
        if (!database) throw new Error('Database not available');
        await database.update(subscribers).set({ isActive: 0 }).where(eq(subscribers.id, input.subscriberId));
        return { success: true };
      }),

    // Get blog posts for admin management
    getBlogPosts: protectedProcedure
      .input(z.object({ page: z.number().default(1) }).optional())
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') throw new Error('Forbidden');
        const posts = await getBlogPosts();
        const page = input?.page || 1;
        const offset = (page - 1) * 20;
        const pagedPosts = posts.slice(offset, offset + 20);
        return { posts: pagedPosts, total: posts.length };
      }),

    // Toggle blog post published status
    toggleBlogPost: protectedProcedure
      .input(z.object({ postId: z.number(), isPublished: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') throw new Error('Forbidden');
        const { getDb } = await import('./db');
        const { blogPosts } = await import('../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        const database = await getDb();
        if (!database) throw new Error('Database not available');
        await database.update(blogPosts).set({ isPublished: input.isPublished ? 1 : 0 }).where(eq(blogPosts.id, input.postId));
        return { success: true };
      }),

    // Manually trigger blog generation
    triggerBlogGeneration: protectedProcedure.mutation(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Forbidden');
      const { runDailyBlogGeneration } = await import('./blogScheduler');
      // Run in background
      runDailyBlogGeneration().catch(console.error);
      return { success: true, message: 'Blog generation started in background. Check back in a few minutes.' };
    }),
  }),

  // Orders router
  orders: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const userOrders = await getUserOrders(ctx.user.id);
      return userOrders.map(order => ({
        ...order,
        items: typeof order.items === "string" ? JSON.parse(order.items) : order.items,
        formattedTotal: formatPrice(order.totalAmount || 0),
      }));
    }),
  }),
});

export type AppRouter = typeof appRouter;
