import AnimatedSection from '@/components/shared/AnimatedSection';

export default function QuoteBanner() {
  return (
    <section className="relative py-16 md:py-24 bg-primary overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full blur-3xl" />

      <div className="container-custom px-4 md:px-8 text-center relative z-10">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <span className="inline-block w-12 h-0.5 bg-coral mb-8" />
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-primary-foreground italic leading-relaxed">
              "Don't settle for ordinary. Akinola Olujobi exists to raise the bar — in service, in quality, in every single detail."
            </blockquote>
            <span className="inline-block w-12 h-0.5 bg-coral mt-8" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
