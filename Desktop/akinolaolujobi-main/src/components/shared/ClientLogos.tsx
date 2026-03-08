import { useEffect, useRef } from 'react';

// Import logo images
import rccgLogo from '@/assets/logos/rccg-logo.png';
import daystarLogo from '@/assets/logos/daystar-logo.png';
import harvestersLogo from '@/assets/logos/harvesters-logo.png';
import hotrLogo from '@/assets/logos/hotr-logo.png';
import winnersLogo from '@/assets/logos/winners-logo.png';
import winnersLogo2 from '@/assets/logos/winners-logo2.png';

const clients = [
  { name: 'RCCG', logo: rccgLogo },
  { name: 'Daystar Christian Centre', logo: daystarLogo },
  { name: 'Harvesters International', logo: harvestersLogo },
  { name: 'House on the Rock', logo: hotrLogo },
  { name: 'Winners Chapel', logo: winnersLogo },
  { name: 'Living Faith Church', logo: winnersLogo2 },
];

export default function ClientLogos() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      const firstSetWidth = scrollContainer.scrollWidth / 2;
      
      if (scrollPosition >= firstSetWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Double the logos for seamless infinite scroll
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-16 md:py-20 bg-primary/[0.04] border-y border-border/50 overflow-hidden">
      <div className="container-custom px-4 md:px-8 mb-10">
        <div className="flex items-center gap-4 justify-center mb-2">
          <div className="h-px w-12 bg-primary/30" />
          <p className="text-center text-primary/70 text-xs font-semibold uppercase tracking-[0.2em]">
            Trusted by Leading Organizations
          </p>
          <div className="h-px w-12 bg-primary/30" />
        </div>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div 
          ref={scrollRef}
          className="flex items-center gap-16 md:gap-24"
          style={{ width: 'max-content' }}
        >
          {duplicatedClients.map((client, idx) => (
            <div 
              key={`${client.name}-${idx}`}
              className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500 p-3"
              style={{ width: '140px', height: '70px' }}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-14 w-auto max-w-[130px] object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
