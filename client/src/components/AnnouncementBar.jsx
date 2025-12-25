// Placeholder: AnnouncementBar component
const AnnouncementBar = () => {
  const announcements = [
    "🎉 New Year Sale - Flat 17% OFF",
    "🎁 Flat 20% OFF + Free Gift on orders $99+",
    "🚚 Free Shipping on all orders above $50",
  ];

  return (
    <div className="bg-primary overflow-hidden py-2.5">
      <div className="marquee-track flex items-center whitespace-nowrap">
        {[...announcements, ...announcements, ...announcements, ...announcements].map((text, index) => (
          <span
            key={index}
            className="inline-flex items-center mx-8 text-primary-foreground font-body text-sm font-medium"
          >
            {text}
            <span className="mx-8 text-golden">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
