import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Star, ShieldCheck } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const ebooks = [
  {
    title: 'The Content Blueprint',
    description: 'Master the art of creating content that converts — from ideation to distribution.',
    price: '₦5,000',
    tag: 'Best Seller',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
  },
  {
    title: 'Digital Marketing Decoded',
    description: 'A practical guide to growing your brand online using proven digital strategies.',
    price: '₦7,500',
    tag: 'New',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  },
  {
    title: 'Speak to Inspire',
    description: 'Unlock the power of public speaking and spoken word for personal branding.',
    price: '₦4,500',
    tag: 'Popular',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
  },
];

export default function FeaturedEbooksSection() {
  return (
    <section className="section-padding bg-primary/[0.03]">
      <div className="container-custom px-4 md:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Resources
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Featured E-Books
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Practical, actionable knowledge distilled from years of hands-on experience.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ebooks.map((book, index) => (
            <AnimatedSection key={book.title} animation="fadeUp" delay={index * 120}>
              <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 h-full flex flex-col border border-border/50">
                {/* Cover image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-coral/90 text-[10px] font-bold text-foreground uppercase tracking-wider">
                    {book.tag}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(book.rating) ? 'fill-coral text-coral' : 'text-muted-foreground/30'}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">{book.rating}</span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-xl font-heading font-bold text-primary">{book.price}</span>
                    <Link to="/e-books">
                      <Button size="sm" variant="outline" className="group/btn border-primary/30 hover:bg-primary hover:text-primary-foreground text-xs">
                        View Details
                        <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center pt-10" delay={400}>
          <Link to="/e-books">
            <Button size="lg" className="px-8 group gap-2">
              <ShieldCheck className="w-4 h-4" />
              Browse All Resources
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
