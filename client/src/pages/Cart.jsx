import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { getCart, updateCartItem, removeFromCart } from "../api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useToast } from "../hooks/use-toast";

const Cart = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingItem, setUpdatingItem] = useState(null);

  /**
   * Fetch cart
   * Calls GET /api/cart
   * 
   * Headers: { Authorization: Bearer <token> }
   * 
   * Response: {
   *   items: CartItem[],
   *   subtotal: number,
   *   tax: number,
   *   shipping: number,
   *   total: number,
   *   itemCount: number
   * }
   */
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getCart();
        setCart(response);
      } catch (err) {
        setError(err.message || "Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  /**
   * Update cart item quantity
   * Calls PUT /api/cart/:itemId
   * 
   * Payload: { quantity: number }
   */
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdatingItem(itemId);
    
    try {
      const response = await updateCartItem(itemId, newQuantity);
      setCart(response);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to update quantity",
        variant: "destructive",
      });
    } finally {
      setUpdatingItem(null);
    }
  };

  /**
   * Remove item from cart
   * Calls DELETE /api/cart/:itemId
   */
  const handleRemoveItem = async (itemId) => {
    setUpdatingItem(itemId);
    
    try {
      const response = await removeFromCart(itemId);
      setCart(response);
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to remove item",
        variant: "destructive",
      });
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            Your Cart
          </h1>

          {loading ? (
            <LoadingSpinner text="Loading cart..." />
          ) : error ? (
            <ErrorMessage message={error} onRetry={handleRetry} />
          ) : !cart || cart.items?.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-body text-lg mb-6">
                Your cart is empty
              </p>
              <Link
                to="/products"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-body font-semibold hover:bg-primary/90 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-card border border-border rounded-xl p-4"
                  >
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      {item.product?.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-display font-semibold text-foreground">
                            {item.product?.name}
                          </h3>
                          <p className="text-muted-foreground font-body text-sm">
                            ₹{item.product?.price} each
                          </p>
                        </div>
                        <p className="font-display font-bold text-secondary">
                          ₹{item.subtotal || item.product?.price * item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={updatingItem === item.id || item.quantity <= 1}
                            className="p-2 hover:bg-muted transition-colors disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 font-body font-medium text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={updatingItem === item.id}
                            className="p-2 hover:bg-muted transition-colors disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={updatingItem === item.id}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                  <h2 className="font-display font-semibold text-lg text-foreground mb-6">
                    Order Summary
                  </h2>
                  <div className="space-y-3 font-body text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">₹{cart.subtotal || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground">
                        {cart.shipping === 0 ? "Free" : `₹${cart.shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-foreground">₹{cart.tax || 0}</span>
                    </div>
                    <div className="border-t border-border pt-3 mt-3">
                      <div className="flex justify-between font-semibold text-base">
                        <span className="text-foreground">Total</span>
                        <span className="text-secondary">₹{cart.total || 0}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/checkout"
                    className="block w-full mt-6 py-3 bg-primary text-primary-foreground text-center rounded-lg font-body font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    to="/products"
                    className="block w-full mt-3 py-3 border border-border text-foreground text-center rounded-lg font-body font-medium hover:bg-muted transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
