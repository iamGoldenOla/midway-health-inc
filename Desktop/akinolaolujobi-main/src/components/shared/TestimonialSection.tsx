import { useState, useEffect, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const testimonials = [
  {
    quote: "Akinola Olujobi transformed our brand presence. Their storytelling ability is truly exceptional and has elevated our marketing to new heights.",
    author: "Sarah Johnson",
    role: "CEO, TechStart Nigeria",
    rating: 5,
  },
  {
    quote: "Working with Akinola was a game-changer. Their spoken word performances left our audience captivated and inspired beyond measure.",
    author: "Michael Adebayo",
    role: "Event Director, Lagos Arts Festival",
    rating: 5,
  },
  {
    quote: "The e-book on digital marketing was incredibly insightful. It helped me scale my business to new heights with actionable strategies.",
    author: "Chinwe Okafor",
    role: "Founder, BeautyBox NG",
    rating: 5,
  },
  {
    quote: "Akinola brings a rare combination of creativity and strategic thinking. Their content consistently delivers results that exceed expectations.",
    author: "David Emenike",
    role: "Marketing Director, Pulse Africa",
    rating: 4,
  },
];

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase();
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? 'text-coral fill-coral' : 'text-primary-foreground/20'}
        />
      ))}
    </div>
  );
}

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-coral/5 rounded-full blur-3xl" />

      <div className="container-custom px-4 md:px-8 relative z-10">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary-foreground/20 text-primary-foreground/70 text-xs font-semibold tracking-widest uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-4">
            What People Say
          </h2>
          <p className="text-primary-foreground/60 max-w-2xl mx-auto">
            Hear from clients and collaborators who have experienced the difference.
          </p>
        </AnimatedSection>

        {/* Desktop - carousel style */}
        <div className="hidden lg:block relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 50}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-1/2 flex-shrink-0 px-4">
                  <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 p-8 rounded-2xl relative hover:bg-primary-foreground/10 transition-all duration-300 h-full">
                    <Quote className="absolute top-6 right-6 w-10 h-10 text-coral/30" />
                    <StarRating rating={testimonial.rating} />
                    <p className="text-primary-foreground/80 mb-8 relative z-10 italic text-lg leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center">
                        <span className="text-foreground font-bold text-sm">
                          {getInitials(testimonial.author)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-primary-foreground">{testimonial.author}</h4>
                        <p className="text-sm text-primary-foreground/50">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:bg-primary-foreground/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current ? 'w-10 bg-coral' : 'w-3 bg-primary-foreground/20'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:bg-primary-foreground/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 p-8 rounded-2xl relative">
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-coral/30" />
                    <StarRating rating={testimonial.rating} />
                    <p className="text-primary-foreground/80 mb-8 relative z-10 italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center">
                        <span className="text-foreground font-bold text-sm">
                          {getInitials(testimonial.author)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-primary-foreground">{testimonial.author}</h4>
                        <p className="text-sm text-primary-foreground/50">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:bg-primary-foreground/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === current ? 'w-8 bg-coral' : 'w-3 bg-primary-foreground/20'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:bg-primary-foreground/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
