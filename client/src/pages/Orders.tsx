import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Package, CheckCircle, Clock, Truck, XCircle, Loader2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link, useSearch } from "wouter";
import { useEffect } from "react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";

const statusIcons = {
  pending: Clock,
  paid: CheckCircle,
  shipped: Truck,
  delivered: Package,
  cancelled: XCircle,
};

const statusColors = {
  pending: "oklch(0.65 0.15 85)",
  paid: "oklch(0.55 0.15 145)",
  shipped: "oklch(0.55 0.15 250)",
  delivered: "oklch(0.55 0.15 145)",
  cancelled: "oklch(0.55 0.15 25)",
};

export default function Orders() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const success = searchParams.get("success");
  const sessionId = searchParams.get("session_id");

  const { data: orders, isLoading, refetch } = trpc.orders.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Show success toast when redirected from checkout
  useEffect(() => {
    if (success === "true") {
      toast.success("Payment successful! Thank you for your order.");
      // Refetch orders to show the new one
      refetch();
    }
  }, [success, refetch]);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16" style={{ backgroundColor: "oklch(0.15 0.03 250)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Package size={20} style={{ color: "oklch(0.72 0.14 85)" }} />
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "oklch(0.72 0.14 85)" }}>
                Order History
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}>
              Your Orders
            </h1>
            <p className="text-lg" style={{ color: "oklch(0.97 0.01 90 / 0.8)" }}>
              View and track all your purchases, including books, courses, and merchandise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Orders Content */}
      <section className="py-12">
        <div className="container max-w-4xl">
          {authLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin" size={32} style={{ color: "oklch(0.72 0.14 85)" }} />
            </div>
          ) : !isAuthenticated ? (
            <div className="text-center py-16">
              <ShoppingBag size={48} className="mx-auto mb-4" style={{ color: "oklch(0.75 0.01 90)" }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                Sign in to view your orders
              </h3>
              <p className="mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                Please sign in to access your order history
              </p>
              <Button 
                onClick={() => window.location.href = getLoginUrl()}
                style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}
              >
                Sign In
              </Button>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin" size={32} style={{ color: "oklch(0.72 0.14 85)" }} />
            </div>
          ) : !orders || orders.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={48} className="mx-auto mb-4" style={{ color: "oklch(0.75 0.01 90)" }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
                No orders yet
              </h3>
              <p className="mb-6" style={{ color: "oklch(0.45 0.02 250)" }}>
                You haven't made any purchases yet. Check out our books and courses!
              </p>
              <Link href="/books">
                <Button style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}>
                  Browse Books
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => {
                const StatusIcon = statusIcons[order.status as keyof typeof statusIcons] || Clock;
                const statusColor = statusColors[order.status as keyof typeof statusColors] || statusColors.pending;
                const items = order.items as Array<{ productName?: string; quantity: number; price?: number }> || [];

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg overflow-hidden"
                    style={{ borderColor: "oklch(0.90 0.01 90)" }}
                  >
                    {/* Order Header */}
                    <div className="p-4 flex flex-wrap items-center justify-between gap-4" style={{ backgroundColor: "oklch(0.97 0.01 90)" }}>
                      <div>
                        <p className="text-sm" style={{ color: "oklch(0.55 0.02 250)" }}>
                          Order #{order.id}
                        </p>
                        <p className="text-sm" style={{ color: "oklch(0.55 0.02 250)" }}>
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: `${statusColor} / 0.1` }}>
                        <StatusIcon size={16} style={{ color: statusColor }} />
                        <span className="text-sm font-medium capitalize" style={{ color: statusColor }}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-4 space-y-3">
                      {items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium" style={{ color: "oklch(0.15 0.03 250)" }}>
                              {item.productName || "Product"}
                            </p>
                            <p className="text-sm" style={{ color: "oklch(0.55 0.02 250)" }}>
                              Qty: {item.quantity}
                            </p>
                          </div>
                          {item.price && (
                            <p className="font-medium" style={{ color: "oklch(0.35 0.02 250)" }}>
                              ${(item.price / 100).toFixed(2)}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Order Footer */}
                    <div className="p-4 flex justify-between items-center border-t" style={{ borderColor: "oklch(0.90 0.01 90)" }}>
                      <span className="font-medium" style={{ color: "oklch(0.35 0.02 250)" }}>Total</span>
                      <span className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                        {order.formattedTotal}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
