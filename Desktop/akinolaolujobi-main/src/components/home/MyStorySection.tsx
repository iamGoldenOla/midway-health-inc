import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import akinolaPortrait from '@/assets/akinola-portrait.jpg';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function MyStorySection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <AnimatedSection animation="fadeRight" className="order-2 lg:order-1">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-6">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
              The Akinola Olujobi Story
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Akinola Olujobi was born from a vision to deliver premium, multi-faceted services with uncompromising quality. Every brand deserves world-class storytelling, strategy, and execution.
              </p>
              <p>
                From content creation to digital marketing, speaking engagements to publishing — clarity, prestige, and professionalism in every project.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/about-us">
                <Button className="group/btn px-6">
                  Read Our Story
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          {/* Image */}
          <AnimatedSection animation="fadeLeft" className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-coral/20" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-2xl" />
              <img
                src={akinolaPortrait}
                alt="Akinola Olujobi"
                loading="lazy"
                decoding="async"
                className="relative rounded-2xl w-full max-w-md mx-auto lg:mx-0 shadow-lg-custom z-10"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
