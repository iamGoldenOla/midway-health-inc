import { useState } from 'react';
import { Play, X } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function VideoShowreel() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=80"
          alt="Showreel background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/75 to-navy/90" />
      </div>

      <div className="container-custom px-4 md:px-8 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full border border-coral/30 bg-primary-foreground/5 backdrop-blur-sm text-coral text-xs font-semibold tracking-widest uppercase mb-6">
            Watch the Showreel
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-4">
            See Excellence in Action
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto text-lg">
            A glimpse into the world of Akinola Olujobi — services, impact, and the pursuit of distinction.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={200}>
          <div className="max-w-4xl mx-auto relative">
            {!isPlaying ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-primary-foreground/10 group cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1280&q=80"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/30 transition-colors duration-300" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-coral/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-coral rounded-full flex items-center justify-center shadow-lg shadow-coral/30 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-navy/80 backdrop-blur-sm text-primary-foreground/80 text-xs font-medium">
                  2:45
                </div>
              </div>
            ) : (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
                  title="Akinola Olujobi Showreel"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-navy/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-navy transition-colors"
                  aria-label="Close video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
