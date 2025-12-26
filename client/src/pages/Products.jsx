import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter, Grid, List, ChevronDown } from "lucide-react";
import { getAllProducts, getAllCategories } from "../api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  /**
   * Fetch all products
   * Calls GET /api/products
   * 
   * Query: {
   *   category?: string,
   *   sort?: string,
   *   page?: number,
   *   limit?: number
   * }
   * 
   * Response: {
   *   products: Product[],
   *   total: number,
   *   page: number,
   *   totalPages: number
   * }
   */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getAllProducts({
            category: selectedCategory !== "all" ? selectedCategory : undefined,
            sort: sortBy,
          }),
          getAllCategories(),
        ]);
        
        setProducts(productsRes?.products || []);
        setCategories(categoriesRes?.categories || []);
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, sortBy]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Trigger re-fetch by updating state
    setSelectedCategory(selectedCategory);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Products
            </h1>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">
              Discover our range of pure, organic, and naturally sourced products
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-border rounded-lg bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id || cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-body text-sm">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Sort & View */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-border rounded-lg bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="bestselling">Best Selling</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              <div className="flex border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"} transition-colors`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"} transition-colors`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <LoadingSpinner text="Loading products..." />
          ) : error ? (
            <ErrorMessage message={error} onRetry={handleRetry} />
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-body text-lg">
                No products found
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ProductCard = ({ product, viewMode }) => {
  if (viewMode === "list") {
    return (
      <Link
        to={`/product/${product.id}`}
        className="flex gap-6 bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-shadow"
      >
        <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-display font-semibold text-lg text-foreground mb-2">
            {product.name}
          </h3>
          <p className="text-muted-foreground font-body text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <p className="font-display font-bold text-xl text-secondary">
            ₹{product.price}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-square bg-muted overflow-hidden">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-secondary transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground font-body text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="font-display font-bold text-lg text-secondary">
          ₹{product.price}
        </p>
      </div>
    </Link>
  );
};

export default Products;
