import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import Stripe from "stripe";
import { ENV } from "./env";
import { updateOrderPayment, clearCart, getOrderBySessionId } from "../db";
import { startBlogScheduler } from "../blogScheduler";

// Initialize Stripe
const stripe = new Stripe(ENV.stripeSecretKey || "", {
  apiVersion: "2025-12-15.clover",
});

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Stripe webhook route MUST be registered BEFORE express.json() middleware
  // to ensure raw body is available for signature verification
  app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];

    if (!sig) {
      console.error("[Webhook] No signature found");
      return res.status(400).send("No signature");
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        ENV.stripeWebhookSecret || ""
      );
    } catch (err: any) {
      console.error("[Webhook] Signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle test events - CRITICAL for webhook verification
    if (event.id.startsWith("evt_test_")) {
      console.log("[Webhook] Test event detected, returning verification response");
      return res.json({ verified: true });
    }

    console.log(`[Webhook] Received event: ${event.type} (${event.id})`);

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`[Webhook] Checkout session completed: ${session.id}`);
        
        // Update order status
        if (session.payment_intent) {
          await updateOrderPayment(
            session.id,
            typeof session.payment_intent === "string" 
              ? session.payment_intent 
              : session.payment_intent.id
          );
        }

        // Clear user's cart
        const userId = session.metadata?.user_id;
        if (userId) {
          await clearCart(parseInt(userId));
        }

        console.log(`[Webhook] Order updated for session: ${session.id}`);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Webhook] Payment succeeded: ${paymentIntent.id}`);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Webhook] Payment failed: ${paymentIntent.id}`);
        break;
      }

      // Handle subscription checkout completion
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === 'subscription' && session.metadata?.subscriber_id) {
          const subscriberId = parseInt(session.metadata.subscriber_id);
          const planId = session.metadata.plan_id;
          const subscriptionId = typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription?.id;

          if (subscriptionId && planId) {
            const db = await import('../db').then(m => m.getDb());
            const { subscribers } = await import('../../drizzle/schema');
            const { eq } = await import('drizzle-orm');
            if (db) {
              await db.update(subscribers)
                .set({
                  stripeSubscriptionId: subscriptionId,
                  membershipPlan: planId,
                  membershipStatus: 'active',
                })
                .where(eq(subscribers.id, subscriberId));
              console.log(`[Webhook] Membership activated: subscriber ${subscriberId} -> ${planId}`);
            }
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription & { current_period_end: number };
        const db = await import('../db').then(m => m.getDb());
        const { subscribers } = await import('../../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        if (db) {
          const status = subscription.status;
          const validStatuses = ['active', 'cancelled', 'past_due', 'trialing'];
          const membershipStatus = validStatuses.includes(status) ? status : 'cancelled';
          await db.update(subscribers)
            .set({
              membershipStatus: membershipStatus as 'active' | 'cancelled' | 'past_due' | 'trialing',
              membershipEndsAt: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
            })
            .where(eq(subscribers.stripeSubscriptionId, subscription.id));
          console.log(`[Webhook] Subscription updated: ${subscription.id} -> ${status}`);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const db = await import('../db').then(m => m.getDb());
        const { subscribers } = await import('../../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        if (db) {
          await db.update(subscribers)
            .set({ membershipStatus: 'cancelled' })
            .where(eq(subscribers.stripeSubscriptionId, subscription.id));
          console.log(`[Webhook] Subscription cancelled: ${subscription.id}`);
        }
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  });

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Dynamic sitemap.xml - includes all published blog posts
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const { getDb } = await import('../db');
      const { blogPosts } = await import('../../drizzle/schema');
      const { eq, desc } = await import('drizzle-orm');
      const db = await getDb();

      const baseUrl = `${req.protocol}://${req.get('host')}`;

      // Static pages
      const staticPages = [
        { url: '/', priority: '1.0', changefreq: 'weekly' },
        { url: '/about', priority: '0.9', changefreq: 'monthly' },
        { url: '/speaking', priority: '0.8', changefreq: 'monthly' },
        { url: '/consulting', priority: '0.8', changefreq: 'monthly' },
        { url: '/books', priority: '0.8', changefreq: 'monthly' },
        { url: '/foundation', priority: '0.7', changefreq: 'monthly' },
        { url: '/blog', priority: '0.9', changefreq: 'daily' },
        { url: '/ai-news', priority: '0.8', changefreq: 'daily' },
        { url: '/membership', priority: '0.7', changefreq: 'monthly' },
        { url: '/contact', priority: '0.6', changefreq: 'yearly' },
        { url: '/press', priority: '0.6', changefreq: 'monthly' },
      ];

      // Dynamic blog posts
      let blogEntries: string[] = [];
      if (db) {
        const posts = await db.select({
          id: blogPosts.id,
          slug: blogPosts.slug,
          publishedAt: blogPosts.publishedAt,
        })
          .from(blogPosts)
          .where(eq(blogPosts.isPublished, 1))
          .orderBy(desc(blogPosts.publishedAt))
          .limit(1000);

        blogEntries = posts.map(post => {
          const lastmod = post.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
          return `  <url>\n    <loc>${baseUrl}/blog/${post.slug || post.id}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`;
        });
      }

      const staticEntries = staticPages.map(page => {
        const today = new Date().toISOString().split('T')[0];
        return `  <url>\n    <loc>${baseUrl}${page.url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`;
      });

      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...staticEntries, ...blogEntries].join('\n')}\n</urlset>`;

      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache 1 hour
      res.send(xml);
    } catch (err) {
      console.error('[Sitemap] Error generating sitemap:', err);
      res.status(500).send('Error generating sitemap');
    }
  });

  // robots.txt
  app.get("/robots.txt", (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    res.setHeader('Content-Type', 'text/plain');
    res.send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: ${baseUrl}/sitemap.xml\n`);
  });
  
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

// Start the daily blog scheduler
startBlogScheduler();
