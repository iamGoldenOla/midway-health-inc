import { Phone, Mail } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-card border-b border-border hidden md:block">
      <div className="container mx-auto flex items-center justify-between px-4 py-5">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img src="/src/assets/MIDWAY_HEALTH_INC_LOGO_TRANSPARENT.png" alt="Midway Health Inc." className="h-20 w-auto object-contain" />
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
