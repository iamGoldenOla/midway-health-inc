import { Phone, Mail } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-card border-b border-border hidden md:block">
      <div className="container mx-auto flex items-center justify-between px-4 py-5">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="23" stroke="hsl(174, 100%, 29%)" strokeWidth="2" fill="none" />
            <path d="M24 12C24 12 18 16 18 22C18 25.5 20 28 22 29.5V34H26V29.5C28 28 30 25.5 30 22C30 16 24 12 24 12Z" fill="hsl(174, 100%, 29%)" opacity="0.2" />
            <path d="M24 14C24 14 19.5 17.5 19.5 22C19.5 24.8 21 27 23 28.2V32H25V28.2C27 27 28.5 24.8 28.5 22C28.5 17.5 24 14 24 14Z" fill="hsl(174, 100%, 29%)" />
            <circle cx="24" cy="21" r="2.5" fill="white" />
            <path d="M20 35H28" stroke="hsl(174, 100%, 29%)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M21 37H27" stroke="hsl(174, 100%, 29%)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 20C13.5 18 13 15.5 14 13" stroke="hsl(174, 100%, 29%)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
            <path d="M33 20C34.5 18 35 15.5 34 13" stroke="hsl(174, 100%, 29%)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          </svg>
          <div>
            <span className="font-display text-2xl font-bold text-foreground leading-none tracking-tight">
              MIDWAY<span className="text-primary">HEALTH</span>
              <span className="text-muted-foreground font-normal text-lg ml-1">Inc.</span>
            </span>
            <span className="block text-[11px] tracking-[0.25em] uppercase text-muted-foreground mt-0.5">
              Home Healthcare Services
            </span>
          </div>
        </a>

        {/* Contact info */}
        <div className="flex items-center gap-10">
          <a href="tel:+13122989124" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-warm/15 flex items-center justify-center group-hover:bg-warm/25 transition-colors">
              <Phone className="h-5 w-5 text-warm" />
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-muted-foreground font-medium">Call Us Now</span>
              <span className="block text-sm font-semibold text-foreground">(312) 298-9124</span>
            </div>
          </a>
          <a href="mailto:info@midwayhealthinc.com" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-warm/15 flex items-center justify-center group-hover:bg-warm/25 transition-colors">
              <Mail className="h-5 w-5 text-warm" />
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-muted-foreground font-medium">Email Address</span>
              <span className="block text-sm font-semibold text-foreground">info@midwayhealthinc.com</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
