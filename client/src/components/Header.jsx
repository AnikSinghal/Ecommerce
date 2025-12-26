import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, User, ShoppingBag, LogOut, Package } from "lucide-react";
import { getCart, searchProducts } from "../api";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
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

  useEffect(() => {
    const fetchCartCount = async () => {
      if (!isLoggedIn) return;
      try {
        const response = await getCart();
        setCartItemCount(response?.itemCount || 0);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    fetchCartCount();
  }, [isLoggedIn]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    setIsSearchOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "Our Story", href: "/#about" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">R</span>
            </div>
            <span className="font-display font-bold text-2xl text-primary">ROSIER</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="font-body font-medium text-foreground hover:text-secondary transition-colors relative group">
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="relative">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="w-40 px-4 py-2 rounded-full border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-secondary" autoFocus onBlur={() => !searchQuery && setIsSearchOpen(false)} />
              </form>
            ) : (
              <button onClick={() => setIsSearchOpen(true)} className="p-2 hover:bg-muted rounded-full transition-colors">
                <Search className="w-5 h-5 text-foreground" />
              </button>
            )}

            {isLoggedIn ? (
              <>
                <Link to="/cart" className="p-2 hover:bg-muted rounded-full transition-colors relative">
                  <ShoppingBag className="w-5 h-5 text-foreground" />
                  {cartItemCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-burnt-orange text-cream text-xs font-bold rounded-full flex items-center justify-center">{cartItemCount}</span>}
                </Link>
                <Link to="/orders" className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:block">
                  <Package className="w-5 h-5 text-foreground" />
                </Link>
                <button onClick={handleLogout} className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:block">
                  <LogOut className="w-5 h-5 text-foreground" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block px-4 py-2 font-body font-medium text-foreground hover:text-secondary transition-colors">Login</Link>
                <Link to="/register" className="hidden sm:block px-4 py-2 bg-primary text-primary-foreground rounded-full font-body font-medium hover:bg-primary/90 transition-colors">Register</Link>
              </>
            )}

            <button className="md:hidden p-2 hover:bg-muted rounded-full transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-border animate-fade-in-up">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="block py-3 font-body font-medium text-foreground hover:text-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{link.name}</Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link to="/orders" className="block py-3 font-body font-medium text-foreground hover:text-secondary" onClick={() => setIsMobileMenuOpen(false)}>My Orders</Link>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block py-3 font-body font-medium text-foreground hover:text-secondary">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-3 font-body font-medium text-foreground hover:text-secondary" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                <Link to="/register" className="block py-3 font-body font-medium text-foreground hover:text-secondary" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
