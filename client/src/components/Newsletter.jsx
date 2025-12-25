// Placeholder: Newsletter component
import { useState } from "react";
import { Send } from "lucide-react";
import { subscribeNewsletter } from "../api";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  /**
   * Handle newsletter subscription
   * Calls POST /newsletter/subscribe
   * 
   * Payload: {
   *   email: string    // Email address to subscribe
   * }
   * 
   * Response: {
   *   success: boolean,
   *   message: string
   * }
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await subscribeNewsletter(email);
      setMessage({ type: "success", text: response.message || "Thank you for subscribing! 🎉" });
      setEmail("");
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.message || "Failed to subscribe. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  return (
    <section className="py-20 bg-golden/20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
            Join Our Family
          </h2>
          <p className="font-body text-muted-foreground mb-8">
            Subscribe to get exclusive offers, health tips, and be the first to know about new products.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border border-border bg-background font-body focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
              required
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
            >
              <span>{isSubmitting ? "Subscribing..." : "Subscribe"}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Status Message */}
          {message.text && (
            <p 
              className={`mt-4 font-body font-medium animate-fade-in-up ${
                message.type === "success" ? "text-secondary" : "text-burnt-orange"
              }`}
            >
              {message.text}
            </p>
          )}

          <p className="mt-4 font-body text-sm text-muted-foreground">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
