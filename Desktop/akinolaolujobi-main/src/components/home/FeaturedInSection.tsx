import AnimatedSection from '@/components/shared/AnimatedSection';

const mediaLogos = [
  { name: 'The Guardian Nigeria', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/The_Guardian_%282018%29.svg/200px-The_Guardian_%282018%29.svg.png' },
  { name: 'Vanguard', logo: 'https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=200&q=80' },
  { name: 'BusinessDay', logo: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=200&q=80' },
  { name: 'Punch Newspapers', logo: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=200&q=80' },
  { name: 'TechCabal', logo: 'https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=200&q=80' },
];

export default function FeaturedInSection() {
  return (
    <section className="py-12 md:py-16 bg-background border-y border-border/50">
      <div className="container-custom px-4 md:px-8">
        <AnimatedSection className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">
            As Seen On
          </p>
          <div className="w-12 h-0.5 bg-coral mx-auto" />
        </AnimatedSection>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 lg:gap-20">
          {mediaLogos.map((media, index) => (
            <AnimatedSection key={media.name} animation="fadeUp" delay={index * 80}>
              <div className="group relative flex items-center justify-center h-12 md:h-14 px-4 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-500 cursor-default">
                <span className="text-base md:text-lg font-heading font-bold text-foreground tracking-tight whitespace-nowrap">
                  {media.name}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
