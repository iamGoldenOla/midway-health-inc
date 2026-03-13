import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Linkedin, Twitter } from 'lucide-react';
import NewsletterSignup from './shared/NewsletterSignup';
import brandLogo from '@/assets/AKINOLA_OLUJOBI_MC_LOGO.jpeg';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Services', href: '/our-services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const helpLinks = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Consent Preferences', href: '/consent-preferences' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground">
      {/* Section 1: Main Footer Content */}
      <div className="container-custom px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="inline-block bg-white rounded-lg px-3 py-2">
              <img src={brandLogo} alt="Akinola Olujobi Logo" className="h-10 md:h-12 w-auto object-contain mix-blend-multiply" />
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              A premium multi-service brand delivering excellence with professionalism, prestige, and modern clarity across every touchpoint.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-primary-foreground/10 hover:bg-coral/20 hover:text-coral flex items-center justify-center transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-coral text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Center + Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Help Center</h4>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-coral text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <NewsletterSignup />
          </div>
        </div>
      </div>

      {/* Section 2: Bottom Bar with Tech Stack & Copyright */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            Copyright © 2026 Akinola Olujobi. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/60">
            Powered by Akinola Olujobi
          </p>
        </div>
      </div>
    </footer>
  );
}
