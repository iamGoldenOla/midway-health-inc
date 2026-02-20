import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import NewsletterSubscribe from "@/components/shared/NewsletterSubscribe";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Warm accent bar */}
      <div className="h-2 bg-gradient-to-r from-warm via-warm/80 to-primary" />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">{/* Changed from lg:grid-cols-4 to lg:grid-cols-5 */}
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/src/assets/MIDWAY_LOGO_LIGHT.png" alt="Midway Health Inc." className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              Delivering compassionate, high-quality home healthcare services to help you and your loved ones thrive.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-warm">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Blog", "Careers", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    className="text-sm text-secondary-foreground/70 hover:text-warm transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-warm">Our Services</h4>
            <ul className="space-y-2">
              {["Skilled Nursing", "Personal Care", "Physical Therapy", "Companionship Care", "Post-Surgical Care"].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-sm text-secondary-foreground/70 hover:text-warm transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-warm">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-secondary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-warm" />
                <span>1434 W 76th Street, Chicago, IL 60620</span>
              </li>
              <li>
                <a href="tel:+13122989124" className="flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-warm transition-colors">
                  <Phone className="h-4 w-4 text-warm" />
                  (312) 298-9124
                </a>
              </li>
              <li>
                <a href="tel:+13122167241" className="flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-warm transition-colors">
                  <Phone className="h-4 w-4 text-warm" />
                  (312) 216-7241
                </a>
              </li>
              <li>
                <a href="mailto:info@midwayhealthinc.com" className="flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-warm transition-colors">
                  <Mail className="h-4 w-4 text-warm" />
                  info@midwayhealthinc.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-1">
            <NewsletterSubscribe />
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-foreground/50">
            © {new Date().getFullYear()} Midway Health Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="text-xs text-secondary-foreground/50 hover:text-warm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/consent-form" className="text-xs text-secondary-foreground/50 hover:text-warm transition-colors">
              Consent Form
            </Link>

          </div>
          <p className="text-xs text-secondary-foreground/40">
            Built by Trendtactics Digital
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
