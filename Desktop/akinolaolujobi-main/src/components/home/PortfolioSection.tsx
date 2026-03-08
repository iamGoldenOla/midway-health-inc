import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import facebookAnalytics from '@/assets/facebook-analytics.jpg';

const portfolioItems = [
  {
    title: 'Website Design',
    category: 'Digital',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80',
    link: '/portfolio/website-design',
  },
  {
    title: 'Awareness Campaign',
    category: 'Marketing',
    image: facebookAnalytics,
    link: '/portfolio/awareness-campaign',
  },
  {
    title: 'Spoken Word',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
    link: '/portfolio/spoken-word',
  },
  {
    title: 'Content Creation',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
    link: '/portfolio/content-creation',
  },
];

export default function PortfolioSection() {
  return (
    <section className="section-padding bg-muted">
      <div className="container-custom px-4 md:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Our Portfolio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore a curated selection of projects that showcase the power of strategic storytelling.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item, index) => (
            <AnimatedSection
              key={item.title}
              animation="scaleUp"
              delay={index * 100}
              className="group relative rounded-2xl overflow-hidden shadow-card"
            >
              <div className="aspect-[3/4]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-coral text-xs font-semibold tracking-widest uppercase mb-2">
                  {item.category}
                </span>
                <h3 className="text-xl font-heading font-bold text-primary-foreground mb-4">
                  {item.title}
                </h3>
                <Link to={item.link}>
                  <Button
                    size="sm"
                    className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground hover:bg-coral hover:text-foreground hover:border-coral group/btn"
                  >
                    View Project
                    <ArrowRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
