// Placeholder: Testimonials component
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { getTestimonials } from "../api";

// Fallback testimonials when API is not available
const fallbackTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar: "S",
    rating: 5,
    text: "The A2 Ghee is absolutely amazing! You can taste the purity and quality. My whole family loves it, and we've made it a staple in our kitchen.",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Los Angeles, USA",
    avatar: "M",
    rating: 5,
    text: "Finally found a brand I can trust! The cold-pressed oils are perfect for cooking, and the honey is the most authentic I've ever tasted.",
  },
  {
    id: 3,
    name: "Priya Sharma",
    location: "Chicago, USA",
    avatar: "P",
    rating: 5,
    text: "As someone who values traditional food, Rosier has been a blessing. The quality is outstanding and the customer service is exceptional.",
  },
  {
    id: 4,
    name: "David Wilson",
    location: "Miami, USA",
    avatar: "D",
    rating: 5,
    text: "The nut butter is incredible - no added sugars, just pure goodness. My kids love it and I feel good about what I'm feeding them.",
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch testimonials
   * Calls GET /testimonials?featured=true
   * 
   * Response: {
   *   testimonials: [
   *     {
   *       id: string,
   *       name: string,
   *       location: string,
   *       avatar: string,
   *       rating: number,
   *       text: string
   *     }
   *   ]
   * }
   */
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getTestimonials({ featured: true });
        if (response?.testimonials?.length > 0) {
          setTestimonials(response.testimonials);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        // Keep fallback data on error
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block font-body text-sm font-semibold text-secondary uppercase tracking-widest mb-2">
            Testimonials
          </span>
          <h2 className="section-heading mb-4">What Our Customers Say</h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:scale-110 transition-transform -translate-x-6 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:scale-110 transition-transform translate-x-6 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Card */}
          <div className="bg-background rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden">
            {/* Quote Icon */}
            <Quote className="absolute top-6 right-6 w-16 h-16 text-secondary/10" />

            {/* Content */}
            <div className="text-center relative z-10">
              {/* Avatar */}
              <div className="w-20 h-20 mx-auto mb-4 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-display text-2xl font-bold">
                {testimonials[currentIndex].avatar}
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-golden text-golden" />
                ))}
              </div>

              {/* Text */}
              <p className="font-body text-lg md:text-xl text-foreground mb-6 italic leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <p className="font-display text-lg font-semibold text-primary">
                {testimonials[currentIndex].name}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {testimonials[currentIndex].location}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
