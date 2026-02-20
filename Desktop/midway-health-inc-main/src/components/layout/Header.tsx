import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight, Stethoscope, Heart, Home, Activity, Hand, MessageCircle, Users, Pill, Scissors, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface ServiceItem {
  name: string;
  slug: string;
  icon: LucideIcon;
  desc: string;
}

const services: ServiceItem[] = [
  { name: "Skilled Nursing", slug: "skilled-nursing", icon: Stethoscope, desc: "Expert medical care at home" },
  { name: "Personal Care", slug: "personal-care", icon: Heart, desc: "Daily living assistance" },
  { name: "Home Health Aide", slug: "home-health-aide", icon: Home, desc: "Hands-on home support" },
  { name: "Physical Therapy", slug: "physical-therapy", icon: Activity, desc: "Mobility & strength recovery" },
  { name: "Occupational Therapy", slug: "occupational-therapy", icon: Hand, desc: "Regain independence" },
  { name: "Speech Therapy", slug: "speech-therapy", icon: MessageCircle, desc: "Communication support" },
  { name: "Companionship Care", slug: "companionship-care", icon: Users, desc: "Emotional & social support" },
  { name: "Medication Management", slug: "medication-management", icon: Pill, desc: "Safe medication oversight" },
  { name: "Post-Surgical Care", slug: "post-surgical-care", icon: Scissors, desc: "Surgery recovery support" },
  { name: "Chronic Disease Mgmt", slug: "chronic-disease-management", icon: Brain, desc: "Long-term health plans" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services", hasDropdown: true },
    { name: "Blog", path: "/blog" },
    { name: "Events", path: "/events" },
    { name: "Careers", path: "/careers" },
    { name: "Contact Us", path: "/contact" },
    { name: "Consultation", path: "/consultation" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "fixed top-0 bg-secondary shadow-card"
        : "relative bg-secondary"
        }`}
    >
      {/* Sun glow reflection on header */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -left-10 top-1/2 -translate-y-1/2 w-[300px] h-[120px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, hsl(24, 95%, 53%, 0.6) 0%, hsl(40, 100%, 70%, 0.3) 40%, transparent 70%)",
            animation: "sunGlowPulse 3s ease-in-out infinite",
          }}
        />
      </div>

      <div className="container mx-auto flex items-center justify-between px-4 relative z-10">
        <Link to="/" className="flex items-center gap-2 lg:hidden py-3">
          <img src="/src/assets/MIDWAY_LOGO_LIGHT.png" alt="Midway Health Inc." className="h-12 w-auto object-contain" />
        </Link>

        {/* Left decorative 3D rolling sun */}
        <div className="hidden lg:flex items-center gap-0 shrink-0">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Outer glow ring */}
            <div
              className="absolute inset-[-8px] rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(24, 95%, 53%, 0.4) 0%, hsl(40, 100%, 70%, 0.15) 50%, transparent 70%)",
                animation: "sunGlowPulse 2s ease-in-out infinite",
              }}
            />
            {/* Ray burst - rolling */}
            <div
              className="absolute inset-0"
              style={{ animation: "sunRoll 8s linear infinite" }}
            >
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 rounded-full"
                  style={{
                    width: i % 2 === 0 ? "3px" : "2px",
                    height: i % 2 === 0 ? "18px" : "12px",
                    background: `linear-gradient(to top, hsl(24, 95%, 53%, ${i % 3 === 0 ? 1 : 0.6}), hsl(40, 100%, 70%, 0.2), transparent)`,
                    transformOrigin: "center bottom",
                    transform: `translate(-50%, -100%) rotate(${i * 22.5}deg)`,
                    animation: `rayFlicker ${1.5 + (i % 3) * 0.5}s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </div>
            {/* Inner sun core with 3D sphere */}
            <div
              className="relative w-7 h-7 rounded-full z-10"
              style={{
                background: "radial-gradient(circle at 30% 30%, hsl(45, 100%, 80%), hsl(40, 100%, 65%), hsl(24, 95%, 53%), hsl(15, 90%, 42%))",
                boxShadow: "0 0 25px hsl(24, 95%, 53%, 0.8), 0 0 50px hsl(24, 95%, 53%, 0.4), 0 0 80px hsl(40, 100%, 70%, 0.2), inset 0 -3px 6px hsl(15, 90%, 35%, 0.5), inset 0 3px 6px hsl(45, 100%, 85%, 0.7)",
                animation: "sunCoreGlow 2s ease-in-out infinite alternate",
              }}
            />
          </div>
          <div className="w-16 h-0.5" style={{
            background: "linear-gradient(to right, hsl(24, 95%, 53%, 0.6), hsl(24, 95%, 53%, 0.1), transparent)",
            animation: "rayShine 2s ease-in-out infinite alternate",
          }} />
        </div>

        {/* Desktop Nav — centered */}
        <nav className="hidden lg:flex items-center justify-center flex-1 gap-0">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link
                to={link.path}
                className={`px-5 py-5 text-sm font-semibold tracking-wide transition-colors flex items-center gap-1.5 ${isActive(link.path)
                  ? "text-warm bg-warm/10"
                  : "text-secondary-foreground hover:text-warm hover:bg-warm/5"
                  }`}
                onMouseEnter={() => link.hasDropdown && setServicesOpen(true)}
                onMouseLeave={() => link.hasDropdown && setServicesOpen(false)}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>

              {link.hasDropdown && (
                <div
                  className={`absolute top-full left-0 pt-0 transition-all duration-200 ${servicesOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <div className="bg-card rounded-2xl shadow-elevated border border-border p-4 min-w-[560px] -translate-x-1/4">
                    {/* Header */}
                    <div className="flex items-center justify-between px-3 pb-3 mb-3 border-b border-border">
                      <div>
                        <h3 className="font-display text-sm font-bold text-foreground">Our Services</h3>
                        <p className="text-xs text-muted-foreground">Comprehensive home healthcare</p>
                      </div>
                      <Link
                        to="/services"
                        className="text-xs font-semibold text-primary hover:text-warm transition-colors flex items-center gap-1"
                      >
                        View All <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                    {/* Two-column grid with icons */}
                    <div className="grid grid-cols-2 gap-1">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          className="flex items-start gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-primary/5 transition-colors group/item"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors">
                            <service.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="font-medium text-foreground text-sm block leading-tight">{service.name}</span>
                            <span className="text-[11px] text-muted-foreground">{service.desc}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center shrink-0">
          <Link to="/appointment">
            <Button className="bg-warm text-warm-foreground border-0 rounded-xl px-7 py-5 shadow-soft hover:opacity-90 transition-opacity font-semibold tracking-wide text-sm">
              GET APPOINTMENT <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-secondary-foreground hover:bg-secondary-foreground/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(link.path)
                    ? "text-primary bg-muted"
                    : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/appointment" className="block pt-2">
                <Button className="w-full bg-warm text-warm-foreground border-0 rounded-xl shadow-soft font-semibold">
                  GET APPOINTMENT
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes sunRoll {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sunGlowPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes sunCoreGlow {
          0% { box-shadow: 0 0 25px hsl(24, 95%, 53%, 0.8), 0 0 50px hsl(24, 95%, 53%, 0.4), 0 0 80px hsl(40, 100%, 70%, 0.2), inset 0 -3px 6px hsl(15, 90%, 35%, 0.5), inset 0 3px 6px hsl(45, 100%, 85%, 0.7); }
          100% { box-shadow: 0 0 35px hsl(24, 95%, 53%, 1), 0 0 70px hsl(24, 95%, 53%, 0.6), 0 0 100px hsl(40, 100%, 70%, 0.3), inset 0 -3px 6px hsl(15, 90%, 35%, 0.5), inset 0 3px 6px hsl(45, 100%, 85%, 0.9); }
        }
        @keyframes rayFlicker {
          0% { opacity: 0.4; height: 10px; }
          100% { opacity: 1; height: 18px; }
        }
        @keyframes rayShine {
          0% { opacity: 0.3; width: 40px; }
          100% { opacity: 0.7; width: 70px; }
        }
      `}</style>
    </header>
  );
};

export default Header;
