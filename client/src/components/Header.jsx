// Placeholder: Header component
import { useState, useEffect } from "react";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { getCart, isAuthenticated, searchProducts } from "../api";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Fetch cart to get item count
   * Calls GET /cart
   * 
   * Headers: { Authorization: Bearer <token> }
   * 
   * Response: {
   *   items: CartItem[],
   *   itemCount: number
   * }
   */
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!isAuthenticated()) return;
      
      try {
        const response = await getCart();
        setCartItemCount(response?.itemCount || 0);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    fetchCartCount();
  }, []);

  /**
   * Handle product search
   * Calls GET /products/search?q={query}
   * 
   * Query: { q: string }
   * 
   * Response: {
   *   products: Product[],
   *   total: number
   * }
   */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const results = await searchProducts(searchQuery);
      // Navigate to search results page or show in modal
      console.log("Search results:", results);
      // In a real app, you'd navigate or update state
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Shop", href: "#products" },
    { name: "Our Story", href: "#about" },
    { name: "Lab Reports", href: "#" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">R</span>
            </div>
            <span className="font-display font-bold text-2xl text-primary">
              ROSIER
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-body font-medium text-foreground hover:text-secondary transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-48 px-4 py-2 rounded-full border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  autoFocus
                  onBlur={() => !searchQuery && setIsSearchOpen(false)}
                />
              </form>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <Search className="w-5 h-5 text-foreground" />
              </button>
            )}
            
            <button className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:block">
              <User className="w-5 h-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5 text-foreground" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-burnt-orange text-cream text-xs font-bold rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-border animate-fade-in-up">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 font-body font-medium text-foreground hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
