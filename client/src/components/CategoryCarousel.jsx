// Placeholder: CategoryCarousel component
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllCategories } from "../api";
import productGhee from "../assets/product-ghee.jpg";
import productOil from "../assets/product-oil.jpg";
import productHoney from "../assets/product-honey.jpg";
import productNutbutter from "../assets/product-nutbutter.jpg";
import productAtta from "../assets/product-atta.jpg";
import productImmunity from "../assets/product-immunity.jpg";

// Fallback categories when API is not available
const fallbackCategories = [
  { name: "A2 Ghee", image: productGhee, color: "#dda15e", slug: "ghee" },
  { name: "Stone Pressed Oil", image: productOil, color: "#606c38", slug: "oil" },
  { name: "Wild Honey", image: productHoney, color: "#bc6c25", slug: "honey" },
  { name: "Nut Butters", image: productNutbutter, color: "#dda15e", slug: "nut-butters" },
  { name: "Organic Atta", image: productAtta, color: "#606c38", slug: "atta" },
  { name: "Immunity Booster", image: productImmunity, color: "#bc6c25", slug: "immunity" },
];

const CategoryCarousel = () => {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch all categories
   * Calls GET /categories
   * 
   * Response: {
   *   categories: [
   *     {
   *       id: string,
   *       name: string,
   *       slug: string,
   *       image: string,
   *       color: string,
   *       productCount: number
   *     }
   *   ]
   * }
   */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response?.categories?.length > 0) {
          setCategories(response.categories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // Keep fallback data on error
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">Shop by Category</h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Explore our range of pure, natural, and traditionally crafted products
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform -translate-x-4 md:translate-x-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform translate-x-4 md:translate-x-0"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-4 pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category, index) => (
              <a
                key={category.slug || category.name}
                href={`#category-${category.slug}`}
                className="flex-shrink-0 w-48 group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className="w-48 h-48 rounded-full overflow-hidden mb-4 border-4 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl"
                  style={{ borderColor: category.color }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-display text-lg font-semibold text-primary text-center group-hover:text-secondary transition-colors">
                  {category.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
