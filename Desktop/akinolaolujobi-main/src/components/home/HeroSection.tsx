import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import Typewriter from '@/components/shared/Typewriter';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80',
    title: 'Welcome to Akinola Olujobi.',
    subtitle: 'Where Excellence Meets Purpose — Your Trusted Partner in Premium Multi-Service Solutions.',
    attribution: '— Akinola Olujobi',
    isWelcome: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1920&q=80',
    title: 'Excellence in Every Service.',
    subtitle: 'Akinola Olujobi delivers premium multi-service solutions tailored to elevate your experience.',
    attribution: '— Akinola Olujobi',
  },
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
    title: 'Where Prestige Meets Purpose.',
    subtitle: 'A trusted destination for professionals seeking quality, clarity, and results.',
    attribution: '— Your Success Partner',
  },
  {
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80',
    title: 'Building Tomorrow, Today.',
    subtitle: 'Global standards, local expertise. We bring world-class service to your doorstep.',
    attribution: '— Akinola Olujobi',
  },
  {
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&q=80',
    title: 'Crafted for Distinction.',
    subtitle: 'Every detail matters. We craft experiences that leave lasting impressions.',
    attribution: '— The Akinola Standard',
  },
];

const typewriterWords = ['We Deliver', 'We Innovate', 'We Excel', 'We Inspire', 'We Transform'];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Images with Ken Burns effect */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={`Akinola Olujobi - ${slide.title}`}
            className={`w-full h-full object-cover ${
              index === currentSlide ? 'animate-[kenburns_20s_ease-in-out_infinite]' : ''
            }`}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />
        </div>
      ))}

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-navy/40 to-transparent z-[1]" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-10 container-custom px-4 md:px-8 py-20 md:py-28 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Typewriter */}
          <div className="mb-3 md:mb-4">
            <span className="inline-block px-5 py-2 rounded-full border border-coral/40 bg-navy/40 backdrop-blur-sm text-sm tracking-widest uppercase text-primary-foreground/80 mb-4">
              Multi-Service Excellence
            </span>
            <div className="text-2xl md:text-3xl lg:text-4xl font-hero font-semibold min-h-[3rem] md:min-h-[3.5rem]">
              <Typewriter
                words={typewriterWords}
                className="inline"
                textClassName="text-coral font-bold"
                typeSpeed={80}
                deleteSpeed={40}
                delayBetweenWords={1500}
              />
            </div>
          </div>

          {/* Slide Content */}
          <div className="relative min-h-[220px] md:min-h-[260px] flex items-center justify-center">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center gap-4 md:gap-6 transition-all duration-700 ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6 pointer-events-none'
                }`}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-hero font-bold text-primary-foreground leading-[1.15] mb-2 tracking-tight whitespace-nowrap">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/80 font-hero max-w-2xl mx-auto leading-relaxed">
                  {slide.subtitle}
                </p>
                <p className="text-base text-coral font-hero italic mt-2">
                  {slide.attribution}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-6">
            <Link to="/about-us">
              <Button
                variant="hero"
                size="lg"
                className="px-8 py-6 text-base backdrop-blur-sm"
              >
                Discover More
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-coral hover:bg-coral-dark text-foreground border-none font-semibold px-8 py-6 text-base shadow-lg shadow-coral/20"
              >
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>


      {/* Progress Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={`h-1 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'w-10 bg-coral'
                : 'w-4 bg-primary-foreground/30 group-hover:bg-primary-foreground/50'
            }`} />
          </button>
        ))}
      </div>
    </section>
  );
}
