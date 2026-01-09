import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { fetchAINews } from "./news";
import { PRODUCTS, getProductById, formatPrice } from "./products";
import { 
  getCartItems, 
  addToCart, 
  updateCartItemQuantity, 
  removeFromCart, 
  clearCart,
  createOrder,
  getUserOrders,
  updateUserStripeCustomerId
} from "./db";
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
