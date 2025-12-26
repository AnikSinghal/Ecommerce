import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingCart, Heart, Share2 } from "lucide-react";
import { getProductById, addToCart } from "../api";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useToast } from "../hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  /**
   * Fetch product by ID
   * Calls GET /api/products/:id
   * 
   * Response: {
   *   id: string,
   *   name: string,
   *   description: string,
   *   price: number,
   *   originalPrice?: number,
   *   images: string[],
   *   category: string,
   *   stock: number,
   *   features: string[],
   *   specifications: object
   * }
   */
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getProductById(id);
        setProduct(response);
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  /**
   * Add product to cart
   * Calls POST /api/cart
   * 
   * Payload: {
   *   productId: string,
   *   quantity: number
   * }
   */
  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Please login",
        description: "You need to be logged in to add items to cart",
        variant: "destructive",
      });
      return;
    }

    setAddingToCart(true);
    
    try {
      await addToCart(product.id, quantity);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to add to cart",
        variant: "destructive",
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Re-fetch
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <LoadingSpinner text="Loading product..." />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <ErrorMessage message={error} onRetry={handleRetry} />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 text-center">
          <p className="text-muted-foreground font-body">Product not found</p>
          <Link to="/products" className="text-secondary hover:underline mt-4 inline-block">
            Back to products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-body transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="aspect-square bg-muted rounded-2xl overflow-hidden mb-4">
                {images[selectedImage] && (
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-transparent hover:border-border"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <div className="mb-6">
                {product.category && (
                  <span className="text-secondary font-body text-sm uppercase tracking-wide">
                    {product.category}
                  </span>
                )}
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl font-bold text-secondary">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="font-body text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground font-body mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 font-body font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-body font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {addingToCart ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>

                <button className="p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="border-t border-border pt-8">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                    Features
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 font-body text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
