import { Leaf, Award, Truck, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "No chemicals, no preservatives. Just pure, natural goodness straight from nature.",
  },
  {
    icon: Award,
    title: "Lab Tested",
    description: "Every batch is tested for purity and quality. Transparency you can trust.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Free shipping on orders over $50. Delivered fresh to your doorstep.",
  },
  {
    icon: HeartHandshake,
    title: "Farm Direct",
    description: "Supporting local farmers with fair prices. From their hands to your home.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 bg-golden/20 rounded-full flex items-center justify-center group-hover:bg-golden/30 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-golden" />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-primary-foreground/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
