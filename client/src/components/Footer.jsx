// Placeholder: Footer component
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    shop: [
      { name: "A2 Ghee", href: "#" },
      { name: "Stone Pressed Oils", href: "#" },
      { name: "Wild Honey", href: "#" },
      { name: "Nut Butters", href: "#" },
      { name: "Organic Atta", href: "#" },
    ],
    company: [
      { name: "Our Story", href: "#about" },
      { name: "Lab Reports", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
    support: [
      { name: "Contact Us", href: "#" },
      { name: "FAQs", href: "#" },
      { name: "Shipping Info", href: "#" },
      { name: "Returns", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-golden flex items-center justify-center">
                <span className="text-forest font-display font-bold text-lg">R</span>
              </div>
              <span className="font-display font-bold text-2xl text-golden">
                ROSIER
              </span>
            </div>
            <p className="font-body text-primary-foreground/70 mb-6 max-w-sm">
              Pure, natural, and traditionally crafted organic foods. 
              From our farms to your table – experience the authentic taste of nature.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:hello@rosierfoods.com" className="flex items-center gap-3 font-body text-sm hover:text-golden transition-colors">
                <Mail className="w-4 h-4" />
                hello@rosierfoods.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 font-body text-sm hover:text-golden transition-colors">
                <Phone className="w-4 h-4" />
                +1 (234) 567-890
              </a>
              <p className="flex items-center gap-3 font-body text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4" />
                123 Organic Farm Road, CA 90210
              </p>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-golden">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="font-body text-sm text-primary-foreground/70 hover:text-golden transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-golden">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="font-body text-sm text-primary-foreground/70 hover:text-golden transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-golden">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="font-body text-sm text-primary-foreground/70 hover:text-golden transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="font-body text-sm text-primary-foreground/50">
              © 2024 Rosier Foods. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-golden hover:text-forest transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="font-body text-sm text-primary-foreground/50 hover:text-golden transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-body text-sm text-primary-foreground/50 hover:text-golden transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
