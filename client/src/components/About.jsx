// Placeholder: About component
import heroBanner from "../assets/hero-banner.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative animate-fade-in-up">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src={heroBanner}
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl max-w-xs animate-scale-in animation-delay-300">
              <p className="font-display text-4xl font-bold text-golden mb-1">10+</p>
              <p className="font-body text-sm">Years of Traditional Craftsmanship</p>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:pl-8">
            <span className="inline-block font-body text-sm font-semibold text-secondary uppercase tracking-widest mb-4 animate-fade-in-up">
              Our Story
            </span>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight mb-6 animate-fade-in-up animation-delay-100">
              From Farm to Your Table with{" "}
              <span className="text-secondary italic">Love</span>
            </h2>

            <p className="font-body text-muted-foreground mb-6 animate-fade-in-up animation-delay-200">
              We started with a simple belief: food should be pure, natural, and made with love. 
              Our journey began in the heart of organic farms, where we witnessed the magic of 
              traditional food-making methods passed down through generations.
            </p>

            <p className="font-body text-muted-foreground mb-8 animate-fade-in-up animation-delay-300">
              Today, we bring you the same authentic taste – from hand-churned A2 ghee made using 
              the ancient bilona method, to stone-pressed oils that retain their natural goodness. 
              Every product tells a story of tradition, purity, and our commitment to your health.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                "No Preservatives",
                "Traditional Methods",
                "Lab Tested",
                "Farm Fresh",
              ].map((value, index) => (
                <div
                  key={value}
                  className="flex items-center gap-2 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  <div className="w-2 h-2 rounded-full bg-golden" />
                  <span className="font-body text-sm text-foreground font-medium">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <a href="#" className="btn-secondary inline-flex items-center gap-2 animate-fade-in-up animation-delay-500">
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
