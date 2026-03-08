import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import akinHeroAbout from '@/assets/akin-hero-about.jpeg';

export default function AboutHero() {
  return (
    <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-coral/5 blur-[100px] animate-float" style={{ animationDelay: '1.5s' }} />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container-custom px-4 md:px-8 relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1 space-y-6">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs tracking-[0.2em] uppercase text-primary font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse-glow" />
                About Me
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight">
              The Person Behind
              <span className="block text-primary mt-1">The Words</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Storyteller. Content Strategist. Digital Marketer. Crafting narratives that 
              captivate audiences and drive meaningful results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base shadow-lg shadow-primary/20">
                  Let's Connect
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/5 px-8 py-6 text-base">
                  View Services
                </Button>
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex gap-8 pt-6 border-t border-border/50">
              {[
                { value: '10+', label: 'Years Experience' },
                { value: '200+', label: 'Projects Delivered' },
                { value: '50+', label: 'Happy Clients' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-heading font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground tracking-wide uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image with 3D effect */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group" style={{ perspective: '1200px' }}>
              {/* Decorative shapes behind image */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-coral/20 blur-sm group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl bg-primary/15 blur-sm rotate-12 group-hover:rotate-6 transition-transform duration-700" />
              <div className="absolute top-1/2 -right-4 w-16 h-16 rounded-full bg-coral/30 group-hover:translate-x-2 transition-transform duration-500" />
              
              {/* Main image with 3D tilt */}
              <div 
                className="relative w-[320px] h-[420px] sm:w-[380px] sm:h-[500px] md:w-[420px] md:h-[540px] rounded-2xl overflow-hidden shadow-2xl 
                  group-hover:[transform:rotateY(-4deg)_rotateX(2deg)_scale(1.02)] transition-transform duration-700 ease-out"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: 'rotateY(3deg) rotateX(-1deg)',
                }}
              >
                <img
                  src={akinHeroAbout}
                  alt="Akinola Olujobi - Storyteller & Content Strategist"
                  className="w-full h-full object-cover object-top"
                />
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
              </div>

              {/* Floating accent card */}
              <div 
                className="absolute -bottom-4 -left-8 bg-card/90 backdrop-blur-md border border-border/50 rounded-xl px-5 py-3 shadow-lg
                  group-hover:translate-y-1 transition-transform duration-500"
                style={{ transform: 'translateZ(40px)' }}
              >
                <p className="text-sm font-heading font-semibold text-foreground">Akinola Olujobi</p>
                <p className="text-xs text-muted-foreground">Multi-Service Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}