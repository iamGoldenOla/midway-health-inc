import { Mail, MessageCircle, Clock, MapPin } from 'lucide-react';
import heroContactImg from '@/assets/hero-contact.jpg';

const contactInfo = [
  { icon: Mail, label: 'Email Anytime', value: 'connect@akinolaolujobi.com' },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours' },
  { icon: MapPin, label: 'Based in', value: 'Lagos, Nigeria' },
];

export default function ContactHero() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-primary/5 blur-[80px] sm:blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-coral/5 blur-[60px] sm:blur-[100px] animate-float" style={{ animationDelay: '1.5s' }} />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(45deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container-custom px-4 md:px-8 relative z-10 py-10 sm:py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          
          {/* Left: Text */}
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs tracking-[0.2em] uppercase text-primary font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse-glow" />
              Get In Touch
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight">
              Let's Start a
              <span className="block text-primary mt-1">Conversation</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Have a project in mind? Want to collaborate? I'd love to hear from you. 
              Let's discuss how we can bring your vision to life.
            </p>

            {/* Contact info cards */}
            <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl bg-card/60 border border-border/30 backdrop-blur-sm">
                    <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">{info.label}</p>
                      <p className="text-xs sm:text-sm font-semibold text-foreground">{info.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Image with 3D effect */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group" style={{ perspective: '1000px' }}>
              {/* Decorative shapes */}
              <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-20 sm:w-28 h-20 sm:h-28 rounded-full bg-primary/20 blur-sm group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute -bottom-6 sm:-bottom-8 -right-6 sm:-right-8 w-24 sm:w-32 h-24 sm:h-32 rounded-2xl bg-coral/15 blur-sm -rotate-12 group-hover:-rotate-6 transition-transform duration-700" />

              {/* Main image with 3D tilt */}
              <div 
                className="relative w-[260px] h-[340px] sm:w-[320px] sm:h-[420px] md:w-[380px] md:h-[500px] lg:w-[420px] lg:h-[540px] rounded-2xl overflow-hidden shadow-2xl 
                  group-hover:[transform:rotateY(6deg)_rotateX(4deg)_scale(1.03)] transition-all duration-700 ease-out
                  ring-1 ring-border/10"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: 'rotateY(-4deg) rotateX(-2deg)',
                  boxShadow: '-20px 20px 60px hsl(var(--foreground) / 0.15), 5px -5px 20px hsl(var(--background) / 0.5)',
                }}
              >
                <img
                  src={heroContactImg}
                  alt="Contact Akinola Olujobi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-foreground/5 to-transparent" />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Floating message card */}
              <div 
                className="absolute -bottom-3 sm:-bottom-4 -right-4 sm:-right-8 bg-card/90 backdrop-blur-md border border-border/50 rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 shadow-lg
                  group-hover:translate-y-1 transition-transform duration-500"
                style={{ transform: 'translateZ(30px)' }}
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />
                  <p className="text-xs sm:text-sm font-heading font-semibold text-foreground">Let's Talk</p>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Available for new projects</p>
              </div>

              {/* Online indicator */}
              <div 
                className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-card/90 backdrop-blur-md border border-border/50 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-lg flex items-center gap-1.5 sm:gap-2 animate-float"
                style={{ transform: 'translateZ(20px)' }}
              >
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-coral animate-pulse" />
                <span className="text-[10px] sm:text-xs font-medium text-foreground">Online Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
