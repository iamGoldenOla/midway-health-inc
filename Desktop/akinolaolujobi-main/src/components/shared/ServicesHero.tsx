import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroServicesImg from '@/assets/hero-services.jpg';


export default function ServicesHero() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-primary/5 blur-[80px] sm:blur-[120px] animate-float" />
        <div className="absolute bottom-1/3 left-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-coral/5 blur-[60px] sm:blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container-custom px-4 md:px-8 relative z-10 py-10 sm:py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          
          {/* Left: Text */}
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs tracking-[0.2em] uppercase text-primary font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse-glow" />
              What I Offer
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight">
              Services That
              <span className="block text-primary mt-1">Drive Results</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              From content strategy to digital marketing, I deliver comprehensive solutions 
              that elevate your brand and grow your audience.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center lg:justify-start">
              <Link to="/booking">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-lg shadow-primary/20 gap-2">
                  Book a Consultation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/30 text-foreground hover:bg-primary/5 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base">
                  Get a Quote
                </Button>
              </Link>
            </div>

            {/* Service tags */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-border/50 justify-center lg:justify-start">
              {['Content Writing', 'Digital Marketing', 'Public Speaking', 'Brand Strategy', 'Web Development'].map((tag) => (
                <span key={tag} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-muted text-[10px] sm:text-xs font-medium text-muted-foreground border border-border/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Image with 3D effect */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group" style={{ perspective: '1000px' }}>
              {/* Decorative elements */}
              <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-20 sm:w-28 h-20 sm:h-28 rounded-full bg-coral/20 blur-sm group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute -bottom-6 sm:-bottom-8 -left-6 sm:-left-8 w-24 sm:w-32 h-24 sm:h-32 rounded-2xl bg-primary/15 blur-sm rotate-12 group-hover:rotate-6 transition-transform duration-700" />

              {/* Main image with 3D tilt */}
              <div 
                className="relative w-[260px] h-[340px] sm:w-[320px] sm:h-[420px] md:w-[380px] md:h-[500px] lg:w-[420px] lg:h-[540px] rounded-2xl overflow-hidden shadow-2xl 
                  group-hover:[transform:rotateY(-6deg)_rotateX(4deg)_scale(1.03)] transition-all duration-700 ease-out
                  ring-1 ring-border/10"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: 'rotateY(4deg) rotateX(-2deg)',
                  boxShadow: '20px 20px 60px hsl(var(--foreground) / 0.15), -5px -5px 20px hsl(var(--background) / 0.5)',
                }}
              >
                <img
                  src={heroServicesImg}
                  alt="Professional Services - Akinola Olujobi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-foreground/5 to-transparent" />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
