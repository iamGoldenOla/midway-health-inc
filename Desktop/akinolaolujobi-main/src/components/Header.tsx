import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import TopBar from '@/components/shared/TopBar';
import brandLogo from '@/assets/AKINOLA_OLUJOBI_MC_LOGO.jpeg';

const serviceSubItems = [
  { label: 'I Speak', href: '/services/i-speak' },
  { label: 'I Teach', href: '/services/i-teach' },
  { label: 'I Write', href: '/services/i-write' },
  { label: 'I Sing', href: '/services/i-sing' },
  { label: 'I Digital', href: '/services/i-digital' },
  { label: 'I Inspire', href: '/services/i-inspire' },
];

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Our Services', href: '/our-services', hasDropdown: true },
  { label: 'Blog', href: '/blog' },
  { label: 'e-Books', href: '/e-books' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
  { label: 'Book a Session', href: '/booking', isButton: true },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const location = useLocation();

  const isActive = (href: string, hasDropdown?: boolean) => {
    if (href === '/') return location.pathname === '/';
    if (hasDropdown) return location.pathname.startsWith('/services') || location.pathname === '/our-services';
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>

      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar />
        <header className="bg-background/95 backdrop-blur-sm border-b border-border">
          <nav className="container-custom flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={brandLogo} alt="Akinola Olujobi Logo" className="h-10 md:h-12 w-auto object-contain mix-blend-multiply" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                item.hasDropdown ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link
                      to={item.href}
                      aria-current={isActive(item.href, true) ? 'page' : undefined}
                      className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${isActive(item.href, true)
                        ? 'text-primary font-semibold'
                        : 'text-foreground/80 hover:text-primary'
                        }`}
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </Link>
                    {isServicesOpen && (
                      <div className="absolute top-full left-0 pt-2 animate-fade-in">
                        <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[160px]">
                          {serviceSubItems.map((subItem) => (
                            <Link
                              key={subItem.label}
                              to={subItem.href}
                              aria-current={location.pathname === subItem.href ? 'page' : undefined}
                              className={`block px-4 py-2 text-sm transition-colors ${location.pathname === subItem.href
                                ? 'text-primary font-semibold bg-muted'
                                : 'text-foreground/80 hover:text-primary hover:bg-muted'
                                }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (item as any).isButton ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="ml-2"
                  >
                    <span className="inline-flex items-center px-5 py-2 rounded-lg bg-coral text-foreground text-sm font-semibold shadow-sm hover:bg-coral/90 transition-all duration-200">
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`text-sm font-medium transition-colors duration-200 ${isActive(item.href)
                      ? 'text-primary font-semibold'
                      : 'text-foreground/80 hover:text-primary'
                      }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            {/* Mobile menu toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-foreground"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {isOpen && (
            <div className="lg:hidden bg-background border-b border-border animate-slide-up">
              <div className="container-custom px-4 py-4 flex flex-col gap-2">
                {navItems.map((item) => (
                  item.hasDropdown ? (
                    <div key={item.label}>
                      <div className="flex items-center gap-2">
                        <Link
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={isActive(item.href, true) ? 'page' : undefined}
                          className={`flex-1 text-base font-medium transition-colors py-2 ${isActive(item.href, true)
                            ? 'text-primary font-semibold'
                            : 'text-foreground/80 hover:text-primary'
                            }`}
                        >
                          {item.label}
                        </Link>
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className="p-2 text-foreground/80 hover:text-primary transition-colors"
                          aria-label="Toggle services submenu"
                          aria-expanded={isServicesOpen}
                        >
                          <ChevronDown size={16} className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      {isServicesOpen && (
                        <div className="pl-4 flex flex-col gap-1 animate-fade-in">
                          {serviceSubItems.map((subItem) => (
                            <Link
                              key={subItem.label}
                              to={subItem.href}
                              onClick={() => setIsOpen(false)}
                              aria-current={location.pathname === subItem.href ? 'page' : undefined}
                              className={`text-sm transition-colors py-1.5 ${location.pathname === subItem.href
                                ? 'text-primary font-semibold'
                                : 'text-foreground/70 hover:text-primary'
                                }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (item as any).isButton ? (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="mt-2"
                    >
                      <span className="inline-flex items-center justify-center w-full px-5 py-2.5 rounded-lg bg-coral text-foreground text-base font-semibold shadow-sm hover:bg-coral/90 transition-all duration-200">
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={`text-base font-medium transition-colors py-2 ${isActive(item.href)
                        ? 'text-primary font-semibold'
                        : 'text-foreground/80 hover:text-primary'
                        }`}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}
        </header>
      </div>


    </>
  );
}
