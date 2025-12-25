// Placeholder: BestSellers component
import { useState, useEffect } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { getBestSellers, addToCart } from "../api";
import productGhee from "../assets/product-ghee.jpg";
import productOil from "../assets/product-oil.jpg";
import productHoney from "../assets/product-honey.jpg";
import productNutbutter from "../assets/product-nutbutter.jpg";
import productAtta from "../assets/product-atta.jpg";
import productImmunity from "../assets/product-immunity.jpg";

// Fallback data when API is not available
const fallbackProducts = [
  {
    id: 1,
    name: "Gir Cow A2 Ghee",
    description: "Hand-churned from curd, traditional bilona method",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.91,
    reviews: 234,
    image: productGhee,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Stone Pressed Mustard Oil",
    description: "Cold pressed, chemical-free, rich in omega-3",
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.9,
    reviews: 189,
    image: productOil,
    badge: null,
  },
  {
    id: 3,
    name: "Wild Forest Honey",
    description: "Raw, unprocessed honey from wild forests",
    price: 18.99,
    originalPrice: 22.99,
    rating: 4.68,
    reviews: 156,
    image: productHoney,
    badge: "On Sale",
  },
  {
    id: 4,
    name: "Nut Butter Premium",
    description: "Blend of almonds, peanuts, and cashews",
    price: 14.99,
    originalPrice: 17.99,
    rating: 4.89,
    reviews: 198,
    image: productNutbutter,
    badge: null,
  },
  {
    id: 5,
    name: "Khapli Wheat Atta",
    description: "Ancient grain, stone-ground flour",
    price: 8.99,
    originalPrice: 10.99,
    rating: 4.75,
    reviews: 145,
    image: productAtta,
    badge: null,
  },
  {
    id: 6,
    name: "Immunity Booster",
    description: "Ayurvedic blend with amla and herbs",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.82,
    reviews: 167,
    image: productImmunity,
    badge: "New",
  },
];

const ProductCard = ({ product, index, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);

  /**
   * Handle add to cart
   * Calls POST /cart/add with:
   * {
   *   productId: string,
   *   quantity: 1
   * }
   */
  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await onAddToCart(product.id);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className="card-product group animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-body font-semibold ${
              product.badge === "Best Seller"
                ? "bg-secondary text-secondary-foreground"
                : product.badge === "On Sale"
                ? "bg-burnt-orange text-cream"
                : "bg-golden text-forest"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Quick Add Button */}
        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className="absolute bottom-4 right-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 shadow-lg disabled:opacity-50"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-golden text-golden" />
          <span className="font-body text-sm text-foreground font-medium">
            {product.rating}
          </span>
          <span className="font-body text-sm text-muted-foreground">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Name */}
        <h3 className="font-display text-lg font-semibold text-primary mb-1 group-hover:text-secondary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-body text-xl font-bold text-primary">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="font-body text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full mt-4 py-3 px-4 bg-primary text-primary-foreground font-body font-semibold rounded-lg hover:bg-secondary transition-colors duration-300 disabled:opacity-50"
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

const BestSellers = () => {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch best seller products
   * Calls GET /products/best-sellers?limit=6
   * 
   * Response: {
   *   products: Product[]
   * }
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getBestSellers(6);
        if (response?.products?.length > 0) {
          setProducts(response.products);
        }
      } catch (error) {
        console.error("Failed to fetch best sellers:", error);
        // Keep fallback data on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /**
   * Add product to cart
   * Calls POST /cart/add
   * Payload: { productId: string, quantity: 1 }
   */
  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      // Could trigger a cart update event or toast notification
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error;
    }
  };

  return (
    <section id="products" className="py-20 bg-warm-gradient">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block font-body text-sm font-semibold text-secondary uppercase tracking-widest mb-2">
            Our Collection
          </span>
          <h2 className="section-heading mb-4">Best Sellers</h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Discover our most loved products, crafted with care and tradition
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a href="#" className="btn-outline inline-flex items-center gap-2">
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
