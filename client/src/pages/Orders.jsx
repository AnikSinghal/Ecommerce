import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ChevronRight, Eye } from "lucide-react";
import { getOrders } from "../api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch user orders
   * Calls GET /api/orders
   * 
   * Headers: { Authorization: Bearer <token> }
   * 
   * Response: {
   *   orders: Order[],
   *   total: number
   * }
   */
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getOrders();
        setOrders(response?.orders || []);
      } catch (err) {
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return statusColors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            My Orders
          </h1>

          {loading ? (
            <LoadingSpinner text="Loading orders..." />
          ) : error ? (
            <ErrorMessage message={error} onRetry={handleRetry} />
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-body text-lg mb-6">
                You haven't placed any orders yet
              </p>
              <Link
                to="/products"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-body font-semibold hover:bg-primary/90 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="font-body text-sm text-muted-foreground mb-1">
                        Order #{order.id}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-body font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Order Items Preview */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {order.items?.slice(0, 4).map((item, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 rounded-lg overflow-hidden bg-muted"
                      >
                        {item.product?.image && (
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                    {order.items?.length > 4 && (
                      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                        <span className="font-body text-sm text-muted-foreground">
                          +{order.items.length - 4}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                    <div>
                      <span className="font-body text-sm text-muted-foreground">Total: </span>
                      <span className="font-display font-bold text-lg text-secondary">
                        ₹{order.total}
                      </span>
                    </div>
                    <Link
                      to={`/orders/${order.id}`}
                      className="flex items-center gap-2 text-secondary hover:text-secondary/80 font-body font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
