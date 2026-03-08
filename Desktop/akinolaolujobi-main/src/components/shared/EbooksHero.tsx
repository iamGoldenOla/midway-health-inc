import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Download, Star, Users } from 'lucide-react';
import heroEbooksImg from '@/assets/hero-ebooks.jpg';

export default function EbooksHero() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-coral/5 blur-[80px] sm:blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-primary/5 blur-[60px] sm:blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="container-custom px-4 md:px-8 relative z-10 py-10 sm:py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          
          {/* Left: Text */}
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs tracking-[0.2em] uppercase text-primary font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse-glow" />
              Digital Resources
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight">
              Learn, Grow &
              <span className="block text-primary mt-1">Master Your Craft</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Premium e-books and courses crafted from years of real-world experience. 
              Invest in knowledge that delivers results.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center lg:justify-start">
              <a href="#ebooks-grid">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-lg shadow-primary/20 gap-2">
                  <BookOpen className="w-4 h-4" />
                  Browse Collection
                </Button>
              </a>
            </div>

            {/* Social proof */}
            <div className="flex gap-6 sm:gap-8 pt-4 sm:pt-6 border-t border-border/50 justify-center lg:justify-start">
              {[
                { icon: Download, value: '500+', label: 'Downloads' },
                { icon: Star, value: '4.9', label: 'Avg Rating' },
                { icon: Users, value: '300+', label: 'Readers' },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary/60" />
                    <div>
                      <div className="text-base sm:text-lg font-heading font-bold text-foreground">{stat.value}</div>
                      <div className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
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
              <div className="absolute -top-6 sm:-top-8 -right-6 sm:-right-8 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-coral/20 blur-sm group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-20 sm:w-24 h-20 sm:h-24 rounded-2xl bg-primary/15 blur-sm rotate-12 group-hover:rotate-6 transition-transform duration-700" />

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
                  src={heroEbooksImg}
                  alt="E-books & Courses by Akinola Olujobi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-foreground/5 to-transparent" />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Floating book card */}
              <div 
                className="absolute -bottom-3 sm:-bottom-4 -left-4 sm:-left-8 bg-card/90 backdrop-blur-md border border-border/50 rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 shadow-lg
                  group-hover:translate-y-1 transition-transform duration-500"
                style={{ transform: 'translateZ(30px)' }}
              >
                <p className="text-xs sm:text-sm font-heading font-semibold text-foreground">Premium Resources</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Lifetime Access Included</p>
              </div>

              {/* Rating badge */}
              <div 
                className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-card/90 backdrop-blur-md border border-border/50 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-lg flex items-center gap-1.5 animate-float"
                style={{ transform: 'translateZ(20px)' }}
              >
                <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-coral text-coral" />
                <span className="text-[10px] sm:text-xs font-bold text-foreground">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
