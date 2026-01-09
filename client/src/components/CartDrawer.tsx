import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2, X, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  trigger?: React.ReactNode;
}

export default function CartDrawer({ trigger }: CartDrawerProps) {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  const { data: cart, isLoading, refetch } = trpc.cart.get.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const updateQuantityMutation = trpc.cart.updateQuantity.useMutation({
    onSuccess: () => refetch(),
    onError: (error) => toast.error(error.message),
  });

  const removeMutation = trpc.cart.remove.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Item removed from cart");
    },
    onError: (error) => toast.error(error.message),
  });

  const clearMutation = trpc.cart.clear.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Cart cleared");
    },
    onError: (error) => toast.error(error.message),
  });

  const checkoutMutation = trpc.checkout.createSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        toast.success("Redirecting to checkout...");
        window.open(data.url, "_blank");
      }
    },
    onError: (error) => toast.error(error.message),
  });

  const handleUpdateQuantity = (cartItemId: number, newQuantity: number) => {
    updateQuantityMutation.mutate({ cartItemId, quantity: newQuantity });
  };

  const handleRemove = (cartItemId: number) => {
    removeMutation.mutate({ cartItemId });
  };

  const handleCheckout = () => {
    checkoutMutation.mutate({});
  };

  const handleLoginRedirect = () => {
    window.location.href = getLoginUrl();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart size={20} />
            {isAuthenticated && cart && cart.itemCount > 0 && (
              <span 
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}
              >
                {cart.itemCount}
              </span>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            <ShoppingCart size={24} />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
            <ShoppingCart size={48} style={{ color: "oklch(0.75 0.01 90)" }} />
            <p className="text-center" style={{ color: "oklch(0.45 0.02 250)" }}>
              Please sign in to view your cart
            </p>
            <Button onClick={handleLoginRedirect} style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}>
              Sign In
            </Button>
          </div>
        ) : isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="animate-spin" size={32} style={{ color: "oklch(0.72 0.14 85)" }} />
          </div>
        ) : !cart || cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
            <ShoppingCart size={48} style={{ color: "oklch(0.75 0.01 90)" }} />
            <p className="text-center" style={{ color: "oklch(0.45 0.02 250)" }}>
              Your cart is empty
            </p>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              <AnimatePresence>
                {cart.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 p-4 border rounded-lg"
                    style={{ borderColor: "oklch(0.90 0.01 90)" }}
                  >
                    {/* Product Image */}
                    <div 
                      className="w-20 h-20 rounded-md flex-shrink-0 overflow-hidden"
                      style={{ backgroundColor: "oklch(0.95 0.01 90)" }}
                    >
                      {item.product?.imageUrl && (
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate" style={{ color: "oklch(0.15 0.03 250)" }}>
                        {item.product?.name}
                      </h4>
                      <p className="text-sm mt-1" style={{ color: "oklch(0.72 0.14 85)" }}>
                        {item.product?.formattedPrice}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={updateQuantityMutation.isPending}
                          className="w-7 h-7 rounded-full flex items-center justify-center border transition-colors hover:bg-gray-100"
                          style={{ borderColor: "oklch(0.85 0.01 90)" }}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={updateQuantityMutation.isPending}
                          className="w-7 h-7 rounded-full flex items-center justify-center border transition-colors hover:bg-gray-100"
                          style={{ borderColor: "oklch(0.85 0.01 90)" }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={removeMutation.isPending}
                      className="self-start p-1 rounded transition-colors hover:bg-red-50"
                      style={{ color: "oklch(0.55 0.15 25)" }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Cart Footer */}
            <div className="border-t pt-4 space-y-4" style={{ borderColor: "oklch(0.90 0.01 90)" }}>
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="font-medium" style={{ color: "oklch(0.35 0.02 250)" }}>Subtotal</span>
                <span className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.03 250)" }}>
                  {cart.formattedSubtotal}
                </span>
              </div>

              <p className="text-xs" style={{ color: "oklch(0.55 0.02 250)" }}>
                Shipping and taxes calculated at checkout
              </p>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button 
                  onClick={handleCheckout}
                  disabled={checkoutMutation.isPending}
                  className="w-full"
                  style={{ backgroundColor: "oklch(0.72 0.14 85)", color: "oklch(0.15 0.03 250)" }}
                >
                  {checkoutMutation.isPending ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Processing...
                    </>
                  ) : (
                    "Checkout"
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => clearMutation.mutate()}
                  disabled={clearMutation.isPending}
                  className="w-full"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
