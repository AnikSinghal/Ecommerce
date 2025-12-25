// Placeholder: Hero component
import heroBanner from "../assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Natural organic foods"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-golden/20 backdrop-blur-sm border border-golden/30 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 bg-golden rounded-full animate-pulse" />
            <span className="text-cream font-body text-sm font-medium">
              New Year Special Sale
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-cream leading-tight mb-6 animate-fade-in-up animation-delay-100">
            A Golden Start to a{" "}
            <span className="text-golden italic">Healthier</span> You
          </h1>

          {/* Subtitle */}
          <p className="text-cream/90 font-body text-lg md:text-xl mb-8 animate-fade-in-up animation-delay-200">
            Pure, natural, and traditionally crafted organic foods. From our
            farms to your table – experience the authentic taste of nature.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-300">
            <a
              href="#products"
              className="btn-golden text-lg"
            >
              Shop Now
            </a>
            <a
              href="#about"
              className="px-8 py-4 rounded-full font-body font-semibold text-cream border-2 border-cream/30 hover:bg-cream/10 transition-all duration-300"
            >
              Our Story
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 animate-fade-in-up animation-delay-400">
            {[
              { value: "50K+", label: "Happy Customers" },
              { value: "100%", label: "Natural" },
              { value: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-bold text-golden">
                  {stat.value}
                </p>
                <p className="font-body text-sm text-cream/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
