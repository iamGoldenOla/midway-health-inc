<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useRef, useEffect } from "react";
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

<<<<<<< HEAD
const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Academics", path: "/academics" },
  { name: "Admissions", path: "/admissions" },
  { name: "Services", path: "/services" },
  { name: "Our Staff", path: "/staff" },
=======
interface NavItem {
  name: string;
  path?: string;
  children?: { name: string; path: string }[];
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { 
    name: "Academics", 
    path: "/academics",
    children: [
      { name: "Admissions", path: "/admissions" },
      { name: "Our Staff", path: "/staff" },
    ]
  },
  { name: "Services", path: "/services" },
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
  { name: "Events", path: "/events" },
  { name: "News & Blog", path: "/news" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
<<<<<<< HEAD
  const location = useLocation();
=======
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActivePath = (item: NavItem) => {
    if (item.path && location.pathname === item.path) return true;
    if (item.children) {
      return item.children.some(child => location.pathname === child.path);
    }
    return false;
  };
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Christ The Haven School Logo" className="w-14 h-14 object-contain" />
            <div className="hidden sm:block">
              <h1 className="font-serif text-primary font-bold text-lg leading-tight">
<<<<<<< HEAD
                Christ The Haven
              </h1>
              <p className="text-xs text-muted-foreground">School</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/admissions">
=======
                Christ The Haven School
              </h1>
              <p className="text-xs text-muted-foreground italic">Excellence and Godliness</p>
            </div>
          </Link>

          {/* Desktop Navigation + CTA */}
          <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <>
                    <div className="flex items-center">
                      <Link
                        to={item.path!}
                        className={`px-4 py-2 rounded-l-lg font-medium text-sm transition-all duration-200 ${
                          isActivePath(item)
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className={`px-2 py-2 rounded-r-lg font-medium text-sm transition-all duration-200 ${
                          isActivePath(item)
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        <ChevronDown 
                          size={14} 
                          className={`transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} 
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border overflow-hidden"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => setOpenDropdown(null)}
                              className={`block px-4 py-3 text-sm font-medium transition-colors ${
                                location.pathname === child.path
                                  ? "bg-primary text-primary-foreground"
                                  : "text-foreground hover:bg-accent"
                              }`}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.path!}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* CTA Button - now inside nav */}
            <Link to="/admissions" className="ml-2">
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
              <Button variant="sky" size="sm">
                Apply Now
              </Button>
            </Link>
<<<<<<< HEAD
          </div>
=======
          </nav>
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <nav className="container-custom py-4 flex flex-col gap-2">
              {navItems.map((item) => (
<<<<<<< HEAD
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  {item.name}
                </Link>
=======
                <div key={item.name}>
                  {item.children ? (
                    <>
                      <div className="flex items-center justify-between">
                        <Link
                          to={item.path!}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex-1 px-4 py-3 rounded-l-lg font-medium transition-all duration-200 ${
                            isActivePath(item)
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-accent"
                          }`}
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => setMobileOpenDropdown(mobileOpenDropdown === item.name ? null : item.name)}
                          className={`px-4 py-3 rounded-r-lg font-medium transition-all duration-200 ${
                            isActivePath(item)
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-accent"
                          }`}
                        >
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-200 ${mobileOpenDropdown === item.name ? 'rotate-180' : ''}`} 
                          />
                        </button>
                      </div>
                      <AnimatePresence>
                        {mobileOpenDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 mt-1 border-l-2 border-border pl-4"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setMobileOpenDropdown(null);
                                }}
                                className={`block px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                                  location.pathname === child.path
                                    ? "bg-primary text-primary-foreground"
                                    : "text-foreground hover:bg-accent"
                                }`}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path!}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        location.pathname === item.path
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-accent"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
              ))}
              <Link to="/admissions" onClick={() => setIsMenuOpen(false)}>
                <Button variant="sky" className="mt-2 w-full">
                  Apply Now
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
