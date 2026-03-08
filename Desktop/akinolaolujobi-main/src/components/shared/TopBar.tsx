import { useState } from 'react';
import { Mail, Phone, Facebook, Instagram, Linkedin, Youtube, Twitter, Search, ShoppingCart, Moon, Sun } from 'lucide-react';
import LanguageToggle from '@/components/shared/LanguageToggle';
import CartIcon from '@/components/cart/CartIcon';
import ThemeToggle from '@/components/shared/ThemeToggle';
import SearchDialog from '@/components/shared/SearchDialog';

const socials = [
  { icon: Facebook, href: 'https://facebook.com/akinolaolujobi', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/akinolaolujobi', label: 'Instagram' },
  { icon: Twitter, href: 'https://x.com/akinolaolujobi', label: 'X / Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/in/akinolaolujobi', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@akinolaolujobi', label: 'YouTube' },
];

export default function TopBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="hidden md:block bg-primary text-primary-foreground border-b border-primary-foreground/10">
        <div className="container-custom flex items-center justify-between h-9 px-4 md:px-8 text-xs">
          {/* Left: Contact info */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:connect@akinolaolujobi.com"
              className="flex items-center gap-1.5 text-primary-foreground/70 hover:text-coral transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>connect@akinolaolujobi.com</span>
            </a>
            <a
              href="tel:+2349068133874"
              className="flex items-center gap-1.5 text-primary-foreground/70 hover:text-coral transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+234 906 813 3874</span>
            </a>
          </div>

          {/* Right: Socials + Search + Cart + Theme + Language */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/50 hover:text-coral transition-colors"
                  aria-label={s.label}
                >
                  <s.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
            <div className="w-px h-4 bg-primary-foreground/15" />
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-primary-foreground/70 hover:text-coral transition-colors p-0.5"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            <CartIcon />
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </div>
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
